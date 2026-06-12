// ─────────────────────────────────────────────────────────────────────────────
// All portfolio content lives here. Components are pure renderers.
// Every number and claim is sourced from the actual resume — no fabrications.
// ─────────────────────────────────────────────────────────────────────────────

export const identity = {
  name: "Yogesh Mishra",
  role: "AI & Technology Program Manager",
  headline: "Building Systems That Turn AI Into Business Impact",
  subheadline:
    "AI & Technology Program Manager focused on aligning strategy, people, processes, and technology to deliver meaningful outcomes.",
  email: "yogesh.mishra080202@gmail.com",
  github: "https://github.com/Yogi2809",
  linkedin: "https://www.linkedin.com/in/yogesh-mishra-pm",
  resumePdf: "/Yogesh_Mishra_PM_Resume.pdf",
  calendly: "https://calendly.com/yogesh-mishra080202", // placeholder — update when live
};

export const heroMetrics = [
  { value: "3", label: "Agile PODs Run" },
  { value: "12", label: "Engineers Coordinated" },
  { value: "2", label: "AI Products Shipped" },
  { value: "E2E", label: "QA Automation Owned" },
  { value: "LLM", label: "Eval Pipelines Built" },
];

// ── How I Operate ────────────────────────────────────────────────────────────
export interface OperatingStep {
  step: string;
  title: string;
  description: string;
  practices: string[];
}

export const operatingModel: OperatingStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "Start with the problem, not the solution. I dig into business context, user pain, and stakeholder constraints before anything gets built.",
    practices: ["Stakeholder interviews", "Requirement gathering", "Competitive context"],
  },
  {
    step: "02",
    title: "Align",
    description:
      "Complexity dies in ambiguity. I write the PRD, map the stakeholders, and make sure engineering, AI teams, and business read from the same page.",
    practices: ["PRD writing", "Stakeholder mapping", "RAID logs"],
  },
  {
    step: "03",
    title: "Design",
    description:
      "Workflows before code. I design the user journey, the system flow, and the operating model in Figma so teams execute against a visible blueprint.",
    practices: ["Figma user flows", "Workflow design", "Solution architecture"],
  },
  {
    step: "04",
    title: "Execute",
    description:
      "I run delivery across Agile PODs — grooming story points, removing blockers, and keeping sprint velocity honest from kickoff to release.",
    practices: ["3-POD Agile delivery", "Sprint grooming", "Release management"],
  },
  {
    step: "05",
    title: "Measure",
    description:
      "If it isn't measured, it didn't happen. I build the dashboards and LLM evaluation pipelines that tell us whether the AI actually works.",
    practices: ["Power BI dashboards", "LLM eval pipelines", "Conversational analytics"],
  },
  {
    step: "06",
    title: "Scale",
    description:
      "Lessons become systems. I turn what worked into repeatable processes, QA automation, and operating playbooks the team keeps using after launch.",
    practices: ["QA automation", "Process playbooks", "Retro-driven iteration"],
  },
];

// ── Strategic Initiatives ────────────────────────────────────────────────────
export interface FlowStep {
  label: string;
  detail: string;
}

export interface Initiative {
  slug: string;
  title: string;
  tagline: string;
  org: string;
  period: string;
  tags: string[];
  challenge: string;
  businessContext: string;
  stakeholders: string[];
  objectives: string[];
  executionStrategy: string;
  workflow: FlowStep[];
  tools: string[];
  implementation: string;
  impact: string[];
  learnings: string[];
}

