import "./styles/Landing.css";

/**
 * HeroOverlay — fixed overlay rendered OUTSIDE smooth-wrapper
 * so it appears above the character canvas (z-index > 11).
 * GSAP animations in initialFX.ts target these class names directly.
 */
const HeroOverlay = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 15,
        pointerEvents: "none",
      }}
    >
      <div className="landing-container" style={{ position: "relative", height: "100%" }}>
        <div className="landing-intro">
          <h2>Hello! I'm</h2>
          <h1>
            YOGESH
            <br />
            <span>MISHRA</span>
          </h1>
        </div>
        <div className="landing-info">
          <h3>AI / Technical</h3>
          <h2 className="landing-info-h2">
            <div className="landing-h2-1">Program</div>
            <div className="landing-h2-2">Manager</div>
          </h2>
          <h2>
            <div className="landing-h2-info">Manager</div>
            <div className="landing-h2-info-1">Program</div>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default HeroOverlay;
