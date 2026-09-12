import { Suspense, lazy, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import markUrl from "../../imports/envista-mark.png";
import type { ProgressRef } from "./useHeroSequence";

const ShieldScene = lazy(() => import("./ShieldScene"));

/* Four enterprise labels, presented as an annotation block rather than
   chips floating over the render. */
export const LABELS: [string, string][] = [
  ["Threat intelligence", "Real-time visibility"],
  ["Data protection", "Critical data secured"],
  ["Risk management", "Identify exposure"],
  ["Compliance", "Stay audit-ready"],
];

export function useVisualEnvironment() {
  const [env, setEnv] = useState({ reduced: false, canRender3D: false, ready: false });
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 768px)");

    // Software or absent WebGL on a weak device costs more than the render is
    // worth, so fall back to the composed still.
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }

    const sync = () =>
      setEnv({ reduced: motion.matches, canRender3D: webgl && wide.matches, ready: true });
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

/* Composed still for small screens and the no-WebGL path. Deliberately its own
   composition — not the desktop scene scaled down. */
export function StillComposition() {
  return (
    <div className="relative mx-auto flex aspect-[5/4] w-full max-w-[340px] items-center justify-center sm:aspect-square sm:max-w-[400px]">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 44%,rgba(124,58,237,0.34),rgba(59,130,246,0.10) 46%,transparent 68%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[14%] left-1/2 h-6 w-[52%] -translate-x-1/2 rounded-[50%] blur-xl"
        style={{ background: "rgba(3,4,10,0.85)" }}
      />
      <img
        src={markUrl}
        alt=""
        width={440}
        height={508}
        className="relative w-[70%] max-w-[240px]"
        style={{ filter: "drop-shadow(0 18px 40px rgba(76,29,149,0.55))" }}
      />
    </div>
  );
}

/* The 3D layer. When the scroll sequence is active this spans the whole
   viewport so the camera push can fill the frame; the shield is offset in
   world space so it still reads in the right-hand half at rest. */
export function HeroCanvas({
  reduced,
  progress,
  fullBleed,
}: {
  reduced: boolean;
  progress: ProgressRef;
  fullBleed: boolean;
}) {
  return (
    <Canvas
      className={fullBleed ? "!absolute inset-0" : "!absolute inset-0"}
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.1, 6.1], fov: 34 }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Suspense fallback={null}>
        <ShieldScene reduced={reduced} progress={progress} />
      </Suspense>
    </Canvas>
  );
}

/* Static (non-sequence) presentation: canvas boxed in the right column. */
export default function HeroVisual({ progress }: { progress: ProgressRef }) {
  const { reduced, canRender3D, ready } = useVisualEnvironment();

  return (
    <div className="relative">
      <div
        className={`relative mx-auto w-full max-w-[620px] ${canRender3D ? "aspect-square" : ""}`}
      >
        {ready && canRender3D ? (
          <HeroCanvas reduced={reduced} progress={progress} fullBleed={false} />
        ) : (
          <div className="flex items-center justify-center">
            <StillComposition />
          </div>
        )}
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-line pt-6 lg:mt-10">
        {LABELS.map(([t, d]) => (
          <li key={t}>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg">{t}</div>
            <div className="mt-1 text-[12px] text-faint">{d}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
