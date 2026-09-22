import React, { useState } from "react";
import { Link } from "react-router";
import { Reveal, RevealText } from "../components/ui";
import { CtaBand } from "./Home";

const WRAP = "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8";

interface PhaseDetail {
  num: string;
  phase: string;
  tagline: string;
  description: string;
  objectives: string[];
  deliverables: string[];
  capabilities: string[];
}

const METHODOLOGY_PHASES: PhaseDetail[] = [
  {
    num: "01",
    phase: "Assess & Discover",
    tagline: "Total Attack Surface Visibility & Risk Baseline",
    description:
      "We evaluate your current security posture, digital assets, data practices, and regulatory compliance gaps. By analyzing your external perimeter through the lens of a real adversary, we uncover exposed assets, cloud drift, and shadow IT before they become attack vectors.",
    objectives: [
      "Autonomous CIDR & Netblock Discovery across cloud, on-prem, and colocation infrastructure.",
      "Comprehensive inventory of web applications, APIs, mobile services, and remote services.",
      "Data classification and sensitive data flow mapping for DPDP Act 2023 compliance.",
      "External attack surface reconnaissance identifying unauthorized subdomains and stale certificates.",
    ],
    deliverables: [
      "Digital Asset Inventory & Attack Surface Dossier",
      "Regulatory Gap Matrix (DPDP Act, ISO 27001, CERT-In)",
      "Vulnerability Baseline & Threat Profile",
    ],
    capabilities: [
      "Shadow IT Detection",
      "External Perimeter Profiling",
      "Data Flow Auditing",
      "Cloud Asset Inventory",
    ],
  },
  {
    num: "02",
    phase: "Design & Build",
    tagline: "Tailored Architecture, Hardening & Multi-Framework Alignment",
    description:
      "Our cyber specialists craft a customized defense architecture and governance framework aligned with your industry's threat landscape. We prioritize vulnerabilities by exploitability and business blast radius, engineering institutional safeguards rather than generic checklists.",
    objectives: [
      "Architect Zero Trust network segmentation, identity perimeters, and access controls.",
      "Develop actionable remediation playbooks with engineering teams to neutralize weaponizable flaws.",
      "Map technical and administrative controls to ISO 27001, SOC 2, NIST CSF, and RBI guidelines.",
      "Implement automated consent frameworks, retention policies, and Data Protection Impact Assessments (DPIA).",
    ],
    deliverables: [
      "Tailored Cyber Defense Architecture Blueprint",
      "Remediation & Blast Radius Mitigation Roadmap",
      "Institutional Compliance & Policy Frameworks",
    ],
    capabilities: [
      "Zero Trust Engineering",
      "GRC Control Design",
      "Blast Radius Containment",
      "AI & Data Governance",
    ],
  },
  {
    num: "03",
    phase: "Execute & Monitor",
    tagline: "Continuous Telemetry, Adversary Validation & Resilient Posture",
    description:
      "We deploy, optimize, and continuously monitor your security posture for lasting resilience. Through 24/7 proactive telemetry, red team adversary emulation, and dark web intelligence, we ensure your defenses adapt as threat actor tactics and regulatory mandates evolve.",
    objectives: [
      "24/7 Managed Threat Telemetry, SIEM/SOC event correlation, and instant critical alerting.",
      "Active exploit validation and adversary emulation to test defense effectiveness under live conditions.",
      "Continuous dark web monitoring for stolen corporate credentials, brand abuse, and data leaks.",
      "Rapid breach triage, incident response containment, and post-incident digital forensics.",
    ],
    deliverables: [
      "Executive Board Security Scorecard & Risk Heatmap",
      "Attestation Letter & Verification Re-Test Report",
      "24/7 Threat Intelligence & Monitoring Dashboards",
    ],
    capabilities: [
      "Managed Detection & Response",
      "Continuous Red Teaming",
      "Dark Web Intelligence",
      "Incident Response & Forensics",
    ],
  },
];

