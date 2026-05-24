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
        {/* Mobile hero text lives here (children) */}
        {children}
      </div>
    </>
  );
};

export default Landing;
