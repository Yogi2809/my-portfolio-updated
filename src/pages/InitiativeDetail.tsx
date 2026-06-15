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

const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
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
          {init.repos && init.repos.length > 0 && (
            <div className="detail-repos">
              {init.repos.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="detail-repo"
                >
                  <GitHubIcon /> {r.label}
                </a>
              ))}
            </div>
          )}
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
