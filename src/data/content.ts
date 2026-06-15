// ─────────────────────────────────────────────────────────────────────────────
// All portfolio content lives here. Components are pure renderers.
// Honest, early-career (1.5–2 yr) AI & Technology Program Manager framing.
// Avoids inflated/senior claims — accurate to real hands-on experience.
// ─────────────────────────────────────────────────────────────────────────────

export const identity = {
  name: "Yogesh Mishra",
  role: "AI & Technology Program Manager",
  headline: "AI & Technology Program Manager",
  subheadline:
    "I design, test, and improve AI-powered workflows by combining business logic, prompt iteration, conversational testing, and AI-assisted automation.",
  supporting:
    "Focused on chatbot and voicebot flows, workflow automation, prompt refinement, conversation audits, and cross-functional execution.",
  email: "yogesh.mishra080202@gmail.com",
  github: "https://github.com/Yogi2809",
  linkedin: "https://www.linkedin.com/in/yogesh-mishra-pm",
  resumePdf: "/Yogesh_Mishra_PM_Resume.pdf",
};

// Hero capability pills — the core things I do, shown as a clean tag cloud
export const heroCapabilities = [
  "E2E Program Ownership & Execution",
  "Prompt Engineering",
  "LLM Audit Automation",
  "Playwright Automation",
  "Agile Methodologies",
  "Scrum Ceremonies",
  "Jira",
  "Cross-Functional Collaboration",
];

// ── How I Work With AI, Teams, and Workflows ─────────────────────────────────
export interface OperatingStep {
  step: string;
  title: string;
  description: string;
  practices: string[];
}

export const operatingModel: OperatingStep[] = [
  {
    step: "01",
    title: "Understand",
    description:
      "I start with the business requirement — what the team actually needs the AI to do, who the user is, and where the current flow breaks.",
    practices: ["Requirement understanding", "Stakeholder questions", "User-journey context"],
  },
  {
    step: "02",
    title: "Map the Logic",
    description:
      "I translate requirements into clear flows and business logic — the rules a chatbot or voicebot should follow before anyone touches a prompt.",
    practices: ["Business logic mapping", "Flow design", "Edge-case planning"],
  },
  {
    step: "03",
    title: "Refine Prompts",
    description:
      "I work on pre-built AI systems and improve them — writing and refining prompts so the AI follows the business logic and handles real user journeys.",
    practices: ["Prompt writing", "Prompt refinement", "AI-assisted iteration"],
  },
  {
    step: "04",
    title: "Test End-to-End",
    description:
      "I manually test chatbot and voicebot flows end to end — checking conversation accuracy, edge cases, missing information, flow breaks, and business-logic failures.",
    practices: ["Manual E2E testing", "Conversational flow testing", "Edge-case testing"],
  },
  {
    step: "05",
    title: "Audit & Measure",
    description:
      "I use free LLM APIs to audit conversations — surfacing missing info, incorrect responses, and broken flows so the next iteration is better.",
    practices: ["LLM conversation audits", "Data-extraction checks", "Iterative feedback"],
  },
  {
    step: "06",
    title: "Make It Repeatable",
    description:
      "Scale, for me, means repeatability — turning repeated manual tasks into automation, refining workflows, and making processes easier for the team to use consistently.",
    practices: ["Manual-task automation", "Reusable logic patterns", "Workflow documentation"],
  },
];

// ── Strategic Initiatives ────────────────────────────────────────────────────
export interface FlowStep {
  label: string;
  detail: string;
}

export type DiagramKind = "automation" | "audit" | "chat" | "flow";

export interface Initiative {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  org: string;
  period: string;
  diagram: DiagramKind;
  tags: string[];
  challenge: string;
  businessContext: string;
  role: string[];
  objectives: string[];
  approach: string;
  workflow: FlowStep[];
  tools: string[];
  implementation: string;
  impact: string[];
  learnings: string[];
  repos?: { label: string; url: string }[];
}

