import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, useTexture } from "@react-three/drei";
import * as THREE from "three";
import markUrl from "../../imports/envista-mark.png";
import { lerp, span, type ProgressRef } from "./useHeroSequence";

/* Where the shield sits at rest so it reads in the right-hand half of a
   full-viewport canvas, and where it travels to as the sequence plays. */
const REST_X = 2.16;

/* The silhouette is traced from the real Envista mark: a peaked top edge,
   straight shoulders, and sides that sweep into a rounded point. Extruding
   this (rather than a generic heater shield) is what makes the object read
   as the brand's shield and not stock geometry. */
function shieldShape() {
  const s = new THREE.Shape();
  const w = 1.0;
  s.moveTo(0, 1.16);
  s.lineTo(w * 0.97, 0.84);
  s.quadraticCurveTo(w, 0.82, w, 0.76);
  s.lineTo(w, 0.06);
  s.bezierCurveTo(w, -0.5, w * 0.6, -0.92, 0, -1.16);
  s.bezierCurveTo(-w * 0.6, -0.92, -w, -0.5, -w, 0.06);
  s.lineTo(-w, 0.76);
  s.quadraticCurveTo(-w, 0.82, -w * 0.97, 0.84);
  s.closePath();
  return s;
}

const EXTRUDE: THREE.ExtrudeGeometryOptions = {
  depth: 0.22,
  bevelEnabled: true,
  bevelThickness: 0.055,
  bevelSize: 0.045,
  bevelOffset: 0,
  bevelSegments: 8,
  curveSegments: 48,
};

function Shield({ reduced, progress }: { reduced: boolean; progress: ProgressRef }) {
  const group = useRef<THREE.Group>(null);
  const mark = useTexture(markUrl);

  const geometry = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(shieldShape(), EXTRUDE);
    g.center();
    return g;
  }, []);

  useEffect(() => {
    mark.colorSpace = THREE.SRGBColorSpace;
    mark.anisotropy = 8;
  }, [mark]);

  // Geometry is created outside R3F's declarative tree, so dispose it by hand.
  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const p = progress.current;

    // Travel to centre, then grow as the camera closes in.
    const toCentre = span(p, 0.12, 0.62);
    const growth = span(p, 0.3, 0.92);
    g.position.x = lerp(REST_X, 0, toCentre);
    const scale = lerp(1, 1.5, growth);
    g.scale.setScalar(scale);

    if (reduced) return;

    // Idle drift fades out as the sequence takes over, so the two motions
    // never fight each other.
    const idle = 1 - toCentre;
    g.position.y = Math.sin(t * 0.45) * 0.045 * idle;
    g.rotation.y = lerp(-0.22 + Math.sin(t * 0.22) * 0.055, 0, toCentre);
    g.rotation.x = lerp(0.04 + Math.cos(t * 0.19) * 0.022, 0, toCentre);
  });

  return (
    <group ref={group} position={[REST_X, 0, 0]} rotation={[0.04, -0.22, 0]}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#141225"
          metalness={0.92}
          roughness={0.26}
          clearcoat={1}
          clearcoatRoughness={0.18}
          envMapIntensity={1.15}
          reflectivity={0.7}
        />
      </mesh>

      {/* Brand mark inset on the face, lit from within rather than printed flat */}
      <mesh position={[0, 0, 0.166]}>
        <planeGeometry args={[1.62, 1.87]} />
        <meshStandardMaterial
          map={mark}
          transparent
          toneMapped={false}
          emissiveMap={mark}
          emissive="#ffffff"
          emissiveIntensity={0.42}
          roughness={0.4}
          metalness={0.1}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* Restrained network layer: a sparse point-sphere well behind the shield,
   dim enough to read as depth rather than as a feature. */
function NetworkLayer({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const pts: number[] = [];
    const R = 2.05;
    for (let lat = -70; lat <= 70; lat += 14) {
      const rad = (lat * Math.PI) / 180;
      const ring = Math.cos(rad) * R;
      const y = Math.sin(rad) * R;
      const n = Math.max(6, Math.round(Math.cos(rad) * 22));
      for (let i = 0; i < n; i++) {
        const lon = (i / n) * Math.PI * 2;
        pts.push(Math.cos(lon) * ring, y, Math.sin(lon) * ring);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state) => {
    if (ref.current && !reduced) ref.current.rotation.y = state.clock.elapsedTime * 0.028;
  });

  return (
    <points ref={ref} geometry={geometry} position={[0.15, 0, -1.5]}>
      <pointsMaterial size={0.019} color="#8ea0d8" transparent opacity={0.42} sizeAttenuation />
    </points>
  );
}

/* Two thin orbital rings, tilted off-axis so they imply space without
   drawing attention. */
function Orbits({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current && !reduced) ref.current.rotation.z = state.clock.elapsedTime * 0.016;
  });
  return (
    <group ref={ref} position={[0.15, 0, -1.5]} rotation={[1.28, 0.2, 0]}>
      <mesh>
        <torusGeometry args={[2.5, 0.0035, 8, 128]} />
        <meshBasicMaterial color="#5b6bb5" transparent opacity={0.32} />
      </mesh>
      <mesh rotation={[0.5, 0.3, 0]}>
        <torusGeometry args={[3.0, 0.003, 8, 128]} />
        <meshBasicMaterial color="#4a5590" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

/* Everything that is not the shield: it tracks the shield's travel, then
   fades out so the closing frames are the object alone. */
function Ambient({ reduced, progress }: { reduced: boolean; progress: ProgressRef }) {
  const grp = useRef<THREE.Group>(null);

  useFrame(() => {
    const g = grp.current;
    if (!g) return;
    const p = progress.current;
    g.position.x = lerp(REST_X, 0, span(p, 0.12, 0.62));

    const fade = 1 - span(p, 0.06, 0.38);
    g.visible = fade > 0.01;
    g.traverse((o) => {
      const m = (o as THREE.Mesh | THREE.Points).material as THREE.Material | undefined;
      if (m && "opacity" in m) {
        const base = (m.userData.baseOpacity ??= m.opacity);
        m.opacity = base * fade;
      }
    });
  });

  return (
    <group ref={grp} position={[REST_X, 0, 0]}>
      <NetworkLayer reduced={reduced} />
      <Orbits reduced={reduced} />
      <ContactShadows
        position={[0, -1.62, 0]}
        opacity={0.55}
        scale={7}
        blur={3.2}
        far={3.4}
        resolution={512}
        color="#05060c"
      />
    </group>
  );
}

/* Specular sweep. A tight, bright light travels diagonally across the face
   while the sequence plays, so the bevel and clearcoat catch a moving
   highlight. It is a real light rather than a painted overlay, so the streak
   bends around the geometry and rides the edges the way it should.

   Intensity follows a sine bell, so the shine eases in and out instead of
   popping on at the window edges. At rest (progress 0) it contributes
   nothing, which keeps the static hero unchanged. */
function Sheen({ progress }: { progress: ProgressRef }) {
  const light = useRef<THREE.PointLight>(null);

  useFrame(() => {
    const l = light.current;
    if (!l) return;
    const p = progress.current;
    const t = span(p, 0.08, 0.9);
    // Track the shield so the sweep stays on the object as it moves to centre.
    const shieldX = lerp(REST_X, 0, span(p, 0.12, 0.62));
    l.position.set(shieldX + lerp(-3.3, 3.3, t), lerp(1.7, -1.4, t), 2.05);
    l.intensity = Math.sin(Math.PI * t) * 36;
  });

  return <pointLight ref={light} color="#ffffff" distance={9} decay={2} intensity={0} />;
}

/* Camera push. Dollying the camera (rather than only scaling the mesh) is what
   makes the move read as a lens closing in — perspective actually changes. */
function CameraRig({ progress }: { progress: ProgressRef }) {
  const camera = useThree((s) => s.camera);
  useFrame(() => {
    camera.position.z = lerp(6.1, 2.45, span(progress.current, 0.42, 1));
  });
  return null;
}

/* Exposure blowout: a plane parked in front of the lens that lifts to white at
   the very end, handing off to the white section below. Done in-scene so the
   bloom is lit by the same environment rather than being a flat DOM overlay. */
function Exposure({ progress }: { progress: ProgressRef }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    const a = span(progress.current, 0.74, 0.97);
    const mat = m.material as THREE.MeshBasicMaterial;
    mat.opacity = a;
    m.visible = a > 0.001;
  });
  return (
    <mesh ref={ref} position={[0, 0, 2.2]} visible={false} renderOrder={999}>
      <planeGeometry args={[40, 40]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0} depthTest={false} toneMapped={false} />
    </mesh>
  );
}

