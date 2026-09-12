import { Eyebrow, Btn, Reveal, RevealText } from "../components/ui";
import { CtaBand } from "./Home";

const WRAP = "mx-auto max-w-[1240px] px-6 lg:px-10";

/* Engagement formats — what a piece of work with Envista actually looks like.
   Deliberately not client stories: named clients, figures and outcomes have to
   come from Envista, not be invented here. */
const FORMATS: { n: string; t: string; scope: string; d: string }[] = [
  {
    n: "01",
    t: "Adversary emulation",
    scope: "4–6 weeks",
    d: "A goal-based engagement against a defined crown-jewel objective, chaining real techniques across application, identity and cloud until the path is proven or closed.",
  },
  {
    n: "02",
    t: "Detection uplift",
    scope: "6–10 weeks",
    d: "Detection engineering against emulated activity: coverage mapped, rules written and tuned, and response runbooks rehearsed with the operating team.",
  },
  {
    n: "03",
    t: "DPDP readiness",
    scope: "8–12 weeks",
    d: "Data-flow mapping, consent architecture and accountability controls implemented across systems and processors, ending in an evidenced readiness position.",
  },
  {
    n: "04",
    t: "Audit readiness",
    scope: "6–12 weeks",
    d: "Control design and evidence pipelines built against the frameworks you answer to, so an audit draws on records the business already produces.",
  },
];

export default function CaseStudies() {
  return (
    <>
      <section className={`${WRAP} pt-32 pb-16 lg:pt-40`}>
        <Eyebrow>Case studies</Eyebrow>
        <h1 className="mt-5 max-w-3xl display-xl">
          <RevealText text="How engagements run." stagger={60} />
        </h1>
        <Reveal delay={180}>
          <p className="lead mt-7">
            Every engagement is scoped to a defined objective and ends in evidence you can put in
            front of a board or an auditor. These are the formats we run most often.
          </p>
        </Reveal>
      </section>

      <section className={`${WRAP} pb-24 lg:pb-36`}>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
          {FORMATS.map((f, i) => (
            <li key={f.n}>
              <Reveal delay={(i % 2) * 70} className="h-full">
                <article className="h-full surface rounded-2xl p-7 lg:p-9">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-purple-bright">
                      {f.n}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                      Typical {f.scope}
                    </span>
                  </div>
                  <h2 className="mt-5 display-md">{f.t}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{f.d}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <div className="mt-10 surface rounded-2xl p-8 lg:p-10">
            <h2 className="font-display text-xl font-bold">Looking for references?</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Detailed engagement references are shared directly, scoped to your sector and the
              controls you need evidence against.
            </p>
            <div className="mt-6">
              <Btn to="/contact">Request references</Btn>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
