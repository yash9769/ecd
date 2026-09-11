export const NAV: [string, string][] = [
  ["Capabilities", "/capabilities"],
  ["Methodology", "/methodology"],
  ["About", "/about"],
  ["Insights", "/insights"],
  ["FAQ", "/faq"],
];

export const CAPABILITIES = [
  {
    id: "offensive",
    n: "01",
    title: "Offensive Security",
    line: "Emulate the adversary. Expose the path they'd take.",
    body: "Goal-based penetration testing, red teaming and adversary emulation that chain real-world techniques across applications, networks and infrastructure — proving exploitability, not just cataloguing findings.",
    tags: ["Penetration Testing", "Red Teaming", "Adversary Emulation", "Vulnerability Research"],
  },
  {
    id: "defensive",
    n: "02",
    title: "Defensive Security",
    line: "Cut dwell time. Contain the blast radius.",
    body: "Detection engineering, monitoring and incident response built to catch intrusions early, starve attackers of dwell time and keep critical operations running while the threat is evicted.",
    tags: ["Detection Engineering", "Incident Response", "Threat Hunting", "Hardening"],
  },
  {
    id: "grc",
    n: "03",
    title: "GRC Solutions",
    line: "Turn control frameworks into operating reality.",
    body: "Risk quantification, control design and audit readiness that bind security to business risk — so governance is measurable, defensible and continuously evidenced rather than filed and forgotten.",
    tags: ["Risk Quantification", "Control Design", "Audit Readiness", "Policy & Assurance"],
  },
  {
    id: "dpdp",
    n: "04",
    title: "DPDP Consulting",
    line: "Operationalize data protection, end to end.",
    body: "Data-flow mapping, consent architecture and accountability controls that implement the Digital Personal Data Protection framework across systems, processors and the full data lifecycle.",
    tags: ["Data Mapping", "Consent Architecture", "DPIA", "Accountability"],
  },
  {
    id: "training",
    n: "05",
    title: "Training Programs & MRA",
    line: "Harden the human attack surface.",
    body: "Role-based training, hands-on labs and mutual-recognition-aligned programs that build measurable capability — turning staff from an entry point into the first line of defence.",
    tags: ["Security Awareness", "Hands-on Labs", "MRA-aligned", "Phishing Simulation"],
  },
  {
    id: "ai",
    n: "06",
    title: "AI Audits",
    line: "Assurance for models in production.",
    body: "Independent evaluation of AI systems across security, data integrity and safety — probing model behaviour, data lineage and misuse pathways before and after deployment.",
    tags: ["Model Red-teaming", "Data Lineage", "Responsible AI", "Risk Assessment"],
  },
];

export const METHOD = [
  { n: "01", t: "Discover", d: "Inventory assets, identities, data paths and third-party exposure — building a live picture of the full attack surface." },
  { n: "02", t: "Assess", d: "Emulate real adversary techniques and validate controls against the frameworks you are accountable to." },
  { n: "03", t: "Fortify", d: "Prioritize by exploitability and business impact, then remediate and harden where blast radius is greatest." },
  { n: "04", t: "Sustain", d: "Continuously monitor, re-test and train so posture holds as the estate and threat landscape shift." },
];

export const COMPLIANCE = ["ISO 27001", "SOC 2", "DPDP Act", "GDPR", "PCI DSS", "NIST CSF"];

export const INSIGHTS = [
  { tag: "Attack Surface", t: "The perimeter is now identity", d: "Cloud, SaaS and machine identities have dissolved the network edge — control has moved to the access layer." },
  { tag: "Governance", t: "Compliance as continuous evidence", d: "Point-in-time audits are fading; defensible GRC means controls that generate their own evidence." },
  { tag: "AI Assurance", t: "Red-teaming the models that decide", d: "As models enter critical workflows, adversarial testing and data-lineage scrutiny become table stakes." },
];

export const FAQS: [string, string][] = [
  ["What does Envista Cyber Defence do?", "We protect organizations, individuals and governments from evolving cyber threats and data breaches — unifying offensive and defensive security, governance and compliance, data protection, training and AI assurance under one operating model."],
  ["Who do you work with?", "Enterprises, institutions and government bodies that need defensible, compliance-first security across a modern, distributed digital estate."],
  ["How is an engagement structured?", "Every engagement runs the same closed loop — discover the attack surface, assess exposure against real adversary behaviour, fortify by blast radius, and sustain posture over time."],
  ["Do you cover data protection and privacy?", "Yes. Our DPDP consulting operationalizes the Digital Personal Data Protection framework — mapping data flows, engineering consent and embedding accountability across systems and processors."],
  ["Can you audit our AI systems?", "Our AI Audits independently evaluate models for security, data integrity and safe behaviour — red-teaming model outputs and tracing data lineage before and after production."],
];
