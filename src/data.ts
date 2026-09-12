export const NAV: [string, string][] = [
  ["Services", "/capabilities"],
  ["Industries", "/industries"],
  ["Approach", "/methodology"],
  ["About", "/about"],
  ["Insights", "/insights"],
  ["FAQ", "/faq"],
];

export const CONTACT = {
  email: "connect@envistacyberdefence.com",
  location: "Mumbai, Maharashtra, India",
};

/* Headline proof points, shown under the hero copy. */
export const HERO_STATS: { v: string; label: string; sub: string }[] = [
  { v: "6+", label: "Frameworks", sub: "Covered" },
  { v: "24/7", label: "Security", sub: "Operations" },
  { v: "48-Hour", label: "Vetted professional", sub: "Deployment" },
];

/* Orbiting labels on the hero shield — the defence lifecycle. */
export const HERO_ORBIT = ["Detect", "Prevent", "Respond", "Stay ahead"];

export type Capability = {
  id: string;
  n: string;
  title: string;
  /* Short action promise used on cards in the services grid. */
  promise: string;
  icon: "offensive" | "defensive" | "grc" | "dpdp" | "training" | "ai";
  line: string;
  body: string;
  tags: string[];
};

export const CAPABILITIES: Capability[] = [
  {
    id: "offensive",
    n: "01",
    title: "Offensive Security",
    promise: "Test your defences",
    icon: "offensive",
    line: "Emulate the adversary. Expose the path they'd take.",
    body: "Goal-based penetration testing, red teaming and adversary emulation that chain real-world techniques across applications, networks and infrastructure — proving exploitability, not just cataloguing findings.",
    tags: ["Penetration Testing", "Red Teaming", "Adversary Emulation", "Vulnerability Research"],
  },
  {
    id: "defensive",
    n: "02",
    title: "Defensive Security",
    promise: "Secure your systems",
    icon: "defensive",
    line: "Cut dwell time. Contain the blast radius.",
    body: "Detection engineering, monitoring and incident response built to catch intrusions early, starve attackers of dwell time and keep critical operations running while the threat is evicted.",
    tags: ["Detection Engineering", "Incident Response", "Threat Hunting", "Hardening"],
  },
  {
    id: "grc",
    n: "03",
    title: "GRC Solutions",
    promise: "Governance & risk",
    icon: "grc",
    line: "Turn control frameworks into operating reality.",
    body: "Risk quantification, control design and audit readiness that bind security to business risk — so governance is measurable, defensible and continuously evidenced rather than filed and forgotten.",
    tags: ["Risk Quantification", "Control Design", "Audit Readiness", "Policy & Assurance"],
  },
  {
    id: "dpdp",
    n: "04",
    title: "DPDP Consulting",
    promise: "Data protection & privacy",
    icon: "dpdp",
    line: "Operationalize data protection, end to end.",
    body: "Data-flow mapping, consent architecture and accountability controls that implement the Digital Personal Data Protection framework across systems, processors and the full data lifecycle.",
    tags: ["Data Mapping", "Consent Architecture", "DPIA", "Accountability"],
  },
  {
    id: "training",
    n: "05",
    title: "Training & MRA",
    promise: "Build cyber awareness",
    icon: "training",
    line: "Harden the human attack surface.",
    body: "Role-based training, hands-on labs and mutual-recognition-aligned programs that build measurable capability — turning staff from an entry point into the first line of defence.",
    tags: ["Security Awareness", "Hands-on Labs", "MRA-aligned", "Phishing Simulation"],
  },
  {
    id: "ai",
    n: "06",
    title: "AI Audits",
    promise: "Secure your AI systems",
    icon: "ai",
    line: "Assurance for models in production.",
    body: "Independent evaluation of AI systems across security, data integrity and safety — probing model behaviour, data lineage and misuse pathways before and after deployment.",
    tags: ["Model Red-teaming", "Data Lineage", "Responsible AI", "Risk Assessment"],
  },
];

