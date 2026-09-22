import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import svgUrl from "../../imports/envista-mark.svg?url";
import orbitSvgRaw from "../../imports/cybercrest-orbit.svg?raw";

// --- 3D PURPLE METALLIC SHIELD EMBLEM (USER'S BRAND MARK) ---
function Shield3D() {
  const [shapes, setShapes] = useState<THREE.Shape[]>([]);
  const meshRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const loader = new SVGLoader();
    loader.load(svgUrl, (data) => {
      const allShapes: THREE.Shape[] = [];
      for (const path of data.paths) {
        allShapes.push(...SVGLoader.createShapes(path));
      }
      setShapes(allShapes);
    });
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Smooth continuous Y-axis rotation that lingers on the front face and turns through the edge
      const rot = meshRef.current.rotation.y;
      const speed = 0.75 - Math.pow(Math.cos(rot), 2) * 0.48;
      meshRef.current.rotation.y += delta * speed;
    }
  });

  // Machined 3D metal emblem: substantial breadth (~10.5% of width) matching CyberCrest reference
  const extrudeSettings = useMemo(
    () => ({
      depth: 46,
      bevelEnabled: true,
      bevelThickness: 3.5,
      bevelSize: 2.5,
      bevelSegments: 5,
    }),
    []
  );

  if (shapes.length === 0) return null;

  // Proportions matched to CyberCrest: shield occupies ~50% of orbit diameter
  const scale = 0.0056;

  return (
    <group ref={meshRef}>
      {/* Centering the 440x508 SVG path exactly at (0, 0, 0) with Z-depth centered */}
      <group position={[-220 * scale, 254 * scale, -(46 / 2) * scale]} scale={[scale, -scale, scale]}>
        {shapes.map((shape, index) => (
          <mesh key={index} castShadow receiveShadow>
            <extrudeGeometry args={[shape, extrudeSettings]} />
            <meshPhysicalMaterial
              color="#6d28d9" // Vibrant royal purple base
              emissive="#4a044e" // Warm magenta depth from logo
              emissiveIntensity={0.3}
              metalness={0.96} // High-luster machined alloy
              roughness={0.13} // Glossy mirror-like specular shine
              clearcoat={1.0} // High-gloss studio lacquer
              clearcoatRoughness={0.07}
              reflectivity={1.0}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// --- STUDIO LIGHTING & HIGH-SPECULAR SWEEP ---
function LightingSystem() {
  const sweepLightRef = useRef<THREE.DirectionalLight>(null);
  const pinkSweepRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (sweepLightRef.current) {
      // Dynamic sweeping specular highlight glinting across the face and beveled edges
      sweepLightRef.current.position.set(Math.sin(t * 0.85) * 9, 3, Math.cos(t * 0.85) * 5 + 6);
    }
    if (pinkSweepRef.current) {
      // Dynamic moving pink specular point light rimming the shield from behind
      pinkSweepRef.current.position.set(Math.sin(t * 0.75) * 4.2, Math.cos(t * 0.95) * 2.8, -2.5);
    }
  });

  return (
    <>
      <ambientLight intensity={1.1} />
      {/* Front key light for consistent metallic depth */}
      <directionalLight position={[3, 5, 8]} intensity={4.2} color="#ffffff" />
      {/* Sweeping sharp white specular reflection */}
      <directionalLight
        ref={sweepLightRef}
        color="#ffffff"
        intensity={5.5}
        position={[6, 3, 7]}
      />
      {/* Top-right rim light highlighting the sculpted top bevel */}
      <directionalLight position={[5, 7, -3]} intensity={3.5} color="#f3e8ff" />
      {/* Left edge rim light highlighting the 3D extrusion breadth as it rotates */}
      <directionalLight position={[-8, 3, 2]} intensity={4.5} color="#d8b4fe" />

      {/* DYNAMIC HOT PINK & ROSE RIM BACKLIGHTS FROM LOGO BEHIND SHIELD */}
      <directionalLight position={[0, 2, -6]} intensity={7.0} color="#f43f5e" />
      <pointLight ref={pinkSweepRef} color="#ec4899" intensity={9.5} distance={15} />
      <directionalLight position={[0, -6, 3]} intensity={2.5} color="#fb7185" />
      <Environment preset="city" />
    </>
  );
}

// --- MAIN HERO VISUAL COMPONENT ---
export default function HeroVisual({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative mx-auto aspect-square w-full max-w-[640px] lg:max-w-[700px] flex items-center justify-center ${className}`}
    >
      {/* ========================================================================= */}
      {/* MOVING PINK/MAGENTA LOGO AURA BEHIND THE SHIELD (CONTRAST FIX)           */}
      {/* ========================================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-visible select-none"
      >
        {/* 1. Core Pulsing Hot-Pink Breathing Spotlight */}
        <div className="absolute h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] rounded-full bg-gradient-to-tr from-[#ec4899] via-[#f43f5e] to-[#d946ef] opacity-80 blur-[75px] animate-pink-backlight" />

        {/* 2. Rotating Conic Pink-to-Rose Energy Flare from Logo */}
        <div
          className="absolute h-[340px] w-[340px] sm:h-[440px] sm:w-[440px] rounded-full opacity-65 blur-[95px] animate-pink-orbit"
          style={{
            background: "conic-gradient(from 0deg, #f43f5e, #ec4899, #d946ef, #fb7185, #f43f5e)",
          }}
        />

        {/* 3. Counter-Drifting Soft Fuchsia Ambient Aura */}
        <div className="absolute h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] rounded-full bg-[#e11d48] opacity-55 blur-[65px] animate-pink-drift" />
      </div>

      {/* 3D WebGL Canvas rendering the 3D rotating metallic shield */}
      <div className="absolute inset-0 z-[1]">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <LightingSystem />
          <Shield3D />
        </Canvas>
      </div>

      {/* 
        EXACT CYBERCREST ORBIT SYSTEM (INLINE DOM):
        Inlined directly into DOM so the animation timeline resets to 0.0s on page load,
        guaranteeing the sequence always starts from DISCOVER, then TEST, then PROTECT, then RESILIENCE.
      */}
      <div
        className="pointer-events-none absolute inset-0 z-10 flex h-full w-full select-none items-center justify-center [&>svg]:h-full [&>svg]:w-full [&>svg]:object-contain"
        dangerouslySetInnerHTML={{ __html: orbitSvgRaw }}
      />
    </div>
  );
}