export const initiatives: Initiative[] = [
  {
    slug: "ace-challan-automation",
    title: "ACE — Challan Automation Panel",
    tagline:
      "An AI-assisted browser automation panel that reduces manual traffic-challan lookup effort across multiple government websites.",
    category: "Automation Project",
    org: "CARS24",
    period: "2025",
    diagram: "automation",
    tags: ["Playwright", "Node.js", "Multi-Scraper"],
    challenge:
      "Before buying a used car, Cars24's QC team has to verify outstanding government traffic challans against the vehicle number across 10+ state and national portals — manually entering numbers, solving CAPTCHAs, and recording results. At ~2,000 inspections/day it took 15–20 minutes per vehicle with an 8–12% miss rate from fatigue.",
    businessContext:
      "Undetected challans become Cars24's liability at the point of sale — a single missed fine can cost ₹5,000–₹50,000 in disputes. At 2,000 vehicles a day even a 2% miss rate is real financial exposure, so the check has to be fast, reliable, and complete.",
    role: [
      "Built the Playwright multi-scraper engine for 10+ government challan portals",
      "Moved scrapers from sequential to parallel execution (9+ min → under 4)",
      "Designed the job-queue, proxy-routing, and admin-panel submission flow",
      "Worked through each portal's forms, CAPTCHAs, and layouts; tested and debugged",
    ],
    objectives: [
      "Fetch challans from every required portal automatically by vehicle number",
      "Deduplicate results and submit them to the Cars24 admin panel via the Challan Service API",
      "Scale toward ~2,000 inspections/day reliably — not a single-user local tool",
    ],
    approach:
      "Built with AI assistance as a Node.js automation engine: Playwright (headless Chrome) scrapers run in parallel, jobs distribute through a BullMQ/Redis queue across EC2 workers, and traffic routes through Bright Data proxies so government sites don't block the cloud IP. Results land in MongoDB before being pushed to the admin panel. I worked portal-by-portal until the scraping held up.",
    workflow: [
      { label: "Input vehicle number", detail: "Reg number entered by the QC operator" },
      { label: "Queue the job", detail: "BullMQ/Redis distributes work across EC2 workers" },
      { label: "Scrape in parallel", detail: "Playwright hits 10+ portals via Bright Data proxy" },
      { label: "Deduplicate", detail: "Findings merged across portals, stored in MongoDB" },
      { label: "Submit to panel", detail: "Pushed to the admin panel via Challan Service API" },
    ],
    tools: ["Playwright", "Node.js", "BullMQ / Redis", "MongoDB", "Bright Data Proxy", "AWS EC2"],
    implementation:
      "A Node.js multi-scraper engine: Playwright headless-Chrome scrapers for 10+ government portals running in parallel, a BullMQ/Redis job queue across EC2 workers, Bright Data proxy routing (datacenter with residential fallback) to avoid IP blocks, MongoDB storage, and submission to Cars24's existing Challan Service API — built and tested portal-by-portal with AI assistance.",
    impact: [
      "Cut per-vehicle challan lookup from 9+ minutes to under 4",
      "Targets a challan miss rate under 1% (from 8–12% manual)",
      "Lets a 30-operator QC team clear ~2,000 inspections/day instead of stalling near 500",
    ],
    learnings: [
      "Government portals are inconsistent — reliable scraping is mostly edge-case and CAPTCHA handling",
      "Parallel execution plus a job queue is what turns a local prototype into something that scales",
      "Cloud scraping needs proxy routing, or government sites block the server outright",
    ],
    repos: [
      { label: "challan-fetch-automation", url: "https://github.com/Yogi2809/challan-fetch-automation" },
    ],
  },
  {
    slug: "conversation-audit-automation",
    title: "Conversation Audit Automation",
    tagline:
      "A Streamlit + Gemini pipeline that audits chatbot conversations on free LLM keys and outputs a structured audit CSV — replacing manual transcript review.",
    category: "AI Workflow Project",
    org: "CARS24",
    period: "2025",
    diagram: "audit",
    tags: ["Gemini API", "LLM Evaluation", "Data Extraction"],
    challenge:
      "Auditing chatbot conversations meant reading transcripts by hand and copying details into an audit sheet — slow, inconsistent, and impossible to keep up with as volume grew.",
    businessContext:
      "Every inspection and price-negotiation conversation needs to be checked for what the bot did, what the customer wanted, which price was pitched, and whether a ticket was raised. Without automation, that audit work doesn't scale.",
    role: [
      "Designed the audit pipeline — a local Streamlit app calling Gemini",
      "Defined the structured output schema to match the audit sheet exactly",
      "Built confidence scoring so low-certainty rows (< 0.75) flag for manual review",
      "Ran it on the free Gemini tier to keep cost at zero",
    ],
    objectives: [
      "Classify each conversation into a structured row automatically",
      "Extract intent, bot action, negotiation pitches (CEP/CNP, first→final), ticket info",
      "Flag uncertain classifications for a human to review instead of trusting blindly",
    ],
    approach:
      "Built with Claude assistance: a Streamlit app takes a raw conversation CSV, sends each chat to Gemini with a strict classification prompt, and writes a clean audit CSV. Rows the model isn't confident about are sorted to the bottom for a quick human pass — so automation handles the bulk and people only check the edge cases.",
    workflow: [
      { label: "Upload raw chats", detail: "Conversation export dropped into the Streamlit app" },
      { label: "Gemini classifies", detail: "Each chat → intent, action, pitches, ticket, issue" },
      { label: "Confidence score", detail: "Rows < 0.75 flagged 'Needs Review'" },
      { label: "Structured CSV out", detail: "Matches the audit sheet columns exactly" },
      { label: "Human spot-check", detail: "Only flagged rows need eyes; rest is done" },
    ],
    tools: ["Gemini API (free tier)", "Streamlit", "Python", "Prompt Engineering"],
    implementation:
      "A local Streamlit app on the Gemini free tier (~800 conversations/hour). It outputs a ready-to-paste audit CSV — session, intent, bot action, raise type, ticket, CEP/CNP, first/second/third/final pitch, issue category and resolution — with a confidence flag that routes only uncertain rows to manual review.",
    impact: [
      "Replaced manual transcript auditing with a one-click pipeline",
      "~800 conversations/hour at zero API cost (free Gemini tier)",
      "Consistent, structured audit data — and humans only review the uncertain rows",
    ],
    learnings: [
      "Free LLM tiers are genuinely enough to build a useful production-adjacent workflow",
      "A confidence threshold beats blind trust — automate the bulk, escalate the doubt",
      "Matching the output schema to the existing sheet made adoption effortless",
    ],
  },
  {
    slug: "prompt-flow-testing",
    title: "Chatbot & Voicebot Prompt Flow Testing",
    tagline:
      "End-to-end testing and prompt refinement for production CARS24 bots — price-negotiation chatbots, a pre-inspection assistant, and Hinglish negotiation & intent voicebots.",
    category: "Prompt & Conversation Testing",
    org: "CARS24",
    period: "2025",
    diagram: "chat",
    tags: ["Manual E2E Testing", "Prompt Engineering", "Conversational AI"],
    challenge:
      "These bots run real money conversations — negotiating used-car prices against strict floors and ceilings, raising auctions, rescheduling inspections, and raising tickets. A single prompt slip can pitch an invalid price, break a tool call, or mishandle a frustrated seller.",
    businessContext:
      "The bots enforce hard business logic: price-validation gates, negotiation ladders by CEP band, defense libraries, tool-call discipline (price_nego, start_auction, fetch_slots, tickets), and Hinglish/Devanagari number normalization on voice. All of it has to hold up across messy, real-world conversations.",
    role: [
      "Manually tested the QNR/DSQ price-negotiation chatbot end to end (price ladder, defenses, auction start, ticket rules)",
      "Tested the Autonaut pre-inspection assistant (status, reschedule, cancel, CJ contact, slot logic)",
      "Tested the Hinglish voicebots — target-price & C24-quote negotiation (Sneha) and intent capture (Aditi)",
      "Refined prompts iteratively to fix invalid pitches, broken tool calls, and edge-case failures",
    ],
    objectives: [
      "Validate negotiation logic — price floors/ceilings, ladder bands, single-defense budget, retired prices",
      "Verify tool-call discipline and state handling (no false commitments, correct previousPitchedPrice/roundNumber)",
      "Stress edge cases: silence timeouts, ambiguous price tails, Hinglish number normalization, angry/venting users",
    ],
    approach:
      "I walked each bot as a real seller would — pushing CEPs above and below the limits, rejecting pitches, changing prices mid-flow, sending emoji-only and noisy inputs — then logged every place the prompt broke business logic and refined it through repeated test → feedback → re-test cycles.",
    workflow: [
      { label: "Walk the journey", detail: "QNR/DSQ negotiation, inspection reschedule, voice intent" },
      { label: "Break the rules", detail: "Out-of-range CEPs, repeated rejections, new counters" },
      { label: "Probe edge cases", detail: "Silence, ambiguous tails, Hinglish numbers, venting" },
      { label: "Log the failures", detail: "Invalid pitch, bad tool call, wrong defense, false commit" },
      { label: "Refine & re-test", detail: "Tighten the prompt, run the flow again" },
    ],
    tools: ["Manual E2E Testing", "Prompt Engineering", "Conversation Analysis", "Claude"],
    implementation:
      "Hands-on testing across five production prompts — two price-negotiation chatbots, the pre-inspection assistant, and two Hinglish voicebots — checking that each held its price-validation gates, negotiation ladder, tool sequencing, and number normalization, then refining the prompts to close the gaps.",
    impact: [
      "Caught invalid-price and broken-tool-call cases before they reached sellers",
      "Improved conversational accuracy and adherence to the negotiation rules",
      "Made the bots more reliable across edge cases and Hinglish voice input",
    ],
    learnings: [
      "Price-critical bots live or die on edge cases — push the limits, not the happy path",
      "Tool-call discipline and state (previous pitch, round number) is where prompts quietly break",
      "On voice, number normalization (Devanagari/Hinglish) is a whole test surface of its own",
    ],
  },
  {
    slug: "manual-workflow-automation",
    title: "Manual Workflow Automation",
    tagline:
      "Three AI-assisted automations that took repeated daily tasks off the team — challan-ticket closure, Zendesk agent reporting, and CJ-details pulls.",
    category: "Automation Project",
    org: "CARS24",
    period: "2025",
    diagram: "flow",
    tags: ["Workflow Automation", "Zendesk", "AI-Assisted"],
    challenge:
      "Several daily operational tasks were pure repetition — closing resolved challan tickets one by one, compiling Zendesk agent reports by hand, and looking up Car Jockey (CJ) details for research. High volume, low value, easy to fall behind on.",
    businessContext:
      "Support and research teams lose hours to repeatable busywork. Each of these tasks followed a fixed pattern — exactly what an automation can own, freeing people for judgment work.",
    role: [
      "Spotted the three highest-repetition tasks worth automating",
      "Built challan-ticket-closure automation to bulk-close resolved tickets",
      "Built Zendesk agent-report automation to compile reports automatically",
      "Built RA CJ-details automation to pull Car Jockey details on demand",
    ],
    objectives: [
      "Replace manual challan-ticket closure with a scripted bulk flow",
      "Generate Zendesk agent reports without manual compilation",
      "Automate repetitive CJ-details lookups for the research team",
    ],
    approach:
      "For each task I mapped the manual steps, then built a small automation with AI assistance and tested the outputs against real data until they were dependable enough for the team to run themselves. Each lives in its own repo so it's easy to maintain and hand over.",
    workflow: [
      { label: "Spot the repetition", detail: "Challan closures, agent reports, CJ lookups" },
      { label: "Map the manual steps", detail: "Turn each routine into a clear, fixed flow" },
      { label: "Build with AI", detail: "Script the automation, one repo per task" },
      { label: "Test on real data", detail: "Validate outputs until dependable" },
      { label: "Hand over", detail: "Team runs it without me" },
    ],
    tools: ["Python", "Zendesk", "APIs", "AI-Assisted Build"],
    implementation:
      "Three standalone automations: challan-ticket-closure-automation (bulk-closes resolved challan tickets), zendesk-agent-report-automation (compiles agent reports), and ra-cj-details-automation (pulls Car Jockey details for research) — each built with AI assistance and tested before handover.",
    impact: [
      "Removed three repeated daily tasks from the team's plate",
      "Faster, more consistent ticket closure and reporting",
      "Reusable, self-serve tools the team runs independently",
    ],
    learnings: [
      "The best automation targets are the boring tasks people repeat daily",
      "One repo per task keeps each automation easy to maintain and hand over",
      "An automation only sticks if the team can run it without me",
    ],
    repos: [
      { label: "challan-ticket-closure-automation", url: "https://github.com/Yogi2809/challan-ticket-closure-automation" },
      { label: "zendesk-agent-report-automation", url: "https://github.com/Yogi2809/zendesk-agent-report-automation" },
      { label: "ra-cj-details-automation", url: "https://github.com/Yogi2809/ra-cj-details-automation" },
    ],
  },
];