/* Three-step engagement process. */
export const APPROACH: { n: string; t: string; d: string }[] = [
  {
    n: "01",
    t: "Assess & Discover",
    d: "Evaluate your current security posture, data practices and compliance gaps.",
  },
  {
    n: "02",
    t: "Design & Build",
    d: "Craft a tailored security and compliance framework for your organization.",
  },
  {
    n: "03",
    t: "Execute & Monitor",
    d: "Deploy, optimize and continuously monitor your security posture.",
  },
];

export const DIFFERENTIATORS: { t: string; d: string; icon: "endToEnd" | "bridge" | "foresight" }[] = [
  {
    t: "End-to-end security services",
    icon: "endToEnd",
    d: "From initial risk assessments to full compliance implementation, we cover every aspect of your cybersecurity needs under one roof.",
  },
  {
    t: "The bridge between risk and compliance",
    icon: "bridge",
    d: "We help you understand not just the rules, but the intent behind them — transforming compliance from a burden into a competitive advantage that builds lasting trust.",
  },
  {
    t: "Intelligence that stays ahead",
    icon: "foresight",
    d: "Cybersecurity isn't reactive — it's a mindset. We bring foresight, expertise and precision to anticipate threats before they materialise.",
  },
];

export const INDUSTRIES: { name: string; d: string }[] = [
  { name: "Finance", d: "Regulated data, real-time fraud pressure and audit scrutiny." },
  { name: "Healthcare", d: "Patient data, connected devices and continuity of care." },
  { name: "Technology", d: "Fast release cycles, cloud sprawl and customer trust." },
  { name: "Government", d: "Sovereign data, public accountability and critical services." },
  { name: "Manufacturing", d: "OT and IT convergence across plants and supply chains." },
];

export const METHOD = [
  { n: "01", t: "Discover", d: "Inventory assets, identities, data paths and third-party exposure — building a live picture of the full attack surface." },
  { n: "02", t: "Assess", d: "Emulate real adversary techniques and validate controls against the frameworks you are accountable to." },
  { n: "03", t: "Fortify", d: "Prioritize by exploitability and business impact, then remediate and harden where blast radius is greatest." },
  { n: "04", t: "Sustain", d: "Continuously monitor, re-test and train so posture holds as the estate and threat landscape shift." },
];

export const COMPLIANCE = ["DPDP Act", "ISO 27001", "SOC 2", "SEBI CSCRF", "GDPR", "NIST CSF"];

/* Outcomes listed beside the closing call to action. */
export const OUTCOMES = ["Identify", "Protect", "Comply", "Respond", "Stay ahead"];

export const INSIGHTS: { tag: string; t: string; d: string; date: string }[] = [
  {
    tag: "AI Security",
    t: "Your AI might be your biggest vulnerability",
    d: "As models enter critical workflows, adversarial testing and data-lineage scrutiny become table stakes.",
    date: "01 Feb 2026",
  },
  {
    tag: "Virtual DPO",
    t: "Big protection, no full-time hire",
    d: "How a fractional data protection officer covers accountability without the headcount.",
    date: "01 Jan 2026",
  },
  {
    tag: "Compliance",
    t: "Know the law, avoid the fine",
    d: "Point-in-time audits are fading; defensible GRC means controls that generate their own evidence.",
    date: "20 Mar 2026",
  },
];

export const FAQS: [string, string][] = [
  ["What does Envista Cyber Defence do?", "We protect organizations, individuals and governments from evolving cyber threats and data breaches — unifying offensive and defensive security, governance and compliance, data protection, training and AI assurance under one operating model."],
  ["Who do you work with?", "Enterprises, SMBs and government entities that need defensible, compliance-first security across a modern, distributed digital estate."],
  ["How is an engagement structured?", "Every engagement runs the same closed loop — discover the attack surface, assess exposure against real adversary behaviour, fortify by blast radius, and sustain posture over time."],
  ["Do you cover data protection and privacy?", "Yes. Our DPDP consulting operationalizes the Digital Personal Data Protection framework — mapping data flows, engineering consent and embedding accountability across systems and processors."],
  ["Can you audit our AI systems?", "Our AI Audits independently evaluate models for security, data integrity and safe behaviour — red-teaming model outputs and tracing data lineage before and after production."],
];
