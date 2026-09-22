import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Broadcast,
  CaretDown,
  Check,
  CheckCircle,
  Clock,
  Cpu,
  Database,
  Eye,
  Globe,
  Lock,
  MagnifyingGlass,
  Plus,
  Minus,
  Shield,
  ShieldCheck,
  ShieldWarning,
  Sparkle,
  TrendUp,
  UserCheck,
  Users,
  WarningCircle,
  X,
} from "@phosphor-icons/react";
import { Btn, Eyebrow, Reveal, RevealText } from "../components/ui";
import { CtaBand } from "./Home";

const WRAP = "mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8";

/* ---------------------------------------------------------------- */
/* Animated Threat Radar & Telemetry Graph Graphic (Hero Component) */
/* ---------------------------------------------------------------- */
function ThreatTelemetryRadar() {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const threats = [
    { id: 1, label: "Spoofed Domain", source: "Typo-squatting", risk: "CRITICAL", x: 68, y: 28, delay: "0s" },
    { id: 2, label: "Corporate Credentials", source: "Tor Breach Forum", risk: "HIGH", x: 30, y: 35, delay: "1.2s" },
    { id: 3, label: "API Key Leak", source: "Public GitHub Repo", risk: "HIGH", x: 74, y: 72, delay: "2.4s" },
    { id: 4, label: "VIP Executive Mention", source: "Encrypted Telegram", risk: "MEDIUM", x: 26, y: 68, delay: "0.8s" },
    { id: 5, label: "Third-Party Data Exposure", source: "Underground Paste", risk: "CRITICAL", x: 50, y: 18, delay: "1.8s" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[540px] select-none">
      {/* Outer ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-3xl opacity-50 blur-2xl dark:opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(109,40,217,0.3) 0%, rgba(151,38,182,0.15) 50%, transparent 70%)",
        }}
      />

      {/* Main Terminal Shell */}
      <div className="relative overflow-hidden rounded-2xl border border-[#3c2478]/40 bg-gradient-to-br from-[#150c2e] via-[#1c113b] to-[#120a26] p-5 shadow-[0_20px_50px_rgba(21,12,46,0.35)] text-white">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-[#3c2478]/50 pb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#d9ceea]">
              LIVE RECON TELEMETRY
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded bg-[#2c1a59] px-2 py-0.5 font-mono text-[10px] text-[#c4b5fd]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              TOR + DEEP WEB ACTIVE
            </span>
          </div>
        </div>

        {/* Radar Screen Area */}
        <div className="relative mt-4 aspect-square max-h-[340px] w-full rounded-xl border border-[#3c2478]/40 bg-[#0c061a] overflow-hidden flex items-center justify-center">
          {/* Radar Background Rings */}
          <div className="absolute h-[85%] w-[85%] rounded-full border border-violet-500/20" />
          <div className="absolute h-[62%] w-[62%] rounded-full border border-violet-500/25 border-dashed" />
          <div className="absolute h-[40%] w-[40%] rounded-full border border-violet-500/30" />
          <div className="absolute h-[18%] w-[18%] rounded-full border border-violet-500/40 bg-violet-600/10" />

          {/* Crosshairs */}
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-violet-500/15" />
          <div className="absolute inset-y-0 left-1/2 w-[1px] bg-violet-500/15" />

          {/* Rotating Radar Sweep Cone */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg at 50% 50%, rgba(139, 92, 246, 0.35) 0deg, rgba(139, 92, 246, 0) 65deg, transparent 360deg)",
              animation: "spin 6s linear infinite",
            }}
          />

          {/* Center Brand Shield Beacon */}
          <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#5b2ab8] shadow-[0_0_20px_rgba(139,92,246,0.6)]">
            <ShieldCheck size={22} weight="fill" className="text-white" />
          </div>

          {/* Radar Ring Range Labels */}
          <span className="absolute top-2 left-3 font-mono text-[9px] uppercase tracking-wider text-violet-400/60">
            Outer: Surface Web &amp; DNS
          </span>
          <span className="absolute bottom-2 right-3 font-mono text-[9px] uppercase tracking-wider text-violet-400/60">
            Inner: Tor Dark Markets &amp; Telegram
          </span>

          {/* Threat Nodes / Blips */}
          {threats.map((threat) => {
            const isSelected = activeNode === threat.id;
            return (
              <button
                key={threat.id}
                type="button"
                onClick={() => setActiveNode(isSelected ? null : threat.id)}
                className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
                aria-label={threat.label}
              >
                {/* Ping Pulse */}
                <span className="absolute -inset-2 rounded-full bg-rose-500/30 animate-ping" />
                {/* Threat Node Point */}
                <span
                  className={`relative flex h-3.5 w-3.5 items-center justify-center rounded-full border shadow-sm transition-transform group-hover:scale-125 ${
                    threat.risk === "CRITICAL"
                      ? "border-rose-400 bg-rose-600"
                      : threat.risk === "HIGH"
                        ? "border-amber-400 bg-amber-500"
                        : "border-violet-400 bg-violet-600"
                  }`}
                />

                {/* Threat Label Tooltip */}
                <div
                  className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 whitespace-nowrap rounded-md border border-[#3c2478] bg-[#1a0f35]/95 px-2.5 py-1 text-left shadow-lg backdrop-blur-sm transition-opacity duration-200 ${
                    isSelected ? "opacity-100 scale-100" : "opacity-0 pointer-events-none group-hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-mono text-[9px] font-bold uppercase ${
                        threat.risk === "CRITICAL" ? "text-rose-400" : "text-amber-400"
                      }`}
                    >
                      [{threat.risk}]
                    </span>
                    <span className="font-display text-[11px] font-semibold text-white">{threat.label}</span>
                  </div>
                  <div className="font-mono text-[9.5px] text-[#b5a9cc]">{threat.source}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Status Indicators Footer */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[#3c2478]/40 pt-3 text-center">
          <div className="rounded-lg bg-[#201242] p-2">
            <div className="font-display text-base font-bold text-emerald-400">99.4%</div>
            <div className="text-[10px] font-mono text-[#b5a9cc] uppercase">Takedown Efficacy</div>
          </div>
          <div className="rounded-lg bg-[#201242] p-2">
            <div className="font-display text-base font-bold text-white">&lt; 45 min</div>
            <div className="text-[10px] font-mono text-[#b5a9cc] uppercase">Detection to Alert</div>
          </div>
          <div className="rounded-lg bg-[#201242] p-2">
            <div className="font-display text-base font-bold text-violet-300">24/7/365</div>
            <div className="text-[10px] font-mono text-[#b5a9cc] uppercase">Active Ingestion</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* How It Works: Interactive End-to-End Pipeline Visualization      */
/* ---------------------------------------------------------------- */
function ProcessPipeline() {
  const steps = [
    {
      step: "01",
      title: "Surface & Dark Web Discovery",
      desc: "Continuous automated scanning across Tor onion sites, Telegram bot channels, pastebins, hacker forums, and public code repositories for your domain and brand assets.",
      icon: Globe,
      badge: "Infiltration Recon",
    },
    {
      step: "02",
      title: "AI Ingestion & De-Hashing",
      desc: "Raw threat data is normalized with NLP, machine learning, and de-hashing algorithms, correlating leaked passwords, employee emails, and compromised credentials.",
      icon: Cpu,
      badge: "Automated Correlation",
    },
    {
      step: "03",
      title: "Expert Analyst Triage",
      desc: "Human threat intelligence specialists validate every high-severity finding to eliminate false positives and contextualize real exposure risks to your infrastructure.",
      icon: UserCheck,
      badge: "Zero False Positives",
    },
    {
      step: "04",
      title: "Rapid Alerting & Takedowns",
      desc: "Immediate actionable telemetry delivered directly to your CISO and SOC. Automated takedown requests issued against phishing domains, rogue apps, and IP theft.",
      icon: ShieldCheck,
      badge: "Sub-Hour Resolution",
    },
  ];

  return (
    <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => {
        const Icon = s.icon;
        return (
          <div
            key={s.step}
            className="group relative flex flex-col justify-between rounded-2xl border border-[#e4dfef] bg-white p-7 shadow-[0_4px_20px_rgba(91,42,184,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#6d28d9] hover:shadow-[0_16px_36px_rgba(91,42,184,0.12)] dark:border-white/10 dark:bg-[#14182b]"
          >
            <div>
              {/* Step indicator and Icon */}
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-purple-600/10 text-[#6d28d9] transition-transform group-hover:scale-110 dark:bg-violet-500/20 dark:text-[#a78bfa]">
                  <Icon size={22} weight="bold" />
                </span>
                <span className="font-mono text-2xl font-bold text-[#b5a9cc] dark:text-violet-500/50">
                  {s.step}
                </span>
              </div>

              <div className="mt-4">
                <span className="inline-block rounded bg-[#f6eefb] px-2.5 py-0.5 font-mono text-[10.5px] font-semibold text-[#6d28d9] dark:bg-violet-950/40 dark:text-[#c4b5fd]">
                  {s.badge}
                </span>
              </div>

              <h3 className="mt-3 font-display text-lg font-bold text-[#150c2e] dark:text-white">
                {s.title}
              </h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-[#575f75] dark:text-slate-300">
                {s.desc}
              </p>
            </div>

            {/* Connecting hairline arrow for desktop */}
            {i < steps.length - 1 && (
              <div
                aria-hidden="true"
                className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 rounded-full border border-[#e4dfef] bg-white p-1 text-[#6d28d9] shadow-sm dark:border-white/10 dark:bg-[#14182b] dark:text-[#a78bfa]"
              >
                <ArrowRight size={12} weight="bold" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Plan Comparison Matrix Component                                 */
/* ---------------------------------------------------------------- */
function PlanComparisonMatrix() {
  const plans = [
    {
      name: "Silver",
      tier: "For MSMEs & Fast Startups",
      description: "Foundational exposure detection and dark web scanning for emerging enterprises.",
      recommended: false,
    },
    {
      name: "Gold",
      tier: "For Mid-Size Enterprises",
      description: "Comprehensive brand reputation monitoring with active 8x6 SOC triage and weekly threat alerts.",
      recommended: true,
    },
    {
      name: "Platinum",
      tier: "For Large & Regulated Institutions",
      description: "24x7 real-time monitoring, VIP executive coverage, custom feeds, and dedicated threat analysts.",
      recommended: false,
    },
  ];

  const features = [
    { name: "Dark Web Monitoring (DWM)", silver: true, gold: true, platinum: true },
    { name: "Attack Surface Monitoring (ASM)", silver: true, gold: true, platinum: true },
    { name: "Brand Reputation Monitoring (BRM)", silver: true, gold: true, platinum: true },
    { name: "Executive & VIP Credential Protection", silver: false, gold: true, platinum: true },
    { name: "Real-Time Detection Alerts", silver: true, gold: true, platinum: true },
    { name: "Monitoring Coverage", silver: "Self-Service", gold: "8x6 Active SOC", platinum: "24x7 Dedicated SOC" },
    { name: "Custom Threat Intelligence Dashboard", silver: false, gold: true, platinum: true },
    { name: "Commercial Threat Intelligence Feeds", silver: false, gold: false, platinum: true },
    { name: "Takedown Coordination (Phishing / Domains)", silver: "Assisted", gold: "Priority", platinum: "Immediate 24/7" },
    { name: "Automated Threat Reports", silver: "Monthly", gold: "Weekly & Monthly", platinum: "Daily, Weekly & Monthly" },
    { name: "Strategic Governance Calls", silver: "Quarterly", gold: "Monthly", platinum: "Weekly Dedicated" },
  ];

  return (
    <div className="mt-12 overflow-x-auto">
      <div className="min-w-[760px] rounded-2xl border border-[#e4dfef] bg-white shadow-[0_8px_30px_rgba(91,42,184,0.06)] overflow-hidden dark:border-white/10 dark:bg-[#14182b]">
        {/* Table Header */}
        <div className="grid grid-cols-4 border-b border-[#e4dfef] bg-[#faf8fd] p-6 dark:border-white/10 dark:bg-[#1b1238]">
          <div className="flex flex-col justify-end">
            <h3 className="font-display text-xl font-bold text-[#150c2e] dark:text-white">
              Service Capabilities
            </h3>
            <p className="mt-1 text-xs text-[#575f75] dark:text-slate-400">
              Select the right tier for your digital footprint.
            </p>
          </div>

          {plans.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col justify-between p-4 rounded-xl transition-all ${
                p.recommended
                  ? "bg-[#6d28d9]/10 border-2 border-[#6d28d9] dark:bg-violet-950/40 dark:border-violet-400"
                  : "border border-transparent"
              }`}
            >
              <div>
                {p.recommended && (
                  <span className="inline-block rounded-full bg-[#6d28d9] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white mb-2">
                    Most Popular
                  </span>
                )}
                <h4 className="font-display text-xl font-bold text-[#150c2e] dark:text-white">{p.name}</h4>
                <p className="mt-0.5 text-xs font-semibold text-[#6d28d9] dark:text-[#c4b5fd]">{p.tier}</p>
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-[#575f75] dark:text-slate-400">
                  {p.description}
                </p>
              </div>

              <div className="mt-4">
                <Btn to="/contact" variant={p.recommended ? "solid" : "light"} className="w-full text-center text-xs py-2">
                  Select {p.name}
                </Btn>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Rows */}
        <div className="divide-y divide-[#f0ebf8] dark:divide-white/5">
          {features.map((f) => (
            <div key={f.name} className="grid grid-cols-4 items-center p-4 hover:bg-slate-50/70 dark:hover:bg-white/5 transition-colors">
              <div className="text-[13px] font-medium text-[#150c2e] dark:text-slate-200 pr-4">
                {f.name}
              </div>

              {/* Silver */}
              <div className="text-center font-medium text-xs">
                {typeof f.silver === "boolean" ? (
                  f.silver ? (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                      <Check size={12} weight="bold" />
                    </span>
                  ) : (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-white/10">
                      <Minus size={10} weight="bold" />
                    </span>
                  )
                ) : (
                  <span className="text-[#575f75] dark:text-slate-300 font-mono text-xs">{f.silver}</span>
                )}
              </div>

              {/* Gold */}
              <div className="text-center font-medium text-xs">
                {typeof f.gold === "boolean" ? (
                  f.gold ? (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                      <Check size={12} weight="bold" />
                    </span>
                  ) : (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-white/10">
                      <Minus size={10} weight="bold" />
                    </span>
                  )
                ) : (
                  <span className="font-semibold text-[#6d28d9] dark:text-[#c4b5fd] font-mono text-xs">{f.gold}</span>
                )}
              </div>

              {/* Platinum */}
              <div className="text-center font-medium text-xs">
                {typeof f.platinum === "boolean" ? (
                  f.platinum ? (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                      <Check size={12} weight="bold" />
                    </span>
                  ) : (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-white/10">
                      <Minus size={10} weight="bold" />
                    </span>
                  )
                ) : (
                  <span className="font-bold text-[#150c2e] dark:text-white font-mono text-xs">{f.platinum}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Interactive FAQs Section                                         */
/* ---------------------------------------------------------------- */
function BrmDwmFaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is Brand Risk Monitoring (BRM)?",
      a: "Brand Risk Monitoring is the continuous automated surveillance and mitigation of threats targeting your brand integrity online. This includes rogue domain spoofing, trademark and copyright infringement, unauthorized app store uploads, counterfeit distribution channels, and social media executive impersonation.",
    },
    {
      q: "How does Brand Risk Monitoring help in reputation management?",
      a: "By tracking adversarial chatter, malicious typo-squatting, and deceptive campaigns in real-time, BRM enables your legal and security teams to execute takedowns before customers or partners fall victim to credential harvesting or phishing scams bearing your logo.",
    },
    {
      q: "What types of data does Dark Web Monitoring (DWM) track?",
      a: "Envista's Dark Web Monitoring crawls hidden Tor sites, I2P networks, private Telegram bot groups, Discord paste channels, and cybercrime illicit marketplaces. We track stolen corporate credentials, corporate credit card leaks, leaked source code, database dumps, infected botnet logs, and mentions of your VIP executives.",
    },
    {
      q: "How can Dark Web Monitoring protect sensitive data before a breach occurs?",
      a: "Dark Web Monitoring alerts organizations when third-party vendors or employees are compromised, long before an internal ransomware deployment takes place. This allows you to invalidate exposed session cookies, reset compromised passwords, and patch exposed VPN access gates immediately.",
    },
    {
      q: "How quickly can Envista issue domain and counterfeit takedowns?",
      a: "With our established registrar channels and global cyber threat intelligence network, high-confidence phishing and impersonation domains are flagged and submitted for takedown in under 2 hours, minimizing business disruption and customer trust degradation.",
    },
  ];

  return (
    <div className="mt-12 max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, i) => {
        const isOpen = openIdx === i;
        return (
          <div
            key={faq.q}
            className="rounded-xl border border-[#e4dfef] bg-white transition-all dark:border-white/10 dark:bg-[#14182b]"
          >
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="flex w-full items-center justify-between p-5 text-left transition-colors hover:text-[#6d28d9] dark:hover:text-[#c4b5fd]"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#6d28d9] dark:text-[#a78bfa]">
                  0{i + 1}
                </span>
                <span className="font-display text-[15px] font-bold text-[#150c2e] dark:text-white">
                  {faq.q}
                </span>
              </div>
              <span className="ml-4 shrink-0 rounded-full border border-[#e4dfef] p-1.5 text-[#6d28d9] dark:border-white/10 dark:text-[#a78bfa]">
                {isOpen ? <Minus size={12} weight="bold" /> : <Plus size={12} weight="bold" />}
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-[#f0ebf8] px-5 pt-3 pb-5 text-[13.5px] leading-relaxed text-[#575f75] dark:border-white/10 dark:text-slate-300">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Main Page Export: Brand Risk Monitoring & Dark Web Monitoring    */
/* ---------------------------------------------------------------- */
export default function BrmDwm() {
  return (
    <>
      {/* SECTION 1: HERO (PURPLE) */}
      <section className="relative overflow-hidden bg-[#150a2e] text-white pt-28 pb-16 dark:bg-[#0c061e] sm:pt-36 lg:pt-40 lg:pb-28 transition-colors duration-300">
        <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-violet-600/30 to-fuchsia-600/20 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[450px] w-[450px] rounded-full bg-indigo-600/25 blur-[120px]" />

        <div className={WRAP}>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left Copy Column */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#c4b5fd] shadow-xs backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
                <span className="font-mono text-[11px] uppercase tracking-wider">SOLUTIONS &amp; SERVICES</span>
              </div>
              <h1 className="mt-4 font-display text-[clamp(2.1rem,7vw,3.3rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
                <RevealText text="Brand Risk Monitoring & Dark Web Monitoring Services." stagger={45} />
              </h1>
              <p className="mt-3 text-base sm:text-lg font-semibold text-white/90">
                Detect Brand Risks, Rogue Domains, and Data Leaks Before They Strike.
              </p>

              <Reveal delay={160}>
                <p className="lead mt-5 text-sm sm:text-base text-[#d8cefa]">
                  Identify compromised credentials, corporate data exposures, infected devices, and impersonation
                  scams across underground dark web markets, Tor forums, and encrypted channels with Envista Cyber Defence.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <Btn to="/contact" variant="solid" className="w-full sm:w-auto text-center justify-center">
                    Get a Free Brand Risk Report
                  </Btn>
                  <Link
                    to="/methodology"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white shadow-xs hover:border-violet-400 hover:bg-white hover:text-[#150a2e] transition-all w-full sm:w-auto"
                  >
                    <span>Explore Our Methodology</span>
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                </div>

                {/* Quick Trust Badges */}
                <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/15 pt-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <CheckCircle size={16} weight="fill" className="text-emerald-400" />
                    <span>Tor &amp; Deep Web Crawlers</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <CheckCircle size={16} weight="fill" className="text-emerald-400" />
                    <span>Rapid Phishing Takedown</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <CheckCircle size={16} weight="fill" className="text-emerald-400" />
                    <span>DPDP Breach Assurance</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Threat Radar Graphic Column */}
            <div className="lg:col-span-6">
              <ThreatTelemetryRadar />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: KEY CHALLENGES ADDRESSED (WHITE) */}
      <section className="border-t border-slate-200/80 bg-white py-20 transition-colors duration-300 dark:border-white/10 dark:bg-[#0c0e1a] lg:py-28">
        <div className={WRAP}>
          <div className="max-w-3xl">
            <Eyebrow tone="light">Threat Reality</Eyebrow>
            <h2 className="mt-4 display-lg text-[#150c2e] dark:text-white">
              We Address Your Key Exposure Challenges
            </h2>
            <p className="lead mt-5 text-[#575f75] dark:text-slate-300">
              As business operations migrate to distributed cloud architectures, adversaries weaponize shadow assets,
              stolen credentials, and executive personas.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: "01",
                title: "Increasing Attack Surface",
                desc: "Cybercriminals relentlessly probe exposed web applications, rogue APIs, and forgotten cloud workloads outside your sanctioned firewall perimeter.",
                icon: Broadcast,
              },
              {
                num: "02",
                title: "Sensitive Data Leakage",
                desc: "Compromised employee credentials, customer PII, and source code traded across dark web forums, triggering crippling regulatory penalties and DPDP scrutiny.",
                icon: Database,
              },
              {
                num: "03",
                title: "Brand Impersonation Attacks",
                desc: "Spoofed executive domains, fake social profiles, typo-squatted mobile apps, and phishing pages that harvest customer credentials under your trusted brand identity.",
                icon: ShieldWarning,
              },
              {
                num: "04",
                title: "Zero-Day Vulnerability Exploits",
                desc: "Newly disclosed CVEs actively brokered in underground syndicates before public advisories are published, leaving your digital estate vulnerable to surprise extortion.",
                icon: WarningCircle,
              },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.num}
                  className="rounded-2xl border border-[#e4dfef] bg-white p-7 shadow-[0_4px_20px_rgba(91,42,184,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#6d28d9] hover:shadow-[0_16px_36px_rgba(91,42,184,0.1)] dark:border-white/10 dark:bg-[#14182b]"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#f6eefb] text-[#6d28d9] dark:bg-violet-500/20 dark:text-[#a78bfa]">
                      <Icon size={22} weight="bold" />
                    </span>
                    <span className="font-mono text-sm font-bold text-[#b5a9cc]">{c.num}</span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-[#150c2e] dark:text-white">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-[#575f75] dark:text-slate-300">
                    {c.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS / RECON PROCESS (PURPLE) */}
      <section className="relative overflow-hidden bg-[#150a2e] text-white py-20 transition-colors duration-300 dark:bg-[#0c061e] lg:py-28">
        <div className={WRAP}>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#c4b5fd] shadow-xs backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
                <span className="font-mono text-[11px] uppercase tracking-wider">HOW IT WORKS</span>
              </div>
              <h2 className="mt-4 display-lg text-white">
                Multi-Layer Threat Surface Pipeline
              </h2>
            </div>
            <p className="max-w-md text-[13.5px] leading-relaxed text-[#d8cefa]">
              Our 4-stage pipeline turns millions of underground indicators into actionable, verified cyber defence.
            </p>
          </div>

          <ProcessPipeline />
        </div>
      </section>

      {/* SECTION 4: WHY ENVISTA FOR BRM & DWM (WHITE) */}
      <section className="border-t border-slate-200/80 bg-white py-20 transition-colors duration-300 dark:border-white/10 dark:bg-[#0c0e1a] lg:py-28">
        <div className={WRAP}>
          <div className="max-w-3xl">
            <Eyebrow tone="light">The Envista Advantage</Eyebrow>
            <h2 className="mt-4 display-lg text-[#150c2e] dark:text-white">
              Why Choose Envista for Brand Risk &amp; Dark Web Monitoring?
            </h2>
            <p className="lead mt-5 text-[#575f75] dark:text-slate-300">
              We provide enterprise-grade reconnaissance backed by dedicated threat hunters, cutting-edge AI correlation,
              and rapid international takedown channels.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                n: "01",
                title: "Advanced Recon Technology",
                desc: "We deploy automated crawlers, proprietary threat feeds, and generative intelligence to index hidden forums and illicit marketplaces without leaving footprint traces.",
              },
              {
                n: "02",
                title: "Real-Time Detection & Alerts",
                desc: "Receive immediate notifications through your preferred channel (Slack, Teams, SIEM webhook) the instant your brand or data appears in an underground dump.",
              },
              {
                n: "03",
                title: "Global Threat Coverage",
                desc: "Comprehensive visibility spanning Tor hidden services, I2P, Russian & Mandarin cybercrime forums, invite-only Telegram syndicates, and paste repositories.",
              },
              {
                n: "04",
                title: "Human Threat Analyst Triage",
                desc: "Every alert is investigated by certified threat intelligence specialists, validating context and impact so your SOC never wastes time on false alarms.",
              },
              {
                n: "05",
                title: "Proactive Pre-Breach Mitigation",
                desc: "Identify early planning stages of targeted ransomware campaigns and supply chain compromises weeks before malicious payloads are staged.",
              },
              {
                n: "06",
                title: "DPDP & Regulatory Compliance Support",
                desc: "Detailed audit-ready reports documenting breach mitigation steps and compliance governance alignment under DPDP Act, ISO 27001, and SEBI directives.",
              },
            ].map((pillar) => (
              <div
                key={pillar.n}
                className="group rounded-2xl border border-[#e4dfef] bg-white p-7 shadow-[0_4px_20px_rgba(91,42,184,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#6d28d9] hover:shadow-[0_16px_36px_rgba(91,42,184,0.1)] dark:border-white/10 dark:bg-[#14182b]"
              >
                <span className="font-mono text-sm font-bold text-[#6d28d9] dark:text-[#a78bfa]">
                  {pillar.n}
                </span>
                <h3 className="mt-3 font-display text-base font-bold text-[#150c2e] dark:text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#575f75] dark:text-slate-300">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: PLANS & COMPARISON (PURPLE) */}
      <section className="relative overflow-hidden bg-[#150a2e] text-white py-20 transition-colors duration-300 dark:bg-[#0c061e] lg:py-28">
        <div className={WRAP}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#c4b5fd] shadow-xs backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
              <span className="font-mono text-[11px] uppercase tracking-wider">PLANS &amp; TIERS</span>
            </div>
            <h2 className="mt-4 display-lg text-white">
              Choose the Right Coverage for Your Organization
            </h2>
            <p className="lead mt-5 text-[#d8cefa]">
              Flexible tiers designed for growing startups, mid-market leaders, and highly regulated enterprises.
            </p>
          </div>

          <PlanComparisonMatrix />
        </div>
      </section>

      {/* SECTION 6: FAQS (WHITE) */}
      <section className="border-t border-slate-200/80 bg-white py-20 transition-colors duration-300 dark:border-white/10 dark:bg-[#0c0e1a] lg:py-28">
        <div className={WRAP}>
          <div className="text-center max-w-2xl mx-auto">
            <Eyebrow tone="light">Frequently Asked Questions</Eyebrow>
            <h2 className="mt-4 display-lg text-[#150c2e] dark:text-white">
              Clear Answers on BRM &amp; DWM
            </h2>
            <p className="lead mt-4 text-[#575f75] dark:text-slate-300">
              Everything you need to know about setting up proactive brand and dark web reconnaissance.
            </p>
          </div>

          <BrmDwmFaqSection />
        </div>
      </section>

      {/* SECTION 7: CLOSING CTA (DEEP PURPLE) */}
      <CtaBand />
    </>
  );
}
