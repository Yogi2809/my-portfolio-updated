import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!canvasDiv.current) return;

    const rect = canvasDiv.current.getBoundingClientRect();
    const container = { width: rect.width, height: rect.height };
    const aspect = container.width / container.height;
    const scene = sceneRef.current;

    // logarithmicDepthBuffer eliminates Z-fighting on face/hair/beard meshes
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      logarithmicDepthBuffer: true,
    });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    // Do NOT enable shadowMap — no shadow lights are set up; enabling it causes mesh artefacts
    canvasDiv.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(20, aspect, 0.1, 100);
    camera.position.set(0, 1.55, 3.2);
    camera.lookAt(0, 1.35, 0);
    camera.updateProjectionMatrix();

    // Head bone for mouse-follow tracking
    let headBone: THREE.Object3D | null = null;
    let mixer: THREE.AnimationMixer;

    const clock = new THREE.Clock();
    const light = setLighting(scene);
    const progress = setProgress((value) => setLoading(value));
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    loadCharacter().then((gltf) => {
      if (!gltf) return;
      const animations = setAnimations(gltf);
      if (hoverDivRef.current) animations.hover(gltf, hoverDivRef.current);
      mixer = animations.mixer;
      const char = gltf.scene;
      scene.add(char);

      // RPM head bone — used only for subtle mouse-follow head turn
      headBone =
        char.getObjectByName("Head") ||
        char.getObjectByName("head") ||
        char.getObjectByName("spine006") ||
        null;

      progress.loaded().then(() => {
        setTimeout(() => {
          light.turnOnLights();
          animations.startIntro();
        }, 2500);
      });

      window.addEventListener("resize", () =>
        handleResize(renderer, camera, canvasDiv, char)
      );
    });

    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };

    const onMouseMove = (event: MouseEvent) =>
      handleMouseMove(event, (x, y) => (mouse = { x, y }));

    let debounce: number | undefined;
    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      debounce = setTimeout(() => {
        element?.addEventListener("touchmove", (e: TouchEvent) =>
          handleTouchMove(e, (x, y) => (mouse = { x, y }))
        );
      }, 200);
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart);
      landingDiv.addEventListener("touchend", onTouchEnd);
    }

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Mixer must update FIRST so animation clip values are written to bones
      if (mixer) mixer.update(delta);

      // Head tracking applied AFTER mixer so it overrides the clip's head value
      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      clearTimeout(debounce);
      scene.clear();
      renderer.dispose();
      if (canvasDiv.current?.contains(renderer.domElement)) {
        canvasDiv.current.removeChild(renderer.domElement);
      }
      document.removeEventListener("mousemove", onMouseMove);
      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
      }
    };
  }, []);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;
