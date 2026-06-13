import { useRef, ReactNode, useMemo } from "react";

// 3D hover-tilt wrapper — pointer position maps to rotateX/rotateY.
// Pure transform, no library. Disabled on touch + reduced-motion.
const TiltCard = ({
  children,
  className = "",
  max = 8,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const disabled = useMemo(
    () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches,
    []
  );

  const onMove = (e: React.PointerEvent) => {
    if (disabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    ref.current.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(0,255,135,0.14), transparent 55%)`;
      glareRef.current.style.opacity = "1";
    }
  };

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      className={`tilt ${className}`}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
      {glare && !disabled && <div ref={glareRef} className="tilt-glare" />}
    </div>
  );
};

export default TiltCard;
