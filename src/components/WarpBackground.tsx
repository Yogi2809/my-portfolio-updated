import { useEffect, useRef } from "react";
import * as THREE from "three";

// Realistic hyperspace warp: stars stream past the camera as motion-blur
// streaks (LineSegments) led by soft glowing points (Points), with per-star
// speed/length variance and additive glow. Fixed full-viewport, behind content.
const WarpBackground = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = ref.current;
    if (!mount) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => ({
      w: mount.clientWidth || window.innerWidth || 1,
      h: mount.clientHeight || window.innerHeight || 1,
    });
    const start = measure();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, start.w / start.h, 0.1, 600);
    camera.position.set(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(start.w, start.h);
    mount.appendChild(renderer.domElement);

    // ── Star field state ────────────────────────────────────────────────────
    const N = 520;
    const DEPTH = 260; // how far back stars spawn (−z)
    const NEAR = -1.5; // reset once a star passes this z (near the camera)
    const SPREAD = 62; // x/y radius of the field

    // Realistic warp is mostly white/cyan; sprinkle brand green/magenta.
    const palette = [
      [0.85, 0.95, 1.0], // cyan-white
      [1.0, 1.0, 1.0], // white
      [0.8, 0.92, 1.0],
      [0.0, 1.0, 0.53], // brand green
      [1.0, 0.36, 0.55], // brand magenta
    ];
    const pick = () => {
      const r = Math.random();
      if (r > 0.92) return palette[3];
      if (r > 0.86) return palette[4];
      return palette[Math.floor(Math.random() * 3)];
    };

    const xs = new Float32Array(N);
    const ys = new Float32Array(N);
    const zs = new Float32Array(N);
    const sp = new Float32Array(N);
    const len = new Float32Array(N);
    const col: number[][] = [];

    const seed = (i: number, spreadZ = true) => {
      const ang = Math.random() * Math.PI * 2;
      const rad = Math.sqrt(Math.random()) * SPREAD;
      xs[i] = Math.cos(ang) * rad;
      ys[i] = Math.sin(ang) * rad;
      zs[i] = spreadZ ? -2 - Math.random() * DEPTH : -DEPTH - Math.random() * 30;
      sp[i] = 70 + Math.random() * 130; // units / sec
      len[i] = sp[i] * 0.22; // faster → longer trail
      col[i] = pick();
    };
    for (let i = 0; i < N; i++) seed(i, true);

    const linePos = new Float32Array(N * 2 * 3);
    const lineCol = new Float32Array(N * 2 * 3);
    const ptPos = new Float32Array(N * 3);
    const ptCol = new Float32Array(N * 3);

    const writeStar = (i: number) => {
      const x = xs[i];
      const y = ys[i];
      const z = zs[i];
      const c = col[i];
      // Head brightens as it nears the camera
      const prox = THREE.MathUtils.clamp((z + DEPTH) / DEPTH, 0.15, 1);
      const hi = i * 6;
      // head vertex (bright)
      linePos[hi] = x; linePos[hi + 1] = y; linePos[hi + 2] = z;
      lineCol[hi] = c[0] * prox; lineCol[hi + 1] = c[1] * prox; lineCol[hi + 2] = c[2] * prox;
      // tail vertex (behind, fades to black → transparent with additive blending)
      linePos[hi + 3] = x; linePos[hi + 4] = y; linePos[hi + 5] = z - len[i];
      lineCol[hi + 3] = 0; lineCol[hi + 4] = 0; lineCol[hi + 5] = 0;
      const pi = i * 3;
      ptPos[pi] = x; ptPos[pi + 1] = y; ptPos[pi + 2] = z;
      ptCol[pi] = c[0] * prox; ptCol[pi + 1] = c[1] * prox; ptCol[pi + 2] = c[2] * prox;
    };
    for (let i = 0; i < N; i++) writeStar(i);

    // Streak lines
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineCol, 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.9,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    lines.frustumCulled = false;
    scene.add(lines);

    // Glowing leading points
    const dotCanvas = document.createElement("canvas");
    dotCanvas.width = dotCanvas.height = 64;
    const dctx = dotCanvas.getContext("2d")!;
    const grad = dctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.35, "rgba(255,255,255,0.55)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    dctx.fillStyle = grad;
    dctx.fillRect(0, 0, 64, 64);
    const dotTex = new THREE.CanvasTexture(dotCanvas);

    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(ptPos, 3));
    ptGeo.setAttribute("color", new THREE.BufferAttribute(ptCol, 3));
    const ptMat = new THREE.PointsMaterial({
      map: dotTex,
      size: 2.6,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.95,
    });
    const points = new THREE.Points(ptGeo, ptMat);
    points.frustumCulled = false;
    scene.add(points);

    // ── Interaction + resize ────────────────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMove);

    const onResize = () => {
      const { w, h } = measure();
      if (w < 2 || h < 2) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = Math.min(0.05, clock.getDelta());
      const mul = reduceMotion ? 0 : 1;
      for (let i = 0; i < N; i++) {
        zs[i] += sp[i] * dt * mul;
        if (zs[i] >= NEAR) seed(i, false); // recycle to the back
        writeStar(i);
      }
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;
      ptGeo.attributes.position.needsUpdate = true;
      ptGeo.attributes.color.needsUpdate = true;

      // Subtle parallax — the warp center drifts with the cursor
      camera.position.x += (mouseX * 6 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 6 - camera.position.y) * 0.04;
      camera.lookAt(camera.position.x * 0.4, camera.position.y * 0.4, -DEPTH);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      lineGeo.dispose();
      ptGeo.dispose();
      lineMat.dispose();
      ptMat.dispose();
      dotTex.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} className="scene-bg" aria-hidden="true" />;
};

export default WarpBackground;
