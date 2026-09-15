import type { Icon } from "@phosphor-icons/react";
import { ArrowRight, ClipboardText, MagnifyingGlass, ShieldCheck, TrendUp } from "@phosphor-icons/react";

type Panel = {
  label: string;
  icon: Icon;
  minH: number;
  vwH: number;
  maxH: number;
};

/* Height as clamp(min, Nvw, max) rather than a fixed pixel — the panels
   scale down together with the viewport instead of clipping on narrow
   screens (a fixed-px fan that works at 1440px overflows a 390px frame). */
const PANELS: Panel[] = [
  { label: "Identify Risks", icon: MagnifyingGlass, minH: 115, vwH: 28.8, maxH: 250 },
  { label: "Validate Exposure", icon: TrendUp, minH: 132, vwH: 33.2, maxH: 288 },
  { label: "Strengthen Defences", icon: ShieldCheck, minH: 150, vwH: 37.6, maxH: 326 },
  { label: "Ensure Compliance", icon: ClipboardText, minH: 164, vwH: 42, maxH: 364 },
];

/* Five architectural glass panels fanned in perspective, stepping up toward
   one darker, taller focal panel — a progression (identify -> validate ->
   strengthen -> ensure -> resilient), not a shield/globe/dashboard. Pure
   CSS 3D (perspective + rotateY on a shared stage), no WebGL: the reference
   doesn't need a renderer, just glass, light and geometry. */
export default function HeroPanels() {
  return (
    <div
      className="relative mx-auto flex w-full max-w-[560px] items-end justify-center gap-1.5 sm:gap-3 lg:gap-4"
      style={{ perspective: "1400px", height: "clamp(210px, 50vw, 420px)" }}
    >
      {PANELS.map(({ label, icon: Icon, minH, vwH, maxH }, i) => (
        <div
          key={label}
          className="reveal relative shrink-0 overflow-hidden rounded-2xl border"
          style={{
            width: "clamp(34px, 9vw, 78px)",
            height: `clamp(${minH}px, ${vwH}vw, ${maxH}px)`,
            animationDelay: `${i * 90}ms`,
            transform: `rotateY(-16deg) rotateX(2deg) translateZ(${i * 6}px)`,
            transformStyle: "preserve-3d",
            background:
              "linear-gradient(155deg, rgba(255,255,255,0.92), rgba(237,233,252,0.72) 60%, rgba(216,206,246,0.6))",
            borderColor: "rgba(109,40,217,0.16)",
            boxShadow: "0 24px 40px -28px rgba(30,20,70,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          <div className="absolute inset-x-0 top-2.5 flex flex-col items-center gap-1.5 px-1 sm:top-4 sm:gap-3 sm:px-1.5">
            <span
              className="inline-flex h-5 w-5 items-center justify-center rounded-full sm:h-8 sm:w-8"
              style={{ background: "rgba(109,40,217,0.1)", color: "#6d28d9" }}
            >
              <Icon size={11} weight="bold" className="sm:hidden" aria-hidden="true" />
              <Icon size={15} weight="bold" className="hidden sm:block" aria-hidden="true" />
            </span>
            <span
              className="hidden text-center text-[10.5px] font-semibold leading-tight tracking-[-0.01em] sm:block"
              style={{ color: "#292154" }}
            >
              {label}
            </span>
          </div>
        </div>
      ))}

      {/* Focal panel: darker, taller, the "outcome" of the progression. */}
      <div
        className="reveal relative flex shrink-0 flex-col justify-between overflow-hidden rounded-2xl px-2 py-2.5 sm:px-4 sm:py-5"
        style={{
          width: "clamp(72px, 18vw, 150px)",
          height: "clamp(180px, 48.2vw, 402px)",
          animationDelay: "360ms",
          transform: "rotateY(-14deg) rotateX(2deg) translateZ(30px)",
          transformStyle: "preserve-3d",
          background: "linear-gradient(160deg, #241d4e 0%, #171432 55%, #100e26 100%)",
          boxShadow: "0 30px 54px -24px rgba(20,14,50,0.55)",
        }}
      >
        <span
          className="inline-flex h-6 w-6 items-center justify-center rounded-full sm:h-8 sm:w-8"
          style={{ background: "rgba(167,139,250,0.16)", color: "#c4b5fd" }}
        >
          <ClipboardText size={13} weight="bold" className="sm:hidden" aria-hidden="true" />
          <ClipboardText size={15} weight="bold" className="hidden sm:block" aria-hidden="true" />
        </span>
        <div>
          <div className="font-display text-[11px] font-semibold leading-[1.2] tracking-[-0.01em] text-white sm:text-lg sm:leading-[1.15]">
            A More Resilient Tomorrow
          </div>
          <ArrowRight size={14} weight="bold" className="mt-1.5 text-purple-bright sm:mt-3 sm:size-4" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
