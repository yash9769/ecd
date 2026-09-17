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

/* Handcrafted Vector Stage Icons matching reference design */
function DiscoverIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
      {/* Precision Lens */}
      <circle cx="10" cy="10" r="6.2" stroke="#3110d9" strokeWidth="2.2" />
      {/* Clean glass highlight */}
      <path
        d="M7.4 7.4 A 3.6 3.6 0 0 1 10.2 6.4"
        stroke="#3110d9"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.75"
      />
      {/* 45-degree Handle */}
      <path
        d="M14.8 14.8 L 20.2 20.2"
        stroke="#3110d9"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TestIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
      {/* Clipboard Body */}
      <rect x="5" y="4.5" width="14" height="16.5" rx="2.2" stroke="#3110d9" strokeWidth="2.1" />
      {/* Top Clip */}
      <path
        d="M9 4.5 V 3.2 C 9 2.5 9.4 2 10.2 2 H 13.8 C 14.6 2 15 2.5 15 3.2 V 4.5"
        stroke="#3110d9"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Checklist Line 1 */}
      <circle cx="8.2" cy="8.8" r="1.1" stroke="#3110d9" strokeWidth="1.6" />
      <line x1="11.5" y1="8.8" x2="15.8" y2="8.8" stroke="#3110d9" strokeWidth="2" strokeLinecap="round" />
      {/* Checklist Line 2 */}
      <circle cx="8.2" cy="12.5" r="1.1" stroke="#3110d9" strokeWidth="1.6" />
      <line x1="11.5" y1="12.5" x2="15.8" y2="12.5" stroke="#3110d9" strokeWidth="2" strokeLinecap="round" />
      {/* Checklist Line 3 */}
      <circle cx="8.2" cy="16.2" r="1.1" stroke="#3110d9" strokeWidth="1.6" />
      <line x1="11.5" y1="16.2" x2="14.2" y2="16.2" stroke="#3110d9" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ProtectIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
      {/* Shield Silhouette */}
      <path
        d="M12 3.2 C 14.6 4.3, 17.2 4.3, 19 3.9 C 19 11.5, 16.2 16.8, 12 20.6 C 7.8 16.8, 5 11.5, 5 3.9 C 6.8 4.3, 9.4 4.3, 12 3.2 Z"
        stroke="#3110d9"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      {/* Bold Checkmark */}
      <path
        d="M8.8 11.8 L 11 14 L 15.5 9.2"
        stroke="#3110d9"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ResilienceIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
      {/* Bar 1 */}
      <rect x="3.8" y="13.5" width="3.2" height="7" rx="0.8" stroke="#3110d9" strokeWidth="2.1" />
      {/* Bar 2 */}
      <rect x="9.8" y="9.5" width="3.2" height="11" rx="0.8" stroke="#3110d9" strokeWidth="2.1" />
      {/* Bar 3 */}
      <rect x="15.8" y="5.5" width="3.2" height="15" rx="0.8" stroke="#3110d9" strokeWidth="2.1" />
      {/* Signature Pink/Coral Accent Arrow */}
      <path
        d="M18.2 2 H 21.6 V 5.4 M 21.6 2 L 17.8 5.8"
        stroke="#f43f5e"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const STAGE_CONFIG = {
  discover: {
    icon: DiscoverIcon,
    eyebrow: "DISCOVER",
    title: "Identify and understand your risks.",
  },
  test: {
    icon: TestIcon,
    eyebrow: "TEST",
    title: "Validate your security posture.",
  },
  protect: {
    icon: ProtectIcon,
    eyebrow: "PROTECT",
    title: "Strengthen defences and reduce risk.",
  },
  resilience: {
    icon: ResilienceIcon,
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
      className={`group flex items-center gap-3.5 rounded-2xl border bg-white/95 backdrop-blur-sm p-3 md:p-3.5 lg:gap-4 lg:p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
      style={{
        borderColor: "rgba(13,16,32,0.08)",
        boxShadow: "0 14px 34px -10px rgba(30,20,80,0.09), 0 2px 6px -1px rgba(30,20,80,0.03)",
      }}
    >
      <span
        className="flex h-11 w-11 lg:h-12 lg:w-12 shrink-0 items-center justify-center rounded-full transition-all duration-200 group-hover:scale-105"
        style={{
          background: "radial-gradient(circle at 40% 35%, #ffffff 0%, #f4f0ff 100%)",
          border: "1px solid rgba(79, 70, 229, 0.14)",
          boxShadow: "0 2px 8px rgba(79, 70, 229, 0.06)",
        }}
        aria-hidden="true"
      >
        <Icon />
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

/* Concentric Orbit Rings with Precision SVG Tracking & Continuous Revolving Motion */
function OrbitSystem() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      {/* Background Soft Atmospheric Glow */}
      <div
        className="absolute h-[420px] w-[420px] lg:h-[480px] lg:w-[480px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.09) 0%, rgba(99,102,241,0.03) 50%, transparent 70%)",
        }}
      />

      {/* Cyber Defence Radar Sweep Beam */}
      <div
        className="absolute h-[400px] w-[400px] lg:h-[450px] lg:w-[450px] rounded-full animate-radar-sweep opacity-25"
        style={{
          background: "conic-gradient(from 0deg at 50% 50%, rgba(124, 58, 237, 0.18) 0deg, rgba(99, 102, 241, 0.05) 45deg, transparent 80deg)",
          maskImage: "radial-gradient(circle, transparent 25%, black 65%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle, transparent 25%, black 65%, transparent 100%)",
        }}
      />

      {/* Dotted Radial Pattern Field matching reference */}
      <div
        className="absolute h-[380px] w-[380px] rounded-full lg:h-[440px] lg:w-[440px]"
        style={{
          backgroundImage: "radial-gradient(rgba(124,58,237,0.13) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(circle, transparent 35%, black 75%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle, transparent 35%, black 75%, transparent 100%)",
        }}
      />

      {/* Precision Mathematical Orbit System (SVG) */}
      <svg
        viewBox="0 0 500 500"
        className="absolute h-[440px] w-[440px] lg:h-[490px] lg:w-[490px] overflow-visible"
      >
        <defs>
          <filter id="orbitGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Static Guide Orbits */}
        {/* Inner Orbit (Radius 85) */}
        <circle
          cx="250"
          cy="250"
          r="85"
          fill="none"
          stroke="rgba(124, 58, 237, 0.20)"
          strokeWidth="1.2"
        />

        {/* Middle Orbit (Radius 150) */}
        <circle
          cx="250"
          cy="250"
          r="150"
          fill="none"
          stroke="rgba(124, 58, 237, 0.26)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />

        {/* Outer Orbit (Radius 215) */}
        <circle
          cx="250"
          cy="250"
          r="215"
          fill="none"
          stroke="rgba(124, 58, 237, 0.22)"
          strokeWidth="1.2"
          strokeDasharray="5 5"
        />

        {/* 2. Revolving Orbit Carriers — guaranteed 100% on-track by SVG geometry */}
        {/* Inner Orbit Carrier (Clockwise) - r=85 */}
        <g
          className="animate-orbit-cw-medium"
          style={{ transformOrigin: "250px 250px" }}
        >
          {/* Dot at 35° on r=85 */}
          <circle cx="299" cy="180" r="3.5" fill="#4f46e5" filter="url(#orbitGlow)" />
          {/* Dot at 215° on r=85 */}
          <circle cx="201" cy="320" r="3.5" fill="#7c3aed" filter="url(#orbitGlow)" />
        </g>

        {/* Middle Orbit Carrier (Counter-Clockwise) - r=150 */}
        <g
          className="animate-orbit-ccw"
          style={{ transformOrigin: "250px 250px" }}
        >
          {/* 12 o'clock (0°) on r=150 */}
          <circle cx="250" cy="100" r="4.5" fill="#4f46e5" filter="url(#orbitGlow)" />
          {/* ~72° on r=150 */}
          <circle cx="393" cy="204" r="4" fill="#6d28d9" filter="url(#orbitGlow)" />
          {/* ~144° on r=150 */}
          <circle cx="338" cy="371" r="4" fill="#4f46e5" filter="url(#orbitGlow)" />
          {/* ~216° on r=150 */}
          <circle cx="162" cy="371" r="4" fill="#7c3aed" filter="url(#orbitGlow)" />
          {/* ~288° on r=150 */}
          <circle cx="107" cy="204" r="4" fill="#4f46e5" filter="url(#orbitGlow)" />
        </g>

        {/* Outer Orbit Carrier (Clockwise) - r=215 */}
        <g
          className="animate-orbit-cw-slow"
          style={{ transformOrigin: "250px 250px" }}
        >
          {/* 45° on r=215 */}
          <circle cx="402" cy="98" r="4.5" fill="#4f46e5" filter="url(#orbitGlow)" />
          {/* 135° on r=215 */}
          <circle cx="402" cy="402" r="4" fill="#7c3aed" filter="url(#orbitGlow)" />
          {/* 225° on r=215 */}
          <circle cx="98" cy="402" r="4.5" fill="#4f46e5" filter="url(#orbitGlow)" />
          {/* 315° on r=215 */}
          <circle cx="98" cy="98" r="4" fill="#6d28d9" filter="url(#orbitGlow)" />
        </g>
      </svg>
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
            className="pointer-events-none absolute -top-14 left-1 flex items-end gap-1.5 lg:-top-16 lg:left-3 animate-hand-top"
            style={{
              fontFamily: "var(--font-hand)",
              color: "#3b2f6b",
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
          <StageCard stage="discover" className="animate-stage-breathe-1" />
        </div>

        {/* 2. TEST Card (Top-Right) */}
        <div className="absolute right-0 top-[75px] md:top-[80px] lg:top-[85px] z-20 w-[245px] md:w-[255px] lg:w-[285px]">
          <StageCard stage="test" className="animate-stage-breathe-2" />
        </div>

        {/* 3. PROTECT Card (Bottom-Left) */}
        <div className="absolute bottom-[60px] md:bottom-[65px] lg:bottom-[70px] left-0 z-20 w-[245px] md:w-[255px] lg:w-[285px]">
          <StageCard stage="protect" className="animate-stage-breathe-3" />
        </div>

        {/* 4. RESILIENCE Card (Bottom-Right) */}
        <div className="absolute bottom-[60px] md:bottom-[65px] lg:bottom-[70px] right-0 z-20 w-[245px] md:w-[255px] lg:w-[285px]">
          <StageCard stage="resilience" className="animate-stage-breathe-4" />
          
          {/* Bottom-Right Handwritten Annotation & Arrow matching reference */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[100%] mt-3 right-0 flex items-start gap-2 lg:mt-3.5 animate-hand-bottom"
            style={{
              fontFamily: "var(--font-hand)",
              color: "#3b2f6b",
            }}
          >
            <svg
              width="36"
              height="28"
              viewBox="0 0 50 38"
              fill="none"
              className="mt-0.5 shrink-0"
            >
              {/* Hand-drawn arrow pointing up-left toward bottom of card */}
              <path
                d="M44 32 C 30 24, 18 16, 6 6"
                stroke="#4a3b78"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M6 6 L 16 7 M 6 6 L 8 17"
                stroke="#4a3b78"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-[14px] font-medium leading-[1.18] tracking-tight lg:text-[15.5px] whitespace-nowrap">
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
          className="flex items-center gap-2 self-start pl-2 animate-hand-top"
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
          <StageCard stage="discover" className="animate-stage-breathe-1" />
        </div>

        {/* 2 & Center & 3 in compact row */}
        <div className="flex w-full items-center justify-center gap-2">
          <div className="w-[125px] shrink-0">
            <StageCard stage="test" className="p-2.5 animate-stage-breathe-2" />
          </div>
          <div className="shrink-0 scale-90">
            <CenterShield />
          </div>
          <div className="w-[125px] shrink-0">
            <StageCard stage="protect" className="p-2.5 animate-stage-breathe-3" />
          </div>
        </div>

        {/* 4. Resilience */}
        <div className="w-full max-w-[280px]">
          <StageCard stage="resilience" className="animate-stage-breathe-4" />
        </div>

        {/* Mobile Bottom Annotation */}
        <div
          aria-hidden="true"
          className="flex items-center gap-2 self-end pr-2 text-right animate-hand-bottom"
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

