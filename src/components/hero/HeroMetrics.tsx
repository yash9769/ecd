import { HERO_STATS } from "../../data";

/* Four headline proof points with hairlines between items and a subtle dot matrix on the right */
export default function HeroMetrics() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
      <dl className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-y-0">
        {HERO_STATS.map((s, i) => (
          <div
            key={s.label}
            className={
              i === 0
                ? "pr-4 sm:pr-6"
                : i === 2
                  ? "pr-4 sm:border-l sm:border-slate-200 sm:pl-6 sm:pr-6"
                  : "border-l border-slate-200 pl-4 sm:pl-6"
            }
          >
            <dt
              className="font-display text-[26px] font-bold leading-none tracking-[-0.02em] text-[#0d1020] lg:text-[30px]"
            >
              {s.v}
            </dt>
            <dd className="mt-1.5 text-[12px] font-normal leading-snug text-[#575f75]">
              {s.label}
            </dd>
          </div>
        ))}
      </dl>

      {/* Subtle Dot Matrix to the right of metrics, matching reference */}
      <div
        aria-hidden="true"
        className="hidden h-[44px] w-[64px] shrink-0 opacity-40 xl:block"
        style={{
          backgroundImage: "radial-gradient(#6d28d9 1.3px, transparent 1.3px)",
          backgroundSize: "10px 10px",
        }}
      />
    </div>
  );
}
