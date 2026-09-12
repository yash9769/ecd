import { Kicker, Reveal, RevealText } from "../components/ui";
import { COMPLIANCE } from "../data";
import { CtaBand } from "./Home";

const WRAP = "mx-auto max-w-[1320px] px-6 lg:px-10";

function TelemetryPanel() {
  const bars = [42, 68, 33, 81, 55, 90, 47, 72, 60, 38, 84, 52];
  return (
    <div className="relative overflow-hidden surface p-6">
      <div className="grain absolute inset-0" />
      <div className="relative flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-faint">
        <span>DEFENCE COVERAGE</span>
        <span className="text-faint">ILLUSTRATIVE</span>
      </div>
      <div className="relative mt-5 flex h-28 items-end gap-1.5">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-sm" style={{
            height: `${h}%`,
            background: i % 3 === 0 ? "linear-gradient(to top,#6d28d9,#a78bfa)" : "linear-gradient(to top,rgba(139,92,246,0.15),rgba(139,92,246,0.4))",
          }} />
        ))}
      </div>
      <div className="relative mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4 font-mono text-[10px] text-muted">
        <div><div className="text-fg text-sm">24/7</div>monitoring</div>
        <div><div className="text-fg text-sm">0-DAY</div>readiness</div>
        <div><div className="text-fg text-sm">MULTI</div>framework</div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <>
      <section className={`${WRAP} pt-36 pb-24 lg:pt-44`}>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Kicker n="05">About Envista</Kicker>
            <h1 className="mt-6 display-xl">
              <RevealText text="A cyber defence practice for organizations, individuals and governments." stagger={45} />
            </h1>
            <Reveal delay={250}>
              <p className="lead mt-8">
                Envista Cyber Defence exists to stop what others miss. We unify offensive rigour,
                defensive discipline and compliance-first governance into a single, accountable
                practice — protecting the people and institutions that cannot afford to be breached.
              </p>
              <p className="lead mt-4">
                As the attack surface expands, so does the ground an adversary can reach. Our work
                is to see it in full, test it honestly, and harden it where the blast radius is
                greatest.
              </p>
            </Reveal>
          </div>
          <Reveal delay={150}><TelemetryPanel /></Reveal>
        </div>
      </section>

      {/* Compliance — light band */}
      <section className="paper relative">
        <div className={`${WRAP} py-24`}>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="lg:max-w-sm">
              <Kicker n="06" tone="light">Compliance</Kicker>
              <h2 className="mt-6 display-lg text-[color:var(--color-paper-fg)]">
                <RevealText text="Aligned to the frameworks that matter." />
              </h2>
              <p className="paper-muted mt-5 text-sm leading-relaxed">
                We operate inside the standards our clients answer to — turning compliance from a
                checkbox into continuously evidenced advantage.
              </p>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-px sm:grid-cols-3 lg:max-w-2xl" style={{ background: "var(--color-paper-line)" }}>
              {COMPLIANCE.map((c, i) => (
                <Reveal key={c} delay={i * 60}>
                  <div className="flex items-center justify-center bg-white px-4 py-10 font-mono text-[13px] tracking-[0.14em] text-[color:var(--color-paper-fg)] transition-colors hover:text-purple-deep">
                    {c}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
