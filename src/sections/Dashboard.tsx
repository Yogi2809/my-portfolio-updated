import { useEffect, useRef, useState } from "react";
import { dashboardStats } from "../data/content";
import Reveal from "../components/Reveal";
import TiltCard from "../components/TiltCard";

// Animated counter that counts up when scrolled into view
const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (reduced) {
          setDisplay(value);
          return;
        }
        const duration = 1100;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(eased * value));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div className="dash-value" ref={ref}>
      {display}
      {suffix}
    </div>
  );
};

const Dashboard = () => (
  <section className="section" id="impact">
    <div className="container">
      <Reveal>
        <div className="section-label">By the Numbers</div>
        <h2 className="section-title">Honest Impact, Real Work</h2>
        <p className="section-sub">
          Every figure here maps to work I actually did — no inflated counts,
          nothing I can't walk you through.
        </p>
      </Reveal>
      <div className="dash-grid">
        {dashboardStats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 60}>
            <TiltCard className="panel dash-card" max={5}>
              <Counter value={stat.value} suffix={stat.suffix} />
              <b>{stat.label}</b>
              <span>{stat.detail}</span>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Dashboard;
