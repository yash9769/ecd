import { useEffect } from "react";
import { useLocation, Link } from "react-router";
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
} from "@phosphor-icons/react";
import { Btn } from "../components/ui";
import { CAPABILITIES, APPROACH, DIFFERENTIATORS } from "../data";
import { CtaBand } from "./Home";

const WRAP = "mx-auto max-w-[1320px] px-6 lg:px-10";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  offensive: <Crosshair size={28} weight="duotone" />,
  defensive: <ShieldCheck size={28} weight="duotone" />,
  grc: <Scales size={28} weight="duotone" />,
  dpdp: <LockKey size={28} weight="duotone" />,
  training: <GraduationCap size={28} weight="duotone" />,
  ai: <Cpu size={28} weight="duotone" />,
};

export default function Capabilities() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#090a10] text-slate-900 dark:text-white transition-colors duration-200">
      {/* ------------------------------------------------------------ */}
      {/* SECTION 1 — SERVICES HERO                                     */}
      {/* ------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-[#150a2e] text-white pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 dark:bg-[#0c061e] transition-colors duration-200">
        <div className="pointer-events-none absolute -top-40 right-1/4 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-[#c084fc]/25 via-[#818cf8]/15 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full bg-[#581c87]/20 blur-3xl" />

        <div className={WRAP}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-4 py-1.5 text-xs font-semibold text-[#c4b5fd] shadow-xs backdrop-blur-md">
              <Sparkle size={14} weight="fill" className="text-[#a78bfa]" />
              <span className="font-mono text-[10.5px] sm:text-[11.5px] uppercase tracking-wider">
                COMPREHENSIVE CYBER SECURITY SERVICES
              </span>
            </div>

            <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[54px] leading-[1.12]">
              Cyber Security Services for{" "}
              <span className="bg-gradient-to-r from-violet-300 via-sky-300 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(56,189,248,0.25)]">
                Future-Driven Businesses.
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg font-semibold text-violet-200">
              Built to Defend. Designed to Adapt.
            </p>

            <p className="mt-2.5 max-w-2xl text-sm sm:text-base leading-relaxed text-[#d8cefa]">
              Our comprehensive security solutions protect enterprises, SMBs, and government
              institutions from modern cyber threats — closing the seams that stand-alone tools leave behind.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Btn to="/contact" variant="solid" className="w-full sm:w-auto text-center justify-center text-xs sm:text-sm py-2.5 px-6">
                Consult an Architect
              </Btn>
              <a
                href="#services-grid"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:border-violet-400 hover:bg-white hover:text-[#150a2e] transition-all w-full sm:w-auto"
              >
                <span>Explore All 6 Services</span>
                <ArrowRight size={13} weight="bold" />
              </a>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6 border-t border-white/15 pt-8">
            {[
              { stat: "100%", label: "Framework Aligned", sub: "DPDP, ISO 27001, SOC 2, CERT-In" },
              { stat: "500+", label: "Assessments Delivered", sub: "Enterprise & regulated institutions" },
              { stat: "24/7", label: "Operational Readiness", sub: "Rapid incident triage & response" },
              { stat: "0-Trust", label: "Adversary-Grade Posture", sub: "Continuous offensive validation" },
            ].map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#c4b5fd]">
                  {m.stat}
                </span>
                <span className="mt-1 text-xs sm:text-sm font-bold text-white">
                  {m.label}
                </span>
                <span className="mt-0.5 text-[11px] text-[#d8cefa]">
                  {m.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* SECTION 2 — 6 CANONICAL SERVICES DIRECTORY                    */}
      {/* ------------------------------------------------------------ */}
      <section id="services-grid" className="scroll-mt-24 py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#0c0e1a] transition-colors duration-200">
        <div className={WRAP}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-8 border-b border-slate-200/80 dark:border-white/10">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#6d28d9] dark:text-[#a78bfa]">
                OUR CORE DISCIPLINES
              </div>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0d1020] dark:text-white sm:text-4xl">
                The Six Pillars of Envista Defence
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-[#575f75] dark:text-slate-400 leading-relaxed">
              Tailored cybersecurity solutions engineered to validate, protect, and harden your organization across the complete threat lifecycle.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <article
                key={c.id}
                id={c.id}
                className="group relative flex flex-col justify-between scroll-mt-28 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#6d28d9] hover:shadow-xl dark:border-white/10 dark:bg-[#131024] dark:hover:border-violet-400/60 dark:hover:shadow-[0_12px_36px_rgba(124,58,237,0.2)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                      {SERVICE_ICONS[c.id] || <ShieldCheck size={28} weight="duotone" />}
                    </div>
                    <span className="font-mono text-sm font-extrabold text-[#6d28d9] dark:text-[#c4b5fd]">
                      #{c.n}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold text-[#0d1020] group-hover:text-[#6d28d9] transition-colors dark:text-white dark:group-hover:text-[#c4b5fd]">
                    {c.title}
                  </h3>

                  <div className="mt-1.5 inline-block rounded-full bg-violet-50 px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-[#6d28d9] uppercase tracking-wider dark:bg-violet-950/60 dark:text-[#c4b5fd]">
                    {c.promise}
                  </div>

                  <p className="mt-3 text-xs sm:text-[13px] font-semibold text-slate-800 dark:text-slate-200">
                    {c.line}
                  </p>

                  <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">
                    {c.body}
                  </p>

                  {/* Complete sub-services offerings list at one glance */}
                  <div className="mt-5 border-t border-slate-200/70 pt-4 dark:border-white/10">
                    <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                      Sub-Services &amp; Scope
                    </div>
                    <ul className="space-y-2 text-xs sm:text-[13px] text-slate-700 dark:text-slate-300">
                      {c.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <CheckCircle size={15} weight="fill" className="mt-0.5 shrink-0 text-violet-600 dark:text-[#a78bfa]" />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-200/70 pt-4 dark:border-white/10 flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                    {c.items.length} Offerings
                  </span>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#6d28d9] hover:underline dark:text-[#c4b5fd] group-hover:translate-x-1 transition-transform"
                  >
                    <span>Request Engagement Scope</span>
                    <ArrowRight size={12} weight="bold" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* SECTION 3 — ENGAGEMENT METHODOLOGY                            */}
      {/* ------------------------------------------------------------ */}
      <section className="bg-slate-50 py-16 sm:py-20 dark:bg-[#080714] border-t border-slate-200/80 dark:border-white/10 transition-colors duration-200">
        <div className={WRAP}>
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#6d28d9] dark:text-[#c4b5fd]">
              OUR METHODOLOGY
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              How Envista Protects Your Enterprise
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              A structured, three-phase delivery model that moves seamlessly from evaluation to long-term operational resilience.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:gap-8 md:grid-cols-3">
            {APPROACH.map((step) => (
              <div
                key={step.n}
                className="relative rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-white/10 dark:bg-[#131024]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/10 text-violet-600 font-mono text-base font-extrabold dark:bg-violet-500/20 dark:text-violet-300">
                  {step.n}
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-slate-900 dark:text-white">
                  {step.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* SECTION 4 — HIGH-IMPACT CLOSING CTA BAND                     */}
      {/* ------------------------------------------------------------ */}
      <CtaBand />
    </div>
  );
}
