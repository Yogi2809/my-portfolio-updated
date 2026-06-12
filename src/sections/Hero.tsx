import { lazy, Suspense } from "react";
import { identity, heroMetrics } from "../data/content";
import Reveal from "../components/Reveal";

// Lazy-load the 3D graph so the initial paint is instant
const EcosystemGraph = lazy(() => import("../components/EcosystemGraph"));

const supportsWebGL = (() => {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
})();

const Hero = () => {
  const scrollTo = (hash: string) =>
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="hero" id="home">
      <div className="dot-grid" />
      <div className="container hero-grid">
        <div>
          <Reveal>
            <div className="hero-eyebrow">{identity.role}</div>
          </Reveal>
          <Reveal delay={80}>
            <h1>
              Building Systems That Turn <em>AI Into Business Impact</em>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="hero-sub">{identity.subheadline}</p>
          </Reveal>
          <Reveal delay={240}>
            <div className="hero-ctas">
              <button className="btn btn--primary" onClick={() => scrollTo("#initiatives")}>
                Explore My Work
              </button>
              <button className="btn btn--ghost" onClick={() => scrollTo("#initiatives")}>
                View Strategic Initiatives
              </button>
              <a className="btn btn--ghost" href={identity.resumePdf} download>
                Download Resume
              </a>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="hero-metrics">
              {heroMetrics.map((m) => (
                <div className="hero-metric" key={m.label}>
                  <b>{m.value}</b>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="hero-visual">
          {supportsWebGL ? (
            <Suspense fallback={<div className="page-loading">Initializing ecosystem</div>}>
              <EcosystemGraph />
            </Suspense>
          ) : (
            <div className="page-loading">AI · Teams · Workflows · Outcomes</div>
          )}
          <div className="hero-visual-hint">DRAG TO EXPLORE THE ECOSYSTEM</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
