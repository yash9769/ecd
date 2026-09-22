import { HERO_STATS } from "../../data";

/* Four headline proof points with uniform spacing, consistent vertical hairlines, and balanced typography */
export default function HeroMetrics() {
  return (
    <div className="flex flex-col gap-5 pt-5 sm:pt-7 border-t border-white/10 lg:flex-row lg:items-center lg:gap-8 w-full">
      <dl className="grid grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-white/15 w-full">
        {HERO_STATS.map((s) => (
          <div
            key={s.label}
            className="flex flex-col justify-center sm:px-5 lg:px-7 first:sm:pl-0 last:sm:pr-0"
          >
            <dt className="font-display text-[28px] font-bold leading-none tracking-tight text-white sm:text-[30px] lg:text-[34px]">
              {s.v}
            </dt>
            <dd className="mt-2 text-[12.5px] font-medium leading-snug text-slate-300 sm:text-[13px] lg:text-[13.5px] max-w-[150px]">
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
          backgroundImage: "radial-gradient(#a78bfa 1.3px, transparent 1.3px)",
          backgroundSize: "10px 10px",
        }}
      />
    </div>
  );
}
