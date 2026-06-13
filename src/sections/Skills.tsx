import { useState } from "react";
import { skillClusters } from "../data/content";
import Reveal from "../components/Reveal";

const Skills = () => {
  // Start with all clusters collapsed so the grid loads as a clean, uniform
  // set of equal-height cards (no card stretched to match an expanded sibling).
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="section" id="skills">
      <div className="container">
        <Reveal>
          <div className="section-label">Skills &amp; Expertise</div>
          <h2 className="section-title">The Expertise Ecosystem</h2>
          <p className="section-sub">
            Six interconnected clusters. Click any cluster to see the
            capabilities inside it and the tools that power them.
          </p>
        </Reveal>
        <div className="skills-grid">
          {skillClusters.map((cluster, i) => {
            const isOpen = expanded === i;
            return (
              <Reveal key={cluster.title} delay={i * 60}>
                <div
                  className={`panel skill-cluster${isOpen ? " expanded" : ""}`}
                  onClick={() => setExpanded(isOpen ? null : i)}
                  role="button"
                  aria-expanded={isOpen}
                >
                  <div className="skill-cluster-head">
                    <div>
                      <h3>{cluster.title}</h3>
                      <p className="summary">{cluster.summary}</p>
                    </div>
                    <button className="skill-toggle" aria-label="Toggle cluster">
                      +
                    </button>
                  </div>
                  <div className="skill-cluster-body">
                    <div>
                      <ul className="skill-caps">
                        {cluster.capabilities.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                      <div className="skill-tools">
                        {cluster.tools.map((t) => (
                          <span className="chip chip--accent" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