// ── Skills & Expertise (user's exact 6 categories) ──────────────────────────
export interface SkillCluster {
  title: string;
  summary: string;
  capabilities: string[];
  tools: string[];
}

export const skillClusters: SkillCluster[] = [
  {
    title: "AI & Prompt Engineering",
    summary: "Writing and refining prompts that make voicebots and chatbots follow real business logic.",
    capabilities: [
      "Prompt Engineering",
      "Voicebot & Chatbot Prompting",
      "LLM API Integration",
      "Prompt iteration & refinement",
      "Business-logic prompting",
    ],
    tools: ["OpenAI API", "Claude AI", "LLM APIs"],
  },
  {
    title: "Conversational AI",
    summary: "Designing the flows, fallbacks, and handoffs behind production voice and chat bots.",
    capabilities: [
      "Voicebot flow design",
      "Chatbot flow design",
      "Fallback & RA-handoff conditions",
      "Negotiation-flow design",
      "User-journey validation",
    ],
    tools: ["Voicebot", "Chatbot", "Figma"],
  },
  {
    title: "Testing & QA",
    summary: "Validating AI behavior end to end before it reaches real users.",
    capabilities: [
      "Manual E2E Testing",
      "Playwright automation",
      "LLM conversation audits",
      "Edge-case testing",
      "Response-quality evaluation",
    ],
    tools: ["Playwright", "OpenAI API", "E2E Testing"],
  },
  {
    title: "Product Management",
    summary: "Turning requirements into clear specs, roadmaps, and measurable outcomes.",
    capabilities: [
      "PRD Writing",
      "Product Roadmapping",
      "OKRs / KPIs",
      "Stakeholder Management",
      "SDLC",
    ],
    tools: ["Figma", "Confluence"],
  },
  {
    title: "Agile Delivery",
    summary: "Running multi-pod Agile delivery and keeping a 12-engineer team on track.",
    capabilities: [
      "Agile (Scrum / Kanban)",
      "Story pointing (Fibonacci)",
      "Jira",
      "RAID Logs",
      "Release Management",
    ],
    tools: ["Jira", "Confluence"],
  },
  {
    title: "Data & Analytics",
    summary: "Building the dashboards and analysis that show whether the work is working.",
    capabilities: [
      "Power BI",
      "SQL",
      "Analytics dashboards",
      "Conversation analytics",
      "Reporting",
    ],
    tools: ["Power BI", "SQL"],
  },
  {
    title: "Automation & Integration",
    summary: "Wiring up APIs and automations that take repeated work off the team.",
    capabilities: [
      "Workflow automation",
      "REST APIs",
      "LLM API integration",
      "Zendesk automations",
      "Browser automation",
    ],
    tools: ["REST APIs", "Playwright"],
  },
  {
    title: "Engineering & DevOps",
    summary: "Hands-on technical depth — deploys, data stores, and cloud migrations.",
    capabilities: [
      "Git",
      "MongoDB",
      "AWS S3",
      "Netlify / Vercel / Railway",
      "Cloud migrations (ECS→EKS, Bitbucket→GitHub)",
    ],
    tools: ["Git", "AWS S3", "MongoDB"],
  },
];

