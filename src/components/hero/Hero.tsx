import { Btn, Reveal } from "../ui";
import HeroIndex from "./HeroIndex";
import HeroMetrics from "./HeroMetrics";
import HeroPanels from "./HeroPanels";

/* Static hero: no scroll pin, no WebGL. The layered-panels graphic is plain
   CSS (perspective + rotateY), matched to the reference rather than any
   cinematic sequence — light background throughout.

   Mobile is its own composition, not the desktop grid shrunk down: three
   named grid areas (text / visual / stats) are reordered per breakpoint via
   grid-template-areas rather than duplicating markup. On mobile the order is
   text -> visual -> stats, so the hero visual is one of the first things on
   screen instead of being buried below two rows of stats. On desktop the
   same three blocks resolve back to the original two-column layout: text
   and stats stacked on the left, the visual spanning both rows on the
   right. */
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

      <div className="relative mx-auto max-w-[1240px] px-6 pb-14 pt-24 lg:px-10 lg:pb-20 lg:pt-40">
        <div
          className={[
            "grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,46fr)_minmax(0,54fr)] lg:items-center lg:gap-10",
            "[grid-template-areas:'text'_'visual'_'stats']",
            "lg:[grid-template-areas:'text_visual'_'stats_visual']",
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

              <div className="mt-6 flex flex-wrap items-center gap-3 lg:mt-8">
                <Btn to="/contact">Talk to an Expert</Btn>
                <Btn to="/capabilities" variant="light">
                  Explore Our Services
                </Btn>
              </div>
            </Reveal>
          </div>

          <div style={{ gridArea: "visual" }} className="flex items-end justify-center gap-8 lg:justify-end">
            <HeroPanels />
            <HeroIndex />
          </div>

          <div style={{ gridArea: "stats" }}>
            <Reveal delay={180}>
              <HeroMetrics />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
