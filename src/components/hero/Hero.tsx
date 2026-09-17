import { Link } from "react-router";
import { ArrowRight } from "@phosphor-icons/react";
import HeroMetrics from "./HeroMetrics";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white md:min-h-screen md:flex md:flex-col md:justify-center">
      {/* Top-Left Subtle Dot Grid Pattern matching reference */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[2%] top-[10%] hidden h-[100px] w-[100px] opacity-40 lg:block"
        style={{
          backgroundImage: "radial-gradient(rgba(124,58,237,0.4) 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Huge soft organic gradient blob on the right matching reference */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[120%] w-[60%] lg:w-[50%]"
        style={{
          background: "radial-gradient(1200px 900px at 70% 50%, rgba(235, 225, 255, 0.7) 0%, rgba(245, 238, 255, 0.2) 50%, transparent 100%)",
        }}
      />
      {/* Bottom right purple atmospheric gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-[60%] w-[40%]"
        style={{
          background: "radial-gradient(800px 600px at 100% 100%, rgba(220, 205, 255, 0.5) 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1380px] px-6 pt-20 pb-6 md:pt-16 md:pb-4 lg:px-10 lg:pt-18 lg:pb-6">
        <div
          className={[
            "grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] md:items-center md:gap-6 lg:gap-8",
            "[grid-template-areas:'text'_'visual'_'stats']",
            "md:[grid-template-areas:'text_visual'_'stats_visual']",
          ].join(" ")}
        >
          {/* Left Column: Eyebrow, Headline, Subtitle, Paragraph, Buttons */}
          <div className="max-w-[34rem]" style={{ gridArea: "text" }}>
            {/* Kicker: ANTICIPATE. PROTECT. OUTPERFORM. */}
            <div
              className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] lg:text-[11.5px]"
              style={{ color: "#4f46e5" }}
            >
              ANTICIPATE. PROTECT. OUTPERFORM.
            </div>

            {/* Headline matching exact reference typography */}
            <h1
              className="mt-3 font-display text-[clamp(38px,3.6vw,54px)] font-extrabold leading-[1.0] tracking-[-0.04em] lg:mt-4"
              style={{ color: "#0d1020" }}
            >
              <span className="block">Security</span>
              <span className="block">beyond the</span>
              <span className="block text-[#2563eb]">surface.</span>
            </h1>

            {/* Subtitle */}
            <p
              className="mt-3 max-w-md text-[15.5px] font-semibold leading-snug lg:mt-3.5 lg:text-[17px]"
              style={{ color: "#1e293b" }}
            >
              Strategic cybersecurity for what&rsquo;s next.
            </p>

            {/* Paragraph with underline on "build lasting" */}
            <p
              className="mt-2.5 max-w-md text-[13.5px] leading-relaxed text-[#575f75] lg:text-[14.5px]"
            >
              We partner with organizations to identify risks, strengthen defences and{" "}
              <span className="underline decoration-1 underline-offset-4 decoration-slate-400">
                build lasting
              </span>{" "}
              resilience in an increasingly complex threat landscape.
            </p>

            {/* Buttons Row */}
            <div className="mt-5 flex flex-wrap items-center gap-3 lg:mt-6">
              {/* Primary Purple Button */}
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[13px] font-semibold text-white transition-all duration-200 hover:brightness-110 lg:px-7 lg:py-3 lg:text-[13.5px]"
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
                className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-transparent px-6 py-2.5 text-[13px] font-semibold text-[#0d1020] transition-all duration-200 hover:bg-slate-50 lg:px-7 lg:py-3 lg:text-[13.5px]"
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
