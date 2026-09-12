import { Kicker, Reveal, RevealText } from "../components/ui";
import { Tilt } from "../components/motion";
import { INSIGHTS } from "../data";
import { CtaBand } from "./Home";

const WRAP = "mx-auto max-w-[1320px] px-6 lg:px-10";

export default function Insights() {
  return (
    <>
      <section className={`${WRAP} pt-36 pb-16 lg:pt-44`}>
        <Kicker n="07">Insights</Kicker>
        <h1 className="mt-6 max-w-3xl font-display text-5xl font-extrabold leading-[1.0] tracking-[-0.03em] lg:text-7xl">
          <RevealText text="Field notes on modern defence." stagger={55} />
        </h1>
        <Reveal delay={200}>
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-muted">
            Signal on the shifting attack surface, governance under continuous scrutiny, and the
            new questions AI raises inside critical systems.
          </p>
        </Reveal>
      </section>

      <section className={`${WRAP} pb-24`}>
        <div className="grid gap-px border border-line bg-line md:grid-cols-3">
          {INSIGHTS.map((p, i) => (
            <Reveal key={p.t} delay={i * 90}>
              <Tilt max={5} className="h-full">
              <div className="group block h-full bg-ink p-8 transition-colors hover:bg-surface/70">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-purple-bright">{p.tag}</span>
                <h3 className="mt-5 font-display text-xl font-bold leading-snug transition-colors group-hover:text-violet">{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.d}</p>
                <span className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Coming soon</span>
              </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Light feature quote band */}
      <section className="paper relative">
        <div className={`${WRAP} py-24`}>
          <Reveal>
            <p className="max-w-4xl font-display text-3xl font-bold leading-[1.2] tracking-[-0.02em] text-[#14121a] lg:text-[2.7rem]">
              <RevealText text="The perimeter dissolved into identity, APIs and cloud. Defending it now means seeing the whole surface — continuously, at once." stagger={35} />
            </p>
            <div className="paper-muted mt-8 font-mono text-[11px] uppercase tracking-[0.2em]">Envista Cyber Defence</div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
