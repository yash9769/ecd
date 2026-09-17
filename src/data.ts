export const NAV: [string, string][] = [
  ["Services", "/capabilities"],
  ["Industries", "/industries"],
  ["Solutions", "/methodology"],
  ["About", "/about"],
  ["Case Studies", "/case-studies"],
  ["Insights", "/insights"],
];

export const CONTACT = {
  email: "connect@envistacyberdefence.com",
  location: "Mumbai, Maharashtra, India",
};

/* Headline proof points, shown under the hero copy. */
export const HERO_STATS: { v: string; label: string }[] = [
  { v: "500+", label: "Assessments Delivered" },
  { v: "99%", label: "Client Retention" },
  { v: "24/7", label: "Security Operations" },
  { v: "5+", label: "Industries Secured" },
];

/* The four cards around the hero's central shield — the cybersecurity
   lifecycle Envista covers, not a service navigation menu. */
/* The four cards around the hero shield — the complete visual story, in
   this exact order and no more: Discover -> Test -> Protect -> Resilience. */
export const HERO_SERVICES: { eyebrow: string; title: string; icon: "discover" | "test" | "protect" | "resilience" }[] = [
  { eyebrow: "Discover", title: "Identify and understand your risks.", icon: "discover" },
  { eyebrow: "Test", title: "Validate your security posture.", icon: "test" },
  { eyebrow: "Protect", title: "Strengthen defences and reduce risk.", icon: "protect" },
  { eyebrow: "Resilience", title: "Build a stronger, future-ready organization.", icon: "resilience" },
];

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

