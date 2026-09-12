import { Kicker, Reveal, RevealText } from "../components/ui";
import { METHOD } from "../data";
import { CtaBand } from "./Home";

const WRAP = "mx-auto max-w-[1320px] px-6 lg:px-10";

export default function Methodology() {
  return (
    <>
      {/* Light paper page — deliberate contrast against the dark shell */}
      <section className="paper relative">
        <div className={`${WRAP} pt-36 pb-24 lg:pt-44`}>
          <Kicker n="04" tone="light">Methodology</Kicker>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-extrabold leading-[1.0] tracking-[-0.03em] text-[color:var(--color-paper-fg)] lg:text-7xl">
            <RevealText text="A defensible path from exposure to resilience." stagger={50} />
          </h1>
          <Reveal delay={200}>
            <p className="paper-muted mt-8 max-w-xl text-[15px] leading-relaxed">
              Every engagement runs the same closed loop — so protection is measurable, evidenced
              and defensible, never ad hoc.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-px" style={{ background: "var(--color-paper-line)" }}>
            {METHOD.map((m, i) => (
              <Reveal key={m.n} delay={i * 90}>
                <div className="grid grid-cols-1 items-start gap-6 bg-white px-2 py-9 sm:grid-cols-[120px_1fr_1fr]">
                  <span className="font-display text-6xl font-extrabold leading-none text-[#8b5cf6]">{m.n}</span>
                  <h3 className="font-display text-2xl font-bold text-[color:var(--color-paper-fg)]">{m.t}</h3>
                  <p className="paper-muted max-w-md text-[15px] leading-relaxed">{m.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-16 grid gap-px sm:grid-cols-3" style={{ background: "var(--color-paper-line)" }}>
              {[
                ["Discover → Sustain", "A continuous loop, not a one-off report."],
                ["Risk-ranked", "Effort follows exploitability and blast radius."],
                ["Framework-aware", "Mapped to the standards you are accountable to."],
              ].map(([t, d]) => (
                <div key={t} className="bg-white p-7">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8b5cf6]">{t}</div>
                  <p className="paper-muted mt-3 text-sm leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
