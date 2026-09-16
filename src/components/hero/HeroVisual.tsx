import type { Icon } from "@phosphor-icons/react";
import { MagnifyingGlass, ShieldCheck, Target, TrendUp } from "@phosphor-icons/react";
import { HERO_SERVICES } from "../../data";
import markUrl from "../../imports/envista-mark.png";

const ICONS: Record<string, Icon> = { discover: MagnifyingGlass, test: Target, protect: ShieldCheck, resilience: TrendUp };
const BADGE_FILL = "linear-gradient(140deg,#a78bfa,#c4b5fd 55%,#f0abfc)";

/* The hero's cybersecurity framework: a central shield with exactly four
   cards around it — Discover, Test, Protect, Resilience, the complete
   visual story — connected by thin lines and framed by two faint orbit
   rings and a dotted field. No fifth card, no numbered stepper alongside
   it: this is the only framework in the hero. No 3D, no glow: SVG
   rings/lines, CSS cards, the real shield mark. */
function Card({
  eyebrow,
  title,
  icon,
  className = "w-[172px] sm:w-[182px]",
}: (typeof HERO_SERVICES)[number] & { className?: string }) {
  const Icon = ICONS[icon];
  return (
    <div
      className={`reveal rounded-2xl border bg-white px-4 py-4 ${className}`}
      style={{ borderColor: "rgba(13,16,32,0.08)", boxShadow: "0 20px 38px -22px rgba(40,25,90,0.3)" }}
    >
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-full"
        style={{ backgroundImage: BADGE_FILL, color: "#fff" }}
      >
        <Icon size={16} weight="bold" aria-hidden="true" />
      </span>
      <div className="mt-2.5 text-[10.5px] font-bold uppercase tracking-[0.08em]" style={{ color: "#0d1020" }}>
        {eyebrow}
      </div>
      <div className="mt-1 text-[12.5px] font-medium leading-snug" style={{ color: "#4a4f66" }}>
        {title}
      </div>
    </div>
  );
}

/* Thin lines from the shield to each card with a small node partway along —
   the "hub" reading the cards alone don't give. A single SVG with
   preserveAspectRatio="none" and a 0-100 viewBox: every coordinate is a
   percentage of the container's actual (non-square) box, so it stays
   aligned with the percentage/corner-anchored cards at any width instead
   of drifting the way a fixed-aspect viewBox would once the container's
   own aspect ratio changes with it. */
function Connectors() {
  const lines: [number, number, number, number][] = [
    [50, 50, 23, 24],
    [50, 50, 77, 24],
    [50, 50, 23, 77],
    [50, 50, 77, 77],
  ];
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
      {lines.map(([x1, y1, x2, y2], i) => (
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(124,58,237,0.22)" strokeWidth={0.3} vectorEffect="non-scaling-stroke" />
          <circle cx={(x1 + x2) / 2} cy={(y1 + y2) / 2} r={0.9} fill="#a78bfa" />
        </g>
      ))}
    </svg>
  );
}

function Shield({ size, textSize }: { size: string; textSize: string }) {
  return (
    <div className="reveal relative z-10 flex flex-col items-center">
      <span
        className={`flex items-center justify-center rounded-full bg-white ${size}`}
        style={{ boxShadow: "0 24px 48px -24px rgba(40,25,90,0.32)", border: "1px solid rgba(13,16,32,0.08)" }}
      >
        <img src={markUrl} alt="Envista Cyber Defence" className="h-[52%] w-auto" draggable={false} />
      </span>
      <div className="mt-3 text-center leading-tight">
        <div className={`font-display font-bold tracking-[-0.01em] ${textSize}`} style={{ color: "#0d1020" }}>
          Envista
        </div>
        <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#575f75" }}>
          Cyber Defence
        </div>
      </div>
    </div>
  );
}

/* Desktop/tablet: shield centred in a relative box, orbit rings + connector
   lines behind it, the four cards anchored to its corners so the whole
   thing reads as one composed system rather than four independent boxes. */
