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
/* ---------------------------------------------------------------- */
function TrustedIndustries() {
  return (
    <section className="border-b" style={{ borderColor: "rgba(13,16,32,0.08)", backgroundColor: "#ffffff" }}>
      <div className={`${WRAP} flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10`}>
        <div
          className="shrink-0 font-mono text-[11px] font-semibold uppercase leading-relaxed tracking-[0.14em]"
          style={{ color: "#8890a4" }}
        >
          Trusted by organizations
          <br />
          across sectors
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:flex lg:flex-1 lg:items-center lg:justify-between">
          {TRUSTED_INDUSTRIES.map((ind) => {
            const Icon = INDUSTRY_ICON[ind.icon];
            return (
              <li key={ind.name} className="flex items-center gap-2.5">
                <Icon size={20} weight="light" style={{ color: "#0d1020" }} aria-hidden="true" />
                <span className="text-[13px] font-medium" style={{ color: "#292d3d" }}>
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
    <section style={{ backgroundColor: "#ffffff" }}>
      <div className={`${WRAP} py-20 lg:py-28`}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[38fr_62fr] lg:gap-10">
          <div>
            <Eyebrow tone="light">What we do</Eyebrow>
            <h2 className="mt-5 display-lg" style={{ color: "#0d1020" }}>
              <RevealText text="From risk" stagger={70} />
              <span className="block">
                <span className="text-purple-deep">
                  <RevealText text="to resilience." start={140} />
                </span>
              </span>
            </h2>
            <Reveal delay={160}>
              <p className="lead mt-6" style={{ color: "#575f75" }}>
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
                      className="group flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5"
                      style={{ borderColor: "rgba(13,16,32,0.1)", backgroundColor: "#fbfaff" }}
                    >
                      <span
                        aria-hidden="true"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ background: "rgba(109,40,217,0.1)", color: "#6d28d9" }}
                      >
                        <Icon size={20} weight="bold" />
                      </span>
                      <h3 className="mt-4 font-display text-base font-semibold tracking-[-0.01em]" style={{ color: "#0d1020" }}>
                        {s.title}
                      </h3>
                      <ul className="mt-3 space-y-1.5 text-[13px] leading-snug" style={{ color: "#575f75" }}>
                        {s.points.map((p) => (
                          <li key={p}>• {p}</li>
                        ))}
                      </ul>
                      <span
                        aria-hidden="true"
                        className="mt-5 inline-flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 group-hover:border-purple-bright group-hover:text-purple-bright"
                        style={{ borderColor: "rgba(13,16,32,0.12)", color: "#8890a4" }}
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
    <section style={{ backgroundColor: "#fbfaff" }}>
      <div className={`${WRAP} py-20 lg:py-28`}>
        <div className="max-w-2xl">
          <Eyebrow tone="light">Our approach</Eyebrow>
          <h2 className="mt-5 display-lg" style={{ color: "#0d1020" }}>
            <RevealText text="A structured path" stagger={70} />
            <span className="block">
              <RevealText text="to a safer" start={160} />{" "}
              <span className="text-purple-deep">
                <RevealText text="tomorrow." start={240} />
              </span>
            </span>
          </h2>
          <Reveal delay={180}>
            <p className="lead mt-6" style={{ color: "#575f75" }}>
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
                    className="inline-flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ background: "rgba(109,40,217,0.1)", color: "#6d28d9" }}
                  >
                    <Icon size={24} weight="bold" />
                  </span>
                  <div className="mt-5 font-mono text-[11px]" style={{ color: "#9a8fc9" }}>
                    {s.n}
                  </div>
                  <div className="mt-1 font-display text-lg font-semibold" style={{ color: "#0d1020" }}>
                    {s.t}
                  </div>
                  <p className="mt-1.5 max-w-[14rem] text-[13px] leading-relaxed" style={{ color: "#575f75" }}>
                    {s.d}
                  </p>
                </Reveal>
                {i < APPROACH_STEPS.length - 1 && (
                  <ArrowRight
                    size={18}
                    weight="bold"
                    className="mt-4 hidden shrink-0 sm:block"
                    style={{ color: "#c7bdf0" }}
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
/* Real impact — dark navy/purple statistics band                    */
/* ---------------------------------------------------------------- */
function RealImpact() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "var(--color-band)" }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 15% 20%, rgba(124,58,237,0.28), transparent 60%), radial-gradient(700px 460px at 90% 80%, rgba(109,40,217,0.22), transparent 62%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "repeating-linear-gradient(115deg, rgba(196,181,253,0.5) 0 1px, transparent 1px 64px)",
        }}
      />

      <div className={`${WRAP} relative py-16 lg:py-20`}>
        <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-bright">
          Real impact
        </div>
        <div className="mt-14 flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display-lg text-white">
            <RevealText text="Stronger" stagger={70} />
            <span className="block">
              <RevealText text="organizations." start={140} />
            </span>
            <span className="block">
              <RevealText text="Safer" start={220} />{" "}
              <span className="text-purple-bright">
                <RevealText text="tomorrows." start={280} />
              </span>
            </span>
          </h2>

          <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:max-w-2xl">
            {IMPACT_STATS.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
                  <CountUp to={s.v} suffix={s.suffix} />
                </dt>
                <dd className="mt-1.5 text-[12px] leading-snug" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <Reveal delay={160}>
          <div
            className="mt-14 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between"
            style={{ borderColor: "rgba(255,255,255,0.12)" }}
          >
            <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.6)" }}>
              Measured outcomes. Real business value.
            </p>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-purple-bright transition-colors hover:text-white"
            >
              View Case Studies
              <ArrowRight size={14} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Insights                                                           */
/* ---------------------------------------------------------------- */
function Insights() {
  return (
    <section style={{ backgroundColor: "#ffffff" }}>
      <div className={`${WRAP} py-20 lg:py-28`}>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow tone="light">Insights</Eyebrow>
            <h2 className="mt-5 display-lg" style={{ color: "#0d1020" }}>
              <RevealText text="Stay informed." stagger={70} />
              <span className="block">
                <RevealText text="Stay ahead." start={160} />
              </span>
            </h2>
            <p className="lead mt-5 max-w-md" style={{ color: "#575f75" }}>
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
                  className="flex h-full flex-col rounded-2xl border p-6"
                  style={{ borderColor: "rgba(13,16,32,0.1)" }}
                >
                  <span
                    className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: "#6d28d9" }}
                  >
                    {p.tag}
                  </span>
                  <h3
                    className="mt-3 flex-1 font-display text-lg font-semibold leading-snug tracking-[-0.01em]"
                    style={{ color: "#0d1020" }}
                  >
                    {p.t}
                  </h3>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-[12px]" style={{ color: "#8890a4" }}>
                      {p.date}
                    </span>
                    <span
                      aria-hidden="true"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border"
                      style={{ borderColor: "rgba(13,16,32,0.12)", color: "#8890a4" }}
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
      <Insights />
      <CtaBand />
    </>
  );
}

/* Final CTA — reused (as CtaBand) at the foot of every inner page. */
export function CtaBand() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "var(--color-band)" }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(700px 420px at 22% 30%,rgba(109,40,217,0.28),transparent 66%)",
        }}
      />
      <div className={`${WRAP} relative flex flex-col items-start justify-between gap-8 py-16 lg:flex-row lg:items-center lg:py-20`}>
        <div>
          <Eyebrow>Let&rsquo;s build a safer tomorrow</Eyebrow>
          <h2 className="mt-4 display-lg text-white">
            <RevealText text="Start the conversation." />
          </h2>
          <Reveal delay={140}>
            <p className="mt-4 max-w-md text-[15px]" style={{ color: "rgba(255,255,255,0.65)" }}>
              Discuss your challenges with our experts and discover how Envista Cyber Defence can
              help you stay ahead.
            </p>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <Btn to="/contact">Talk to an Expert</Btn>
        </Reveal>
      </div>
    </section>
  );
}
