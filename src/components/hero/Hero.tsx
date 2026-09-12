import { Btn, Reveal } from "../ui";
import HeroMetrics from "./HeroMetrics";
import HeroVisual from "./HeroVisual";

/* Full-viewport editorial hero. Typography leads; the render supports it. */
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Atmosphere: a single soft gradient plus a fine technical grid.
          No large glowing circles, no particle field. */}
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
            WebkitMaskImage:
              "radial-gradient(ellipse 78% 68% at 52% 46%, #000 35%, transparent 78%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: "linear-gradient(180deg, transparent, #05060b)" }}
        />
      </div>

      <div className="mx-auto grid min-h-[100svh] max-w-[1240px] grid-cols-1 items-center gap-14 px-6 pt-28 pb-16 lg:grid-cols-[minmax(0,50fr)_minmax(0,50fr)] lg:gap-16 lg:px-10 lg:pt-24 lg:pb-20">
        <div className="max-w-[36rem]">
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
              Protecting organizations, individuals, and governments from evolving cyber threats
              and data breaches.
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
        </div>

        <Reveal delay={220} className="lg:pl-4">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}
