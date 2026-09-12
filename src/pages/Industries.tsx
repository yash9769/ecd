import { Eyebrow, Reveal, RevealText } from "../components/ui";
import { INDUSTRIES } from "../data";
import { CtaBand } from "./Home";

const WRAP = "mx-auto max-w-[1240px] px-6 lg:px-10";

export default function Industries() {
  return (
    <>
      <section className={`${WRAP} pt-32 pb-16 lg:pt-40`}>
        <Eyebrow>Who we serve</Eyebrow>
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[1.04] tracking-[-0.035em] lg:text-[4rem]">
          <RevealText text="Securing What Moves the World." stagger={60} />
        </h1>
        <Reveal delay={200}>
          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-muted">
            We work with enterprises, SMBs and government entities across diverse industries,
            helping them navigate complex threat landscapes and regulatory requirements.
          </p>
        </Reveal>
      </section>

      <section className={`${WRAP} pb-20 lg:pb-28`}>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => (
            <li key={ind.name}>
              <Reveal delay={(i % 3) * 70} className="h-full">
                <div
                  className="flex h-full min-h-[240px] flex-col justify-end rounded-2xl border border-line p-7 transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(165deg, rgba(13,16,32,0.94), rgba(45,30,90,0.85))",
                  }}
                >
                  <h2 className="font-display text-xl font-bold text-fg">{ind.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{ind.d}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
