# PM Portfolio Revision — Honest Fresher Framing + Premium 3D

**Date:** 2026-06-13 (revision 2)
**Owner:** Yogesh Mishra
**Status:** Approved

## Goal

Revise the live portfolio to represent Yogesh accurately as an **early-career
(1.5–2 yr) AI & Technology Program Manager** — impressive but honest. Remove all
overstated/senior/QA-automation language, correct every initiative, fix all card
alignment, apply a new obsidian palette with dual accent, and add curated
premium 3D/motion.

## Decisions (user-approved)

- **Palette:** bg `#0F172A`, text `#FFFFFF`, primary accent **Acid Green `#00FF87`**
  (CTAs, links, node glow, chips), highlight **Neon Magenta `#FF0055`** (hero
  emphasis word, active states, hover underlines — used sparingly).
- **3D intensity:** curated premium — keep 3D ecosystem hero (recolored), add
  GSAP ScrollTrigger reveals + parallax, 3D hover-tilt cards, lightweight
  animated SVG/CSS diagrams (prompt flow, chat bubbles, voicebot waveform, ACE
  automation path + API lines), framer-motion staggers. Mobile-fast,
  reduced-motion respected, text always readable.

## Terminology purge (global, every file)

Remove: QA Automation, QA testers/teams, AI operations, process playbooks,
"Book a Call", "2 AI products shipped", "built AI systems from scratch",
"scaled AI systems", product leader, senior/enterprise-transformation claims,
"Leadership Cockpit".

## Content corrections (src/data/content.ts is the single source)

- **Hero:** headline "AI & Technology Program Manager"; subheadline + supporting
  line per user; CTAs: View My Work · Explore Initiatives · Download Resume ·
  Contact Me. Metric chips → Chatbot & Voicebot Flows Tested · Prompts Refined ·
  Conversation Audits · Playwright Automation · Cross-functional Execution.
- **About → "How I Work With AI, Teams, and Workflows":** intro per user. 6
  phases retained; **Measure** de-jargoned (no QA automation/playbooks → LLM
  conversation audits, prompt-flow testing, dashboards); **Scale** rewritten to
  realistic repeatability/manual-effort-reduction list.
- **Skills:** exactly user's 6 categories (AI & Prompting, Conversational AI,
  Program & Execution, Workflow Automation, AI Tools, Technical Understanding)
  with listed capabilities.
- **Initiatives (4):**
  1. **ACE — Challan Automation Panel** — AI-assisted full-cycle browser
     automation (Playwright, Claude-assisted; FE+BE+API+testing all by Yogesh).
     Workflow: reg no → chassis/engine → gov sites → scrape → API → admin panel.
  2. **Conversation Audit Automation** — free LLM API keys evaluate human-AI
     chats to extract complete/accurate info; finds missing info, wrong
     responses, broken flows, business-logic misses. Framed as data-extraction /
     manual-effort reduction (NOT AI operations).
  3. **Chatbot & Voicebot Prompt Flow Testing** — manual E2E testing of flows,
     prompts, journeys, edge cases; iterative prompt refinement with AI.
  4. **Manual Workflow Automation** — repeated manual tasks → AI-assisted
     automation workflows.
  Detail pages reframed accordingly; no QA/ops/playbook language.
- **Impact Dashboard:** honest stats, neutral title ("By the Numbers"). Remove
  senior claims; metrics: initiatives contributed to, flows tested, audits,
  automations, manual-effort reduction, cross-functional coordination.
- **Resume:** user's exact Executive Summary + 10 Core Strengths.
- **Contact:** CTAs Email Me · Connect on LinkedIn · View Resume · View GitHub
  (no Book a Call).

## New components

- `TiltCard.tsx` — pointer-driven 3D tilt wrapper (no lib), reduced-motion aware.
- `diagrams/PromptFlow.tsx`, `ChatBubbles.tsx`, `Waveform.tsx`,
  `AutomationPath.tsx` — lightweight animated SVG/CSS, IntersectionObserver-gated.
- `motion.ts` — GSAP ScrollTrigger registration + shared reveal/parallax helpers.

## Layout fixes

12-col CSS Grid, `align-items: stretch`, equal row heights, uniform gutters
(24px) and section padding (`clamp(80px,10vh,120px)`). Specifically fix: About
6-card 3×2 even rows; hero metric chips even row (no orphan); workflow gallery
2×2 balanced; dashboard 3×2 balanced; resume two-column aligned tops.

## Stack / deploy

Add gsap + framer-motion. Keep React Router + react-force-graph-3d. Recolor
EcosystemGraph to green/magenta. Verify tsc + vite build + live browser, push to
Yogi2809/my-portfolio-updated main → Vercel auto-deploy, confirm READY.

## Success criteria

Reads as a capable, honest early-career AI & Tech PM. No senior/QA-automation
language anywhere. All cards aligned. Premium but readable motion. Build clean,
deploy green.
