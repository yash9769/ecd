import React, { useState } from "react";
import geoIconUrl from "../../imports/cybercrest-geo-icon.svg";
import {
  INDIA_PATH,
  UAE_PATH,
  NEIGHBOR_PATH,
  INDIA_DOTS,
  UAE_DOTS,
  CITY_COORDS,
} from "./mapData";

interface OfficeLocation {
  id: string;
  tabLabel: string;
  displayCity: string;
  isHq?: boolean;
  categoryBadge: string;
  regionBadge: string;
  cityName: string;
  phone: string;
  email: string;
  badgeAlign: "left" | "right";
  mapCoord: { x: number; y: number }; // percentage on the 1000x520 map
  subOffices: {
    num: string;
    title: string;
    address: string;
  }[];
}

const OFFICE_DATA: OfficeLocation[] = [
  {
    id: "mumbai",
    tabLabel: "Mumbai",
    displayCity: "Mumbai",
    isHq: true,
    categoryBadge: "Headquarters",
    regionBadge: "Maharashtra, India",
    cityName: "Mumbai",
    phone: "1800 120 1022",
    email: "connect@jhsassociates.in",
    badgeAlign: "left",
    mapCoord: { x: CITY_COORDS.mumbai.pctX, y: CITY_COORDS.mumbai.pctY },
    subOffices: [
      {
        num: "01",
        title: "Andheri (East) Head Office",
        address:
          "Unit No. B-406 to 410, 4th floor, Navkar Chambers, Marol Naka Metro Station, Andheri (East), Maharashtra – 400059",
      },
      {
        num: "02",
        title: "Mazgaon Practice",
        address:
          "Shop No. 11A, 345, New Sai Niketan CHS Ltd, Dr Mascarenhas Road, Mazgaon, Mumbai – 400010",
      },
      {
        num: "03",
        title: "Masjid Bunder Practice",
        address:
          "Unit No. 402, 4th floor, Nav Vyapar Bhavan, 49 P.D'mello Road, MB, Maharashtra – 400009",
      },
      {
        num: "04",
        title: "Kalyan Practice",
        address:
          "Unit No. 11-12, Regency Avenue, Murbad Road, Kalyan (West), Maharashtra – 421301",
      },
    ],
  },
  {
    id: "dubai",
    tabLabel: "Dubai",
    displayCity: "Dubai",
    categoryBadge: "International Office",
    regionBadge: "UAE",
    cityName: "Dubai",
    phone: "+971 4348 0046",
    email: "vinod.joshi@jhsuae.com",
    badgeAlign: "right",
    mapCoord: { x: CITY_COORDS.dubai.pctX, y: CITY_COORDS.dubai.pctY },
    subOffices: [
      {
        num: "01",
        title: "Dubai Operations & GCC Hub",
        address:
          "1703, Sheikh Rashid Tower, Dubai World Trade Center, Sheikh Zayed Road, Dubai, U.A.E",
      },
      {
        num: "02",
        title: "Muscat, Oman Practice",
        address:
          "P.O. Box : 3840, P. Code : 112, Ruwi, Muscat, Sultanate of Oman",
      },
      {
        num: "03",
        title: "London / Amersham Practice",
        address:
          "1st Floor Merritt House, Hill Avenue, Amersham HP6 5BQ, United Kingdom",
      },
    ],
  },
  {
    id: "delhi",
    tabLabel: "Delhi",
    displayCity: "Delhi NCR",
    categoryBadge: "Regional Office",
    regionBadge: "Delhi NCR",
    cityName: "Delhi",
    phone: "+91 9810333433",
    email: "nikhel.kochhar@jhsassociates.in",
    badgeAlign: "right",
    mapCoord: { x: CITY_COORDS.delhi.pctX, y: CITY_COORDS.delhi.pctY },
    subOffices: [
      {
        num: "01",
        title: "Delhi DLF Centre Head Office",
        address:
          "Unit No. 306, DLF Centre, Savitri Cinema Complex, Greater Kailash II, Delhi – 110048",
      },
    ],
  },
  {
    id: "bengaluru",
    tabLabel: "Bengaluru",
    displayCity: "Bengaluru",
    categoryBadge: "Regional Office",
    regionBadge: "Karnataka",
    cityName: "Bengaluru",
    phone: "+91 9663397755",
    email: "narayana.malla@jhsassociates.in",
    badgeAlign: "left",
    mapCoord: { x: CITY_COORDS.bengaluru.pctX, y: CITY_COORDS.bengaluru.pctY },
    subOffices: [
      {
        num: "01",
        title: "Bengaluru AECS Layout Office",
        address:
          "3rd Floor, Aria, No. 541 AECS Layout Main Road, Above Costa Coffee, Bangalore – 560 037",
      },
    ],
  },
  {
    id: "gujarat",
    tabLabel: "Gujarat",
    displayCity: "Gujarat",
    categoryBadge: "Regional Office",
    regionBadge: "Gujarat",
    cityName: "Gujarat",
    phone: "+91 9374639574",
    email: "kalpesh.parmar@jhsassociates.in",
    badgeAlign: "left",
    mapCoord: { x: CITY_COORDS.gujarat.pctX, y: CITY_COORDS.gujarat.pctY },
    subOffices: [
      {
        num: "01",
        title: "Ahmedabad Corporate Practice",
        address:
          "Level 10, 1016–21, Swati Clover, Shilaj Circle, Sardar Patel Ring Road, Thaltej, Ahmedabad, Gujarat – 380054",
      },
      {
        num: "02",
        title: "Vadodara Lila Chambers",
        address:
          "4th floor, Lila Chambers, Notus Pride, Vadodara, Gujarat – 390023",
      },
      {
        num: "03",
        title: "Rajkot Office",
        address:
          "B 303, Kings Heights, Vidya Kunj Society, Main Road, Near Amin Marg, Rajkot, Gujarat – 360001",
      },
      {
        num: "04",
        title: "Surat Practice",
        address:
          "504, 5th Floor, Shubh Square, Opp Venus Hospital, Lal Darwaja, Gotalawadi Road, Surat, Gujarat – 395003",
      },
      {
        num: "05",
        title: "Vapi Office",
        address:
          "Unit No. 101, Saga Casa, Daulat Nagar, Vapi, Gujarat – 396215",
      },
    ],
  },
  {
    id: "hyderabad",
    tabLabel: "Hyderabad",
    displayCity: "Hyderabad",
    categoryBadge: "Regional Office",
    regionBadge: "Telangana",
    cityName: "Hyderabad",
    phone: "+91 40 4012 8888",
    email: "connect@jhsassociates.in",
    badgeAlign: "right",
    mapCoord: { x: CITY_COORDS.hyderabad.pctX, y: CITY_COORDS.hyderabad.pctY },
    subOffices: [
      {
        num: "01",
        title: "Hyderabad Cyber Towers Practice",
        address:
          "Level 5, Cyber Towers, HITEC City, Madhapur, Hyderabad, Telangana – 500081",
      },
    ],
  },
  {
    id: "chennai",
    tabLabel: "Chennai",
    displayCity: "Chennai",
    categoryBadge: "Regional Office",
    regionBadge: "Tamil Nadu",
    cityName: "Chennai",
    phone: "+91 9840131965",
    email: "chandrasekaran@jhsassociates.in",
    badgeAlign: "right",
    mapCoord: { x: CITY_COORDS.chennai.pctX, y: CITY_COORDS.chennai.pctY },
    subOffices: [
      {
        num: "01",
        title: "T. Nagar Corporate Hub",
        address:
          "No: 43/65, South West Boag Road, T-Nagar, Chennai – 600017",
      },
    ],
  },
  {
    id: "kolkata",
    tabLabel: "Kolkata",
    displayCity: "Kolkata",
    categoryBadge: "Regional Office",
    regionBadge: "West Bengal",
    cityName: "Kolkata",
    phone: "+91 9831150209",
    email: "sharad.mohata@jhsassociates.in",
    badgeAlign: "right",
    mapCoord: { x: CITY_COORDS.kolkata.pctX, y: CITY_COORDS.kolkata.pctY },
    subOffices: [
      {
        num: "01",
        title: "Kolkata Camac Street Hub",
        address:
          "Unit No. 402, 4th floor, Vardhan Complex, 25A Camac Street, Kolkata, West Bengal – 700016",
      },
    ],
  },
];

