import { HERO_ORBIT } from "../data";

/* Orthographic dot-sphere. Points on a lat/lon grid projected to 2D, with the
   back hemisphere dimmed so the globe reads as a solid volume rather than a
   flat disc. Generated rather than hand-drawn so the density stays even. */
function globeDots(r: number) {
  const dots: { x: number; y: number; o: number; s: number }[] = [];
  for (let lat = -78; lat <= 78; lat += 12) {
    const rad = (lat * Math.PI) / 180;
    const ring = Math.cos(rad) * r;
    const y = -Math.sin(rad) * r;
    const count = Math.max(6, Math.round(Math.cos(rad) * 30));
    for (let i = 0; i < count; i++) {
      const lon = (i / count) * Math.PI * 2;
      const x = Math.sin(lon) * ring;
      const front = Math.cos(lon) > 0;
      dots.push({
        x,
        y,
        o: front ? 0.85 : 0.22,
        s: front ? 1.5 : 1.1,
      });
    }
  }
  return dots;
}

const DOTS = globeDots(104);

export default function Shield() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[500px]">
      {/* ambient bloom behind the shield */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle at 50% 46%,rgba(124,58,237,0.35),transparent 62%)" }}
      />

      <svg
        viewBox="0 0 460 500"
        className="relative h-full w-full"
        fill="none"
        role="img"
        aria-label="A protective shield enclosing a globe, ringed by the four stages of the defence lifecycle: detect, prevent, respond and stay ahead."
      >
        <defs>
          <linearGradient id="sh-face" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#6d28d9" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.14" />
          </linearGradient>
          <linearGradient id="sh-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <radialGradient id="sh-core" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="0" />
          </radialGradient>
          <clipPath id="sh-clip">
            <path d="M230 26 L410 92 V250 C410 350 340 424 230 470 C120 424 50 350 50 250 V92 Z" />
          </clipPath>
        </defs>

        {/* shield body */}
        <path
          d="M230 26 L410 92 V250 C410 350 340 424 230 470 C120 424 50 350 50 250 V92 Z"
          fill="url(#sh-face)"
          stroke="url(#sh-edge)"
          strokeWidth="1.6"
        />

        {/* inner scan lines, clipped to the shield */}
        <g clipPath="url(#sh-clip)" opacity="0.5">
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1={40 + i * 28}
              x2="410"
              y2={40 + i * 28}
              stroke="rgba(167,139,250,0.12)"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* globe */}
        <g transform="translate(230 236)">
          <circle r="120" fill="url(#sh-core)" />
          <circle r="104" stroke="rgba(167,139,250,0.30)" strokeWidth="1" />
          <ellipse rx="104" ry="36" stroke="rgba(167,139,250,0.22)" strokeWidth="1" />
          <ellipse rx="104" ry="72" stroke="rgba(167,139,250,0.16)" strokeWidth="1" />
          <ellipse rx="40" ry="104" stroke="rgba(167,139,250,0.16)" strokeWidth="1" />
          <ellipse rx="76" ry="104" stroke="rgba(167,139,250,0.12)" strokeWidth="1" />
          {DOTS.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.s} fill="#c4b5fd" opacity={d.o} />
          ))}
        </g>

        {/* highlight along the leading edge */}
        <path
          d="M230 26 L410 92 V250"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>

      {/* Lifecycle labels. HTML rather than SVG text so they stay crisp and
          legible at every width instead of scaling with the viewBox. */}
      <ul className="pointer-events-none absolute inset-0 hidden sm:block">
        {HERO_ORBIT.map((label, i) => {
          const pos = [
            "left-[2%] top-[26%]",
            "right-[0%] top-[10%]",
            "left-[6%] bottom-[20%]",
            "right-[1%] bottom-[28%]",
          ][i];
          return (
            <li
              key={label}
              className={`absolute ${pos} flex items-center gap-2 rounded-full border border-line-strong bg-ink-2/85 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fg backdrop-blur-sm`}
            >
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-purple-bright"
                style={{ boxShadow: "0 0 8px #a78bfa" }}
              />
              {label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
