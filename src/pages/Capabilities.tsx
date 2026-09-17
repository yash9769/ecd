import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router";
import {
  ArrowRight,
  Broadcast,
  CaretRight,
  Certificate,
  CheckCircle,
  Cpu,
  Database,
  Eye,
  Globe,
  Lock,
  MagnifyingGlass,
  ShieldCheck,
  ShieldWarning,
  Sparkle,
  Target,
  Users,
} from "@phosphor-icons/react";
import { Kicker, Btn, Reveal, RevealText } from "../components/ui";
import { CAPABILITIES, PLATFORM_CAPABILITIES } from "../data";
import { CtaBand } from "./Home";

const WRAP = "mx-auto max-w-[1320px] px-6 lg:px-10";

/* Icon mapping helper for the 8 Platform Capabilities */
function getCapabilityIcon(id: string) {
  switch (id) {
    case "platform-features":
      return <Cpu size={24} weight="bold" />;
    case "brand-monitoring":
      return <Globe size={24} weight="bold" />;
    case "dark-web-monitoring":
      return <Eye size={24} weight="bold" />;
    case "email-health-monitoring":
      return <CheckCircle size={24} weight="bold" />;
    case "infrastructure-monitoring":
      return <Database size={24} weight="bold" />;
    case "external-attack-surface":
      return <Broadcast size={24} weight="bold" />;
    case "compliance-monitoring":
      return <Certificate size={24} weight="bold" />;
    case "supply-chain-risk":
      return <Users size={24} weight="bold" />;
    default:
      return <ShieldCheck size={24} weight="bold" />;
  }
}

