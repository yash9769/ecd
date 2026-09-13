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
import Hero from "../components/hero/Hero";
import WhoWeAreSection from "../components/whoWeAre/WhoWeAreSection";
import { Btn, Eyebrow, Reveal, RevealText } from "../components/ui";
import { CountUp } from "../components/motion";
import {
  APPROACH,
  CAPABILITIES,
  COMPLIANCE,
  DIFFERENTIATORS,
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
/* Services — dark band                                              */
/* ---------------------------------------------------------------- */
function Services() {
  return (
    <section className="border-y border-line bg-ink">
      <div className={`${WRAP} py-24 lg:py-36`}>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Our services</Eyebrow>
            <h2 className="mt-5 display-lg">
              <RevealText text="Security From" stagger={70} />{" "}
              <span className="text-purple-bright">
                <RevealText text="Every Angle." start={200} />
              </span>
            </h2>
            <p className="lead mt-5">
              A comprehensive suite of offensive, defensive, compliance, data protection and
              training solutions — built for today's threat landscape.
            </p>
          </div>
          <Btn to="/capabilities" variant="ghost">
            View all services
          </Btn>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {CAPABILITIES.map((c, i) => {
            const Icon = SERVICE_ICON[c.icon];
            return (
              <li key={c.id}>
                <Reveal delay={(i % 3) * 70} className="h-full">
                  <Link
                    to={`/capabilities#${c.id}`}
                    className="group flex h-full flex-col surface rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple/50 hover:bg-surface"
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
          <h2 className="mt-5 display-lg">
            <RevealText text="A Proven Process" stagger={70} />
            <span className="block">
              <RevealText text="for Cyber-Driven Protection." start={220} />
            </span>
          </h2>
          <Reveal delay={160}>
            <p className="lead paper-muted mt-6">
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
      <div className={`${WRAP} py-24 lg:py-36`}>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>Why Envista</Eyebrow>
            <h2 className="mt-5 display-lg">
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

        <ul className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
          {DIFFERENTIATORS.map((d, i) => {
            const Icon = DIFF_ICON[d.icon];
            return (
              <li key={d.t}>
                <Reveal delay={i * 70} className="h-full">
                  <div className="h-full surface rounded-2xl p-7">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-purple/25 bg-purple/10 text-purple-bright"
                    >
                      <Icon size={22} weight="duotone" />
                    </span>
                    <h3 className="mt-5 display-md">{d.t}</h3>
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
      <div className={`${WRAP} py-24 lg:py-36`}>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Eyebrow tone="light">Who we serve</Eyebrow>
          <h2 className="mt-5 display-lg">
            <RevealText text="Securing What" stagger={70} />
            <span className="block">
              <RevealText text="Moves the World." start={200} />
            </span>
          </h2>
          <Reveal delay={160}>
            <p className="lead paper-muted mt-6">
              We work with enterprises, SMBs and government entities across diverse industries,
              helping them navigate complex threat landscapes and regulatory requirements.
            </p>
          </Reveal>
          </div>
          <Btn to="/industries" variant="light">
            Explore industries
          </Btn>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {INDUSTRIES.map((ind, i) => (
            <li key={ind.name}>
              <Reveal delay={i * 60} className="h-full">
                <div className="group flex h-full min-h-[230px] flex-col justify-end overflow-hidden rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1"
                  style={{
                    background: `linear-gradient(170deg, rgba(13,16,32,0.92), rgba(45,30,90,0.86))`,
                  }}
                >
                  <span className="font-display text-base font-bold text-white">{ind.name}</span>
                  <span className="mt-2 text-[12px] leading-snug text-white/60">{ind.d}</span>
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
          <h2 className="mt-5 display-lg">
            <RevealText text="6+ Frameworks Covered." stagger={70} />
            <span className="block text-purple-bright">
              <RevealText text="Audit-Ready. Always." start={220} />
            </span>
          </h2>
          <Reveal delay={160}>
            <p className="lead mt-5">
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

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {COMPLIANCE.map((c, i) => (
            <li key={c}>
              <Reveal delay={i * 55}>
                <div className="flex h-24 items-center justify-center surface rounded-2xl px-3 text-center font-mono text-[12px] tracking-[0.1em] text-muted transition-colors hover:border-purple/40 hover:text-fg">
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
      <div className={`${WRAP} py-24 lg:py-36`}>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow tone="light">Insights</Eyebrow>
            <h2 className="mt-5 display-lg">
              <RevealText text="Cybersecurity Insights" stagger={70} />
            </h2>
            <p className="lead paper-muted mt-5">
              Stay informed with the latest on data privacy, compliance, AI security and cyber
              threats — written by the Envista team.
            </p>
          </div>
          <Btn to="/insights" variant="light">
            View all insights
          </Btn>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
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
      <WhoWeAreSection />
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
          <h2 className="mt-5 max-w-2xl display-lg">
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