// ── Experience ───────────────────────────────────────────────────────────────
export interface ExperienceEntry {
  org: string;
  role: string;
  period: string;
  mission: string;
  scope: string[];
  approach: string;
  results: string[];
  skills: string[];
}

export const experience: ExperienceEntry[] = [
  {
    org: "CARS24",
    role: "AI & Technology Program Manager",
    period: "Jan 2025 — Present",
    mission:
      "Work across AI workflows, business logic, technical teams, and execution — improving chatbot and voicebot flows, refining prompts, auditing conversations, and automating repetitive work.",
    scope: [
      "Manual end-to-end testing of chatbot & voicebot flows",
      "Prompt writing, testing, and iterative refinement",
      "LLM-powered conversation audits using free API keys",
      "Browser automation (ACE Challan Panel) with Playwright + Claude",
      "Cross-functional coordination and requirement-to-flow mapping",
    ],
    approach:
      "Understand the requirement, map it into clear business logic and flows, refine prompts, test conversations end to end, audit the results with LLMs, and turn repeated manual work into automation.",
    results: [
      "Built ACE — an AI-assisted Challan Automation Panel — end to end",
      "Set up an LLM conversation-audit workflow that reduced manual review",
      "Improved chatbot & voicebot accuracy through iterative prompt testing",
      "Converted repeated manual tasks into AI-assisted workflows",
    ],
    skills: ["AI workflow testing", "Prompt refinement", "Playwright", "Cross-functional execution"],
  },
  {
    org: "99acres (Info Edge India)",
    role: "Research Analyst",
    period: "Jul 2024",
    mission:
      "Bring structure to property-listing data through taxonomy design — the information architecture that search and discovery depend on.",
    scope: [
      "Taxonomy structuring for real-estate listings",
      "Data categorization standards",
      "Content classification quality",
    ],
    approach:
      "Treat taxonomy as a product: consistent rules, documented edge cases, and classification decisions that scale across thousands of listings.",
    results: [
      "Structured classification standards for listing data",
      "Improved consistency of categorized content",
    ],
    skills: ["Information architecture", "Data classification", "Structure & consistency"],
  },
  {
    org: "Codtech IT Solutions",
    role: "Power BI & SQL Intern",
    period: "May 2024",
    mission:
      "Build a data-analysis foundation: SQL querying and Power BI dashboarding on real business datasets.",
    scope: ["SQL query development", "Power BI dashboard construction", "Business data analysis"],
    approach: "Learn by shipping: every analysis ended in a dashboard a stakeholder could read.",
    results: ["Delivered working Power BI dashboards", "Built SQL fluency used in later analytics work"],
    skills: ["SQL", "Power BI", "Data visualization"],
  },
  {
    org: "PIMR (Prestige Institute)",
    role: "Academic Research",
    period: "Nov 2023",
    mission:
      "Conduct structured academic research during MBA — hypothesis design, data collection, and defensible conclusions.",
    scope: ["Research methodology", "Data collection & analysis", "Academic writing"],
    approach: "Rigor first: a conclusion is only as good as the method behind it.",
    results: ["Completed structured research with documented methodology"],
    skills: ["Research methods", "Analytical writing", "Critical thinking"],
  },
];

