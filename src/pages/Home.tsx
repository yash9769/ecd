import { Link } from "react-router";
import AttackSurface from "../components/AttackSurface";
import { Btn, Kicker, Reveal, RevealText, SectionHead } from "../components/ui";
import { CountUp, Magnetic, Parallax, Tilt } from "../components/motion";
import { ShaderBackground, Spotlight, Scramble, useMouseParallax } from "../components/fx";
import { HorizontalScroll, StickySteps } from "../components/scroll";
import { CAPABILITIES, METHOD } from "../data";

const WRAP = "mx-auto max-w-[1320px] px-6 lg:px-10";

export default function Home() {
  const scene = useMouseParallax(26);
  return (
    <>
      {/* 1. Hero — light "white" treatment with a cinematic dark scene */}
      <section className="paper relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 right-[-8%] h-[620px] w-[620px] rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle,rgba(139,92,246,0.45),transparent 60%)" }} />
          <div className="absolute bottom-[-20%] left-[-10%] h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
            style={{ background: "radial-gradient(circle,rgba(109,40,217,0.4),transparent 65%)" }} />
        </div>

        <div className={`${WRAP} relative grid grid-cols-1 items-center gap-10 pt-36 pb-24 lg:grid-cols-[1.02fr_1.1fr] lg:pt-44 lg:pb-32`}>
          <div>
            <div className="reveal">
              <Kicker n="00" tone="light">
                <Scramble text="ADVERSARY-GRADE CYBER DEFENCE" />
              </Kicker>
            </div>
            <h1 className="mt-7 font-display text-[13vw] font-extrabold leading-[0.92] tracking-[-0.03em] text-[#14121a] sm:text-[9vw] lg:text-[5.6rem]">
              <RevealText text="BUILT TO STOP" stagger={70} />
              <br />
              <span className="headline-gradient-dark">
                <RevealText text="WHAT OTHERS MISS." stagger={70} start={280} />
              </span>
            </h1>
            <Reveal delay={700}>
              <p className="paper-muted mt-8 max-w-md text-[15px] leading-relaxed">
                Protecting organizations, individuals, and governments from evolving cyber
                threats and data breaches.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Magnetic strength={0.4}><Btn to="/contact">Get Protected Today</Btn></Magnetic>
                <Magnetic strength={0.4}><Btn to="/capabilities" variant="dark">Explore Services</Btn></Magnetic>
              </div>
              <div className="mt-14 flex flex-wrap gap-x-10 gap-y-3 border-t pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-[#57545f]"
                style={{ borderColor: "rgba(20,18,26,0.14)" }}>
                <span>Offensive</span><span>Defensive</span><span>GRC</span>
                <span>DPDP</span><span>AI Audits</span>
              </div>
            </Reveal>
          </div>

          <Parallax speed={0.05} className="relative">
            <div ref={scene} style={{ transform: "translate(var(--px,0), var(--py,0))" }} className="transition-transform duration-200 ease-out">
              <Spotlight
                color="rgba(167,139,250,0.35)"
                className="overflow-hidden rounded-2xl border border-[rgba(167,139,250,0.18)] bg-ink shadow-[0_40px_120px_-30px_rgba(76,29,149,0.6)]"
              >
                <ShaderBackground className="absolute inset-0 h-full w-full opacity-50" />
                <Tilt max={7} className="relative aspect-[880/620] w-full p-4">
                  <div className="h-full w-full" style={{ animation: "drift 9s ease-in-out infinite" }}>
                    <AttackSurface />
                  </div>
                </Tilt>
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[rgba(167,139,250,0.18)]" />
              </Spotlight>
            </div>
          </Parallax>
        </div>
      </section>

      {/* 2. Ethos */}
      <section className={`${WRAP} border-t border-line py-24`}>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHead n="01" kicker="Operating principles"
            title="Built on expertise, integrity, and compliance-first thinking." />
          <div className="grid gap-px bg-line sm:grid-cols-3">
            {[
              ["Expertise", "Practitioner-led defence spanning application, cloud, identity and network — the full modern estate, tested the way attackers reach it."],
              ["Integrity", "Findings you can act on and evidence you can defend. What we surface, we prove; what we advise, we stand behind."],
              ["Compliance-first", "Security engineered around regulatory reality — so protection and obligation advance on the same track, not against each other."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 90} className="bg-ink p-7">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-purple-bright">{t}</div>
                <p className="mt-4 text-sm leading-relaxed text-muted">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Security intelligence */}
      <section className={`${WRAP} border-t border-line py-24`}>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="order-2 lg:order-1">
            <div className="relative overflow-hidden border border-line bg-surface/50 p-8">
              <div className="grain absolute inset-0" />
              <div className="relative aspect-[880/620]"><AttackSurface /></div>
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <Kicker n="02">Security Intelligence</Kicker>
            <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] lg:text-[3rem]">
              <RevealText text="Your attack surface, mapped in full." />
            </h2>
            <Reveal delay={150}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
                Cloud, APIs, identity and data no longer sit behind a single wall. We continuously
                map every asset, path and trust boundary — so exposure is quantified and closed
                before an adversary reaches it.
              </p>
              <div className="mt-8 grid gap-px bg-line sm:grid-cols-2">
                {[
                  ["Assets & nodes", "Estate & dependencies"],
                  ["Lateral paths", "Movement & blast radius"],
                  ["Identity", "Access & trust boundaries"],
                  ["Data & APIs", "Where value concentrates"],
                ].map(([t, d]) => (
                  <div key={t} className="bg-ink p-5">
                    <div className="text-sm text-fg">{t}</div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{d}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sticky storytelling — pinned scene, scroll-linked steps */}
      <section className="border-t border-line">
        <div className={`${WRAP} pt-20`}>
          <Kicker n="03">How we work</Kicker>
          <h2 className="mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.04] tracking-[-0.02em] lg:text-[3rem]">
            <RevealText text="A closed loop, not a one-off report." />
          </h2>
        </div>
        <StickySteps
          steps={METHOD}
          visual={
            <Spotlight color="rgba(167,139,250,0.3)" className="overflow-hidden rounded-2xl border border-line bg-ink">
              <ShaderBackground className="absolute inset-0 h-full w-full opacity-40" />
              <div className="relative aspect-[880/620] p-4" style={{ animation: "drift 10s ease-in-out infinite" }}>
                <AttackSurface />
              </div>
            </Spotlight>
          }
        />
      </section>

      {/* Light band: approach */}
      <section className="paper relative">
        <div className={`${WRAP} py-24`}>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <Kicker n="03" tone="light">Unified defence</Kicker>
              <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] lg:text-[3rem]">
                <RevealText text="Offense, defense and governance — one accountable operating model." />
              </h2>
            </div>
            <Reveal delay={120}>
              <p className="paper-muted max-w-xl text-[15px] leading-relaxed">
                Security bought in fragments leaves seams between tools and teams — exactly where
                intrusions live. We run the full loop: emulate like the adversary, defend like the
                operator, govern like the regulator. Nothing falls through the gaps.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-px" style={{ background: "rgba(20,18,26,0.12)" }}>
                {[
                  ["Offense", "Prove exploitability"],
                  ["Defense", "Contain intrusions"],
                  ["Govern", "Evidence controls"],
                  ["Sustain", "Hold the line"],
                ].map(([t, d]) => (
                  <div key={t} className="bg-[#f2f0ea] p-6">
                    <div className="font-display text-xl font-bold text-[#14121a]">{t}</div>
                    <div className="paper-muted mt-1 font-mono text-[10px] uppercase tracking-[0.16em]">{d}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Light band: at a glance (counts, not invented metrics) */}
      <section className="paper relative">
        <div className={`${WRAP} py-20`}>
          <Kicker n="04" tone="light">At a glance</Kicker>
          <div className="mt-10 grid gap-px sm:grid-cols-3" style={{ background: "rgba(20,18,26,0.12)" }}>
            {[
              [6, "", "Security disciplines", "Under one operating model"],
              [4, "", "Methodology phases", "Discover → Sustain, continuous"],
              [6, "", "Frameworks aligned", "ISO, SOC 2, DPDP & more"],
            ].map(([to, suffix, label, sub], i) => (
              <Reveal key={label as string} delay={i * 100}>
                <div className="bg-[#f2f0ea] p-8">
                  <div className="font-display text-6xl font-extrabold tracking-[-0.03em] text-[#14121a] lg:text-7xl">
                    <CountUp to={to as number} suffix={suffix as string} />
                  </div>
                  <div className="mt-4 font-display text-lg font-bold text-[#14121a]">{label}</div>
                  <div className="paper-muted mt-1 font-mono text-[10px] uppercase tracking-[0.16em]">{sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities — horizontal scroll-linked strip */}
      <section className="border-t border-line">
        <div className={`${WRAP} pt-24`}>
          <SectionHead n="04" kicker="Capabilities" title="Comprehensive cybersecurity capabilities."
            aside={<span className="text-muted">Scroll — six disciplines, one operating model, from adversary emulation to AI assurance.</span>} />
        </div>
        <HorizontalScroll>
          {CAPABILITIES.map((c) => (
            <Tilt key={c.id} max={7} className="w-[78vw] shrink-0 sm:w-[52vw] lg:w-[30vw]">
              <Link
                to={`/capabilities#${c.id}`}
                className="group relative flex h-[54vh] flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface/40 p-8 transition-colors hover:bg-surface/70 lg:p-10"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "linear-gradient(90deg,transparent,#8b5cf6,transparent)" }} />
                <div>
                  <span className="font-mono text-[11px] tracking-[0.2em] text-purple-bright">{c.n}</span>
                  <h3 className="mt-6 font-display text-3xl font-bold tracking-[-0.01em]">{c.title}</h3>
                  <p className="mt-3 text-[15px] text-violet/80">{c.line}</p>
                  <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">{c.body}</p>
                </div>
                <span className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-faint transition-colors group-hover:text-fg">
                  View practice →
                </span>
              </Link>
            </Tilt>
          ))}
        </HorizontalScroll>
      </section>

      {/* CTA */}
      <CtaBand />
    </>
  );
}

export function CtaBand() {
  return (
    <section className="mx-auto max-w-[1320px] px-6 pb-28 pt-4 lg:px-10">
      <Reveal>
        <div className="relative overflow-hidden border border-line-strong p-10 text-center lg:p-20"
          style={{ background: "radial-gradient(120% 140% at 50% 0%,rgba(124,58,237,0.28),rgba(13,13,22,0.4) 55%)" }}>
          <div className="grain absolute inset-0" />
          <div className="relative">
            <div className="flex justify-center"><Kicker n="09">Get Protected</Kicker></div>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.02em] lg:text-6xl">
              <RevealText text="Stop what others miss. Start today." stagger={60} />
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-muted">
              Protecting organizations, individuals, and governments from evolving cyber
              threats and data breaches.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Magnetic strength={0.4}><Btn to="/contact">Get Protected Today</Btn></Magnetic>
              <Magnetic strength={0.4}><Btn to="/capabilities" variant="ghost">Explore Services</Btn></Magnetic>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
