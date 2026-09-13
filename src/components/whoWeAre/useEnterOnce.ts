import { useEffect, useRef } from "react";

/* Fires once when the element enters the viewport. A ref, not React state —
   the 3D scene reads it inside useFrame and eases toward it there, so
   entering view never triggers a rerender of the R3F tree. */
export function useEnterOnce(ref: React.RefObject<HTMLElement | null>) {
  const entered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting || e.boundingClientRect.top < 0) {
          entered.current = true;
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return entered;
}
