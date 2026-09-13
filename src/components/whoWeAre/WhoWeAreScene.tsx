import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import markUrl from "../../imports/envista-mark.png";
import { lerp, span, type ProgressRef } from "./useSectionProgress";

/* Pentagon (or triangle, on the reduced mobile pass) arrangement around the
   core. Slight per-module z offset keeps it reading as a real arrangement in
   space rather than flat icons pasted on a circle. */
function moduleLayout(count: number) {
  const radius = 2.05;
  const startDeg = -90;
  const step = 360 / count;
  return Array.from({ length: count }, (_, i) => {
    const rad = ((startDeg + i * step) * Math.PI) / 180;
    return new THREE.Vector3(
      Math.cos(rad) * radius,
      Math.sin(rad) * radius * 0.86,
      Math.sin(rad * 1.4) * 0.55,
    );
  });
}

/* Core: a faceted, translucent navy gem with the brand mark seated subtly
   inside it — visible through the material rather than printed on its
   surface, which is what keeps it reading as "contains the mark" rather
   than "has a logo stuck on it." */
function Core({ progress }: { progress: ProgressRef }) {
  const group = useRef<THREE.Group>(null);
  const mark = useTexture(markUrl);

  useEffect(() => {
    mark.colorSpace = THREE.SRGBColorSpace;
  }, [mark]);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.05, 0), []);
  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    // Under 5 degrees total, and only once the section is well underway —
    // this is a hint of life, not a spin.
    const deep = span(progress.current, 0.35, 0.9);
    g.rotation.y = THREE.MathUtils.degToRad(lerp(-1.5, 3, deep));
    g.rotation.x = THREE.MathUtils.degToRad(lerp(0.5, -1, deep));
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#141a3d"
          transmission={0.45}
          thickness={1.2}
          roughness={0.24}
          ior={1.4}
          attenuationColor="#4c3a9c"
          attenuationDistance={0.9}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          envMapIntensity={1.3}
          reflectivity={0.55}
          flatShading
        />
      </mesh>
      {/* depthTest off + low opacity: with the icosahedron's flat facets, a
          plane at any fixed depth would either sit outside the surface on
          some facets or be fully hidden on others. Skipping the depth test
          keeps the mark reading as a soft glow seated inside the gem
          regardless of which facet faces the camera. */}
      <mesh position={[0, 0, 0]} renderOrder={2}>
        <planeGeometry args={[0.95, 1.1]} />
        <meshBasicMaterial
          map={mark}
          transparent
          opacity={0.32}
          toneMapped={false}
          depthWrite={false}
          depthTest={false}
        />
      </mesh>
    </group>
  );
}

/* A single frosted-glass module. Rests slightly outward/below its final mark
   at section entry and settles in — a few pixels of travel, not an entrance. */
function Module({
  index,
  target,
  progress,
}: {
  index: number;
  target: THREE.Vector3;
  progress: ProgressRef;
}) {
  const group = useRef<THREE.Group>(null);
  const stagger = index * 0.03;

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const settle = span(progress.current, 0.08 + stagger, 0.42 + stagger);
    const deep = span(progress.current, 0.4, 0.95);

    // Entry: a small outward/downward offset that resolves to the resting
    // position. Depth (z) settles alongside x/y so the piece arrives from
    // slightly behind rather than sliding flat across the frame.
    const dir = target.clone().normalize();
    const restOffset = dir.multiplyScalar(0.55 * (1 - settle));
    const dropOffset = new THREE.Vector3(0, -0.35 * (1 - settle), 0.3 * (1 - settle));

    // Secondary drift once the section is fully in view: 10-20px worth of
    // world-space travel, the "almost feel it" movement from continued
    // scrolling rather than a second entrance.
    const driftY = lerp(0, 0.045, deep) * (index % 2 === 0 ? 1 : -1);

    g.position.set(
      target.x + restOffset.x + dropOffset.x,
      target.y + restOffset.y + dropOffset.y + driftY,
      target.z + restOffset.z + dropOffset.z,
    );
  });

  return (
    <group ref={group} position={target}>
      <RoundedBox args={[0.56, 0.56, 0.56]} radius={0.1} smoothness={4} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#eef0fb"
          transmission={0.4}
          thickness={0.45}
          roughness={0.3}
          ior={1.25}
          attenuationColor="#cdbdfa"
          attenuationDistance={0.6}
          clearcoat={0.55}
          clearcoatRoughness={0.18}
          envMapIntensity={1.25}
          reflectivity={0.4}
        />
      </RoundedBox>
      {/* Hairline edge — the "thin 1px borders" the section calls for,
          and what keeps a pale module legible against a white page where a
          true glass material alone would nearly vanish. */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(0.56, 0.56, 0.56)]} />
        <lineBasicMaterial color="#0d1020" transparent opacity={0.14} toneMapped={false} />
      </lineSegments>
    </group>
  );
}

