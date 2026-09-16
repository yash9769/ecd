import { HERO_PROCESS } from "../../data";

/* The engagement framework beside the hero visual — the standard cyber
   security lifecycle, Prevention through Recovery — not a navigation menu:
   a thin rule runs through every node, with the node itself marking where
   the engagement stands (hollow =
   ahead, large filled = current, small filled = done) rather than every
   step looking identical. Two presentations, not one shrunk: a tall ruled
   column beside the visual at xl and up, a compact wrapped row beneath it
   below that. The column only sits beside the orbit system once there's
   width for both — at 1024-1279 the shield's four fixed-width service
   cards need the visual column's full space to avoid overlapping each
   other, so the column stays below rather than squeezing in beside
   them. */

function Node({ i }: { i: number }) {
  if (i === 0) {
    return <span className="absolute left-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white" style={{ borderColor: "#7c3aed" }} />;
  }
  if (i === 1) {
    return <span className="absolute left-1/2 h-[13px] w-[13px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "#7c3aed", boxShadow: "0 0 0 4px rgba(124,58,237,0.16)" }} />;
  }
  return <span className="absolute left-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "#a78bfa" }} />;
}

export function HeroProcessColumn() {
  return (
    <div className="hidden shrink-0 items-stretch gap-4 xl:flex">
      <div className="relative w-px shrink-0 self-stretch" style={{ background: "rgba(124,58,237,0.22)" }}>
        {HERO_PROCESS.map((_, i) => (
          <span key={i} className="absolute" style={{ top: `${(i / (HERO_PROCESS.length - 1)) * 100}%` }}>
            <Node i={i} />
          </span>
        ))}
        {/* Continuation mark below the last node — the framework doesn't
            end at Recovery, it's ongoing. */}
        <span aria-hidden="true" className="absolute -bottom-8 left-1/2 h-4 w-px -translate-x-1/2" style={{ background: "#a78bfa" }} />
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
        <p
          aria-hidden="true"
          className="mt-10 max-w-[11rem] text-[19px] leading-[1.15]"
          style={{ fontFamily: "var(--font-hand)", color: "#4c3b8f", transform: "rotate(2deg)" }}
        >
          From risk to resilience. A stronger tomorrow.
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
        From risk to resilience. A stronger tomorrow.
      </p>
    </div>
  );
}
