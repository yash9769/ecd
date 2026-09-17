import type { ReactNode } from "react";
import { ChartBar, ClipboardText, MagnifyingGlass, ShieldCheck } from "@phosphor-icons/react";
import markUrl from "../../imports/envista-mark.png";

type StageCardProps = {
  eyebrow: string;
  title: string;
  icon: "discover" | "test" | "protect" | "resilience";
  className?: string;
};

const STAGE_CONFIG = {
  discover: {
    icon: MagnifyingGlass,
    eyebrow: "DISCOVER",
    title: "Identify and understand your risks.",
  },
  test: {
    icon: ClipboardText,
    eyebrow: "TEST",
    title: "Validate your security posture.",
  },
  protect: {
    icon: ShieldCheck,
    eyebrow: "PROTECT",
    title: "Strengthen defences and reduce risk.",
  },
  resilience: {
    icon: ChartBar,
    eyebrow: "RESILIENCE",
    title: "Build a stronger, future-ready organization.",
  },
} as const;

/* Reusable Horizontal Stage Card matching the exact reference image */
function StageCard({
  stage,
  className = "",
}: {
  stage: "discover" | "test" | "protect" | "resilience";
  className?: string;
}) {
  const config = STAGE_CONFIG[stage];
  const Icon = config.icon;

  return (
    <div
      className={`group flex items-center gap-4 rounded-2xl border bg-white p-4 lg:gap-5 lg:p-5 transition-all duration-300 hover:shadow-lg ${className}`}
      style={{
        borderColor: "rgba(13,16,32,0.06)",
        boxShadow: "0 12px 36px -12px rgba(40,25,90,0.08)",
      }}
    >
      <span
        className="flex h-12 w-12 lg:h-14 lg:w-14 shrink-0 items-center justify-center rounded-xl transition-colors duration-200"
        style={{
          backgroundColor: "rgba(124,58,237,0.04)",
          border: "1px solid rgba(124,58,237,0.12)",
          color: "#6d28d9",
          boxShadow: "0 4px 12px rgba(124,58,237,0.05)"
        }}
        aria-hidden="true"
      >
        <Icon size={26} weight="bold" />
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <div
          className="text-[13px] lg:text-[14px] font-bold uppercase tracking-[0.06em]"
          style={{ color: "#0d1020" }}
        >
          {config.eyebrow}
        </div>
        <div
          className="mt-0.5 text-[13px] lg:text-[14px] font-normal leading-[1.3]"
          style={{ color: "#575f75" }}
        >
          {config.title}
        </div>
      </div>
    </div>
  );
}

/* Center Envista Shield Mark and Label matching reference */
function CenterShield() {
  return (
    <div className="relative z-10 flex flex-col items-center select-none">
      <img
        src={markUrl}
        alt="Envista Shield"
        className="h-[88px] w-auto drop-shadow-[0_12px_24px_rgba(124,58,237,0.22)] lg:h-[100px]"
        draggable={false}
      />
      <div className="mt-3 text-center leading-tight">
        <div
          className="font-display text-[16px] font-extrabold uppercase tracking-[0.14em] lg:text-[18px]"
          style={{ color: "#0d1020" }}
        >
          ENVISTA
        </div>
        <div
          className="mt-0.5 text-[12px] font-semibold tracking-[0.04em] lg:text-[13px]"
          style={{ color: "#575f75" }}
        >
          Cyber Defence
        </div>
      </div>
    </div>
  );
}

