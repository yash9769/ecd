import { useEffect, useRef, useState, type ReactNode } from "react";

/* Horizontal scroll — vertical scroll through the wrapper pans the track sideways */
export function HorizontalScroll({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const w = wrap.current;
    const t = track.current;
    if (!w || !t) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = w.getBoundingClientRect();
      const scrollable = t.scrollWidth - window.innerWidth;
      const total = w.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / total, 0), 1);
      t.style.transform = `translate3d(${-progress * scrollable}px,0,0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={wrap} style={{ height: "260vh" }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div ref={track} className="flex gap-6 px-6 will-change-transform lg:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}

/* Sticky storytelling — pin a visual while steps advance with scroll */
export function StickySteps({
  steps,
  visual,
  onActive,
}: {
  steps: { t: string; d: string; n: string }[];
  visual: ReactNode;
  onActive?: (i: number) => void;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const w = wrap.current;
    if (!w) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = w.getBoundingClientRect();
      const total = w.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / total, 0), 0.999);
      const i = Math.floor(progress * steps.length);
      setActive((prev) => {
        if (prev !== i) onActive?.(i);
        return i;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [steps.length, onActive]);

  return (
    <div ref={wrap} style={{ height: `${steps.length * 72}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-[1320px] items-center gap-12 px-6 lg:grid-cols-[1fr_1fr] lg:px-10">
          <div className="relative order-2 lg:order-1">{visual}</div>
          <div className="order-1 lg:order-2">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="border-l py-6 pl-6 transition-all duration-500"
                style={{
                  borderColor: i === active ? "#8b5cf6" : "rgba(255,255,255,0.1)",
                  opacity: i === active ? 1 : 0.32,
                  filter: i === active ? "none" : "blur(0.4px)",
                  transform: i === active ? "translateX(6px)" : "none",
                }}
              >
                <div className="font-mono text-[11px] tracking-[0.2em] text-purple-bright">{s.n}</div>
                <h3 className="mt-2 font-display text-2xl font-bold">{s.t}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