export const education = [
  { degree: "Master of Business Administration", school: "Prestige Institute of Management & Research" },
  { degree: "Bachelor of Science", school: "Jiwaji University" },
];

// ── AI Workflow Gallery ──────────────────────────────────────────────────────
export interface GalleryArtifact {
  title: string;
  type: string;
  description: string;
  nodes: string[];
}

export const galleryArtifacts: GalleryArtifact[] = [
  {
    title: "Prompt Test & Refine Loop",
    type: "Testing Workflow",
    description: "How I improve a prompt: walk the flow, find the break, refine with AI, re-test.",
    nodes: ["Walk Flow", "Find Break", "Refine Prompt", "Re-test", "Confirm"],
  },
  {
    title: "Conversation Audit Workflow",
    type: "AI Workflow",
    description: "Free LLM keys evaluate chats and surface missing info and broken flows.",
    nodes: ["Collect", "LLM Evaluate", "Flag Gaps", "Check Extraction", "Feed Back"],
  },
  {
    title: "ACE Automation Path",
    type: "Automation Project",
    description: "Vehicle number in, challan data out — across multiple government sites.",
    nodes: ["Reg No.", "Gov Sites", "Fill & Scrape", "API", "Admin Panel"],
  },
  {
    title: "Manual → Automated Flow",
    type: "Automation Workflow",
    description: "Spot a repeated task, map a simpler flow, build it with AI, hand it over.",
    nodes: ["Spot Task", "Map Flow", "Build with AI", "Test", "Reuse"],
  },
];

