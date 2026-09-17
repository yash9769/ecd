import { Kicker, Reveal, RevealText } from "../components/ui";
import { METHOD } from "../data";
import { CtaBand } from "./Home";

const WRAP = "mx-auto max-w-[1320px] px-6 lg:px-10";

export default function Methodology() {
  return (
    <>
      {/* SECTION 1: HERO (PURPLE) */}
      <section className="relative overflow-hidden bg-[#150a2e] text-white pt-24 pb-12 transition-colors duration-300 dark:bg-[#0c061e] sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-16 lg:min-h-[75vh] lg:flex lg:flex-col lg:justify-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full opacity-40 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(124,58,237,0.15) 50%, transparent 70%)",
          }}
        />

        <div className={WRAP}>
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#c4b5fd] shadow-xs backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
              <span className="font-mono text-[10.5px] uppercase tracking-wider">Methodology</span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.12]">
              <RevealText text="A defensible path from exposure to resilience." stagger={50} />
            </h1>
            <Reveal delay={200}>
              <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[#d8cefa]">
                Every engagement runs the same closed loop — so protection is measurable, evidenced
                and defensible, never ad hoc.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 2: CLOSED LOOP STEPS (WHITE) */}
      <section className="border-t border-slate-200/80 bg-white py-10 sm:py-12 lg:py-16 transition-colors duration-300 dark:border-white/10 dark:bg-[#0c0e1a]">
        <div className={WRAP}>
          <div className="divide-y divide-slate-200/80 rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden dark:divide-white/10 dark:border-white/10 dark:bg-[#14182b]">
            {METHOD.map((m, i) => (
              <Reveal key={m.n} delay={i * 80}>
                <div className="grid grid-cols-1 items-start gap-3 p-5 transition-colors hover:bg-slate-50/70 dark:hover:bg-white/5 sm:grid-cols-[100px_1fr_1fr] sm:gap-5 sm:p-6">
                  <span className="font-display text-4xl font-extrabold leading-none text-[#6d28d9] dark:text-[#a78bfa]">{m.n}</span>
                  <h3 className="font-display text-xl font-bold text-[#150c2e] dark:text-white">{m.t}</h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#575f75] dark:text-slate-300">{m.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: METHODOLOGY PRINCIPLES (PURPLE) */}
      <section className="relative overflow-hidden bg-[#150a2e] text-white py-10 sm:py-12 lg:py-16 transition-colors duration-300 dark:bg-[#0c061e]">
        <div className={WRAP}>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Discover → Sustain", "A continuous loop, not a one-off report."],
              ["Risk-ranked", "Effort follows exploitability and blast radius."],
              ["Framework-aware", "Mapped to the standards you are accountable to."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-xl sm:rounded-2xl border border-white/12 bg-white/[0.06] p-5 sm:p-6 backdrop-blur-md">
                <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#c4b5fd]">{t}</div>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#d8cefa]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
