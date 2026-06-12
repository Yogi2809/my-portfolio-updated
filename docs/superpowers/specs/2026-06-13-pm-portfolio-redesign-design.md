# AI & Technology Program Manager Portfolio — Redesign Spec

**Date:** 2026-06-13
**Owner:** Yogesh Mishra
**Status:** Approved by user

## Objective

Replace the developer-style 3D avatar portfolio with a world-class **AI & Technology
Program Manager** portfolio. Positioning: someone who drives AI initiatives, aligns
business and technology, designs workflows, and leads cross-functional delivery.
Aesthetic: OpenAI × Apple × Stripe × Linear — dark luxury, executive-grade, minimal.

## Key decisions (user-approved)

1. **Avatar removed.** Hero uses `react-force-graph-3d` (vasturiano) — the
   highest-rated purpose-built 3D network graph for React. Hero renders a "living
   AI ecosystem": labeled nodes for AI Systems, Workflows, Teams, Stakeholders,
   Insights, Delivery, connected in an interactive force-directed 3D graph.
2. **Multi-page with React Router.** `/` = single premium scroll with all sections;
   `/initiatives/:slug` = immersive case-study detail pages.
3. **Real numbers only.** All metrics and claims come from the actual resume:
   3 Agile PODs, 12 engineers coordinated, production voicebot + chatbot programs,
   LLM eval/audit pipelines, E2E QA automation, analytics dashboards.

## Stack

- Keep: Vite + React 18 + TypeScript, GSAP (scroll reveal), existing Vercel pipeline
  (`vercel.json` SPA rewrites already present).
- Add: `react-router-dom`, `react-force-graph-3d` (three.js already a dependency).
- Remove: Avaturn avatar (model.glb 14 MB), HDR environment, draco decoder,
  Character/* components, old TechStack physics balls, @react-three/* and rapier deps
  become unused (left in package.json only if removal breaks nothing — prefer removal).

## Routes & sections

`/` (top-to-bottom scroll):
1. **Home** — 3D ecosystem graph hero. H1 "Building Systems That Turn AI Into
   Business Impact". Sub: "AI & Technology Program Manager focused on aligning
   strategy, people, processes, and technology to deliver meaningful outcomes."
   CTAs: Explore My Work / View Strategic Initiatives / Download Resume.
   Floating metric chips (real): 3 Agile PODs · 12 Engineers Coordinated ·
   2 AI Products Shipped · LLM Eval Pipelines · E2E QA Automation.
2. **About — "How I Operate"** — six interactive cards: Discover, Align, Design,
   Execute, Measure, Scale. Each maps to real practice (PRDs, stakeholder
   alignment, Figma flows, sprint delivery, RAID logs, dashboards, retros).
3. **Strategic Initiatives** — 4 executive case-study cards (NOT "projects"):
   - Pre-Inspection Chatbot & Analytics Dashboard (CARS24)
   - Conversation Audit Automation — LLM evaluation pipeline (CARS24)
   - Voicebot Prompt Lifecycle Program (CARS24)
   - Traffic Challan Bot (CARS24)
   Each card → `/initiatives/:slug` detail page with: Overview, Problem,
   Stakeholders, Execution Framework, Workflow Design (SVG flow diagram),
   Implementation, Outcomes, Learnings. No code snippets — diagrams only.
4. **Skills & Expertise** — expandable knowledge clusters: AI Strategy, Program
   Management, Technical Coordination, Workflow Design, Stakeholder Management,
   Product Thinking, Data & Analytics, Execution Excellence. Each expands to show
   capabilities, applications, tools (SQL, Power BI, Python, Jira, Agile/Scrum,
   OpenAI API, Playwright, Figma).
5. **Experience — Strategic Journey** — interactive vertical journey:
   CARS24 (Program Management Intern, Jan 2025–Present), 99acres/Info Edge
   (Taxonomist, Jul 2024), Codtech (Power BI & SQL Intern, May 2024), PIMR
   (Academic Research, Nov 2023). Each: Mission, Scope, Approach, Results, Skills.
   Includes **AI Workflow Gallery**: consulting-grade SVG artifacts (prompt
   lifecycle pipeline, audit automation flow, POD coordination model, escalation
   decision tree).
6. **Impact Dashboard** — leadership cockpit with animated counters (real counts)
   and program health panels.
7. **Resume** — executive summary, key highlights, core competencies, Download
   Resume (existing PDF at /Yogesh_Mishra_PM_Resume.pdf), LinkedIn, GitHub.
8. **Contact — "Let's Build Meaningful AI Systems"** — email, LinkedIn, GitHub,
   resume download, Calendly placeholder. Command-center aesthetic.

## Visual system

- Tokens: bg `#08080d`, surface `#0e0e16`, border `rgba(255,255,255,0.08)`,
  text `#ededf2`, muted `#8a8a96`, accent teal `#14b8a6`, accent-soft `#5eead4`.
- Typography: Geist (already loaded), generous letter-spacing on labels,
  72–96px display headlines on desktop.
- Components: glass panels (1px borders, subtle blur), pill chips, ghost buttons
  with accent hover, dotted-grid backgrounds, progressive reveal via GSAP
  ScrollTrigger, micro-interactions on hover.
- Mobile-first: hero graph reduces node count and disables drag on touch;
  sections stack; nav collapses to hamburger.

## Data architecture

All content lives in `src/data/content.ts` as typed structures (metrics,
initiatives with full case-study fields, skill clusters, experience entries,
gallery artifacts). Components are pure renderers — content edits never touch
components.

## File structure

```
src/
  main.tsx            — router bootstrap
  App.tsx             — routes: / and /initiatives/:slug
  data/content.ts     — all typed content
  styles/theme.css    — tokens + base + utilities
  styles/app.css      — section styles
  components/SiteNav.tsx, Footer.tsx, Reveal.tsx (scroll reveal wrapper)
  sections/Hero.tsx, About.tsx, Initiatives.tsx, Skills.tsx,
           Experience.tsx, Dashboard.tsx, ResumeCenter.tsx, Contact.tsx
  pages/HomePage.tsx, InitiativeDetail.tsx
```

## Error handling & performance

- Force-graph lazy-loaded via `React.lazy` (keeps initial bundle small; the old
  2.3 MB TechStack chunk disappears with the avatar/physics removal).
- Graph falls back to a static CSS network illustration if WebGL unavailable.
- `prefers-reduced-motion` disables GSAP animations and graph auto-rotation.
- Initiative slugs not found → redirect to `/`.

## Deploy

Push to `Yogi2809/my-portfolio-updated` `main` → Vercel auto-deploy
(project `yogesh-mishra-portfolio`, domain `portfolio-yogesh-mishra.vercel.app`).
Verify deployment state READY + build logs clean.

## Success criteria

A recruiter concludes: understands AI deeply; coordinates complex technical
initiatives; aligns people, processes, technology; transforms AI opportunities
into measurable outcomes; strong product/program/operational thinking.