// --- STYLISH 3D PIN MARKER COMPONENT (MATCHING IMAGE 2 REFERENCE) ---
function MarkerPin3D({
  isHq = false,
  isDubai = false,
  isHighlighted = false,
}: {
  isHq?: boolean;
  isDubai?: boolean;
  isHighlighted?: boolean;
}) {
  const pinId = isHq ? "pinHq" : isDubai ? "pinDubai" : "pinHub";
  const pinWidth = isHq ? 32 : 26;
  const pinHeight = isHq ? 44 : 36;

  return (
    <div className="relative flex flex-col items-center">
      {/* 3D Pin SVG with authentic brand gradients and specular relief */}
      <svg
        width={pinWidth}
        height={pinHeight}
        viewBox="0 0 32 44"
        className={`transition-all duration-300 ${
          isHighlighted
            ? "-translate-y-2.5 scale-125 drop-shadow-[0_12px_22px_rgba(168,85,247,0.85)]"
            : "drop-shadow-[0_5px_10px_rgba(0,0,0,0.7)] group-hover:-translate-y-1.5 group-hover:scale-110"
        }`}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "bottom center",
        }}
      >
        <defs>
          {/* HQ: Rich Magenta-Pink to Royal Violet */}
          <linearGradient id="pinHq" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="35%" stopColor="#db2777" />
            <stop offset="70%" stopColor="#c026d3" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>

          {/* Dubai: Electric Cyan to Violet */}
          <linearGradient id="pinDubai" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="45%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>

          {/* Regional Hubs: Brand Violet-Magenta to Deep Purple */}
          <linearGradient id="pinHub" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#e879f9" />
            <stop offset="40%" stopColor="#c026d3" />
            <stop offset="85%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#581c87" />
          </linearGradient>

          {/* 3D Bevel highlight filter */}
          <filter id={`bevel-${pinId}`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0.8" dy="1.5" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* 3D Location Pin Teardrop Shape */}
        <path
          d="M 16 2 C 8.3 2 2 8.3 2 16.1 C 2 25.8 14.3 40.4 15.3 41.6 C 15.7 42.1 16.3 42.1 16.7 41.6 C 17.7 40.4 30 25.8 30 16.1 C 30 8.3 23.7 2 16 2 Z"
          fill={`url(#${pinId})`}
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.2"
          filter={`url(#bevel-${pinId})`}
        />

        {/* 3D Glossy Light Reflection (Curvature highlight on upper-left) */}
        <path
          d="M 8 9 C 11 5.5 17 5 21 6.5"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Outer White Circular Aperture */}
        <circle cx="16" cy="16" r="6" fill="#ffffff" />

        {/* Inner Core Accent */}
        <circle
          cx="16"
          cy="16"
          r="3.2"
          fill={isHq ? "#c026d3" : isDubai ? "#0284c7" : "#7c3aed"}
        />
      </svg>

      {/* 3D Ground Contact Shadow & Radar Waves */}
      <div className="relative -mt-1 flex items-center justify-center">
        {/* Ground elliptical contact shadow */}
        <div
          className={`rounded-full bg-black/80 blur-[2px] transition-all duration-300 ${
            isHq ? "h-2 w-7" : "h-1.5 w-5"
          } ${isHighlighted ? "scale-125 opacity-95" : "opacity-65"}`}
        />

        {/* Pulsing Radar Wave Beacon */}
        <div
          className={`absolute rounded-full border border-violet-400/70 transition-all ${
            isHighlighted
              ? "h-10 w-10 animate-ping bg-violet-500/40"
              : isHq
              ? "h-7 w-7 animate-pulse bg-rose-500/20"
              : "h-4 w-4 bg-transparent"
          }`}
        />
      </div>
    </div>
  );
}

