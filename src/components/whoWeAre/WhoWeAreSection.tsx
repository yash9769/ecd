import { Btn, Eyebrow, Reveal, RevealText } from "../ui";
import WhoWeAreVisual from "./WhoWeAreVisual";

const WRAP = "mx-auto max-w-[1240px] px-6 lg:px-10";

const PILLARS = ["People", "Process", "Technology", "Visibility", "Resilience"];

/* Premium "Who we are" band: the hero's dark cinematic close hands off to a
   warm, editorial white section. Dense rather than a giant empty canvas —
   the section is sized to its content, not to fill a fixed viewport. The
   visual is one physical argument (three foundations hold up one shared
   plane, which carries one outcome), not a diagram requiring a caption to
   decode. */
export default function WhoWeAreSection() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#fbfaf7" }}>
      {/* Ambience only — a grid, a wash of violet, both faint enough to
          almost disappear. Nothing here should be consciously noticed. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(rgba(13,16,32,0.026) 1px, transparent 1px), linear-gradient(90deg, rgba(13,16,32,0.026) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 70% 60% at 64% 46%, #000 25%, transparent 74%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 64% 46%, #000 25%, transparent 74%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(820px 500px at 76% 42%, rgba(124,58,237,0.06), transparent 68%)",
          }}
        />
      </div>

      <div className={`${WRAP} relative py-16 lg:py-[72px]`}>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[45fr_55fr] lg:gap-16">
          <div className="max-w-xl">
            <Eyebrow tone="light">Who we are</Eyebrow>
            <h2 className="mt-4 display-lg" style={{ color: "#0d1020" }}>
              <RevealText text="Comprehensive." stagger={70} />
              <span className="block">
                <RevealText text="Proactive." start={140} />{" "}
                <span className="text-purple-deep">
                  <RevealText text="Secure." start={220} />
                </span>
              </span>
            </h2>
            <Reveal delay={180}>
              <p className="lead mt-6" style={{ color: "#575f75" }}>
                Envista Cyber Defence provides end-to-end cybersecurity capabilities designed to
                protect, comply, and respond — helping enterprises, SMBs, and government entities
                stay resilient in an evolving threat landscape.
              </p>
              <div className="mt-7">
                <Btn to="/about" variant="light">
                  Learn more about us
                </Btn>
              </div>

              {/* A design detail, not a second headline — small type and a
                  short rule, sitting quietly under the CTA. */}
              <div className="mt-9 flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8" style={{ background: "#7c3aed" }} />
                <span
                  className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: "#0d1020" }}
                >
                  From risk to <span className="text-purple-deep">resilience.</span>
                </span>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal delay={120}>
              <WhoWeAreVisual />
            </Reveal>
          </div>
        </div>

        <div
          className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 border-t pt-6 font-mono text-[10px] uppercase tracking-[0.2em] lg:mt-16"
          style={{ borderColor: "rgba(13,16,32,0.1)", color: "#8890a4" }}
        >
          {PILLARS.map((p, i) => (
            <span key={p} className="flex items-center gap-3">
              {p}
              {i < PILLARS.length - 1 && <span aria-hidden="true">·</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