// ── By the Numbers (honest stats) ────────────────────────────────────────────
export const dashboardStats = [
  { value: 4, suffix: "", label: "Initiatives Contributed To", detail: "Automation, audits, testing, flows" },
  { value: 2, suffix: "", label: "Conversational Products Supported", detail: "Chatbot & voicebot flows" },
  { value: 100, suffix: "%", label: "Flows Tested End-to-End", detail: "Manual, edge cases included" },
  { value: 1, suffix: "", label: "Full-Cycle Build (ACE)", detail: "FE + BE + automation + API" },
  { value: 5, suffix: "+", label: "Workflows Designed", detail: "Mapped and made repeatable" },
  { value: 3, suffix: "", label: "AI Tools Used Daily", detail: "Claude, ChatGPT, free LLM APIs" },
];

// ── Resume center (user's exact summary + strengths) ─────────────────────────
export const executiveSummary =
  "Early-career AI & Technology Program Manager with hands-on experience in chatbot and voicebot flow testing, prompt refinement, conversation audits, workflow automation, and AI-assisted product development. Skilled at converting business requirements into clear flows, coordinating with technical teams, testing AI behavior end to end, and using AI tools to reduce manual effort.";

export const coreStrengths = [
  "AI workflow understanding",
  "Prompt flow testing",
  "Conversational AI evaluation",
  "Manual E2E testing",
  "Business logic mapping",
  "Workflow automation",
  "Cross-functional coordination",
  "AI-assisted prototyping",
  "Playwright browser automation",
  "LLM-based conversation audits",
];