export const initiatives: Initiative[] = [
  {
    slug: "pre-inspection-chatbot",
    title: "Pre-Inspection Chatbot & Analytics Dashboard",
    tagline: "Conversational AI that qualifies sellers before inspection — with the analytics layer to prove it works.",
    org: "CARS24",
    period: "2025",
    tags: ["Conversational AI", "Analytics", "Program Delivery"],
    challenge:
      "Car sellers arrived at physical inspections unprepared, causing wasted slots, drop-offs, and operational cost. The business needed a way to qualify and prep sellers before the appointment — without adding human workload.",
    businessContext:
      "Inspection capacity is a hard operational constraint. Every no-show or unprepared seller burns a slot that a ready seller could have used. Reducing drop-off directly improves funnel conversion.",
    stakeholders: [
      "Business operations leadership",
      "Engineering POD (backend + frontend)",
      "AI/prompt engineering team",
      "Inspection field operations",
      "Analytics & data team",
    ],
    objectives: [
      "Ship a production chatbot that preps sellers pre-inspection",
      "Build the conversational analytics dashboard to measure containment and drop-off",
      "Keep human escalation paths clean for edge cases",
    ],
    executionStrategy:
      "Ran the initiative as a cross-functional program: PRD and user flows first, then sprint-based delivery across the engineering POD while the prompt lifecycle (write → test → iterate → ship) ran in parallel. Weekly stakeholder reviews kept business, AI, and engineering aligned on one definition of done.",
    workflow: [
      { label: "Seller enters funnel", detail: "Booking confirmed → chatbot engages" },
      { label: "Conversational prep", detail: "Documents, expectations, logistics" },
      { label: "Edge-case detection", detail: "Intent classification routes exceptions" },
      { label: "Human escalation", detail: "Ops team receives qualified handoffs" },
      { label: "Analytics capture", detail: "Every conversation scored and dashboarded" },
    ],
    tools: ["OpenAI API", "Prompt engineering", "Power BI", "SQL", "Jira", "Figma"],
    implementation:
      "Owned the full prompt lifecycle for the bot — writing, E2E testing, iterating against real conversation logs, and shipping. Coordinated the engineering POD on integration sprints and built the dashboard that tracked containment rate, drop-off, and sentiment.",
    impact: [
      "Production chatbot live in the seller funnel",
      "Conversational analytics dashboard adopted by ops leadership",
      "Edge-case escalation flow reduced unqualified inspection visits",
    ],
    learnings: [
      "Prompt quality is a program deliverable — it needs the same review rigor as code",
      "Dashboards drive adoption: stakeholders trust what they can see",
      "Escalation design matters more than containment rate chasing",
    ],
  },
  {
    slug: "conversation-audit-automation",
    title: "Conversation Audit Automation",
    tagline: "An LLM evaluation pipeline that audits AI conversations at scale — replacing manual spot checks.",
    org: "CARS24",
    period: "2025",
    tags: ["LLM Evaluation", "QA Automation", "AI Operations"],
    challenge:
      "Quality assurance for AI conversations relied on humans manually reading transcripts — slow, inconsistent, and impossible to scale as conversation volume grew.",
    businessContext:
      "Voicebots and chatbots in production generate thousands of conversations. Without systematic audit, prompt regressions and failure patterns go unnoticed until customers complain.",
    stakeholders: [
      "AI/prompt engineering team",
      "QA team",
      "Business operations",
      "Engineering POD",
    ],
    objectives: [
      "Automate conversation auditing with an LLM evaluation pipeline",
      "Standardize scoring criteria across intents, sentiment, and resolution",
      "Surface failure patterns to the prompt team systematically",
    ],
    executionStrategy:
      "Defined audit criteria with QA and business stakeholders first, then ran iterative pilots: LLM-scored batches compared against human-audited baselines until agreement was trustworthy. Rolled out as a recurring automated pipeline feeding a findings dashboard.",
    workflow: [
      { label: "Conversation ingestion", detail: "Production transcripts batched" },
      { label: "LLM evaluation", detail: "Scored on intent, sentiment, resolution" },
      { label: "Baseline comparison", detail: "Calibrated against human audits" },
      { label: "Findings dashboard", detail: "Failure patterns surfaced to prompt team" },
      { label: "Prompt iteration", detail: "Fixes ship back into production" },
    ],
    tools: ["LLM evaluation", "Sentiment & intent analysis", "Python", "SQL", "Power BI"],
    implementation:
      "Coordinated calibration cycles between the AI team and QA, owned the scoring rubric, and managed the rollout from pilot to recurring pipeline. Built the reporting layer that turned raw evaluations into prioritized prompt fixes.",
    impact: [
      "Manual transcript review replaced by systematic LLM auditing",
      "Consistent scoring rubric adopted across conversation QA",
      "Prompt regressions caught and fixed before customer impact",
    ],
    learnings: [
      "LLM evaluators need calibration against human baselines before anyone trusts them",
      "A rubric everyone agreed on mattered more than the model used",
      "Audit findings only create value when routed into the iteration loop",
    ],
  },
  {
    slug: "voicebot-prompt-lifecycle",
    title: "Voicebot Prompt Lifecycle Program",
    tagline: "End-to-end ownership of production voicebot prompts — from requirement to live, with E2E testing in between.",
    org: "CARS24",
    period: "2025",
    tags: ["Voice AI", "Prompt Engineering", "E2E Testing"],
    challenge:
      "Production voicebots needed continuous prompt improvements, but changes shipped without systematic testing risked breaking live customer conversations.",
    businessContext:
      "Voicebots handle real customer calls. A bad prompt change degrades every conversation immediately — the cost of an untested change is measured in customer experience.",
    stakeholders: [
      "AI engineering team",
      "Business stakeholders defining call outcomes",
      "QA automation",
      "Customer operations",
    ],
    objectives: [
      "Own the prompt lifecycle end-to-end: write, test, iterate, ship",
      "Stand up E2E testing so no prompt reaches production unverified",
      "Tie prompt iterations to measurable conversation outcomes",
    ],
    executionStrategy:
      "Treated prompts as releases: each change moved through requirement → draft → Playwright-backed E2E test runs → staged rollout → production monitoring. Iterations were driven by audit findings and conversation analytics, not intuition.",
    workflow: [
      { label: "Requirement", detail: "Business defines the call outcome" },
      { label: "Prompt draft", detail: "Written against real failure cases" },
      { label: "E2E testing", detail: "Playwright-automated conversation runs" },
      { label: "Staged rollout", detail: "Verified before full production" },
      { label: "Monitoring", detail: "Analytics feed the next iteration" },
    ],
    tools: ["Prompt engineering", "Playwright", "OpenAI API", "QA automation", "Jira"],
    implementation:
      "Wrote and iterated production prompts directly, built the E2E testing discipline around them, and ran the release cadence. Coordinated between business stakeholders defining outcomes and the AI team shipping changes.",
    impact: [
      "Production voicebot prompts shipped through a tested release process",
      "E2E automation caught regressions before customers heard them",
      "Prompt iteration cycle tied to conversation analytics",
    ],
    learnings: [
      "Prompts deserve release engineering — versioning, testing, staged rollout",
      "E2E tests for conversations are possible and worth the setup cost",
      "The requirement conversation with business is where most failures start",
    ],
  },
  {
    slug: "traffic-challan-bot",
    title: "Traffic Challan Bot",
    tagline: "A conversational assistant that helps users check and resolve traffic challans — designed, flowed, and delivered.",
    org: "CARS24",
    period: "2025",
    tags: ["Conversational AI", "Product Design", "Workflow Design"],
    challenge:
      "Vehicle owners struggle to discover and resolve pending traffic challans — a fragmented, confusing process spread across portals. The business saw an opportunity for a conversational entry point.",
    businessContext:
      "Challan resolution is a natural extension of a car-ownership platform. A conversational interface lowers the barrier for users who would never navigate government portals.",
    stakeholders: [
      "Product leadership",
      "Engineering POD",
      "AI/prompt team",
      "External data integrations",
    ],
    objectives: [
      "Design the conversational flow for challan discovery and resolution",
      "Coordinate delivery across engineering and AI teams",
      "Ship a working bot with clean escalation paths",
    ],
    executionStrategy:
      "Started from user-journey mapping in Figma: every path a user takes from 'do I have a challan?' to resolution. Converted the journey into conversation flows and PRD requirements, then ran sprint delivery with the POD.",
    workflow: [
      { label: "User query", detail: "Vehicle number captured conversationally" },
      { label: "Challan lookup", detail: "Integration fetches pending challans" },
      { label: "Explanation", detail: "Bot translates legalese into plain language" },
      { label: "Resolution path", detail: "Payment guidance or dispute routing" },
      { label: "Follow-up", detail: "Status tracking and confirmation" },
    ],
    tools: ["Figma", "Prompt engineering", "PRD writing", "Jira", "Agile delivery"],
    implementation:
      "Owned the user flows and PRD, wrote the conversational prompts, and coordinated the engineering integration work through sprint delivery to launch.",
    impact: [
      "Working challan bot delivered with full conversational flow",
      "User journey from query to resolution mapped and shipped",
      "Reusable conversation-design patterns established for future bots",
    ],
    learnings: [
      "Conversational UX is product design — the flow diagram is the spec",
      "External integrations drive the timeline; sequence them first",
      "Plain-language translation is where conversational AI earns trust",
    ],
  },
];

