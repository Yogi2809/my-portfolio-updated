import { operatingModel } from "../data/content";
import Reveal from "../components/Reveal";

const About = () => (
  <section className="section" id="about">
    <div className="container">
      <Reveal>
        <div className="section-label">About</div>
        <h2 className="section-title">How I Operate</h2>
        <p className="section-sub">
          Not a biography — an operating system. Six phases I run every AI
          initiative through, from first conversation to scaled outcome.
        </p>
      </Reveal>
      <div className="operate-grid">
        {operatingModel.map((step, i) => (
          <Reveal key={step.title} delay={i * 70}>
            <div className="panel operate-card">
              <div className="operate-step">{step.step}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <ul className="operate-practices">
                {step.practices.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default About;
