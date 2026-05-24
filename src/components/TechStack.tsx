import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
// N8AO removed — caused black occlusion patches on white balls
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const toolNames = [
  "Figma",
  "Jira",
  "OpenAI",
  "Claude AI",
  "Power BI",
  "SQL",
  "Playwright",
  "Git",
  "Vercel",
];

function createTextTexture(name: string): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Pure white ball — no teal ring (was causing color fringing on seams)
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
  ctx.fill();

  // High-contrast navy text for clear legibility on white
  ctx.fillStyle = "#0d1b2a";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const words = name.split(" ");
  if (words.length > 1) {
    ctx.font = "bold 72px Arial, sans-serif";
    ctx.fillText(words[0], size / 2, size / 2 - 38);
    ctx.fillText(words[1], size / 2, size / 2 + 44);
  } else {
    const fontSize = name.length > 7 ? 68 : 80;
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.fillText(name, size / 2, size / 2);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

// Reduced from 30 → 20 spheres for better performance
const spheres = [...Array(20)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshStandardMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );
    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        scale={scale}
        geometry={sphereGeometry}
        material={material}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const workEl = document.getElementById("work");
      if (!workEl) return;
      const threshold = workEl.getBoundingClientRect().top;
      setIsActive(threshold < window.innerHeight);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(handleScroll, 10);
        setTimeout(() => clearInterval(interval), 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const materials = useMemo(() => {
    return toolNames.map((name) => {
      const texture = createTextTexture(name);
      return new THREE.MeshStandardMaterial({
        map: texture,
        color: "#ffffff",
        // Higher roughness = diffuse/matte look, prevents dark mirror patches
        // Lower metalness = no strong HDR color reflections (teal/pink fringing)
        roughness: 0.55,
        metalness: 0.0,
      });
    });
  }, []);

  return (
    <div className="techstack">
      <h2>My Toolkit</h2>

      <Canvas
        // No shadows — removes the spotLight shadow map and per-mesh shadow cost
        gl={{ alpha: true, stencil: false, antialias: false }}
        // depth:false removed — N8AO needs a depth buffer; without it, AO outputs black patches
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.2)}
        className="tech-canvas"
      >
        <ambientLight intensity={1.8} />
        {/* No castShadow on spotLight — saves shadow-map GPU cost */}
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          intensity={1.2}
        />
        <directionalLight position={[0, 5, -4]} intensity={1.2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[i % materials.length]}
              isActive={isActive}
            />
          ))}
        </Physics>
        {/* Very low environmentIntensity — just enough for soft fill, no teal reflections */}
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.05}
          environmentRotation={[0, 4, 2]}
        />
        {/* N8AO removed — it caused black blobs at ball intersections when depth:false was set */}
      </Canvas>
    </div>
  );
};

export default TechStack;
