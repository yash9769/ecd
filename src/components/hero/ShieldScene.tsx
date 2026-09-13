import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import markUrl from "../../imports/envista-mark.png";
import { lerp, span, type ProgressRef } from "./useHeroSequence";

// RectAreaLight contributes nothing until this runs once — no error, it just
// silently does nothing without it.
RectAreaLightUniformsLib.init();

/* Rest state (scrollProgress = 0): small, right of centre, slightly above
   the vertical middle — a normal premium hero visual, not a preview of the
   cinematic close-up. Every number below is the *initial* value; the
   cinematic values (centred, large, camera close) only apply as progress
   advances, per the piecewise timeline in Shield's useFrame.

   Growth is deliberately small (1 -> ~1.3x) — the size increase the user
   perceives comes from the camera dollying in (see CameraRig), not from the
   mesh itself ballooning. A giant scale change is what made earlier passes
   read as "a logo stretched huge" instead of "a camera approaching a real
   object." */
const REST_X = 1.95;
const REST_Y = 0.42;
const REST_SCALE = 0.58;
const FINAL_SCALE = REST_SCALE * 1.3;

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

    // Piecewise timeline (scrollProgress 0..1), matching the percentage-band
    // choreography: nothing happens until 0.20 (hero reads as fully static at
    // rest), the shield travels to centre across a curved path from
    // 0.20-0.45, then the camera does the growth work from 0.45-0.92 while
    // the mesh itself only nudges from REST_SCALE to FINAL_SCALE (~1.3x).
    const toCentre = span(p, 0.2, 0.45);
    const growth = span(p, 0.45, 0.92);
    g.position.x = lerp(REST_X, 0, toCentre);
    // Curved path, not a straight line to centre: a slight downward dip
    // partway through the move so the shield arcs rather than slides.
    const dip = -0.18 * Math.sin(Math.PI * toCentre);
    g.position.y = lerp(REST_Y, 0, toCentre) + dip;
    const scale = lerp(REST_SCALE, FINAL_SCALE, growth);
    g.scale.setScalar(scale);

    if (reduced) return;

    // Idle drift fades out as the sequence takes over, so the two motions
    // never fight each other.
    const idle = 1 - toCentre;
    g.position.y += Math.sin(t * 0.45) * 0.045 * idle;
    g.rotation.y = lerp(-0.22 + Math.sin(t * 0.22) * 0.055, 0, toCentre);
    g.rotation.x = lerp(0.04 + Math.cos(t * 0.19) * 0.022, 0, toCentre);
  });

  // Real soft-studio-light reflection: a physical RectAreaLight sweeps across
  // the face like a moving softbox, scroll-tied (0.15-0.85) so it stays off
  // at rest. Deliberately tuned low (peak ~9) and coloured a soft
  // lavender-white rather than pure white so the reflection never washes the
  // material past its own hue — the light should reveal the surface, not
  // replace it. Parented to the shield's own group so the highlight's
  // apparent size tracks the shield's own scale rather than staying fixed.
  const rectLight = useRef<THREE.RectAreaLight>(null);
  useFrame(() => {
    const l = rectLight.current;
    if (!l) return;
    const t = span(progress.current, 0.15, 0.85);
    l.position.set(lerp(-1.5, 1.5, t), lerp(1.1, -1.1, t), 1.7);
    l.lookAt(0, 0, 0.17);
    l.intensity = Math.sin(Math.PI * t) * 9;
  });

  return (
    <group ref={group} position={[REST_X, 0, 0]} rotation={[0.04, -0.22, 0]}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#141225"
          metalness={0.85}
          roughness={0.32}
          clearcoat={0.6}
          clearcoatRoughness={0.28}
          envMapIntensity={1.1}
          reflectivity={0.6}
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
          emissiveIntensity={0.3}
          roughness={0.4}
          metalness={0.1}
          depthWrite={false}
        />
      </mesh>

      {/* Soft studio-light reflection: a real RectAreaLight, not a texture or
          overlay, so the highlight actually responds to the shield's own
          MeshPhysicalMaterial (clearcoat + roughness) like automotive paint
          under a softbox rather than a stripe painted across it. */}
      <rectAreaLight
        ref={rectLight}
        width={1.3}
        height={1.9}
        color="#c9bdfa"
        intensity={0}
      />
    </group>
  );
}

