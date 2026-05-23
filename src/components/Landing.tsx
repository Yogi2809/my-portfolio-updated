import { PropsWithChildren } from "react";
import NeuralCanvas from "./NeuralCanvas";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div
        className="landing-section"
        id="landingDiv"
        style={{ position: "relative" }}
      >
        <NeuralCanvas />
        <div
          className="landing-container"
          style={{ position: "relative", zIndex: 1 }}
        >
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
        {children}
      </div>
    </>
  );
};

export default Landing;
