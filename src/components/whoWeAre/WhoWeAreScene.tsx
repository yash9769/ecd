import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import markUrl from "../../imports/envista-mark.png";

export type EnteredRef = { current: boolean };

/* A layered architectural object, not a diagram: four large, simple slabs
   stacked directly on one another like a physical security product —
   polished base, a translucent white architectural layer, a dark navy glass
   core, and a clear protective glass cap — with the real brand mark seated
   on the core's face. No small parts, no scattered pieces, nothing floating
   apart from the stack itself. */
const BASE = { w: 2.6, h: 0.22, d: 1.75 };
const SLAB = { w: 2.05, h: 0.34, d: 1.35 };
const CORE = { w: 1.5, h: 0.52, d: 1.0 };
const CAP = { w: 1.8, h: 0.2, d: 1.2 };

const TOTAL_H = BASE.h + SLAB.h + CORE.h + CAP.h;
const Y_BASE = BASE.h / 2 - TOTAL_H / 2;
const Y_SLAB = BASE.h + SLAB.h / 2 - TOTAL_H / 2;
const Y_CORE = BASE.h + SLAB.h + CORE.h / 2 - TOTAL_H / 2;
const Y_CAP = BASE.h + SLAB.h + CORE.h + CAP.h / 2 - TOTAL_H / 2;

function Stack({ entered }: { entered: EnteredRef }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Group>(null);
  const rim = useRef<THREE.DirectionalLight>(null);
  const t = useRef(0);

  const mark = useTexture(markUrl);
  useEffect(() => {
    mark.colorSpace = THREE.SRGBColorSpace;
  }, [mark]);

  useFrame((_, delta) => {
    // Eased once toward 1 on entry, never scrubbed by scroll position — this
    // is a settle, not a sequence.
    t.current = THREE.MathUtils.damp(t.current, entered.current ? 1 : 0, 3.2, delta);
    const e = t.current;

    if (group.current) {
      // ~10px of lift at typical viewing distance, not a slide.
      group.current.position.y = THREE.MathUtils.lerp(-0.11, 0, e);
    }
    if (core.current) {
      // The core settles a beat behind the rest of the stack — a slightly
      // separate arrival, not the same motion repeated.
      const inner = THREE.MathUtils.smoothstep(e, 0.15, 1);
      core.current.position.y = THREE.MathUtils.lerp(-0.03, 0, inner);
    }
    if (rim.current) {
      rim.current.intensity = THREE.MathUtils.lerp(0.16, 0.42, e);
    }
  });

  return (
    <group ref={group}>
      {/* Base: dark polished platform */}
      <RoundedBox args={[BASE.w, BASE.h, BASE.d]} radius={0.03} smoothness={4} position={[0, Y_BASE, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#0c0d16"
          metalness={0.75}
          roughness={0.32}
          clearcoat={0.25}
          clearcoatRoughness={0.3}
          envMapIntensity={1}
          reflectivity={0.5}
        />
      </RoundedBox>

      {/* Layer 1: translucent white architectural slab */}
      <RoundedBox args={[SLAB.w, SLAB.h, SLAB.d]} radius={0.025} smoothness={4} position={[0, Y_SLAB, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#f6f5fb"
          transmission={0.3}
          thickness={0.5}
          roughness={0.36}
          ior={1.3}
          clearcoat={0.4}
          clearcoatRoughness={0.25}
          envMapIntensity={1.1}
          attenuationColor="#ded9f5"
          attenuationDistance={1}
        />
      </RoundedBox>

      {/* Layer 2: the dark navy glass core, carrying the mark. Its own group
          so the "inner layer" settle reads as distinct from the stack. */}
      <group ref={core} position={[0, Y_CORE, 0]}>
        <RoundedBox args={[CORE.w, CORE.h, CORE.d]} radius={0.02} smoothness={4} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#141a3a"
            transmission={0.35}
            thickness={0.8}
            roughness={0.16}
            ior={1.42}
            clearcoat={0.6}
            clearcoatRoughness={0.16}
            envMapIntensity={1.3}
            attenuationColor="#4c3a9c"
            attenuationDistance={0.9}
            reflectivity={0.5}
          />
        </RoundedBox>
        <mesh position={[0, 0, CORE.d / 2 + 0.005]}>
          <planeGeometry args={[0.42, 0.48]} />
          <meshBasicMaterial map={mark} transparent opacity={0.94} toneMapped={false} depthWrite={false} />
        </mesh>
      </group>

      {/* Layer 3: clear protective glass cap */}
      <RoundedBox args={[CAP.w, CAP.h, CAP.d]} radius={0.025} smoothness={4} position={[0, Y_CAP, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#f8f9ff"
          transmission={0.82}
          thickness={0.3}
          roughness={0.06}
          ior={1.5}
          clearcoat={0.5}
          clearcoatRoughness={0.08}
          envMapIntensity={1.4}
          attenuationColor="#efe9ff"
          attenuationDistance={1.2}
        />
      </RoundedBox>

      <directionalLight ref={rim} position={[3, 1.4, -2]} intensity={0.16} color="#a78bfa" />
    </group>
  );
}

export default function WhoWeAreScene({ entered }: { entered: EnteredRef }) {
  const shadowY = useMemo(() => Y_BASE - BASE.h / 2 - 0.01, []);

  return (
    <>
      <color attach="background" args={["#fbfaf7"]} />

      {/* Soft daylight-like studio rig — one key side, a quiet fill, nothing
          that reads as a light source in its own right. frames={1} bakes it
          once; this scene never needs to re-bake. */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={1.7} position={[-3.2, 2.6, 3]} scale={[7, 6, 1]} color="#ffffff" />
        <Lightformer intensity={0.55} position={[3.4, -0.6, 1.6]} scale={[5, 5, 1]} color="#e7ddff" />
        <Lightformer intensity={0.35} position={[0, -3, -1]} scale={[8, 3, 1]} color="#ece7fa" />
      </Environment>

      <ambientLight intensity={0.5} />
      <directionalLight position={[-3, 4, 3]} intensity={0.85} color="#fffdf8" castShadow shadow-mapSize={[1024, 1024]} />

      <Stack entered={entered} />

      <ContactShadows position={[0, shadowY, 0]} opacity={0.3} scale={6.5} blur={2.6} far={2.6} resolution={512} color="#161028" />
    </>
  );
}