export const INDUSTRIES: { name: string; promise: string; d: string; slug: string }[] = [
  {
    name: "Healthcare",
    promise: "Protect Patient Data. Keep Clinical Systems Online.",
    d: "Safeguard HIPAA and DPDP regulated patient health records, IoT medical devices, and hospital infrastructure from ransomware and data leaks.",
    slug: "healthcare",
  },
  {
    name: "Financial Services",
    promise: "Stop Fraud and Ransomware. Stay Audit-Ready.",
    d: "Defend banking cores, trading gateways, and fintech platforms with real-time threat intelligence and RBI/SEBI compliance governance.",
    slug: "financial-services",
  },
  {
    name: "Federal Government",
    promise: "Mission Ready Defense for National & Sovereign Entities.",
    d: "Protect critical national infrastructure, citizen databases, and classified networks with military-grade offensive testing and zero-trust engineering.",
    slug: "federal-government",
  },
  {
    name: "Manufacturing",
    promise: "Defend OT, IT, IIOT, and Supply Chains at Scale.",
    d: "Bridge industrial automation and enterprise IT security to prevent shop-floor shutdowns, supply chain compromises, and proprietary IP theft.",
    slug: "manufacturing",
  },
  {
    name: "Energy",
    promise: "Secure OT Systems and Critical Infrastructure.",
    d: "Fortify SCADA, ICS networks, and energy distribution grids against targeted nation-state cyber attacks and physical-digital disruption.",
    slug: "energy",
  },
  {
    name: "Transportation and Logistics",
    promise: "Defend Operations Across Fleet, Port, and Rail.",
    d: "Protect real-time dispatch systems, freight telemetry, port logistics, and interconnected mobility assets from cyber extortion.",
    slug: "transportation-logistics",
  },
  {
    name: "Higher Education",
    promise: "Protect Open Networks Without Slowing Research.",
    d: "Enable academic collaboration and open access while securing high-value intellectual property, student databases, and university cloud estates.",
    slug: "higher-education",
  },
  {
    name: "K-12 Education",
    promise: "Stop Ransomware. Protect Students, Staff, and Data.",
    d: "Keep learning platforms available and shield student identities and institutional assets from cyber extortion and unauthorized intrusion.",
    slug: "k12-education",
  },
  {
    name: "Retail and Hospitality",
    promise: "Defend Your Brand, Customer Data, and Bottom Line.",
    d: "Shield POS networks, e-commerce checkouts, and customer loyalty databases from credential stuffing, card skimming, and ransom attacks.",
    slug: "retail-hospitality",
  },
  {
    name: "SMB & Startups",
    promise: "Enterprise-Grade Defense for Fast Teams.",
    d: "Agile, scalable cybersecurity architecture and virtual CISO services engineered to protect lean organizations without enterprise overhead.",
    slug: "smb-startups",
  },
  {
    name: "State and Local Government",
    promise: "Protect Citizen Services, Infrastructure, and Public Data.",
    d: "Sustain public trust by hardening municipal utilities, election infrastructure, emergency services, and citizen record repositories.",
    slug: "state-local-government",
  },
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

/* Homepage-only content below — kept separate from the datasets above (used
   by their own dedicated pages) so this pass doesn't ripple into pages the
   reference doesn't cover. */

export const TRUSTED_INDUSTRIES: { name: string; icon: "bank" | "health" | "factory" | "gov" | "tech" | "edu" }[] = [
  { name: "Financial Services", icon: "bank" },
  { name: "Healthcare", icon: "health" },
  { name: "Manufacturing", icon: "factory" },
  { name: "Government", icon: "gov" },
  { name: "Technology", icon: "tech" },
  { name: "Education", icon: "edu" },
];

export type HomeService = {
  id: string;
  title: string;
  icon: "offensive" | "defensive" | "grc" | "dpdp" | "ai" | "training";
  points: string[];
};

export const HOME_SERVICES: HomeService[] = [
  {
    id: "offensive",
    title: "Offensive Security",
    icon: "offensive",
    points: ["VAPT & Red Teaming", "Phishing Simulation", "Secure Code Review"],
  },
  {
    id: "defensive",
    title: "Defensive Security",
    icon: "defensive",
    points: ["Threat Hunting, MDR", "Incident Response", "Threat Intelligence"],
  },
  {
    id: "grc",
    title: "GRC & Compliance",
    icon: "grc",
    points: ["Security Audits", "ISO 27001, vCISO", "Regulatory Support"],
  },
  {
    id: "dpdp",
    title: "Data Privacy",
    icon: "dpdp",
    points: ["DPDP Consulting", "Privacy Impact Assessments", "Breach Management"],
  },
  {
    id: "ai",
    title: "AI Security",
    icon: "ai",
    points: ["AI Audits & Governance", "Adversarial Testing", "Regulatory Risk"],
  },
  {
    id: "training",
    title: "Training & Augmentation",
    icon: "training",
    points: ["Security Awareness & Training", "Custom Training Programs", "vCISO / On-Demand Experts"],
  },
];

export const APPROACH_STEPS: { n: string; t: string; d: string }[] = [
  { n: "01", t: "Discover", d: "Understand your assets, risks and exposure." },
  { n: "02", t: "Plan", d: "Design a tailored security strategy." },
  { n: "03", t: "Implement", d: "Deploy with precision." },
  { n: "04", t: "Optimize", d: "Continuously improve and stay ahead." },
];

export const IMPACT_STATS: { v: number; suffix: string; label: string }[] = [
  { v: 300, suffix: "+", label: "Clients Secured" },
  { v: 1200, suffix: "+", label: "Vulnerabilities Identified" },
  { v: 40, suffix: "%", label: "Average Risk Reduction" },
  { v: 99, suffix: "%", label: "Client Retention" },
];

export const HOME_INSIGHTS: { tag: string; t: string; date: string }[] = [
  { tag: "Threat Intelligence", t: "The Evolving Threat Landscape in 2025", date: "Apr 12, 2025" },
  { tag: "Compliance", t: "Preparing for Next-Gen Regulatory Requirements", date: "Mar 28, 2025" },
  { tag: "AI Security", t: "AI Security: Opportunities and Emerging Risks", date: "Mar 10, 2025" },
];

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

export type ServiceMenuItem = {
  title: string;
  href: string;
};

export type ServiceMenuCategory = {
  category: string;
  items: ServiceMenuItem[];
};

export const SERVICES_MEGA_MENU: ServiceMenuCategory[] = [
  {
    category: "Vulnerability Assessment and Penetration Testing",
    items: [
      { title: "Web Application Security Assessment", href: "/capabilities#vapt" },
      { title: "Mobile Application Security Assessment", href: "/capabilities#vapt" },
      { title: "Thick Client Security Assessment", href: "/capabilities#vapt" },
      { title: "Network Infrastructure Security Assessment", href: "/capabilities#vapt" },
      { title: "Cloud Security Assessment", href: "/capabilities#vapt" },
      { title: "Source Code Review", href: "/capabilities#vapt" },
    ],
  },
  {
    category: "Managed Cyber Security Services",
    items: [
      { title: "Vulnerability Management", href: "/capabilities#defensive" },
      { title: "Cyber Security Talent Sourcing & Augmentation", href: "/capabilities#defensive" },
      { title: "SOC as a Service", href: "/capabilities#defensive" },
    ],
  },
  {
    category: "Compliance Services",
    items: [
      { title: "RBI Cyber Security Compliance for Banks", href: "/capabilities#grc" },
      { title: "SEBI Cyber Security Compliance", href: "/capabilities#grc" },
      { title: "GDPR Implementation and Readiness", href: "/capabilities#dpdp" },
      { title: "ISO 27001:2022 Compliance", href: "/capabilities#grc" },
    ],
  },
  {
    category: "Security Assessment Services – OT",
    items: [
      { title: "OT / ICS Cyber Security Assessment", href: "/capabilities#vapt" },
    ],
  },
  {
    category: "Specialized Services",
    items: [
      { title: "Brand Risk Monitoring & Dark Web Monitoring", href: "/solutions/brm-dwm" },
      { title: "Red Teaming", href: "/capabilities#offensive" },
      { title: "Virtual CISO", href: "/capabilities#grc" },
      { title: "Incident Response & Malware Analysis", href: "/capabilities#defensive" },
      { title: "Phishing & Ransomware Simulations", href: "/capabilities#training" },
      { title: "Cyber Insurance Consulting", href: "/capabilities#grc" },
      { title: "Cyber Crime Investigation & Digital Forensics", href: "/capabilities#defensive" },
    ],
  },
];

