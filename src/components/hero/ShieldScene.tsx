import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, useTexture } from "@react-three/drei";
import * as THREE from "three";
import markUrl from "../../imports/envista-mark.png";
import { lerp, span, type ProgressRef } from "./useHeroSequence";

/* Rest state (scrollProgress = 0): small, right of centre, slightly above
   the vertical middle — a normal premium hero visual, not a preview of the
   cinematic close-up. Every number below is the *initial* value; the
   cinematic values (centred, large, camera close) only apply as progress
   advances, per the piecewise timeline in Shield's useFrame. */
const REST_X = 1.95;
const REST_Y = 0.42;
const REST_SCALE = 0.58;
const FINAL_SCALE = 1.9;

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

    // Piecewise timeline (scrollProgress 0..1):
    //   0.00-0.05  nothing moves — hero reads as fully static
    //   0.05-0.55  shield travels to centre (subtle at first, then more so)
    //   0.15-0.90  shield grows from its small rest scale to the close-up size
    // toCentre starting later than growth means the object arrives at centre
    // while still fairly small, then grows in place — matching "shield
    // becomes the primary visual focus" happening independently of, and
    // slightly after, the initial move.
    const toCentre = span(p, 0.05, 0.55);
    const growth = span(p, 0.15, 0.9);
    g.position.x = lerp(REST_X, 0, toCentre);
    g.position.y = lerp(REST_Y, 0, toCentre);
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

  // Flat cap matching the exact outer silhouette, used to clip the shine
  // sweep to the shield's own shape rather than a rectangle.
  const faceGeometry = useMemo(() => new THREE.ShapeGeometry(shieldShape()), []);
  useEffect(() => () => faceGeometry.dispose(), [faceGeometry]);

  // Diagonal shine sweep, scroll-tied (0.15-0.85) so it stays off at rest —
  // the shield only starts showing it once the user has actually scrolled
  // past the resting state.
  const shineMat = useRef<THREE.ShaderMaterial>(null);
  useFrame(() => {
    const m = shineMat.current;
    if (!m) return;
    const t = span(progress.current, 0.15, 0.85);
    m.uniforms.uCenter.value = lerp(-0.35, 1.35, t);
    m.uniforms.uEnvelope.value = Math.sin(Math.PI * t);
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

      {/* Shine sweep: a diagonal specular band that crosses the whole face in
          one pass, clipped to the shield's exact silhouette via ShapeGeometry
          so it never spills past the edges into a visible rectangle. Additive
          + depthWrite:false so it only ever brightens what's underneath. */}
      <mesh geometry={faceGeometry} position={[0, 0, 0.169]} renderOrder={10}>
        <shaderMaterial
          ref={shineMat}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          uniforms={{ uCenter: { value: -0.5 }, uEnvelope: { value: 0 } }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            uniform float uCenter;
            uniform float uEnvelope;
            void main() {
              float diag = (vUv.x + vUv.y) * 0.5;
              float dist = abs(diag - uCenter);
              float core = smoothstep(0.055, 0.0, dist);
              float glow = smoothstep(0.22, 0.0, dist) * 0.45;
              float intensity = clamp(core * 1.3 + glow, 0.0, 1.4) * uEnvelope;
              gl_FragColor = vec4(1.0, 1.0, 1.02, intensity);
            }
          `}
        />
      </mesh>
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
    g.position.x = lerp(REST_X, 0, span(p, 0.05, 0.55));

    const fade = 1 - span(p, 0.35, 0.6);
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

/* Camera push. Dollying the camera (rather than only scaling the mesh) is what
   makes the move read as a lens closing in — perspective actually changes. */
function CameraRig({ progress }: { progress: ProgressRef }) {
  const camera = useThree((s) => s.camera);
  useFrame(() => {
    // Push begins mid-sequence (0.4) once the shield is already the primary
    // focus, and is essentially finished by 0.9 — the last 10% is the
    // exposure blowout, not further camera movement.
    camera.position.z = lerp(6.1, 2.35, span(progress.current, 0.4, 0.9));
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
    const a = span(progress.current, 0.82, 0.97);
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

      <GroundShadow progress={progress} />
      <Shield reduced={reduced} progress={progress} />

      <CameraRig progress={progress} />
      <Exposure progress={progress} />
    </>
  );
}
