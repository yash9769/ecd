import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import markUrl from "../../imports/envista-mark.png";

export type EnteredRef = { current: boolean };

/* The object IS the argument: three equal foundations (People, Process,
   Technology) physically support one shared plane (Visibility) — three
   inputs converging into a single, unified view — which in turn carries a
   single refined summit (Resilience), the outcome that plane makes
   possible. Convergence is shown by what holds what up, not by arrows or
   labels doing the work. */
const FOUNDATION = { w: 0.98, h: 0.58, d: 0.98 };
const FOUNDATION_GAP = 0.28; // gap between foundation blocks
const VISIBILITY = { w: 3.5, h: 0.32, d: 1.1 };
const RESILIENCE = { w: 1.35, h: 0.3, d: 0.85 };

const FOUNDATION_X = FOUNDATION.w + FOUNDATION_GAP; // centre-to-centre spacing
const Y_FOUNDATION = FOUNDATION.h / 2;
const Y_VISIBILITY = FOUNDATION.h + VISIBILITY.h / 2;
const Y_RESILIENCE = FOUNDATION.h + VISIBILITY.h + RESILIENCE.h / 2;
const GROUP_Y_OFFSET = -(FOUNDATION.h + VISIBILITY.h + RESILIENCE.h) / 2;

const FOUNDATION_MATERIAL = {
  color: "#12162c",
  metalness: 0.5,
  roughness: 0.38,
  clearcoat: 0.35,
  clearcoatRoughness: 0.28,
  envMapIntensity: 1.1,
} as const;

function Foundation({
  x,
  entryOffset,
  stageRef,
}: {
  x: number;
  entryOffset: [number, number];
  stageRef: { current: number };
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    // Reads the ref fresh every frame — a plain number prop here would be
    // frozen at whatever it was on the one render this component gets.
    const stage = stageRef.current;
    g.position.x = x + entryOffset[0] * (1 - stage);
    g.position.z = entryOffset[1] * (1 - stage);
  });
  return (
    <group ref={ref} position={[x, Y_FOUNDATION, 0]}>
      <RoundedBox args={[FOUNDATION.w, FOUNDATION.h, FOUNDATION.d]} radius={0.02} smoothness={4} castShadow receiveShadow>
        <meshPhysicalMaterial {...FOUNDATION_MATERIAL} />
      </RoundedBox>
    </group>
  );
}

function Assembly({ entered }: { entered: EnteredRef }) {
  const t = useRef(0);
  const visibility = useRef<THREE.Group>(null);
  const resilience = useRef<THREE.Group>(null);
  const rim = useRef<THREE.DirectionalLight>(null);

  const mark = useTexture(markUrl);
  useEffect(() => {
    mark.colorSpace = THREE.SRGBColorSpace;
  }, [mark]);

  // Cascading assembly, all derived from one damped master value: the three
  // foundations align first, the plane they support settles once they're
  // mostly in place, and the summit arrives last — communicating build order
  // (inputs, then the view they enable, then the outcome) without a second
  // timer or any per-frame React state.
  const stageFoundation = useRef(0);
  const stageVisibility = useRef(0);
  const stageResilience = useRef(0);

  useFrame((_, delta) => {
    t.current = THREE.MathUtils.damp(t.current, entered.current ? 1 : 0, 2.6, delta);
    const e = t.current;
    stageFoundation.current = THREE.MathUtils.smoothstep(e, 0, 0.55);
    stageVisibility.current = THREE.MathUtils.smoothstep(e, 0.4, 0.85);
    stageResilience.current = THREE.MathUtils.smoothstep(e, 0.65, 1);

    if (visibility.current) {
      // ~12px of settle, arriving from directly above its resting place.
      visibility.current.position.y = Y_VISIBILITY + THREE.MathUtils.lerp(0.09, 0, stageVisibility.current);
    }
    if (resilience.current) {
      resilience.current.position.y = Y_RESILIENCE + THREE.MathUtils.lerp(0.07, 0, stageResilience.current);
    }
    if (rim.current) {
      rim.current.intensity = THREE.MathUtils.lerp(0.14, 0.4, e);
    }
  });

  return (
    <>
      <Foundation x={-FOUNDATION_X} entryOffset={[-0.12, 0.07]} stageRef={stageFoundation} />
      <Foundation x={0} entryOffset={[0, -0.1]} stageRef={stageFoundation} />
      <Foundation x={FOUNDATION_X} entryOffset={[0.12, 0.07]} stageRef={stageFoundation} />

      {/* Visibility: one continuous plane spanning all three foundations —
          three inputs, one unified surface. */}
      <group ref={visibility} position={[0, Y_VISIBILITY, 0]}>
        <RoundedBox args={[VISIBILITY.w, VISIBILITY.h, VISIBILITY.d]} radius={0.02} smoothness={4} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#f6f5fb"
            transmission={0.5}
            thickness={0.4}
            roughness={0.24}
            ior={1.35}
            clearcoat={0.5}
            clearcoatRoughness={0.16}
            envMapIntensity={1.25}
            attenuationColor="#cdbdfa"
            attenuationDistance={0.9}
          />
        </RoundedBox>
        {/* The real mark, seated subtly within the glass rather than
            printed on it — depthTest off so it reads through the surface
            regardless of viewing angle. */}
        <mesh position={[0, 0, 0]} renderOrder={2}>
          <planeGeometry args={[0.34, 0.39]} />
          <meshBasicMaterial
            map={mark}
            transparent
            opacity={0.4}
            toneMapped={false}
            depthWrite={false}
            depthTest={false}
          />
        </mesh>
      </group>

      {/* Resilience: the single outcome the plane makes possible — smaller,
          refined, given its own faint purple sheen rather than a new
          colour, so it reads as "distilled from the same system" rather
          than an unrelated object placed on top. */}
      <group ref={resilience} position={[0, Y_RESILIENCE, 0]}>
        <RoundedBox args={[RESILIENCE.w, RESILIENCE.h, RESILIENCE.d]} radius={0.02} smoothness={4} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#1a1233"
            metalness={0.55}
            roughness={0.26}
            clearcoat={0.55}
            clearcoatRoughness={0.18}
            envMapIntensity={1.3}
            sheen={0.5}
            sheenColor="#a78bfa"
            sheenRoughness={0.6}
          />
        </RoundedBox>
      </group>

      <directionalLight ref={rim} position={[3, 1.4, -2]} intensity={0.14} color="#a78bfa" />
    </>
  );
}

export default function WhoWeAreScene({ entered }: { entered: EnteredRef }) {
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

      <group position={[0, GROUP_Y_OFFSET, 0]}>
        <Assembly entered={entered} />
      </group>

      <ContactShadows position={[0, GROUP_Y_OFFSET - 0.01, 0]} opacity={0.28} scale={6.5} blur={2.4} far={2.6} resolution={512} color="#161028" />
    </>
  );
}
