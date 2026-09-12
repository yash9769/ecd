import { Link } from "react-router";
import {
  ArrowRight,
  Brain,
  Bug,
  Certificate,
  Compass,
  GraduationCap,
  Lock,
  ShieldCheck,
  Stack,
  Target,
} from "@phosphor-icons/react";
import Shield from "../components/Shield";
import { Btn, Eyebrow, Reveal, RevealText } from "../components/ui";
import { CountUp } from "../components/motion";
import {
  APPROACH,
  CAPABILITIES,
  COMPLIANCE,
  DIFFERENTIATORS,
  HERO_STATS,
  INDUSTRIES,
  INSIGHTS,
  OUTCOMES,
  type Capability,
} from "../data";

const WRAP = "mx-auto max-w-[1240px] px-6 lg:px-10";

const SERVICE_ICON: Record<Capability["icon"], typeof Target> = {
  offensive: Target,
  defensive: ShieldCheck,
  grc: Certificate,
  dpdp: Lock,
  training: GraduationCap,
  ai: Brain,
};

const DIFF_ICON = { endToEnd: Stack, bridge: Compass, foresight: Bug };

/* ---------------------------------------------------------------- */
/* Hero                                                              */
/* ---------------------------------------------------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 520px at 78% 32%,rgba(109,40,217,0.24),transparent 68%)",
        }}
      />
      <div
        className={`${WRAP} relative grid grid-cols-1 items-center gap-12 pt-32 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:pt-36 lg:pb-20`}
      >
        <div>
          <div className="reveal">
            <Eyebrow>Enterprise cybersecurity</Eyebrow>
          </div>

          <h1 className="mt-6 font-display text-[clamp(2.5rem,6.4vw,4.4rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
            <RevealText text="Built to Stop" stagger={70} />
            <span className="block">
              <RevealText text="What" stagger={70} start={230} />{" "}
              <span className="text-purple-bright">
                <RevealText text="Others Miss." stagger={70} start={330} />
              </span>
            </span>
          </h1>

          <Reveal delay={520}>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
              Protecting organizations, individuals and governments from evolving cyber threats and
              data breaches.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Btn to="/contact">Talk to an expert</Btn>
              <Btn to="/capabilities" variant="ghost">
                Explore our services
              </Btn>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-line pt-8 sm:gap-6">
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-xl font-extrabold tracking-[-0.02em] text-fg sm:text-3xl">
                    {s.v}
                  </dt>
                  <dd className="mt-1.5 text-[11px] leading-snug text-muted sm:text-[13px]">
                    {s.label}
                    <span className="block text-faint">{s.sub}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-12 hidden items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-faint lg:flex">
              <span
                aria-hidden="true"
                className="inline-flex h-6 w-4 items-start justify-center rounded-full border border-line-strong pt-1"
              >
                <span className="h-1 w-1 rounded-full bg-purple-bright" />
              </span>
              Scroll to explore
            </div>
          </Reveal>
        </div>

        <Reveal delay={220}>
          <Shield />
          <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
            Cyber intelligence for a safer tomorrow
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Who we are — light band                                           */
/* ---------------------------------------------------------------- */
function WhoWeAre() {
  return (
    <section className="paper">
      <div className={`${WRAP} grid grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2 lg:py-28`}>
        <div>
          <Eyebrow tone="light">Who we are</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.06] tracking-[-0.03em] lg:text-[3.1rem]">
            <RevealText text="Comprehensive. Proactive." stagger={70} />{" "}
            <span className="text-purple-deep">
              <RevealText text="Secure." start={200} />
            </span>
          </h2>
          <Reveal delay={180}>
            <p className="paper-muted mt-6 max-w-md text-[15px] leading-relaxed">
              Envista Cyber Defence provides end-to-end cybersecurity capabilities designed to
              protect, comply and respond — helping enterprises, SMBs and government entities stay
              resilient in an evolving threat landscape.
            </p>
            <div className="mt-8">
              <Btn to="/about" variant="light">
                Learn more about us
              </Btn>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <RiskToResilience />
        </Reveal>
      </div>
    </section>
  );
}

