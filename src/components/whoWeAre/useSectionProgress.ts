import { useEffect, useRef } from "react";

export type ProgressRef = { current: number };

/* Smoothstep — matches the easing used throughout the hero sequence so
   motion across the site reads consistently, without importing from the
   hero module itself. */
export function span(p: number, a: number, b: number) {
  const t = Math.min(Math.max((p - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* Continuous 0→1 progress as a normal (non-pinned) section transits the
   viewport: 0 while its top is still at the bottom edge, 1 once its bottom
   has reached the top edge. Written to a ref and applied via rAF, never to
   React state, so scrolling never triggers a rerender — same discipline as
   the hero's own scroll driver, just without the pin. */
export function useSectionProgress(
  ref: React.RefObject<HTMLElement | null>,
  apply: (p: number) => void,
) {
  const progress = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const read = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const p = total > 0 ? Math.min(Math.max((vh - rect.top) / total, 0), 1) : 0;
      progress.current = p;
      apply(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, apply]);

  return progress;
}
