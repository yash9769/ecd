import React, { useMemo, useRef, useState, useEffect, Suspense, Component } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import svgUrl from "../../imports/envista-mark.svg?url";

class WebGLErrorBoundary extends Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn("WebGL Canvas failed gracefully in AboutHeroShield:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex h-full w-full items-center justify-center p-8">
            <img
              src={svgUrl}
              alt="Envista Shield"
              className="h-44 w-44 object-contain drop-shadow-[0_0_35px_rgba(168,85,247,0.6)] animate-float"
            />
          </div>
        )
      );
    }
    return this.props.children;
  }
}

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
      // Continuous 360-degree revolving rotation matching CyberCrest reference
      // Gently pauses/lingers slightly on the front face and turns smoothly through the edges
      const rot = meshRef.current.rotation.y;
      const speed = 0.82 - Math.pow(Math.cos(rot), 2) * 0.44;
      meshRef.current.rotation.y += delta * speed;
      // Subtle organic tilt to show off top and lateral beveled facets
      meshRef.current.rotation.x = 0.08 + Math.sin(rot * 2) * 0.035;
      meshRef.current.position.y = Math.sin(rot * 2) * 0.05;
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

  // Authentic Envista brand gradient texture sampled directly from logo.png
  const brandTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Diagonal gradient matching the exact sampled color distribution in logo.png:
      // Vibrant coral-pink at top-right, transitioning to luminous magenta at top crest,
      // rich royal purple through the center/apex, and deep electric violet on the left.
      const grad = ctx.createLinearGradient(512, 40, 40, 480);
      grad.addColorStop(0.0, "#f8739f"); // Vivid coral-pink highlight at top-right
      grad.addColorStop(0.18, "#e25e9e"); // Radiant rose-orchid
      grad.addColorStop(0.36, "#b553a8"); // Crown luminous magenta-orchid
      grad.addColorStop(0.58, "#9337b0"); // Mid electric violet
      grad.addColorStop(0.78, "#7426b6"); // Signature brand purple
      grad.addColorStop(1.0, "#5e26b6"); // Deep electric indigo-purple
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, []);

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
              map={brandTexture}
              color="#ffffff"
              emissive="#240338"
              emissiveIntensity={0.16}
              metalness={0.92}
              roughness={0.14}
              clearcoat={1.0}
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
        <WebGLErrorBoundary>
          <Canvas
            camera={{ position: [0, 0, 9.2], fov: 40 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <AboutLightingSystem />
              <Shield3DAbout />
            </Suspense>
          </Canvas>
        </WebGLErrorBoundary>
      </div>
    </div>
  );
}
