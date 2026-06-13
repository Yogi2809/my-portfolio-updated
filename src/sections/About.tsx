import { operatingModel } from "../data/content";
import Reveal from "../components/Reveal";
import TiltCard from "../components/TiltCard";

const About = () => (
  <section className="section" id="about">
    <div className="container">
      <Reveal>
        <div className="section-label">About</div>
        <h2 className="section-title">How I Work With AI, Teams &amp; Workflows</h2>
        <p className="section-sub">
          I work across AI workflows, business logic, technical teams, and
          execution — turning business requirements into clear flows, testing
          chatbot and voicebot behavior, refining prompts through feedback loops,
          and using AI tools to automate repetitive work. I care about making AI
          systems more useful, reliable, and aligned with real user journeys.
        </p>
      </Reveal>
      <div className="operate-grid">
        {operatingModel.map((step, i) => (
          <Reveal key={step.title} delay={i * 70}>
            <TiltCard className="panel operate-card">
              <div className="operate-step">{step.step}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <ul className="operate-practices">
                {step.practices.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default About;
