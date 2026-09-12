import { HERO_STATS } from "../../data";

export default function HeroMetrics() {
  return (
    <dl className="grid grid-cols-3 gap-4 sm:gap-8">
      {HERO_STATS.map((s) => (
        <div key={s.label} className="border-l border-line-strong pl-4">
          <dt className="font-display text-xl font-extrabold tracking-[-0.02em] text-fg sm:text-[1.75rem]">
            {s.v}
          </dt>
          <dd className="mt-1.5 text-[11px] leading-snug text-muted sm:text-[12px]">
            {s.label}
            <span className="block text-faint">{s.sub}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
