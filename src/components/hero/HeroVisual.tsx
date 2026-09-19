import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import svgUrl from "../../imports/envista-mark.svg?url";
import orbitSvgUrl from "../../imports/cybercrest-orbit.svg?url";

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
              color="#6b21a8" // Deep royal purple base
              emissive="#3b0764" // Ambient violet depth
              emissiveIntensity={0.25}
              metalness={0.96} // High-luster machined alloy
              roughness={0.14} // Glossy mirror-like specular shine
              clearcoat={1.0} // High-gloss studio lacquer
              clearcoatRoughness={0.08}
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

  useFrame(({ clock }) => {
    if (sweepLightRef.current) {
      // Dynamic sweeping specular highlight glinting across the face and beveled edges
      const t = clock.getElapsedTime() * 0.85;
      sweepLightRef.current.position.set(Math.sin(t) * 9, 3, Math.cos(t) * 5 + 6);
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
      {/* Subtle warm magenta bottom rim fill */}
      <directionalLight position={[0, -6, 4]} intensity={1.8} color="#e879f9" />
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
      {/* 3D WebGL Canvas in the background rendering the 3D rotating purple metallic shield */}
      <div className="absolute inset-0 z-0">
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
        EXACT CYBERCREST ORBIT SYSTEM:
        - Exact circular orbit track
        - Continuously rotating glowing comet arc with smooth gradient trail
        - Glowing bead travelling around the track
        - 4 synchronized labels ("Compliance maintenance", "Compliance by design", "Remediation", "Certification")
        - Automatic focus cycle: each label lights up sharp and bright as the comet sweeps past, while others stay dim & blurred
      */}
      <img
        src={orbitSvgUrl}
        alt="Cybersecurity Compliance Orbit"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full select-none object-contain"
      />
    </div>
  );
}
