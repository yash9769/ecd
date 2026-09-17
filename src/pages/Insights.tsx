import { Kicker, Reveal, RevealText } from "../components/ui";
import { Tilt } from "../components/motion";
import { INSIGHTS } from "../data";
import { CtaBand } from "./Home";

const WRAP = "mx-auto max-w-[1320px] px-6 lg:px-10";

export default function Insights() {
  return (
    <>
      {/* Hero Section: Deep Royal Purple */}
      <section className="relative overflow-hidden bg-[#150a2e] pt-36 pb-20 text-white lg:pt-44 lg:pb-24">
        <div className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-violet-600/25 to-fuchsia-600/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-indigo-600/20 blur-[100px]" />
        
        <div className={WRAP}>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-violet-200">Envista Research & Insights</span>
          </div>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            <RevealText text="Field notes on modern cyber defence." stagger={45} />
          </h1>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-lg font-normal leading-relaxed text-[#d8cefa]">
              High-signal research on the shifting attack surface, DPDP compliance mandates, AI security governance, and zero-trust engineering.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Articles Grid: Crisp Pure White */}
      <section className="relative bg-white py-24 text-slate-900 border-y border-slate-100">
        <div className={WRAP}>
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#6d28d9]">Publications & Bulletins</span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#150c2e] md:text-4xl">Latest Threat Intelligence</h2>
            </div>
            <p className="max-w-md text-sm text-slate-600">
              Curated analyses written by Envista's offensive researchers, incident responders, and privacy compliance directors.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {INSIGHTS.map((p, i) => (
              <Reveal key={p.t} delay={i * 90}>
                <Tilt max={5} className="h-full">
                  <div className="group flex flex-col justify-between h-full rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="inline-block rounded-md bg-violet-50 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#6d28d9]">{p.tag}</span>
                        <span className="font-mono text-[11px] text-slate-400">Q3 2026</span>
                      </div>
                      <h3 className="mt-5 font-display text-xl font-bold leading-snug text-[#150c2e] transition-colors group-hover:text-[#6d28d9]">{p.t}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.d}</p>
                    </div>
                    <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="inline-block font-mono text-[11px] uppercase tracking-[0.16em] font-semibold text-violet-600 group-hover:translate-x-1 transition-transform">Read Insight →</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">5 min read</span>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Quote Band: Deep Royal Purple */}
      <section className="relative overflow-hidden bg-[#150a2e] py-24 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
        <div className={`${WRAP} relative`}>
          <Reveal>
            <div className="max-w-4xl">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-violet-300">Guiding Principle</span>
              <p className="mt-6 font-display text-2xl font-bold leading-snug tracking-[-0.01em] text-white md:text-3xl lg:text-4xl">
                <RevealText text="“The perimeter dissolved into identity, APIs and multi-cloud. Defending it now requires seeing the entire surface — continuously, intelligently, at once.”" stagger={25} />
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-400 flex items-center justify-center font-bold text-white text-sm">ECD</div>
                <div>
                  <div className="font-display text-sm font-bold text-white">Envista Cyber Defence Research Lab</div>
                  <div className="font-mono text-xs text-violet-300">Global Threat Research Team</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

