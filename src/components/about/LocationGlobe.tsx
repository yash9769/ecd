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
  isHq?: boolean;
  categoryBadge: string;
  regionBadge: string;
  cityName: string;
  phone: string;
  email: string;
  mapCoord: { x: number; y: number }; // percentage on the 1000x520 map
  labelPos: {
    dx: string; // CSS transform offset or placement
    dy: string;
  };
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
    isHq: true,
    categoryBadge: "PRINCIPAL HEADQUARTERS",
    regionBadge: "MAHARASHTRA",
    cityName: "Mumbai",
    phone: "1800 120 1022",
    email: "connect@jhsassociates.in",
    mapCoord: { x: CITY_COORDS.mumbai.pctX, y: CITY_COORDS.mumbai.pctY },
    labelPos: { dx: "-50%", dy: "140%" },
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
    id: "gujarat",
    tabLabel: "Gujarat",
    categoryBadge: "REGIONAL ENTERPRISE HUB",
    regionBadge: "GUJARAT",
    cityName: "Gujarat",
    phone: "+91 9374639574",
    email: "kalpesh.parmar@jhsassociates.in",
    mapCoord: { x: CITY_COORDS.gujarat.pctX, y: CITY_COORDS.gujarat.pctY },
    labelPos: { dx: "-115%", dy: "-30%" },
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
    id: "delhi",
    tabLabel: "Delhi",
    categoryBadge: "NATIONAL CAPITAL OFFICE",
    regionBadge: "DELHI-NCR",
    cityName: "Delhi",
    phone: "+91 9810333433",
    email: "nikhel.kochhar@jhsassociates.in",
    mapCoord: { x: CITY_COORDS.delhi.pctX, y: CITY_COORDS.delhi.pctY },
    labelPos: { dx: "-50%", dy: "-165%" },
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
    id: "kolkata",
    tabLabel: "Kolkata",
    categoryBadge: "EASTERN INDIA GATEWAY",
    regionBadge: "WEST BENGAL",
    cityName: "Kolkata",
    phone: "+91 9831150209",
    email: "sharad.mohata@jhsassociates.in",
    mapCoord: { x: CITY_COORDS.kolkata.pctX, y: CITY_COORDS.kolkata.pctY },
    labelPos: { dx: "20%", dy: "-30%" },
    subOffices: [
      {
        num: "01",
        title: "Kolkata Camac Street Hub",
        address:
          "Unit No. 402, 4th floor, Vardhan Complex, 25A Camac Street, Kolkata, West Bengal – 700016",
      },
    ],
  },
  {
    id: "bengaluru",
    tabLabel: "Bengaluru",
    categoryBadge: "SILICON VALLEY OFFICE",
    regionBadge: "KARNATAKA",
    cityName: "Bengaluru",
    phone: "+91 9663397755",
    email: "narayana.malla@jhsassociates.in",
    mapCoord: { x: CITY_COORDS.bengaluru.pctX, y: CITY_COORDS.bengaluru.pctY },
    labelPos: { dx: "-115%", dy: "-10%" },
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
    id: "chennai",
    tabLabel: "Chennai",
    categoryBadge: "SOUTH INDIA FINANCIAL HUB",
    regionBadge: "TAMIL NADU",
    cityName: "Chennai",
    phone: "+91 9840131965",
    email: "chandrasekaran@jhsassociates.in",
    mapCoord: { x: CITY_COORDS.chennai.pctX, y: CITY_COORDS.chennai.pctY },
    labelPos: { dx: "20%", dy: "-10%" },
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
    id: "dubai",
    tabLabel: "Dubai",
    categoryBadge: "GCC & INTERNATIONAL HUB",
    regionBadge: "UAE",
    cityName: "Dubai, UAE",
    phone: "+971 4348 0046",
    email: "vinod.joshi@jhsuae.com",
    mapCoord: { x: CITY_COORDS.dubai.pctX, y: CITY_COORDS.dubai.pctY },
    labelPos: { dx: "-50%", dy: "135%" },
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
];

