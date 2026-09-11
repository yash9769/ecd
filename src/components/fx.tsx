import { useEffect, useRef, useState, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* WebGL shader ambient field — flowing purple light (fbm noise)       */
/* ------------------------------------------------------------------ */
export function ShaderBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let gl: WebGLRenderingContext | null = null;
    try {
      gl = (canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    } catch {
      return;
    }
    if (!gl) return;

    const vsSrc = "attribute vec2 p; void main(){ gl_Position = vec4(p,0.0,1.0); }";
    const fsSrc = `
      precision highp float;
      uniform vec2 u_res; uniform float u_time;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
      float noise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
        float a=hash(i),b=hash(i+vec2(1.0,0.0)),c=hash(i+vec2(0.0,1.0)),d=hash(i+vec2(1.0,1.0));
        return mix(mix(a,b,f.x),mix(c,d,f.x),f.y); }
      float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; } return v; }
      void main(){
        vec2 uv = gl_FragCoord.xy/u_res.xy;
        vec2 p = uv*2.6; float t=u_time*0.05;
        float n = fbm(p + vec2(t, t*0.6) + fbm(p*1.5 - t));
        vec3 deep = vec3(0.015,0.015,0.04);
        vec3 purp = vec3(0.30,0.14,0.60);
        vec3 bright = vec3(0.52,0.34,0.92);
        vec3 col = mix(deep, purp, smoothstep(0.25,0.8,n));
        col = mix(col, bright, smoothstep(0.62,0.98,n)*0.55);
        float d = distance(uv, vec2(0.5,0.42));
        col *= 1.0 - d*0.7;
        gl_FragColor = vec4(col,1.0);
      }`;

    const compile = (type: number, src: string) => {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vsSrc));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fsSrc));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");

    const resize = () => {
      const scale = 0.6; // render below native res for performance
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
      canvas.width = w;
      canvas.height = h;
      gl!.viewport(0, 0, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    // Only render when on-screen and the tab is visible; cap at ~30fps so the
    // loop yields the main thread instead of saturating it.
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(canvas);

    let raf = 0;
    let last = 0;
    const frameMs = 1000 / 30;
    const start = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden || now - last < frameMs) return;
      last = now;
      gl!.uniform2f(uRes, canvas.width, canvas.height);
      gl!.uniform1f(uTime, (now - start) / 1000);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/* Cursor particle trail (canvas)                                      */
/* ------------------------------------------------------------------ */
export function ParticleTrail() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const parts: { x: number; y: number; vx: number; vy: number; life: number }[] = [];
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    const onMove = (e: MouseEvent) => {
      for (let i = 0; i < 2; i++)
        parts.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6 - 0.3,
          life: 1,
        });
      if (parts.length > 120) parts.splice(0, parts.length - 120);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    let raf = 0;
    let last = 0;
    const frameMs = 1000 / 30;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden || now - last < frameMs) return;
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.028;
        if (p.life <= 0) {
          parts.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.life * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${p.life * 0.5})`;
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Spotlight — radial light follows cursor inside a container          */
/* ------------------------------------------------------------------ */
export function Spotlight({
  children,
  className = "",
  color = "rgba(139,92,246,0.28)",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.setProperty("--o", "1");
  };
  const leave = () => ref.current?.style.setProperty("--o", "0");
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={leave} className={`relative ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: "var(--o,0)" as any,
          background: `radial-gradient(360px circle at var(--mx,50%) var(--my,50%), ${color}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Text scramble — resolves to final text when in view                 */
/* ------------------------------------------------------------------ */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}=+*#";
export function Scramble({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState(text);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let frame = 0;
    const run = () => {
      const total = text.length;
      const reveal = Math.floor(frame / 2);
      let s = "";
      for (let i = 0; i < total; i++) {
        if (text[i] === " ") s += " ";
        else if (i < reveal) s += text[i];
        else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      frame++;
      if (reveal <= total) raf = requestAnimationFrame(run);
      else setOut(text);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text]);
  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  );
}

/* Mouse-parallax scene — layers drift for a subtle camera feel */
export function useMouseParallax(strength = 20) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength;
      el.style.setProperty("--px", `${x}px`);
      el.style.setProperty("--py", `${y}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength]);
  return ref;
}
