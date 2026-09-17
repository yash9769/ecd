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
/* What we do — six service cards                                    */
/* ---------------------------------------------------------------- */
function WhatWeDo() {
  return (
    <section className="bg-[#f6eefb] transition-colors duration-300 dark:bg-[#120b26]">
      <div className={`${WRAP} py-20 lg:py-28`}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[38fr_62fr] lg:gap-10">
          <div>
            <Eyebrow tone="light">What we do</Eyebrow>
            <h2 className="mt-5 display-lg text-[#150c2e] dark:text-white transition-colors duration-300">
              <RevealText text="From risk" stagger={70} />
              <span className="block">
                <span className="text-[#6d28d9] dark:text-[#a78bfa]">
                  <RevealText text="to resilience." start={140} />
                </span>
              </span>
            </h2>
            <Reveal delay={160}>
              <p className="lead mt-6 text-[#575f75] dark:text-slate-300 transition-colors duration-300">
                End-to-end cybersecurity services designed to reduce risk, ensure compliance and
                keep your business ahead of evolving threats.
              </p>
              <div className="mt-7">
                <Btn to="/capabilities" variant="light">
                  Explore All Services
                </Btn>
              </div>
            </Reveal>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HOME_SERVICES.map((s, i) => {
              const Icon = SERVICE_ICON[s.icon];
              return (
                <li key={s.id}>
                  <Reveal delay={(i % 3) * 70} className="h-full">
                    <Link
                      to={`/capabilities#${s.id}`}
                      className="group flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-[#e4dfef] bg-white shadow-[0_4px_20px_rgba(91,42,184,0.05)] dark:bg-[#1b1238] dark:border-white/10 dark:hover:border-violet-500/40 dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                    >
                      <span
                        aria-hidden="true"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/10 text-[#6d28d9] dark:bg-violet-500/20 dark:text-[#a78bfa] transition-colors duration-200 group-hover:scale-105"
                      >
                        <Icon size={20} weight="bold" />
                      </span>
                      <h3 className="mt-4 font-display text-base font-semibold tracking-[-0.01em] text-[#150c2e] dark:text-white transition-colors duration-200">
                        {s.title}
                      </h3>
                      <ul className="mt-3 space-y-1.5 text-[13px] leading-snug text-[#575f75] dark:text-slate-400 transition-colors duration-200">
                        {s.points.map((p) => (
                          <li key={p}>• {p}</li>
                        ))}
                      </ul>
                      <span
                        aria-hidden="true"
                        className="mt-5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#e4dfef] text-[#8890a4] transition-all duration-300 group-hover:border-[#6d28d9] group-hover:bg-[#6d28d9] group-hover:text-white dark:border-white/15 dark:text-slate-400 dark:group-hover:border-violet-400 dark:group-hover:bg-violet-600 dark:group-hover:text-white"
                      >
                        <ArrowRight size={14} weight="bold" />
                      </span>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Our approach — four-step horizontal progression                   */
/* ---------------------------------------------------------------- */
function OurApproach() {
  return (
    <section className="border-y border-[#e4dfef] bg-white transition-colors duration-300 dark:border-white/10 dark:bg-[#0c0e1a]">
      <div className={`${WRAP} py-20 lg:py-28`}>
        <div className="max-w-2xl">
          <Eyebrow tone="light">Our approach</Eyebrow>
          <h2 className="mt-5 display-lg text-[#0d1020] dark:text-white transition-colors duration-300">
            <RevealText text="A structured path" stagger={70} />
            <span className="block">
              <RevealText text="to a safer" start={160} />{" "}
              <span className="text-[#6d28d9] dark:text-[#a78bfa]">
                <RevealText text="tomorrow." start={240} />
              </span>
            </span>
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

        <div className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
          {APPROACH_STEPS.map((s, i) => {
            const Icon = STEP_ICON[i];
            return (
              <div key={s.n} className="flex flex-1 items-start gap-2">
                <Reveal delay={i * 90} className="flex flex-1 flex-col items-center text-center sm:items-start sm:text-left">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-purple-600/10 text-[#6d28d9] dark:bg-violet-500/20 dark:text-[#a78bfa] transition-colors duration-200"
                  >
                    <Icon size={24} weight="bold" />
                  </span>
                  <div className="mt-5 font-mono text-[11px] text-[#9a8fc9] dark:text-violet-400">
                    {s.n}
                  </div>
                  <div className="mt-1 font-display text-lg font-semibold text-[#0d1020] dark:text-white transition-colors duration-200">
                    {s.t}
                  </div>
                  <p className="mt-1.5 max-w-[14rem] text-[13px] leading-relaxed text-[#575f75] dark:text-slate-400 transition-colors duration-200">
                    {s.d}
                  </p>
                </Reveal>
                {i < APPROACH_STEPS.length - 1 && (
                  <ArrowRight
                    size={18}
                    weight="bold"
                    className="mt-4 hidden shrink-0 text-[#c7bdf0] dark:text-violet-500/40 sm:block"
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Real impact — statistics band                                     */
/* ---------------------------------------------------------------- */
function RealImpact() {
  return (
    <section className="bg-[#f6eefb] transition-colors duration-300 dark:bg-[#120b26]">
      <div className={`${WRAP} py-12 lg:py-16`}>
        <div
          className="relative overflow-hidden rounded-[24px] border border-[#3c2478]/40 bg-gradient-to-br from-[#150c2e] via-[#1c113b] to-[#150c2e] px-8 py-12 lg:px-14 lg:py-14 shadow-[0_20px_50px_rgba(21,12,46,0.25)] text-white transition-colors duration-300"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(760px 420px at 12% 18%, rgba(151,38,182,0.2), transparent 62%), radial-gradient(620px 420px at 92% 88%, rgba(91,42,184,0.25), transparent 64%)",
            }}
          />
          {/* Contour sweep: concentric ellipses clipped to the card's right side */}
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
                stroke="rgba(167,139,250,0.3)"
                strokeWidth="1"
              />
            ))}
          </svg>

          <div className="relative">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#f7799f]">
              Real impact
            </div>

            <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
              <h2 className="display-lg shrink-0 text-white">
                <RevealText text="Stronger" stagger={70} />
                <span className="block">
                  <RevealText text="organizations." start={140} />
                </span>
                <span className="block">
                  <RevealText text="Safer" start={220} />{" "}
                  <span className="text-[#a78bfa]">
                    <RevealText text="tomorrows." start={280} />
                  </span>
                </span>
              </h2>

              <dl className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 lg:flex-1">
                {IMPACT_STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="font-display text-[30px] font-bold leading-none tracking-[-0.02em] text-white">
                      <CountUp to={s.v} suffix={s.suffix} />
                    </dt>
                    <dd className="mt-2 text-[12px] leading-snug text-[#d9ceea]">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>

              <Reveal delay={160} className="shrink-0 lg:text-right">
                <p className="text-[13.5px] font-medium leading-snug text-[#d9ceea]">
                  Measured outcomes.
                  <br className="hidden lg:block" /> Real business value.
                </p>
                <Link
                  to="/case-studies"
                  className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-[#c4b5fd] transition-colors hover:text-white"
                >
                  View Case Studies
                  <ArrowRight size={14} weight="bold" aria-hidden="true" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Insights                                                           */
/* ---------------------------------------------------------------- */
function Insights() {
  return (
    <section className="bg-[#f6eefb] transition-colors duration-300 dark:bg-[#120b26]">
      <div className={`${WRAP} py-20 lg:py-28`}>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow tone="light">Insights</Eyebrow>
            <h2 className="mt-5 display-lg text-[#150c2e] dark:text-white transition-colors duration-300">
              <RevealText text="Stay informed." stagger={70} />
              <span className="block">
                <RevealText text="Stay ahead." start={160} />
              </span>
            </h2>
            <p className="lead mt-5 max-w-md text-[#575f75] dark:text-slate-300 transition-colors duration-300">
              Expert perspectives, industry trends and actionable insights to navigate an
              evolving threat landscape.
            </p>
          </div>
          <Btn to="/insights" variant="light">
            Explore Insights
          </Btn>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {HOME_INSIGHTS.map((p, i) => (
            <li key={p.t}>
              <Reveal delay={i * 70} className="h-full">
                <article
                  className="flex h-full flex-col rounded-2xl border p-6 border-[#e4dfef] bg-white shadow-[0_4px_20px_rgba(91,42,184,0.05)] hover:shadow-[0_12px_32px_rgba(91,42,184,0.12)] hover:-translate-y-1 transition-all duration-300 dark:bg-[#1b1238] dark:border-white/10 dark:hover:border-violet-500/40"
                >
                  <span
                    className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6d28d9] dark:text-[#a78bfa]"
                  >
                    {p.tag}
                  </span>
                  <h3
                    className="mt-3 flex-1 font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-[#150c2e] dark:text-white transition-colors duration-200"
                  >
                    {p.t}
                  </h3>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-[12px] text-[#8890a4] dark:text-slate-400">
                      {p.date}
                    </span>
                    <span
                      aria-hidden="true"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#e4dfef] text-[#8890a4] dark:border-white/15 dark:text-slate-400"
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