export default function LocationGlobe() {
  const [activeCityId, setActiveCityId] = useState<string>("mumbai");
  const [hoveredCityId, setHoveredCityId] = useState<string | null>(null);
  const activeOffice =
    OFFICE_DATA.find((o) => o.id === activeCityId) || OFFICE_DATA[0];

  return (
    <div className="relative w-full overflow-hidden text-white">
      {/* ------------------------------------------------------------- */}
      {/* 1. SECTION HEADER                                             */}
      {/* ------------------------------------------------------------- */}
      <div className="mb-8 text-center sm:mb-10">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-950/40 p-2.5 shadow-[0_0_25px_rgba(168,85,247,0.25)] backdrop-blur-md">
          <img
            src={geoIconUrl}
            alt="Location Pin"
            className="h-8 w-8 object-contain filter drop-shadow-[0_0_8px_#a855f7]"
          />
        </div>

        <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Sovereign Security Across India & UAE
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[#d8cefa]">
          Operating across premier technology, banking, and governance capitals in India and Dubai — safeguarding enterprise digital infrastructure with sovereign, adversary-grade cybersecurity.
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. AUTHENTIC INDIA & DUBAI 3D TACTICAL MAP                    */}
      {/* ------------------------------------------------------------- */}
      <div className="relative mx-auto aspect-[16/8.5] min-h-[380px] w-full max-w-[1560px] select-none overflow-hidden rounded-3xl border border-violet-500/20 bg-[#070314] shadow-[0_0_70px_rgba(124,58,237,0.3)] sm:min-h-[480px] lg:min-h-[560px]">
        {/* Atmospheric Horizon Curve Glow on Top */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-[280px] w-[130%] rounded-[100%] border-b border-cyan-400/30 opacity-70 blur-[3px]"
          style={{
            boxShadow:
              "0 25px 90px 20px rgba(168, 85, 247, 0.45), 0 10px 40px 10px rgba(56, 189, 248, 0.3)",
          }}
        />

        {/* Ambient atmospheric bottom glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 rounded-t-full bg-gradient-to-t from-violet-600/25 via-purple-600/10 to-transparent blur-[80px]"
        />

        {/* SVG Tactical Vector Map: Authentic India & Dubai (UAE) Geography */}
        <svg
          className="absolute inset-0 h-full w-full select-none"
          viewBox="0 0 1000 520"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Glow filters */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="laserGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* India contour gradient */}
            <linearGradient id="indiaBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="40%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>

            {/* UAE contour gradient */}
            <linearGradient id="uaeBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            {/* Dubai to Mumbai flight path gradient */}
            <linearGradient id="dubaiMumbaiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="60%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            {/* Indian domestic branches laser gradient */}
            <linearGradient id="laserPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>

            {/* Epicenter radial gradient */}
            <radialGradient id="hqPulseGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </radialGradient>

            {/* Solid arrow markers */}
            <marker
              id="arrowSolidCyan"
              markerWidth="7"
              markerHeight="7"
              refX="5"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 1.5, 6 3.5, 0 5.5" fill="#38bdf8" />
            </marker>
            <marker
              id="arrowSolidPurple"
              markerWidth="7"
              markerHeight="7"
              refX="5"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 1.5, 6 3.5, 0 5.5" fill="#c084fc" />
            </marker>
          </defs>

          {/* Tactical Graticule Lines (Coordinate Grid) */}
          <g opacity="0.10" stroke="#818cf8" strokeWidth="0.6">
            <line x1="200" y1="20" x2="200" y2="500" />
            <line x1="380" y1="20" x2="380" y2="500" />
            <line x1="560" y1="20" x2="560" y2="500" />
            <line x1="740" y1="20" x2="740" y2="500" />
            <line x1="920" y1="20" x2="920" y2="500" />
            <line x1="30" y1="140" x2="970" y2="140" />
            <line x1="30" y1="280" x2="970" y2="280" />
            <line x1="30" y1="420" x2="970" y2="420" />
          </g>

          {/* Graticule Tactical Coordinates */}
          <g className="font-mono text-[8.5px] fill-violet-400/35 select-none">
            <text x="204" y="32">56° E</text>
            <text x="384" y="32">65° E</text>
            <text x="564" y="32">75° E</text>
            <text x="744" y="32">85° E</text>
            <text x="40" y="136">29° N</text>
            <text x="40" y="276">20° N</text>
            <text x="40" y="416">11° N</text>
          </g>

          {/* Surrounding Regional Landmasses (Oman, Pakistan, Sri Lanka, Arabian Peninsula) */}
          <path
            d={NEIGHBOR_PATH}
            fill="#0a051d"
            stroke="rgba(168, 85, 247, 0.16)"
            strokeWidth="0.8"
          />

          {/* Authentic India Landmass Fill & Glowing Vector Contour */}
          <path
            d={INDIA_PATH}
            fill="rgba(124, 58, 237, 0.14)"
            stroke="url(#indiaBorderGrad)"
            strokeWidth="2.0"
            filter="url(#neonGlow)"
          />
          <path
            d={INDIA_PATH}
            fill="none"
            stroke="url(#indiaBorderGrad)"
            strokeWidth="1.2"
          />

          {/* Authentic UAE (Dubai) Landmass Fill & Glowing Vector Contour */}
          <path
            d={UAE_PATH}
            fill="rgba(56, 189, 248, 0.22)"
            stroke="url(#uaeBorderGrad)"
            strokeWidth="2.2"
            filter="url(#neonGlow)"
          />
          <path
            d={UAE_PATH}
            fill="none"
            stroke="url(#uaeBorderGrad)"
            strokeWidth="1.4"
          />

          {/* Authentic Cyber Dot Matrix Inside India */}
          <g className="pointer-events-none">
            {INDIA_DOTS.map(([x, y], idx) => {
              const isHighlight = idx % 23 === 0;
              return (
                <circle
                  key={`in-${idx}`}
                  cx={x}
                  cy={y}
                  r={isHighlight ? 2.1 : 1.4}
                  fill={isHighlight ? "#c084fc" : "#a855f7"}
                  opacity={isHighlight ? 0.95 : 0.55}
                />
              );
            })}
          </g>

          {/* Authentic Cyber Dot Matrix Inside UAE */}
          <g className="pointer-events-none">
            {UAE_DOTS.map(([x, y], idx) => {
              const isHighlight = idx % 5 === 0;
              return (
                <circle
                  key={`uae-${idx}`}
                  cx={x}
                  cy={y}
                  r={isHighlight ? 2.3 : 1.5}
                  fill={isHighlight ? "#67e8f9" : "#38bdf8"}
                  opacity={0.85}
                />
              );
            })}
          </g>

          {/* --------------------------------------------------------- */}
          {/* SOLID GLOWING FLIGHT PATHS & LASER CONNECTIONS            */}
          {/* --------------------------------------------------------- */}
          <g className="pointer-events-none">
            {/* 1. DUBAI TO MUMBAI HQ: SOLID LASER VECTOR ACROSS ARABIAN SEA */}
            <path
              d="M 182.8 206.7 Q 340 185 516.6 294.8"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="4.5"
              opacity="0.22"
              filter="url(#laserGlow)"
            />
            <path
              id="flightDubaiMumbai"
              d="M 182.8 206.7 Q 340 185 516.6 294.8"
              fill="none"
              stroke="url(#dubaiMumbaiGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              markerEnd="url(#arrowSolidCyan)"
            />
            <circle r="3.5" fill="#38bdf8" filter="url(#laserGlow)">
              <animateMotion
                path="M 182.8 206.7 Q 340 185 516.6 294.8"
                dur="3.2s"
                repeatCount="indefinite"
              />
            </circle>

            {/* 2. MUMBAI HQ TO DELHI */}
            <path
              d="M 516.6 294.8 Q 550 215 598.8 157.7"
              fill="none"
              stroke="#c084fc"
              strokeWidth="4"
              opacity="0.2"
              filter="url(#laserGlow)"
            />
            <path
              id="flightMumbaiDelhi"
              d="M 516.6 294.8 Q 550 215 598.8 157.7"
              fill="none"
              stroke="url(#laserPurpleGrad)"
              strokeWidth="1.8"
              strokeLinecap="round"
              markerEnd="url(#arrowSolidPurple)"
            />
            <circle r="2.8" fill="#c084fc" filter="url(#laserGlow)">
              <animateMotion
                path="M 516.6 294.8 Q 550 215 598.8 157.7"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </circle>

            {/* 3. MUMBAI HQ TO GUJARAT */}
            <path
              d="M 516.6 294.8 Q 508 260 512.1 235.3"
              fill="none"
              stroke="url(#laserPurpleGrad)"
              strokeWidth="1.8"
              strokeLinecap="round"
              markerEnd="url(#arrowSolidPurple)"
            />
            <circle r="2.5" fill="#c084fc" filter="url(#laserGlow)">
              <animateMotion
                path="M 516.6 294.8 Q 508 260 512.1 235.3"
                dur="1.8s"
                repeatCount="indefinite"
              />
            </circle>

            {/* 4. MUMBAI HQ TO HYDERABAD */}
            <path
              d="M 516.6 294.8 Q 570 310 625.0 332.0"
              fill="none"
              stroke="url(#laserPurpleGrad)"
              strokeWidth="1.8"
              strokeLinecap="round"
              markerEnd="url(#arrowSolidPurple)"
            />
            <circle r="2.6" fill="#c084fc" filter="url(#laserGlow)">
              <animateMotion
                path="M 516.6 294.8 Q 570 310 625.0 332.0"
                dur="2.1s"
                repeatCount="indefinite"
              />
            </circle>

            {/* 5. MUMBAI HQ TO KOLKATA */}
            <path
              d="M 516.6 294.8 Q 660 240 810.2 244.6"
              fill="none"
              stroke="#c084fc"
              strokeWidth="4"
              opacity="0.2"
              filter="url(#laserGlow)"
            />
            <path
              id="flightMumbaiKolkata"
              d="M 516.6 294.8 Q 660 240 810.2 244.6"
              fill="none"
              stroke="url(#laserPurpleGrad)"
              strokeWidth="1.8"
              strokeLinecap="round"
              markerEnd="url(#arrowSolidPurple)"
            />
            <circle r="2.8" fill="#c084fc" filter="url(#laserGlow)">
              <animateMotion
                path="M 516.6 294.8 Q 660 240 810.2 244.6"
                dur="2.8s"
                repeatCount="indefinite"
              />
            </circle>

            {/* 6. MUMBAI HQ TO BENGALURU */}
            <path
              d="M 516.6 294.8 Q 555 350 606.1 382.6"
              fill="none"
              stroke="url(#laserPurpleGrad)"
              strokeWidth="1.8"
              strokeLinecap="round"
              markerEnd="url(#arrowSolidPurple)"
            />
            <circle r="2.8" fill="#c084fc" filter="url(#laserGlow)">
              <animateMotion
                path="M 516.6 294.8 Q 555 350 606.1 382.6"
                dur="2.2s"
                repeatCount="indefinite"
              />
            </circle>

            {/* 7. MUMBAI HQ TO CHENNAI */}
            <path
              d="M 516.6 294.8 Q 585 345 656.8 381.0"
              fill="none"
              stroke="url(#laserPurpleGrad)"
              strokeWidth="1.8"
              strokeLinecap="round"
              markerEnd="url(#arrowSolidPurple)"
            />
            <circle r="2.8" fill="#c084fc" filter="url(#laserGlow)">
              <animateMotion
                path="M 516.6 294.8 Q 585 345 656.8 381.0"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Mumbai HQ Epicenter Ambient Glow Pulse */}
            <circle cx="516.6" cy="294.8" r="18" fill="url(#hqPulseGlow)" />
          </g>
        </svg>

        {/* ------------------------------------------------------------- */}
        {/* 3D PIN MARKERS & ATTACHED FLOATING BADGES (IMAGE 2 STYLE)     */}
        {/* ------------------------------------------------------------- */}
        {OFFICE_DATA.map((office) => {
          const isSelected = activeCityId === office.id;
          const isHovered = hoveredCityId === office.id;
          const isHighlighted = isSelected || isHovered;

          return (
            <div
              key={office.id}
              className="group absolute -translate-x-1/2 -translate-y-full cursor-pointer select-none transition-all duration-300 z-20 hover:z-50"
              style={{
                left: `${office.mapCoord.x}%`,
                top: `${office.mapCoord.y}%`,
              }}
              onClick={() => setActiveCityId(office.id)}
              onMouseEnter={() => setHoveredCityId(office.id)}
              onMouseLeave={() => setHoveredCityId(null)}
            >
              {/* 3D Pin with specular gloss and contact shadow */}
              <MarkerPin3D
                isHq={office.isHq}
                isDubai={office.id === "dubai"}
                isHighlighted={isHighlighted}
              />

              {/* Attached Clean & Simple Floating City Badge */}
              <div
                className={`absolute z-30 transition-all duration-300 pointer-events-none ${
                  office.badgeAlign === "left"
                    ? "right-full mr-2.5 top-1.5 -translate-y-1/2"
                    : "left-full ml-2.5 top-1.5 -translate-y-1/2"
                }`}
              >
                <div
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 backdrop-blur-xl border transition-all duration-200 whitespace-nowrap shadow-lg ${
                    isHighlighted
                      ? "bg-[#1d0b45]/95 border-violet-300 shadow-[0_0_20px_rgba(168,85,247,0.7)] scale-105 ring-1 ring-violet-400/50 text-white"
                      : office.isHq
                      ? "bg-[#160628]/90 border-rose-500/50 text-white shadow-[0_4px_14px_rgba(0,0,0,0.5)]"
                      : "bg-[#100726]/90 border-white/20 text-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                  }`}
                >
                  {office.isHq && (
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse shrink-0" />
                  )}
                  <span className="text-xs sm:text-[13px] font-bold tracking-tight">
                    {office.isHq ? "Mumbai (HQ)" : office.cityName}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. INTERACTIVE CITY TABS                                      */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {OFFICE_DATA.map((office) => {
          const isSelected = activeCityId === office.id;
          return (
            <button
              key={office.id}
              onClick={() => setActiveCityId(office.id)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-[#1b0d3d] text-white border border-violet-400 shadow-[0_0_18px_rgba(168,85,247,0.4)] scale-105"
                  : "bg-white/[0.07] text-slate-300 border border-white/10 hover:bg-white/[0.12] hover:text-white"
              }`}
            >
              <span>{office.tabLabel}</span>
              {office.isHq && (
                <span className="rounded bg-rose-600 px-1.5 py-0.5 text-[9.5px] font-bold tracking-wider text-white">
                  HQ
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. OFFICE DETAILS CARD                                        */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 mx-auto mt-10 w-full max-w-[1560px] overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] p-6 sm:p-8 lg:p-10 backdrop-blur-2xl shadow-2xl transition-all duration-300">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* LEFT SIDE: CITY HEADER & DIRECT CONTACT */}
          <div className="lg:col-span-5 flex flex-col justify-between border-b border-white/10 pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 text-[10.5px] font-mono tracking-wider">
                <span className="rounded-md border border-violet-400/40 bg-violet-950/60 px-2.5 py-1 font-semibold text-[#d8b4fe]">
                  {activeOffice.categoryBadge}
                </span>
                <span className="rounded-md bg-white/10 px-2 py-1 text-slate-300">
                  {activeOffice.regionBadge}
                </span>
              </div>

              {/* Large City Title */}
              <h3 className="mt-4 font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                {activeOffice.cityName}
              </h3>

              {/* Phone & Email Links */}
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-violet-300">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono text-[10.5px] uppercase tracking-wider text-slate-400">
                      PHONE
                    </div>
                    <a
                      href={`tel:${activeOffice.phone.replace(/\s+/g, "")}`}
                      className="text-sm sm:text-base font-bold text-white hover:text-violet-300 transition-colors"
                    >
                      {activeOffice.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-violet-300">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono text-[10.5px] uppercase tracking-wider text-slate-400">
                      EMAIL
                    </div>
                    <a
                      href={`mailto:${activeOffice.email}`}
                      className="text-sm sm:text-base font-bold text-white hover:text-violet-300 transition-colors break-all"
                    >
                      {activeOffice.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* View Office & Direct Google Maps Redirection */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  activeOffice.subOffices[0]?.address || activeOffice.cityName
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all duration-200 hover:from-violet-500 hover:to-indigo-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] cursor-pointer"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                </svg>
                <span>Get Directions &bull; {activeOffice.cityName}</span>
                <span className="text-base">&rarr;</span>
              </a>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  activeOffice.subOffices[0]?.address || activeOffice.cityName
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-4 py-3 text-xs sm:text-sm font-medium tracking-wide text-slate-200 transition-all duration-200 hover:bg-white/10 hover:text-white"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>View on Map</span>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: LOCATIONS LIST (01, 02, 03, 04...) */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-violet-300 mb-4">
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span>LOCATIONS IN {activeOffice.cityName.toUpperCase()}</span>
            </div>

            <div className="space-y-3.5">
              {activeOffice.subOffices.map((sub) => (
                <div
                  key={sub.num}
                  className="group rounded-2xl border border-white/12 bg-white/[0.03] p-4 sm:p-5 transition-all duration-200 hover:border-violet-400/40 hover:bg-white/[0.06]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-base font-bold text-violet-400 group-hover:text-white transition-colors">
                        {sub.num}
                      </span>
                      <div>
                        <h4 className="font-display text-base font-bold text-white group-hover:text-violet-200 transition-colors">
                          {sub.title}
                        </h4>
                        <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-300/90">
                          {sub.address}
                        </p>
                      </div>
                    </div>
                    {/* Google Maps Directions Link */}
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(sub.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="self-start sm:self-center shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-violet-400/30 bg-violet-950/50 px-3.5 py-1.5 text-xs font-medium text-violet-300 transition-all hover:bg-violet-600 hover:text-white hover:border-violet-300"
                      title="Get Directions on Google Maps"
                    >
                      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                      </svg>
                      <span>Directions</span>
                      <span className="text-[11px]">&rarr;</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
