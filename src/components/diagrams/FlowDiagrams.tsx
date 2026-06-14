import { useEffect, useRef, useState } from "react";
import type { DiagramKind, FlowStep } from "../../data/content";

// Shared: reveal when scrolled into view (replays nothing, just gates animation)
const useInView = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
};

// ── Chatbot conversation bubbles appearing in sequence ──────────────────────
const ChatBubbles = () => {
  const { ref, seen } = useInView();
  const lines = [
    { who: "user", text: "I still haven't received my quote." },
    { who: "bot", text: "Your inspection is done — let me check the latest price." },
    { who: "user", text: "I'm expecting ₹5.2 lakh for my car." },
    { who: "bot", text: "Buyers bid up to ₹4.9L earlier. Shall we try the auction at ₹4.75L?" },
  ];
  return (
    <div className="diagram chat-diagram" ref={ref}>
      {lines.map((l, i) => (
        <div
          key={i}
          className={`bubble bubble--${l.who}${seen ? " in" : ""}`}
          style={{ transitionDelay: `${i * 0.45 + 0.1}s` }}
        >
          {l.text}
        </div>
      ))}
    </div>
  );
};

// ── Voicebot waveform animation ─────────────────────────────────────────────
const Waveform = () => {
  const { ref, seen } = useInView();
  const bars = Array.from({ length: 28 });
  return (
    <div className="diagram wave-diagram" ref={ref}>
      <div className={`wave${seen ? " on" : ""}`}>
        {bars.map((_, i) => (
          <span key={i} style={{ animationDelay: `${(i % 14) * 0.06}s` }} />
        ))}
      </div>
      <div className="wave-label">Voicebot · negotiating price in Hinglish</div>
    </div>
  );
};

// ── ACE browser-automation path + API connection line ──────────────────────
const AutomationPath = () => {
  const { ref, seen } = useInView();
  const stops = ["Reg No.", "Gov Site", "Fill Form", "Scrape", "API → Panel"];
  return (
    <div className="diagram path-diagram" ref={ref}>
      <svg viewBox="0 0 520 90" className={seen ? "on" : ""} preserveAspectRatio="none">
        <path
          className="path-line"
          d="M20 45 H500"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <circle className="path-dot" r="5" fill="var(--magenta)">
          <animateMotion dur="3s" repeatCount="indefinite" path="M20 45 H500" />
        </circle>
      </svg>
      <div className="path-stops">
        {stops.map((s, i) => (
          <span
            key={s}
            className={`path-stop${seen ? " in" : ""}`}
            style={{ transitionDelay: `${i * 0.18}s` }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
};

// ── Generic prompt / audit flow (numbered pipeline with draw-in line) ───────
const PromptFlow = ({ steps }: { steps: FlowStep[] }) => {
  const { ref, seen } = useInView();
  return (
    <div className="diagram flow-diagram" ref={ref}>
      {steps.map((s, i) => (
        <div
          key={s.label}
          className={`flow-pill${seen ? " in" : ""}`}
          style={{ transitionDelay: `${i * 0.14}s` }}
        >
          <span className="flow-pill-num">{i + 1}</span>
          <span className="flow-pill-label">{s.label}</span>
          {i < steps.length - 1 && <span className="flow-pill-arrow">→</span>}
        </div>
      ))}
    </div>
  );
};

const FlowDiagram = ({ kind, steps }: { kind: DiagramKind; steps: FlowStep[] }) => {
  if (kind === "chat") return <ChatBubbles />;
  if (kind === "automation") return <AutomationPath />;
  if (kind === "audit") return <PromptFlow steps={steps} />;
  return <PromptFlow steps={steps} />;
};

export { ChatBubbles, Waveform, AutomationPath, PromptFlow };
export default FlowDiagram;
