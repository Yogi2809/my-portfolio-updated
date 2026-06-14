import { useEffect, useRef } from "react";
import * as THREE from "three";

// Ambient 3D DNA double-helix backdrop. Fixed full-viewport, behind all content.
// Green + magenta strands with teal rungs, slowly twisting, subtle mouse parallax.
const DnaBackground = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = ref.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Measure from the mount element (fixed, full-viewport) rather than
    // window.innerWidth — more robust against bogus innerWidth at mount.
    const measure = () => ({
      w: mount.clientWidth || window.innerWidth || 1,
      h: mount.clientHeight || window.innerHeight || 1,
    });
    const start = measure();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, start.w / start.h, 0.1, 100);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(start.w, start.h);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.rotation.z = 0.12; // slight tilt for a more dynamic read
    scene.add(group);

    // ── Build the two helical strands ──────────────────────────────────────
    const N = 64;
    const radius = 3.2;
    const height = 27;
    const turns = 3.2;

    const sphereGeo = new THREE.SphereGeometry(0.16, 12, 12);
    const greenMat = new THREE.MeshBasicMaterial({ color: 0x00ff87, transparent: true, opacity: 0.9 });
    const magentaMat = new THREE.MeshBasicMaterial({ color: 0xff0055, transparent: true, opacity: 0.85 });

    const strandA = new THREE.InstancedMesh(sphereGeo, greenMat, N);
    const strandB = new THREE.InstancedMesh(sphereGeo, magentaMat, N);
    const dummy = new THREE.Object3D();
    const posA: THREE.Vector3[] = [];
    const posB: THREE.Vector3[] = [];

    for (let i = 0; i < N; i++) {
      const t = i / (N - 1);
      const y = (t - 0.5) * height;
      const ang = t * Math.PI * 2 * turns;
      const ax = Math.cos(ang) * radius;
      const az = Math.sin(ang) * radius;
      const bx = Math.cos(ang + Math.PI) * radius;
      const bz = Math.sin(ang + Math.PI) * radius;

      dummy.position.set(ax, y, az);
      dummy.updateMatrix();
      strandA.setMatrixAt(i, dummy.matrix);
      posA.push(new THREE.Vector3(ax, y, az));

      dummy.position.set(bx, y, bz);
      dummy.updateMatrix();
      strandB.setMatrixAt(i, dummy.matrix);
      posB.push(new THREE.Vector3(bx, y, bz));
    }
    group.add(strandA, strandB);

    // ── Rungs connecting the strands ───────────────────────────────────────
    const rungMat = new THREE.MeshBasicMaterial({ color: 0x7dffc0, transparent: true, opacity: 0.32 });
    const rungGeo = new THREE.CylinderGeometry(0.035, 0.035, 1, 6);
    const up = new THREE.Vector3(0, 1, 0);
    for (let i = 0; i < N; i += 3) {
      const a = posA[i];
      const b = posB[i];
      const rung = new THREE.Mesh(rungGeo, rungMat);
      rung.position.copy(a.clone().add(b).multiplyScalar(0.5));
      const dir = b.clone().sub(a);
      rung.scale.set(1, dir.length(), 1);
      rung.quaternion.setFromUnitVectors(up, dir.clone().normalize());
      group.add(rung);
    }

    // ── Interaction + resize ───────────────────────────────────────────────
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
    // ResizeObserver catches layout-driven size changes the window event misses
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      if (!reduceMotion) group.rotation.y = t * 0.25;
      group.rotation.x += (mouseY * 0.22 - group.rotation.x) * 0.05;
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      sphereGeo.dispose();
      rungGeo.dispose();
      greenMat.dispose();
      magentaMat.dispose();
      rungMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} className="dna-bg" aria-hidden="true" />;
};

export default DnaBackground;
