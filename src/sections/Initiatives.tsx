import { Link } from "react-router-dom";
import { initiatives } from "../data/content";
import Reveal from "../components/Reveal";
import TiltCard from "../components/TiltCard";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Initiatives = () => (
  <section className="section" id="initiatives">
    <div className="container">
      <Reveal>
        <div className="section-label">Initiatives</div>
        <h2 className="section-title">Strategic Initiatives &amp; AI Workflow Projects</h2>
        <p className="section-sub">
          The work I've actually done — automation I built end to end, AI
          workflows I designed, and conversational flows I tested and refined.
          Open any card for the full story.
        </p>
      </Reveal>
      <div className="init-grid">
        {initiatives.map((init, i) => (
          <Reveal key={init.slug} delay={i * 80}>
            <Link to={`/initiatives/${init.slug}`}>
              <TiltCard className="panel init-card" max={6}>
                <div className="init-cat">{init.category}</div>
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
                  Open initiative <ArrowIcon />
                </span>
              </TiltCard>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Initiatives;
