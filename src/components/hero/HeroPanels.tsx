import type { Icon } from "@phosphor-icons/react";
import { ClipboardText, MagnifyingGlass, ShieldCheck, TrendUp } from "@phosphor-icons/react";

type Step = { label: string; icon: Icon; fill: string; border: string };

/* Light -> deeper progression across the four approach panels; the fifth
   (resilience) panel is the dark focal plane defined separately below. */
const STEPS: Step[] = [
  {
    label: "Identify Risks",
    icon: MagnifyingGlass,
    fill: "linear-gradient(170deg, rgba(252,251,255,0.94), rgba(238,233,252,0.88))",
    border: "rgba(124,58,237,0.20)",
  },
  {
    label: "Validate Exposure",
    icon: TrendUp,
    fill: "linear-gradient(170deg, rgba(246,243,255,0.95), rgba(226,218,250,0.92))",
    border: "rgba(124,58,237,0.24)",
  },
  {
    label: "Strengthen Defences",
    icon: ShieldCheck,
    fill: "linear-gradient(170deg, rgba(238,232,254,0.96), rgba(209,196,247,0.94))",
    border: "rgba(124,58,237,0.28)",
  },
  {
    label: "Ensure Compliance",
    icon: ClipboardText,
    fill: "linear-gradient(170deg, rgba(226,216,252,0.97), rgba(186,168,242,0.95))",
    border: "rgba(124,58,237,0.32)",
  },
];

const FOCAL_FILL = "linear-gradient(162deg, #2d2168 0%, #1c1545 52%, #120e2c 100%)";

/* Desktop/tablet: five tall architectural planes standing at an angle.
   The geometry is a shear (skewY), not a vanishing-point projection — in the
   reference every plane's top edge slopes by the same amount and they stay
   parallel, which is what a skew gives and what perspective does not. Each
   plane overlaps the one before it, grows taller and deepens in colour,
   ending on the dark resilience plane. No WebGL: shear, light and material. */
const SKEW = "skewY(-11deg)";

/* Geometry measured off the reference: each plane's height and how far its
   base sits above the group's baseline, as percentages of the visual's box.
   Tops climb and bases drop from left to right, so the group reads as one
   receding fan rather than five separate bars. */
const GEOM = [
  { left: 3, width: 19, height: 48, bottom: 27 },
  { left: 18, width: 19, height: 62, bottom: 17 },
  { left: 33, width: 19, height: 76, bottom: 10 },
  { left: 48, width: 19, height: 89, bottom: 4 },
];

function PerspectivePlanes() {
  return (
    <div className="relative hidden h-[360px] w-full max-w-[560px] sm:block md:h-[430px] lg:h-[496px]">
      {/* Faint angled wash behind the group — the reference's light lavender
          shape in the upper right. Almost invisible by design. */}
      <div
        aria-hidden="true"
        className="absolute -right-[10%] -top-[4%] h-[62%] w-[70%]"
        style={{ transform: SKEW, background: "linear-gradient(205deg, rgba(240,236,255,0.55), rgba(245,243,255,0))" }}
      />

      {/* The `.reveal` entrance animates `transform` with fill-mode:both, so
          it must never sit on the same element as the skew — its final
          translateY(0) would replace the shear outright. Animation lives on
          the positioned wrapper; the shear lives on the plane inside it. */}
      {STEPS.map(({ label, icon: Icon, fill, border }, i) => {
        const g = GEOM[i];
        return (
          <div
            key={label}
            className="reveal absolute"
            style={{
              left: `${g.left}%`,
              bottom: `${g.bottom}%`,
              width: `${g.width}%`,
              height: `${g.height}%`,
              animationDelay: `${i * 90}ms`,
            }}
          >
            <div
              className="relative h-full w-full rounded-[3px]"
              style={{
                transform: SKEW,
                background: fill,
                border: `1px solid ${border}`,
                boxShadow: "0 30px 52px -32px rgba(40,25,90,0.38), inset 0 1px 0 rgba(255,255,255,0.8)",
                backdropFilter: "blur(3px)",
              }}
            >
              <div className="absolute inset-x-0 top-[26%] flex flex-col items-center gap-4">
                <span
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "rgba(109,40,217,0.13)", color: "#6d28d9" }}
                >
                  <Icon size={15} weight="bold" aria-hidden="true" />
                </span>
                <span
                  className="whitespace-nowrap text-[13px] font-semibold tracking-[-0.005em]"
                  style={{ color: "#241b4f", writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  {label}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Resilience: the focal plane — deepest, tallest, carrying the payoff
          line. Its copy is counter-sheared so it reads level on the slanted
          plane instead of running off with it. */}
      <div
        className="reveal absolute"
        style={{ left: "66%", bottom: "1%", width: "30%", height: "100%", animationDelay: "380ms" }}
      >
        <div
          className="relative h-full w-full rounded-[3px]"
          style={{
            transform: SKEW,
            background: FOCAL_FILL,
            boxShadow: "0 46px 72px -30px rgba(25,16,62,0.55)",
          }}
        >
          <div className="absolute inset-x-0 top-[52%] px-[13%]" style={{ transform: "skewY(11deg)" }}>
            <div className="font-display text-[19px] font-semibold leading-[1.2] tracking-[-0.01em] text-white">
              A More
              <br />
              Resilient
              <br />
              Tomorrow
            </div>
            <span aria-hidden="true" className="mt-3.5 block h-[2px] w-9" style={{ background: "#a78bfa" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Mobile: the planes can't be read edge-on at 390px, so the same five-step
   progression is recomposed as a staircase of horizontal bars — same
   light-to-dark ordering, same focal endpoint, labels kept readable. */
function MobileStaircase() {
  const widths = [58, 68, 78, 88, 100];
  return (
    <div className="mx-auto flex w-[82vw] max-w-[360px] flex-col gap-2.5 py-2 sm:hidden">
      {STEPS.map(({ label, icon: Icon, fill, border }, i) => (
        <div
          key={label}
          className="reveal flex items-center gap-3 self-end rounded-xl px-4 py-3"
          style={{
            width: `${widths[i]}%`,
            animationDelay: `${i * 90}ms`,
            background: fill,
            border: `1px solid ${border}`,
            boxShadow: "0 14px 24px -18px rgba(40,25,90,0.34)",
          }}
        >
          <span
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
            style={{ background: "rgba(109,40,217,0.12)", color: "#6d28d9" }}
          >
            <Icon size={16} weight="bold" aria-hidden="true" />
          </span>
          <span className="text-[13px] font-semibold tracking-[-0.01em]" style={{ color: "#231a4d" }}>
            {label}
          </span>
        </div>
      ))}

      <div
        className="reveal flex items-center justify-between gap-3 self-end rounded-xl px-4 py-4"
        style={{ width: "100%", animationDelay: "380ms", background: FOCAL_FILL, boxShadow: "0 18px 32px -20px rgba(25,16,62,0.5)" }}
      >
        <div className="font-display text-[15px] font-semibold leading-tight tracking-[-0.01em] text-white">
          A More Resilient Tomorrow
        </div>
        <span aria-hidden="true" className="h-px w-6 shrink-0" style={{ background: "#a78bfa" }} />
      </div>
    </div>
  );
}

export default function HeroPanels() {
  return (
    <>
      <PerspectivePlanes />
      <MobileStaircase />
    </>
  );
}
