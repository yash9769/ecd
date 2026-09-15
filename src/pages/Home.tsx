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
        {/* Hairline separators between sectors, as in the reference — the row
            reads as one ruled band rather than six loose items. */}
        <ul className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:flex lg:flex-1 lg:items-stretch lg:justify-between lg:gap-0">
          {TRUSTED_INDUSTRIES.map((ind, i) => {
            const Icon = INDUSTRY_ICON[ind.icon];
            return (
              <li
                key={ind.name}
                className={`flex flex-col items-center gap-2 text-center lg:flex-1 lg:px-6 ${i > 0 ? "lg:border-l" : ""}`}
                style={{ borderColor: "rgba(13,16,32,0.09)" }}
              >
                <Icon size={22} weight="light" style={{ color: "#3b2f6b" }} aria-hidden="true" />
                <span className="text-[12.5px] font-medium" style={{ color: "#3a3f52" }}>
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
/* Inset rounded card, not a full-bleed band — in the reference this section
   floats on the white page with margins on both sides and softly curved
   contour lines sweeping through its right half. */
function RealImpact() {
  return (
    <section style={{ backgroundColor: "#ffffff" }}>
      <div className={`${WRAP} py-6 lg:py-10`}>
        <div
          className="relative overflow-hidden rounded-[20px] px-8 py-12 lg:px-14 lg:py-14"
          style={{ backgroundColor: "var(--color-band)" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(760px 420px at 12% 18%, rgba(124,58,237,0.30), transparent 62%), radial-gradient(620px 420px at 92% 88%, rgba(109,40,217,0.24), transparent 64%)",
            }}
          />
          {/* Contour sweep: concentric ellipses clipped to the card's right
              side, faint enough to read as texture rather than graphics. */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 top-0 h-full w-[46%] opacity-[0.28]"
            viewBox="0 0 400 300"
            preserveAspectRatio="none"
            fill="none"
          >
            {[0, 1, 2, 3, 4, 5, 6].map((n) => (
              <path
                key={n}
                d={`M ${300 - n * 26} -40 C ${190 - n * 22} 90, ${250 - n * 24} 190, ${392 - n * 26} 340`}
                stroke="rgba(196,181,253,0.55)"
                strokeWidth="1"
              />
            ))}
          </svg>

          <div className="relative">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-bright">
              Real impact
            </div>

            <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
              <h2 className="display-lg shrink-0 text-white">
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

              <dl className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 lg:flex-1">
                {IMPACT_STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="font-display text-[30px] font-bold leading-none tracking-[-0.02em] text-white">
                      <CountUp to={s.v} suffix={s.suffix} />
                    </dt>
                    <dd className="mt-2 text-[12px] leading-snug" style={{ color: "rgba(255,255,255,0.58)" }}>
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>

              <Reveal delay={160} className="shrink-0 lg:text-right">
                <p className="text-[13.5px] leading-snug" style={{ color: "rgba(255,255,255,0.72)" }}>
                  Measured outcomes.
                  <br className="hidden lg:block" /> Real business value.
                </p>
                <Link
                  to="/case-studies"
                  className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-purple-bright transition-colors hover:text-white"
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
      {/* Three columns in the reference: heading, supporting copy, action. */}
      <div className={`${WRAP} relative grid grid-cols-1 items-center gap-8 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)_auto] lg:gap-12 lg:py-[72px]`}>
        <div>
          <Eyebrow>Let&rsquo;s build a safer tomorrow</Eyebrow>
          {/* Sized to hold on one line in its column, as in the reference,
              rather than using the full display-lg scale. */}
          <h2 className="mt-4 font-display text-[clamp(1.9rem,3vw,2.55rem)] font-extrabold leading-[1.06] tracking-[-0.035em] text-white">
            <RevealText text="Start the conversation." />
          </h2>
        </div>
        <Reveal delay={140}>
          <p className="max-w-md text-[14.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.68)" }}>
            Discuss your challenges with our experts and discover how Envista Cyber Defence can help
            you stay ahead.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <Btn to="/contact">Talk to an Expert</Btn>
        </Reveal>
      </div>
    </section>
  );
}
