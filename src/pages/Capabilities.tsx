import { useEffect } from "react";
import { useLocation } from "react-router";
import { Kicker, Reveal, RevealText } from "../components/ui";
import { Tilt } from "../components/motion";
import { CAPABILITIES } from "../data";
import { CtaBand } from "./Home";

const WRAP = "mx-auto max-w-[1320px] px-6 lg:px-10";

export default function Capabilities() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [hash]);

  return (
    <>
      <section className={`${WRAP} pt-36 pb-16 lg:pt-44`}>
        <Kicker n="03">Capabilities</Kicker>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-extrabold leading-[1.0] tracking-[-0.03em] lg:text-7xl">
          <RevealText text="Comprehensive cybersecurity capabilities." stagger={50} />
        </h1>
        <Reveal delay={200}>
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-muted">
            Six disciplines under one operating model — from adversary emulation and detection
            engineering to governance, data protection, capability-building and AI assurance.
          </p>
        </Reveal>
      </section>

      <section className={`${WRAP} pb-24`}>
        <div className="grid gap-px border border-line bg-line md:grid-cols-2">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.id} delay={(i % 2) * 90}>
              <Tilt max={5} className="h-full">
              <article id={c.id} className="group relative h-full scroll-mt-28 overflow-hidden bg-ink p-8 transition-colors duration-300 hover:bg-surface/70 lg:p-10">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "linear-gradient(90deg,transparent,#8b5cf6,transparent)" }} />
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-purple-bright">{c.n}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">Practice</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.01em]">{c.title}</h3>
                <p className="mt-2 text-sm text-violet/80">{c.line}</p>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{c.body}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span key={t} className="border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-faint transition-colors group-hover:border-line-strong group-hover:text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Light closing band */}
      <section className="paper relative">
        <div className={`${WRAP} py-24`}>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-[#14121a] lg:text-[3rem]">
              <RevealText text="One team accountable for the whole surface." />
            </h2>
            <p className="paper-muted max-w-lg text-[15px] leading-relaxed">
              Offense proves the path, defense contains the intrusion, governance evidences the
              controls, and training hardens the human layer — closing the seams that single-point
              tools leave behind.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
