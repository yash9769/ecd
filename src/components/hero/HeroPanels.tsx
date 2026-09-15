import type { Icon } from "@phosphor-icons/react";
import { ArrowRight, ClipboardText, MagnifyingGlass, ShieldCheck, TrendUp } from "@phosphor-icons/react";

type Step = { label: string; icon: Icon };

const STEPS: Step[] = [
  { label: "Identify Risks", icon: MagnifyingGlass },
  { label: "Validate Exposure", icon: TrendUp },
  { label: "Strengthen Defences", icon: ShieldCheck },
  { label: "Ensure Compliance", icon: ClipboardText },
];

const GLASS_BG =
  "linear-gradient(155deg, rgba(255,255,255,0.92), rgba(237,233,252,0.72) 60%, rgba(216,206,246,0.6))";
const FOCAL_BG = "linear-gradient(160deg, #241d4e 0%, #171432 55%, #100e26 100%)";

/* Desktop/tablet: five architectural glass panels fanned in perspective,
   stepping up toward one darker, taller focal panel — a progression
   (identify -> validate -> strengthen -> ensure -> resilient). Pure CSS 3D
   (perspective + rotateY), no WebGL. Hidden below sm: at that width the
   panels have no room left for their own labels, so mobile gets its own
   composition below rather than a shrunk copy of this one. */
function DesktopFan() {
  return (
    <div
      className="relative mx-auto hidden w-full max-w-[560px] items-end justify-center gap-3 sm:flex lg:gap-4"
      style={{ perspective: "1400px", height: "clamp(300px, 50vw, 420px)" }}
    >
      {STEPS.map(({ label, icon: Icon }, i) => {
        const maxH = [250, 288, 326, 364][i];
        return (
          <div
            key={label}
            className="reveal relative shrink-0 overflow-hidden rounded-2xl border"
            style={{
              width: "clamp(50px, 9vw, 78px)",
              height: `clamp(${maxH * 0.65}px, ${(maxH / 78) * 9}vw, ${maxH}px)`,
              animationDelay: `${i * 90}ms`,
              transform: `rotateY(-16deg) rotateX(2deg) translateZ(${i * 6}px)`,
              transformStyle: "preserve-3d",
              background: GLASS_BG,
              borderColor: "rgba(109,40,217,0.16)",
              boxShadow: "0 24px 40px -28px rgba(30,20,70,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            <div className="absolute inset-x-0 top-4 flex flex-col items-center gap-3 px-1.5 sm:top-5">
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: "rgba(109,40,217,0.1)", color: "#6d28d9" }}
              >
                <Icon size={15} weight="bold" aria-hidden="true" />
              </span>
              <span className="text-center text-[10.5px] font-semibold leading-tight tracking-[-0.01em]" style={{ color: "#292154" }}>
                {label}
              </span>
            </div>
          </div>
        );
      })}

      {/* Focal panel: darker, taller, the "outcome" of the progression. */}
      <div
        className="reveal relative flex shrink-0 flex-col justify-between overflow-hidden rounded-2xl px-4 py-5"
        style={{
          width: "clamp(90px, 18vw, 150px)",
          height: "clamp(240px, 48.2vw, 402px)",
          animationDelay: "360ms",
          transform: "rotateY(-14deg) rotateX(2deg) translateZ(30px)",
          transformStyle: "preserve-3d",
          background: FOCAL_BG,
          boxShadow: "0 30px 54px -24px rgba(20,14,50,0.55)",
        }}
      >
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-full"
          style={{ background: "rgba(167,139,250,0.16)", color: "#c4b5fd" }}
        >
          <ClipboardText size={15} weight="bold" aria-hidden="true" />
        </span>
        <div>
          <div className="font-display text-lg font-semibold leading-[1.15] tracking-[-0.01em] text-white">
            A More Resilient Tomorrow
          </div>
          <ArrowRight size={16} weight="bold" className="mt-3 text-purple-bright" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

/* Mobile: a genuinely different composition, not the desktop fan shrunk
   down — a staircase of horizontal bars, each wide enough to carry its own
   icon and label, stepping outward and culminating in the same dark focal
   bar. This is what "recompose for mobile" means in practice: the fan's
   narrow vertical panels have no width left for text once they're small
   enough to fit a phone, so the composition changes shape instead of
   shrinking past the point of being legible. */
function MobileStaircase() {
  const widths = [58, 68, 78, 88, 100];
  return (
    <div className="mx-auto flex w-[82vw] max-w-[360px] flex-col gap-2.5 py-2 sm:hidden">
      {STEPS.map(({ label, icon: Icon }, i) => (
        <div
          key={label}
          className="reveal flex items-center gap-3 self-end rounded-2xl border px-4 py-3"
          style={{
            width: `${widths[i]}%`,
            animationDelay: `${i * 90}ms`,
            background: GLASS_BG,
            borderColor: "rgba(109,40,217,0.16)",
            boxShadow: "0 14px 24px -18px rgba(30,20,70,0.3)",
          }}
        >
          <span
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
            style={{ background: "rgba(109,40,217,0.1)", color: "#6d28d9" }}
          >
            <Icon size={16} weight="bold" aria-hidden="true" />
          </span>
          <span className="text-[13px] font-semibold tracking-[-0.01em]" style={{ color: "#292154" }}>
            {label}
          </span>
        </div>
      ))}

      {/* Focal bar: full width, dark — the outcome the staircase builds to. */}
      <div
        className="reveal flex items-center gap-3 self-end rounded-2xl px-4 py-4"
        style={{
          width: `${widths[4]}%`,
          animationDelay: "360ms",
          background: FOCAL_BG,
          boxShadow: "0 18px 32px -20px rgba(20,14,50,0.5)",
        }}
      >
        <span
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
          style={{ background: "rgba(167,139,250,0.16)", color: "#c4b5fd" }}
        >
          <ClipboardText size={17} weight="bold" aria-hidden="true" />
        </span>
        <div className="flex-1">
          <div className="font-display text-[15px] font-semibold leading-tight tracking-[-0.01em] text-white">
            A More Resilient Tomorrow
          </div>
        </div>
        <ArrowRight size={16} weight="bold" className="shrink-0 text-purple-bright" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function HeroPanels() {
  return (
    <>
      <DesktopFan />
      <MobileStaircase />
    </>
  );
}
