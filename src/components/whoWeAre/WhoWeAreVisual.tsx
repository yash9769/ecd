import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useEnterOnce } from "./useEnterOnce";

const WhoWeAreScene = lazy(() => import("./WhoWeAreScene"));

const FOUNDATIONS: [string, string][] = [
  ["People", "Security expertise and human judgement"],
  ["Process", "Structured assessment and governance"],
  ["Technology", "Security tools and technical controls"],
];

const ALL_LAYERS: [string, string][] = [
  ...FOUNDATIONS,
  ["Visibility", "Understand exposure and risk"],
  ["Resilience", "Protect, respond and continue"],
];

function useVisualEnvironment() {
  const [env, setEnv] = useState({ reduced: false, canRender3D: false, wide: false, ready: false });
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 1024px)");

    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }

    const sync = () =>
      setEnv({ reduced: motion.matches, canRender3D: webgl, wide: wide.matches, ready: true });
    sync();
    motion.addEventListener("change", sync);
    wide.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      wide.removeEventListener("change", sync);
    };
  }, []);
  return env;
}

/* Caption sitting under the visual — plain text, no card, no border. The
   geometry above already shows three legs converging into one plane
   carrying one summit; these just name what's already legible. */
function LayerCaption({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#0d1020" }}>
        {title}
      </div>
      <div className="mt-1 text-[11.5px] leading-snug" style={{ color: "#7d8498" }}>
        {desc}
      </div>
    </div>
  );
}

/* Vertical progression for mobile/reduced-motion/no-WebGL: the same idea —
   three inputs converging into one view, producing one outcome — built as a
   compact rail of rows instead of a 3D scene. Genuinely different from the
   desktop composition, not the same object squeezed into a narrow frame. */
function VerticalProgression() {
  const rows: { title: string; desc: string; swatch: string }[] = [
    ...FOUNDATIONS.map(([title, desc]) => ({ title, desc, swatch: "linear-gradient(155deg,#181c3c,#2a2154)" })),
    {
      title: "Visibility",
      desc: "Understand exposure and risk",
      swatch: "linear-gradient(155deg,#ffffff,#e9e5f7)",
    },
    {
      title: "Resilience",
      desc: "Protect, respond and continue",
      swatch: "linear-gradient(155deg,#241a3f,#3b2a63)",
    },
  ];
  return (
    <div className="relative mx-auto w-full max-w-[380px] py-2">
      <div aria-hidden="true" className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: "rgba(13,16,32,0.12)" }} />
      <ul className="space-y-5">
        {rows.map((r) => (
          <li key={r.title} className="relative flex items-start gap-4 pl-0">
            <span
              aria-hidden="true"
              className="relative z-10 mt-0.5 h-3.5 w-3.5 shrink-0 rounded-[4px]"
              style={{ background: r.swatch, boxShadow: "0 1px 2px rgba(13,16,32,0.25)" }}
            />
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#0d1020" }}>
                {r.title}
              </div>
              <div className="mt-0.5 text-[11.5px] leading-snug" style={{ color: "#7d8498" }}>
                {r.desc}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WhoWeAreVisual() {
  const { reduced, canRender3D, wide, ready } = useVisualEnvironment();
  const wrap = useRef<HTMLDivElement>(null);
  const entered = useEnterOnce(wrap);

  const show3D = ready && canRender3D && wide && !reduced;

  return (
    <div ref={wrap}>
      {show3D ? (
        <>
          <div className="relative aspect-[16/10] w-full">
            <Canvas
              className="!absolute inset-0"
              shadows
              dpr={[1, 1.75]}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              camera={{ position: [1.1, 2.0, 6.4], fov: 23 }}
            >
              <Suspense fallback={null}>
                <WhoWeAreScene entered={entered} />
              </Suspense>
            </Canvas>
          </div>

          {/* Below the render, not overlaid on it: five columns line up
              with reading order (three foundations, then what they
              converge into, then the outcome), with no risk of text
              colliding with the geometry at any viewport width. */}
          <div className="mt-5 grid grid-cols-5 gap-3 border-t pt-5" style={{ borderColor: "rgba(13,16,32,0.1)" }}>
            {ALL_LAYERS.map(([title, desc]) => (
              <LayerCaption key={title} title={title} desc={desc} />
            ))}
          </div>
        </>
      ) : (
        <VerticalProgression />
      )}
    </div>
  );
}
