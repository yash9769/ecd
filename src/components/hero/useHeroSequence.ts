import { useEffect, useRef, useState } from "react";

export type ProgressRef = { current: number };

/* Smoothstep between two scroll positions — used everywhere so each stage of
   the sequence eases in and out rather than starting and stopping abruptly. */
export function span(p: number, a: number, b: number) {
  const t = Math.min(Math.max((p - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* The cinematic sequence is desktop-only and opt-out under reduced motion.
   Pinning the viewport on touch fights the user's scroll, and without WebGL
   there is no camera to push, so both fall back to the plain hero. */
export function useSequenceEnabled() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 1024px)");
    const fine = window.matchMedia("(pointer: fine)");

    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }

    const sync = () => setEnabled(webgl && wide.matches && fine.matches && !motion.matches);
    sync();
    motion.addEventListener("change", sync);
    wide.addEventListener("change", sync);
    fine.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      wide.removeEventListener("change", sync);
      fine.removeEventListener("change", sync);
    };
  }, []);
  return enabled;
}

/* Drives scroll progress 0→1 across the pinned region.

   Progress is written to a ref and applied by an rAF callback, never to React
   state: the scene reads the ref inside useFrame and the DOM layers are set
   directly, so scrolling triggers zero rerenders. */
export function useScrollProgress(
  wrapRef: React.RefObject<HTMLElement | null>,
  enabled: boolean,
  apply: (p: number) => void,
) {
  const progress = useRef(0);

  useEffect(() => {
    if (!enabled) {
      progress.current = 0;
      apply(0);
      return;
    }
    const el = wrapRef.current;
    if (!el) return;

    let raf = 0;
    const read = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const travel = el.offsetHeight - window.innerHeight;
      const p = travel > 0 ? Math.min(Math.max(-rect.top / travel, 0), 1) : 0;
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
  }, [wrapRef, enabled, apply]);

  return progress;
}
