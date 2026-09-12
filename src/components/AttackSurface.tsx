// Security operations console — a layered telemetry panel with an activity
// waveform, live defense meters, a threat-posture gauge and a streaming event
// log. Deliberately not a node graph: reads like a command-center dashboard.

import { useEffect, useRef } from "react";

const MONO = "'DM Mono', monospace";

// Build a repeating waveform polyline across a given width.
function wave(width: number, midY: number, amp: number, step: number, seed: number): string {
  const pts: string[] = [];
  for (let x = 0; x <= width; x += step) {
    const t = x / step + seed;
    const y =
      midY +
      Math.sin(t * 0.55) * amp +
      Math.sin(t * 0.21) * amp * 0.5 +
      Math.sin(t * 1.3) * amp * 0.25;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

const METERS = [
  { label: "PERIMETER", v: 0.92 },
  { label: "IDENTITY", v: 0.78 },
  { label: "ENDPOINT", v: 0.86 },
  { label: "CLOUD", v: 0.71 },
  { label: "DATA", v: 0.95 },
];

const LOG = [
  "auth.mfa   challenge passed",
  "edr.scan   0 anomalies · host-441",
  "waf.rule   blocked 12 req · api-gw",
  "iam.policy least-privilege ok",
  "vault.kms  rotation complete",
  "net.egress inspected · clean",
];

export default function AttackSurface() {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    svg.pauseAnimations();
  }, []);
  const W = 880;
  const gaugeCx = 726;
  const gaugeCy = 168;
  const gaugeR = 60;
  const gaugeCirc = 2 * Math.PI * gaugeR;
  const gaugePct = 0.87;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 880 620"
      className="h-full w-full"
      fill="none"
      role="img"
      aria-label="Security operations console showing live defense telemetry: activity waveform, layered protection meters, threat-posture gauge and a streaming event log"
    >
      <defs>
        <linearGradient id="con-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6d28d9" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="con-meter" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6d28d9" />
          <stop offset="100%" stopColor="#c4b5fd" />
        </linearGradient>
        <radialGradient id="con-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6d28d9" stopOpacity="0" />
        </radialGradient>
        <filter id="con-soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
      </defs>

      {/* Ambient wash */}
      <circle cx="240" cy="180" r="240" fill="url(#con-glow)" filter="url(#con-soft)" />

      {/* Panel frame */}
      <rect x="24" y="24" width="832" height="572" rx="14" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.08)" />

      {/* Faint backing grid inside panel */}
      <g stroke="rgba(255,255,255,0.03)" strokeWidth="1">
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`v${i}`} x1={24 + (i + 1) * 78} y1="24" x2={24 + (i + 1) * 78} y2="596" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1="24" y1={24 + (i + 1) * 72} x2="856" y2={24 + (i + 1) * 72} />
        ))}
      </g>

      {/* Header row */}
      <g fontFamily={MONO}>
        <circle cx="48" cy="56" r="4" fill="#a78bfa">
          <animate attributeName="opacity" values="1;0.25;1" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <text x="62" y="60" fill="rgba(244,244,248,0.9)" fontSize="12" letterSpacing="2">
          DEFENCE CONSOLE
        </text>
        <text x="832" y="60" textAnchor="end" fill="rgba(154,154,171,0.7)" fontSize="10" letterSpacing="1.5">
          POSTURE · MONITORED
        </text>
        <line x1="24" y1="76" x2="856" y2="76" stroke="rgba(255,255,255,0.08)" />
      </g>

      {/* Activity waveform module */}
      <g>
        <text x="48" y="106" fill="rgba(154,154,171,0.7)" fontFamily={MONO} fontSize="9" letterSpacing="1.5">
          THREAT ACTIVITY · 24H
        </text>
        <clipPath id="con-wave-clip">
          <rect x="48" y="116" width="560" height="120" rx="6" />
        </clipPath>
        <g clipPath="url(#con-wave-clip)">
          <rect x="48" y="116" width="560" height="120" fill="rgba(139,92,246,0.04)" />
          {/* Scrolling filled waveform */}
          <g>
            <polygon
              points={`0,236 ${wave(1200, 176, 34, 10, 0)} 1200,236`}
              fill="url(#con-area)"
              transform="translate(48,0)"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                from="48 0"
                to="-552 0"
                dur="18s"
                repeatCount="indefinite"
              />
            </polygon>
            <polyline
              points={wave(1200, 176, 34, 10, 0)}
              fill="none"
              stroke="#c4b5fd"
              strokeWidth="1.6"
              transform="translate(48,0)"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                from="48 0"
                to="-552 0"
                dur="18s"
                repeatCount="indefinite"
              />
            </polyline>
          </g>
          {/* Leading scan edge */}
          <line x1="608" y1="116" x2="608" y2="236" stroke="rgba(196,181,253,0.5)" strokeWidth="1" />
        </g>
        <rect x="48" y="116" width="560" height="120" rx="6" fill="none" stroke="rgba(255,255,255,0.08)" />
      </g>

      {/* Threat posture gauge */}
      <g>
        <text x={gaugeCx} y="106" textAnchor="middle" fill="rgba(154,154,171,0.7)" fontFamily={MONO} fontSize="9" letterSpacing="1.5">
          POSTURE INDEX
        </text>
        <circle cx={gaugeCx} cy={gaugeCy} r={gaugeR} stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
        <circle
          cx={gaugeCx}
          cy={gaugeCy}
          r={gaugeR}
          stroke="url(#con-meter)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${gaugeCirc}`}
          strokeDashoffset={gaugeCirc}
          transform={`rotate(-90 ${gaugeCx} ${gaugeCy})`}
        >
          <animate
            attributeName="stroke-dashoffset"
            from={gaugeCirc}
            to={gaugeCirc * (1 - gaugePct)}
            dur="2.2s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.22 1 0.36 1"
          />
        </circle>
        <text x={gaugeCx} y={gaugeCy - 2} textAnchor="middle" fill="#f4f4f8" fontFamily="'Sora',sans-serif" fontSize="30" fontWeight="700">
          87
        </text>
        <text x={gaugeCx} y={gaugeCy + 18} textAnchor="middle" fill="rgba(154,154,171,0.7)" fontFamily={MONO} fontSize="9" letterSpacing="1.5">
          RESILIENT
        </text>
      </g>

      {/* Layered defense meters */}
      <g>
        <text x="48" y="290" fill="rgba(154,154,171,0.7)" fontFamily={MONO} fontSize="9" letterSpacing="1.5">
          LAYERED COVERAGE
        </text>
        {METERS.map((m, i) => {
          const y = 312 + i * 38;
          const trackW = 360;
          const trackX = 168;
          return (
            <g key={m.label}>
              <text x="48" y={y + 4} fill="rgba(244,244,248,0.82)" fontFamily={MONO} fontSize="10" letterSpacing="1">
                {m.label}
              </text>
              <rect x={trackX} y={y - 5} width={trackW} height="8" rx="4" fill="rgba(255,255,255,0.06)" />
              <rect x={trackX} y={y - 5} width="0" height="8" rx="4" fill="url(#con-meter)">
                <animate
                  attributeName="width"
                  from="0"
                  to={trackW * m.v}
                  dur="1.6s"
                  begin={`${i * 0.15}s`}
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.22 1 0.36 1"
                />
              </rect>
              <text x={trackX + trackW + 14} y={y + 4} fill="rgba(196,181,253,0.9)" fontFamily={MONO} fontSize="10">
                {Math.round(m.v * 100)}%
              </text>
            </g>
          );
        })}
      </g>

      {/* Event log stream */}
      <g>
        <text x="560" y="290" fill="rgba(154,154,171,0.7)" fontFamily={MONO} fontSize="9" letterSpacing="1.5">
          EVENT STREAM
        </text>
        <rect x="560" y="302" width="272" height="204" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
        {LOG.map((line, i) => {
          const y = 328 + i * 28;
          return (
            <g key={i}>
              <circle cx="578" cy={y - 4} r="2.5" fill="#8b5cf6">
                <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2.6 + (i % 3) * 0.6}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </circle>
              <text x="592" y={y} fill="rgba(180,180,196,0.85)" fontFamily={MONO} fontSize="10">
                {line}
              </text>
            </g>
          );
        })}
        {/* blinking cursor */}
        <rect x="592" y={328 + LOG.length * 28 - 9} width="7" height="12" fill="#c4b5fd">
          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* Footer telemetry */}
      <g fontFamily={MONO} fontSize="9" fill="rgba(154,154,171,0.7)" letterSpacing="1">
        <line x1="24" y1="536" x2="856" y2="536" stroke="rgba(255,255,255,0.08)" />
        <text x="48" y="562">CONTINUOUS MONITORING</text>
        <text x="300" y="562">ILLUSTRATIVE VIEW</text>
        <text x="832" y="562" textAnchor="end" fill="rgba(167,139,250,0.9)">
          ● ALL SYSTEMS NOMINAL
        </text>
      </g>
    </svg>
  );
}
