import { Btn, Reveal } from "../ui";
import HeroIndex from "./HeroIndex";
import HeroMetrics from "./HeroMetrics";
import HeroPanels from "./HeroPanels";

/* Static hero: no scroll pin, no WebGL. The layered-panels graphic is plain
   CSS (perspective + rotateY), matched to the reference rather than any
   cinematic sequence — light background throughout. */
export default function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 640px at 78% 8%, rgba(124,58,237,0.07), transparent 60%), linear-gradient(180deg,#ffffff,#fbfaff)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-6 pb-16 pt-32 lg:px-10 lg:pb-20 lg:pt-40">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,46fr)_minmax(0,54fr)] lg:gap-10">
          <div className="max-w-[34rem]">
            <div className="reveal font-mono text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#6d28d9" }}>
              Anticipate. Protect. Outperform.
            </div>

            <h1
              className="hero-rise mt-6 font-display text-[clamp(2.5rem,4.6vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.03em]"
              style={{ color: "#0d1020" }}
            >
              <span className="block">Security</span>
              <span className="block">
                for what&rsquo;s <span className="text-purple-deep">next.</span>
              </span>
            </h1>

            <Reveal delay={120}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed lg:text-base" style={{ color: "#575f75" }}>
                We help organizations identify risks, strengthen defences and build lasting
                resilience in an increasingly complex threat landscape.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Btn to="/contact">Talk to an Expert</Btn>
                <Btn to="/capabilities" variant="light">
                  Explore Our Services
                </Btn>
              </div>

              <div className="mt-12 lg:mt-14">
                <HeroMetrics />
              </div>
            </Reveal>
          </div>

          <div className="flex items-end justify-center gap-8 lg:justify-end">
            <HeroPanels />
            <HeroIndex />
          </div>
        </div>
      </div>
    </section>
  );
}