const CORE_PILLARS = [
  {
    category: "Offensive Security",
    title: "Test Your Defences",
    desc: "Rigorous adversary emulation to uncover vulnerabilities before threat actors exploit them.",
    accent: "from-rose-500/20 to-violet-500/10",
    border: "border-rose-500/30",
    tagColor: "text-rose-400 bg-rose-950/60 border-rose-500/40",
    icon: (
      <svg className="h-6 w-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    items: [
      "Full-scope Red Teaming & Attack Simulation",
      "Web, API & Mobile Application Penetration Testing",
      "Cloud Infrastructure & Multi-Tenant Isolation Testing",
      "Active Exploit Weaponization & Blast Radius Proofs",
    ],
  },
  {
    category: "Defensive Engineering",
    title: "Secure Your Systems",
    desc: "Round-the-clock defense architecture, incident containment, and continuous monitoring.",
    accent: "from-violet-500/20 to-purple-500/10",
    border: "border-violet-500/30",
    tagColor: "text-violet-400 bg-violet-950/60 border-violet-500/40",
    icon: (
      <svg className="h-6 w-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    items: [
      "24/7 Live Threat Monitoring & Immediate Alerting",
      "Rapid Breach Investigation & Forensic Recovery",
      "Brand Reputation & Dark Web Intelligence (BRM/DWM)",
      "Managed Detection & SOC Infrastructure Engineering",
    ],
  },
  {
    category: "GRC & Governance",
    title: "Comply with Confidence",
    desc: "Multi-framework regulatory alignment and sovereign data protection compliance.",
    accent: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-500/30",
    tagColor: "text-cyan-400 bg-cyan-950/60 border-cyan-500/40",
    icon: (
      <svg className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    items: [
      "DPDP Act 2023 Gap Assessments & Virtual DPO",
      "ISO 27001:2022 Certification & Audit Advisory",
      "CERT-In Cybersecurity Guidelines Compliance",
      "SEBI CSCRF, SOC 2 & Third-Party Risk Management",
    ],
  },
  {
    category: "AI Audits & Privacy",
    title: "Secure Your AI Systems",
    desc: "Rigorous security scrutiny for artificial intelligence models, algorithms, and training pipelines.",
    accent: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/30",
    tagColor: "text-emerald-400 bg-emerald-950/60 border-emerald-500/40",
    icon: (
      <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    items: [
      "AI System Architecture Audits & Risk Validation",
      "Ethical Model Scrutiny, Data Lineage & Integrity",
      "Model Inversion & Prompt Injection Defense",
      "Workforce Data Privacy & Cyber Awareness Training",
    ],
  },
];

const COMPARISON_POINTS = [
  {
    dimension: "Security Approach",
    traditional: "Generic, one-size-fits-all checklist",
    envista: "Tailored cybersecurity engineered for your specific industry & threat surface",
  },
  {
    dimension: "Threat Posture",
    traditional: "Reactive — acts only after a breach or compromise occurs",
    envista: "Proactive — continuous adversary emulation preventing breaches before weaponization",
  },
  {
    dimension: "Regulatory Coverage",
    traditional: "Limited single-framework compliance reports",
    envista: "6+ frameworks covered simultaneously (DPDP Act, ISO 27001, CERT-In, SOC 2, NIST, RBI)",
  },
  {
    dimension: "Data Protection",
    traditional: "Ad hoc legal advisory with no technical verification",
    envista: "Dedicated cyber directors & technical Data Protection Officer (vDPO) governance",
  },
  {
    dimension: "Mobilization Speed",
    traditional: "Slow onboarding with 4-6 week ramp-up periods",
    envista: "Vetted, certified cybersecurity specialists deployed within 48 hours",
  },
  {
    dimension: "Long-Term Engagement",
    traditional: "One-off PDF reports with no follow-up hardening",
    envista: "Closed-loop lifecycle with verification re-testing and 24/7 security operations",
  },
];

const AUDITABLE_MILESTONES = [
  {
    step: "Milestone 01",
    name: "Discovery Dossier & Threat Scope",
    desc: "Full attack surface catalog, external IP footprint, shadow IT mapping, and initial vulnerability vector analysis.",
    badge: "Days 1–7",
  },
  {
    step: "Milestone 02",
    name: "Adversary Emulation & Exploitation Proofs",
    desc: "Authorized penetration testing with verified, evidence-backed proof-of-concept exploits showing exact attack paths.",
    badge: "Days 8–18",
  },
  {
    step: "Milestone 03",
    name: "Executive Scorecard & Engineering Roadmap",
    desc: "C-suite strategic risk heatmaps, prioritized remediation tickets, and compliance gap analysis for engineering teams.",
    badge: "Days 19–24",
  },
  {
    step: "Milestone 04",
    name: "Verification Re-Testing & Sovereign Attestation",
    desc: "Comprehensive re-validation of all patched vulnerabilities, accompanied by an official Sovereign Attestation Letter.",
    badge: "Days 25–30",
  },
];

export default function Methodology() {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const activePhase = METHODOLOGY_PHASES[activePhaseIndex];

  return (
    <div className="relative overflow-hidden bg-[#150a2e] text-white">
      {/* Background Ambient Violet Nebulae */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 h-[700px] w-[700px] rounded-full opacity-35 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #a855f7 0%, #7c3aed 45%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-40 h-[600px] w-[600px] rounded-full opacity-25 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #38bdf8 0%, #9333ea 50%, transparent 70%)",
        }}
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                          */}
      {/* ========================================================================= */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
        <div className={WRAP}>
          <div className="max-w-4xl">
            {/* Breadcrumb Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-950/40 px-3.5 py-1 text-xs font-semibold text-[#d8b4fe] shadow-xs backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c084fc] animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-wider">
                Envista Closed-Loop Methodology
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              <RevealText text="Security That Sees Beyond The Obvious" stagger={40} />
            </h1>

            {/* Subheading */}
            <Reveal delay={150}>
              <p className="mt-5 max-w-3xl text-base sm:text-lg leading-relaxed text-[#d8cefa]">
                Built on deep technical expertise, institutional integrity, and compliance-first thinking, Envista Cyber Defence delivers an auditable, closed-loop methodology. We transform attack surface exposure into sovereign cyber resilience for enterprises, governments, and regulated institutions.
              </p>
            </Reveal>

            {/* SLA Trust Badges */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {[
                { top: "48 Hours", bottom: "Specialist Deployment" },
                { top: "6+ Frameworks", bottom: "DPDP, ISO & CERT-In" },
                { top: "Closed Loop", bottom: "Discover → Sustain" },
                { top: "24/7 Operations", bottom: "Continuous Telemetry" },
              ].map((badge) => (
                <div
                  key={badge.top}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center backdrop-blur-md transition-all hover:border-violet-400/40 hover:bg-white/[0.07]"
                >
                  <div className="font-display text-lg sm:text-xl font-black text-white">
                    {badge.top}
                  </div>
                  <div className="mt-1 font-mono text-[10.5px] uppercase tracking-wider text-[#c4b5fd]">
                    {badge.bottom}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE 3-STAGE CLOSED-LOOP PROCESS                                       */}
      {/* ========================================================================= */}
      <section className="relative border-t border-white/10 py-16 sm:py-20 lg:py-24 bg-[#0e0622]/90">
        <div className={WRAP}>
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-violet-400 font-semibold">
              Our Process for Cyber-Driven Protection
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              A Defensible Three-Phase Lifecycle
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#d8cefa] leading-relaxed">
              Every engagement executes this precise, auditable sequence — ensuring your protection is measurable, evidenced, and defensible, never ad hoc.
            </p>
          </div>

          {/* Phase Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {METHODOLOGY_PHASES.map((p, idx) => {
              const isCurrent = activePhaseIndex === idx;
              return (
                <button
                  key={p.num}
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`inline-flex items-center gap-3 rounded-2xl px-5 sm:px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isCurrent
                      ? "bg-violet-600 text-white border border-violet-300 shadow-[0_0_25px_rgba(168,85,247,0.5)] scale-105"
                      : "bg-white/[0.05] text-slate-300 border border-white/10 hover:bg-white/[0.1] hover:text-white"
                  }`}
                >
                  <span className="font-mono opacity-60 text-xs">{p.num}</span>
                  <span>{p.phase}</span>
                </button>
              );
            })}
          </div>

          {/* Active Phase Deep Dive Card */}
          <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-6 sm:p-8 lg:p-12 backdrop-blur-2xl shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Phase Identity & Description */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-3xl sm:text-4xl font-black text-violet-400">
                      {activePhase.num}
                    </span>
                    <div className="h-6 w-px bg-white/20" />
                    <span className="font-mono text-xs uppercase tracking-widest text-[#c4b5fd] font-semibold">
                      Phase {activePhase.num} of 03
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                    {activePhase.phase}
                  </h3>

                  <p className="mt-2 text-sm sm:text-base font-semibold text-violet-300">
                    {activePhase.tagline}
                  </p>

                  <p className="mt-4 text-xs sm:text-sm sm:leading-relaxed text-[#d8cefa]">
                    {activePhase.description}
                  </p>
                </div>

                {/* Capability Tags */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                    Core Technical Capabilities
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activePhase.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="rounded-lg border border-violet-400/30 bg-violet-950/50 px-3 py-1 text-xs font-mono text-[#d8b4fe]"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Execution Objectives & Tangible Deliverables */}
              <div className="lg:col-span-6 space-y-6">
                {/* Objectives Card */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                  <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-white">
                    <span className="h-2 w-2 rounded-full bg-violet-400" />
                    Execution Objectives
                  </h4>
                  <ul className="mt-4 space-y-2.5">
                    {activePhase.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#d8cefa]">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c084fc]" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables Card */}
                <div className="rounded-2xl border border-cyan-400/25 bg-cyan-950/20 p-5 sm:p-6">
                  <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
                    <svg className="h-4 w-4 fill-current text-cyan-400" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z" />
                    </svg>
                    Key Deliverables
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {activePhase.deliverables.map((deliv, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-200">
                        <span className="text-cyan-400">&bull;</span>
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FOUR CORE CAPABILITY PILLARS (OFFENSIVE, DEFENSIVE, GRC, AI)          */}
      {/* ========================================================================= */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-[#150a2e]">
        <div className={WRAP}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-violet-400 font-semibold">
              End-to-End Capabilities
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Four Specialized Cyber Domains
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#d8cefa] leading-relaxed">
              ENVISTA is equipped with cross-disciplinary cybersecurity capabilities designed to proactively test, fortify, govern, and audit your digital infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {CORE_PILLARS.map((pillar, idx) => (
              <Reveal key={pillar.category} delay={idx * 100}>
                <div
                  className={`group relative flex flex-col justify-between rounded-3xl border ${pillar.border} bg-white/[0.04] p-6 sm:p-8 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07] hover:shadow-[0_20px_40px_rgba(124,58,237,0.25)]`}
                >
                  <div>
                    {/* Header with Icon & Category Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] shadow-inner">
                        {pillar.icon}
                      </div>
                      <span
                        className={`rounded-full border px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-wider ${pillar.tagColor}`}
                      >
                        {pillar.category}
                      </span>
                    </div>

                    {/* Pillar Title & Tagline */}
                    <h3 className="mt-6 font-display text-xl sm:text-2xl font-extrabold text-white group-hover:text-violet-200 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#d8cefa] leading-relaxed">
                      {pillar.desc}
                    </p>

                    {/* Scope Items */}
                    <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                      {pillar.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Learn More Link */}
                  <div className="mt-8 pt-4">
                    <Link
                      to="/capabilities"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-300 hover:text-white transition-colors"
                    >
                      <span>Explore {pillar.category} Capabilities</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. COMPARISON: ENVISTA VS TRADITIONAL SECURITY                            */}
      {/* ========================================================================= */}
      <section className="relative border-t border-white/10 py-16 sm:py-20 lg:py-24 bg-[#0d051f]">
        <div className={WRAP}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-violet-400 font-semibold">
              The Proven Difference
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Why Forward-Thinking Enterprises Choose ENVISTA
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#d8cefa] leading-relaxed">
              See how our proactive, compliance-first methodology contrasts with legacy, checklist-driven security practices.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-xl shadow-2xl">
            <div className="divide-y divide-white/10">
              {/* Table Header */}
              <div className="grid grid-cols-1 md:grid-cols-12 bg-white/[0.04] p-5 sm:p-6 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                <div className="md:col-span-3 text-violet-300">Evaluation Dimension</div>
                <div className="hidden md:block md:col-span-4 text-slate-400">Traditional Security Firms</div>
                <div className="hidden md:block md:col-span-5 text-emerald-300">Envista Cyber Defence</div>
              </div>

              {/* Rows */}
              {COMPARISON_POINTS.map((row, idx) => (
                <div
                  key={row.dimension}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 p-5 sm:p-6 transition-colors hover:bg-white/[0.04]"
                >
                  <div className="md:col-span-3 font-display text-sm font-bold text-white flex items-center">
                    {row.dimension}
                  </div>

                  <div className="md:col-span-4 text-xs sm:text-sm text-slate-400 flex items-start gap-2">
                    <span className="text-rose-400 font-bold shrink-0">&times;</span>
                    <span>{row.traditional}</span>
                  </div>

                  <div className="md:col-span-5 text-xs sm:text-sm text-emerald-200 flex items-start gap-2 font-medium">
                    <span className="text-emerald-400 font-bold shrink-0">&#10003;</span>
                    <span>{row.envista}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. AUDITABLE DELIVERY MILESTONES & TIMELINE                               */}
      {/* ========================================================================= */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-[#150a2e]">
        <div className={WRAP}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-violet-400 font-semibold">
              Predictable Execution
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Standard 30-Day Delivery Milestones
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#d8cefa] leading-relaxed">
              Every phase yields verifiable, engineering-grade outputs that satisfy technical teams and executive audit committees alike.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AUDITABLE_MILESTONES.map((milestone) => (
              <div
                key={milestone.step}
                className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 sm:p-7 backdrop-blur-md transition-all hover:border-violet-400/40 hover:-translate-y-1 hover:bg-white/[0.07]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#c4b5fd] font-semibold">
                    {milestone.step}
                  </span>
                  <span className="rounded-md border border-violet-400/30 bg-violet-950/60 px-2 py-0.5 font-mono text-[10px] font-bold text-violet-300">
                    {milestone.badge}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-white">
                  {milestone.name}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[#d8cefa] leading-relaxed">
                  {milestone.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. 24/7 SECURITY OPERATIONS ADVISORY                                      */}
      {/* ========================================================================= */}
      <section className="relative border-t border-white/10 py-16 sm:py-20 bg-[#0c051d]">
        <div className={WRAP}>
          <div className="rounded-3xl border border-violet-500/30 bg-gradient-to-r from-violet-950/50 via-purple-950/40 to-[#0e0622] p-8 sm:p-12 backdrop-blur-2xl shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="rounded-full border border-violet-400/40 bg-violet-950/70 px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#d8b4fe]">
                  24/7 Security Operations
                </span>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold text-white">
                  When You Need Us Most — We Are There.
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#d8cefa] leading-relaxed max-w-2xl">
                  ENVISTA provides round-the-clock defense so your organization is never left exposed. Our vetted cyber directors and incident response leads are on standby 24/7 to triage threats, contain breaches, and preserve operational continuity.
                </p>

                <div className="mt-6 flex flex-wrap gap-6 text-xs sm:text-sm font-semibold text-white">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Fast Threat Responses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-violet-400" />
                    <span>Dedicated Directors & CISOs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span>Continuous Posture Elevation</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] cursor-pointer text-center"
                >
                  <span>Book Methodology Briefing</span>
                  <span>&rarr;</span>
                </Link>

                <Link
                  to="/capabilities"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-6 py-3.5 text-xs sm:text-sm font-medium tracking-wide text-slate-200 transition-all hover:bg-white/10 hover:text-white text-center"
                >
                  <span>View All Capabilities</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Closing CTA Band */}
      <CtaBand />
    </div>
  );
}
