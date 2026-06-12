import { Link } from "react-router-dom";
import { initiatives } from "../data/content";
import Reveal from "../components/Reveal";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Initiatives = () => (
  <section className="section" id="initiatives">
    <div className="container">
      <Reveal>
        <div className="section-label">Strategic Initiatives</div>
        <h2 className="section-title">Executive Case Studies</h2>
        <p className="section-sub">
          Not projects — programs. Each initiative is a full cycle of problem
          framing, stakeholder alignment, workflow design, and measured delivery.
        </p>
      </Reveal>
      <div className="init-grid">
        {initiatives.map((init, i) => (
          <Reveal key={init.slug} delay={i * 80}>
            <Link to={`/initiatives/${init.slug}`}>
              <div className="panel init-card">
                <div className="init-org">
                  {init.org} · {init.period}
                </div>
                <h3>{init.title}</h3>
                <p className="tagline">{init.tagline}</p>
                <div className="init-tags">
                  {init.tags.map((t) => (
                    <span className="chip" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <span className="init-open">
                  Open case study <ArrowIcon />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Initiatives;
