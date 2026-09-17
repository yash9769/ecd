/* eslint-disable react/no-unknown-property */
import React, { useEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { shaderMaterial, useTrailTexture } from '@react-three/drei';
import * as THREE from 'three';

import './PixelTrail.css';

export interface GooeyFilterProps {
  id?: string;
  strength?: number;
}

const GooeyFilter: React.FC<GooeyFilterProps> = ({ id = 'goo-filter', strength = 10 }) => {
  return (
    <svg className="goo-filter-container">
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

const DotMaterial = shaderMaterial(
  {
    resolution: new THREE.Vector2(),
    mouseTrail: null as THREE.Texture | null,
    gridSize: 100,
    pixelColor: new THREE.Color('#ffffff')
  },
  `
    varying vec2 vUv;
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  `
    uniform vec2 resolution;
    uniform sampler2D mouseTrail;
    uniform float gridSize;
    uniform vec3 pixelColor;

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);

      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;

      float trail = texture2D(mouseTrail, gridUvCenter).r;

      gl_FragColor = vec4(pixelColor, trail);
    }
  `
);

const identityEase = (x: number) => x;

interface SceneProps {
  gridSize: number;
  trailSize: number;
  maxAge: number;
  interpolate: number;
  easingFunction?: (x: number) => number;
  pixelColor: string;
}

function Scene({ gridSize, trailSize, maxAge, interpolate, easingFunction, pixelColor }: SceneProps) {
  const size = useThree((s) => s.size);
  const viewport = useThree((s) => s.viewport);

  const dotMaterial = useMemo(() => {
    const mat = new DotMaterial();
    mat.transparent = true;
    mat.depthWrite = false;
    mat.blending = THREE.AdditiveBlending;
    return mat;
  }, []);

  useEffect(() => () => dotMaterial.dispose(), [dotMaterial]);

  useEffect(() => {
    if ((dotMaterial as any).uniforms?.pixelColor) {
      (dotMaterial as any).uniforms.pixelColor.value.set(pixelColor);
    }
  }, [dotMaterial, pixelColor]);

  const [trail, onMove] = useTrailTexture({
    size: 512,
    radius: trailSize,
    maxAge: maxAge,
    interpolate: interpolate || 0.1,
    ease: easingFunction || identityEase
  });

  useEffect(() => {
    if (!trail) return;
    trail.minFilter = THREE.NearestFilter;
    trail.magFilter = THREE.NearestFilter;
    trail.wrapS = THREE.ClampToEdgeWrapping;
    trail.wrapT = THREE.ClampToEdgeWrapping;
  }, [trail]);

  const scale = Math.max(viewport.width, viewport.height) / 2;

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const rawX = e.clientX / W;
      const rawY = 1.0 - e.clientY / H;

      const aspect = W / H;
      let u = rawX;
      let v = rawY;
      if (aspect > 1) {
        v = (rawY - 0.5) / aspect + 0.5;
      } else {
        u = (rawX - 0.5) * aspect + 0.5;
      }

      onMove({
        uv: new THREE.Vector2(u, v),
        point: new THREE.Vector3((u * 2 - 1) * scale, (v * 2 - 1) * scale, 0)
      } as any);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [onMove, scale]);

  useEffect(() => {
    if ((dotMaterial as any).uniforms?.gridSize) {
      (dotMaterial as any).uniforms.gridSize.value = gridSize;
    }
    if ((dotMaterial as any).uniforms?.resolution) {
      (dotMaterial as any).uniforms.resolution.value.set(size.width * viewport.dpr, size.height * viewport.dpr);
    }
    if ((dotMaterial as any).uniforms?.mouseTrail && trail) {
      (dotMaterial as any).uniforms.mouseTrail.value = trail;
    }
  }, [dotMaterial, gridSize, size, viewport.dpr, trail]);

  return (
    <mesh scale={[scale, scale, 1]} onPointerMove={onMove as any}>
      <planeGeometry args={[2, 2]} />
      <primitive object={dotMaterial} attach="material" />
    </mesh>
  );
}

export interface PixelTrailProps {
  gridSize?: number;
  trailSize?: number;
  maxAge?: number;
  interpolate?: number;
  easingFunction?: (x: number) => number;
  canvasProps?: Record<string, any>;
  glProps?: Record<string, any>;
  gooeyFilter?: { id: string; strength: number };
  color?: string;
  className?: string;
}

export default function PixelTrail({
  gridSize = 50,
  trailSize = 0.07,
  maxAge = 250,
  interpolate = 1.7,
  easingFunction = identityEase,
  canvasProps = {},
  glProps = {
    antialias: false,
    powerPreference: 'high-performance',
    alpha: true
  },
  gooeyFilter = { id: 'custom-goo-filter', strength: 2 },
  color = '#ed02a2',
  className = ''
}: PixelTrailProps) {
  return (
    <>
      {gooeyFilter && <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />}
      <Canvas
        {...canvasProps}
        dpr={canvasProps.dpr ?? [1, 1.25]}
        gl={glProps}
        className={`pixel-canvas ${className}`}
        style={gooeyFilter ? { filter: `url(#${gooeyFilter.id})` } : undefined}
      >
        <Scene
          gridSize={gridSize}
          trailSize={trailSize}
          maxAge={maxAge}
          interpolate={interpolate}
          easingFunction={easingFunction}
          pixelColor={color}
        />
      </Canvas>
    </>
  );
}
