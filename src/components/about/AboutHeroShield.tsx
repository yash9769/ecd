import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import svgUrl from "../../imports/envista-mark.svg?url";

// --- 3D METALLIC PURPLE SHIELD FOR ABOUT HERO ---
function Shield3DAbout() {
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
      // Gentle cinematic rotation and subtle breathing float
      const t = state.clock.getElapsedTime();
      // Gentle yaw oscillation with a slow continuous drift
      meshRef.current.rotation.y = Math.sin(t * 0.45) * 0.38 + t * 0.12;
      // Slight pitch tilt to expose top metallic bevels
      meshRef.current.rotation.x = 0.08 + Math.sin(t * 0.3) * 0.04;
      meshRef.current.position.y = Math.sin(t * 0.6) * 0.08;
    }
  });

  const extrudeSettings = useMemo(
    () => ({
      depth: 48,
      bevelEnabled: true,
      bevelThickness: 4.0,
      bevelSize: 2.8,
      bevelSegments: 6,
    }),
    []
  );

  if (shapes.length === 0) return null;

  // Scale matched to prominent hero presence
  const scale = 0.0072;

  return (
    <group ref={meshRef}>
      <group
        position={[-220 * scale, 254 * scale, -(48 / 2) * scale]}
        scale={[scale, -scale, scale]}
      >
        {shapes.map((shape, index) => (
          <mesh key={index} castShadow receiveShadow>
            <extrudeGeometry args={[shape, extrudeSettings]} />
            <meshPhysicalMaterial
              color="#6b21a8" // Deep royal purple base
              emissive="#3b0764" // Deep violet ambient depth
              emissiveIntensity={0.28}
              metalness={0.96} // Highly polished machined alloy
              roughness={0.13} // Glossy mirror-like finish
              clearcoat={1.0} // High-gloss lacquer
              clearcoatRoughness={0.06}
              reflectivity={1.0}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// --- LIGHTING WITH SWEEPING SPECULAR HIGHLIGHTS ---
function AboutLightingSystem() {
  const sweepRef = useRef<THREE.DirectionalLight>(null);

  useFrame(({ clock }) => {
    if (sweepRef.current) {
      const t = clock.getElapsedTime() * 0.75;
      sweepRef.current.position.set(Math.sin(t) * 10, 4, Math.cos(t) * 6 + 7);
    }
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      {/* Front primary key light */}
      <directionalLight position={[2, 6, 9]} intensity={4.5} color="#ffffff" />
      {/* Dynamic sweeping specular shine */}
      <directionalLight
        ref={sweepRef}
        color="#ffffff"
        intensity={5.8}
        position={[6, 3, 8]}
      />
      {/* High-angle rim light for top beveled edges */}
      <directionalLight position={[0, 8, -4]} intensity={4.0} color="#f5d0fe" />
      {/* Lateral rim lights highlighting the 3D thickness */}
      <directionalLight position={[-9, 2, 2]} intensity={5.0} color="#d8b4fe" />
      <directionalLight position={[9, 2, 2]} intensity={4.0} color="#c084fc" />
      {/* Subtle bottom warm magenta fill */}
      <directionalLight position={[0, -7, 4]} intensity={2.0} color="#e879f9" />
      <Environment preset="city" />
    </>
  );
}

export default function AboutHeroShield({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-auto aspect-[16/10] w-full max-w-[580px] sm:max-w-[640px] md:max-w-[700px] flex items-center justify-center ${className}`}>
      {/* Ambient radial glow centered behind the shield */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -top-10 flex items-center justify-center"
      >
        <div className="h-[360px] w-[360px] sm:h-[420px] sm:w-[420px] rounded-full bg-gradient-to-tr from-purple-700/35 via-violet-500/25 to-fuchsia-600/20 blur-[90px]" />
      </div>

      {/* 3D WebGL Canvas */}
      <div className="relative h-full w-full">
        <Canvas
          camera={{ position: [0, 0, 9.2], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <AboutLightingSystem />
          <Shield3DAbout />
        </Canvas>
      </div>
    </div>
  );
}
