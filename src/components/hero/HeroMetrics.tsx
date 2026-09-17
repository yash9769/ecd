import { HERO_STATS } from "../../data";

/* Four headline proof points with hairlines between items and a subtle dot matrix on the right */
export default function HeroMetrics() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
      <dl className="grid grid-cols-2 gap-y-3 sm:grid-cols-4 sm:gap-y-0">
        {HERO_STATS.map((s, i) => (
          <div
            key={s.label}
            className={
              i === 0
                ? "pr-3 sm:pr-5"
                : i === 2
                  ? "pr-3 sm:border-l sm:border-slate-200 sm:pl-5 sm:pr-5"
                  : "border-l border-slate-200 pl-3 sm:pl-5"
            }
          >
            <dt
              className="font-display text-[22px] font-bold leading-none tracking-[-0.02em] text-[#0d1020] lg:text-[26px]"
            >
              {s.v}
            </dt>
            <dd className="mt-1 text-[11px] font-normal leading-tight text-[#575f75] lg:text-[12px] whitespace-nowrap">
              {s.label}
            </dd>
          </div>
        ))}
      </dl>

      {/* Subtle Dot Matrix to the right of metrics, matching reference */}
      <div
        aria-hidden="true"
        className="hidden h-[36px] w-[52px] shrink-0 opacity-40 xl:block"
        style={{
          backgroundImage: "radial-gradient(#6d28d9 1.3px, transparent 1.3px)",
          backgroundSize: "10px 10px",
        }}
      />
    </div>
  );
}
