import { HERO_STATS } from "../../data";

/* Four headline proof points with hairlines between items and a subtle dot matrix on the right */
export default function HeroMetrics() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
      <dl className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4 sm:gap-x-0 sm:gap-y-0">
        {HERO_STATS.map((s, i) => (
          <div
            key={s.label}
            className={
              i === 0
                ? "pr-2 sm:pr-5"
                : i === 2
                  ? "pr-2 sm:border-l sm:border-slate-200 sm:dark:border-white/15 sm:pl-5 sm:pr-5"
                  : "border-l border-slate-200 dark:border-white/15 pl-3 sm:pl-5"
            }
          >
            <dt
              className="font-display text-[22px] font-bold leading-none tracking-[-0.02em] text-white transition-colors duration-200 sm:text-[24px] lg:text-[26px]"
            >
              {s.v}
            </dt>
            <dd className="mt-1 text-[11px] font-normal leading-tight text-slate-300 sm:text-[12px] transition-colors duration-200">
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
