import { useCallback, useRef } from "react";
import { Btn, Eyebrow, Reveal, RevealText } from "../ui";
import WhoWeAreVisual from "./WhoWeAreVisual";
import { lerp, span, useSectionProgress } from "./useSectionProgress";

const WRAP = "mx-auto max-w-[1240px] px-6 lg:px-10";

/* Premium "Who we are" band: dark hero hands off to a clean white, editorial
   section. Two columns (45/55), generous whitespace, a restrained 3D system
   on the right rather than any illustration — the section should feel
   expensive because of spacing/typography/materials, not effects. */
export default function WhoWeAreSection() {
  const wrap = useRef<HTMLDivElement>(null);
  const resilience = useRef<HTMLDivElement>(null);

  const apply = useCallback((p: number) => {
    const el = resilience.current;
    if (!el) return;
    // "From Risk to Resilience" gains prominence the further the user scrolls
    // through the section — a slow, almost-imperceptible lift, not a reveal.
    const deep = span(p, 0.35, 0.9);
    el.style.opacity = String(lerp(0.55, 1, deep));
    el.style.transform = `translate3d(0,${lerp(6, 0, deep)}px,0)`;
  }, []);

  const progress = useSectionProgress(wrap, apply);

  return (
    <section ref={wrap} className="paper relative overflow-hidden">
      {/* Extremely low-opacity technical grid — a texture, not a pattern
          anyone consciously notices. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,16,32,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(13,16,32,0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 42%, #000 30%, transparent 76%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 42%, #000 30%, transparent 76%)",
        }}
      />

      <div
        className={`${WRAP} relative grid grid-cols-1 items-center gap-16 py-24 lg:grid-cols-[45fr_55fr] lg:gap-20 lg:py-36`}
      >
        <div className="order-1 max-w-xl">
          <Eyebrow tone="light">Who we are</Eyebrow>
          <h2 className="mt-5 display-lg">
            <RevealText text="Comprehensive." stagger={70} />
            <span className="block">
              <RevealText text="Proactive." start={140} />{" "}
              <span className="text-purple-deep">
                <RevealText text="Secure." start={220} />
              </span>
            </span>
          </h2>
          <Reveal delay={180}>
            <p className="lead paper-muted mt-7">
              Envista Cyber Defence provides end-to-end cybersecurity capabilities designed to
              protect, comply, and respond — helping enterprises, SMBs, and government entities
              stay resilient in an evolving threat landscape.
            </p>
            <div className="mt-8">
              <Btn to="/about" variant="light">
                Learn more about us
              </Btn>
            </div>
          </Reveal>
        </div>

        <div className="order-2">
          <Reveal delay={120}>
            <div ref={resilience} className="mb-8 will-change-transform lg:mb-10">
              <div className="display-md text-[color:var(--color-paper-fg)]">
                From Risk
                <br />
                to <span className="text-purple-deep">Resilience.</span>
              </div>
            </div>
            <WhoWeAreVisual progress={progress} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