// ── Skills & Expertise ───────────────────────────────────────────────────────
export interface SkillCluster {
  title: string;
  summary: string;
  capabilities: string[];
  tools: string[];
}

export const skillClusters: SkillCluster[] = [
  {
    title: "AI Strategy & Operations",
    summary: "Turning AI possibilities into shipped, measured products.",
    capabilities: [
      "Prompt lifecycle ownership (write → test → iterate → ship)",
      "LLM evaluation & audit pipeline design",
      "Conversational AI solutioning for voice and chat",
      "Sentiment & intent analytics",
    ],
    tools: ["OpenAI API", "Claude", "LLM evals", "Prompt engineering"],
  },
  {
    title: "Program Management",
    summary: "Running cross-functional delivery without dropping threads.",
    capabilities: [
      "3-POD Agile delivery for 12-engineer teams",
      "Sprint grooming, story pointing, velocity management",
      "RAID logs and risk mitigation",
      "Release management from kickoff to launch",
    ],
    tools: ["Jira", "Trello", "Agile/Scrum", "RAID logs"],
  },
  {
    title: "Workflow & Product Design",
    summary: "Designing the blueprint teams execute against.",
    capabilities: [
      "PRD writing and requirement definition",
      "User journey and conversation-flow design",
      "Process and operating-model design",
      "Prototype and solution-architecture thinking",
    ],
    tools: ["Figma", "PRDs", "User flows", "Journey maps"],
  },
  {
    title: "Stakeholder Leadership",
    summary: "Keeping business, engineering, and AI teams on one page.",
    capabilities: [
      "Cross-functional stakeholder alignment",
      "Executive communication and program reporting",
      "Conflict resolution and team alignment",
      "Vendor management",
    ],
    tools: ["Stakeholder maps", "Program reviews", "Escalation design"],
  },
  {
    title: "Data & Measurement",
    summary: "Building the instruments that prove what works.",
    capabilities: [
      "Analytics dashboard design and delivery",
      "SQL analysis and data storytelling",
      "Conversational analytics and containment metrics",
      "OKR and success-metric definition",
    ],
    tools: ["Power BI", "SQL", "Python", "R", "Excel"],
  },
  {
    title: "Execution Excellence",
    summary: "Quality discipline that scales beyond any one launch.",
    capabilities: [
      "E2E testing strategy for AI conversations",
      "QA automation rollout",
      "Process optimization and playbook creation",
      "Retro-driven continuous improvement",
    ],
    tools: ["Playwright", "QA automation", "E2E testing", "Process playbooks"],
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
    role: "Program Management Intern",
    period: "Jan 2025 — Present",
    mission:
      "Drive AI product delivery across conversational AI initiatives — voicebots, chatbots, and the evaluation infrastructure behind them.",
    scope: [
      "3-POD Agile delivery for a 12-engineer team",
      "Full prompt lifecycle for production voicebots and chatbots",
      "LLM evaluation and conversation-audit pipelines",
      "Conversational analytics dashboards",
      "PRDs, Figma flows, RAID logs, release management",
    ],
    approach:
      "Run delivery as a system: clear PRDs upfront, sprint discipline in the middle, dashboards and audits at the end. Keep business and engineering aligned through weekly reviews and visible artifacts.",
    results: [
      "Shipped pre-inspection chatbot with analytics dashboard",
      "Replaced manual conversation QA with LLM audit automation",
      "Established E2E-tested prompt release process for voicebots",
      "Delivered traffic challan bot from journey map to launch",
    ],
    skills: ["AI program delivery", "Prompt engineering", "Agile/Scrum", "Stakeholder management"],
  },
  {
    org: "99acres (Info Edge India)",
    role: "Taxonomist",
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
    skills: ["Information architecture", "Data classification", "Attention to structure"],
  },
  {
    org: "Codtech IT Solutions",
    role: "Power BI & SQL Intern",
    period: "May 2024",
    mission:
      "Build the data-analysis foundation: SQL querying and Power BI dashboarding on real business datasets.",
    scope: [
      "SQL query development",
      "Power BI dashboard construction",
      "Business data analysis",
    ],
    approach:
      "Learn by shipping: every analysis ended in a dashboard a stakeholder could actually read.",
    results: [
      "Delivered working Power BI dashboards",
      "Built SQL fluency that now powers analytics work at CARS24",
    ],
    skills: ["SQL", "Power BI", "Data visualization"],
  },
  {
    org: "PIMR (Prestige Institute)",
    role: "Academic Research",
    period: "Nov 2023",
    mission:
      "Conduct structured academic research during MBA — hypothesis design, data collection, and defensible conclusions.",
    scope: ["Research methodology", "Data collection & analysis", "Academic writing"],
    approach:
      "Rigor first: a conclusion is only as good as the method behind it.",
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
    title: "Prompt Release Pipeline",
    type: "Execution Framework",
    description: "How a prompt change moves from business requirement to production — with E2E testing as the gate.",
    nodes: ["Requirement", "Draft", "E2E Test", "Staged Rollout", "Production", "Monitor"],
  },
  {
    title: "Conversation Audit Loop",
    type: "AI Operations Model",
    description: "The closed loop that keeps production AI honest: evaluate, surface, fix, re-ship.",
    nodes: ["Ingest", "LLM Evaluate", "Calibrate", "Dashboard", "Prompt Fix", "Re-deploy"],
  },
  {
    title: "3-POD Coordination Model",
    type: "Operating Structure",
    description: "How three Agile PODs stay aligned on one roadmap without stepping on each other.",
    nodes: ["Roadmap", "POD 1", "POD 2", "POD 3", "Weekly Sync", "Release Train"],
  },
  {
    title: "Escalation Decision Tree",
    type: "Decision Model",
    description: "When the bot hands off to a human — designed so edge cases reach ops qualified, not raw.",
    nodes: ["Intent Check", "Confidence Gate", "Self-serve", "Qualify Context", "Human Handoff"],
  },
];

