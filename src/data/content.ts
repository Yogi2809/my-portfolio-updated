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
    tags: ["Playwright", "Claude-Assisted Build", "Full-Cycle"],
    challenge:
      "Looking up traffic challans meant manually visiting several government websites, entering vehicle details on each, and copying results by hand — slow, repetitive, and easy to get wrong.",
    businessContext:
      "Challan data sits behind multiple government portals, each with its own form and required fields. Automating the lookup turns a tedious manual chore into a structured, repeatable flow.",
    role: [
      "Designed and developed the complete workflow end to end",
      "Built the frontend admin panel",
      "Built the backend and API integration",
      "Wrote the Playwright browser automation",
      "Handled testing, iteration, and debugging",
    ],
    objectives: [
      "Take a vehicle registration number (plus chassis/engine number where required)",
      "Visit each government challan website and enter the right details",
      "Scrape challan information and return it to the admin panel via API",
    ],
    approach:
      "I built this end to end with Claude assistance — using AI to generate and debug automation logic while I designed the flow, integrated the pieces, and tested each website's quirks until the scraping was reliable.",
    workflow: [
      { label: "Input vehicle number", detail: "Registration no. entered in the admin panel" },
      { label: "Add chassis / engine", detail: "Supplied where a portal requires it" },
      { label: "Visit gov websites", detail: "Playwright navigates each portal" },
      { label: "Enter details & scrape", detail: "Fills forms, reads back challan data" },
      { label: "Return via API", detail: "Scraped data sent back to the admin panel" },
    ],
    tools: ["Playwright", "Claude", "Frontend", "Backend", "APIs", "Browser Automation"],
    implementation:
      "A full-cycle AI-assisted build: I owned the frontend, backend, Playwright automation, and API integration myself, using Claude to accelerate the code and work through the edge cases of each government site.",
    impact: [
      "Reduced repetitive manual challan-lookup effort",
      "Created a structured way to fetch challan data from multiple websites",
      "Made a previously manual, error-prone task consistent and repeatable",
    ],
    learnings: [
      "AI assistance makes a single person genuinely full-cycle — I shipped FE, BE, and automation together",
      "Government sites are inconsistent; reliable scraping is mostly edge-case handling",
      "Designing the flow first made the automation far easier to debug",
    ],
  },
  {
    slug: "conversation-audit-automation",
    title: "Conversation Audit Automation",
    tagline:
      "A workflow using free LLM API keys to evaluate human–AI conversations and extract complete, accurate information from chats.",
    category: "AI Workflow Project",
    org: "CARS24",
    period: "2025",
    diagram: "audit",
    tags: ["LLM Evaluation", "Data Extraction", "Manual-Effort Reduction"],
    challenge:
      "Reviewing AI conversations by hand to check whether the right information was captured was slow, and it was easy to miss incomplete or broken chats.",
    businessContext:
      "Every chatbot and voicebot conversation should capture complete, accurate user information. Without a systematic check, missing details and broken flows slip through unnoticed.",
    role: [
      "Designed the logic for auditing conversations",
      "Set up evaluation using free LLM API keys",
      "Defined what 'complete and accurate' extraction looks like",
      "Reviewed findings and fed them back into prompt improvements",
    ],
    objectives: [
      "Audit human–AI conversations automatically",
      "Extract complete and accurate information from chats",
      "Surface gaps so flows and prompts can be improved",
    ],
    approach:
      "I used free LLM API keys to evaluate conversations at low cost — analyzing each chat for missing information, incorrect responses, broken flows, and business-logic misses, then using those findings to improve prompts.",
    workflow: [
      { label: "Collect conversations", detail: "Human–AI chats gathered for review" },
      { label: "LLM evaluation", detail: "Free LLM API checks each conversation" },
      { label: "Flag the gaps", detail: "Missing info, wrong responses, broken flows" },
      { label: "Check extraction", detail: "Is the captured user data complete & accurate?" },
      { label: "Feed back", detail: "Findings drive the next prompt iteration" },
    ],
    tools: ["Free LLM APIs", "Conversation Analysis", "Prompt Refinement", "Business Logic"],
    implementation:
      "An AI-assisted conversation audit workflow: LLM-powered evaluation that reads conversations and reports on missing information, response quality, and data-extraction completeness — reducing the manual review effort.",
    impact: [
      "Reduced manual conversation-review effort",
      "Improved visibility into incomplete or broken conversations",
      "Helped catch business-logic misses and missing user details earlier",
    ],
    learnings: [
      "Free LLM API keys are enough to build a genuinely useful evaluation workflow",
      "A clear definition of 'complete extraction' matters more than the model used",
      "Audit findings only help when they loop back into prompt changes",
    ],
  },
  {
    slug: "prompt-flow-testing",
    title: "Chatbot & Voicebot Prompt Flow Testing",
    tagline:
      "Manual end-to-end testing of chatbot and voicebot flows to validate prompts, user journeys, business logic, and conversation quality.",
    category: "Prompt & Conversation Testing",
    org: "CARS24",
    period: "2025",
    diagram: "chat",
    tags: ["Manual E2E Testing", "Prompt Refinement", "Conversational AI"],
    challenge:
      "Production chatbots and voicebots needed continuous improvement, but prompt changes shipped without careful end-to-end testing risk breaking real user conversations.",
    businessContext:
      "Chatbots and voicebots handle real users. A weak prompt or an unhandled edge case shows up immediately in the conversation — so flows need to be tested by hand before they're trusted.",
    role: [
      "Manually tested chatbot and voicebot flows end to end",
      "Checked prompt behavior, conversation accuracy, and voicebot responses",
      "Found edge cases, missing information, flow breaks, and business-logic failures",
      "Gave feedback and refined prompts through repeated iteration",
    ],
    objectives: [
      "Validate prompts, user journeys, and business logic across full flows",
      "Catch incorrect AI responses and broken flows before users do",
      "Improve conversational accuracy through iterative testing and feedback",
    ],
    approach:
      "I walked every flow as a real user would — testing prompt behavior, chatbot logic, voicebot responses, and edge cases — then used AI to improve the prompts through repeated testing, feedback, and iteration.",
    workflow: [
      { label: "Walk the flow", detail: "Test the journey end to end as a real user" },
      { label: "Probe edge cases", detail: "Missing info, wrong responses, flow breaks" },
      { label: "Log the issues", detail: "Conversation accuracy & business-logic gaps" },
      { label: "Refine the prompt", detail: "AI-assisted rewrite to fix the behavior" },
      { label: "Re-test", detail: "Iterate until the flow holds up" },
    ],
    tools: ["Manual E2E Testing", "Prompt Engineering", "Claude", "Conversation Analysis"],
    implementation:
      "Hands-on conversational testing: I tested prompt behavior, chatbot logic, voicebot responses, user journeys, and edge cases, then improved prompts through repeated AI-assisted iteration.",
    impact: [
      "Improved conversational accuracy",
      "Reduced flow failures and broken conversations",
      "Helped make AI interactions more reliable and aligned with user journeys",
    ],
    learnings: [
      "Testing a conversation by hand catches what automated checks miss",
      "Edge cases — missing info, odd phrasing — are where most flows break",
      "Tight test → feedback → refine loops improve prompts fast",
    ],
  },
  {
    slug: "manual-workflow-automation",
    title: "Manual Workflow Automation",
    tagline:
      "Identifying repeated daily manual tasks and converting them into AI-assisted or automation-supported workflows.",
    category: "Automation Project",
    org: "CARS24",
    period: "2025",
    diagram: "flow",
    tags: ["Workflow Automation", "AI-Assisted", "Manual-Effort Reduction"],
    challenge:
      "Day-to-day execution included repeated manual tasks that ate time and added little value — exactly the kind of work that can be automated.",
    businessContext:
      "Repetitive manual checks slow teams down. Spotting them and converting them into simple automated or AI-assisted flows frees people up for higher-value work.",
    role: [
      "Mapped repetitive daily tasks",
      "Designed simpler flows to replace them",
      "Used AI tools to build the automation logic",
      "Tested outputs and iterated",
    ],
    objectives: [
      "Find the repeated manual tasks worth automating",
      "Design clear, simpler flows for them",
      "Use AI tools to build and test the automation",
    ],
    approach:
      "I looked for the tasks people did over and over, mapped them into simpler flows, used AI tools to generate the automation logic, and tested the outputs until they were dependable.",
    workflow: [
      { label: "Spot the repetition", detail: "Identify repeated daily manual tasks" },
      { label: "Map a simpler flow", detail: "Redesign the task as a clean flow" },
      { label: "Build with AI", detail: "Use AI tools to generate automation logic" },
      { label: "Test the output", detail: "Validate and iterate until reliable" },
      { label: "Hand it over", detail: "Make it easy for the team to reuse" },
    ],
    tools: ["AI Tools", "Workflow Design", "Automation Logic", "Testing"],
    implementation:
      "Practical manual-effort reduction: I turned repeated tasks into AI-assisted workflows, building the logic with AI tools and testing each output before handing it to the team.",
    impact: [
      "Reduced manual effort on repetitive tasks",
      "Improved day-to-day execution speed",
      "Made repeated work easier to run consistently",
    ],
    learnings: [
      "The best automation targets are the boring tasks people repeat daily",
      "AI tools make building small automations fast and accessible",
      "An automation only sticks if the team can run it without me",
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
    title: "AI & Prompting",
    summary: "Writing, testing, and refining prompts so AI follows real business logic.",
    capabilities: [
      "Prompt writing",
      "Prompt testing",
      "Prompt refinement",
      "LLM evaluation",
      "Conversation analysis",
      "Business logic mapping",
    ],
    tools: ["Claude", "ChatGPT", "LLM APIs"],
  },
  {
    title: "Conversational AI",
    summary: "Testing chatbot and voicebot behavior end to end against real user journeys.",
    capabilities: [
      "Chatbot flow testing",
      "Voicebot flow testing",
      "User journey validation",
      "E2E flow testing",
      "Edge case testing",
      "Response quality evaluation",
    ],
    tools: ["Manual E2E Testing", "Conversation Analysis"],
  },
  {
    title: "Program & Execution",
    summary: "Turning requirements into clear flows and keeping teams coordinated.",
    capabilities: [
      "Requirement understanding",
      "Cross-functional coordination",
      "Workflow planning",
      "Stakeholder communication",
      "Task tracking",
      "Feedback management",
    ],
    tools: ["Jira", "Agile", "Stakeholder Comms"],
  },
  {
    title: "Workflow Automation",
    summary: "Converting repeated manual work into automation-supported flows.",
    capabilities: [
      "Manual task automation",
      "Playwright automation",
      "Browser automation",
      "API-based workflows",
      "Admin panel workflows",
      "Data extraction workflows",
    ],
    tools: ["Playwright", "APIs", "Admin Panels"],
  },
  {
    title: "AI Tools",
    summary: "Using AI tools to prototype, build, and improve practical solutions.",
    capabilities: [
      "Claude",
      "ChatGPT",
      "Free LLM APIs",
      "Prompt engineering tools",
      "AI-assisted prototyping",
    ],
    tools: ["Claude", "ChatGPT", "LLM APIs"],
  },
  {
    title: "Technical Understanding",
    summary: "Enough hands-on technical depth to build, test, and debug real workflows.",
    capabilities: [
      "Frontend basics",
      "Backend basics",
      "APIs",
      "Admin panels",
      "Browser automation",
      "Data scraping",
      "Testing and debugging",
    ],
    tools: ["Frontend", "Backend", "APIs"],
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