export default function LocationGlobe() {
  const [activeCityId, setActiveCityId] = useState<string>("mumbai");
  const [hoveredCityId, setHoveredCityId] = useState<string | null>(null);
  const activeOffice =
    OFFICE_DATA.find((o) => o.id === activeCityId) || OFFICE_DATA[0];

  return (
    <div className="relative w-full overflow-hidden text-white">
      {/* ------------------------------------------------------------- */}
      {/* 1. SECTION HEADER (MATCHING CYBERCREST "WE SERVE GLOBALLY")   */}
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
          We Serve Globally
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[#d8cefa]">
          Envista Cyber Defence operates across premier technology, banking, and
          regulatory capitals in India and Dubai — safeguarding enterprise
          infrastructures with sovereign, adversary-grade cybersecurity.
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. AUTHENTIC INDIA & DUBAI REGIONAL CYBER MAP                */}
      {/* ------------------------------------------------------------- */}
      <div className="relative mx-auto aspect-[16/8.3] min-h-[360px] w-full max-w-[1240px] select-none overflow-hidden rounded-3xl border border-violet-500/20 bg-[#060212] shadow-[0_0_70px_rgba(124,58,237,0.3)] sm:min-h-[460px] lg:min-h-[540px]">
        {/* Deep Atmospheric Horizon Curve Glow on Top */}
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

            {/* India contour gradients */}
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

            {/* Solid arrow markers (NOT dotted) */}
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
          <g opacity="0.12" stroke="#818cf8" strokeWidth="0.6">
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
          <g className="font-mono text-[8.5px] fill-violet-400/40 select-none">
            <text x="204" y="32">56° E</text>
            <text x="384" y="32">65° E</text>
            <text x="564" y="32">75° E</text>
            <text x="744" y="32">85° E</text>
            <text x="40" y="136">29° N</text>
            <text x="40" y="276">20° N</text>
            <text x="40" y="416">11° N</text>
          </g>


          {/* Surrounding Regional Landmasses (Arabian Peninsula, Oman, Pakistan, Sri Lanka, Nepal, Bangladesh) */}
          <path
            d={NEIGHBOR_PATH}
            fill="#0b061d"
            stroke="rgba(168, 85, 247, 0.16)"
            strokeWidth="0.8"
            className="transition-colors duration-300"
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

          {/* Authentic High-Tech Cyber Dot Matrix Inside India */}
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
                  opacity={isHighlight ? 0.95 : 0.6}
                />
              );
            })}
          </g>

          {/* Authentic High-Tech Cyber Dot Matrix Inside UAE */}
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
                  opacity={0.88}
                />
              );
            })}
          </g>

          {/* --------------------------------------------------------- */}
          {/* SOLID GLOWING FLIGHT PATHS & LASER CONNECTIONS (NO DOTS) */}
          {/* --------------------------------------------------------- */}
          <g className="pointer-events-none">
            {/* 1. DUBAI TO MUMBAI HQ: SOLID LASER VECTOR ACROSS ARABIAN SEA */}
            <path
              d="M 182.8 206.7 Q 340 185 516.6 294.8"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="5"
              opacity="0.25"
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
            {/* Traveling solid light pulse along Dubai-Mumbai route */}
            <circle r="3.5" fill="#38bdf8" filter="url(#laserGlow)">
              <animateMotion
                path="M 182.8 206.7 Q 340 185 516.6 294.8"
                dur="3.2s"
                repeatCount="indefinite"
              />
            </circle>

            {/* 2. MUMBAI HQ TO DELHI: SOLID LINE & ARROW */}
            <path
              d="M 516.6 294.8 Q 550 215 598.8 157.7"
              fill="none"
              stroke="#c084fc"
              strokeWidth="4"
              opacity="0.22"
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

            {/* 3. MUMBAI HQ TO GUJARAT: SOLID LINE & ARROW */}
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

            {/* 4. MUMBAI HQ TO KOLKATA: SOLID LINE & ARROW */}
            <path
              d="M 516.6 294.8 Q 660 240 810.2 244.6"
              fill="none"
              stroke="#c084fc"
              strokeWidth="4"
              opacity="0.22"
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

            {/* 5. MUMBAI HQ TO BENGALURU: SOLID LINE & ARROW */}
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

            {/* 6. MUMBAI HQ TO CHENNAI: SOLID LINE & ARROW */}
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
        {/* CYBERCREST RADAR NODES & DIRECTIONAL CAPSULES                */}
        {/* ------------------------------------------------------------- */}
        {OFFICE_DATA.map((office) => {
          const isSelected = activeCityId === office.id;
          const isHovered = hoveredCityId === office.id;
          const isHighlighted = isSelected || isHovered;

          return (
            <div
              key={office.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none transition-all duration-300 z-20 hover:z-40"
              style={{
                left: `${office.mapCoord.x}%`,
                top: `${office.mapCoord.y}%`,
              }}
              onClick={() => setActiveCityId(office.id)}
              onMouseEnter={() => setHoveredCityId(office.id)}
              onMouseLeave={() => setHoveredCityId(null)}
            >
              {/* Concentric CyberCrest Radar Halo (Active / Hovered State) */}
              {isHighlighted && (
                <>
                  <div className="pointer-events-none absolute -inset-7 rounded-full border border-violet-400/40 bg-violet-600/20 animate-pulse" />
                  <div className="pointer-events-none absolute -inset-11 rounded-full border border-violet-400/20" />
                </>
              )}

              {/* Pulsing beacon ping for HQ or default pulse */}
              <div
                className={`absolute -inset-2.5 rounded-full transition-all duration-500 ${
                  isHighlighted
                    ? "animate-ping bg-violet-400/80"
                    : office.isHq
                    ? "animate-ping bg-purple-400/50"
                    : "bg-transparent"
                }`}
              />

              {/* Radar Node Circle (CyberCrest translucent disc + core) */}
              <div
                className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                  isHighlighted
                    ? "h-7 w-7 sm:h-8 sm:w-8 bg-violet-500/90 shadow-[0_0_24px_#a855f7] scale-110 border-2 border-white"
                    : office.isHq
                    ? "h-6 w-6 sm:h-6 sm:w-6 bg-purple-600/85 border border-purple-300/80 shadow-[0_0_16px_#9333ea]"
                    : "h-4 w-4 sm:h-4.5 sm:w-4.5 bg-white/30 border border-white/70 shadow-[0_0_10px_rgba(255,255,255,0.7)] backdrop-blur-sm hover:scale-125 hover:bg-violet-400"
                }`}
              >
                {/* Center Core Dot */}
                <div
                  className={`rounded-full bg-white transition-all ${
                    isHighlighted
                      ? "h-2.5 w-2.5 sm:h-3 sm:w-3 shadow-[0_0_8px_white]"
                      : "h-1.5 w-1.5"
                  }`}
                />
              </div>

              {/* Directional Non-Colliding Label Capsule */}
              <div
                className={`pointer-events-none absolute whitespace-nowrap rounded-md px-2 py-0.5 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                  isHighlighted
                    ? "border border-violet-300 bg-[#12072e]/95 text-white shadow-[0_0_16px_rgba(168,85,247,0.7)] scale-105 z-30 opacity-100"
                    : office.isHq
                    ? "border border-purple-400/60 bg-black/85 text-purple-200 opacity-95"
                    : "border border-white/20 bg-black/75 text-slate-200/90 opacity-85 hover:opacity-100"
                }`}
                style={{
                  transform: `translate(${office.labelPos.dx}, ${office.labelPos.dy})`,
                }}
              >
                {office.tabLabel}
                {office.isHq && (
                  <span className="ml-1 rounded bg-rose-600 px-1 py-0.2 text-[7.5px] sm:text-[8px] text-white">
                    HQ
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. INTERACTIVE CITY TABS (MATCHING JHS SCREENSHOTS)          */}
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
      {/* 4. OFFICE DETAILS CARD (MATCHING JHS ATTACHED SCREENSHOTS)    */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 mx-auto mt-10 w-full max-w-[1240px] overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] p-6 sm:p-8 lg:p-10 backdrop-blur-2xl shadow-2xl transition-all duration-300">
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