export default function Capabilities() {
  const { hash } = useLocation();
  const [activeTabId, setActiveTabId] = useState<string>("platform-features");

  useEffect(() => {
    if (hash) {
      const cleanHash = hash.replace("#", "");
      // Check if hash matches one of the platform capabilities
      const foundPlatform = PLATFORM_CAPABILITIES.find((c) => c.id === cleanHash);
      if (foundPlatform) {
        setActiveTabId(foundPlatform.id);
      }
      const el = document.querySelector(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [hash]);

  const activeCapability =
    PLATFORM_CAPABILITIES.find((c) => c.id === activeTabId) || PLATFORM_CAPABILITIES[0];

  return (
    <>
      {/* ------------------------------------------------------------ */}
      {/* SECTION 1 (PURPLE) — HERO & PLATFORM RECONNAISSANCE TELEMETRY */}
      {/* ------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-[#f6eefb] pt-32 pb-20 dark:bg-[#120b26] lg:pt-40 lg:pb-28 transition-colors duration-200">
        <div className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#c084fc]/20 via-[#818cf8]/15 to-transparent blur-3xl dark:from-[#9333ea]/20 dark:via-[#4f46e5]/10" />
        <div className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full bg-[#f3e8ff]/70 blur-3xl dark:bg-[#581c87]/15" />

        <div className={WRAP}>
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white/80 px-3.5 py-1 text-xs font-semibold text-[#6d28d9] shadow-xs backdrop-blur-md dark:border-violet-500/25 dark:bg-[#1f153d]/80 dark:text-[#c4b5fd]">
              <Sparkle size={14} weight="fill" className="text-[#6d28d9] dark:text-[#c4b5fd]" />
              <span className="font-mono text-[11px] uppercase tracking-wider">
                ENVISTA PLATFORM CAPABILITIES &amp; CYBER INTELLIGENCE
              </span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-[#0d1020] sm:text-5xl lg:text-6xl dark:text-white leading-[1.12]">
              Unified Outside-In Surveillance &amp;{" "}
              <span className="bg-gradient-to-r from-[#6d28d9] via-[#7c3aed] to-[#4f46e5] bg-clip-text text-transparent dark:from-[#c4b5fd] dark:via-[#a78bfa] dark:to-[#818cf8]">
                Precision Cyber Defence.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#575f75] dark:text-slate-300">
              Modern adversaries exploit the unmapped seams of your expanding digital footprint.
              Envista Cyber Defence couples autonomous outside-in reconnaissance with senior SOC
              analyst triage—empowering security leaders to continuously map, prioritize, and
              dismantle external exposures before exploitation.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Btn to="/contact" variant="solid">
                Request Architecture Briefing
              </Btn>
              <Link
                to="/solutions/brm-dwm"
                className="inline-flex items-center gap-2 rounded-full border border-[#d8cce8] bg-white/90 px-6 py-3 text-sm font-bold text-[#150c2e] shadow-xs hover:border-[#6d28d9] hover:bg-white hover:text-[#6d28d9] transition-all dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-violet-400"
              >
                <span>Explore BRM &amp; DWM Solution</span>
                <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </div>

          {/* Quick Telemetry Strip */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6 border-t border-[#e2d4f0] pt-8 dark:border-white/10">
            {[
              { stat: "100%", label: "External Perimeter Visibility", sub: "Domains, IPs, cloud storage & shadow IT" },
              { stat: "< 4.2h", label: "Takedown Enforcement SLA", sub: "Rapid registrar & host coordination" },
              { stat: "1.8M+", label: "Darknet Pages Crawled Daily", sub: "Tor hidden services, pastes & chat syndicates" },
              { stat: "0 False Positives", label: "Analyst-Verified Triage", sub: "Senior SOC validation before alerting" },
            ].map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className="font-display text-2xl font-extrabold text-[#6d28d9] dark:text-[#c4b5fd] lg:text-3xl">
                  {m.stat}
                </span>
                <span className="mt-1 text-xs font-bold text-[#0d1020] dark:text-white">
                  {m.label}
                </span>
                <span className="mt-0.5 text-[11px] text-[#575f75] dark:text-slate-400">
                  {m.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* SECTION 2 (WHITE) — INTERACTIVE 8-CAPABILITY COMMAND CENTER */}
      {/* ------------------------------------------------------------ */}
      <section id="platform-hub" className="scroll-mt-24 bg-white py-20 dark:bg-[#0c0e1a] lg:py-28 transition-colors duration-200">
        <div className={WRAP}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-slate-200/80 dark:border-white/10">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#6d28d9] dark:text-[#a78bfa]">
                PARTNER PLATFORM CAPABILITIES
              </div>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0d1020] dark:text-white sm:text-4xl">
                Eight Pillars of Continuous Outside-In Security
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#575f75] dark:text-slate-400 leading-relaxed">
              Select any capability below to explore its technological anatomy, operational impact,
              and live defence workflow.
            </p>
          </div>

          {/* Interactive Capability Navigation Tabs */}
          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
            {PLATFORM_CAPABILITIES.map((cap) => {
              const isSelected = activeTabId === cap.id;
              return (
                <button
                  key={cap.id}
                  type="button"
                  onClick={() => setActiveTabId(cap.id)}
                  className={`group relative flex flex-col items-start rounded-xl p-3 text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#f6eefb] text-[#6d28d9] ring-2 ring-[#6d28d9] shadow-sm dark:bg-[#1c1236] dark:text-[#c4b5fd] dark:ring-[#a78bfa]"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-[#0d1020] dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                  }`}
                >
                  <span className="font-mono text-[10px] font-extrabold tracking-wider opacity-60">
                    {cap.n}
                  </span>
                  <div className="mt-2 font-display text-[13px] font-bold leading-tight">
                    {cap.shortTitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Capability Showcase Deck */}
          <div className="mt-8 rounded-3xl border border-[#e2d6ef] bg-[#faf8fe] p-6 sm:p-10 shadow-sm dark:border-violet-500/20 dark:bg-[#130d29]/70">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              {/* Left Column: Capability Overview & Envista Voice */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6d28d9] text-white shadow-md shadow-[#6d28d9]/30">
                      {getCapabilityIcon(activeCapability.id)}
                    </span>
                    <div>
                      <span className="inline-block rounded bg-[#6d28d9]/10 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-[#6d28d9] dark:bg-violet-500/20 dark:text-[#c4b5fd]">
                        {activeCapability.badge}
                      </span>
                      <div className="font-mono text-[11px] text-slate-400">
                        Capability Pillar #{activeCapability.n}
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-[#0d1020] sm:text-3xl dark:text-white">
                    {activeCapability.title}
                  </h3>

                  <p className="mt-2 font-medium text-sm text-[#6d28d9] dark:text-[#c4b5fd]">
                    {activeCapability.tagline}
                  </p>

                  {/* Envista Voice Executive Quote Box */}
                  <div className="relative mt-6 rounded-2xl border border-[#e5d8f2] bg-white p-5 shadow-xs dark:border-white/10 dark:bg-[#1a1235]">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#6d28d9] dark:text-[#a78bfa]">
                      ENVISTA PERSPECTIVE &amp; DOCTRINE
                    </div>
                    <p className="mt-2 text-xs sm:text-[13px] leading-relaxed italic text-slate-700 dark:text-slate-300">
                      "{activeCapability.envistaVoice}"
                    </p>
                  </div>
                </div>

                {/* Metrics row */}
                <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-white/10">
                  <div className="grid grid-cols-3 gap-3">
                    {activeCapability.metrics.map((m) => (
                      <div key={m.label} className="flex flex-col">
                        <span className="font-display text-lg font-bold text-[#6d28d9] dark:text-[#c4b5fd]">
                          {m.value}
                        </span>
                        <span className="text-[10.5px] leading-tight text-slate-500 dark:text-slate-400">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Btn to={activeCapability.primaryHref} variant="solid">
                      Activate Capability
                    </Btn>
                    {activeCapability.id.includes("monitoring") && (
                      <Link
                        to="/solutions/brm-dwm"
                        className="text-xs font-bold text-[#6d28d9] hover:underline dark:text-[#a78bfa]"
                      >
                        Deep Dive into BRM &amp; DWM →
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: 5 Architectural Feature Breakdown Cards */}
              <div className="lg:col-span-7">
                <div className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 mb-4">
                  OPERATIONAL ARCHITECTURE &amp; CONTROLS
                </div>

                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-1">
                  {activeCapability.features.map((feat, idx) => (
                    <div
                      key={feat.title}
                      className="group rounded-2xl border border-slate-200/90 bg-white p-4.5 shadow-2xs transition-all hover:border-[#6d28d9] hover:shadow-sm dark:border-white/10 dark:bg-[#1a1235] dark:hover:border-violet-400"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f6eefb] font-mono text-xs font-bold text-[#6d28d9] dark:bg-violet-950/60 dark:text-[#c4b5fd]">
                          0{idx + 1}
                        </span>
                        <div>
                          <h4 className="font-display text-sm font-bold text-[#0d1020] group-hover:text-[#6d28d9] transition-colors dark:text-white dark:group-hover:text-[#c4b5fd]">
                            {feat.title}
                          </h4>
                          <p className="mt-1 text-xs leading-relaxed text-[#575f75] dark:text-slate-400">
                            {feat.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* SECTION 3 (PURPLE) — COMPLETE 8-CAPABILITY DIRECTORY GRID   */}
      {/* ------------------------------------------------------------ */}
      <section className="bg-[#f6eefb] py-20 dark:bg-[#120b26] lg:py-28 transition-colors duration-200">
        <div className={WRAP}>
          <div className="text-center max-w-3xl mx-auto">
            <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#6d28d9] dark:text-[#a78bfa]">
              TOTAL ATTACK SURFACE SPECTRUM
            </div>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#0d1020] dark:text-white sm:text-4xl">
              All Eight Platform Capabilities at a Glance
            </h2>
            <p className="mt-3 text-sm text-[#575f75] dark:text-slate-300">
              Explore how each layer of Envista's intelligence fabric protects your enterprise from
              initial reconnaissance to coordinated remediation.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PLATFORM_CAPABILITIES.map((cap) => (
              <div
                key={cap.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-[#e4d8f2] bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#6d28d9] hover:shadow-lg dark:border-white/10 dark:bg-[#191136]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#6d28d9] dark:text-[#a78bfa]">
                      #{cap.n}
                    </span>
                    <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[9px] font-bold text-slate-600 uppercase dark:bg-white/10 dark:text-slate-300">
                      {cap.shortTitle}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-base font-bold text-[#0d1020] group-hover:text-[#6d28d9] transition-colors dark:text-white dark:group-hover:text-[#c4b5fd]">
                    {cap.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#575f75] dark:text-slate-400">
                    {cap.tagline}
                  </p>

                  <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4 dark:border-white/10">
                    {cap.features.slice(0, 3).map((f) => (
                      <li key={f.title} className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                        <CheckCircle size={13} className="text-[#6d28d9] dark:text-[#a78bfa] shrink-0" weight="bold" />
                        <span className="truncate">{f.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTabId(cap.id);
                      document.getElementById("platform-hub")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group/btn inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#6d28d9] hover:underline dark:text-[#c4b5fd] cursor-pointer"
                  >
                    <span>View Architecture Details</span>
                    <CaretRight size={12} weight="bold" className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* SECTION 4 (WHITE) — 6 ENTERPRISE CONSULTING DISCIPLINES      */}
      {/* ------------------------------------------------------------ */}
      <section className="bg-white py-20 dark:bg-[#0c0e1a] lg:py-28 transition-colors duration-200">
        <div className={WRAP}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-slate-200/80 dark:border-white/10">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#6d28d9] dark:text-[#a78bfa]">
                ADVISORY &amp; OPERATIONAL SERVICES
              </div>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0d1020] dark:text-white sm:text-4xl">
                Comprehensive Cyber Security Consulting
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#575f75] dark:text-slate-400 leading-relaxed">
              Six strategic disciplines under one unified operating model—closing the seams that
              stand-alone point tools leave behind.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <article
                key={c.id}
                id={c.id}
                className="group relative scroll-mt-28 rounded-2xl border border-slate-200/90 bg-white p-7 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#6d28d9] hover:shadow-md dark:border-white/10 dark:bg-[#140e2b]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#6d28d9] dark:text-[#c4b5fd]">
                    {c.n}
                  </span>
                  <span className="rounded-full bg-violet-50 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#6d28d9] dark:bg-violet-950/60 dark:text-[#c4b5fd]">
                    PRACTICE
                  </span>
                </div>

                <h3 className="mt-4 font-display text-xl font-bold text-[#0d1020] group-hover:text-[#6d28d9] transition-colors dark:text-white dark:group-hover:text-[#c4b5fd]">
                  {c.title}
                </h3>
                <p className="mt-1 text-xs font-semibold text-[#6d28d9] dark:text-[#a78bfa]">
                  {c.line}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {c.body}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-slate-200/80 bg-slate-50/70 px-2 py-0.5 font-mono text-[10px] text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* SECTION 5 (DEEP PURPLE) — HIGH-IMPACT CLOSING CTA BAND       */}
      {/* ------------------------------------------------------------ */}
      <CtaBand />
    </>
  );
}