/* Layered "risk to resilience" diagram for the light band. */
function RiskToResilience() {
  const layers = [
    { label: "Data", y: 0 },
    { label: "Infrastructure", y: 1 },
    { label: "Compliance", y: 2 },
  ];
  return (
    <div className="relative rounded-2xl border border-[color:var(--color-paper-line)] bg-[color:var(--color-paper-2)] p-8">
      <div className="font-display text-lg font-bold leading-snug text-[color:var(--color-paper-fg)]">
        From risk
        <br />
        to resilience.
      </div>
      <ul className="mt-8 space-y-3">
        {layers.map((l, i) => (
          <li
            key={l.label}
            className="flex items-center justify-between rounded-xl border border-[color:var(--color-paper-line)] bg-white px-5 py-4"
            style={{ marginLeft: `${i * 18}px` }}
          >
            <span className="text-sm font-semibold text-[color:var(--color-paper-fg)]">{l.label}</span>
            <span
              aria-hidden="true"
              className="h-1.5 w-16 rounded-full"
              style={{
                background: `linear-gradient(90deg,#6d28d9 ${(i + 1) * 30}%,rgba(13,16,32,0.08) ${(i + 1) * 30}%)`,
              }}
            />
          </li>
        ))}
      </ul>
      <div className="paper-muted mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
        Continuous protection
        <ArrowRight size={12} weight="bold" aria-hidden="true" />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Services — dark band                                              */
/* ---------------------------------------------------------------- */
function Services() {
  return (
    <section className="border-y border-line bg-ink">
      <div className={`${WRAP} py-20 lg:py-28`}>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Our services</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.06] tracking-[-0.03em] lg:text-[3.1rem]">
              <RevealText text="Security From" stagger={70} />{" "}
              <span className="text-purple-bright">
                <RevealText text="Every Angle." start={200} />
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
              A comprehensive suite of offensive, defensive, compliance, data protection and
              training solutions — built for today's threat landscape.
            </p>
          </div>
          <Btn to="/capabilities" variant="ghost">
            View all services
          </Btn>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => {
            const Icon = SERVICE_ICON[c.icon];
            return (
              <li key={c.id}>
                <Reveal delay={(i % 3) * 70} className="h-full">
                  <Link
                    to={`/capabilities#${c.id}`}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-surface/50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple/50 hover:bg-surface"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-purple/25 bg-purple/10 text-purple-bright transition-colors group-hover:bg-purple/20"
                    >
                      <Icon size={22} weight="duotone" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold tracking-[-0.01em]">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted">{c.promise}</p>
                    <span
                      aria-hidden="true"
                      className="mt-6 inline-flex h-8 w-8 items-center justify-center rounded-full border border-line-strong text-faint transition-all duration-300 group-hover:border-purple-bright group-hover:text-purple-bright"
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
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Approach — light band                                             */
/* ---------------------------------------------------------------- */
function Approach() {
  return (
    <section className="paper">
      <div className={`${WRAP} grid grid-cols-1 items-center gap-14 py-20 lg:grid-cols-2 lg:py-28`}>
        <Reveal className="order-2 lg:order-1">
          <ProcessStack />
        </Reveal>
        <div className="order-1 lg:order-2">
          <Eyebrow tone="light">Our approach</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.06] tracking-[-0.03em] lg:text-[2.9rem]">
            <RevealText text="A Proven Process" stagger={70} />
            <span className="block">
              <RevealText text="for Cyber-Driven Protection." start={220} />
            </span>
          </h2>
          <Reveal delay={160}>
            <p className="paper-muted mt-5 max-w-md text-[15px] leading-relaxed">
              With a focus on security and compliance, we help you stay protected in an
              ever-evolving threat landscape.
            </p>
            <ol className="mt-10 grid gap-8 sm:grid-cols-3">
              {APPROACH.map((a) => (
                <li key={a.n}>
                  <div className="font-display text-2xl font-extrabold text-purple-deep">{a.n}</div>
                  <div className="mt-2 text-sm font-bold text-[color:var(--color-paper-fg)]">{a.t}</div>
                  <p className="paper-muted mt-2 text-[13px] leading-relaxed">{a.d}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProcessStack() {
  const steps = ["Assess", "Design", "Execute"];
  return (
    <div className="relative">
      {steps.map((s, i) => (
        <div
          key={s}
          className="relative mb-3 flex items-center justify-between rounded-2xl border border-[color:var(--color-paper-line)] px-7 py-8"
          style={{
            marginLeft: `${i * 26}px`,
            background: `linear-gradient(115deg, rgba(109,40,217,${0.06 + i * 0.05}), rgba(56,189,248,0.05))`,
          }}
        >
          <span className="font-mono text-[12px] uppercase tracking-[0.24em] text-[color:var(--color-paper-fg)]">
            {s}
          </span>
          <span className="font-mono text-[11px] text-purple-deep">0{i + 1}</span>
        </div>
      ))}
      <div className="paper-muted mt-5 pl-1 font-mono text-[10px] uppercase tracking-[0.2em]">
        Continuous protection
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Why Envista — dark band                                           */
/* ---------------------------------------------------------------- */
function WhyEnvista() {
  return (
    <section className="border-y border-line bg-ink">
      <div className={`${WRAP} py-20 lg:py-28`}>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Why Envista</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.06] tracking-[-0.03em] lg:text-[3rem]">
              <RevealText text="The Difference Is" stagger={70} />
              <span className="block">
                <RevealText text="How You Approach Risk." start={220} />
              </span>
            </h2>
          </div>
          <Btn to="/about" variant="ghost">
            Why choose Envista
          </Btn>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {DIFFERENTIATORS.map((d, i) => {
            const Icon = DIFF_ICON[d.icon];
            return (
              <li key={d.t}>
                <Reveal delay={i * 70} className="h-full">
                  <div className="h-full rounded-2xl border border-line bg-surface/50 p-7">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-purple/25 bg-purple/10 text-purple-bright"
                    >
                      <Icon size={22} weight="duotone" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold leading-snug">{d.t}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{d.d}</p>
                  </div>
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
/* Industries — light band                                           */
/* ---------------------------------------------------------------- */
function Industries() {
  return (
    <section className="paper-tint">
      <div className={`${WRAP} grid grid-cols-1 gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-28`}>
        <div>
          <Eyebrow tone="light">Who we serve</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.06] tracking-[-0.03em] lg:text-[2.9rem]">
            <RevealText text="Securing What" stagger={70} />
            <span className="block">
              <RevealText text="Moves the World." start={200} />
            </span>
          </h2>
          <Reveal delay={160}>
            <p className="paper-muted mt-5 max-w-sm text-[15px] leading-relaxed">
              We work with enterprises, SMBs and government entities across diverse industries,
              helping them navigate complex threat landscapes and regulatory requirements.
            </p>
            <div className="mt-8">
              <Btn to="/industries" variant="light">
                Explore industries
              </Btn>
            </div>
          </Reveal>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {INDUSTRIES.map((ind, i) => (
            <li key={ind.name}>
              <Reveal delay={i * 60} className="h-full">
                <div className="group flex h-full min-h-[190px] flex-col justify-end overflow-hidden rounded-2xl border border-[color:var(--color-paper-line)] p-4 transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    background: `linear-gradient(170deg, rgba(13,16,32,0.92), rgba(45,30,90,0.86))`,
                  }}
                >
                  <span className="font-display text-sm font-bold text-white">{ind.name}</span>
                  <span className="mt-1 text-[11px] leading-snug text-white/55">{ind.d}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Frameworks — dark band                                            */
/* ---------------------------------------------------------------- */
function Frameworks() {
  return (
    <section className="border-y border-line bg-ink">
      <div className={`${WRAP} grid grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2 lg:py-28`}>
        <div>
          <Eyebrow>Frameworks &amp; compliance</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.06] tracking-[-0.03em] lg:text-[2.9rem]">
            <RevealText text="6+ Frameworks Covered." stagger={70} />
            <span className="block text-purple-bright">
              <RevealText text="Audit-Ready. Always." start={220} />
            </span>
          </h2>
          <Reveal delay={160}>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
              Envista aligns with leading security standards and regulatory frameworks to keep your
              organization protected and compliant.
            </p>
            <div className="mt-8">
              <Btn to="/methodology" variant="ghost">
                View all frameworks
              </Btn>
            </div>
          </Reveal>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {COMPLIANCE.map((c, i) => (
            <li key={c}>
              <Reveal delay={i * 55}>
                <div className="flex h-24 items-center justify-center rounded-2xl border border-line bg-surface/50 px-3 text-center font-mono text-[12px] tracking-[0.1em] text-muted transition-colors hover:border-purple/40 hover:text-fg">
                  {c}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Insights — light band                                             */
/* ---------------------------------------------------------------- */
function Insights() {
  return (
    <section className="paper">
      <div className={`${WRAP} py-20 lg:py-28`}>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow tone="light">Insights</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.03em] lg:text-[2.9rem]">
              <RevealText text="Cybersecurity Insights" stagger={70} />
            </h2>
            <p className="paper-muted mt-4 max-w-lg text-[15px] leading-relaxed">
              Stay informed with the latest on data privacy, compliance, AI security and cyber
              threats — written by the Envista team.
            </p>
          </div>
          <Btn to="/insights" variant="light">
            View all insights
          </Btn>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {INSIGHTS.map((p, i) => (
            <li key={p.t}>
              <Reveal delay={i * 70} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--color-paper-line)] bg-white">
                  <div
                    aria-hidden="true"
                    className="relative flex h-32 items-start overflow-hidden p-4"
                    style={{ background: "linear-gradient(150deg,#15102b,#33196b 58%,#6d28d9)" }}
                  >
                    <span
                      className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.07) 1px,transparent 1px)",
                        backgroundSize: "22px 22px",
                      }}
                    />
                    <span
                      className="absolute -right-6 -top-10 h-32 w-32 rounded-full"
                      style={{ background: "radial-gradient(circle,rgba(196,181,253,0.45),transparent 65%)" }}
                    />
                    <span className="relative rounded-full bg-white/20 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                      {p.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-base font-bold leading-snug text-[color:var(--color-paper-fg)]">
                      {p.t}
                    </h3>
                    <p className="paper-muted mt-2 flex-1 text-[13px] leading-relaxed">{p.d}</p>
                    <span className="paper-muted mt-5 font-mono text-[10px] uppercase tracking-[0.16em]">
                      {p.date}
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
      <WhoWeAre />
      <Services />
      <Approach />
      <WhyEnvista />
      <Industries />
      <Frameworks />
      <Insights />
      <CtaBand />
    </>
  );
}

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 420px at 22% 30%,rgba(109,40,217,0.28),transparent 66%)",
        }}
      />
      <div className={`${WRAP} relative grid grid-cols-1 items-center gap-12 py-20 lg:grid-cols-[1.35fr_0.65fr] lg:py-28`}>
        <div>
          <Eyebrow>Let's build a more secure tomorrow</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-extrabold leading-[1.06] tracking-[-0.03em] lg:text-[3rem]">
            <RevealText text="Your Security Posture Shouldn't Depend on What You Haven't Found Yet." />
          </h2>
          <Reveal delay={160}>
            <p className="mt-5 text-[15px] text-muted">
              Start a conversation with Envista Cyber Defence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn to="/contact">Talk to an expert</Btn>
              <Btn to="/capabilities" variant="ghost">
                Explore our services
              </Btn>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <ul className="space-y-3 lg:border-l lg:border-line lg:pl-8">
            {OUTCOMES.map((o, i) => (
              <li key={o} className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-faint">0{i + 1}</span>
                <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted">{o}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* Kept for pages that still surface the counted highlights. */
export function Glance() {
  const items: [number, string, string][] = [
    [6, "Security disciplines", "Under one operating model"],
    [4, "Methodology phases", "Discover → Sustain, continuous"],
    [6, "Frameworks aligned", "ISO, SOC 2, DPDP & more"],
  ];
  return (
    <section className="paper-tint">
      <div className={`${WRAP} py-20`}>
        <Eyebrow tone="light">At a glance</Eyebrow>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {items.map(([to, label, sub], i) => (
            <Reveal key={label} delay={i * 70}>
              <div className="h-full rounded-2xl border border-[color:var(--color-paper-line)] bg-white p-8">
                <div className="font-display text-5xl font-extrabold tracking-[-0.03em] text-[color:var(--color-paper-fg)]">
                  <CountUp to={to} />
                </div>
                <div className="mt-4 font-display text-base font-bold text-[color:var(--color-paper-fg)]">
                  {label}
                </div>
                <div className="paper-muted mt-1 font-mono text-[10px] uppercase tracking-[0.16em]">
                  {sub}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
