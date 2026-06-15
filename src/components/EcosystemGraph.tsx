import { useEffect, useRef, useState, useMemo } from "react";
import ForceGraph3D from "react-force-graph-3d";
import * as THREE from "three";
import SpriteText from "three-spritetext";
import { ecosystemGraph } from "../data/content";

// Group palette: core magenta, AI green, people white, process soft-green, outcomes green
const GROUP_COLORS = ["#ff0055", "#00ff87", "#ffffff", "#7dffc0", "#00ff87"];

const EcosystemGraph = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<any>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const reducedMotion = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Gentle auto-orbit camera; pauses while the user interacts
  useEffect(() => {
    if (reducedMotion) return;
    const fg = fgRef.current;
    if (!fg) return;
    let angle = 0;
    let userActive = false;
    let raf: number;
    const distance = 245;

    const onDown = () => (userActive = true);
    const el = wrapRef.current;
    el?.addEventListener("pointerdown", onDown);

    const orbit = () => {
      if (!userActive && fgRef.current) {
        angle += 0.0011;
        fgRef.current.cameraPosition({
          x: distance * Math.sin(angle),
          z: distance * Math.cos(angle),
          y: 40,
        });
      }
      raf = requestAnimationFrame(orbit);
    };
    raf = requestAnimationFrame(orbit);
    return () => {
      cancelAnimationFrame(raf);
      el?.removeEventListener("pointerdown", onDown);
    };
  }, [reducedMotion, size.w]);

  // Mobile: fewer labels, no drag (graph still renders)
  const isTouch = useMemo(() => window.matchMedia("(pointer: coarse)").matches, []);

  const graphData = useMemo(
    () => ({
      nodes: ecosystemGraph.nodes.map((n) => ({ ...n })),
      links: ecosystemGraph.links.map((l) => ({ ...l })),
    }),
    []
  );

  if (size.w === 0) return <div ref={wrapRef} style={{ width: "100%", height: "100%" }} />;

  return (
    <div ref={wrapRef} style={{ width: "100%", height: "100%" }}>
      <ForceGraph3D
        ref={fgRef}
        width={size.w}
        height={size.h}
        graphData={graphData}
        backgroundColor="rgba(0,0,0,0)"
        showNavInfo={false}
        enableNodeDrag={!isTouch}
        nodeThreeObject={(node: any) => {
          const group = new THREE.Group();
          const color = GROUP_COLORS[node.group] ?? "#ededf2";

          const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(node.size * 0.62, 16, 16),
            new THREE.MeshBasicMaterial({
              color,
              transparent: true,
              opacity: node.group === 0 ? 0.95 : 0.75,
            })
          );
          group.add(sphere);

          // Soft glow halo
          const halo = new THREE.Mesh(
            new THREE.SphereGeometry(node.size * 0.98, 16, 16),
            new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.12 })
          );
          group.add(halo);

          const label = new SpriteText(node.id);
          label.color = node.group === 0 ? "#ff8fb0" : "#ffffff";
          label.textHeight = node.group === 0 ? 8.5 : 5.6;
          label.position.set(0, node.size * 0.62 + 6, 0);
          label.fontFace = "Geist, Arial, sans-serif";
          // Dark backing pill so labels stay legible over the warp streaks
          label.backgroundColor = "rgba(8,13,26,0.72)";
          label.padding = node.group === 0 ? 2.5 : 1.8;
          label.borderRadius = 3;
          group.add(label);

          return group;
        }}
        linkColor={() => "rgba(0, 255, 135, 0.22)"}
        linkWidth={0.6}
        linkOpacity={0.35}
        linkDirectionalParticles={reducedMotion ? 0 : 1}
        linkDirectionalParticleSpeed={0.004}
        linkDirectionalParticleWidth={1.2}
        linkDirectionalParticleColor={() => "#00ff87"}
      />
    </div>
  );
};

export default EcosystemGraph;
