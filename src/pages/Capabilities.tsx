import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router";
import {
  ArrowRight,
  CaretRight,
  CheckCircle,
  Cpu,
  Crosshair,
  GraduationCap,
  LockKey,
  Scales,
  ShieldCheck,
  Sparkle,
  Target,
  ShieldWarning,
  FileText,
  Lightning,
  Certificate,
  ArrowsClockwise,
  UsersThree,
} from "@phosphor-icons/react";
import { Btn, Eyebrow, Reveal, RevealText } from "../components/ui";
import { CtaBand } from "./Home";

const WRAP = "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8";

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
      "Goal-based penetration testing, red teaming, and adversary emulation that chain real-world exploitation techniques across applications, networks, APIs, and cloud infrastructure — proving actual business exploitability rather than just cataloguing theoretical findings.",
    metrics: [
      { value: "0-Day", label: "Real-World Exploit Chains" },
      { value: "100%", label: "Verified PoC Evidence" },
      { value: "MITRE", label: "ATT&CK Framework Mapped" },
      { value: "0", label: "False Positive Guarantee" },
    ],
    frameworks: ["OWASP Top 10", "SANS Top 25", "NIST SP 800-115", "PTES", "MITRE ATT&CK"],
    subServices: [
      {
        title: "Red Teaming & Adversary Emulation",
        badge: "Advanced Threat Simulation",
        desc: "Full-scope, multi-vector cyber and physical attack simulations targeting your human, digital, and physical perimeters under realistic constraints.",
        deliverables: ["Initial Access Vector Proof", "Lateral Movement Maps", "Active Directory Compromise Runbooks", "Detection Gap Analysis"],
      },
      {
        title: "Web Application & API Penetration Testing",
        badge: "VAPT Core",
        desc: "Deep-dive manual and automated assessments of web applications, REST/GraphQL APIs, microservices, and single-page applications.",
        deliverables: ["Business Logic Flaw Proof", "Authentication Bypass Tests", "Data Leakage Verification", "Remediation Snippets"],
      },
      {
        title: "Cloud Infrastructure Penetration Testing",
        badge: "AWS / Azure / GCP",
        desc: "Identification of cloud perimeter exposure, overly permissive IAM roles, container breakout paths, and S3/Blob storage data exfiltration vulnerabilities.",
        deliverables: ["Cloud Posture Misconfigurations", "IAM Privilege Escalation Paths", "Storage Bucket Leak Proofs", "Terraform Fix Guidance"],
      },
      {
        title: "Mobile Binary Security Assessment",
        badge: "iOS & Android",
        desc: "Static and dynamic binary reverse engineering, local storage analysis, certificate pinning validation, and runtime manipulation testing.",
        deliverables: ["Decompiled Binary Audit", "Insecure IPC / Keystore Analysis", "OWASP MASVS Compliance", "Hardening Checklist"],
      },
      {
        title: "Secure Code Review (SAST & Manual)",
        badge: "DevSecOps",
        desc: "Comprehensive line-by-line inspection of source code to locate logic errors, injection flaws, cryptographic flaws, and insecure dependencies.",
        deliverables: ["Static Code Findings", "Tainted Data Flow Traces", "Developer Patch Suggestions", "CI/CD Gate Integration Advice"],
      },
      {
        title: "Breach & Attack Simulation (BAS)",
        badge: "Continuous Validation",
        desc: "Automated adversary behavior emulation to continuously test and challenge your SIEM/XDR, firewall, and endpoint detection capabilities.",
        deliverables: ["Security Control Efficacy Score", "Alert Trigger Rate Reports", "SOC Response Time Audit", "Telemetry Optimization"],
      },
    ],
    lifecycle: [
      { step: "01", title: "Target OSINT & Recon", desc: "Passive and active attack surface mapping, credential leak intelligence, and digital perimeter footprinting." },
      { step: "02", title: "Weaponization & Exploit", desc: "Custom payload construction, vulnerability verification, and authenticated exploit execution." },
      { step: "03", title: "Lateral Pivot & Impact", desc: "Privilege escalation, data access validation, and proving the realistic blast radius without business disruption." },
      { step: "04", title: "Debrief & Free Retesting", desc: "Executive board summary, developer walk-throughs, remediation runbooks, and free post-fix re-validation." },
    ],
    deliverables: [
      "Executive Summary with Risk Impact Heatmap",
      "Step-by-Step Proof-of-Concept (PoC) Exploit Chains",
      "Developer-Ready Remediation Code Snippets",
      "Official Certificate of Security Assessment",
      "Complimentary Retest & Attestation Report",
    ],
  },
  defensive: {
    id: "defensive",
    n: "02",
    title: "Defensive Security",
    tagline: "Cut Dwell Time. Contain the Blast Radius.",
    promise: "24/7 Managed SOC, Threat Hunting & Incident Readiness",
    icon: "defensive",
    summary:
      "Enterprise detection engineering, continuous threat telemetry monitoring, proactive threat hunting, and rapid incident containment built to catch intrusions within minutes, starve attackers of dwell time, and preserve operational integrity.",
    metrics: [
      { value: "24/7/365", label: "Continuous SOC Coverage" },
      { value: "< 15 Mins", label: "Critical Triage SLA" },
      { value: "Dark Web", label: "Live Telemetry Radar" },
      { value: "0-Disruption", label: "Business Continuity" },
    ],
    frameworks: ["NIST CSF 2.0", "ISO 27035", "MITRE D3FEND", "SANS Incident Response"],
    subServices: [
      {
        title: "Managed Detection & Response (MDR / SOC)",
        badge: "24/7 Vigilance",
        desc: "Continuous event log correlation, behavioral analysis, and automated containment across endpoints, cloud workloads, and identity providers.",
        deliverables: ["24/7 Threat Monitoring", "High-Fidelity Alert Triaging", "Automated Host Isolation", "Weekly Threat Briefings"],
      },
      {
        title: "Proactive Threat Hunting",
        badge: "Adversary Evasion Detection",
        desc: "Hypothesis-driven manual threat hunts into your environment to discover dormant rootkits, stealthy persistence mechanisms, and advanced APTs.",
        deliverables: ["Indicators of Compromise (IoC) Packs", "Behavioral Anomaly Reports", "Detection Rule Engineering (Sigma/YARA)", "Hunt Summary"],
      },
      {
        title: "Brand Risk & Dark Web Monitoring",
        badge: "External Radar",
        desc: "Continuous scraping of darknet forums, illicit marketplaces, and paste sites for leaked executive credentials, VIP data, and fake domains.",
        deliverables: ["Compromised Credential Alerts", "Typosquatting Domain Takedowns", "Data Leak Discovery Reports", "Threat Actor Attribution"],
      },
      {
        title: "Digital Forensics & Incident Response (DFIR)",
        badge: "Rapid Containment",
        desc: "Emergency standby response to isolate live breaches, conduct memory/disk forensics, determine root causes, and provide evidence for regulators.",
        deliverables: ["Emergency Incident Containment", "Forensic Timeline Reconstruction", "Regulatory Root-Cause Report", "Remediation Roadmap"],
      },
      {
        title: "Disaster Recovery & Cyber Resilience",
        badge: "Operational Recovery",
        desc: "Architecture reviews and tabletop simulations to validate zero-data-loss immutable backups and rapid disaster recovery runbooks.",
        deliverables: ["RTO / RPO Gap Assessment", "Air-Gapped Backup Validation", "Crisis Tabletop Simulation", "Resilience Governance Manual"],
      },
    ],
    lifecycle: [
      { step: "01", title: "Telemetry Onboarding", desc: "Ingesting endpoint, cloud, network, and identity telemetry into correlated XDR engines." },
      { step: "02", title: "Continuous Monitoring", desc: "Machine learning behavioral correlation combined with human analyst triage around the clock." },
      { step: "03", title: "Rapid Isolation", desc: "Executing automated playbooks and analyst-guided containment within minutes of verified alert." },
      { step: "04", title: "Eradication & Tuning", desc: "Complete eviction of the adversary, forensic analysis, and hardening detection rules to prevent recurrence." },
    ],
    deliverables: [
      "24/7 Security Operations Telemetry Dashboard",
      "Executive Incident & Threat Intelligence Briefings",
      "Forensic Root-Cause & Breach Containment Reports",
      "Brand Reputation & Dark Web Exposure Feeds",
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
      "Risk quantification, control engineering, and continuous audit readiness that bind technical cybersecurity to enterprise business governance — ensuring compliance is demonstrable, defensible, and continuously evidenced for regulators and clients.",
    metrics: [
      { value: "100%", label: "Audit Pass Track Record" },
      { value: "ISO 27001", label: "2022 Standard Ready" },
      { value: "SEBI CSCRF", label: "Pre-Mapped Control Packs" },
      { value: "vCISO", label: "Executive Board Advisory" },
    ],
    frameworks: ["ISO 27001:2022", "SOC 2 Type II", "SEBI CSCRF", "RBI Cyber Security Guidelines", "PCI DSS v4.0"],
    subServices: [
      {
        title: "ISO 27001:2022 Consulting & Certification",
        badge: "Global ISMS",
        desc: "End-to-end Information Security Management System design, Statement of Applicability (SoA) drafting, internal audits, and external audit representation.",
        deliverables: ["ISMS Policy Architecture", "Risk Treatment Plan (RTP)", "Internal Pre-Audit Report", "Stage 1 & 2 Audit Support"],
      },
      {
        title: "SOC 1, SOC 2 (Type I & II) & SOC 3 Attestation",
        badge: "Enterprise Trust",
        desc: "Gap assessments, evidence collection automation, policy engineering, and coordination with accredited CPA firms for fast SOC 2 issuance.",
        deliverables: ["Trust Services Criteria Matrix", "Control Evidence Archive", "Remediation Workbooks", "Final SOC 2 Type II Attestation"],
      },
      {
        title: "SEBI CSCRF & Regulatory Banking Compliance",
        badge: "Statutory Capital Markets",
        desc: "Audits tailored for stockbrokers, depository participants, mutual funds, and fintechs under SEBI's Cyber Security & Cyber Resilience Framework.",
        deliverables: ["CSCRF Gap Analysis", "Quarterly Compliance Submissions", "SOC Capability Audit", "Regulatory Attestation Pack"],
      },
      {
        title: "Third-Party Risk Assessment (TPRM / TPRA)",
        badge: "Supply Chain Defense",
        desc: "Systematic auditing of your vendor ecosystem, evaluating third-party security postures, supply chain data leakage, and SLA adherence.",
        deliverables: ["Vendor Risk Tiering Matrix", "Third-Party Assessment Reports", "Vendor DPA Review", "Continuous Vendor Radar"],
      },
      {
        title: "Virtual CISO (vCISO) Advisory",
        badge: "Executive Leadership",
        desc: "On-demand Chief Information Security Officer leadership to direct security strategy, manage risk committees, and lead boardroom presentations.",
        deliverables: ["Strategic Security Roadmap", "Board Risk Briefings", "Budget & Tool ROI Analysis", "Incident Response Command"],
      },
    ],
    lifecycle: [
      { step: "01", title: "Baseline Gap Analysis", desc: "Benchmarking current technical and organizational controls against target statutory standards." },
      { step: "02", title: "Remediation & Policies", desc: "Engineering compliant policies, deploying technical controls, and establishing automated evidence collection." },
      { step: "03", title: "Internal Readiness Audit", desc: "Conducting stringent mock audits to identify and eliminate any non-conformities before external scrutiny." },
      { step: "04", title: "Certification & Continuity", desc: "Direct representation during external auditor reviews and continuous posture monitoring." },
    ],
    deliverables: [
      "Complete Statutory Policy & Process Library",
      "Executive Compliance & Audit Readiness Scorecards",
      "Evidence Vault for ISO, SOC 2, and SEBI Regulators",
      "Official Third-Party Risk Assurance Certificates",
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
      "Data-flow mapping, consent architecture, Data Principal rights enablement, and accountability controls that implement India's Digital Personal Data Protection Act 2023 across your enterprise systems, applications, and third-party processors.",
    metrics: [
      { value: "DPDP 2023", label: "Statutory Indian Baseline" },
      { value: "DPIA", label: "High-Risk Data Impact Ready" },
      { value: "vDPO", label: "Certified Privacy Counsel" },
      { value: "Zero-Leak", label: "Data Pipeline Governance" },
    ],
    frameworks: ["DPDP Act 2023", "GDPR", "ISO 27701 (PIMS)", "MeitY Statutory Rules"],
    subServices: [
      {
        title: "Data Protection Impact Assessment (DPIA)",
        badge: "Statutory Mandate",
        desc: "Comprehensive evaluation of personal data processing activities, identifying exposure risks to Data Principals and mitigating compliance liabilities.",
        deliverables: ["DPIA Assessment Report", "Data Flow & PII Inventory Maps", "Risk Mitigation Action Plan", "Board Privacy Briefing"],
      },
      {
        title: "Virtual Data Protection Officer (vDPO)",
        badge: "Statutory Oversight",
        desc: "Certified privacy experts acting as your statutory DPO, handling regulatory communications with the Data Protection Board of India (DPBI).",
        deliverables: ["Regulatory Point of Contact", "Privacy Policy Governance", "Annual Compliance Audit", "Employee Privacy Briefs"],
      },
      {
        title: "Consent Management Architecture",
        badge: "Consent Governance",
        desc: "Technical implementation of itemized, multi-lingual, affirmative consent capture and real-time consent withdrawal mechanisms across web and mobile apps.",
        deliverables: ["Notice Formatting Templates", "Consent Recording Architecture", "Withdrawal SLA Workflow", "Consent Verification Audit"],
      },
      {
        title: "Data Processing Agreements (DPA) & Contract Review",
        badge: "Legal Engineering",
        desc: "Review and drafting of data processing agreements, cross-border transfer agreements, and vendor contracts to ensure total legal alignment.",
        deliverables: ["Standardized DPA Templates", "Vendor Liability Review", "Cross-Border Transfer Audit", "Sub-Processor Audit Pack"],
      },
      {
        title: "Data Principal Rights Portal Implementation",
        badge: "Rights Management",
        desc: "Deploying automated workflows for processing Data Principal requests for access, correction, erasure, and grievance redressal.",
        deliverables: ["Automated Request Portal", "Verification & Fulfillment Workflows", "SLA Tracking Dashboard", "Audit Trail Logs"],
      },
    ],
    lifecycle: [
      { step: "01", title: "PII Discovery & Data Mapping", desc: "Cataloging all personal data touchpoints, databases, APIs, and third-party processor flows." },
      { step: "02", title: "Gap Assessment & DPIA", desc: "Analyzing current data handling against DPDP Act obligations and identifying statutory non-compliance." },
      { step: "03", title: "Consent & Controls Rollout", desc: "Deploying consent banners, rights handling portals, vendor DPAs, and employee privacy training." },
      { step: "04", title: "Continuous DPO Assurance", desc: "Continuous monitoring of data flows, processing audit trails, and managing Data Principal grievances." },
    ],
    deliverables: [
      "Comprehensive Data Inventory & Lineage Map",
      "DPDP Act 2023 Statutory Compliance Assessment Report",
      "Custom Privacy Policies, Consent Notices & DPA Contracts",
      "Data Principal Rights Fulfillment Operations Playbook",
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
      { value: "95%", label: "Phishing Resistance Rate" },
      { value: "Hands-On", label: "Technical Defensive Labs" },
      { value: "Role-Based", label: "Executive to Developer" },
      { value: "Certified", label: "Accredited Instructors" },
    ],
    frameworks: ["NIST NICE Framework", "SANS Security Awareness", "OWASP Education", "DPDPA Training Modules"],
    subServices: [
      {
        title: "Executive & Board Cyber Leadership Masterclass",
        badge: "Leadership Training",
        desc: "Strategic crisis management, fiduciary responsibilities, ransomware negotiation protocols, and cyber governance for CXOs and board directors.",
        deliverables: ["Executive Cyber Playbook", "Tabletop Crisis Simulation", "Fiduciary Governance Guide", "Certificate of Completion"],
      },
      {
        title: "Expert-Led Training in Data Analytics & Telemetry",
        badge: "SOC Enablement",
        desc: "Advanced training for technical teams on log aggregation, behavioral telemetry analysis, SIEM rule construction, and threat hunting.",
        deliverables: ["Hands-On Lab Access", "Detection Engineering Workbooks", "Log Correlation Scripts", "Technical Assessment Scores"],
      },
      {
        title: "Secure Coding & DevSecOps for Engineers",
        badge: "Developer Training",
        desc: "Empowering software developers with secure software architecture principles, OWASP Top 10 prevention, and CI/CD security linting.",
        deliverables: ["Vulnerable Code Lab Exercises", "Secure Code Reference Snippets", "Threat Modeling Frameworks", "Developer Certification"],
      },
      {
        title: "Workforce Phishing & Social Engineering Awareness",
        badge: "Human Perimeter",
        desc: "Gamified training modules paired with simulated spear-phishing drills to train employees in spotting credential harvesting and fraud.",
        deliverables: ["Phishing Susceptibility Reports", "Gamified Learning Modules", "Departmental Risk Scores", "Quarterly Refresher Packs"],
      },
    ],
    lifecycle: [
      { step: "01", title: "Human Risk Assessment", desc: "Baseline phishing simulations and role-based knowledge surveys to identify knowledge gaps." },
      { step: "02", title: "Customized Curriculum Design", desc: "Tailoring technical and awareness training specific to your industry, toolstack, and threat model." },
      { step: "03", title: "Interactive Workshop Delivery", desc: "Live instructor-led sessions, adversary-defense war-games, and practical hands-on labs." },
      { step: "04", title: "Impact Measurement", desc: "Quarterly re-testing, simulated attack validation, and reporting workforce resilience metrics to leadership." },
    ],
    deliverables: [
      "Detailed Workforce Security Aptitude & Risk Scorecard",
      "Recorded Training Library & Interactive Lab Access",
      "Secure Coding & Threat Hunting Reference Manuals",
      "Official Employee Cybersecurity Certificates",
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
      "Rigorous independent evaluation of artificial intelligence and large language model (LLM) deployments across security, data integrity, prompt injection resistance, and privacy — ensuring your AI systems are resilient against adversarial tampering and compliant with statutory standards.",
    metrics: [
      { value: "LLM Top 10", label: "OWASP Model Hardening" },
      { value: "0-Leak", label: "Training Data Privacy" },
      { value: "Adversarial", label: "Prompt Injection Testing" },
      { value: "NIST AI", label: "RMF Compliant Evaluation" },
    ],
    frameworks: ["OWASP Top 10 for LLMs", "NIST AI RMF", "EU AI Act Guidelines", "MITRE ATLAS"],
    subServices: [
      {
        title: "AI & LLM Red Teaming (Adversarial Testing)",
        badge: "Model Red Teaming",
        desc: "Attacking LLMs and agentic AI systems with indirect prompt injections, jailbreaks, system prompt extractions, and data poisoning attacks.",
        deliverables: ["Prompt Injection Vulnerability Log", "Guardrail Bypass Proofs", "System Prompt Leakage Audit", "Safety Filter Rules"],
      },
      {
        title: "Training Data Lineage & PII Scrubbing Audit",
        badge: "Data Privacy",
        desc: "Verifying that training, fine-tuning, and RAG data pipelines do not contain unauthorized PII, trade secrets, or copyrighted material.",
        deliverables: ["Data Lineage Integrity Map", "PII Exposure Risk Report", "RAG Pipeline Security Audit", "Vector DB Access Controls"],
      },
      {
        title: "Model Inversion & Extraction Resistance",
        badge: "IP Protection",
        desc: "Assessing model APIs against extraction attempts, membership inference attacks, and reverse-engineering of proprietary weights or algorithms.",
        deliverables: ["API Rate-Limiting & Query Defense", "Model Stealing Risk Matrix", "Differential Privacy Audit", "Production Safeguard Plan"],
      },
      {
        title: "AI Governance, Bias & Ethical Compliance",
        badge: "Regulatory Readiness",
        desc: "Benchmarking enterprise AI systems against emerging statutory regulations, NIST AI Risk Management Framework, and ethical standards.",
        deliverables: ["AI Governance Audit Scorecard", "Bias & Hallucination Mitigation Plan", "Regulatory Compliance Pack", "AI Safety Attestation"],
      },
    ],
    lifecycle: [
      { step: "01", title: "Model Architecture Discovery", desc: "Cataloging model weights, RAG knowledge bases, vector embeddings, and API integration perimeters." },
      { step: "02", title: "Adversarial Red Team Probing", desc: "Executing automated and manual prompt injections, jailbreak vectors, and extraction attacks." },
      { step: "03", title: "Data Lineage & Privacy Verification", desc: "Auditing data ingestion pipelines for unauthorized PII retention and data leakage risks." },
      { step: "04", title: "Guardrail Engineering & Attestation", desc: "Deploying semantic input/output guardrails and issuing an official AI Security Assessment Report." },
    ],
    deliverables: [
      "AI & LLM Security Assessment Deep-Dive Report",
      "Adversarial Prompt Injection & Guardrail Bypass Logs",
      "RAG & Training Data Privacy Compliance Audit",
      "Official Certificate of AI System Security Assurance",
    ],
  },
};

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  offensive: <Crosshair size={24} weight="duotone" />,
  defensive: <ShieldCheck size={24} weight="duotone" />,
  grc: <Scales size={24} weight="duotone" />,
  dpdp: <LockKey size={24} weight="duotone" />,
  training: <GraduationCap size={24} weight="duotone" />,
  ai: <Cpu size={24} weight="duotone" />,
};

export default function Capabilities() {
  const { hash } = useLocation();
  const navigate = useNavigate();

  // Normalize active tab: if hash matches a service ID, show that service. Default to "offensive" or "all"
  const cleanHash = hash ? hash.replace("#", "") : "";
  const initialService = SERVICES_DEEP_DIVE[cleanHash] ? cleanHash : "offensive";

  const [activeServiceId, setActiveServiceId] = useState<string>(initialService);

  // Sync state when hash changes in URL
  useEffect(() => {
    if (cleanHash && SERVICES_DEEP_DIVE[cleanHash]) {
      setActiveServiceId(cleanHash);
      const target = document.getElementById("service-hub");
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    } else if (cleanHash === "all" || cleanHash === "services-grid") {
      setActiveServiceId("all");
    }
  }, [cleanHash]);

  const handleTabChange = (serviceId: string) => {
    setActiveServiceId(serviceId);
    navigate(`/capabilities#${serviceId}`, { replace: true });
    const target = document.getElementById("service-hub");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const activeService = SERVICES_DEEP_DIVE[activeServiceId] || SERVICES_DEEP_DIVE["offensive"];

  return (
    <div className="min-h-screen bg-white dark:bg-[#090a10] text-slate-900 dark:text-white transition-colors duration-200">
      {/* ------------------------------------------------------------ */}
      {/* SECTION 1 — SERVICES HERO                                     */}
      {/* ------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-[#150a2e] text-white pt-28 pb-14 sm:pt-36 sm:pb-16 lg:pt-38 lg:pb-18 dark:bg-[#0c061e] transition-colors duration-200 border-b border-violet-900/30">
        <div className="pointer-events-none absolute -top-40 right-1/4 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-[#c084fc]/25 via-[#818cf8]/15 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full bg-[#581c87]/20 blur-3xl" />

        <div className={WRAP}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-4 py-1.5 text-xs font-semibold text-[#c4b5fd] shadow-xs backdrop-blur-md">
              <Sparkle size={14} weight="fill" className="text-[#a78bfa]" />
              <span className="font-mono text-[10.5px] sm:text-[11.5px] uppercase tracking-wider">
                COMPREHENSIVE CYBER SECURITY CAPABILITIES
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[52px] leading-[1.12]">
              Engineered for Resilience.{" "}
              <span className="bg-gradient-to-r from-violet-300 via-sky-300 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(56,189,248,0.25)]">
                Proven Under Fire.
              </span>
            </h1>

            <p className="mt-3.5 max-w-2xl text-sm sm:text-base leading-relaxed text-[#d8cefa]">
              Select any capability discipline below to explore our deep technical scope, testing methodologies,
              and executive deliverables engineered to defend modern enterprises.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6 border-t border-white/15 pt-6">
            {[
              { stat: "100%", label: "Framework Aligned", sub: "DPDP, ISO 27001, SOC 2, SEBI" },
              { stat: "500+", label: "Assessments Delivered", sub: "Enterprise & regulated clients" },
              { stat: "24/7", label: "Operational Readiness", sub: "Adversary triage & response" },
              { stat: "0-Trust", label: "Adversary-Grade Rigor", sub: "Continuous posture validation" },
            ].map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl font-extrabold text-[#c4b5fd]">
                  {m.stat}
                </span>
                <span className="mt-0.5 text-xs sm:text-sm font-bold text-white">
                  {m.label}
                </span>
                <span className="text-[11px] text-[#d8cefa]">
                  {m.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* SECTION 2 — INTERACTIVE SERVICE SWITCHER & DEEP DIVE HUB     */}
      {/* ------------------------------------------------------------ */}
      <section id="service-hub" className="scroll-mt-20 py-10 sm:py-14 lg:py-16 bg-slate-50/70 dark:bg-[#070611] transition-colors duration-200">
        <div className={WRAP}>
          {/* Service Filter Tabs Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 lg:mb-12">
            {[
              { id: "offensive", label: "Offensive Security", icon: <Crosshair size={18} weight="bold" /> },
              { id: "defensive", label: "Defensive Security", icon: <ShieldCheck size={18} weight="bold" /> },
              { id: "grc", label: "GRC Solutions", icon: <Scales size={18} weight="bold" /> },
              { id: "dpdp", label: "DPDP Consulting", icon: <LockKey size={18} weight="bold" /> },
              { id: "training", label: "Training & MRA", icon: <GraduationCap size={18} weight="bold" /> },
              { id: "ai", label: "AI Audits", icon: <Cpu size={18} weight="bold" /> },
              { id: "all", label: "All 6 Overview", icon: <Target size={18} weight="bold" /> },
            ].map((tab) => {
              const isActive = activeServiceId === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600 to-[#7c3aed] text-white shadow-[0_4px_20px_rgba(124,58,237,0.35)] scale-105 ring-2 ring-violet-400/50"
                      : "bg-white text-slate-700 border border-slate-200/80 shadow-xs hover:border-violet-300 hover:text-[#6d28d9] dark:bg-[#131024] dark:border-white/10 dark:text-slate-300 dark:hover:text-white dark:hover:border-violet-500/50"
                  }`}
                >
                  <span className={isActive ? "text-[#B4FF00]" : "text-violet-500 dark:text-violet-400"}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ============================================================ */}
          {/* VIEW A: DEDICATED SINGLE SERVICE DEEP DIVE                   */}
          {/* ============================================================ */}
          {activeServiceId !== "all" && (
            <div className="space-y-12 lg:space-y-16">
              {/* 1. Service Hero Showcase Card */}
              <div className="relative overflow-hidden rounded-3xl border border-violet-900/50 bg-gradient-to-b from-[#180e36] via-[#130a2b] to-[#0d061e] p-6 sm:p-8 lg:p-10 text-white shadow-2xl">
                {/* Ambient glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
                />

                <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/15 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#c4b5fd]">
                      <span className="h-2 w-2 rounded-full bg-[#B4FF00] animate-pulse" />
                      Pillar #{activeService.n} &mdash; {activeService.promise}
                    </div>

                    <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                      {activeService.title}:{" "}
                      <span className="text-[#B4FF00]">{activeService.tagline}</span>
                    </h2>

                    <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#d8cefa] max-w-3xl">
                      {activeService.summary}
                    </p>

                    {/* Mapped Standards Chips */}
                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-slate-400 mr-1">
                        Frameworks:
                      </span>
                      {activeService.frameworks.map((fw) => (
                        <span
                          key={fw}
                          className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 font-mono text-[11px] font-semibold text-violet-200 backdrop-blur-xs"
                        >
                          {fw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Service Stats Card */}
                  <div className="lg:col-span-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 backdrop-blur-md">
                    <span className="font-mono text-xs font-bold text-violet-300 uppercase tracking-wider">
                      Assurance Benchmarks
                    </span>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {activeService.metrics.map((m) => (
                        <div key={m.label} className="flex flex-col">
                          <span className="font-display text-2xl font-extrabold text-[#B4FF00]">
                            {m.value}
                          </span>
                          <span className="text-xs font-medium text-[#d8cefa] mt-0.5">
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10">
                      <Btn
                        to="/contact"
                        variant="solid"
                        className="w-full text-center justify-center text-xs sm:text-sm py-2.5 font-bold shadow-md hover:scale-105 transition-all"
                      >
                        Request {activeService.title} Scope
                      </Btn>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Detailed Sub-Services Grid */}
              <div>
                <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                  <div>
                    <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#6d28d9] dark:text-[#a78bfa]">
                      COMPREHENSIVE OFFERINGS
                    </div>
                    <h3 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                      What We Deliver Under {activeService.title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-slate-500">
                    {activeService.subServices.length} Specialized Disciplines
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {activeService.subServices.map((sub, idx) => (
                    <div
                      key={sub.title}
                      className="group relative flex flex-col justify-between rounded-2xl border border-violet-900/50 bg-gradient-to-b from-[#1e1342] via-[#170e36] to-[#12082b] p-6 text-white shadow-xl transition-all duration-300 hover:border-[#B4FF00]/80 hover:shadow-[0_14px_36px_rgba(180,255,0,0.22)] hover:-translate-y-1"
                    >
                      {/* Top Green Ray */}
                      <div className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#B4FF00] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-bold text-violet-300 group-hover:text-[#B4FF00] transition-colors">
                            0{idx + 1}
                          </span>
                          <span className="rounded-full border border-violet-400/30 bg-violet-500/15 px-2.5 py-0.5 font-mono text-[10.5px] font-semibold text-violet-200">
                            {sub.badge}
                          </span>
                        </div>

                        <h4 className="mt-3.5 font-display text-lg font-bold text-white group-hover:text-[#B4FF00] transition-colors leading-snug">
                          {sub.title}
                        </h4>

                        <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-[#d8cefa]">
                          {sub.desc}
                        </p>

                        {/* Deliverables List */}
                        <div className="mt-4 pt-3.5 border-t border-white/10">
                          <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-violet-300 mb-2">
                            Key Deliverables
                          </div>
                          <ul className="space-y-1.5 text-xs text-[#e2d9f3]">
                            {sub.deliverables.map((deliv) => (
                              <li key={deliv} className="flex items-start gap-2">
                                <CheckCircle size={14} weight="fill" className="mt-0.5 shrink-0 text-[#B4FF00]" />
                                <span className="leading-snug">{deliv}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 pt-3.5 border-t border-white/10 flex items-center justify-between">
                        <span className="font-mono text-[10.5px] uppercase tracking-wider text-violet-300 font-semibold group-hover:text-[#B4FF00] transition-colors">
                          Audit Ready
                        </span>
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#c4b5fd] group-hover:text-[#B4FF00] group-hover:translate-x-1 transition-all"
                        >
                          <span>Request Scope</span>
                          <ArrowRight size={12} weight="bold" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Four-Phase Delivery Lifecycle */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 dark:border-white/10 dark:bg-[#131024] shadow-sm">
                <div className="max-w-2xl">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#6d28d9] dark:text-[#a78bfa]">
                    DELIVERY METHODOLOGY
                  </span>
                  <h3 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    Our 4-Phase {activeService.title} Execution Model
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    A closed-loop execution lifecycle ensuring complete technical rigor, zero operational disruption, and transparent verification.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {activeService.lifecycle.map((step) => (
                    <div
                      key={step.step}
                      className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 dark:border-white/10 dark:bg-white/[0.03] transition-colors hover:border-violet-400"
                    >
                      <div>
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white font-mono text-sm font-bold shadow-sm">
                          {step.step}
                        </span>
                        <h4 className="mt-4 font-display text-base font-bold text-slate-900 dark:text-white">
                          {step.title}
                        </h4>
                        <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Executive Deliverables & Consultation Banner */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
                <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-[#131024] shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#6d28d9] dark:text-[#a78bfa]">
                      WHAT YOU RECEIVE
                    </span>
                    <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      Executive Artifacts &amp; Documentation
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      Every engagement delivers actionable, board-ready, and developer-verified outputs.
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {activeService.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                          <CheckCircle size={17} weight="fill" className="shrink-0 text-[#6d28d9] dark:text-[#a78bfa]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-3xl border border-violet-900/50 bg-gradient-to-br from-[#1b0f38] via-[#140a2c] to-[#0d061e] p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B4FF00]">
                      DIRECT ADVISORY ONBOARDING
                    </span>
                    <h3 className="mt-2 font-display text-xl sm:text-2xl font-extrabold leading-snug">
                      Ready to Engage Our {activeService.title} Specialists?
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#d8cefa]">
                      Schedule a technical scoping session with our certified leads. We evaluate your scope and provide a formal statement of work within 48 hours.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <Btn
                      to="/contact"
                      variant="solid"
                      className="w-full text-center justify-center text-xs sm:text-sm py-3 font-bold shadow-lg hover:scale-105 transition-all"
                    >
                      Book a Scoping Session &rarr;
                    </Btn>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* VIEW B: ALL 6 SERVICES OVERVIEW GRID                         */}
          {/* ============================================================ */}
          {activeServiceId === "all" && (
            <div>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-8 border-b border-slate-200/80 dark:border-white/10 mb-10">
                <div>
                  <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#6d28d9] dark:text-[#a78bfa]">
                    ALL 6 CORE DISCIPLINES
                  </div>
                  <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0d1020] dark:text-white sm:text-4xl">
                    The Six Pillars of Envista Defence
                  </h2>
                </div>
                <p className="max-w-md text-xs sm:text-sm text-[#575f75] dark:text-slate-400 leading-relaxed">
                  Click any service below to open its dedicated deep-dive hub with full offering breakdown and methodology.
                </p>
              </div>

              <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {Object.values(SERVICES_DEEP_DIVE).map((c) => (
                  <article
                    key={c.id}
                    onClick={() => handleTabChange(c.id)}
                    className="group relative flex flex-col justify-between rounded-3xl border border-violet-900/50 bg-gradient-to-b from-[#1e1342] via-[#170e36] to-[#12082b] p-6 sm:p-7 text-white shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#B4FF00]/80 hover:shadow-[0_16px_40px_rgba(180,255,0,0.22)] cursor-pointer overflow-hidden"
                  >
                    <div className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#B4FF00] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/20 text-[#c4b5fd] group-hover:bg-[#B4FF00] group-hover:text-[#0c061e] transition-colors shadow-xs">
                          {SERVICE_ICONS[c.id] || <ShieldCheck size={24} weight="duotone" />}
                        </div>
                        <span className="font-mono text-xs font-extrabold text-violet-300 group-hover:text-[#B4FF00]">
                          #{c.n}
                        </span>
                      </div>

                      <h3 className="mt-4 font-display text-xl font-bold text-white group-hover:text-[#B4FF00] transition-colors">
                        {c.title}
                      </h3>

                      <div className="mt-1.5 inline-block rounded-full bg-violet-500/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#c4b5fd] uppercase tracking-wider">
                        {c.promise}
                      </div>

                      <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-[#d8cefa]">
                        {c.summary}
                      </p>

                      <div className="mt-4 border-t border-white/10 pt-3">
                        <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-violet-300 mb-2">
                          Specialized Offerings
                        </div>
                        <ul className="space-y-1.5 text-xs text-[#e2d9f3]">
                          {c.subServices.slice(0, 4).map((sub) => (
                            <li key={sub.title} className="flex items-start gap-2">
                              <CheckCircle size={14} weight="fill" className="mt-0.5 shrink-0 text-[#B4FF00]" />
                              <span className="leading-snug">{sub.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-3.5 flex items-center justify-between">
                      <span className="font-mono text-[11px] font-semibold text-violet-300">
                        {c.subServices.length} Offerings
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#B4FF00] group-hover:translate-x-1 transition-transform">
                        <span>Explore Deep Dive</span>
                        <ArrowRight size={12} weight="bold" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* SECTION 3 — HIGH-IMPACT CLOSING CTA BAND                     */}
      {/* ------------------------------------------------------------ */}
      <CtaBand />
    </div>
  );
}