/* Thin line from the core to each module, revealed (not drawn-on) as the
   section settles — a system diagram, not a HUD. Plain THREE.Line rather
   than drei's fat-line helper: that pulls in three-stdlib's Line2 renderer,
   ~250KB gzipped, for an effect this understated doesn't need it. */
function Connector({ target, progress, stagger }: { target: THREE.Vector3; progress: ProgressRef; stagger: number }) {
  // Built imperatively and mounted via <primitive>: the JSX intrinsic <line>
  // collides with the DOM/SVG element of the same name under React 19's
  // types, so this sidesteps the ambiguity entirely.
  const line = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), target]);
    const material = new THREE.LineBasicMaterial({ color: "#6d28d9", transparent: true, opacity: 0, toneMapped: false });
    return new THREE.Line(geometry, material);
  }, [target]);
  useEffect(
    () => () => {
      line.geometry.dispose();
      (line.material as THREE.Material).dispose();
    },
    [line],
  );

  useFrame(() => {
    const reveal = span(progress.current, 0.15 + stagger, 0.5 + stagger);
    (line.material as THREE.LineBasicMaterial).opacity = reveal * 0.35;
  });

  return <primitive object={line} />;
}

function GroundShadow() {
  return (
    <ContactShadows
      position={[0, -2.35, 0]}
      opacity={0.28}
      scale={7.5}
      blur={3}
      far={3}
      resolution={512}
      color="#1c1030"
    />
  );
}

export default function WhoWeAreScene({
  progress,
  moduleCount,
}: {
  progress: ProgressRef;
  moduleCount: number;
}) {
  const layout = useMemo(() => moduleLayout(moduleCount), [moduleCount]);

  return (
    <>
      {/* A real white behind the glass, not an alpha-transparent canvas: the
          transmissive core/modules need something to refract against, or
          they render as flat black (nothing to sample) instead of glass.
          Matches --color-paper exactly, so there's no seam with the page. */}
      <color attach="background" args={["#ffffff"]} />

      {/* Soft, pastel lightformers — a studio-photography rig, not the
          hero's deep-space environment. frames={1} bakes it once. */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={1.6} position={[-3, 2.5, 3]} scale={[7, 6, 1]} color="#ffffff" />
        <Lightformer intensity={0.9} position={[3.5, -1, 2]} scale={[5, 5, 1]} color="#e4d9ff" />
        <Lightformer intensity={0.5} position={[0, -3, -1]} scale={[8, 3, 1]} color="#d8ccf9" />
      </Environment>

      <ambientLight intensity={0.55} />
      <directionalLight position={[-3, 4, 3]} intensity={0.9} color="#ffffff" castShadow shadow-mapSize={[1024, 1024]} />
      {/* subtle violet rim, kept low so it reads as a bounce, not a glow */}
      <directionalLight position={[3, -1, -2]} intensity={0.5} color="#a78bfa" />

      <Core progress={progress} />

      {layout.map((pos, i) => (
        <Module key={i} index={i} target={pos} progress={progress} />
      ))}
      {layout.map((pos, i) => (
        <Connector key={i} target={pos} progress={progress} stagger={i * 0.03} />
      ))}

      <GroundShadow />
    </>
  );
}