/* Concentric Orbit Rings with Satellite Dots matching reference */
function OrbitSystem() {
  // Mobile / Desktop specific translation values logic is tricky without JS or standard classes.
  // Instead, let's use percentage based positioning for the satellite dots.
  // Using top/left % makes it scale with the container.
  
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      {/* Subtle glowing radial gradient in the center */}
      <div
        className="absolute h-[500px] w-[500px] lg:h-[620px] lg:w-[620px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, rgba(124,58,237,0) 70%)",
        }}
      />
      
      {/* Outer Orbit */}
      <div
        className="absolute h-[460px] w-[460px] rounded-full border border-dashed lg:h-[560px] lg:w-[560px]"
        style={{ borderColor: "rgba(124,58,237,0.15)", borderDasharray: "4 4" }}
      />
      {/* Middle Orbit */}
      <div
        className="absolute h-[340px] w-[340px] rounded-full border border-dashed lg:h-[400px] lg:w-[400px]"
        style={{ borderColor: "rgba(124,58,237,0.15)", borderDasharray: "4 4" }}
      />
      {/* Inner Orbit */}
      <div
        className="absolute h-[200px] w-[200px] rounded-full border border-solid lg:h-[230px] lg:w-[230px]"
        style={{ borderColor: "rgba(124,58,237,0.1)" }}
      />

      {/* Dotted Radial Field - make it much more subtle like reference */}
      <div
        className="absolute h-[480px] w-[480px] rounded-full lg:h-[580px] lg:w-[580px]"
        style={{
          backgroundImage: "radial-gradient(rgba(124,58,237,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(circle, transparent 40%, black 75%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle, transparent 40%, black 75%, transparent 100%)",
        }}
      />

      {/* Satellite Dots placed along the orbits using absolute top/left percentages from center */}
      {/* Inner ring - Top left (~315 deg) */}
      <span
        className="absolute h-2 w-2 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.6)] bg-indigo-600"
        style={{ top: "35%", left: "35%" }}
      />
      {/* Inner ring - Bottom right (~135 deg) */}
      <span
        className="absolute h-2 w-2 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.6)] bg-indigo-600"
        style={{ top: "65%", left: "65%" }}
      />
      
      {/* Middle ring - Top (12 o'clock) */}
      <span
        className="absolute h-2 w-2 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.6)] bg-indigo-600"
        style={{ top: "15%", left: "50%", transform: "translate(-50%, -50%)" }}
      />
      {/* Middle ring - Bottom (6 o'clock) */}
      <span
        className="absolute h-2.5 w-2.5 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.6)] bg-indigo-600"
        style={{ top: "85%", left: "50%", transform: "translate(-50%, -50%)" }}
      />
      {/* Middle ring - Right (3 o'clock) */}
      <span
        className="absolute h-2 w-2 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.6)] bg-indigo-600"
        style={{ top: "50%", left: "85%", transform: "translate(-50%, -50%)" }}
      />
      {/* Middle ring - Left (9 o'clock) */}
      <span
        className="absolute h-2.5 w-2.5 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.6)] bg-indigo-600"
        style={{ top: "50%", left: "15%", transform: "translate(-50%, -50%)" }}
      />
      
      {/* Outer ring - Top right (~45 deg) */}
      <span
        className="absolute h-2.5 w-2.5 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.6)] bg-indigo-600"
        style={{ top: "15%", left: "85%" }}
      />
      {/* Outer ring - Bottom left (~225 deg) */}
      <span
        className="absolute h-2.5 w-2.5 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.6)] bg-indigo-600"
        style={{ top: "85%", left: "15%" }}
      />
    </div>
  );
}

