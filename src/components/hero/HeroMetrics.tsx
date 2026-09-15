import { HERO_STATS } from "../../data";

export default function HeroMetrics() {
  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 sm:gap-4">
      {HERO_STATS.map((s) => (
        <div key={s.label} className="border-l pl-4" style={{ borderColor: "rgba(13,16,32,0.12)" }}>
          <dt className="font-display text-2xl font-bold tracking-[-0.02em]" style={{ color: "#0d1020" }}>
            {s.v}
          </dt>
          <dd className="mt-1 text-[12px] leading-snug" style={{ color: "#575f75" }}>
            {s.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
