import { useRef } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Brain,
  Certificate,
  ChartBar,
  ClipboardText,
  Cpu,
  Gear,
  GraduationCap,
  Lock,
  MagnifyingGlass,
  ShieldCheck,
  Target,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import Hero from "../components/hero/Hero";
import FounderQuote from "../components/FounderQuote";
import { Btn, Eyebrow, Reveal, RevealText } from "../components/ui";
import { Spotlight } from "../components/fx";
import { CountUp, useGSAP, gsap } from "../components/motion";
import {
  APPROACH_STEPS,
  HOME_INSIGHTS,
  HOME_SERVICES,
  IMPACT_STATS,
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

const STEP_ICON = [MagnifyingGlass, ClipboardText, Gear, ChartBar];

/* ---------------------------------------------------------------- */
/* What we do — six service cards (Deep Royal Purple Section)        */
/* ---------------------------------------------------------------- */
function WhatWeDo() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".wwd-header", {
        opacity: 0, y: 30, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".wwd-header", start: "top 88%", once: true },
      });
      gsap.from(".wwd-card", {
        opacity: 0, y: 32, duration: 0.65, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".wwd-cards", start: "top 85%", once: true },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#150a2e] text-white transition-colors duration-300 dark:bg-[#0c061e] py-16 lg:py-24">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full opacity-35 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, rgba(79,70,229,0.15) 60%, transparent 100%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)" }}
      />

      <div className={`${WRAP} relative flex flex-col justify-center`}>
        {/* Header */}
        <div className="wwd-header flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-3 py-0.5 text-xs font-semibold text-[#c4b5fd] shadow-xs backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
              <span className="font-mono text-[10.5px] uppercase tracking-wider">What We Do</span>
            </div>

            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-white leading-tight font-display">
              <RevealText text="From risk to resilience." />
            </h2>

            <p className="mt-1.5 text-xs sm:text-[13.5px] font-normal leading-relaxed text-[#d8cefa]">
              End-to-end cybersecurity services designed to reduce risk, ensure compliance and keep your business ahead of evolving threats.
            </p>
          </div>

          <div className="shrink-0 pb-0.5">
            <Btn to="/capabilities" variant="solid" className="w-full sm:w-auto text-center justify-center text-xs sm:text-[13px] py-2 px-4.5">
              Explore All Services
            </Btn>
          </div>
        </div>

        {/* Service Cards */}
        <ul className="wwd-cards mt-5 lg:mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3.5 xl:gap-4">
          {HOME_SERVICES.map((s, i) => {
            const Icon = SERVICE_ICON[s.icon];
            return (
              <motion.li
                key={s.id}
                className="wwd-card h-full"
                whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to={`/capabilities#${s.id}`}
                  className="group block h-full rounded-xl sm:rounded-2xl border border-white/12 glass-card text-white shadow-lg transition-all duration-300 hover:border-[#B4FF00]/50 hover:shadow-[0_8px_30px_-10px_rgba(180,255,0,0.15)] overflow-hidden"
                >
                  <Spotlight color="rgba(180,255,0,0.15)" className="flex h-full flex-col justify-between p-4 lg:p-4.5">
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          aria-hidden="true"
                          className="inline-flex h-8.5 w-8.5 items-center justify-center rounded-lg bg-violet-500/20 text-[#c4b5fd] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#B4FF00] group-hover:text-[#0c061e] group-hover:shadow-[0_0_15px_rgba(180,255,0,0.4)]"
                        >
                          <Icon size={19} weight="bold" />
                        </span>
                        <span className="font-mono text-[10.5px] font-bold text-violet-300/50 uppercase tracking-wider transition-colors duration-300 group-hover:text-[#B4FF00]/70">
                          0{i + 1}
                        </span>
                      </div>

                      <h3 className="mt-2.5 font-display text-[15.5px] sm:text-[16px] font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[#B4FF00]">
                        {s.title}
                      </h3>

                      <ul className="mt-2 space-y-1.5 text-[12px] sm:text-[12.5px] leading-tight text-[#d8cefa] transition-colors duration-300 group-hover:text-white/90">
                        {s.points.map((p) => (
                          <li key={p} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400 transition-colors duration-300 group-hover:bg-[#B4FF00]" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between">
                      <span className="font-mono text-[10.5px] uppercase tracking-wider text-violet-300 font-semibold transition-colors duration-300 group-hover:text-[#B4FF00]">
                        Explore Capability
                      </span>
                      <span
                        aria-hidden="true"
                        className="inline-flex h-6.5 w-6.5 items-center justify-center rounded-full border border-white/20 text-[#c4b5fd] transition-all duration-300 group-hover:border-[#B4FF00] group-hover:bg-[#B4FF00] group-hover:text-[#0c061e] group-hover:translate-x-0.5 group-hover:shadow-[0_0_10px_rgba(180,255,0,0.3)]"
                      >
                        <ArrowRight size={12} weight="bold" />
                      </span>
                    </div>
                  </Spotlight>
                </Link>
              </motion.li>
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
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".approach-card", {
        opacity: 0, y: 32, duration: 0.65, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: ".approach-grid", start: "top 85%", once: true },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="border-y border-slate-200/80 bg-white transition-colors duration-300 dark:border-white/10 dark:bg-[#0c0e1a] py-16 lg:py-24">
      <div className={`${WRAP} relative flex flex-col justify-center`}>
        <Reveal className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow tone="light">Our approach</Eyebrow>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-[#0d1020] dark:text-white transition-colors duration-300 font-display leading-tight">
              <RevealText text="A structured path to a safer tomorrow." />
            </h2>
            <p className="mt-1.5 text-xs sm:text-[13.5px] text-[#575f75] dark:text-slate-300 transition-colors duration-300 leading-relaxed">
              A practical, intelligence-led approach designed to understand your environment,
              reduce risk and build long-term resilience.
            </p>
          </div>
          <div className="shrink-0 pb-0.5">
            <Btn to="/methodology" className="text-xs sm:text-[13px] py-2 px-4.5">Learn About Our Approach</Btn>
          </div>
        </Reveal>

        <div className="approach-grid mt-5 lg:mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {APPROACH_STEPS.map((s, i) => {
            const Icon = STEP_ICON[i];
            return (
              <motion.div
                key={s.n}
                className="approach-card h-full"
                whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/methodology"
                  className="group relative block h-full overflow-hidden rounded-[20px] border border-slate-200/90 bg-gradient-to-b from-white via-[#fcfaff] to-[#f8f5fc] shadow-[0_4px_20px_rgba(79,70,229,0.04)] transition-all duration-300 hover:border-[#B4FF00] hover:shadow-[0_8px_30px_-10px_rgba(180,255,0,0.2)] dark:border-white/10 dark:bg-gradient-to-b dark:from-[#131128] dark:via-[#100d24] dark:to-[#0c091d] dark:hover:border-[#B4FF00]/60 cursor-pointer"
                >
                  <Spotlight color="rgba(180,255,0,0.15)" className="flex h-full flex-col justify-between p-4 sm:p-5">
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#B4FF00] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-9.5 w-9.5 items-center justify-center rounded-xl bg-gradient-to-br from-[#100d24] to-[#1c183b] text-white shadow-md transition-all duration-300 group-hover:from-[#B4FF00] group-hover:to-[#8cc700] group-hover:text-[#0c061e] group-hover:scale-110 group-hover:shadow-[#B4FF00]/25">
                          <Icon size={19} weight="bold" />
                        </div>
                        <span className="font-mono text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100/80 text-slate-700 ring-1 ring-slate-200/50 dark:bg-white/5 dark:text-slate-300 dark:ring-white/10 transition-colors duration-300 group-hover:text-[#B4FF00] group-hover:bg-[#B4FF00]/10 group-hover:ring-[#B4FF00]/30">
                          STEP {s.n}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-[16.5px] sm:text-[17.5px] font-bold tracking-tight text-slate-900 transition-colors duration-200 dark:text-white group-hover:text-[#8cc700] dark:group-hover:text-[#B4FF00]">
                        {s.t}
                      </h3>
                      <p className="mt-1.5 text-[12px] sm:text-[12.5px] leading-relaxed text-slate-600 transition-colors duration-200 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">
                        {s.d}
                      </p>
                    </div>
                    <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 dark:border-white/10 pt-2.5 text-[11.5px] font-semibold text-slate-600 transition-colors duration-300 group-hover:text-[#8cc700] dark:text-[#a78bfa] dark:group-hover:text-[#B4FF00]">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 group-hover:text-[#8cc700] dark:group-hover:text-[#B4FF00]">Phase {s.n}</span>
                      <span className="inline-flex items-center gap-1 font-medium text-[11.5px]">
                        <span>Explore</span>
                        <ArrowRight size={12} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Spotlight>
                </Link>
              </motion.div>
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
      <div className={`${WRAP} py-10 sm:py-12 lg:py-14`}>
        <div
          className="relative overflow-hidden rounded-[20px] sm:rounded-[24px] border border-white/15 bg-gradient-to-br from-[#1c0e3b] via-[#24114d] to-[#170c33] px-5 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9 shadow-[0_16px_50px_rgba(0,0,0,0.4)] text-white"
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
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#c4b5fd]">
                  Real Impact
                </div>
                <h2 className="mt-2.5 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-[34px] leading-tight">
                  <RevealText text="Stronger organizations. Lasting resilience." />
                </h2>
              </div>

              <Reveal delay={160} className="shrink-0 lg:text-right">
                <p className="text-[12.5px] font-medium leading-snug text-[#d9ceea]">
                  Measured outcomes. Real business value.
                </p>
                <Link
                  to="/case-studies"
                  className="mt-2.5 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4.5 py-2 text-[12.5px] font-semibold text-white transition-all hover:bg-white hover:text-[#150a2e] w-full sm:w-auto"
                >
                  <span>View Case Studies</span>
                  <ArrowRight size={13} weight="bold" aria-hidden="true" />
                </Link>
              </Reveal>
            </div>

            {/* Bottom row: 4 Balanced Stats Columns */}
            <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-white/15 pt-6 sm:grid-cols-4 sm:gap-6 sm:pt-7">
              {IMPACT_STATS.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <dt className="font-display text-2xl font-extrabold leading-none tracking-tight text-white sm:text-3xl lg:text-[34px]">
                    <CountUp to={s.v} suffix={s.suffix} />
                  </dt>
                  <dd className="mt-1.5 text-[11.5px] font-medium leading-relaxed text-[#d9ceea]">
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
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".insight-card", {
        opacity: 0, y: 32, duration: 0.65, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: ".insights-grid", start: "top 85%", once: true },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-white transition-colors duration-300 dark:bg-[#090a10] py-16 lg:py-24">
      <div className={`${WRAP} relative flex flex-col justify-center`}>
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <Eyebrow tone="light">Insights</Eyebrow>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-[#150c2e] dark:text-white transition-colors duration-300 font-display leading-tight">
              <RevealText text="Stay informed. Stay ahead." />
            </h2>
            <p className="mt-1.5 max-w-md text-xs sm:text-[13.5px] text-[#575f75] dark:text-slate-300 transition-colors duration-300 leading-relaxed">
              Expert perspectives, industry trends and actionable insights to navigate an
              evolving threat landscape.
            </p>
          </div>
          <Btn to="/insights" variant="solid" className="text-xs sm:text-[13px] py-2 px-4.5">
            Explore Insights
          </Btn>
        </div>

        <ul className="insights-grid mt-5 lg:mt-6 grid grid-cols-1 gap-3.5 md:grid-cols-3 lg:gap-4.5">
          {HOME_INSIGHTS.map((p, i) => (
            <motion.li
              key={p.t}
              className="insight-card h-full"
              whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/insights"
                className="group relative block h-full overflow-hidden rounded-2xl border border-[#e4dfef] bg-[#faf8fe] shadow-[0_4px_20px_rgba(91,42,184,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B4FF00] hover:shadow-[0_12px_32px_rgba(180,255,0,0.15)] dark:border-white/10 dark:bg-[#1b1238] dark:hover:border-[#B4FF00]/60 cursor-pointer"
              >
                <Spotlight color="rgba(180,255,0,0.15)" className="flex h-full flex-col justify-between p-4.5 sm:p-5">
                  <div>
                    <span
                      className="font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#6d28d9] transition-colors duration-300 group-hover:text-[#B4FF00] dark:text-[#a78bfa]"
                    >
                      {p.tag}
                    </span>
                    <h3
                      className="mt-2 font-display text-[15.5px] sm:text-[16.5px] font-bold leading-snug tracking-[-0.01em] text-[#150c2e] transition-colors duration-200 group-hover:text-[#8cc700] dark:text-white dark:group-hover:text-[#B4FF00]"
                    >
                      {p.t}
                    </h3>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-200/70 pt-2.5 transition-colors duration-300 dark:border-white/10">
                    <span className="text-[11.5px] font-medium text-[#8890a4] transition-colors duration-300 group-hover:text-[#8cc700] dark:text-slate-400 dark:group-hover:text-[#B4FF00]">
                      {p.date}
                    </span>
                    <span
                      aria-hidden="true"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#e4dfef] text-[#6d28d9] transition-all duration-300 group-hover:border-[#B4FF00] group-hover:bg-[#B4FF00] group-hover:text-[#0c061e] group-hover:shadow-[0_0_10px_rgba(180,255,0,0.3)] dark:border-white/15 dark:text-slate-400"
                    >
                      <ArrowRight size={12} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Spotlight>
              </Link>
            </motion.li>
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
