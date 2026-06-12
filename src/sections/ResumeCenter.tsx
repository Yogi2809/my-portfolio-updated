import { identity, resumeHighlights, competencies, education } from "../data/content";
import Reveal from "../components/Reveal";

const ResumeCenter = () => (
  <section className="section" id="resume">
    <div className="container">
      <Reveal>
        <div className="section-label">Resume</div>
        <h2 className="section-title">Executive Summary</h2>
        <p className="section-sub">
          AI &amp; Technology Program Manager with an MBA, hands-on prompt
          engineering depth, and proven cross-functional delivery across
          production conversational AI systems.
        </p>
      </Reveal>
      <div className="resume-grid">
        <Reveal>
          <div className="panel resume-main">
            <h3>Key Highlights</h3>
            <ul className="resume-highlights">
              {resumeHighlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <h3>Education</h3>
            <div className="resume-edu">
              {education.map((e) => (
                <div key={e.degree}>
                  <b>{e.degree}</b>
                  <span>{e.school}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="resume-side">
          <Reveal delay={100}>
            <div className="panel resume-actions">
              <a className="btn btn--primary" href={identity.resumePdf} download>
                Download Resume (PDF)
              </a>
              <a
                className="btn btn--ghost"
                href={identity.resumePdf}
                target="_blank"
                rel="noreferrer"
              >
                Printable Version
              </a>
              <a
                className="btn btn--ghost"
                href={identity.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="btn btn--ghost"
                href={identity.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div className="panel resume-comp">
              <h4>Core Competencies</h4>
              <div className="resume-comp-tags">
                {competencies.map((c) => (
                  <span className="chip" key={c}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default ResumeCenter;