export default function ShieldScene({
  reduced,
  progress,
}: {
  reduced: boolean;
  progress: ProgressRef;
}) {
  return (
    <>
      {/* Environment built from lightformers, not a fetched HDRI — real
          reflections with no network dependency. frames={1} bakes it once. */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.4} position={[-3, 2, 2]} scale={[6, 5, 1]} color="#c4b5fd" />
        <Lightformer intensity={1.5} position={[3.5, 0.5, 1]} scale={[4, 6, 1]} color="#4f7fd4" />
        <Lightformer intensity={0.9} position={[0, -3, 1]} scale={[7, 3, 1]} color="#2a2550" />
        <Lightformer intensity={1.2} form="ring" position={[0, 1, -3]} scale={4} color="#6d28d9" />
      </Environment>

      <ambientLight intensity={0.18} />
      {/* key */}
      <directionalLight
        position={[-3.2, 3.4, 3.2]}
        intensity={1.5}
        color="#eef0ff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      {/* blue rim from behind */}
      <directionalLight position={[3.6, 1.2, -2.4]} intensity={2.1} color="#3b82f6" />
      {/* indigo fill from below */}
      <pointLight position={[-1.8, -2.2, 1.6]} intensity={9} distance={9} color="#7c3aed" />
      {/* soft violet bounce inside the composition */}
      <pointLight position={[0, 0.4, -1.2]} intensity={5} distance={6} color="#a78bfa" />

      <Ambient reduced={reduced} progress={progress} />
      <Shield reduced={reduced} progress={progress} />

      <Sheen progress={progress} />
      <CameraRig progress={progress} />
      <Exposure progress={progress} />
    </>
  );
}
