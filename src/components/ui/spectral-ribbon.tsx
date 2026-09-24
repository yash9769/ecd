import React, { useEffect, useRef } from "react";

export interface SpectralRibbonProps {
  children?: React.ReactNode;
  speed?: number;
  intensity?: number;
  thickness?: number;
  grain?: number;
  className?: string;
  style?: React.CSSProperties;
}

const VERTEX_SHADER = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = (position + 1.0) * 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 vUv;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_speed;
  uniform float u_intensity;
  uniform float u_thickness;
  uniform float u_grain;

  // High quality pseudo-random noise for subtle film grain
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  // Harmonic spectral palette with luxury jewel tones (violet, lilac, cyan, emerald, gold, magenta)
  vec3 spectralPalette(float t) {
    vec3 a = vec3(0.5, 0.45, 0.55);
    vec3 b = vec3(0.4, 0.4, 0.45);
    vec3 c = vec3(0.85, 0.85, 0.85);
    vec3 d = vec3(0.15, 0.42, 0.72);
    return a + b * cos(6.28318530718 * (c * t + d));
  }

  // Undulating organic fluid wave displacement
  float ribbonWave(float x, float t, float freq1, float freq2, float phase) {
    return sin(x * freq1 + t * 0.65 + phase) * 0.24 
         + cos(x * freq2 - t * 0.4 + phase * 1.4) * 0.15
         + sin(x * (freq1 + freq2) * 0.45 + t * 0.9) * 0.07;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    float t = u_time * u_speed;

    // Fluid ribbon coordinates
    float x = uv.x * 1.6;
    
    // Base ribbon centerline path
    float yCenter = ribbonWave(x, t, 1.6, 1.0, 0.0);
    float dy = uv.y - yCenter;

    // Soft spectral chromatic dispersion offsets
    float dispScale = 0.08 * u_thickness;
    float yR = ribbonWave(x, t, 1.6, 1.0, -0.3);
    float yG = ribbonWave(x, t, 1.6, 1.0, 0.0);
    float yB = ribbonWave(x, t, 1.6, 1.0, 0.3);

    float distR = abs(uv.y - (yR - dispScale));
    float distG = abs(uv.y - yG);
    float distB = abs(uv.y - (yB + dispScale));

    // Premium wide atmospheric blur falloff (smooth Gaussian-like bell curve)
    float width = 0.28 * u_thickness;
    float glowR = exp(-pow(distR / width, 1.35) * 2.2);
    float glowG = exp(-pow(distG / width, 1.35) * 2.4);
    float glowB = exp(-pow(distB / width, 1.35) * 2.2);

    // Deep ambient halo bloom
    float ambientHalo = exp(-pow(abs(dy) / (width * 2.4), 1.5) * 1.6) * 0.45;

    // Secondary subtle ribbon twist
    float y2 = ribbonWave(x * 1.15, t * 0.95, 2.2, 1.4, 2.4) + 0.14 * sin(t * 0.4);
    float dist2 = abs(uv.y - y2);
    float glow2 = exp(-pow(dist2 / (width * 1.2), 1.4) * 2.8) * 0.4;

    // Prismatic spectral color calculation
    float spectralPhase = uv.x * 0.28 + t * 0.06 + dy * 0.8;
    vec3 spectralColor = spectralPalette(spectralPhase);

    // Combine soft chromatic channels
    vec3 ribbonColor = vec3(
      glowR * (0.7 + 0.4 * spectralColor.r),
      glowG * (0.65 + 0.45 * spectralColor.g),
      glowB * (0.85 + 0.5 * spectralColor.b)
    );

    // Soft velvet central luminescence (no harsh laser spike)
    float core = exp(-pow(abs(dy) / (width * 0.65), 1.6) * 2.8);
    vec3 coreColor = vec3(0.95, 0.92, 1.0) * core * 0.75;

    // Ambient diffuse spectral aura
    vec3 auraColor = spectralPalette(spectralPhase + 0.3) * ambientHalo * 0.65;

    // Secondary ribbon luminescence
    vec3 secColor = spectralPalette(spectralPhase + 0.55) * glow2 * 0.5;

    // Composite total emission with user intensity
    vec3 finalColor = (ribbonColor + coreColor + auraColor + secColor) * u_intensity;

    // Subtle film grain
    if (u_grain > 0.0) {
      float grainNoise = (random(gl_FragCoord.xy + fract(t * 7.0)) - 0.5) * u_grain * 0.08;
      finalColor += grainNoise;
    }

    // Pure black background fade
    gl_FragColor = vec4(clamp(finalColor, 0.0, 1.0), 1.0);
  }
`;

export function SpectralRibbon({
  children,
  speed = 1,
  intensity = 1,
  thickness = 1,
  grain = 0.45,
  className = "",
  style,
}: SpectralRibbonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl =
      canvas.getContext("webgl", { alpha: false, antialias: true }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) return;

    // Compile shader helper
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full screen quad geometry
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const speedLoc = gl.getUniformLocation(program, "u_speed");
    const intensityLoc = gl.getUniformLocation(program, "u_intensity");
    const thicknessLoc = gl.getUniformLocation(program, "u_thickness");
    const grainLoc = gl.getUniformLocation(program, "u_grain");

    let animationFrameId: number;
    let startTime = performance.now();

    const resize = () => {
      if (!container || !canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (width === 0 || height === 0) return;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001;
      gl.uniform1f(timeLoc, elapsed);
      gl.uniform1f(speedLoc, speed);
      gl.uniform1f(intensityLoc, intensity);
      gl.uniform1f(thicknessLoc, thickness);
      gl.uniform1f(grainLoc, grain);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (program) gl.deleteProgram(program);
      if (vertShader) gl.deleteShader(vertShader);
      if (fragShader) gl.deleteShader(fragShader);
      if (buffer) gl.deleteBuffer(buffer);
    };
  }, [speed, intensity, thickness, grain]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-black ${className}`}
      style={style}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  );
}

export default SpectralRibbon;
