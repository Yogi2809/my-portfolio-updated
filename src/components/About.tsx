import "./styles/About.css";

const highlights = [
  { label: "3,500+", sub: "calls/day" },
  { label: "225", sub: "sessions audited/day" },
  { label: "12", sub: "engineers led" },
];

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          AI/Technical PM with 1.5+ years at Cars24 — owning voicebot and
          chatbot delivery end-to-end. From writing prompts and running E2E
          tests to shipping a 3,500+ calls/day price-negotiation voicebot and
          an LLM-powered QA pipeline that replaced 2 analysts, I bridge
          product, engineering, and business to get things from requirement to
          production.
        </p>
        <div className="about-stats">
          {highlights.map((h) => (
            <div className="about-stat" key={h.label}>
              <span className="about-stat-num">{h.label}</span>
              <span className="about-stat-sub">{h.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