// ── Impact Dashboard ─────────────────────────────────────────────────────────
export const dashboardStats = [
  { value: 4, suffix: "", label: "AI Initiatives Delivered", detail: "Chatbots, voicebots, eval pipelines" },
  { value: 3, suffix: "", label: "Agile PODs Coordinated", detail: "Parallel sprint delivery" },
  { value: 12, suffix: "", label: "Engineers Aligned", detail: "Cross-functional team" },
  { value: 2, suffix: "", label: "AI Products in Production", detail: "Live customer-facing systems" },
  { value: 5, suffix: "+", label: "Workflows Designed", detail: "Figma flows → shipped systems" },
  { value: 100, suffix: "%", label: "Prompt Releases E2E-Tested", detail: "No untested change ships" },
];

// ── Resume center ────────────────────────────────────────────────────────────
export const resumeHighlights = [
  "Owns the full prompt lifecycle for production voicebots and chatbots — writing, E2E testing, iterating, shipping",
  "Runs 3-POD Agile delivery for 12-engineer teams: grooming, story points, RAID logs, releases",
  "Built LLM evaluation pipelines that replaced manual conversation QA",
  "Designs workflows and PRDs that keep business, engineering, and AI teams aligned",
  "MBA + hands-on analytics foundation (SQL, Power BI, Python)",
];

