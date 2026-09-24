import { useRef } from "react";
import { Link } from "react-router";
import { ArrowRight } from "@phosphor-icons/react";
import HeroMetrics from "./HeroMetrics";
import HeroVisual from "./HeroVisual";
import { gsap, useGSAP } from "../../components/motion";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  /* GSAP entrance timeline — fires once on mount */
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-h1 span",  { opacity: 0, y: 32, stagger: 0.1, duration: 0.65 })
        .from(".hero-subtitle", { opacity: 0, y: 20, duration: 0.55 }, "-=0.3")
        .from(".hero-body",     { opacity: 0, y: 16, duration: 0.5  }, "-=0.3")
        .from(".hero-btns",     { opacity: 0, y: 14, duration: 0.5  }, "-=0.25")
        .from(".hero-visual",   { opacity: 0, x: 40, duration: 0.85, ease: "power2.out" }, "-=0.55")
        .from(".hero-metrics",  { opacity: 0, y: 18, duration: 0.5  }, "-=0.5");
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-[#150a2e] md:min-h-screen md:flex md:flex-col md:justify-center"
    >
      {/* Top-Left Subtle Dot Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[2%] top-[10%] hidden h-[100px] w-[100px] opacity-20 lg:block"
        style={{
          backgroundImage: "radial-gradient(rgba(148,163,184,0.4) 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Cyber aura blob (SentinelOne vibrant purple style) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          background: "radial-gradient(1200px 900px at 75% 50%, rgba(124, 58, 237, 0.4) 0%, rgba(79, 70, 229, 0.15) 50%, transparent 100%)",
        }}
      />
      {/* Aurora ambient layer */}
      <div className="aurora-bg block" aria-hidden="true" />

      {/* Luxurious luminous ambient nebula aura behind visual */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[0%] top-[2%] h-[640px] w-[640px] lg:h-[860px] lg:w-[860px] rounded-full opacity-50 blur-[140px] animate-pink-blob"
        style={{
          background:
            "radial-gradient(circle at 45% 45%, rgba(192, 132, 252, 0.32) 0%, rgba(168, 85, 247, 0.26) 30%, rgba(217, 70, 239, 0.18) 55%, rgba(99, 102, 241, 0.14) 75%, transparent 100%)",
        }}
      />

      {/* Bottom right atmospheric gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-[60%] w-[40%] opacity-30"
        style={{
          background: "radial-gradient(800px 600px at 100% 100%, rgba(151, 38, 182, 0.3) 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 pt-24 pb-8 sm:px-6 sm:pt-28 md:pt-18 md:pb-6 lg:px-10 lg:pt-20 lg:pb-8">
        <div
          className={[
            "grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,55fr)_minmax(0,45fr)] md:items-center md:gap-6 lg:gap-8 xl:gap-12",
            "[grid-template-areas:'text'_'visual'_'stats']",
            "md:[grid-template-areas:'text_visual'_'stats_visual']",
          ].join(" ")}
        >
          {/* Left Column: Eyebrow, Headline, Subtitle, Paragraph, Buttons */}
          <div className="w-full max-w-[42rem] lg:max-w-[45rem] xl:max-w-[48rem]" style={{ gridArea: "text" }}>
            {/* Headline */}
            <h1 className="hero-h1 mt-3 sm:mt-4 md:mt-5 lg:mt-6 font-display text-[clamp(42px,5.2vw,72px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
              <span className="block sm:inline">Security beyond the </span>
              <span className="block sm:inline">
                <span className="text-[#B4FF00] drop-shadow-[0_0_24px_rgba(180,255,0,0.4)]">surface.</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle mt-4 max-w-2xl text-[17px] font-semibold leading-snug text-slate-100 sm:text-[19px] lg:mt-5 lg:text-[21px]">
              Your Strategic cybersecurity for what&rsquo;s next.
            </p>

            {/* Paragraph */}
            <p className="hero-body mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-300 sm:text-[16px] lg:mt-4 lg:text-[17px]">
              We partner with organizations to identify risks, strengthen defences and{" "}
              <span className="underline decoration-1 underline-offset-4 decoration-slate-400">
                build lasting
              </span>{" "}
              resilience in an increasingly complex threat landscape.
            </p>

            {/* Buttons Row */}
            <div className="hero-btns mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 lg:mt-8">
              {/* Primary Green Button */}
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3 text-[14.5px] font-bold text-[#0d1020] transition-all duration-200 hover:brightness-110 active:scale-[0.98] sm:px-8 sm:py-3.5 lg:px-9 lg:py-4 lg:text-[15.5px]"
                style={{
                  backgroundColor: "#B4FF00",
                  boxShadow: "0 0 24px rgba(180,255,0,0.35)",
                }}
              >
                <span>Talk to an Expert</span>
                <ArrowRight size={16} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              {/* Secondary Outlined Button */}
              <Link
                to="/capabilities"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-[14.5px] font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/10 active:scale-[0.98] sm:px-8 sm:py-3.5 lg:px-9 lg:py-4 lg:text-[15.5px]"
              >
                <span>Explore Our Services</span>
                <ArrowRight size={16} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Metrics Row */}
          <div style={{ gridArea: "stats" }} className="hero-metrics pt-6 sm:pt-8 lg:pt-9 max-w-[44rem] lg:max-w-[48rem]">
            <HeroMetrics />
          </div>

          {/* Right Column: Hero Visual */}
          <div style={{ gridArea: "visual" }} className="hero-visual flex justify-center md:justify-center lg:justify-end md:self-center md:-mt-2 lg:-mt-4">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