function OrbitSystem() {
  return (
    <div className="relative hidden h-[430px] w-full max-w-[560px] md:block lg:h-[470px]">
      {/* Faint orbit rings + dotted field, centred on the shield. Fixed
          pixel diameters rather than percentages of the container: the
          container itself isn't square (it's shaped by the corner cards,
          not by the rings), so a percentage-sized "circle" would render as
          an oval. Purely decorative and aria-hidden. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute h-[190px] w-[190px] rounded-full border lg:h-[210px] lg:w-[210px]" style={{ borderColor: "rgba(124,58,237,0.16)" }} />
        <div className="absolute h-[300px] w-[300px] rounded-full border border-dashed lg:h-[330px] lg:w-[330px]" style={{ borderColor: "rgba(124,58,237,0.12)" }} />
        <div
          className="absolute h-[300px] w-[300px] rounded-full lg:h-[330px] lg:w-[330px]"
          style={{
            backgroundImage: "radial-gradient(rgba(124,58,237,0.22) 1px, transparent 1.4px)",
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(circle, black 55%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(circle, black 55%, transparent 78%)",
          }}
        />
      </div>

      <Connectors />

      {/* Shield, dead centre. Its label sits below the circle, so the
          corner cards are placed flush to the container's own edges
          (top-0/bottom-0), not inset toward the centre — that keeps a
          fixed ~35px clearance between every card and the shield block at
          every size, rather than a percentage gap that shrinks with it. */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Shield size="h-[100px] w-[100px] lg:h-[112px] lg:w-[112px]" textSize="text-[13px]" />
      </div>

      {/* Four cards, one per corner: Discover / Test on top, Protect /
          Resilience below — the order the two handwritten annotations
          below point at. */}
      <div className="absolute left-0 top-0" style={{ animationDelay: "60ms" }}>
        <Card {...HERO_SERVICES[0]} />
      </div>
      <div className="absolute right-0 top-0" style={{ animationDelay: "140ms" }}>
        <Card {...HERO_SERVICES[1]} />
      </div>
      <div className="absolute bottom-0 left-0" style={{ animationDelay: "220ms" }}>
        <Card {...HERO_SERVICES[2]} />
      </div>
      <div className="absolute bottom-0 right-0" style={{ animationDelay: "300ms" }}>
        <Card {...HERO_SERVICES[3]} />
      </div>

      {/* Exactly two handwritten annotations, xl+ only: below that width
          there isn't headroom above the top cards or below the bottom
          cards to add a caption without crowding the section around it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[15%] left-[2%] hidden max-w-[190px] xl:block"
        style={{ fontFamily: "var(--font-hand)", color: "#4c3b8f", transform: "rotate(-3deg)" }}
      >
        <p className="text-[19px] leading-[1.15]">Find weaknesses before attackers do.</p>
        <svg width="52" height="34" viewBox="0 0 52 34" fill="none" className="ml-2 mt-1">
          <path d="M2 2c10 6 16 14 16 22M18 24c4-1 8-1 11 3" stroke="#7c6ba8" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[17%] right-[1%] hidden max-w-[190px] text-right xl:block"
        style={{ fontFamily: "var(--font-hand)", color: "#4c3b8f", transform: "rotate(2deg)" }}
      >
        <svg width="52" height="34" viewBox="0 0 52 34" fill="none" className="ml-auto mr-2 mb-1 -scale-y-100">
          <path d="M2 2c10 6 16 14 16 22M18 24c4-1 8-1 11 3" stroke="#7c6ba8" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <p className="text-[19px] leading-[1.15]">
          From risk to resilience.
          <br />A stronger tomorrow.
        </p>
      </div>
    </div>
  );
}

/* Mobile: the ring/corner composition only works with real width to
   breathe. Below md the shield sits above a plain 2x2 grid of the same
   four cards — same content, no orbit geometry to force into 390px. */
function MobileGrid() {
  return (
    <div className="flex w-full flex-col items-center gap-6 md:hidden">
      <Shield size="h-[84px] w-[84px]" textSize="text-[13px]" />
      <div className="grid w-full grid-cols-2 gap-3">
        {HERO_SERVICES.map((s, i) => (
          <div key={s.eyebrow} style={{ animationDelay: `${i * 80}ms` }}>
            <Card {...s} className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroVisual() {
  return (
    <>
      <OrbitSystem />
      <MobileGrid />
    </>
  );
}