export default function HeroVisual() {
  return (
    <div className="relative w-full">
      {/* Desktop & Tablet Orbit System (>= 768px) */}
      {/* Increased height and max width to allow a much larger framework */}
      <div className="relative mx-auto hidden h-[520px] w-full max-w-[800px] md:block lg:h-[600px] lg:max-w-[820px]">
        {/* Concentric rings & satellite dots */}
        <OrbitSystem />

        {/* Center Shield */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <CenterShield />
        </div>

        {/* 1. DISCOVER Card (Top-Left) */}
        {/* Adjusted top position and width for larger cards */}
        <div className="absolute left-0 top-[60px] z-20 w-[280px] lg:w-[320px] lg:top-[90px]">
          {/* Top-Left Handwritten Annotation & Arrow matching reference */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[90%] right-[10%] mb-1 flex flex-col items-center lg:right-[15%]"
            style={{
              fontFamily: "var(--font-hand)",
              color: "#3b2f6b",
              transform: "rotate(-6deg)"
            }}
          >
            <p className="text-[19px] font-medium leading-[1.15] tracking-tight lg:text-[21px] text-center whitespace-nowrap">
              Find<br />weaknesses before<br />attackers do.
            </p>
            <svg
              width="60"
              height="50"
              viewBox="0 0 60 50"
              fill="none"
              className="mt-1 ml-4"
            >
              {/* Hand-drawn arrow pointing from text to card */}
              <path
                d="M10 5 C 25 25, 40 35, 55 42"
                stroke="#4a3b78"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M55 42 L 45 40 M 55 42 L 50 32"
                stroke="#4a3b78"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <StageCard stage="discover" />
        </div>

        {/* 2. TEST Card (Top-Right) */}
        <div className="absolute right-0 top-[60px] z-20 w-[280px] lg:w-[320px] lg:top-[90px]">
          <StageCard stage="test" />
        </div>

        {/* 3. PROTECT Card (Bottom-Left) */}
        <div className="absolute bottom-[60px] left-0 z-20 w-[280px] lg:w-[320px] lg:bottom-[90px]">
          <StageCard stage="protect" />
        </div>

        {/* 4. RESILIENCE Card (Bottom-Right) */}
        <div className="absolute bottom-[60px] right-0 z-20 w-[280px] lg:w-[320px] lg:bottom-[90px]">
          <StageCard stage="resilience" />
          
          {/* Bottom-Right Handwritten Annotation & Arrow matching reference */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[80%] left-[55%] mt-3 flex flex-col items-center text-center lg:left-[65%]"
            style={{
              fontFamily: "var(--font-hand)",
              color: "#3b2f6b",
              transform: "rotate(-4deg)"
            }}
          >
            <svg
              width="60"
              height="50"
              viewBox="0 0 60 50"
              fill="none"
              className="mb-1 mr-4"
            >
              {/* Hand-drawn arrow pointing up-left toward card */}
              <path
                d="M50 45 C 35 25, 20 15, 5 8"
                stroke="#4a3b78"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M5 8 L 15 10 M 5 8 L 10 18"
                stroke="#4a3b78"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-[19px] font-medium leading-[1.15] tracking-tight lg:text-[21px] whitespace-nowrap">
              From risk to resilience.<br />A stronger tomorrow.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile System (< 768px): Vertical stacked cross with exact cards and center shield */}
      <div className="flex w-full flex-col items-center gap-3.5 md:hidden">
        {/* Mobile Top Annotation */}
        <div
          aria-hidden="true"
          className="flex items-center gap-2 self-start pl-2"
          style={{ fontFamily: "var(--font-hand)", color: "#3b2f6b" }}
        >
          <p className="text-[18px] font-semibold leading-tight">
            Find weaknesses before
            <br />
            attackers do.
          </p>
          <svg width="36" height="26" viewBox="0 0 56 40" fill="none">
            <path d="M4 2 C 16 12, 30 26, 44 32" stroke="#4a3b78" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M44 32 L 34 30 M 44 32 L 39 21" stroke="#4a3b78" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* 1. Discover */}
        <div className="w-full max-w-[280px]">
          <StageCard stage="discover" />
        </div>

        {/* 2 & Center & 3 in compact row */}
        <div className="flex w-full items-center justify-center gap-2">
          <div className="w-[125px] shrink-0">
            <StageCard stage="test" className="p-2.5" />
          </div>
          <div className="shrink-0 scale-90">
            <CenterShield />
          </div>
          <div className="w-[125px] shrink-0">
            <StageCard stage="protect" className="p-2.5" />
          </div>
        </div>

        {/* 4. Resilience */}
        <div className="w-full max-w-[280px]">
          <StageCard stage="resilience" />
        </div>

        {/* Mobile Bottom Annotation */}
        <div
          aria-hidden="true"
          className="flex items-center gap-2 self-end pr-2 text-right"
          style={{ fontFamily: "var(--font-hand)", color: "#3b2f6b" }}
        >
          <svg width="36" height="26" viewBox="0 0 56 40" fill="none">
            <path d="M50 36 C 38 24, 24 14, 10 8" stroke="#4a3b78" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M10 8 L 20 10 M 10 8 L 14 19" stroke="#4a3b78" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-[18px] font-semibold leading-tight">
            From risk to resilience.
            <br />
            A stronger tomorrow.
          </p>
        </div>
      </div>
    </div>
  );
}
