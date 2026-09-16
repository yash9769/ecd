import { Btn, Reveal } from "../ui";
import { HeroProcessColumn, HeroProcessRow } from "./HeroProcess";
import HeroMetrics from "./HeroMetrics";
import HeroVisual from "./HeroVisual";

/* Static hero: no scroll pin, no WebGL. The hero visual — a central shield
   with four service cards around it — is plain CSS/SVG (rings, cards,
   the real shield mark), not a photograph or 3D scene.

   Mobile is a separate composition rather than the desktop grid reflowed.
   Three named grid areas — text / stats / visual — are placed differently
   per breakpoint via grid-template-areas, so one set of markup produces two
   intentional layouts:

     < 768px   text -> stats -> visual, single column, normal vertical flow
     >= 768px  text and stats stacked left, visual spanning both rows right

   768px switches the two-column grid and the visual treatment (orbit
   system vs. stacked grid) together, so no intermediate width shows half of
   each composition. The process indicator switches separately at xl
   (1280px): the orbit system's four fixed-width service cards need the
   full visual column to avoid overlapping each other, so the tall ruled
   column only sits beside them once there's room for both. */
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

      {/* Soft blob shapes anchored to the section's own corners, not the
          viewport — `overflow-hidden` on the section clips whatever
          spills past its edge, so these stay put at every width instead of
          drifting into the content the way a viewport-relative position
          would. Blurred and low-opacity: texture, not a visible shape. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[30%] -left-[12%] h-[70%] w-[55%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(167,139,250,0.32), transparent 72%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[20%] right-[4%] h-[42%] w-[30%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(196,181,253,0.28), transparent 72%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[6%] top-[10%] hidden h-[120px] w-[120px] lg:block"
        style={{
          backgroundImage: "radial-gradient(rgba(124,58,237,0.18) 1px, transparent 1.4px)",
          backgroundSize: "16px 16px",
          maskImage: "radial-gradient(circle, black 40%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-6 pb-10 pt-24 md:pb-16 md:pt-28 lg:px-10 lg:pb-16 lg:pt-36">
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
              <span className="block">beyond the</span>
              <span className="block text-purple-deep">surface.</span>
            </h1>

            <Reveal delay={100}>
              <p className="mt-4 max-w-md text-[17px] font-semibold leading-snug lg:mt-5" style={{ color: "#241b4f" }}>
                Strategic cybersecurity for what&rsquo;s next.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: "#575f75" }}>
                We partner with organizations to identify risks, strengthen defences and build
                lasting resilience in an increasingly complex threat landscape.
              </p>

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
            className="flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-end xl:gap-8"
          >
            <HeroVisual />
            <HeroProcessColumn />
            <HeroProcessRow />
          </div>
        </div>
      </div>
    </section>
  );
}
