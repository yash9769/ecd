const ITEMS = ["People", "Process", "Technology", "Visibility", "Resilience"];

/* The numbered index beside the hero panels — same five-part story as the
   "Who we are" section, introduced here and paid off there. */
export default function HeroIndex() {
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
