export const NAV: [string, string][] = [
  ["Solutions", "/solutions/brm-dwm"],
  ["Services", "/capabilities"],
  ["Industries", "/industries"],
  ["About", "/about"],
  ["Case Studies", "/case-studies"],
  ["Insights", "/insights"],
  ["Contact", "/contact"],
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
  items: string[];
};

export const CAPABILITIES: Capability[] = [
  {
    id: "offensive",
    n: "01",
    title: "Offensive Security",
    promise: "Test Your Defences",
    icon: "offensive",
    line: "Emulate the adversary. Expose the path they'd take.",
    body: "Goal-based penetration testing, red teaming and adversary emulation that chain real-world techniques across applications, networks and infrastructure — proving exploitability, not just cataloguing findings.",
    tags: ["Red Teaming", "Penetration Testing", "Cloud Security", "Breach Simulation"],
    items: [
      "Red Teaming Services",
      "Vulnerability Assessment",
      "Penetration Testing Services",
      "Phishing Simulation Services",
      "Secure Code Review Services",
      "Cloud Security Assessment",
      "Breach & Attack Simulation",
    ],
  },
  {
    id: "defensive",
    n: "02",
    title: "Defensive Security",
    promise: "Secure Your Systems",
    icon: "defensive",
    line: "Cut dwell time. Contain the blast radius.",
    body: "Detection engineering, monitoring and incident response built to catch intrusions early, starve attackers of dwell time and keep critical operations running while the threat is evicted.",
    tags: ["MDR", "Threat Hunting", "Threat Intel", "Brand Risk"],
    items: [
      "Managed Detection & Response",
      "Threat Hunting Services",
      "Threat Intelligence Services",
      "Disaster Recovery Consulting",
      "Brand Risk & Dark Web Monitoring",
    ],
  },
  {
    id: "grc",
    n: "03",
    title: "GRC Solutions",
    promise: "Governance & Risk",
    icon: "grc",
    line: "Turn control frameworks into operating reality.",
    body: "Risk quantification, control design and audit readiness that bind security to business risk — so governance is measurable, defensible and continuously evidenced rather than filed and forgotten.",
    tags: ["Audit Services", "Virtual CISO", "ISO 27001", "SOC Certification"],
    items: [
      "Cybersecurity Audit Services",
      "Virtual CISO Services",
      "ISO 27001 Consulting",
      "SOC Certification Services (SOC 1 2 & 3)",
      "SEBI CSCRF Consulting",
      "TPRA & TPRM Services",
    ],
  },
  {
    id: "dpdp",
    n: "04",
    title: "DPDP Consulting",
    promise: "Data Protection & Privacy",
    icon: "dpdp",
    line: "Operationalize data protection, end to end.",
    body: "Data-flow mapping, consent architecture and accountability controls that implement the Digital Personal Data Protection framework across systems, processors and the full data lifecycle.",
    tags: ["DPIA", "Virtual DPO", "Consent Tool", "DPDPA Training"],
    items: [
      "Data Protection Impact Assessment",
      "Virtual DPO",
      "Consent Management Tool",
      "Contract Review & Data Processing Agreements",
      "Consulting",
      "Advisory & Audit",
      "Training Programs for DPDPA Compliance",
    ],
  },
  {
    id: "training",
    n: "05",
    title: "Training Programs & MRA",
    promise: "Build Cyber Awareness",
    icon: "training",
    line: "Harden the human attack surface.",
    body: "Role-based training, hands-on labs and mutual-recognition-aligned programs that build measurable capability — turning staff from an entry point into the first line of defence.",
    tags: ["Data Analytics Training", "Data Privacy", "Cyber Awareness"],
    items: [
      "Expert-led training in Data Analytics",
      "Data Privacy and Cybersecurity awareness.",
    ],
  },
  {
    id: "ai",
    n: "06",
    title: "AI Audits",
    promise: "Secure Your AI Systems",
    icon: "ai",
    line: "Assurance for models in production.",
    body: "Independent evaluation of AI systems across security, data integrity and safety — probing model behaviour, data lineage and misuse pathways before and after deployment.",
    tags: ["Model Audits", "Risk Assessment", "Ethical AI", "Model Deployment"],
    items: [
      "AI system audits and risk assessments ensuring ethical",
      "secure AI deployment.",
    ],
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
    points: [
      "Red Teaming & Adversary Emulation",
      "Vulnerability Assessment & Pen Testing",
      "Cloud Security & Breach Simulation",
    ],
  },
  {
    id: "defensive",
    title: "Defensive Security",
    icon: "defensive",
    points: [
      "Managed Detection & Response (MDR)",
      "Threat Hunting & Intelligence",
      "Disaster Recovery & Dark Web Monitoring",
    ],
  },
  {
    id: "grc",
    title: "GRC Solutions",
    icon: "grc",
    points: [
      "Cybersecurity Audit & Virtual CISO",
      "ISO 27001 & SOC Certification (1, 2, 3)",
      "SEBI CSCRF & TPRA / TPRM Services",
    ],
  },
  {
    id: "dpdp",
    title: "DPDP Consulting",
    icon: "dpdp",
    points: [
      "Data Protection Impact Assessment (DPIA)",
      "Virtual DPO & Consent Management Tool",
      "Contract Review & DPDPA Compliance",
    ],
  },
  {
    id: "training",
    title: "Training Programs & MRA",
    icon: "training",
    points: [
      "Expert-led Training in Data Analytics",
      "Data Privacy & Cybersecurity Awareness",
      "Targeted Workforce Defense Enablement",
    ],
  },
  {
    id: "ai",
    title: "AI Audits",
    icon: "ai",
    points: [
      "AI System Audits & Risk Assessments",
      "Ethical Model Scrutiny & Data Lineage",
      "Secure Model Deployment Assurance",
    ],
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

/* ---------------------------------------------------------------- */
/* 8 Core Platform Capabilities (Partner Intelligence & Outside-In) */
/* ---------------------------------------------------------------- */

export type PlatformCapability = {
  id: string;
  n: string;
  title: string;
  shortTitle: string;
  tagline: string;
  badge: string;
  envistaVoice: string;
  features: { title: string; desc: string }[];
  metrics: { value: string; label: string }[];
  primaryHref: string;
};

export const PLATFORM_CAPABILITIES: PlatformCapability[] = [
  {
    id: "platform-features",
    n: "01",
    title: "Platform Features",
    shortTitle: "Unified Platform",
    badge: "CENTRAL NERVE CENTER",
    tagline: "Autonomous Outside-In Attack Surface & Digital Risk Intelligence.",
    envistaVoice: "Modern cyber adversaries do not test your sanctioned perimeter firewalls; they hunt for forgotten cloud buckets, shadow subdomains, and exposed credentials. The Envista Defence Platform delivers continuous 360-degree outside-in surveillance, uniting automated telemetry with senior SOC analyst verification to prioritize and neutralize exposures before weaponization.",
    features: [
      {
        title: "Dynamic Attack Surface Heatmaps",
        desc: "Interactive visual mapping of your global digital perimeter, segmented by exploitability score, asset age, and organizational critical path."
      },
      {
        title: "Actionable Risk Scoring",
        desc: "Replaces noisy CVSS scans with prioritized real-world exploitability intelligence derived from live darknet chatter and active exploitation campaigns."
      },
      {
        title: "Closed-Loop Takedown Workflow",
        desc: "End-to-end orchestration connecting legal, registrar, and cloud hosting networks for rapid, legally defensible enforcement with transparent SLAs."
      },
      {
        title: "Enterprise SIEM & SOC Integration",
        desc: "Native bi-directional connectors and REST webhooks for Splunk, Microsoft Sentinel, IBM QRadar, Jira, and ServiceNow for automated incident response."
      },
      {
        title: "Executive & Board Telemetry",
        desc: "Institutional dashboards presenting Mean Time to Remediate (MTTR), statutory compliance scores, and external posture trends for senior leadership."
      }
    ],
    metrics: [
      { value: "24/7", label: "Continuous Autonomous Recon" },
      { value: "< 4.2h", label: "Takedown SLA Verification" },
      { value: "0", label: "False Positive Guarantee" }
    ],
    primaryHref: "/contact"
  },
  {
    id: "brand-monitoring",
    n: "02",
    title: "Brand Monitoring",
    shortTitle: "Brand Monitoring",
    badge: "ANTI-IMPERSONATION & TAKEDOWN",
    tagline: "Detect and Neutralize Weaponized Brand Assets, Phishing & Executive Clones.",
    envistaVoice: "Your brand identity is your organization's most trusted commercial capital—and cybercriminals weaponize that trust. Envista Brand Monitoring continuously sweeps the surface, deep, and dark web to dismantle lookalike domains, fake executive profiles, rogue mobile apps, and phishing portals before they reach your customers or partners.",
    features: [
      {
        title: "Typosquatting & Lookalike Domain Detection",
        desc: "Algorithmic scanning across 1,400+ gTLDs and ccTLDs detecting homoglyphs, soundalikes, and combopresence registrations targeting your brand."
      },
      {
        title: "Executive & VIP Social Shield",
        desc: "Real-time surveillance across LinkedIn, X, Meta, and Telegram for fake executive accounts executing social engineering or investor scams."
      },
      {
        title: "Rogue Mobile App Discovery",
        desc: "Deep scans across Google Play, Apple App Store, and third-party APK mirrors to locate and takedown counterfeit mobile applications."
      },
      {
        title: "Phishing Infrastructure Takedowns",
        desc: "Direct integration with global registrars, DNS sinkholes, and browser security blocklists to dismantle credential-harvesting pages within hours."
      },
      {
        title: "Trademark & Marketplace Abuse",
        desc: "Surveillance of eCommerce portals, digital ad networks, and forums for unauthorized logo use, counterfeit services, and brand piracy."
      }
    ],
    metrics: [
      { value: "1,400+", label: "TLDs Monitored Continuously" },
      { value: "99.8%", label: "Domain Takedown Success" },
      { value: "100%", label: "Executive VIP Coverage" }
    ],
    primaryHref: "/solutions/brm-dwm"
  },
  {
    id: "dark-web-monitoring",
    n: "03",
    title: "Dark Web Monitoring",
    shortTitle: "Dark Web Monitoring",
    badge: "UNDERGROUND RECONNAISSANCE",
    tagline: "Persistent Surveillance Across Tor Networks, Telegram Syndicates & Paste Repositories.",
    envistaVoice: "Before an enterprise breach makes the headlines, compromised access, stealer logs, and stolen databases are actively bartered in the criminal underground. Envista Dark Web Monitoring provides persistent, covert reconnaissance inside restricted cybercrime ecosystems, alerting your security team before adversaries strike.",
    features: [
      {
        title: "Tor & I2P Darknet Surveillance",
        desc: "Automated crawlers and analyst avatars embedded within invite-only hacker forums, underground bazaars, and private cybercrime channels."
      },
      {
        title: "Clandestine Telegram Channel Ingestion",
        desc: "Linguistic and threat intelligence ingestion across criminal Telegram syndicates, Discord leak servers, and encrypted forums."
      },
      {
        title: "Compromised Corporate Credential Alerting",
        desc: "Instant matching against botnet stealer logs (RedLine, Vidar, Lumma) for active employee logins, VPN access keys, and session cookies."
      },
      {
        title: "Leaked Database & PII Interception",
        desc: "Proactive identification of leaked customer databases, internal source code repositories, API tokens, and confidential financial documents."
      },
      {
        title: "Ransomware Extortion Blog Tracking",
        desc: "Real-time surveillance of double-extortion ransomware sites to detect early mentions of your enterprise, subsidiaries, or key supply chain partners."
      }
    ],
    metrics: [
      { value: "1.8M+", label: "Darknet Pages Ingested Daily" },
      { value: "Real-Time", label: "Credential Compromise Alerts" },
      { value: "Human SOC", label: "Verified Intelligence Triage" }
    ],
    primaryHref: "/solutions/brm-dwm"
  },
  {
    id: "email-health-monitoring",
    n: "04",
    title: "Email Health Monitoring",
    shortTitle: "Email Health",
    badge: "DMARC+ & REPUTATION DEFENSE",
    tagline: "Audit Authentication Posture, Enforce DMARC, and Guarantee Sender Reputation.",
    envistaVoice: "Email remains the primary vector for ransomware, BEC fraud, and credential harvesting. Envista Email Health Monitoring validates your email authentication protocols (SPF, DKIM, DMARC), prevents domain spoofing, and continuously tracks global IP reputation to guarantee deliverability and prevent blacklisting.",
    features: [
      {
        title: "Continuous SPF, DKIM & DMARC Auditing",
        desc: "Live DNS record inspection and telemetry guidance to elevate enterprise domains safely from p=none to strict p=reject enforcement."
      },
      {
        title: "BIMI & Verified Mark Certificates",
        desc: "Validation and maintenance of Brand Indicators for Message Identification (BIMI) to display your verified corporate logo in recipient inboxes."
      },
      {
        title: "Global DNSBL & Spam Blacklist Tracking",
        desc: "24/7 monitoring across 120+ international reputation lists to detect IP blacklisting, open relays, and malicious relay abuse immediately."
      },
      {
        title: "Lookalike Sender & Spoofing Defense",
        desc: "Detection of deceptive inbound and outbound header manipulation used by spear-phishers targeting finance and executive staff."
      },
      {
        title: "Mail Server Cipher & TLS Verification",
        desc: "Automated cryptographic auditing of MX servers to ensure strict TLS encryption in transit and prevent Man-in-the-Middle eavesdropping."
      }
    ],
    metrics: [
      { value: "120+", label: "Reputation Blacklists Monitored" },
      { value: "p=reject", label: "DMARC Enforcement Target" },
      { value: "Zero", label: "Domain Spoofing Vulnerability" }
    ],
    primaryHref: "/contact"
  },
  {
    id: "infrastructure-monitoring",
    n: "05",
    title: "Infrastructure Monitoring",
    shortTitle: "Infrastructure",
    badge: "PERIMETER & ASSET EXPOSURE",
    tagline: "Comprehensive External Visibility Across IPs, Open Ports & Cloud Workloads.",
    envistaVoice: "Unmanaged internet-facing servers, forgotten development environments, and rogue administrative ports are an open invitation to automated exploits. Envista Infrastructure Monitoring delivers persistent scanning across your digital perimeter, eliminating blind spots and misconfigurations before adversaries exploit them.",
    features: [
      {
        title: "Autonomous CIDR & Netblock Discovery",
        desc: "Continuous discovery and mapping of corporate IP ranges, ASN assignments, and multi-cloud virtual network infrastructure."
      },
      {
        title: "Open Port & Service Banner Enumeration",
        desc: "Real-time identification of exposed administrative protocols (RDP, SSH, Telnet, SMB) and vulnerable server software versions."
      },
      {
        title: "SSL/TLS Certificate Lifecycle Tracking",
        desc: "Automatic alerts on expiring certificates, weak ciphers (TLS 1.0/1.1), self-signed certificates, and unauthorized wildcard cert sprawl."
      },
      {
        title: "Exposed Storage Bucket Detection",
        desc: "Continuous scanning for unauthenticated or publicly accessible AWS S3 buckets, Azure Blobs, and Google Cloud Storage objects."
      },
      {
        title: "Shadow IT & Staging Subdomain Discovery",
        desc: "Identification of unmanaged testing servers, abandoned legacy portals, and rogue DNS entries operating outside sanctioned governance."
      }
    ],
    metrics: [
      { value: "100%", label: "External IP Perimeter Mapping" },
      { value: "Zero", label: "Unsanctioned Port Exposures" },
      { value: "Continuous", label: "SSL/TLS Expiration Auditing" }
    ],
    primaryHref: "/contact"
  },
  {
    id: "external-attack-surface",
    n: "06",
    title: "External Attack Surface Management (EASM)",
    shortTitle: "EASM",
    badge: "OUTSIDE-IN RECONNAISSANCE",
    tagline: "Continuous Digital Footprint Mapping & Real-World Exploitability Prioritization.",
    envistaVoice: "You cannot protect what your security operations cannot see. Envista EASM mirrors the perspective of an advanced threat actor, continuously discovering, cataloging, and ranking all internet-facing digital assets according to active exploit weaponization and business criticality.",
    features: [
      {
        title: "Multi-Tier Autonomous Asset Inventory",
        desc: "Dynamic enumeration of core domains, corporate subsidiaries, newly provisioned cloud infrastructure, and partner API endpoints."
      },
      {
        title: "Multi-Cloud Drift Detection",
        desc: "Immediate discovery of unauthorized cloud deployments across AWS, Microsoft Azure, Google Cloud, and colocation data centers."
      },
      {
        title: "Threat-Informed Vulnerability Prioritization",
        desc: "Correlates CVEs with real-time exploit kits, proof-of-concept code, and ransomware trends to focus engineering effort on active dangers."
      },
      {
        title: "Actionable Developer Remediation Playbooks",
        desc: "Provides clear, step-by-step remediation guidance tailored for DevOps and infrastructure teams, accelerating mean time to resolve."
      },
      {
        title: "Continuous Attack Surface Risk Indexing",
        desc: "Quantitative scoring of external enterprise exposure, providing C-level stakeholders with defensible security posture metrics."
      }
    ],
    metrics: [
      { value: "360°", label: "Continuous Outside-In Visibility" },
      { value: "90%", label: "Reduction in Vulnerability Noise" },
      { value: "Real-Time", label: "Perimeter Drift Detection" }
    ],
    primaryHref: "/contact"
  },
  {
    id: "compliance-monitoring",
    n: "07",
    title: "Compliance Monitoring",
    shortTitle: "Compliance",
    badge: "STATUTORY GOVERNANCE & PRIVACY",
    tagline: "Continuous Regulatory Posture Verification Aligned with Statutory Mandates.",
    envistaVoice: "Regulatory compliance cannot rely on static annual audits; it must function as a living, verifiable security posture. Envista Compliance Monitoring continuously aligns your external digital footprint with India's DPDP Act 2023, RBI Master Directions, SEBI CSCRF, ISO 27001, and global privacy standards, ensuring audit-readiness at all times.",
    features: [
      {
        title: "DPDP Act 2023 Privacy Baseline Mapping",
        desc: "Continuous detection of unauthorized PII disclosures, consent tracking, and verification of digital data fiduciary safeguards."
      },
      {
        title: "RBI & SEBI Statutory Control Assurance",
        desc: "Pre-mapped verification frameworks adhering to RBI Master Directions on IT Governance and SEBI Cyber Security & Resilience Framework."
      },
      {
        title: "Global Benchmark Mapping (ISO, SOC 2, NIST)",
        desc: "Seamless cross-mapping against ISO 27001:2022, SOC 2 Type II, NIST CSF, and PCI DSS v4.0 external perimeter requirements."
      },
      {
        title: "Automated Evidence & Audit Pack Generation",
        desc: "One-click generation of audit-ready compliance reports and technical defense artifacts for board committees and regulatory authorities."
      },
      {
        title: "Regulatory Drift & Non-Compliance Alerts",
        desc: "Instant notifications when infrastructure changes introduce compliance violations, preventing regulatory penalties."
      }
    ],
    metrics: [
      { value: "DPDP 2023", label: "Statutory Indian Privacy Baseline" },
      { value: "100%", label: "Audit-Ready Evidence Trail" },
      { value: "RBI / SEBI", label: "Sector-Specific Control Pre-sets" }
    ],
    primaryHref: "/contact"
  },
  {
    id: "supply-chain-risk",
    n: "08",
    title: "Supply Chain Risk Monitoring",
    shortTitle: "Supply Chain Risk",
    badge: "THIRD-PARTY ECOSYSTEM DEFENSE",
    tagline: "Continuous Vendor Cyber Hygiene Scoring & Third-Party Exposure Tracking.",
    envistaVoice: "Your perimeter security is only as strong as the least secure vendor in your supply chain. Envista Supply Chain Risk Monitoring assesses and tracks the external cyber posture of your suppliers, third-party software partners, and service providers—detecting shared vulnerabilities before they cascade into your network.",
    features: [
      {
        title: "Non-Intrusive Vendor Posture Scoring",
        desc: "Dynamic external cyber ratings evaluating supplier security hygiene, exposed assets, and patching cadences without requiring software agents."
      },
      {
        title: "Third-Party Data Breach & Leak Surveillance",
        desc: "Darknet and paste monitoring alerting your security team when supplier breaches expose your shared corporate credentials or data."
      },
      {
        title: "Upstream Software Supply Chain Auditing",
        desc: "Identification of vulnerable third-party web dependencies, insecure open-source libraries, and compromised software artifacts."
      },
      {
        title: "Automated Vendor Questionnaire Validation",
        desc: "Cross-checks vendor self-assessments against live, outside-in technical evidence to eliminate compliance blind spots."
      },
      {
        title: "Tiered Ecosystem Risk Categorization",
        desc: "Classifies third parties by business criticality and risk level, focusing threat intelligence on mission-critical partners."
      }
    ],
    metrics: [
      { value: "Zero-Agent", label: "Non-Intrusive Vendor Scoring" },
      { value: "Real-Time", label: "Third-Party Breach Alerts" },
      { value: "Tier 1-3", label: "Ecosystem Risk Prioritization" }
    ],
    primaryHref: "/contact"
  }
];


