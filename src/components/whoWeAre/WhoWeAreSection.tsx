import { Btn, Eyebrow, Reveal, RevealText } from "../ui";
import WhoWeAreVisual from "./WhoWeAreVisual";

const WRAP = "mx-auto max-w-[1240px] px-6 lg:px-10";

const PILLARS = ["People", "Process", "Technology", "Visibility", "Resilience"];

/* Premium "Who we are" band: the hero's dark cinematic close hands off to a
   warm, editorial white section. A single restrained 3D object — a stack of
   large architectural layers, not a diagram — carries the visual weight;
   everything else is typography, proportion and whitespace. */
export default function WhoWeAreSection() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#fbfaf7" }}>
      {/* Ambience only — a grid, a wash of violet, a soft shadow shape, all
          faint enough to almost disappear. Nothing here should be
          consciously noticed. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(rgba(13,16,32,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(13,16,32,0.028) 1px, transparent 1px)",
            backgroundSize: "76px 76px",
            maskImage: "radial-gradient(ellipse 72% 62% at 62% 45%, #000 25%, transparent 74%)",
            WebkitMaskImage: "radial-gradient(ellipse 72% 62% at 62% 45%, #000 25%, transparent 74%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(900px 560px at 78% 40%, rgba(124,58,237,0.06), transparent 68%)",
          }}
        />
        <div
          className="absolute right-[8%] top-[30%] h-56 w-56 rounded-full blur-3xl"
          style={{ background: "rgba(20,16,40,0.05)" }}
        />
      </div>

      <div
        className={`${WRAP} relative grid grid-cols-1 items-center gap-16 py-28 lg:grid-cols-[45fr_55fr] lg:gap-20 lg:py-32`}
      >
        <div className="order-1 max-w-xl">
          <Eyebrow tone="light">Who we are</Eyebrow>
          <h2 className="mt-5 display-lg" style={{ color: "#0d1020" }}>
            <RevealText text="Comprehensive." stagger={70} />
            <span className="block">
              <RevealText text="Proactive." start={140} />{" "}
              <span className="text-purple-deep">
                <RevealText text="Secure." start={220} />
              </span>
            </span>
          </h2>
          <Reveal delay={180}>
            <p className="lead mt-7" style={{ color: "#575f75" }}>
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
            <WhoWeAreVisual />

            {/* A design detail, not a headline: a small editorial note with
                a short rule, sitting quietly beside the object rather than
                floating above it. */}
            <div className="mt-10 flex items-start gap-4 lg:mt-12">
              <span aria-hidden="true" className="mt-1.5 h-6 w-px shrink-0" style={{ background: "#7c3aed" }} />
              <div
                className="font-display text-lg font-bold uppercase leading-tight tracking-[0.01em]"
                style={{ color: "#0d1020" }}
              >
                From risk
                <br />
                to <span className="text-purple-deep">resilience.</span>
              </div>
            </div>

            <ul
              className="mt-10 flex flex-wrap gap-x-3 gap-y-2 border-t pt-6 font-mono text-[10px] uppercase tracking-[0.2em] lg:mt-12"
              style={{ borderColor: "rgba(13,16,32,0.1)", color: "#8890a4" }}
            >
              {PILLARS.map((p, i) => (
                <li key={p} className="flex items-center gap-3">
                  {p}
                  {i < PILLARS.length - 1 && <span aria-hidden="true">·</span>}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
