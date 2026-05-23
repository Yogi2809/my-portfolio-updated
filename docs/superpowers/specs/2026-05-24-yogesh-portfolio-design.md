# Yogesh Mishra 3D Portfolio — Design Spec

**Date:** 2026-05-24  
**Project:** `/Users/a39935/3d-portfolio`  
**Avatar:** `/Users/a39935/Downloads/model.glb` (14MB, ReadyPlayerMe GLB)  
**Resume:** `/Users/a39935/Downloads/Yogesh_Mishra_PM_Resume.pdf`

---

## Overview

Adapt Akash Malhotra's 3D portfolio into Yogesh Mishra's personal portfolio. The codebase architecture (React 18 + TypeScript + Vite, raw Three.js character scene, R3F + Rapier physics, GSAP ScrollSmoother) is retained. Changes are: avatar model, all content, project data, tech icons, colors, one new component (NeuralCanvas), and one new section (Let's Connect).

---

## 1. File Change Map

### New / Modified Source Files

| File | Change |
|------|--------|
| `public/models/model.glb` | Copy from `~/Downloads/model.glb` |
| `public/images/figma.webp` | New tech icon |
| `public/images/jira.webp` | New tech icon |
| `public/images/openai.webp` | New tech icon |
| `public/images/claude.webp` | New tech icon |
| `public/images/powerbi.webp` | New tech icon |
| `public/images/sql.webp` | New tech icon |
| `public/images/playwright.webp` | New tech icon |
| `public/images/git.webp` | New tech icon |
| `public/images/vercel.webp` | New tech icon |
| `src/components/Character/utils/character.ts` | Remove decrypt, load `model.glb` directly |
| `src/components/Character/utils/animationUtils.ts` | Replace clip-dependent animations with procedural idle |
| `src/components/utils/GsapScroll.ts` | Remove monitor/screenlight/spine005 mesh refs, keep scroll character movement |
| `src/components/Landing.tsx` | Yogesh Mishra, AI/Technical Program Manager |
| `src/components/Navbar.tsx` | YM monogram, Yogesh's LinkedIn URL |
| `src/components/About.tsx` | Resume-based bio |
| `src/components/WhatIDo.tsx` | AI Prompting + Program Management cards |
| `src/components/Career.tsx` | 5 timeline entries from resume |
| `src/components/Work.tsx` | 3 projects, conditional link logic |
| `src/components/TechStack.tsx` | 9 PM/AI tool icons |
| `src/components/Contact.tsx` | Yogesh's contact info + education |
| `src/components/SocialIcons.tsx` | Yogesh's LinkedIn + GitHub |
| `src/components/MainContainer.tsx` | Add `<LetsConnect />` before `<Contact />` |
| `src/components/NeuralCanvas.tsx` | **NEW** — animated neural network background |
| `src/components/LetsConnect.tsx` | **NEW** — CTA section |
| `src/components/styles/LetsConnect.css` | **NEW** |

---

## 2. Avatar / Character System

### Loading
Replace `character.ts` decryption flow with direct `GLTFLoader` load of `/models/model.glb`. Keep `DRACOLoader` setup (RPM models may use DRACO). Remove all references to `decryptFile`.

```ts
// New character.ts — simplified
loader.load('/models/model.glb', async (gltf) => {
  const character = gltf.scene;
  await renderer.compileAsync(character, camera, scene);
  character.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  resolve(gltf);
  setCharTimeline(character, camera);
  setAllTimeline();
});
```

### Bone Names (ReadyPlayerMe standard)
- Head tracking: `Head` (RPM) instead of `spine006`
- Neck/look: `Neck` instead of `spine005`
- Breathing: `Spine1` or `Spine2`

Update `mouseUtils.ts` head rotation to use `Head` bone. Update `GsapScroll.ts` neck reference from `spine005` → `Neck`.

### Animations
RPM avatars shipped from ReadyPlayerMe may include no named clips. On load, log `gltf.animations.map(c => c.name)` to console. The animation strategy:

**If clips exist**: find and play them using existing `animationUtils.ts` pattern.

**If no clips (expected)**: replace all clip-based animation with procedural:
- **Idle breathing**: sine-wave scale on `Spine1` bone (±0.008 on Y, period ~3s)
- **Idle sway**: very subtle sine on `Spine` rotation Y (±0.01, period ~5s)
- **Blink**: morph target `eyesClosed` if present; otherwise skip
- **Hover eyebrow**: if `eyebrowInnerUp_L`/`eyebrowInnerUp_R` morph targets exist, animate them on hover

`animationUtils.ts` must **not crash** if named clips are absent — wrap all `findByName` calls in null-guards.

### GsapScroll Simplification
Remove all references to:
- `Plane004` (monitor mesh — not in RPM model)
- `screenlight` (emissive screen — not in RPM model)
- Monitor material opacity animations

Keep:
- Character Y rotation during scroll (landing → about transition)
- Camera Z movement
- Character model X position offset (slides left as About appears)
- Neck bone rotation on tl2 (use `Neck` bone name with null-guard)
- Character slides off screen on tl3

The `screenlight` flickering GSAP repeat timeline must be removed or null-guarded so it doesn't throw when the mesh doesn't exist.

### Avatar Clothing Color
Set shirt mesh color to match teal accent. RPM mesh names vary — traverse and check for common shirt mesh names (`Wolf3D_Outfit_Top`, `Wolf3D_Body`) and apply `#0A9E8A`. If not found, skip silently.

---

## 3. Neural Network Canvas (NEW: NeuralCanvas.tsx)

A `<canvas>` element rendered behind the 3D character in the hero section.

**Behavior:**
- ~60 floating nodes; each has random velocity (±0.3px/frame)
- Edges drawn between nodes when distance < 130px; opacity proportional to closeness
- Cursor influence: nodes within 120px radius are gently pushed away
- Animation loop: `requestAnimationFrame` in `useEffect`, cleaned up on unmount

**Visual:**
- Node color: `rgba(14, 246, 204, 0.7)` (teal)
- Edge color: `rgba(14, 246, 204, 0.12)`
- Node radius: 2px
- Canvas fills hero section via `position: absolute; inset: 0; z-index: 0`
- Character container sits at `z-index: 1`

**Performance:**
- Canvas size set once; `ResizeObserver` updates on container resize
- Node count capped at 60 to stay under 16ms frame budget

---

## 4. Content — All Sections

### 4.1 Navbar
```
Monogram: YM
LinkedIn URL: https://www.linkedin.com/in/yogesh-mishra-pm/
Nav links: ABOUT | WORK | CONTACT
```

### 4.2 Landing / Hero
```
Hello! I'm
YOGESH
MISHRA

AI / Technical
Program Manager
```

### 4.3 About
```
AI/Technical PM with 1.5+ years at Cars24 — owning voicebot and chatbot 
delivery end-to-end. From writing prompts and running E2E tests to shipping 
a 3,500+ calls/day price-negotiation voicebot and an LLM-powered QA pipeline 
that replaced 2 analysts, I bridge product, engineering, and business to get 
things from requirement to production.
```

### 4.4 What I Do (2 cards)

**Card 1 — AI & PROMPTING**  
Subtitle: "Voicebots, Chatbots & LLM Pipelines"  
Body: "I own the full prompt lifecycle — writing, testing, iterating, and shipping prompts for production voicebots and chatbots. End-to-end from requirement to live, including E2E testing and QA automation."  
Tags: `Voicebot Prompting`, `Chatbot Prompting`, `Prompt Engineering`, `E2E Testing`, `LLM QA`, `OpenAI API`

**Card 2 — PROGRAM MANAGEMENT**  
Subtitle: "Agile Delivery for Engineering Teams"  
Body: "I run 3-pod Agile delivery for 12-engineer teams — grooming story points, maintaining RAID logs, writing PRDs and Figma flows, and keeping cross-functional stakeholders aligned from sprint to release."  
Tags: `PRD Writing`, `Agile / Scrum`, `RAID Logs`, `Figma`, `Jira`, `Release Management`

### 4.5 Career / Experience (5 entries)

```
1. AI/Technical Program Manager | Cars24 | NOW / Jan 2025–Present
   Led 3-pod delivery for 12-engineer team. Shipped price-negotiation voicebot 
   (3,500+ calls/day, ~33% conversion), LLM chatbot QA pipeline, Pre-Inspection 
   analytics dashboard, and Zendesk automations (1,500+ tickets/month). Managed 
   ECS→EKS and Bitbucket→GitHub migrations.

2. Research Analyst | 99acres.com | Jul–Oct 2024
   Analyzed 24,000+ property listings using Google Maps, RERA, and govt datasets 
   for geospatial and data quality validation.

3. Power BI & SQL Intern | CODTECH IT Solutions | May–Jul 2024
   Built Sales, HR, and Marketing ROI dashboards in Power BI; wrote SQL queries 
   for reporting across 3 business functions.

4. MBA in Business Analytics | PIMR, Gwalior | Aug 2023–May 2025
   Specialization in Business Analytics.

5. B.Sc in Mathematics | Jiwaji University, Gwalior | Aug 2019–Jul 2022
```

### 4.6 Projects / Work (3 cards)

```
01 | ChallanBot — Challan Automation Panel
   Category: Automation Tool · Cars24 (Under Testing)
   Description: Independently designed and built using Claude AI and Figma. 
   Takes an Appointment ID, auto-fetches vehicle details via GET API, then runs 
   automated checks across government websites to retrieve traffic challans for 
   60+ QC operators.
   GitHub link: https://github.com/Yogi2809/challan-fetch-automation  ← show icon
   
02 | ConvoAudit — LLM Chatbot QA Pipeline
   Category: QA Automation · Cars24
   Description: Processes 225 sessions/day (~7,000 rows), classifies 10+ 
   intent/issue categories, generates daily QA reports in 15–30 min. Replaced 
   2 analysts spending 8 hrs/day on 30–40 manual cases.
   Link: none  ← NO icon, NO link

03 | PreInspect AI — Conversational Analytics Dashboard
   Category: Analytics Dashboard · Cars24
   Description: Tracks 2,700 sessions/month with sentiment cross-filter, 
   cancellation funnel, and regional drill-downs. Primary monitoring tool for 
   CeX and Inspection team leadership.
   Link: none  ← NO icon, NO link
```

**Work.tsx link logic:** Only render the link button/icon when `project.link` is defined and non-empty. Use `project.link ? <a href={...}>GitHub ↗</a> : null` pattern.

### 4.7 TechStack (Physics Balls)

9 balls using these icons:
```
/images/figma.webp
/images/jira.webp
/images/openai.webp
/images/claude.webp
/images/powerbi.webp
/images/sql.webp
/images/playwright.webp
/images/git.webp
/images/vercel.webp
```

Balls count stays 30 (random picks from 9 materials, same as current 8). The heading "My Techstack" stays but can be changed to "My Toolkit" to better reflect PM tools.

### 4.8 Let's Connect (NEW section)

Placed **between Career and Work sections** in `MainContainer.tsx`.

Visual: Full-width dark section with a large centered CTA.

Content:
```
LOOKING TO BUILD SOMETHING GREAT?
Let's Connect

[Email Me ↗]   [LinkedIn ↗]
yogesh.mishra080202@gmail.com
```

Style: Match existing dark aesthetic. Two pill buttons (filled teal for Email, outlined for LinkedIn). Section uses GSAP ScrollTrigger fade-in from below (consistent with existing section animations).

CSS class: `.lets-connect-section`

### 4.9 Contact

```
Connect:
  LinkedIn — yogesh-mishra-pm → https://www.linkedin.com/in/yogesh-mishra-pm/
  Email — yogesh.mishra080202@gmail.com

Education:
  MBA in Business Analytics, PIMR, Gwalior — 2023–2025
  B.Sc in Mathematics, Jiwaji University, Gwalior — 2019–2022
  Certification: Atlassian Agile PM Professional Certificate

Social:
  GitHub → https://github.com/Yogi2809
  LinkedIn → https://www.linkedin.com/in/yogesh-mishra-pm/

Footer:
  "Portfolio of Yogesh Mishra"  © 2026
```

Remove YouTube and Instagram links (Akash's). Keep only GitHub + LinkedIn for Yogesh.

### 4.10 SocialIcons

Update URLs to:
- LinkedIn: https://www.linkedin.com/in/yogesh-mishra-pm/
- GitHub: https://github.com/Yogi2809

---

## 5. Color / Visual Theme

| Token | Old (Akash) | New (Yogesh) |
|-------|-------------|--------------|
| Accent color | `#8B4513` (brown/shirt) | `#0EF6CC` (teal) |
| Heading spans | white | `#0EF6CC` |
| Navbar monogram | AM | YM |
| Avatar shirt | brown | `#0A9E8A` (teal-green) |
| Neural canvas nodes | — (new) | `rgba(14, 246, 204, 0.7)` |
| Neural canvas edges | — (new) | `rgba(14, 246, 204, 0.12)` |

Find all CSS `color`, `background`, `border` values using the old accent colors and replace with teal. The dark background (`#0f0f0f` / `#111`) stays unchanged.

---

## 6. Procurement: Tech Icon Images

9 images needed as `.webp` in `public/images/`. Strategy: download official logos from their respective CDNs/sites as PNGs, convert to `.webp`, name to spec. Fallback: use colored canvas-drawn placeholder circles with text if downloads fail.

Sources (all free/public):
- Figma: figma.com/brand
- Jira: atlassian.com brand assets
- OpenAI: openai.com brand
- Claude: anthropic.com
- Power BI: Microsoft brand kit
- SQL: generic PostgreSQL/SQLite logo
- Playwright: playwright.dev
- Git: git-scm.com/downloads/logos
- Vercel: vercel.com/design/brand

---

## 7. Implementation Order

1. Copy `model.glb` → `public/models/model.glb`
2. Download/create 9 tech icons → `public/images/`
3. Update `character.ts` (load model.glb, no decrypt)
4. Update `animationUtils.ts` (procedural idle, null-guards)
5. Update `GsapScroll.ts` (remove model-specific mesh refs, fix bone names)
6. Update `mouseUtils.ts` (Head bone)
7. Update `Landing.tsx`
8. Update `Navbar.tsx`
9. Update `About.tsx`
10. Update `WhatIDo.tsx`
11. Update `Career.tsx`
12. Update `Work.tsx` (conditional links)
13. Update `TechStack.tsx` (new icons, count 9)
14. Create `NeuralCanvas.tsx` + wire into `Landing.tsx`
15. Create `LetsConnect.tsx` + `styles/LetsConnect.css` + wire into `MainContainer.tsx`
16. Update `Contact.tsx`
17. Update `SocialIcons.tsx`
18. Global CSS: replace accent color tokens

---

## 8. Constraints

- **No link = no link icon**: Projects without a URL must not render any anchor or arrow icon
- **One page, production-ready**: Must build cleanly (`tsc -b && vite build` with zero errors)
- **Avatar must not crash**: All bone/mesh lookups must be null-guarded — the model may differ from Akash's
- **Mobile**: Existing responsive breakpoints (`> 1024px` for character, `> 1024px` for TechStack) stay unchanged
- **No new npm packages** unless absolutely necessary (prefer using existing three, gsap, r3f, rapier)
