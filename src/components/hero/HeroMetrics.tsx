import { HERO_STATS } from "../../data";

/* Hairlines sit *between* stats, not before the first one — matching the
   reference, where the row reads as four grouped figures rather than four
   separately-ruled cells. */
export default function HeroMetrics() {
  return (
    <dl className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-y-0">
      {HERO_STATS.map((s, i) => (
        <div
          key={s.label}
          /* i===2 starts a new row in the 2-col mobile grid, so its divider
             only applies once the row becomes 4-up. */
          className={
            i === 0
              ? "pr-5 sm:pr-6"
              : i === 2
                ? "pr-5 sm:border-l sm:pl-6 sm:pr-6"
                : "border-l pl-5 sm:pl-6"
          }
          style={{ borderColor: "rgba(13,16,32,0.11)" }}
        >
          <dt className="font-display text-[26px] font-bold leading-none tracking-[-0.02em]" style={{ color: "#0d1020" }}>
            {s.v}
          </dt>
          <dd className="mt-2 text-[12px] leading-snug" style={{ color: "#6b7186" }}>
            {s.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
