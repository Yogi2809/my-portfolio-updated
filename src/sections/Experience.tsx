import { Fragment } from "react";
import { experience, galleryArtifacts } from "../data/content";
import Reveal from "../components/Reveal";

const Experience = () => (
  <section className="section" id="experience">
    <div className="container">
      <Reveal>
        <div className="section-label">Experience</div>
        <h2 className="section-title">The Strategic Journey</h2>
        <p className="section-sub">
          Each stop on this journey built a specific capability — together they
          compound into how I run AI programs today.
        </p>
      </Reveal>

      <div className="journey">
        {experience.map((entry, i) => (
          <Reveal key={entry.org} delay={i * 70}>
            <div className="journey-entry">
              <div className="journey-period">{entry.period}</div>
              <h3>{entry.role}</h3>
              <div className="journey-org">{entry.org}</div>
              <p className="journey-mission">{entry.mission}</p>
              <div className="panel journey-detail">
                <div>
                  <h4>Scope</h4>
                  <ul>
                    {entry.scope.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Results</h4>
                  <ul>
                    {entry.results.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="journey-skills">
                {entry.skills.map((s) => (
                  <span className="chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* AI Workflow Gallery */}
      <div style={{ marginTop: 110 }}>
        <Reveal>
          <div className="section-label">AI Workflow Gallery</div>
          <h2 className="section-title" style={{ fontSize: "clamp(26px, 3.6vw, 38px)" }}>
            Operating Models &amp; Execution Frameworks
          </h2>
          <p className="section-sub">
            The systems behind the delivery — how prompts ship, how audits loop,
            how PODs coordinate, how escalations route.
          </p>
        </Reveal>
        <div className="gallery-grid">
          {galleryArtifacts.map((art, i) => (
            <Reveal key={art.title} delay={i * 70}>
              <div className="panel gallery-card">
                <div className="gallery-type">{art.type}</div>
                <h4>{art.title}</h4>
                <p>{art.description}</p>
                <div className="gallery-flow">
                  {art.nodes.map((n, j) => (
                    <Fragment key={n}>
                      <span className="gallery-node">{n}</span>
                      {j < art.nodes.length - 1 && (
                        <span className="gallery-arrow">▸</span>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
