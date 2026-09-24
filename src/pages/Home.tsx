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

const WRAP = "mx-auto w-full max-w-[1680px] px-4 sm:px-8 lg:px-12";

const SERVICE_ICON: Record<HomeService["icon"], typeof Target> = {
  offensive: Target,
  defensive: ShieldCheck,
  grc: Certificate,
  dpdp: Lock,
  ai: Cpu,
  training: GraduationCap,
};

const STEP_ICON = [MagnifyingGlass, ShieldCheck, Cpu, ChartBar];

/* ---------------------------------------------------------------- */
/* What we do — services directory preview (White Section)          */
/* ---------------------------------------------------------------- */
function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".wwd-card", {
        opacity: 0, y: 32, duration: 0.65, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".wwd-cards", start: "top 85%", once: true },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-white transition-colors duration-300 dark:bg-[#090a10] py-6 sm:py-8 lg:py-8 lg:min-h-screen lg:flex lg:flex-col lg:justify-center border-b border-slate-200/80 dark:border-white/10">
      <div className={`${WRAP} relative flex flex-col justify-center`}>
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <Eyebrow tone="light">What We Do</Eyebrow>
            <h2 className="mt-1.5 text-2xl sm:text-3xl lg:text-[32px] font-extrabold tracking-tight text-[#150c2e] dark:text-white transition-colors duration-300 font-display leading-tight">
              <RevealText text="From risk to resilience." />
            </h2>
            <p className="mt-1 text-xs sm:text-[13px] text-[#575f75] dark:text-slate-300 transition-colors duration-300 leading-relaxed">
              End-to-end cybersecurity services designed to reduce risk, ensure compliance and keep your business ahead of evolving threats.
            </p>
          </div>

          <div className="shrink-0 pb-0.5">
            <Btn to="/capabilities" variant="solid" className="w-full sm:w-auto text-center justify-center text-xs sm:text-[13px] py-2 px-4.5 font-semibold shadow-sm hover:scale-105 transition-all">
              Explore All Services
            </Btn>
          </div>
        </div>

        {/* 6 Capability Cards — Premium Royal Violet with Electric Green #B4FF00 Hover Effect */}
        <ul className="wwd-cards mt-4 lg:mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3.5 xl:gap-4">
          {HOME_SERVICES.map((s, i) => {
            const Icon = SERVICE_ICON[s.icon];
            return (
              <motion.li
                key={s.id}
                className="wwd-card h-full"
                whileHover={{ y: -4, scale: 1.012, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to={`/capabilities#${s.id}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-violet-900/50 bg-gradient-to-b from-[#1e1342] via-[#170e36] to-[#12082b] text-white shadow-[0_8px_28px_rgba(23,14,54,0.25)] transition-all duration-300 hover:border-[#B4FF00]/80 hover:shadow-[0_14px_36px_rgba(180,255,0,0.22)] cursor-pointer"
                >
                  {/* Top Electric Green Accent Line */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#B4FF00] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <Spotlight color="rgba(180,255,0,0.18)" className="flex h-full flex-col justify-between p-4 sm:p-4.5 lg:p-4.5">
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          aria-hidden="true"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/20 text-[#c4b5fd] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#B4FF00] group-hover:text-[#0c061e] group-hover:shadow-[0_0_14px_rgba(180,255,0,0.4)] shadow-xs"
                        >
                          <Icon size={18} weight="bold" />
                        </span>
                        <span className="font-mono text-[10.5px] font-bold text-violet-300/60 uppercase tracking-wider transition-colors duration-300 group-hover:text-[#B4FF00]">
                          0{i + 1}
                        </span>
                      </div>

                      <h3 className="mt-2.5 font-display text-[15.5px] sm:text-[16.5px] font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[#B4FF00]">
                        {s.title}
                      </h3>

                      <ul className="mt-2 space-y-1 text-[11.5px] sm:text-[12px] leading-snug text-[#d8cefa]">
                        {s.points.map((p) => (
                          <li key={p} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400 transition-colors duration-300 group-hover:bg-[#B4FF00]" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between">
                      <span className="font-mono text-[10.5px] uppercase tracking-wider text-violet-300 font-semibold group-hover:text-[#B4FF00] transition-colors">
                        Explore Capability
                      </span>
                      <span
                        aria-hidden="true"
                        className="inline-flex h-6.5 w-6.5 items-center justify-center rounded-full border border-white/20 text-[#c4b5fd] transition-all duration-300 group-hover:border-[#B4FF00] group-hover:bg-[#B4FF00] group-hover:text-[#0c061e] group-hover:shadow-[0_0_12px_rgba(180,255,0,0.4)] group-hover:translate-x-0.5"
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
/* Our approach — four-step horizontal progression (Purple Section)  */
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
    <section ref={sectionRef} className="relative overflow-hidden bg-[#150a2e] text-white transition-colors duration-300 dark:bg-[#0c061e] py-18 sm:py-24 lg:py-28">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[700px] w-[700px] rounded-full opacity-35 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, rgba(79,70,229,0.15) 60%, transparent 100%)" }}
      />

      <div className={`${WRAP} relative flex flex-col justify-center`}>
        <Reveal className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#c4b5fd] shadow-xs backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#a78bfa]" />
              <span className="font-mono text-xs uppercase tracking-wider">Our Approach</span>
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white transition-colors duration-300 font-display leading-[1.12]">
              <RevealText text="A structured path to a safer tomorrow." />
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#d8cefa] transition-colors duration-300 leading-relaxed">
              A practical, intelligence-led approach designed to understand your environment,
              reduce risk and build long-term resilience.
            </p>
          </div>
          <div className="shrink-0 pb-1">
            <Btn to="/methodology" className="text-sm font-semibold py-3 px-6 shadow-md hover:scale-105 transition-all">Learn About Our Approach</Btn>
          </div>
        </Reveal>

        <div className="approach-grid mt-8 lg:mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
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
                  className="group relative block h-full overflow-hidden rounded-3xl border border-white/15 glass-card text-white shadow-xl transition-all duration-300 hover:border-[#B4FF00]/60 hover:shadow-[0_12px_36px_-10px_rgba(180,255,0,0.25)] cursor-pointer"
                >
                  <Spotlight color="rgba(180,255,0,0.15)" className="flex h-full flex-col justify-between p-6 sm:p-7">
                    <div className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#B4FF00] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/20 text-[#c4b5fd] shadow-md transition-all duration-300 group-hover:bg-[#B4FF00] group-hover:text-[#0c061e] group-hover:scale-110 group-hover:shadow-[#B4FF00]/25">
                          <Icon size={22} weight="bold" />
                        </div>
                        <span className="font-mono text-xs font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-[#c4b5fd] ring-1 ring-white/15 transition-colors duration-300 group-hover:text-[#B4FF00] group-hover:bg-[#B4FF00]/15 group-hover:ring-[#B4FF00]/30">
                          STEP {s.n}
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-lg sm:text-xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[#B4FF00]">
                        {s.t}
                      </h3>
                      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#d8cefa] transition-colors duration-200 group-hover:text-white/90">
                        {s.d}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-3.5 text-xs font-semibold text-[#c4b5fd] transition-colors duration-300 group-hover:text-[#B4FF00]">
                      <span className="font-mono text-xs uppercase tracking-wider text-violet-300/70 group-hover:text-[#B4FF00]">Phase {s.n}</span>
                      <span className="inline-flex items-center gap-1.5 font-semibold text-xs">
                        <span>Explore</span>
                        <ArrowRight size={13} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
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
/* Real impact — statistics band (BIG EXPANSIVE SCREEN FIT CARD)      */
/* ---------------------------------------------------------------- */
function RealImpact() {
  return (
    <section className="relative overflow-hidden bg-white text-[#0d1020] transition-colors duration-300 dark:bg-[#090a10] border-b border-slate-200/80 dark:border-white/10 py-16 sm:py-20 lg:py-24">
      <div className={WRAP}>
        <div
          className="relative overflow-hidden rounded-[32px] sm:rounded-[48px] border border-slate-200/90 bg-gradient-to-br from-[#180d33] via-[#221045] to-[#160b30] px-8 py-14 sm:px-14 sm:py-20 lg:px-20 lg:py-24 shadow-[0_30px_80px_rgba(79,70,229,0.22)] text-white"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(1200px 600px at 15% 20%, rgba(168,85,247,0.35), transparent 65%), radial-gradient(1000px 600px at 90% 85%, rgba(124,58,237,0.4), transparent 65%)",
            }}
          />
          {/* Contour sweep */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-full w-[46%] opacity-[0.35]"
            viewBox="0 0 400 300"
            preserveAspectRatio="none"
            fill="none"
          >
            {[0, 1, 2, 3, 4, 5, 6].map((n) => (
              <path
                key={n}
                d={`M ${300 - n * 26} -40 C ${190 - n * 22} 90, ${250 - n * 24} 190, ${392 - n * 26} 340`}
                stroke="rgba(196,181,253,0.35)"
                strokeWidth="1.2"
              />
            ))}
          </svg>

          <div className="relative">
            {/* Top row: Badge, Headline and Right CTA */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#c4b5fd]">
                  Real Impact
                </div>
                <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[62px] leading-[1.06]">
                  <RevealText text="Stronger organizations. Lasting resilience." />
                </h2>
              </div>

              <Reveal delay={160} className="shrink-0 lg:text-right">
                <p className="text-base sm:text-lg font-medium leading-snug text-[#d9ceea]">
                  Measured outcomes. Real business value.
                </p>
                <Link
                  to="/case-studies"
                  className="mt-4 inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-white hover:text-[#150a2e] hover:scale-105 shadow-lg w-full sm:w-auto"
                >
                  <span>View Case Studies</span>
                  <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </Link>
              </Reveal>
            </div>

            {/* Bottom row: 4 Balanced Stat Cards — Generous & Room-Filling */}
            <dl className="mt-12 sm:mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {IMPACT_STATS.map((s) => (
                <div
                  key={s.label}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-white/[0.06] p-7 sm:p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:bg-white/[0.1] hover:shadow-[0_16px_36px_rgba(124,58,237,0.25)]"
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <dt className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black leading-none tracking-tight text-white drop-shadow-[0_4px_24px_rgba(168,85,247,0.4)]">
                    <CountUp to={s.v} suffix={s.suffix} />
                  </dt>
                  <dd className="mt-4 text-sm sm:text-base font-semibold leading-relaxed text-[#d9ceea] group-hover:text-white transition-colors">
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
/* Insights — (White Section, Expansive Room-Filling Cards)         */
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
    <section ref={sectionRef} className="bg-white transition-colors duration-300 dark:bg-[#090a10] py-20 lg:py-28">
      <div className={`${WRAP} relative flex flex-col justify-center`}>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <Eyebrow tone="light">Insights</Eyebrow>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#150c2e] dark:text-white transition-colors duration-300 font-display leading-tight">
              <RevealText text="Stay informed. Stay ahead." />
            </h2>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#575f75] dark:text-slate-300 transition-colors duration-300 leading-relaxed">
              Expert perspectives, industry trends and actionable insights to navigate an
              evolving threat landscape.
            </p>
          </div>
          <div className="shrink-0 pb-1">
            <Btn to="/insights" variant="solid" className="w-full sm:w-auto text-center justify-center text-sm font-semibold py-3 px-6 shadow-md hover:scale-105 transition-all">
              Explore Insights
            </Btn>
          </div>
        </div>

        <ul className="insights-grid mt-10 lg:mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {HOME_INSIGHTS.map((p) => (
            <motion.li
              key={p.t}
              className="insight-card h-full"
              whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/insights"
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[#e4dfef] bg-[#faf8fe] shadow-[0_4px_24px_rgba(91,42,184,0.06)] transition-all duration-300 hover:border-[#B4FF00] hover:shadow-[0_16px_40px_rgba(180,255,0,0.18)] dark:border-white/10 dark:bg-[#1b1238] dark:hover:border-[#B4FF00]/60 cursor-pointer"
              >
                <Spotlight color="rgba(180,255,0,0.15)" className="flex h-full flex-col justify-between p-7 sm:p-8 lg:p-9 min-h-[260px]">
                  <div>
                    <span
                      className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#6d28d9] transition-colors duration-300 group-hover:text-[#B4FF00] dark:text-[#a78bfa]"
                    >
                      {p.tag}
                    </span>
                    <h3
                      className="mt-3.5 font-display text-lg sm:text-xl lg:text-2xl font-bold leading-snug tracking-tight text-[#150c2e] transition-colors duration-200 group-hover:text-[#8cc700] dark:text-white dark:group-hover:text-[#B4FF00]"
                    >
                      {p.t}
                    </h3>
                  </div>
                  <div className="mt-8 flex items-center justify-between border-t border-slate-200/70 pt-4 transition-colors duration-300 dark:border-white/10">
                    <span className="text-xs sm:text-sm font-semibold text-[#8890a4] transition-colors duration-300 group-hover:text-[#8cc700] dark:text-slate-400 dark:group-hover:text-[#B4FF00]">
                      {p.date}
                    </span>
                    <span
                      aria-hidden="true"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e4dfef] text-[#6d28d9] transition-all duration-300 group-hover:border-[#B4FF00] group-hover:bg-[#B4FF00] group-hover:text-[#0c061e] group-hover:shadow-[0_0_12px_rgba(180,255,0,0.35)] dark:border-white/15 dark:text-slate-400"
                    >
                      <ArrowRight size={15} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5" />
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
