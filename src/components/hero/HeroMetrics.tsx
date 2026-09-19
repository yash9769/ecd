import { HERO_STATS } from "../../data";

/* Four headline proof points with uniform spacing, consistent vertical hairlines, and balanced typography */
export default function HeroMetrics() {
  return (
    <div className="flex flex-col gap-5 pt-6 sm:pt-8 border-t border-white/10 lg:flex-row lg:items-center lg:gap-8">
      <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-white/15">
        {HERO_STATS.map((s) => (
          <div
            key={s.label}
            className="flex flex-col justify-center sm:px-5 lg:px-6 first:sm:pl-0 last:sm:pr-0"
          >
            <dt className="font-display text-[26px] font-bold leading-none tracking-tight text-white sm:text-[28px] lg:text-[32px]">
              {s.v}
            </dt>
            <dd className="mt-2 text-[12px] font-medium leading-snug text-slate-300 sm:text-[12.5px] lg:text-[13px] max-w-[135px]">
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
