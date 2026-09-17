import { Eyebrow, Btn, Reveal, RevealText } from "../components/ui";
import { CtaBand } from "./Home";

const WRAP = "mx-auto max-w-[1240px] px-6 lg:px-10";

/* Engagement formats — what a piece of work with Envista actually looks like. */
const FORMATS: { n: string; t: string; scope: string; d: string }[] = [
  {
    n: "01",
    t: "Adversary Emulation & Crown-Jewel Exercise",
    scope: "4–6 weeks",
    d: "A goal-based engagement against a defined crown-jewel objective, chaining real techniques across application, identity and cloud until the path is proven or closed.",
  },
  {
    n: "02",
    t: "Detection Uplift & SOC Engineering",
    scope: "6–10 weeks",
    d: "Detection engineering against emulated activity: coverage mapped, rules written and tuned, and response runbooks rehearsed with the operating team.",
  },
  {
    n: "03",
    t: "DPDP Act Readiness & Privacy Mapping",
    scope: "8–12 weeks",
    d: "Data-flow mapping, consent architecture and accountability controls implemented across systems and processors, ending in an evidenced readiness position.",
  },
  {
    n: "04",
    t: "Audit Readiness & Regulatory Assurance",
    scope: "6–12 weeks",
    d: "Control design and evidence pipelines built against the frameworks you answer to, so an audit draws on records the business already produces.",
  },
];

export default function CaseStudies() {
  return (
    <>
      {/* SECTION 1: HERO (PURPLE) */}
      <section className="relative overflow-hidden bg-[#150a2e] text-white pt-32 pb-20 transition-colors duration-300 dark:bg-[#0c061e] lg:pt-40 lg:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full opacity-40 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(124,58,237,0.15) 50%, transparent 70%)",
          }}
        />

        <div className={WRAP}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#c4b5fd] shadow-xs backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
              <span className="font-mono text-[11px] uppercase tracking-wider">Case Studies</span>
            </div>
            <h1 className="mt-5 display-xl text-white">
              <RevealText text="How engagements run." stagger={60} />
            </h1>
            <Reveal delay={180}>
              <p className="lead mt-7 text-[#d8cefa]">
                Every engagement is scoped to a defined objective and ends in evidence you can put in
                front of a board or an auditor. These are the formats we run most often.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 2: ENGAGEMENT FORMATS (WHITE) */}
      <section className="border-t border-slate-200/80 bg-white py-20 transition-colors duration-300 dark:border-white/10 dark:bg-[#0c0e1a] lg:py-28">
        <div className={WRAP}>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {FORMATS.map((f, i) => (
              <li key={f.n}>
                <Reveal delay={(i % 2) * 70} className="h-full">
                  <article className="h-full rounded-2xl border border-slate-200/90 bg-[#faf8fe] p-8 transition-all hover:border-[#6d28d9] hover:shadow-lg dark:border-white/10 dark:bg-[#14182b] lg:p-9">
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-sm font-bold text-[#6d28d9] dark:text-[#a78bfa]">
                        {f.n}
                      </span>
                      <span className="rounded bg-violet-100/70 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#6d28d9] dark:bg-violet-950/60 dark:text-[#c4b5fd]">
                        Typical {f.scope}
                      </span>
                    </div>
                    <h2 className="mt-5 font-display text-2xl font-bold text-[#150c2e] dark:text-white">{f.t}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#575f75] dark:text-slate-300">{f.d}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal>
            <div className="mt-12 rounded-2xl border border-[#e4dfef] bg-[#faf8fe] p-8 shadow-sm dark:border-white/10 dark:bg-[#14182b] lg:p-10">
              <h2 className="font-display text-xl font-bold text-[#150c2e] dark:text-white">Looking for references?</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#575f75] dark:text-slate-300">
                Detailed engagement references are shared directly, scoped to your sector and the
                controls you need evidence against.
              </p>
              <div className="mt-6">
                <Btn to="/contact" variant="solid">Request references</Btn>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
