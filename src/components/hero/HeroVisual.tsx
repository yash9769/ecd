import { Suspense, lazy, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import markUrl from "../../imports/envista-mark.png";

const ShieldScene = lazy(() => import("./ShieldScene"));

/* Four enterprise labels, presented as an annotation column rather than
   chips floating over the render. */
const LABELS: [string, string][] = [
  ["Threat intelligence", "Real-time visibility"],
  ["Data protection", "Critical data secured"],
  ["Risk management", "Identify exposure"],
  ["Compliance", "Stay audit-ready"],
];

function useEnvironment() {
  const [env, setEnv] = useState({ reduced: false, canRender3D: false, ready: false });
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 768px)");

    // Software/absent WebGL on a low-end device costs more than the render is
    // worth, so fall back to the composed still instead.
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

/* Composed still used on small screens and as the 3D fallback. Deliberately
   its own composition — not the desktop scene scaled down. */
function StillComposition() {
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

export default function HeroVisual() {
  const { reduced, canRender3D, ready } = useEnvironment();

  return (
    <div className="relative">
      <div className="relative">
        {/* Reserve the box before we know which treatment renders, so the
            hero never reflows once it resolves. */}
        <div
          className={`relative mx-auto w-full max-w-[620px] ${
            canRender3D ? "aspect-square" : ""
          }`}
        >
          {ready && canRender3D ? (
            <Canvas
              className="!absolute inset-0"
              shadows
              dpr={[1, 1.75]}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              camera={{ position: [0, 0.1, 6.1], fov: 34 }}
              frameloop={reduced ? "demand" : "always"}
            >
              <Suspense fallback={null}>
                <ShieldScene reduced={reduced} />
              </Suspense>
            </Canvas>
          ) : (
            <div className="flex items-center justify-center">
              <StillComposition />
            </div>
          )}
        </div>
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
