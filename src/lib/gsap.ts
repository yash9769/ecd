/**
 * Centralized GSAP configuration.
 * Import `gsap` and helpers from here — never import directly from "gsap"
 * in components, so plugin registration stays in one place.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Default ease used across all entrance animations */
export const EASE_OUT = "power3.out";
export const EASE_SPRING = "elastic.out(1, 0.75)";

/**
 * Batch-reveals a list of elements as they enter the viewport.
 * @param selector  CSS selector for items inside `scope`
 * @param scope     The container element (GSAP scope)
 * @param stagger   Delay between each item (seconds)
 */
export function batchReveal(
  selector: string,
  scope: Element | null,
  stagger = 0.07,
) {
  if (!scope) return;
  ScrollTrigger.batch(selector, {
    onEnter: (elements) => {
      gsap.from(elements, {
        opacity: 0,
        y: 36,
        duration: 0.7,
        stagger,
        ease: EASE_OUT,
        overwrite: "auto",
      });
    },
    once: true,
    scroller: window,
  });
}

/**
 * Single-element scroll reveal.
 * Call inside `useGSAP` or a `useEffect`.
 */
export function scrollReveal(
  target: string | Element,
  options?: gsap.TweenVars & { triggerEl?: Element | null },
) {
  const { triggerEl, ...vars } = options ?? {};
  gsap.from(target, {
    opacity: 0,
    y: 40,
    duration: 0.75,
    ease: EASE_OUT,
    scrollTrigger: {
      trigger: triggerEl ?? (target as Element),
      start: "top 85%",
      once: true,
    },
    ...vars,
  });
}

export { gsap, ScrollTrigger, useGSAP };