export const resumeHighlights = [
  "Built ACE — an AI-assisted Challan Automation Panel — end to end (frontend, backend, Playwright, API) with Claude assistance",
  "Set up an LLM-powered conversation-audit workflow on free API keys to reduce manual review",
  "Manually tested chatbot & voicebot flows end to end, refining prompts through iteration",
  "Converted repeated manual tasks into AI-assisted automation workflows",
  "MBA plus a hands-on analytics foundation (SQL, Power BI)",
];

// ── Hero ecosystem graph data ────────────────────────────────────────────────
export interface EcoNode {
  id: string;
  group: number; // 0 core, 1 AI, 2 people, 3 process, 4 outcomes
  size: number;
}

export const ecosystemGraph = {
  nodes: [
    { id: "Yogesh", group: 0, size: 14 },
    { id: "Chatbots", group: 1, size: 8 },
    { id: "Voicebots", group: 1, size: 8 },
    { id: "Prompts", group: 1, size: 7 },
    { id: "LLM Audits", group: 1, size: 7 },
    { id: "Business Logic", group: 2, size: 8 },
    { id: "Tech Teams", group: 2, size: 7 },
    { id: "Stakeholders", group: 2, size: 7 },
    { id: "User Journeys", group: 2, size: 6 },
    { id: "Flow Testing", group: 3, size: 7 },
    { id: "Edge Cases", group: 3, size: 6 },
    { id: "Playwright", group: 3, size: 6 },
    { id: "Requirements", group: 3, size: 6 },
    { id: "Automation", group: 4, size: 8 },
    { id: "Less Manual Work", group: 4, size: 7 },
    { id: "Reliable AI", group: 4, size: 7 },
  ] as EcoNode[],
  links: [
    { source: "Yogesh", target: "Chatbots" },
    { source: "Yogesh", target: "Voicebots" },
    { source: "Yogesh", target: "Business Logic" },
    { source: "Yogesh", target: "Flow Testing" },
    { source: "Yogesh", target: "Automation" },
    { source: "Yogesh", target: "Requirements" },
    { source: "Yogesh", target: "Stakeholders" },
    { source: "Prompts", target: "Chatbots" },
    { source: "Prompts", target: "Voicebots" },
    { source: "LLM Audits", target: "Chatbots" },
    { source: "LLM Audits", target: "Reliable AI" },
    { source: "Business Logic", target: "Prompts" },
    { source: "Flow Testing", target: "Edge Cases" },
    { source: "Flow Testing", target: "Reliable AI" },
    { source: "Requirements", target: "Business Logic" },
    { source: "User Journeys", target: "Flow Testing" },
    { source: "Tech Teams", target: "Playwright" },
    { source: "Playwright", target: "Automation" },
    { source: "Automation", target: "Less Manual Work" },
    { source: "Yogesh", target: "LLM Audits" },
    { source: "Yogesh", target: "Tech Teams" },
    { source: "Reliable AI", target: "User Journeys" },
  ],
};
