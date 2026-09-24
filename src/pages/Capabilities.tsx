import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router";
import {
  ArrowRight,
  CheckCircle,
  Cpu,
  Crosshair,
  GraduationCap,
  LockKey,
  Scales,
  ShieldCheck,
  Sparkle,
  Target,
} from "@phosphor-icons/react";
import { Btn, Eyebrow, Reveal, RevealText } from "../components/ui";
import { CtaBand } from "./Home";

const WRAP = "mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8";

interface SubService {
  title: string;
  badge: string;
  desc: string;
  deliverables: string[];
}

interface ServiceDetail {
  id: string;
  n: string;
  title: string;
  tagline: string;
  promise: string;
  icon: string;
  summary: string;
  metrics: { value: string; label: string }[];
  frameworks: string[];
  subServices: SubService[];
  lifecycle: { step: string; title: string; desc: string }[];
  deliverables: string[];
}

const SERVICES_DEEP_DIVE: Record<string, ServiceDetail> = {
  offensive: {
    id: "offensive",
    n: "01",
    title: "Offensive Security",
    tagline: "Emulate the Adversary. Expose the Path They'd Take.",
    promise: "Adversary Emulation & Goal-Based Penetration Testing",
    icon: "offensive",
    summary:
      "Goal-based penetration testing, red teaming, and adversary emulation that chain real-world exploitation techniques across applications, networks, APIs, and cloud infrastructure — proving actual business exploitability.",
    metrics: [
      { value: "0-Day", label: "Exploit Chains" },
      { value: "100%", label: "PoC Evidence" },
      { value: "ATT&CK", label: "MITRE Mapped" },
      { value: "0", label: "False Positives" },
    ],
    frameworks: ["OWASP Top 10", "SANS 25", "NIST SP 800-115", "PTES", "MITRE ATT&CK"],
    subServices: [
      {
        title: "Red Teaming & Adversary Emulation",
        badge: "Advanced APT",
        desc: "Full-scope cyber attack simulations targeting digital, physical, and human perimeters under realistic threat constraints.",
        deliverables: ["Initial Access Vector Proof", "Lateral Movement & Domain Escalation", "Detection Gap Matrix"],
      },
      {
        title: "Web App & API Penetration Testing",
        badge: "VAPT Core",
        desc: "Deep-dive manual and automated assessments across web applications, REST/GraphQL APIs, microservices, and SPA backends.",
        deliverables: ["Business Logic Flaw Exploits", "Authentication Bypass Tests", "Remediation Code Snippets"],
      },
      {
        title: "Cloud Penetration Testing",
        badge: "AWS / Azure / GCP",
        desc: "Testing IAM privilege escalation, misconfigurations, container breakout vectors, and cloud storage data exfiltration risks.",
        deliverables: ["IAM Privilege Escalation Maps", "Storage Bucket Leak Proofs", "Terraform & CloudFormation Fixes"],
      },
      {
        title: "Mobile Binary Security Assessment",
        badge: "iOS & Android",
        desc: "Static and dynamic binary reverse engineering, local storage inspection, keystore security, and runtime manipulation.",
        deliverables: ["OWASP MASVS Audit", "Insecure IPC & Keystore Flaws", "Hardening Checklist"],
      },
      {
        title: "Secure Code Review (SAST & Manual)",
        badge: "DevSecOps",
        desc: "Comprehensive line-by-line inspection of source code to locate logic flaws, injection vulnerabilities, and tainted flows.",
        deliverables: ["Tainted Data Flow Traces", "Developer Patch Suggestions", "CI/CD Gate Integration"],
      },
      {
        title: "Breach & Attack Simulation (BAS)",
        badge: "Continuous Rigor",
        desc: "Automated adversary behavior emulation to continuously validate and optimize your SIEM, XDR, and endpoint defenses.",
        deliverables: ["Control Efficacy Score", "Alert Trigger Rate Audit", "Telemetry Optimization"],
      },
    ],
    lifecycle: [
      { step: "01", title: "Target OSINT & Recon", desc: "Digital attack surface mapping and perimeter footprinting." },
      { step: "02", title: "Weaponization & Exploit", desc: "Custom payload construction and vulnerability verification." },
      { step: "03", title: "Lateral Pivot & Impact", desc: "Privilege escalation and proving realistic blast radiuses." },
      { step: "04", title: "Debrief & Retesting", desc: "Executive board summary, developer walk-throughs, and free retesting." },
    ],
    deliverables: [
      "Executive Summary with Risk Heatmap",
      "Proof-of-Concept Exploit Chains",
      "Developer Remediation Snippets",
      "Certificate of Security Assessment",
    ],
  },
  defensive: {
    id: "defensive",
    n: "02",
    title: "Defensive Security",
    tagline: "Cut Dwell Time. Contain the Blast Radius.",
    promise: "24/7 Managed SOC, Threat Hunting & Incident Mitigation",
    icon: "defensive",
    summary:
      "Enterprise detection engineering, 24/7 SOC monitoring, proactive threat hunting, and rapid incident containment built to catch intrusions within minutes, starve attackers of dwell time, and preserve operational integrity.",
    metrics: [
      { value: "24/7/365", label: "SOC Coverage" },
      { value: "< 15 Mins", label: "Triage SLA" },
      { value: "Dark Web", label: "Live Telemetry" },
      { value: "0-Loss", label: "Continuity" },
    ],
    frameworks: ["NIST CSF 2.0", "ISO 27035", "MITRE D3FEND", "SANS Incident Response"],
    subServices: [
      {
        title: "Managed Detection & Response (MDR / SOC)",
        badge: "24/7 Vigilance",
        desc: "Continuous telemetry correlation, behavioral anomaly analysis, and automated host isolation across endpoints and cloud.",
        deliverables: ["24/7 Threat Monitoring", "High-Fidelity Triage", "Automated Containment"],
      },
      {
        title: "Proactive Threat Hunting",
        badge: "Adversary Evasion",
        desc: "Hypothesis-driven deep-dive hunts into your environment to discover dormant persistence mechanisms and APTs.",
        deliverables: ["IoC Threat Packs", "Detection Engineering (Sigma/YARA)", "Hunt Summary Reports"],
      },
      {
        title: "Brand Risk & Dark Web Monitoring",
        badge: "External Radar",
        desc: "Continuous scraping of darknet forums and paste sites for compromised executive credentials, VIP data, and brand abuse.",
        deliverables: ["Credential Leak Alerts", "Typosquat Domain Takedowns", "Threat Actor Attribution"],
      },
      {
        title: "Digital Forensics & Incident Response (DFIR)",
        badge: "Rapid Response",
        desc: "Emergency response to isolate live breaches, conduct memory/disk forensics, determine root causes, and notify regulators.",
        deliverables: ["Emergency Incident Containment", "Forensic Timeline Reconstruction", "Regulator Root-Cause Report"],
      },
      {
        title: "Disaster Recovery & Cyber Resilience",
        badge: "Operational Recovery",
        desc: "Architecture reviews and tabletop simulations to validate immutable backups and rapid disaster recovery runbooks.",
        deliverables: ["RTO / RPO Gap Assessment", "Air-Gapped Backup Validation", "Crisis Tabletop Runbook"],
      },
    ],
    lifecycle: [
      { step: "01", title: "Telemetry Onboarding", desc: "Ingesting endpoint, cloud, and network telemetry into XDR engines." },
      { step: "02", title: "Continuous Monitoring", desc: "Machine learning behavioral correlation with 24/7 analyst triage." },
      { step: "03", title: "Rapid Isolation", desc: "Automated playbooks and analyst-guided containment within minutes." },
      { step: "04", title: "Eradication & Tuning", desc: "Evicting the adversary and hardening detection rules to prevent recurrence." },
    ],
    deliverables: [
      "24/7 SOC Telemetry Dashboard",
      "Executive Threat Briefings",
      "Forensic Root-Cause Reports",
      "Dark Web Exposure Feeds",
    ],
  },
  grc: {
    id: "grc",
    n: "03",
    title: "GRC Solutions",
    tagline: "Turn Control Frameworks Into Operating Reality.",
    promise: "Governance, Statutory Compliance & Virtual CISO Leadership",
    icon: "grc",
    summary:
      "Risk quantification, control engineering, and continuous audit readiness that bind technical cybersecurity to enterprise business governance — ensuring compliance is demonstrable, defensible, and continuously evidenced.",
    metrics: [
      { value: "100%", label: "Audit Pass Rate" },
      { value: "ISO 27001", label: "2022 Ready" },
      { value: "SEBI CSCRF", label: "Control Pre-sets" },
      { value: "vCISO", label: "Board Advisory" },
    ],
    frameworks: ["ISO 27001:2022", "SOC 2 Type II", "SEBI CSCRF", "RBI Guidelines", "PCI DSS v4.0"],
    subServices: [
      {
        title: "ISO 27001:2022 Consulting & Certification",
        badge: "Global ISMS",
        desc: "End-to-end ISMS architecture, Statement of Applicability (SoA) drafting, internal audits, and external audit representation.",
        deliverables: ["ISMS Policy Architecture", "Risk Treatment Plan (RTP)", "Stage 1 & 2 Audit Support"],
      },
      {
        title: "SOC 1, SOC 2 (Type I & II) & SOC 3 Attestation",
        badge: "Enterprise Trust",
        desc: "Gap assessments, evidence collection automation, policy engineering, and coordination with accredited CPA firms.",
        deliverables: ["Trust Services Matrix", "Control Evidence Vault", "SOC 2 Type II Attestation"],
      },
      {
        title: "SEBI CSCRF & Regulatory Banking Compliance",
        badge: "Capital Markets",
        desc: "Audits tailored for stockbrokers, depository participants, mutual funds, and fintechs under SEBI's Cyber Resilience Framework.",
        deliverables: ["CSCRF Gap Analysis", "Quarterly Compliance Filings", "Regulatory Attestation Pack"],
      },
      {
        title: "Third-Party Risk Assessment (TPRM / TPRA)",
        badge: "Supply Chain",
        desc: "Systematic auditing of your vendor ecosystem, evaluating third-party security postures, data leakage, and SLA adherence.",
        deliverables: ["Vendor Risk Tiering Matrix", "Vendor DPA Review", "Continuous Vendor Radar"],
      },
      {
        title: "Virtual CISO (vCISO) Advisory",
        badge: "Executive Lead",
        desc: "On-demand Chief Information Security Officer leadership to direct security strategy, manage risk committees, and lead board meetings.",
        deliverables: ["Strategic Security Roadmap", "Board Risk Briefings", "Budget & ROI Alignment"],
      },
    ],
    lifecycle: [
      { step: "01", title: "Baseline Gap Analysis", desc: "Benchmarking controls against target statutory standards." },
      { step: "02", title: "Remediation & Policies", desc: "Engineering compliant policies and automated evidence collection." },
      { step: "03", title: "Internal Readiness Audit", desc: "Conducting stringent mock audits to eliminate non-conformities." },
      { step: "04", title: "Certification & Continuity", desc: "Direct representation during external audits and continuous posture assurance." },
    ],
    deliverables: [
      "Statutory Policy & Process Library",
      "Executive Compliance Scorecards",
      "Evidence Vault for ISO, SOC 2, and SEBI",
      "Third-Party Risk Assurance Packs",
    ],
  },
  dpdp: {
    id: "dpdp",
    n: "04",
    title: "DPDP Consulting",
    tagline: "Operationalize Data Protection, End to End.",
    promise: "India DPDP Act 2023 Statutory Compliance & Privacy Governance",
    icon: "dpdp",
    summary:
      "Data-flow mapping, consent architecture, Data Principal rights enablement, and accountability controls that implement India's Digital Personal Data Protection Act 2023 across your enterprise systems and third-party processors.",
    metrics: [
      { value: "DPDP 2023", label: "Indian Statutory Law" },
      { value: "DPIA", label: "Impact Assessment" },
      { value: "vDPO", label: "Privacy Counsel" },
      { value: "Zero-Leak", label: "Pipeline Control" },
    ],
    frameworks: ["DPDP Act 2023", "GDPR", "ISO 27701 (PIMS)", "MeitY Rules"],
    subServices: [
      {
        title: "Data Protection Impact Assessment (DPIA)",
        badge: "Statutory DPIA",
        desc: "Comprehensive evaluation of personal data processing activities, identifying exposure risks to Data Principals.",
        deliverables: ["DPIA Assessment Report", "PII Inventory & Flow Maps", "Risk Mitigation Action Plan"],
      },
      {
        title: "Virtual Data Protection Officer (vDPO)",
        badge: "Statutory DPO",
        desc: "Certified privacy experts acting as your statutory DPO, handling regulatory communications with the Data Protection Board.",
        deliverables: ["Regulatory Interface", "Privacy Policy Governance", "Annual Compliance Audit"],
      },
      {
        title: "Consent Management Architecture",
        badge: "Consent Engine",
        desc: "Technical implementation of itemized, multi-lingual, affirmative consent capture and real-time withdrawal mechanisms.",
        deliverables: ["Notice Formatting Templates", "Consent Recording Engine", "Withdrawal SLA Workflow"],
      },
      {
        title: "Data Processing Agreements (DPA) & Contracts",
        badge: "Legal Review",
        desc: "Review and drafting of data processing agreements, cross-border transfer agreements, and sub-processor contracts.",
        deliverables: ["Standardized DPA Templates", "Vendor Liability Review", "Cross-Border Transfer Audit"],
      },
      {
        title: "Data Principal Rights Portal",
        badge: "Rights Portal",
        desc: "Deploying automated workflows for processing Data Principal requests for access, correction, erasure, and grievance redressal.",
        deliverables: ["Automated Request Portal", "Verification & SLA Workflows", "Audit Trail Archive"],
      },
    ],
    lifecycle: [
      { step: "01", title: "PII Discovery & Mapping", desc: "Cataloging all personal data touchpoints, databases, and APIs." },
      { step: "02", title: "Gap Assessment & DPIA", desc: "Analyzing data handling against DPDP Act obligations." },
      { step: "03", title: "Consent & Controls Rollout", desc: "Deploying consent banners, rights portals, and vendor DPAs." },
      { step: "04", title: "Continuous DPO Assurance", desc: "Continuous monitoring of data flows and managing grievances." },
    ],
    deliverables: [
      "Data Inventory & Lineage Map",
      "DPDP Act 2023 Compliance Report",
      "Privacy Policies & Consent Notices",
      "Rights Fulfillment Operations Manual",
    ],
  },
  training: {
    id: "training",
    n: "05",
    title: "Training Programs & MRA",
    tagline: "Harden the Human Attack Surface.",
    promise: "Workforce Cyber Enablement & Defensive Technical Labs",
    icon: "training",
    summary:
      "Role-based cybersecurity education, hands-on defensive technical labs, and mutual-recognition-aligned programs designed to transform your employees from vulnerabilities into the sharpest first line of enterprise defence.",
    metrics: [
      { value: "95%", label: "Phishing Resistance" },
      { value: "Hands-On", label: "Defensive Labs" },
      { value: "Role-Based", label: "CXO to Engineer" },
      { value: "Certified", label: "Lead Instructors" },
    ],
    frameworks: ["NIST NICE Framework", "SANS Security Awareness", "OWASP Education", "DPDPA Training"],
    subServices: [
      {
        title: "Executive & Board Cyber Leadership Masterclass",
        badge: "CXO Governance",
        desc: "Strategic crisis management, fiduciary responsibilities, ransomware negotiation protocols, and cyber governance for CXOs.",
        deliverables: ["Executive Cyber Playbook", "Tabletop Crisis Simulation", "Fiduciary Governance Guide"],
      },
      {
        title: "Expert-Led Training in Data Analytics & Telemetry",
        badge: "SOC Enablement",
        desc: "Advanced training for technical teams on log aggregation, behavioral telemetry analysis, and SIEM rule construction.",
        deliverables: ["Hands-On Lab Access", "Detection Engineering Workbooks", "Log Correlation Scripts"],
      },
      {
        title: "Secure Coding & DevSecOps for Engineers",
        badge: "Developer Training",
        desc: "Empowering software developers with secure software architecture principles, OWASP Top 10 prevention, and code linting.",
        deliverables: ["Vulnerable Code Lab Exercises", "Secure Code Snippets", "Threat Modeling Frameworks"],
      },
      {
        title: "Workforce Phishing & Social Engineering Awareness",
        badge: "Human Perimeter",
        desc: "Interactive training modules paired with simulated spear-phishing drills to train employees in spotting credential harvesting.",
        deliverables: ["Phishing Susceptibility Reports", "Gamified Learning Modules", "Quarterly Refresher Packs"],
      },
    ],
    lifecycle: [
      { step: "01", title: "Human Risk Assessment", desc: "Baseline phishing simulations and role-based knowledge surveys." },
      { step: "02", title: "Custom Curriculum Design", desc: "Tailoring technical and awareness training to your threat model." },
      { step: "03", title: "Interactive Delivery", desc: "Live instructor-led sessions, war-games, and practical labs." },
      { step: "04", title: "Impact Measurement", desc: "Quarterly re-testing and reporting resilience metrics to leadership." },
    ],
    deliverables: [
      "Workforce Security Aptitude Scorecard",
      "Recorded Training & Interactive Labs",
      "Secure Coding Reference Manuals",
      "Employee Cybersecurity Certificates",
    ],
  },
  ai: {
    id: "ai",
    n: "06",
    title: "AI Audits & Assurance",
    tagline: "Assurance for Models in Production.",
    promise: "Independent Security, Privacy & Safety for AI & LLM Systems",
    icon: "ai",
    summary:
      "Rigorous independent evaluation of artificial intelligence and large language model (LLM) deployments across security, data integrity, prompt injection resistance, and privacy — ensuring resilient, safe, and statutory-compliant AI.",
    metrics: [
      { value: "LLM Top 10", label: "OWASP Hardened" },
      { value: "0-Leak", label: "Data Privacy" },
      { value: "Adversarial", label: "Injection Testing" },
      { value: "NIST AI", label: "RMF Compliant" },
    ],
    frameworks: ["OWASP Top 10 for LLMs", "NIST AI RMF", "EU AI Act Guidelines", "MITRE ATLAS"],
    subServices: [
      {
        title: "AI & LLM Red Teaming (Adversarial Testing)",
        badge: "Model Red Team",
        desc: "Attacking LLMs and agentic AI systems with indirect prompt injections, jailbreaks, system prompt extractions, and data poisoning.",
        deliverables: ["Prompt Injection Vulnerability Log", "Guardrail Bypass Proofs", "Safety Filter Rules"],
      },
      {
        title: "Training Data Lineage & PII Scrubbing Audit",
        badge: "Data Privacy",
        desc: "Verifying that training, fine-tuning, and RAG data pipelines do not contain unauthorized PII or copyrighted material.",
        deliverables: ["Data Lineage Integrity Map", "PII Exposure Risk Report", "Vector DB Access Controls"],
      },
      {
        title: "Model Inversion & Extraction Resistance",
        badge: "IP Protection",
        desc: "Assessing model APIs against extraction attempts, membership inference attacks, and reverse-engineering of proprietary weights.",
        deliverables: ["API Query Defense Rules", "Model Stealing Risk Matrix", "Production Safeguard Plan"],
      },
      {
        title: "AI Governance, Bias & Ethical Compliance",
        badge: "Governance",
        desc: "Benchmarking enterprise AI systems against statutory regulations, NIST AI Risk Management Framework, and ethical standards.",
        deliverables: ["AI Governance Audit Scorecard", "Bias Mitigation Plan", "AI Safety Attestation"],
      },
    ],
    lifecycle: [
      { step: "01", title: "Architecture Discovery", desc: "Cataloging model weights, RAG knowledge bases, and API perimeters." },
      { step: "02", title: "Adversarial Probing", desc: "Executing automated and manual prompt injections and jailbreaks." },
      { step: "03", title: "Privacy Verification", desc: "Auditing data ingestion pipelines for PII retention and leakage." },
      { step: "04", title: "Guardrail Attestation", desc: "Deploying semantic input/output guardrails and issuing safety reports." },
    ],
    deliverables: [
      "AI & LLM Security Assessment Report",
      "Prompt Injection & Bypass Logs",
      "RAG Training Privacy Compliance Audit",
      "Certificate of AI Security Assurance",
    ],
  },
};

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  offensive: <Crosshair size={22} weight="duotone" />,
  defensive: <ShieldCheck size={22} weight="duotone" />,
  grc: <Scales size={22} weight="duotone" />,
  dpdp: <LockKey size={22} weight="duotone" />,
  training: <GraduationCap size={22} weight="duotone" />,
  ai: <Cpu size={22} weight="duotone" />,
};