/* Grounding shadow only. The prior version of this scene also carried a
   sparse point-sphere and two orbital rings behind the shield — cut
   entirely: at rest they read as exactly the kind of generic "cyber HUD"
   decoration a premium product render should not have. A soft contact
   shadow is the one piece of environment worth keeping, since it's what
   sells the shield as a physical object sitting in space rather than a
   sprite pasted on the background. */
function GroundShadow({ progress }: { progress: ProgressRef }) {
  const grp = useRef<THREE.Group>(null);

  useFrame(() => {
    const g = grp.current;
    if (!g) return;
    const p = progress.current;
    g.position.x = lerp(REST_X, 0, span(p, 0.2, 0.45));

    const fade = 1 - span(p, 0.4, 0.65);
    g.visible = fade > 0.01;
    g.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.Material | undefined;
      if (m && "opacity" in m) {
        const base = (m.userData.baseOpacity ??= m.opacity);
        m.opacity = base * fade;
      }
    });
  });

  return (
    <group ref={grp} position={[REST_X, 0, 0]}>
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

/* Camera push. This — not mesh scale — is what does almost all of the
   perceived size increase: the shield's own scale only moves ~1 -> 1.3x
   (see FINAL_SCALE), while the camera dollies deep into the scene so
   perspective genuinely changes, the way a real lens closing in on a real
   object would. FOV stays constant throughout (set once on the Canvas) so
   there's no distorting wide-angle warp. */
function CameraRig({ progress }: { progress: ProgressRef }) {
  const camera = useThree((s) => s.camera);
  useFrame(() => {
    // Push begins once the shield has arrived at centre (0.45) and finishes
    // just before the exposure wash takes over (0.94) — camera movement and
    // the light-driven handoff to white never overlap.
    camera.position.z = lerp(6.1, 0.92, span(progress.current, 0.45, 0.94));
  });
  return null;
}

/* Two-stage exposure: the scene's own lighting lifts first (material goes
   from deep purple toward a lighter, still-coloured wash), and only once
   that's underway does a white plane in front of the lens fade in to
   complete the handoff to the white section below. This reads as "the light
   is overwhelming the material" rather than a flat white card sliding over
   the render. */
function LightingRig({ progress }: { progress: ProgressRef }) {
  const ambient = useRef<THREE.AmbientLight>(null);
  const fill = useRef<THREE.PointLight>(null);
  useFrame(() => {
    const wash = span(progress.current, 0.8, 0.95);
    if (ambient.current) ambient.current.intensity = lerp(0.18, 0.9, wash);
    if (fill.current) fill.current.intensity = lerp(5, 12, wash);
  });
  return (
    <>
      <ambientLight ref={ambient} intensity={0.18} />
      {/* soft violet bounce inside the composition, also the light that
          carries the late-stage wash toward white */}
      <pointLight ref={fill} position={[0, 0.4, -1.2]} intensity={5} distance={6} color="#a78bfa" />
    </>
  );
}

function Exposure({ progress }: { progress: ProgressRef }) {
  const ref = useRef<THREE.Mesh>(null);
  const camera = useThree((s) => s.camera);
  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    // Parked just in front of the lens rather than at a fixed world z — the
    // camera now dollies all the way to ~0.92, which is closer than this
    // plane's old fixed position (2.2) ever accounted for. Tracking the
    // camera keeps the plane in the frustum however deep the push goes.
    m.position.z = camera.position.z - 0.35;
    // Starts only after the lighting wash is already underway (0.88) —
    // the material lightens first, the white plane finishes the handoff.
    const a = span(progress.current, 0.88, 1.0);
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

      <LightingRig progress={progress} />
      <GroundShadow progress={progress} />
      <Shield reduced={reduced} progress={progress} />

      <CameraRig progress={progress} />
      <Exposure progress={progress} />
    </>
  );
}
