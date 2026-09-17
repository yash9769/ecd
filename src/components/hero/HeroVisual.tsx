import type { ReactNode } from "react";
import { ChartBar, ClipboardText, MagnifyingGlass, ShieldCheck } from "@phosphor-icons/react";
import markUrl from "../../imports/envista-mark.png";
import wordmarkUrl from "../../imports/envista-wordmark.png";

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
    color: "#2563eb",
    bg: "rgba(37,99,235,0.07)",
    border: "rgba(37,99,235,0.16)",
  },
  test: {
    icon: ClipboardText,
    eyebrow: "TEST",
    title: "Validate your security posture.",
    color: "#6d28d9",
    bg: "rgba(109,40,217,0.07)",
    border: "rgba(109,40,217,0.16)",
  },
  protect: {
    icon: ShieldCheck,
    eyebrow: "PROTECT",
    title: "Strengthen defences and reduce risk.",
    color: "#4f46e5",
    bg: "rgba(79,70,229,0.07)",
    border: "rgba(79,70,229,0.16)",
  },
  resilience: {
    icon: ChartBar,
    eyebrow: "RESILIENCE",
    title: "Build a stronger, future-ready organization.",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.07)",
    border: "rgba(124,58,237,0.16)",
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
      className={`group flex items-center gap-3.5 rounded-2xl border bg-white/95 backdrop-blur-sm p-3 md:p-3.5 lg:gap-4 lg:p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
      style={{
        borderColor: "rgba(13,16,32,0.08)",
        boxShadow: "0 14px 34px -10px rgba(30,20,80,0.09), 0 2px 6px -1px rgba(30,20,80,0.03)",
      }}
    >
      <span
        className="flex h-11 w-11 lg:h-12 lg:w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-105"
        style={{
          backgroundColor: config.bg,
          border: `1px solid ${config.border}`,
          color: config.color,
          boxShadow: `0 4px 12px ${config.bg}`
        }}
        aria-hidden="true"
      >
        <Icon size={22} weight="bold" />
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <div
          className="text-[12px] lg:text-[13px] font-bold uppercase tracking-[0.06em]"
          style={{ color: "#0d1020" }}
        >
          {config.eyebrow}
        </div>
        <div
          className="mt-0.5 text-[11.5px] lg:text-[12.5px] font-normal leading-[1.3]"
          style={{ color: "#575f75" }}
        >
          {config.title}
        </div>
      </div>
    </div>
  );
}

/* Center Envista Shield Mark and Official Logo Wordmark matching Envista Cyber Defence_Logo-Gradient.png */
function CenterShield() {
  return (
    <div className="relative z-10 flex flex-col items-center select-none animate-shield-float">
      {/* Soft atmospheric halo behind the central shield */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-full opacity-60"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.22) 0%, rgba(99,102,241,0.08) 50%, transparent 70%)",
        }}
      />
      {/* Brand Shield Icon */}
      <img
        src={markUrl}
        alt="Envista Shield"
        className="relative h-[70px] w-auto drop-shadow-[0_12px_24px_rgba(124,58,237,0.28)] lg:h-[80px] transition-transform duration-300 hover:scale-105"
        draggable={false}
      />
      {/* Official Brand Logo Wordmark with exact font & gradient */}
      <img
        src={wordmarkUrl}
        alt="Envista Cyber Defence"
        className="relative mt-2 h-[34px] w-auto lg:h-[38px] drop-shadow-[0_4px_12px_rgba(124,58,237,0.12)] select-none"
        draggable={false}
      />
    </div>
  );
}

/* Concentric Orbit Rings with Continuous Revolving Motion & Radar Sweep */
function OrbitSystem() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      {/* Center glowing radial gradient */}
      <div
        className="absolute h-[420px] w-[420px] lg:h-[480px] lg:w-[480px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, rgba(99,102,241,0.03) 45%, transparent 70%)",
        }}
      />

      {/* Cyber Defence Radar Sweep Beam */}
      <div
        className="absolute h-[400px] w-[400px] lg:h-[460px] lg:w-[460px] rounded-full pointer-events-none animate-radar-sweep opacity-35"
        style={{
          background: "conic-gradient(from 0deg at 50% 50%, rgba(124, 58, 237, 0.2) 0deg, rgba(99, 102, 241, 0.08) 40deg, transparent 80deg)",
          maskImage: "radial-gradient(circle, transparent 25%, black 65%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle, transparent 25%, black 65%, transparent 100%)",
        }}
      />

      {/* Outer Orbit Guide Ring */}
      <div
        className="absolute h-[380px] w-[380px] rounded-full border border-dashed lg:h-[440px] lg:w-[440px]"
        style={{ borderColor: "rgba(124,58,237,0.18)", borderDasharray: "4 5" }}
      />
      
      {/* Outer Orbit Revolving Carrier (Clockwise) */}
      <div className="absolute h-[380px] w-[380px] lg:h-[440px] lg:w-[440px] rounded-full animate-orbit-cw-slow">
        {/* Dot at ~45 deg */}
        <span
          className="absolute top-[14.6%] right-[14.6%] -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.85)] animate-orbit-pulse"
        />
        {/* Dot at ~135 deg */}
        <span
          className="absolute bottom-[14.6%] right-[14.6%] translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-purple-600 shadow-[0_0_8px_rgba(124,58,237,0.75)]"
        />
        {/* Dot at ~225 deg */}
        <span
          className="absolute bottom-[14.6%] left-[14.6%] -translate-x-1/2 translate-y-1/2 h-2.5 w-2.5 rounded-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.85)] animate-orbit-pulse"
        />
        {/* Dot at ~315 deg */}
        <span
          className="absolute top-[14.6%] left-[14.6%] -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-purple-600 shadow-[0_0_8px_rgba(124,58,237,0.75)]"
        />
      </div>

      {/* Middle Orbit Guide Ring */}
      <div
        className="absolute h-[270px] w-[270px] rounded-full border border-dashed lg:h-[310px] lg:w-[310px]"
        style={{ borderColor: "rgba(124,58,237,0.18)", borderDasharray: "4 4" }}
      />

      {/* Middle Orbit Revolving Carrier (Counter-Clockwise) */}
      <div className="absolute h-[270px] w-[270px] lg:h-[310px] lg:w-[310px] rounded-full animate-orbit-ccw">
        {/* Dot at 12 o'clock (0 deg) */}
        <span
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.85)] animate-orbit-pulse"
        />
        {/* Dot at 3 o'clock (90 deg) */}
        <span
          className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(124,58,237,0.75)]"
        />
        {/* Dot at 6 o'clock (180 deg) */}
        <span
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-2.5 w-2.5 rounded-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.85)] animate-orbit-pulse"
        />
        {/* Dot at 9 o'clock (270 deg) */}
        <span
          className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(124,58,237,0.75)]"
        />
      </div>

      {/* Inner Orbit Guide Ring */}
      <div
        className="absolute h-[160px] w-[160px] rounded-full border border-solid lg:h-[185px] lg:w-[185px]"
        style={{ borderColor: "rgba(124,58,237,0.14)" }}
      />

      {/* Inner Orbit Revolving Carrier (Clockwise) */}
      <div className="absolute h-[160px] w-[160px] lg:h-[185px] lg:w-[185px] rounded-full animate-orbit-cw-medium">
        {/* Dot at ~35 deg */}
        <span
          className="absolute top-[18%] right-[18%] h-2 w-2 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.75)] animate-orbit-pulse"
        />
        {/* Dot at ~215 deg */}
        <span
          className="absolute bottom-[18%] left-[18%] h-2 w-2 rounded-full bg-purple-600 shadow-[0_0_8px_rgba(124,58,237,0.75)]"
        />
      </div>

      {/* Dotted Radial Pattern Field matching reference */}
      <div
        className="absolute h-[390px] w-[390px] rounded-full lg:h-[450px] lg:w-[450px]"
        style={{
          backgroundImage: "radial-gradient(rgba(124,58,237,0.14) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(circle, transparent 38%, black 75%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle, transparent 38%, black 75%, transparent 100%)",
        }}
      />
    </div>
  );
}

export default function HeroVisual() {
  return (
    <div className="relative w-full">
      {/* Subtle Dot Grid on Far Right matching reference */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 top-[22%] hidden h-[64px] w-[80px] opacity-35 xl:block"
        style={{
          backgroundImage: "radial-gradient(#6d28d9 1.4px, transparent 1.4px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* Desktop & Tablet Orbit System (>= 768px) */}
      <div className="relative mx-auto hidden h-[470px] w-full max-w-[720px] md:block lg:h-[500px] lg:max-w-[760px]">
        {/* Concentric rings & revolving satellite carriers */}
        <OrbitSystem />

        {/* Center Shield */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <CenterShield />
        </div>

        {/* 1. DISCOVER Card (Top-Left) */}
        <div className="absolute left-0 top-[75px] md:top-[80px] lg:top-[85px] z-20 w-[245px] md:w-[255px] lg:w-[285px]">
          {/* Top-Left Handwritten Annotation & Arrow matching reference — positioned so it never pokes up into header */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-14 left-1 flex items-end gap-1.5 lg:-top-16 lg:left-3"
            style={{
              fontFamily: "var(--font-hand)",
              color: "#3b2f6b",
              transform: "rotate(-5deg)"
            }}
          >
            <p className="text-[14px] font-medium leading-[1.15] tracking-tight lg:text-[15.5px] text-right whitespace-nowrap">
              Find<br />weaknesses before<br />attackers do.
            </p>
            <svg
              width="40"
              height="30"
              viewBox="0 0 60 50"
              fill="none"
              className="mb-1 shrink-0"
            >
              {/* Hand-drawn curved arrow pointing toward card */}
              <path
                d="M8 6 C 22 20, 36 30, 50 36"
                stroke="#4a3b78"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M50 36 L 40 35 M 50 36 L 45 26"
                stroke="#4a3b78"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <StageCard stage="discover" />
        </div>

        {/* 2. TEST Card (Top-Right) */}
        <div className="absolute right-0 top-[75px] md:top-[80px] lg:top-[85px] z-20 w-[245px] md:w-[255px] lg:w-[285px]">
          <StageCard stage="test" />
        </div>

        {/* 3. PROTECT Card (Bottom-Left) */}
        <div className="absolute bottom-[60px] md:bottom-[65px] lg:bottom-[70px] left-0 z-20 w-[245px] md:w-[255px] lg:w-[285px]">
          <StageCard stage="protect" />
        </div>

        {/* 4. RESILIENCE Card (Bottom-Right) */}
        <div className="absolute bottom-[60px] md:bottom-[65px] lg:bottom-[70px] right-0 z-20 w-[245px] md:w-[255px] lg:w-[285px]">
          <StageCard stage="resilience" />
          
          {/* Bottom-Right Handwritten Annotation & Arrow matching reference */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[96%] right-1 flex items-start gap-1.5 lg:right-3"
            style={{
              fontFamily: "var(--font-hand)",
              color: "#3b2f6b",
              transform: "rotate(-3deg)"
            }}
          >
            <svg
              width="40"
              height="30"
              viewBox="0 0 60 50"
              fill="none"
              className="mt-0.5 shrink-0"
            >
              {/* Hand-drawn arrow pointing up-left toward card */}
              <path
                d="M48 40 C 34 24, 20 16, 6 10"
                stroke="#4a3b78"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M6 10 L 16 12 M 6 10 L 11 20"
                stroke="#4a3b78"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-[14px] font-medium leading-[1.15] tracking-tight lg:text-[15.5px] whitespace-nowrap">
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
          <p className="text-[17px] font-semibold leading-tight">
            Find weaknesses before
            <br />
            attackers do.
          </p>
          <svg width="34" height="24" viewBox="0 0 56 40" fill="none">
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
          <svg width="34" height="24" viewBox="0 0 56 40" fill="none">
            <path d="M50 36 C 38 24, 24 14, 10 8" stroke="#4a3b78" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M10 8 L 20 10 M 10 8 L 14 19" stroke="#4a3b78" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-[17px] font-semibold leading-tight">
            From risk to resilience.
            <br />
            A stronger tomorrow.
          </p>
        </div>
      </div>
    </div>
  );
}

