import type { Icon } from "@phosphor-icons/react";
import { ChartLineUp, ClipboardText, Eye, Target } from "@phosphor-icons/react";
import { HERO_SERVICES } from "../../data";
import markUrl from "../../imports/envista-mark.png";

const ICONS: Record<string, Icon> = { offensive: Target, defensive: Eye, grc: ClipboardText, strategy: ChartLineUp };

/* The hero's cybersecurity-consulting system: a central shield with four
   service cards around it, framed by two faint orbit rings and a dotted
   field. This is a hub, not a lifecycle diagram — Envista sits at the
   centre of offensive, defensive, GRC and strategy work, not before or
   after it. No 3D, no glow: SVG rings, CSS cards, the real shield mark. */
function Card({
  eyebrow,
  title,
  icon,
  className = "w-[168px] sm:w-[178px]",
}: (typeof HERO_SERVICES)[number] & { className?: string }) {
  const Icon = ICONS[icon];
  return (
    <div
      className={`reveal rounded-xl border bg-white px-4 py-3.5 ${className}`}
      style={{ borderColor: "rgba(13,16,32,0.09)", boxShadow: "0 18px 34px -22px rgba(40,25,90,0.28)" }}
    >
      <span
        className="inline-flex h-8 w-8 items-center justify-center rounded-full"
        style={{ background: "rgba(109,40,217,0.1)", color: "#6d28d9" }}
      >
        <Icon size={15} weight="light" aria-hidden="true" />
      </span>
      <div className="mt-2.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em]" style={{ color: "#6d28d9" }}>
        {eyebrow}
      </div>
      <div className="mt-1 text-[12.5px] font-semibold leading-snug tracking-[-0.005em]" style={{ color: "#241b4f" }}>
        {title}
      </div>
    </div>
  );
}

/* Desktop/tablet: shield centred in a relative box, orbit rings behind it,
   the four cards anchored to its corners so the whole thing reads as one
   composed system rather than four independent boxes. */
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

      {/* Shield, dead centre. Its label sits below the circle, so the
          corner cards are placed flush to the container's own edges
          (top-0/bottom-0), not inset toward the centre — that keeps a
          fixed ~35px clearance between every card and the shield block at
          every size, rather than a percentage gap that shrinks with it. */}
      <div className="reveal absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <span
          className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white lg:h-[112px] lg:w-[112px]"
          style={{ boxShadow: "0 24px 48px -24px rgba(40,25,90,0.32)", border: "1px solid rgba(13,16,32,0.08)" }}
        >
          <img src={markUrl} alt="Envista Cyber Defence" className="h-[50px] w-auto lg:h-[57px]" draggable={false} />
        </span>
        <div className="mt-3 text-center leading-tight">
          <div className="font-display text-[13px] font-bold tracking-[-0.01em]" style={{ color: "#241b4f" }}>
            Envista
          </div>
          <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#7c6ba8" }}>
            Cyber Defence
          </div>
        </div>
      </div>

      {/* Four cards, one per corner. */}
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
    </div>
  );
}

/* Mobile: the ring/corner composition only works with real width to
   breathe. Below md the shield sits above a plain 2x2 grid of the same
   four cards — same content, no orbit geometry to force into 390px. */
function MobileGrid() {
  return (
    <div className="flex w-full flex-col items-center gap-6 md:hidden">
      <div className="reveal flex flex-col items-center">
        <span
          className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-white"
          style={{ boxShadow: "0 18px 36px -20px rgba(40,25,90,0.3)", border: "1px solid rgba(13,16,32,0.08)" }}
        >
          <img src={markUrl} alt="Envista Cyber Defence" className="h-[42px] w-auto" draggable={false} />
        </span>
        <div className="mt-2.5 text-center leading-tight">
          <div className="font-display text-[13px] font-bold tracking-[-0.01em]" style={{ color: "#241b4f" }}>
            Envista
          </div>
          <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#7c6ba8" }}>
            Cyber Defence
          </div>
        </div>
      </div>
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
