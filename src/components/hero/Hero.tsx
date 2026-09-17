import { Link } from "react-router";
import { ArrowRight } from "@phosphor-icons/react";
import HeroMetrics from "./HeroMetrics";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f6eefb] transition-colors duration-300 dark:bg-[#0e0822] md:min-h-screen md:flex md:flex-col md:justify-center">
      {/* Top-Left Subtle Dot Grid Pattern matching reference */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[2%] top-[10%] hidden h-[100px] w-[100px] opacity-40 lg:block dark:opacity-25"
        style={{
          backgroundImage: "radial-gradient(rgba(124,58,237,0.4) 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Huge soft organic gradient blob on the right (Light Mode) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[120%] w-[60%] lg:w-[50%] transition-opacity duration-300 dark:opacity-0"
        style={{
          background: "radial-gradient(1200px 900px at 70% 50%, rgba(216, 184, 232, 0.45) 0%, rgba(246, 238, 251, 0.2) 60%, transparent 100%)",
        }}
      />
      {/* Huge cyber aura blob on the right (Dark Mode) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[120%] w-[60%] lg:w-[50%] opacity-0 transition-opacity duration-300 dark:opacity-100"
        style={{
          background: "radial-gradient(1200px 900px at 70% 50%, rgba(124, 58, 237, 0.22) 0%, rgba(79, 70, 229, 0.08) 50%, transparent 100%)",
        }}
      />

      {/* Bottom right purple atmospheric gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-[60%] w-[40%] transition-opacity duration-300 dark:opacity-20"
        style={{
          background: "radial-gradient(800px 600px at 100% 100%, rgba(151, 38, 182, 0.15) 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1380px] px-5 pt-28 pb-10 sm:px-6 sm:pt-32 md:pt-20 md:pb-6 lg:px-10 lg:pt-24 lg:pb-8">
        <div
          className={[
            "grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] md:items-center md:gap-6 lg:gap-8",
            "[grid-template-areas:'text'_'visual'_'stats']",
            "md:[grid-template-areas:'text_visual'_'stats_visual']",
          ].join(" ")}
        >
          {/* Left Column: Eyebrow, Headline, Subtitle, Paragraph, Buttons */}
          <div className="max-w-[34rem]" style={{ gridArea: "text" }}>
            {/* Kicker: ANTICIPATE. PROTECT. OUTPERFORM. */}
            <div
              className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#4f46e5] dark:text-[#818cf8] lg:text-[11.5px]"
            >
              ANTICIPATE. PROTECT. OUTPERFORM.
            </div>

            {/* Headline matching exact reference typography */}
            <h1
              className="mt-3 font-display text-[clamp(34px,8vw,54px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0d1020] dark:text-white lg:mt-4 transition-colors duration-300"
            >
              <span className="block">Security</span>
              <span className="block">beyond the</span>
              <span className="block">
                <span className="brand-gradient-text">surface.</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="mt-3 max-w-md text-[15px] font-semibold leading-snug text-[#1e293b] dark:text-slate-200 sm:text-[16px] lg:mt-3.5 lg:text-[17px] transition-colors duration-300"
            >
              Your Strategic cybersecurity for what&rsquo;s next.
            </p>

            {/* Paragraph with underline on "build lasting" */}
            <p
              className="mt-2.5 max-w-md text-[13.5px] leading-relaxed text-[#575f75] dark:text-slate-400 lg:text-[14.5px] transition-colors duration-300"
            >
              We partner with organizations to identify risks, strengthen defences and{" "}
              <span className="underline decoration-1 underline-offset-4 decoration-slate-400 dark:decoration-slate-500">
                build lasting
              </span>{" "}
              resilience in an increasingly complex threat landscape.
            </p>

            {/* Buttons Row */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:mt-7">
              {/* Primary Purple Button */}
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] lg:px-7 lg:py-3"
                style={{
                  backgroundColor: "#4f46e5",
                  boxShadow: "0 8px 24px -6px rgba(79,70,229,0.55)",
                }}
              >
                <span>Talk to an Expert</span>
                <ArrowRight
                  size={15}
                  weight="bold"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              {/* Secondary Outlined Button */}
              <Link
                to="/capabilities"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-300/80 bg-white/60 px-6 py-3 text-[13.5px] font-semibold text-[#0d1020] backdrop-blur-md transition-all duration-200 hover:bg-white dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 active:scale-[0.98] lg:px-7 lg:py-3"
              >
                <span>Explore Our Services</span>
                <ArrowRight
                  size={15}
                  weight="bold"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* Left Column: Metrics Row */}
          <div style={{ gridArea: "stats" }} className="pt-2 lg:pt-3">
            <HeroMetrics />
          </div>

          {/* Right Column: Hero Visual with Orbits & Cards */}
          <div
            style={{ gridArea: "visual" }}
            className="flex justify-center md:justify-end"
          >
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
