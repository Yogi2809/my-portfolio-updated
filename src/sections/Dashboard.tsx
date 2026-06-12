import { useEffect, useRef, useState } from "react";
import { dashboardStats } from "../data/content";
import Reveal from "../components/Reveal";

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
        <div className="section-label">Impact Dashboard</div>
        <h2 className="section-title">The Leadership Cockpit</h2>
        <p className="section-sub">
          Real numbers from real programs — every figure below is verifiable
          against the work behind it.
        </p>
      </Reveal>
      <div className="dash-grid">
        {dashboardStats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 60}>
            <div className="panel dash-card">
              <Counter value={stat.value} suffix={stat.suffix} />
              <b>{stat.label}</b>
              <span>{stat.detail}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Dashboard;