export default function Capabilities() {
  const { hash } = useLocation();
  const navigate = useNavigate();

  const cleanHash = hash ? hash.replace("#", "") : "";
  const initialService = SERVICES_DEEP_DIVE[cleanHash] ? cleanHash : "grc";

  const [activeServiceId, setActiveServiceId] = useState<string>(initialService);

  useEffect(() => {
    if (cleanHash && SERVICES_DEEP_DIVE[cleanHash]) {
      setActiveServiceId(cleanHash);
    } else if (cleanHash === "all" || cleanHash === "services-grid") {
      setActiveServiceId("all");
    }
  }, [cleanHash]);

  const handleTabChange = (serviceId: string) => {
    setActiveServiceId(serviceId);
    navigate(`/capabilities#${serviceId}`, { replace: true });
  };

  const activeService = SERVICES_DEEP_DIVE[activeServiceId] || SERVICES_DEEP_DIVE["grc"];

  return (
    <div className="min-h-screen bg-white dark:bg-[#090a10] text-slate-900 dark:text-white transition-colors duration-200">
      {/* ------------------------------------------------------------ */}
      {/* SINGLE-VIEWPORT COMPREHENSIVE SERVICE HUB FRAME               */}
      {/* ------------------------------------------------------------ */}
      <section
        id="service-hub"
        className="relative bg-white transition-colors duration-300 dark:bg-[#090a10] pt-24 pb-8 sm:pt-28 sm:pb-10 lg:pt-28 lg:pb-8 lg:min-h-screen lg:flex lg:flex-col lg:justify-center border-b border-slate-200/80 dark:border-white/10"
      >
        <div className={`${WRAP} w-full flex flex-col justify-center`}>
          {/* Top Header Bar: Title, Subtitle & Interactive Switcher Bar */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between mb-4 lg:mb-5">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-50 px-3 py-0.5 text-xs font-semibold text-[#6d28d9] dark:bg-white/10 dark:text-[#c4b5fd]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6d28d9] dark:bg-[#a78bfa]" />
                <span className="font-mono text-[10.5px] uppercase tracking-wider">
                  {activeServiceId === "all" ? "Our Capabilities" : `Pillar #${activeService.n} / ${activeService.promise}`}
                </span>
              </div>

              <h1 className="mt-1.5 font-display text-2xl sm:text-3xl lg:text-[32px] font-extrabold tracking-tight text-[#150c2e] dark:text-white leading-tight">
                {activeServiceId === "all" ? (
                  <RevealText text="End-to-End Cyber Defence Capabilities" />
                ) : (
                  <>
                    What We Deliver Under{" "}
                    <span className="text-[#6d28d9] dark:text-[#c4b5fd]">{activeService.title}</span>
                  </>
                )}
              </h1>

              <p className="mt-1 text-xs sm:text-[13px] text-[#575f75] dark:text-slate-300 leading-relaxed max-w-xl">
                {activeServiceId === "all"
                  ? "Select any capability below to explore specialized offerings, technical methodologies, and deliverables."
                  : activeService.tagline}
              </p>
            </div>

            {/* Quick Consultation Button */}
            <div className="shrink-0">
              <Btn
                to="/contact"
                variant="solid"
                className="w-full sm:w-auto text-center justify-center text-xs sm:text-[13px] py-2 px-5 font-semibold shadow-sm hover:scale-105 transition-all"
              >
                Request {activeServiceId === "all" ? "Security" : activeService.title} Scope &rarr;
              </Btn>
            </div>
          </div>

          {/* Interactive Service Switcher Tab Pills Bar */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4 lg:mb-5 pb-2 border-b border-slate-200/80 dark:border-white/10">
            {[
              { id: "offensive", label: "Offensive Security", icon: <Crosshair size={15} weight="bold" /> },
              { id: "defensive", label: "Defensive Security", icon: <ShieldCheck size={15} weight="bold" /> },
              { id: "grc", label: "GRC Solutions", icon: <Scales size={15} weight="bold" /> },
              { id: "dpdp", label: "DPDP Consulting", icon: <LockKey size={15} weight="bold" /> },
              { id: "training", label: "Training & MRA", icon: <GraduationCap size={15} weight="bold" /> },
              { id: "ai", label: "AI Audits", icon: <Cpu size={15} weight="bold" /> },
              { id: "all", label: "All 6 Overview", icon: <Target size={15} weight="bold" /> },
            ].map((tab) => {
              const isActive = activeServiceId === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#6d28d9] text-white shadow-md scale-102 ring-1 ring-violet-400"
                      : "bg-slate-100/90 text-slate-700 hover:bg-violet-100/80 hover:text-[#6d28d9] dark:bg-white/[0.06] dark:text-slate-300 dark:hover:bg-white/[0.12] dark:hover:text-white"
                  }`}
                >
                  <span className={isActive ? "text-[#B4FF00]" : "text-[#6d28d9] dark:text-violet-400"}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ============================================================ */}
          {/* VIEW A: DEDICATED SERVICE OFFERINGS (FITS 1 SCREEN FRAME)   */}
          {/* ============================================================ */}
          {activeServiceId !== "all" && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3.5 xl:gap-4">
              {activeService.subServices.map((sub, idx) => (
                <div
                  key={sub.title}
                  className="group relative flex flex-col justify-between rounded-2xl border border-violet-900/50 bg-gradient-to-b from-[#1e1342] via-[#170e36] to-[#12082b] p-3.5 sm:p-4 lg:p-4 text-white shadow-xl transition-all duration-300 hover:border-[#B4FF00]/80 hover:shadow-[0_12px_32px_rgba(180,255,0,0.2)] hover:-translate-y-1"
                >
                  {/* Top Green Ray */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#B4FF00] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div>
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="font-mono text-[11px] font-bold text-violet-300 group-hover:text-[#B4FF00] transition-colors">
                        0{idx + 1}
                      </span>
                      <span className="rounded-full border border-violet-400/30 bg-violet-500/15 px-2 py-0.5 font-mono text-[9.5px] font-semibold text-violet-200">
                        {sub.badge}
                      </span>
                    </div>

                    <h3 className="mt-2 font-display text-[14.5px] sm:text-[15.5px] font-bold text-white group-hover:text-[#B4FF00] transition-colors leading-snug">
                      {sub.title}
                    </h3>

                    <p className="mt-1.5 text-[11.5px] leading-relaxed text-[#d8cefa] line-clamp-2">
                      {sub.desc}
                    </p>

                    {/* Deliverables List */}
                    <div className="mt-2.5 pt-2 border-t border-white/10">
                      <div className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-violet-300 mb-1.5">
                        Key Deliverables
                      </div>
                      <ul className="space-y-1 text-[11px] text-[#e2d9f3]">
                        {sub.deliverables.map((deliv) => (
                          <li key={deliv} className="flex items-start gap-1.5">
                            <CheckCircle size={13} weight="fill" className="mt-0.5 shrink-0 text-[#B4FF00]" />
                            <span className="leading-tight">{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="font-mono text-[9.5px] uppercase tracking-wider text-violet-300 font-semibold group-hover:text-[#B4FF00] transition-colors">
                      Audit Ready
                    </span>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#c4b5fd] group-hover:text-[#B4FF00] group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Request Scope</span>
                      <ArrowRight size={11} weight="bold" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ============================================================ */}
          {/* VIEW B: ALL 6 SERVICES OVERVIEW (FITS 1 SCREEN FRAME)       */}
          {/* ============================================================ */}
          {activeServiceId === "all" && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3.5 xl:gap-4">
              {Object.values(SERVICES_DEEP_DIVE).map((c) => (
                <article
                  key={c.id}
                  onClick={() => handleTabChange(c.id)}
                  className="group relative flex flex-col justify-between rounded-2xl border border-violet-900/50 bg-gradient-to-b from-[#1e1342] via-[#170e36] to-[#12082b] p-3.5 sm:p-4 lg:p-4 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#B4FF00]/80 hover:shadow-[0_12px_32px_rgba(180,255,0,0.2)] cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#B4FF00] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/20 text-[#c4b5fd] group-hover:bg-[#B4FF00] group-hover:text-[#0c061e] transition-colors shadow-xs">
                        {SERVICE_ICONS[c.id] || <ShieldCheck size={18} weight="duotone" />}
                      </div>
                      <span className="font-mono text-[10.5px] font-bold text-violet-300 group-hover:text-[#B4FF00]">
                        #{c.n}
                      </span>
                    </div>

                    <h3 className="mt-2.5 font-display text-[15.5px] sm:text-[16.5px] font-bold text-white group-hover:text-[#B4FF00] transition-colors">
                      {c.title}
                    </h3>

                    <p className="mt-1.5 text-[11.5px] leading-snug text-[#d8cefa] line-clamp-2">
                      {c.summary}
                    </p>

                    <div className="mt-2.5 border-t border-white/10 pt-2">
                      <div className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-violet-300 mb-1">
                        Core Offerings
                      </div>
                      <ul className="space-y-1 text-[11px] text-[#e2d9f3]">
                        {c.subServices.slice(0, 3).map((sub) => (
                          <li key={sub.title} className="flex items-start gap-1.5">
                            <CheckCircle size={12} weight="fill" className="mt-0.5 shrink-0 text-[#B4FF00]" />
                            <span className="leading-tight truncate">{sub.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-3 border-t border-white/10 pt-2 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold text-violet-300">
                      {c.subServices.length} Offerings
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[10.5px] font-bold text-[#B4FF00] group-hover:translate-x-0.5 transition-transform">
                      <span>Explore Discipline</span>
                      <ArrowRight size={11} weight="bold" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* SECTION 2 — HIGH-IMPACT CLOSING CTA BAND                     */}
      {/* ------------------------------------------------------------ */}
      <CtaBand />
    </div>
  );
}
