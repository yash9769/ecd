import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useEnterOnce } from "./useEnterOnce";

const WhoWeAreScene = lazy(() => import("./WhoWeAreScene"));

function useVisualEnvironment() {
  const [env, setEnv] = useState({ reduced: false, canRender3D: false, ready: false });
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }

    const sync = () => setEnv({ reduced: motion.matches, canRender3D: webgl, ready: true });
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);
  return env;
}

/* Flat composed fallback for reduced-motion or no-WebGL: the same idea —
   a stack of large, simple layers with the mark on the core — built from
   plain CSS instead of a canvas. No animation. */
function StillComposition() {
  return (
    <div className="relative mx-auto flex w-full max-w-[420px] flex-col items-center gap-1.5 py-10">
      <div
        aria-hidden="true"
        className="h-8 w-[86%] rounded-lg"
        style={{ background: "linear-gradient(180deg,#f9f8ff,#f0edfb)", boxShadow: "0 1px 0 rgba(13,16,32,0.06)" }}
      />
      <div
        aria-hidden="true"
        className="flex h-20 w-[64%] items-center justify-center rounded-lg"
        style={{ background: "linear-gradient(155deg,#181c3c,#2a2154)" }}
      >
        <div className="h-8 w-7 rounded-sm bg-white/90" />
      </div>
      <div
        aria-hidden="true"
        className="h-6 w-[72%] rounded-lg"
        style={{ background: "linear-gradient(180deg,#ffffff,#f4f2fc)", boxShadow: "0 1px 0 rgba(13,16,32,0.06)" }}
      />
      <div aria-hidden="true" className="h-5 w-[94%] rounded-md bg-[#0c0d16]" />
      <div
        aria-hidden="true"
        className="mt-4 h-4 w-[58%] rounded-full blur-md"
        style={{ background: "rgba(23,16,40,0.16)" }}
      />
    </div>
  );
}

export default function WhoWeAreVisual() {
  const { reduced, canRender3D, ready } = useVisualEnvironment();
  const wrap = useRef<HTMLDivElement>(null);
  const entered = useEnterOnce(wrap);

  return (
    <div ref={wrap} className="relative mx-auto aspect-[6/5] w-full max-w-[560px]">
      {ready && canRender3D && !reduced ? (
        <Canvas
          className="!absolute inset-0"
          shadows
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [2.9, 2.1, 5.4], fov: 26 }}
        >
          <Suspense fallback={null}>
            <WhoWeAreScene entered={entered} />
          </Suspense>
        </Canvas>
      ) : (
        <div className="flex h-full items-center justify-center">
          <StillComposition />
        </div>
      )}
    </div>
  );
}
