const ITEMS = ["People", "Process", "Technology", "Visibility", "Resilience"];

/* The numbered index beside the hero panels — same five-part story as the
   rest of the page, introduced here. Two presentations, not one shrunk:
   a tall ruled column beside the visual at lg and up, and a compact wrapped
   row beneath the visual below that. The column only earns its place once
   there's width for it — at 768-1023 it squeezed the planes hard enough to
   push the focal panel's copy outside its own plane. */

export function HeroIndexColumn() {
  return (
    <div className="hidden shrink-0 items-stretch gap-4 lg:flex">
      <span aria-hidden="true" className="w-px shrink-0 self-stretch" style={{ background: "#7c3aed" }} />
      <div className="flex flex-col justify-between py-1">
        <ul className="space-y-4">
          {ITEMS.map((label, i) => (
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
        <p className="mt-8 max-w-[10rem] text-[13px] leading-snug" style={{ color: "#575f75" }}>
          Turning uncertainty into opportunity.
        </p>
      </div>
    </div>
  );
}

export function HeroIndexRow() {
  return (
    <div className="lg:hidden">
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="mt-1 h-10 w-px shrink-0" style={{ background: "#7c3aed" }} />
        <ul className="flex flex-wrap gap-x-5 gap-y-2.5">
          {ITEMS.map((label, i) => (
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
      <p className="mt-4 text-[13px] leading-snug" style={{ color: "#6b7186" }}>
        Turning uncertainty into opportunity.
      </p>
    </div>
  );
}
