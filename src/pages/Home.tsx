import { Link } from "react-router";
import AttackSurface from "../components/AttackSurface";
import { Btn, Kicker, Reveal, RevealText, SectionHead } from "../components/ui";
import { CountUp, Magnetic, Tilt } from "../components/motion";
import { StickySteps } from "../components/scroll";
import { Spotlight, Scramble } from "../components/fx";
import { CAPABILITIES, COMPLIANCE, METHOD } from "../data";

const WRAP = "mx-auto max-w-[1320px] px-6 lg:px-10";

const DISCIPLINES = [
  "Offensive",
  "Defensive",
  "GRC",
  "DPDP",
  "Training & MRA",
  "AI Audits",
];

/* ---------------------------------------------------------------- */
/* Hero                                                              */
/* ---------------------------------------------------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        className={`${WRAP} grid grid-cols-1 items-center gap-12 pt-32 pb-16 lg:grid-cols-[1.02fr_1fr] lg:gap-16 lg:pt-40 lg:pb-24`}
      >
        <div>
          <div className="reveal">
            <Kicker n="00">
              <Scramble text="ADVERSARY-GRADE CYBER DEFENCE" />
            </Kicker>
          </div>

          <h1 className="mt-7 font-display text-[clamp(2.6rem,7.4vw,5.1rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
            <RevealText text="Built to stop" stagger={70} />
            <span className="block">
              <RevealText text="what others miss." stagger={70} start={260} />
            </span>
          </h1>

          <Reveal delay={520}>
            <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-muted lg:text-base">
              Protecting organizations, individuals and governments from evolving cyber threats and
              data breaches — offensive testing, defensive operations and compliance-first
              governance under one accountable practice.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic strength={0.35}>
                <Btn to="/contact">Get protected</Btn>
              </Magnetic>
              <Btn to="/capabilities" variant="ghost">
                Explore services
              </Btn>
            </div>

            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6">
              {DISCIPLINES.map((d) => (
                <li
                  key={d}
                  className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint"
                >
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={220} className="relative">
          <Spotlight
            color="rgba(139,92,246,0.22)"
            className="overflow-hidden rounded-2xl border border-line bg-ink-2"
          >
            <div className="relative aspect-[880/620] w-full p-4">
              <AttackSurface />
            </div>
          </Spotlight>
        </Reveal>
      </div>

      {/* Credibility strip — proof sits directly under the hero, not buried */}
      <div className="border-t border-line bg-ink-2/60">
        <div className={`${WRAP} flex flex-col gap-5 py-6 lg:flex-row lg:items-center lg:justify-between`}>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
            Aligned to
          </span>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {COMPLIANCE.map((c) => (
              <li key={c} className="font-mono text-[12px] tracking-[0.12em] text-muted">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Operating principles                                              */
/* ---------------------------------------------------------------- */
const PRINCIPLES: [string, string][] = [
  [
    "Expertise",
    "Practitioner-led defence spanning application, cloud, identity and network — the full modern estate, tested the way attackers reach it.",
  ],
  [
    "Integrity",
    "Findings you can act on and evidence you can defend. What we surface, we prove; what we advise, we stand behind.",
  ],
  [
    "Compliance-first",
    "Security engineered around regulatory reality — so protection and obligation advance on the same track, not against each other.",
  ],
];

function Principles() {
  return (
    <section className={`${WRAP} border-b border-line py-20 lg:py-28`}>
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHead
          n="01"
          kicker="Operating principles"
          title="Expertise, integrity, compliance-first."
        />
        <div className="grid gap-px bg-line sm:grid-cols-3">
          {PRINCIPLES.map(([t, d], i) => (
            <Reveal key={t} delay={i * 70} className="bg-ink p-7">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-purple-bright">{t}</div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Services                                                          */
/* ---------------------------------------------------------------- */
function Services() {
  return (
    <section className={`${WRAP} border-b border-line py-20 lg:py-28`}>
      <SectionHead
        n="02"
        kicker="Capabilities"
        title="Six disciplines, one operating model."
        aside={
          <span className="text-muted">
            From adversary emulation and detection engineering to governance, data protection,
            capability-building and AI assurance.
          </span>
        }
      />
      <div className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((c, i) => (
          <Reveal key={c.id} delay={(i % 3) * 70} className="bg-ink">
            <Tilt max={4} className="h-full">
              <Link
                to={`/capabilities#${c.id}`}
                className="group relative flex h-full flex-col justify-between overflow-hidden p-7 transition-colors duration-300 hover:bg-surface/60 lg:p-9"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "linear-gradient(90deg,transparent,#8b5cf6,transparent)" }}
                />
                <div>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-purple-bright">{c.n}</span>
                  <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.01em]">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{c.line}</p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-faint transition-colors group-hover:text-fg">
                  View practice
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* At a glance — light band for contrast                             */
/* ---------------------------------------------------------------- */
const GLANCE: [number, string, string][] = [
  [6, "Security disciplines", "Under one operating model"],
  [4, "Methodology phases", "Discover → Sustain, continuous"],
  [6, "Frameworks aligned", "ISO, SOC 2, DPDP & more"],
];

function Glance() {
  return (
    <section className="paper relative">
      <div className={`${WRAP} py-20 lg:py-24`}>
        <Kicker n="04" tone="light">
          At a glance
        </Kicker>
        <div className="mt-10 grid gap-px sm:grid-cols-3" style={{ background: "rgba(20,18,26,0.14)" }}>
          {GLANCE.map(([to, label, sub], i) => (
            <Reveal key={label} delay={i * 70}>
              <div className="h-full bg-[#f2f0ea] p-8">
                <div className="font-display text-6xl font-extrabold tracking-[-0.03em] text-[#14121a] lg:text-7xl">
                  <CountUp to={to} />
                </div>
                <div className="mt-4 font-display text-lg font-bold text-[#14121a]">{label}</div>
                <div className="paper-muted mt-1 font-mono text-[10px] uppercase tracking-[0.16em]">{sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

export default function Home() {
  return (
    <>
      <Hero />
      <Principles />
      <Services />

      {/* Method — pinned scene, scroll-linked steps */}
      <section className="border-b border-line">
        <div className={`${WRAP} pt-20 lg:pt-28`}>
          <Kicker n="03">How we work</Kicker>
          <h2 className="mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.04] tracking-[-0.02em] lg:text-[3rem]">
            <RevealText text="A closed loop, not a one-off report." />
          </h2>
        </div>
        <StickySteps
          steps={METHOD}
          visual={
            <Spotlight
              color="rgba(139,92,246,0.2)"
              className="overflow-hidden rounded-2xl border border-line bg-ink-2"
            >
              <div className="relative aspect-[880/620] p-4">
                <AttackSurface />
              </div>
            </Spotlight>
          }
        />
      </section>

      <Glance />
      <CtaBand />
    </>
  );
}

export function CtaBand() {
  return (
    <section className={`${WRAP} py-20 lg:py-28`}>
      <Reveal>
        <div
          className="relative overflow-hidden rounded-2xl border border-line-strong p-10 text-center lg:p-20"
          style={{
            background:
              "radial-gradient(120% 140% at 50% 0%,rgba(124,58,237,0.26),rgba(14,16,23,0.5) 58%)",
          }}
        >
          <div aria-hidden="true" className="grain absolute inset-0" />
          <div className="relative">
            <div className="flex justify-center">
              <Kicker n="05">Get protected</Kicker>
            </div>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.025em] lg:text-6xl">
              <RevealText text="Stop what others miss." stagger={60} />
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-muted">
              Tell us where you need cover — we'll scope it from there.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Magnetic strength={0.35}>
                <Btn to="/contact">Get protected</Btn>
              </Magnetic>
              <Btn to="/methodology" variant="ghost">
                See the methodology
              </Btn>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
