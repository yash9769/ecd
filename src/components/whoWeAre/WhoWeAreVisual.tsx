import { Suspense, lazy, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import type { ProgressRef } from "./useSectionProgress";

const WhoWeAreScene = lazy(() => import("./WhoWeAreScene"));

const DESKTOP_MODULES = ["People", "Process", "Technology", "Visibility", "Resilience"];
const MOBILE_MODULES = ["People", "Process", "Technology"];

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

/* Flat composed fallback for reduced-motion or no-WebGL: the same
   composition — a core with modules around it — built from plain DOM/CSS
   instead of a canvas. No animation, no HUD chrome. */
function StillComposition({ labels }: { labels: string[] }) {
  const radius = 40;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-[28%] border border-[color:var(--color-paper-line)]"
        style={{
          background: "linear-gradient(155deg,#161a30,#2a2154 60%,#4c3a9c)",
          boxShadow: "0 30px 60px -30px rgba(31,20,74,0.45)",
        }}
      />
      {labels.map((label, i) => {
        const deg = -90 + (360 / labels.length) * i;
        const rad = (deg * Math.PI) / 180;
        const x = 50 + radius * Math.cos(rad);
        const y = 50 + radius * 0.86 * Math.sin(rad);
        return (
          <div
            key={label}
            className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-[color:var(--color-paper-line)] bg-white/80 backdrop-blur-sm"
            style={{ left: `${x}%`, top: `${y}%`, boxShadow: "0 16px 30px -18px rgba(31,20,74,0.28)" }}
          >
            <span className="sr-only">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

export function WhoWeAreLabels({ labels }: { labels: string[] }) {
  return (
    <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[color:var(--color-paper-line)] pt-5">
      {labels.map((label) => (
        <li
          key={label}
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-paper-muted)]"
        >
          {label}
        </li>
      ))}
    </ul>
  );
}

export default function WhoWeAreVisual({ progress }: { progress: ProgressRef }) {
  const { reduced, canRender3D, wide, ready } = useVisualEnvironment();
  const labels = wide ? DESKTOP_MODULES : MOBILE_MODULES;

  return (
    <div>
      <div className="relative mx-auto aspect-square w-full max-w-[520px]">
        {ready && canRender3D && !reduced ? (
          <Canvas
            className="!absolute inset-0"
            shadows
            dpr={[1, 1.75]}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            camera={{ position: [0, 0.2, 7.2], fov: 32 }}
          >
            <Suspense fallback={null}>
              <WhoWeAreScene progress={progress} moduleCount={labels.length} />
            </Suspense>
          </Canvas>
        ) : (
          <div className="flex h-full items-center justify-center">
            <StillComposition labels={labels} />
          </div>
        )}
      </div>
      <WhoWeAreLabels labels={labels} />
    </div>
  );
}
