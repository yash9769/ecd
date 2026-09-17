import { Link } from "react-router";
import {
  ArrowRight,
  Bank,
  Brain,
  Certificate,
  ChartBar,
  ClipboardText,
  Cpu,
  Factory,
  Gear,
  GraduationCap,
  Heartbeat,
  Lock,
  MagnifyingGlass,
  ShieldCheck,
  Target,
} from "@phosphor-icons/react";
import Hero from "../components/hero/Hero";
import FounderQuote from "../components/FounderQuote";
import { Btn, Eyebrow, Reveal, RevealText } from "../components/ui";
import { CountUp } from "../components/motion";
import {
  APPROACH_STEPS,
  HOME_INSIGHTS,
  HOME_SERVICES,
  IMPACT_STATS,
  TRUSTED_INDUSTRIES,
  type HomeService,
} from "../data";

const WRAP = "mx-auto max-w-[1240px] px-6 lg:px-10";

const SERVICE_ICON: Record<HomeService["icon"], typeof Target> = {
  offensive: Target,
  defensive: ShieldCheck,
  grc: Certificate,
  dpdp: Lock,
  ai: Brain,
  training: GraduationCap,
};

const INDUSTRY_ICON = {
  bank: Bank,
  health: Heartbeat,
  factory: Factory,
  gov: Bank,
  tech: Cpu,
  edu: GraduationCap,
} as const;

const STEP_ICON = [MagnifyingGlass, ClipboardText, Gear, ChartBar];

