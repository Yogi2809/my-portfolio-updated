import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { initiatives } from "../data/content";
import Reveal from "../components/Reveal";
import FlowDiagram, { ChatBubbles, Waveform } from "../components/diagrams/FlowDiagrams";

const BackIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InitiativeDetail = () => {
  const { slug } = useParams();
  const init = initiatives.find((i) => i.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!init) return <Navigate to="/" replace />;

  return (
    <>
      <header className="detail-hero">
        <div className="dot-grid" />
        <div className="container">
          <Link to="/#initiatives" className="detail-back">
            <BackIcon /> All Initiatives
          </Link>
          <div className="init-cat">{init.category}</div>
          <div className="init-org">
            {init.org} · {init.period}
          </div>
          <h1>{init.title}</h1>
          <p className="tagline">{init.tagline}</p>
          <div className="detail-meta">
            {init.tags.map((t) => (
              <span className="chip chip--accent" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="container detail-body">
        <Reveal>
          <div className="detail-block">
            <h2>The Challenge</h2>
            <p>{init.challenge}</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="detail-block">
            <h2>Business Context</h2>
            <p>{init.businessContext}</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="detail-cols">
            <div className="detail-block">
              <h2>My Role</h2>
              <ul className="detail-list">
                {init.role.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="detail-block">
              <h2>Objectives</h2>
              <ul className="detail-list">
                {init.objectives.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="detail-block">
            <h2>Approach</h2>
            <p>{init.approach}</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="detail-block">
            <h2>Workflow</h2>
            {/* Animated diagram appropriate to this initiative */}
            <div className="panel detail-diagram">
              <FlowDiagram kind={init.diagram} steps={init.workflow} />
            </div>
            {init.diagram === "chat" && (
              <div className="panel detail-diagram detail-diagram--split">
                <ChatBubbles />
                <Waveform />
              </div>
            )}
            <div className="flow">
              {init.workflow.map((step, i) => (
                <div className="flow-step" key={step.label}>
                  <div className="flow-node">{i + 1}</div>
                  <div>
                    <b>{step.label}</b>
                    <span>{step.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="detail-block">
            <h2>Implementation</h2>
            <p>{init.implementation}</p>
            <div className="detail-meta" style={{ marginTop: 20 }}>
              {init.tools.map((t) => (
                <span className="chip" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="detail-cols">
            <div className="detail-block">
              <h2>Impact</h2>
              <ul className="detail-list">
                {init.impact.map((im) => (
                  <li key={im}>{im}</li>
                ))}
              </ul>
            </div>
            <div className="detail-block">
              <h2>Lessons Learned</h2>
              <ul className="detail-list">
                {init.learnings.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
};

export default InitiativeDetail;
