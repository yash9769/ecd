import { Btn, Reveal } from "../ui";
import { HeroIndexColumn, HeroIndexRow } from "./HeroIndex";
import HeroMetrics from "./HeroMetrics";
import HeroPanels from "./HeroPanels";

/* Static hero: no scroll pin, no WebGL. The layered-planes graphic is plain
   CSS (shear, light, material), matched to the reference.

   Mobile is a separate composition rather than the desktop grid reflowed.
   Three named grid areas — text / stats / visual — are placed differently
   per breakpoint via grid-template-areas, so one set of markup produces two
   intentional layouts:

     < 768px   text -> stats -> visual, single column, normal vertical flow
     >= 768px  text and stats stacked left, visual spanning both rows right

   768px switches the whole hero at once: the two-column grid, the panel
   treatment (angled planes vs. stacked bars) and the index (tall ruled
   column vs. compact wrapped row) all change on the same breakpoint, so no
   intermediate width shows half of each composition. */
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

      <div className="relative mx-auto max-w-[1240px] px-6 pb-10 pt-24 md:pb-16 md:pt-28 lg:px-10 lg:pb-20 lg:pt-40">
        <div
          className={[
            "grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,46fr)_minmax(0,54fr)] md:items-center md:gap-8 lg:gap-10",
            "[grid-template-areas:'text'_'stats'_'visual']",
            "md:[grid-template-areas:'text_visual'_'stats_visual']",
          ].join(" ")}
        >
          <div className="max-w-[34rem]" style={{ gridArea: "text" }}>
            <div className="reveal font-mono text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#6d28d9" }}>
              Anticipate. Protect. Outperform.
            </div>

            {/* 2.75rem (44px) floor sits inside the 42-48px mobile target;
                the vw term only takes over once the viewport is wide enough
                for it to exceed that floor. */}
            <h1
              className="hero-rise mt-4 font-display text-[clamp(2.75rem,4.6vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.03em] lg:mt-6"
              style={{ color: "#0d1020" }}
            >
              <span className="block">Security</span>
              <span className="block">
                for what&rsquo;s <span className="text-purple-deep">next.</span>
              </span>
            </h1>

            <Reveal delay={120}>
              <p className="mt-5 max-w-md text-base leading-relaxed lg:mt-6" style={{ color: "#575f75" }}>
                We help organizations identify risks, strengthen defences and build lasting
                resilience in an increasingly complex threat landscape.
              </p>

              {/* Stacked below sm the two CTAs read as a deliberate pair rather
                  than a ragged stack: `w-fit` sizes the grid to the wider label
                  and the tracks stretch the narrower one to match, so neither
                  button is stretched edge-to-edge. From sm they sit in a row. */}
              <div className="mt-6 grid w-fit grid-cols-1 gap-3 sm:flex sm:w-auto sm:flex-wrap sm:items-center lg:mt-8">
                <Btn to="/contact">Talk to an Expert</Btn>
                <Btn to="/capabilities" variant="light">
                  Explore Our Services
                </Btn>
              </div>
            </Reveal>
          </div>

          <div style={{ gridArea: "stats" }}>
            <Reveal delay={180}>
              <HeroMetrics />
            </Reveal>
          </div>

          <div
            style={{ gridArea: "visual" }}
            className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-end lg:gap-8"
          >
            <HeroPanels />
            <HeroIndexColumn />
            <HeroIndexRow />
          </div>
        </div>
      </div>
    </section>
  );
}