/* ---------------------------------------------------------------- */
/* Trusted by / industries strip                                     */
function TrustedIndustries() {
  return (
    <section className="border-y border-slate-200/80 bg-white transition-colors duration-300 dark:border-white/10 dark:bg-[#0c0e1a]">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10 flex flex-col gap-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-6">
        <div
          className="shrink-0 font-mono text-[10.5px] font-bold uppercase leading-tight tracking-[0.16em] text-slate-400 dark:text-slate-400"
        >
          TRUSTED BY ORGANIZATIONS
          <br />
          ACROSS SECTORS
        </div>
        
        {/* Hairline separators between sectors matching reference */}
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:flex lg:flex-1 lg:items-stretch lg:justify-between lg:gap-0">
          {TRUSTED_INDUSTRIES.map((ind, i) => {
            const Icon = INDUSTRY_ICON[ind.icon];
            return (
              <li
                key={ind.name}
                className={`flex flex-col items-center gap-1.5 text-center lg:flex-1 lg:px-4 ${
                  i > 0 ? "lg:border-l lg:border-slate-200/80 dark:lg:border-white/10" : "lg:border-l lg:border-slate-200/80 dark:lg:border-white/10"
                }`}
              >
                <Icon size={24} weight="regular" className="text-[#3b2f6b] dark:text-[#a78bfa] transition-colors duration-200" aria-hidden="true" />
                <span className="text-[12px] font-medium text-slate-700 dark:text-slate-300 transition-colors duration-200">
                  {ind.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* What we do — six service cards (Deep Royal Purple Section)        */
/* ---------------------------------------------------------------- */
function WhatWeDo() {
  return (
    <section className="relative overflow-hidden bg-[#150a2e] text-white transition-colors duration-300 dark:bg-[#0c061e]">
      {/* Ambient background glow matching envistadpdp */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full opacity-35 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, rgba(79,70,229,0.15) 60%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)",
        }}
      />

      <div className={`${WRAP} relative py-20 lg:py-28`}>
        {/* Header bar: Title, Subtext & Action */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#c4b5fd] shadow-xs backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
              <span className="font-mono text-[11px] uppercase tracking-wider">What We Do</span>
            </div>

            <h2 className="mt-4 display-lg text-white">
              <RevealText text="From risk to resilience." />
            </h2>

            <p className="mt-4 text-base font-normal leading-relaxed text-[#d8cefa]">
              End-to-end cybersecurity services designed to reduce risk, ensure compliance and keep your business ahead of evolving threats.
            </p>
          </div>

          <div className="shrink-0 pb-1">
            <Btn to="/capabilities" variant="solid">
              Explore All Services
            </Btn>
          </div>
        </div>

        {/* 6 Capability Cards — Full width, balanced 3-column grid */}
        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_SERVICES.map((s, i) => {
            const Icon = SERVICE_ICON[s.icon];
            return (
              <li key={s.id} className="h-full">
                <Reveal delay={(i % 3) * 70} className="h-full">
                  <Link
                    to={`/capabilities#${s.id}`}
                    className="group flex h-full flex-col justify-between rounded-2xl border border-white/12 bg-white/[0.06] p-6 lg:p-7 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400/50 hover:bg-white/[0.1] hover:shadow-[0_16px_40px_rgba(124,58,237,0.3)]"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          aria-hidden="true"
                          className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/20 text-[#c4b5fd] transition-all duration-200 group-hover:scale-105 group-hover:bg-violet-600 group-hover:text-white"
                        >
                          <Icon size={22} weight="bold" />
                        </span>
                        <span className="font-mono text-[11px] font-bold text-violet-300/50 uppercase tracking-wider">
                          0{i + 1}
                        </span>
                      </div>

                      <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[#c4b5fd]">
                        {s.title}
                      </h3>

                      <ul className="mt-3.5 space-y-2 text-[13.5px] leading-relaxed text-[#d8cefa]">
                        {s.points.map((p) => (
                          <li key={p} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-violet-300 font-semibold group-hover:text-white transition-colors">
                        Explore Capability
                      </span>
                      <span
                        aria-hidden="true"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[#c4b5fd] transition-all duration-300 group-hover:border-violet-400 group-hover:bg-violet-600 group-hover:text-white group-hover:translate-x-0.5"
                      >
                        <ArrowRight size={14} weight="bold" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Our approach — four-step horizontal progression (White Section)   */
/* ---------------------------------------------------------------- */
function OurApproach() {
  return (
    <section className="border-y border-slate-200/80 bg-white transition-colors duration-300 dark:border-white/10 dark:bg-[#0c0e1a]">
      <div className={`${WRAP} py-20 lg:py-28`}>
        <div className="max-w-2xl">
          <Eyebrow tone="light">Our approach</Eyebrow>
          <h2 className="mt-5 display-lg text-[#0d1020] dark:text-white transition-colors duration-300">
            <RevealText text="A structured path to a safer tomorrow." />
          </h2>
          <Reveal delay={180}>
            <p className="lead mt-6 text-[#575f75] dark:text-slate-300 transition-colors duration-300">
              A practical, intelligence-led approach designed to understand your environment,
              reduce risk and build long-term resilience.
            </p>
            <div className="mt-8">
              <Btn to="/methodology">Learn About Our Approach</Btn>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {APPROACH_STEPS.map((s, i) => {
            const Icon = STEP_ICON[i];
            return (
              <Reveal key={s.n} delay={i * 90} className="h-full">
                <Link
                  to="/methodology"
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-slate-200/90 bg-gradient-to-b from-white via-[#fcfaff] to-[#f8f5fc] p-6 lg:p-7 shadow-[0_4px_20px_rgba(79,70,229,0.04),0_1px_3px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-2 hover:border-violet-400/80 hover:shadow-[0_22px_45px_-10px_rgba(124,58,237,0.18)] dark:border-white/10 dark:bg-gradient-to-b dark:from-[#131128] dark:via-[#100d24] dark:to-[#0c091d] dark:hover:border-violet-400/50 dark:hover:shadow-[0_22px_45px_-10px_rgba(124,58,237,0.32)] cursor-pointer"
                >
                  {/* Subtle top edge animated gradient highlight */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div>
                    {/* Header Row: Glowing Brand Icon + Step Pill */}
                    <div className="flex items-center justify-between">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-[#7c3aed] to-indigo-600 text-white shadow-md shadow-violet-500/25 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-violet-500/40"
                      >
                        <Icon size={22} weight="bold" />
                      </div>

                      <span className="font-mono text-[11px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-violet-100/80 text-violet-700 ring-1 ring-violet-500/20 dark:bg-violet-500/20 dark:text-[#c4b5fd] dark:ring-violet-400/30">
                        STEP {s.n}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-5 font-display text-[20px] font-bold tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-violet-700 dark:text-white dark:group-hover:text-[#c4b5fd]">
                      {s.t}
                    </h3>

                    {/* Description */}
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-slate-600 transition-colors duration-200 dark:text-slate-300">
                      {s.d}
                    </p>
                  </div>

                  {/* Footer: Phase & Action Arrow */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-[12.5px] font-semibold text-violet-600 transition-colors duration-200 group-hover:text-violet-700 dark:border-white/10 dark:text-[#a78bfa] dark:group-hover:text-white">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-400">
                      Phase {s.n}
                    </span>
                    <span className="inline-flex items-center gap-1 font-medium">
                      <span>Explore</span>
                      <ArrowRight
                        size={14}
                        weight="bold"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Real impact — statistics band (Purple Section)                    */
/* ---------------------------------------------------------------- */
function RealImpact() {
  return (
    <section className="relative overflow-hidden bg-[#150a2e] text-white transition-colors duration-300 dark:bg-[#0c061e]">
      <div className={`${WRAP} py-16 lg:py-24`}>
        <div
          className="relative overflow-hidden rounded-[28px] border border-white/15 bg-gradient-to-br from-[#1c0e3b] via-[#24114d] to-[#170c33] px-8 py-12 lg:px-14 lg:py-16 shadow-[0_20px_60px_rgba(0,0,0,0.4)] text-white"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(760px 420px at 12% 18%, rgba(168,85,247,0.25), transparent 62%), radial-gradient(620px 420px at 92% 88%, rgba(124,58,237,0.3), transparent 64%)",
            }}
          />
          {/* Contour sweep */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-full w-[46%] opacity-[0.3]"
            viewBox="0 0 400 300"
            preserveAspectRatio="none"
            fill="none"
          >
            {[0, 1, 2, 3, 4, 5, 6].map((n) => (
              <path
                key={n}
                d={`M ${300 - n * 26} -40 C ${190 - n * 22} 90, ${250 - n * 24} 190, ${392 - n * 26} 340`}
                stroke="rgba(196,181,253,0.3)"
                strokeWidth="1"
              />
            ))}
          </svg>

          <div className="relative">
            {/* Top row: Badge, Headline and Right CTA */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#c4b5fd]">
                  Real Impact
                </div>
                <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[42px] leading-tight">
                  <RevealText text="Stronger organizations. Safer tomorrows." />
                </h2>
              </div>

              <Reveal delay={160} className="shrink-0 lg:text-right">
                <p className="text-[13.5px] font-medium leading-snug text-[#d9ceea]">
                  Measured outcomes. Real business value.
                </p>
                <Link
                  to="/case-studies"
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-white hover:text-[#150a2e]"
                >
                  <span>View Case Studies</span>
                  <ArrowRight size={14} weight="bold" aria-hidden="true" />
                </Link>
              </Reveal>
            </div>

            {/* Bottom row: 4 Balanced Stats Columns */}
            <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-white/15 pt-10 sm:grid-cols-4">
              {IMPACT_STATS.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <dt className="font-display text-3xl font-extrabold leading-none tracking-tight text-white lg:text-4xl">
                    <CountUp to={s.v} suffix={s.suffix} />
                  </dt>
                  <dd className="mt-2.5 text-xs font-medium leading-relaxed text-[#d9ceea]">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Insights — (White Section)                                       */
/* ---------------------------------------------------------------- */
function Insights() {
  return (
    <section className="bg-white transition-colors duration-300 dark:bg-[#090a10]">
      <div className={`${WRAP} py-20 lg:py-28`}>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow tone="light">Insights</Eyebrow>
            <h2 className="mt-5 display-lg text-[#150c2e] dark:text-white transition-colors duration-300">
              <RevealText text="Stay informed. Stay ahead." />
            </h2>
            <p className="lead mt-5 max-w-md text-[#575f75] dark:text-slate-300 transition-colors duration-300">
              Expert perspectives, industry trends and actionable insights to navigate an
              evolving threat landscape.
            </p>
          </div>
          <Btn to="/insights" variant="solid">
            Explore Insights
          </Btn>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {HOME_INSIGHTS.map((p, i) => (
            <li key={p.t}>
              <Reveal delay={i * 70} className="h-full">
                <article
                  className="group flex h-full flex-col rounded-2xl border p-6 border-[#e4dfef] bg-[#faf8fe] shadow-[0_4px_20px_rgba(91,42,184,0.05)] hover:shadow-[0_12px_32px_rgba(91,42,184,0.12)] hover:-translate-y-1 transition-all duration-300 dark:bg-[#1b1238] dark:border-white/10 dark:hover:border-violet-500/40"
                >
                  <span
                    className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#6d28d9] dark:text-[#a78bfa]"
                  >
                    {p.tag}
                  </span>
                  <h3
                    className="mt-3 flex-1 font-display text-lg font-bold leading-snug tracking-[-0.01em] text-[#150c2e] dark:text-white transition-colors duration-200 group-hover:text-[#6d28d9] dark:group-hover:text-[#c4b5fd]"
                  >
                    {p.t}
                  </h3>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-[12px] font-medium text-[#8890a4] dark:text-slate-400">
                      {p.date}
                    </span>
                    <span
                      aria-hidden="true"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#e4dfef] text-[#6d28d9] transition-all group-hover:border-[#6d28d9] group-hover:bg-[#6d28d9] group-hover:text-white dark:border-white/15 dark:text-slate-400"
                    >
                      <ArrowRight size={14} weight="bold" />
                    </span>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedIndustries />
      <WhatWeDo />
      <OurApproach />
      <RealImpact />
      <FounderQuote />
      <Insights />
      <CtaBand />
    </>
  );
}

/* Final CTA — reused (as CtaBand) at the foot of every inner page. */
export function CtaBand() {
  return (
    <section className="relative overflow-hidden border-t border-[#3c2478]/40 bg-gradient-to-br from-[#150c2e] via-[#1b1133] to-[#150c2e] text-white transition-colors duration-300">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(700px 420px at 22% 30%, rgba(151,38,182,0.18), transparent 66%)",
        }}
      />
      {/* Three columns in the reference: heading, supporting copy, action. */}
      <div className={`${WRAP} relative grid grid-cols-1 items-center gap-8 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)_auto] lg:gap-12 lg:py-[72px]`}>
        <div>
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#f7799f]">
            Let&rsquo;s build a safer tomorrow
          </div>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,3vw,2.55rem)] font-extrabold leading-[1.06] tracking-[-0.035em] text-white">
            <RevealText text="Start the conversation." />
          </h2>
        </div>
        <Reveal delay={140}>
          <p className="max-w-md text-[14.5px] leading-relaxed text-[#d9ceea]">
            Discuss your challenges with our experts and discover how Envista Cyber Defence can help
            you stay ahead.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <Btn to="/contact" variant="solid">Talk to an Expert</Btn>
        </Reveal>
      </div>
    </section>
  );
}
