import { HERO_PROCESS } from "../../data";

/* The engagement framework beside the hero visual — Discover through
   Resilience — not a navigation menu: a thin rule runs through every node
   with a small purple dot marking each step, and the copy beneath reads as
   a supporting line rather than another heading. Two presentations, not one
   shrunk: a tall ruled column beside the visual at xl and up, a compact
   wrapped row beneath it below that. The column only sits beside the orbit
   system once there's width for both — at 1024-1279 the shield's four
   fixed-width service cards need the visual column's full space to avoid
   overlapping each other, so the column stays below rather than squeezing
   in beside them. */

export function HeroProcessColumn() {
  return (
    <div className="hidden shrink-0 items-stretch gap-4 xl:flex">
      <div className="relative w-px shrink-0 self-stretch" style={{ background: "rgba(124,58,237,0.22)" }}>
        {HERO_PROCESS.map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute left-1/2 h-[7px] w-[7px] -translate-x-1/2 rounded-full"
            style={{ top: `${(i / (HERO_PROCESS.length - 1)) * 100}%`, background: "#7c3aed", transform: "translate(-50%, -50%)" }}
          />
        ))}
      </div>
      <div className="flex flex-col justify-between py-1">
        <ul className="space-y-4">
          {HERO_PROCESS.map((label, i) => (
            <li key={label}>
              <div className="font-mono text-[11px]" style={{ color: "#9a8fc9" }}>
                0{i + 1}
              </div>
              <div className="text-[13px] font-semibold uppercase tracking-[0.06em]" style={{ color: "#0d1020" }}>
                {label}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-[10rem] text-[13px] italic leading-snug" style={{ color: "#575f75" }}>
          Turning security gaps into stronger organizations.
        </p>
      </div>
    </div>
  );
}

export function HeroProcessRow() {
  return (
    <div className="xl:hidden">
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="mt-1 h-10 w-px shrink-0" style={{ background: "#7c3aed" }} />
        <ul className="flex flex-wrap gap-x-5 gap-y-2.5">
          {HERO_PROCESS.map((label, i) => (
            <li key={label} className="flex items-baseline gap-1.5">
              <span className="font-mono text-[10px]" style={{ color: "#a99ed2" }}>
                0{i + 1}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: "#2a2f45" }}>
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-[13px] italic leading-snug" style={{ color: "#6b7186" }}>
        Turning security gaps into stronger organizations.
      </p>
    </div>
  );
}