export const competencies = [
  "AI Program Delivery", "Prompt Engineering", "LLM Evaluation", "Agile / Scrum",
  "PRD Writing", "Workflow Design", "Stakeholder Management", "RAID Logs",
  "Power BI", "SQL", "Figma", "Playwright", "Jira", "Release Management",
];

// ── Hero ecosystem graph data ────────────────────────────────────────────────
export interface EcoNode {
  id: string;
  group: number; // 0 = core, 1 = systems, 2 = people, 3 = process, 4 = outcomes
  size: number;
}

export const ecosystemGraph = {
  nodes: [
    { id: "Yogesh", group: 0, size: 14 },
    // AI systems
    { id: "Voicebots", group: 1, size: 8 },
    { id: "Chatbots", group: 1, size: 8 },
    { id: "LLM Evals", group: 1, size: 7 },
    { id: "Prompt Lifecycle", group: 1, size: 7 },
    // People
    { id: "Engineering PODs", group: 2, size: 8 },
    { id: "AI Team", group: 2, size: 7 },
    { id: "Business Stakeholders", group: 2, size: 7 },
    { id: "QA", group: 2, size: 6 },
    { id: "Operations", group: 2, size: 6 },
    // Process
    { id: "PRDs", group: 3, size: 6 },
    { id: "Figma Flows", group: 3, size: 6 },
    { id: "RAID Logs", group: 3, size: 5 },
    { id: "Sprints", group: 3, size: 6 },
    { id: "E2E Testing", group: 3, size: 6 },
    // Outcomes
    { id: "Dashboards", group: 4, size: 7 },
    { id: "Releases", group: 4, size: 7 },
    { id: "Insights", group: 4, size: 6 },
  ] as EcoNode[],
  links: [
    // Core orchestrates everything
    { source: "Yogesh", target: "Voicebots" },
    { source: "Yogesh", target: "Chatbots" },
    { source: "Yogesh", target: "Engineering PODs" },
    { source: "Yogesh", target: "Business Stakeholders" },
    { source: "Yogesh", target: "PRDs" },
    { source: "Yogesh", target: "Sprints" },
    { source: "Yogesh", target: "Dashboards" },
    // Systems
    { source: "Prompt Lifecycle", target: "Voicebots" },
    { source: "Prompt Lifecycle", target: "Chatbots" },
    { source: "LLM Evals", target: "Voicebots" },
    { source: "LLM Evals", target: "Chatbots" },
    { source: "LLM Evals", target: "Insights" },
    // People connections
    { source: "Engineering PODs", target: "Sprints" },
    { source: "AI Team", target: "Prompt Lifecycle" },
    { source: "Business Stakeholders", target: "PRDs" },
    { source: "QA", target: "E2E Testing" },
    { source: "Operations", target: "Chatbots" },
    { source: "Yogesh", target: "AI Team" },
    { source: "Yogesh", target: "QA" },
    { source: "Yogesh", target: "Operations" },
    // Process to outcomes
    { source: "PRDs", target: "Figma Flows" },
    { source: "Figma Flows", target: "Sprints" },
    { source: "Sprints", target: "Releases" },
    { source: "E2E Testing", target: "Releases" },
    { source: "RAID Logs", target: "Sprints" },
    { source: "Yogesh", target: "RAID Logs" },
    { source: "Dashboards", target: "Insights" },
    { source: "Releases", target: "Dashboards" },
  ],
};
