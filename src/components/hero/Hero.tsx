import { useCallback, useRef } from "react";
import { Btn, Reveal } from "../ui";
import HeroMetrics from "./HeroMetrics";
import HeroVisual, { HeroCanvas, StillComposition, useVisualEnvironment } from "./HeroVisual";
import { span, useScrollProgress, useSequenceEnabled } from "./useHeroSequence";

function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 700px at 74% 34%, rgba(59,50,140,0.28), transparent 62%), linear-gradient(180deg, #070812 0%, #06070d 55%, #05060b 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)",
          backgroundSize: "86px 86px",
          maskImage: "radial-gradient(ellipse 78% 68% at 52% 46%, #000 35%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 78% 68% at 52% 46%, #000 35%, transparent 78%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(180deg, transparent, #05060b)" }}
      />
    </div>
  );
}

function Copy() {
  return (
    <>
      <div className="reveal font-mono text-[11px] uppercase tracking-[0.28em] text-purple-bright">
        Enterprise cybersecurity
      </div>

      <h1 className="hero-rise mt-7 font-display text-[clamp(2.5rem,4.6vw,3.75rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-white">
        <span className="block">Built to Stop</span>
        <span className="block">
          What Others <span className="hero-accent">Miss.</span>
        </span>
      </h1>

      <Reveal delay={120}>
        <p className="mt-7 max-w-md text-[15px] leading-relaxed text-muted lg:text-base">
          Protecting organizations, individuals, and governments from evolving cyber threats and
          data breaches.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Btn to="/contact">Talk to an Expert</Btn>
          <Btn to="/capabilities" variant="ghost">
            Explore Our Services
          </Btn>
        </div>

        <div className="mt-12 lg:mt-14">
          <HeroMetrics />
        </div>
      </Reveal>
    </>
  );
}

const GRID =
  "mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[minmax(0,50fr)_minmax(0,50fr)] lg:gap-16 lg:px-10";

/* Plain hero: no pin, no scroll sequence. Used on touch, narrow viewports,
   without WebGL, and whenever reduced motion is requested. */
function StaticHero() {
  const progress = useRef(0);
  return (
    <section className="relative isolate overflow-hidden">
      <Backdrop />
      <div className={`${GRID} min-h-[100svh] pt-28 pb-16 lg:pt-24 lg:pb-20`}>
        <div className="max-w-[36rem]">
          <Copy />
        </div>
        <Reveal delay={220} className="lg:pl-4">
          <HeroVisual progress={progress} />
        </Reveal>
      </div>
    </section>
  );
}

/* Scroll-driven hero.

   A tall wrapper provides the scroll runway while the inner frame is pinned.
   Progress moves the shield to centre, fades the supporting layers, pushes the
   camera in, and finally blows the exposure out to white — handing off to the
   white section that follows. */
function SequenceHero() {
  const wrap = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const cue = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const { reduced } = useVisualEnvironment();

  const apply = useCallback((p: number) => {
    // Copy stays put through the early, subtle part of the sequence (the
    // shield is still small and off to the side) and only clears out once
    // the shield has become the primary focus, per the 40-60% band.
    if (copy.current) {
      const out = span(p, 0.4, 0.65);
      copy.current.style.opacity = String(1 - out);
      copy.current.style.transform = `translate3d(0,${-46 * out}px,0)`;
    }
    // The scroll cue only needs to disappear once the user has actually
    // started scrolling — not tied to the main copy's later fade.
    if (cue.current) cue.current.style.opacity = String(1 - span(p, 0.02, 0.15));
    // Backdrop lifts toward white alongside the in-scene exposure so the grid
    // and gradient don't linger behind the blowout.
    if (frame.current) frame.current.style.opacity = String(1 - span(p, 0.82, 0.97));
  }, []);

  const progress = useScrollProgress(wrap, true, apply);

  return (
    <div ref={wrap} className="relative" style={{ height: "260vh" }}>
      <section className="sticky top-0 h-[100svh] overflow-hidden">
        <div ref={frame} className="absolute inset-0">
          <Backdrop />
        </div>

        {/* Full-viewport canvas: the shield sits right-of-centre in world
            space, so at rest the composition matches the static hero. */}
        <div className="absolute inset-0">
          <HeroCanvas reduced={reduced} progress={progress} fullBleed />
        </div>

        <div className={`${GRID} pointer-events-none relative h-full`}>
          <div ref={copy} className="pointer-events-auto max-w-[36rem] will-change-transform">
            <Copy />
            <div
              ref={cue}
              className="mt-12 hidden items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-faint lg:flex"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-6 w-4 items-start justify-center rounded-full border border-line-strong pt-1"
              >
                <span className="h-1 w-1 rounded-full bg-purple-bright" />
              </span>
              Scroll to explore
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Hero() {
  const sequence = useSequenceEnabled();
  return sequence ? <SequenceHero /> : <StaticHero />;
}

/* Kept so the no-3D path still has a composed visual if imported directly. */
export { StillComposition };
