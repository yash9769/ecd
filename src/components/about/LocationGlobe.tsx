import React, { useState } from "react";
import globeMapUrl from "../../imports/cybercrest-globe-map.avif";
import globeWavesUrl from "../../imports/cybercrest-globe-waves.svg";
import geoIconUrl from "../../imports/cybercrest-geo-icon.svg";

interface OfficeLocation {
  id: string;
  tabLabel: string;
  isHq?: boolean;
  categoryBadge: string;
  regionBadge: string;
  cityName: string;
  phone: string;
  email: string;
  mapCoord: { x: number; y: number }; // percentage on the globe map (x: 0-100, y: 0-100)
  labelPosition: "top" | "bottom" | "left" | "right";
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
    mapCoord: { x: 37.0, y: 62.0 },
    labelPosition: "bottom",
    subOffices: [
      {
        num: "01",
        title: "Andheri (East) Head Office",
        address:
          "Unit No. B-406 to 410, 4th floor, Navkar Chambers, Marol Naka Metro Station, Andheri (East), Maharashtra – 400059",
      },
      {
        num: "02",
        title: "Mazgaon",
        address:
          "Shop No. 11A, 345, New Sai Niketan CHS Ltd, Dr Mascarenhas Road, Mazgaon, Mumbai – 400010",
      },
      {
        num: "03",
        title: "Masjid Bunder",
        address:
          "Unit No. 402, 4th floor, Nav Vyapar Bhavan, 49 P.D'mello Road, MB, Maharashtra – 400009",
      },
      {
        num: "04",
        title: "Kalyan",
        address:
          "Unit No. 11-12, Regency Avenue, Murbad Road, Kalyan (West), Maharashtra – 421301",
      },
    ],
  },
  {
    id: "gujarat",
    tabLabel: "Gujarat",
    categoryBadge: "FINANCIAL TECH HUB",
    regionBadge: "GUJARAT",
    cityName: "Gujarat",
    phone: "+91 79 2658 9100",
    email: "gujarat@jhsassociates.in",
    mapCoord: { x: 23.0, y: 48.0 },
    labelPosition: "left",
    subOffices: [
      {
        num: "01",
        title: "GIFT City Enterprise Office",
        address:
          "Block 12, Road 1D, Zone 01, GIFT City, Gandhinagar, Gujarat – 382355",
      },
      {
        num: "02",
        title: "Ahmedabad Corporate Practice",
        address:
          "Commerce House IV, Prahladnagar, Satellite, Ahmedabad, Gujarat – 380015",
      },
    ],
  },
  {
    id: "delhi",
    tabLabel: "Delhi",
    categoryBadge: "NATIONAL CAPITAL OFFICE",
    regionBadge: "DELHI",
    cityName: "Delhi",
    phone: "+91 9810333433",
    email: "nikhel.kochhar@jhsassociates.in",
    mapCoord: { x: 38.0, y: 32.0 },
    labelPosition: "top",
    subOffices: [
      {
        num: "01",
        title: "Delhi Head Office",
        address:
          "Unit No. 306, DLF Centre, Savitri Cinema Complex, Greater Kailash II, Delhi – 110048",
      },
    ],
  },
  {
    id: "bengaluru",
    tabLabel: "Bengaluru",
    categoryBadge: "TECH INNOVATION HUB",
    regionBadge: "KARNATAKA",
    cityName: "Bengaluru",
    phone: "+91 80 4123 5600",
    email: "bengaluru@jhsassociates.in",
    mapCoord: { x: 31.0, y: 78.0 },
    labelPosition: "left",
    subOffices: [
      {
        num: "01",
        title: "Cyber Defence & Threat Lab",
        address:
          "Prestige Tech Park, Outer Ring Road, Kadubeesanahalli, Bengaluru, Karnataka – 560103",
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
    mapCoord: { x: 66.0, y: 48.0 },
    labelPosition: "right",
    subOffices: [
      {
        num: "01",
        title: "Kolkata Eastern Hub",
        address:
          "Unit No. 402, 4th floor, Vardhan Complex, 25A Camac Street, Kolkata, West Bengal – 700016",
      },
    ],
  },
  {
    id: "chennai",
    tabLabel: "Chennai",
    categoryBadge: "SOUTHERN TECH CORRIDOR",
    regionBadge: "TAMIL NADU",
    cityName: "Chennai",
    phone: "+91 44 4218 7300",
    email: "chennai@jhsassociates.in",
    mapCoord: { x: 52.0, y: 82.0 },
    labelPosition: "right",
    subOffices: [
      {
        num: "01",
        title: "Chennai Infrastructure Hub",
        address:
          "Tidel Park, Rajiv Gandhi Salai (OMR), Taramani, Chennai, Tamil Nadu – 600113",
      },
    ],
  },
  {
    id: "global",
    tabLabel: "Global",
    categoryBadge: "INTERNATIONAL OFFICES",
    regionBadge: "WORLDWIDE",
    cityName: "Dubai & Global",
    phone: "+971 4348 0046",
    email: "vinod.joshi@jhsuae.com",
    mapCoord: { x: 9.0, y: 38.0 },
    labelPosition: "left",
    subOffices: [
      {
        num: "01",
        title: "Dubai, UAE",
        address:
          "1703, Sheikh Rashid Tower, Dubai World Trade Center, Sheikh Zayed Road, Dubai, U.A.E",
      },
      {
        num: "02",
        title: "Muscat, Oman",
        address:
          "P.O. Box : 3840, P. Code : 112, Ruwi, Muscat, Sultanate of Oman",
      },
      {
        num: "03",
        title: "Amersham, UK",
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
        {/* Geo Icon Header matching CyberCrest */}
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
          regulatory capitals in India and worldwide — safeguarding enterprise
          infrastructures across APAC, Europe, the Middle East, and the Americas.
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. ZOOMED 3D CURVED GLOBE VIEW (MATCHING CHATGPT MOCKUP)      */}
      {/* ------------------------------------------------------------- */}
      <div className="relative mx-auto aspect-[16/9] min-h-[380px] w-full max-w-[1240px] select-none overflow-hidden rounded-3xl border border-violet-500/20 bg-[#060212] shadow-[0_0_70px_rgba(124,58,237,0.3)] sm:min-h-[480px] lg:min-h-[580px]">
        {/* Deep Space Background with Atmospheric Horizon Glow Arc */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: "radial-gradient(ellipse at 50% 120%, #2e1065 0%, #0d0722 50%, #060212 90%)",
          }}
        />

        {/* Luminous Purple Atmospheric Curve on Top Horizon (matching screenshot) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-[340px] w-[140%] rounded-[100%] border-b-2 border-violet-400/50 opacity-80 blur-[2px]"
          style={{
            boxShadow: "0 20px 90px 25px rgba(168, 85, 247, 0.45), 0 5px 35px 5px rgba(56, 189, 248, 0.25)",
          }}
        />

        {/* The CyberCrest 3D Dotted World Globe Texture Zoomed onto Office Corridor */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={globeMapUrl}
            alt="Curved Digital World Globe"
            className="absolute inset-0 h-full w-full object-cover opacity-85 filter drop-shadow-[0_0_35px_rgba(124,58,237,0.35)]"
            style={{
              transform: "scale(2.8) translate(-19%, 3%)",
              transformOrigin: "68% 54%",
            }}
            draggable={false}
          />
        </div>

        {/* Animated Cyber Waves / Light Sweeps */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-lighten opacity-75">
          <img
            src={globeWavesUrl}
            alt="Animated Light Waves"
            className="h-full w-full object-cover"
            style={{
              transform: "scale(2.6) translate(-17%, 3%)",
              transformOrigin: "68% 54%",
            }}
            draggable={false}
          />
        </div>

        {/* Dynamic Curved Laser Flight Paths radiating from Mumbai HQ */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full z-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#c084fc" stopOpacity="1" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
            </linearGradient>
            <radialGradient id="hqGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Mumbai HQ epicenter glow */}
          <circle cx="37.0" cy="62.0" r="6" fill="url(#hqGlow)" />

          {/* Laser arc: Mumbai HQ (37, 62) to Global / Dubai (9, 38) */}
          <path
            d="M 37.0 62.0 Q 20.0 42.0 9.0 38.0"
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth="0.5"
            strokeDasharray="1.5 1"
            className="animate-pulse"
          />

          {/* Laser arc: Mumbai HQ (37, 62) to Delhi (38, 32) */}
          <path
            d="M 37.0 62.0 Q 34.0 46.0 38.0 32.0"
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth="0.45"
            strokeDasharray="1.2 0.8"
          />

          {/* Laser arc: Mumbai HQ (37, 62) to Kolkata (66, 48) */}
          <path
            d="M 37.0 62.0 Q 52.0 50.0 66.0 48.0"
            fill="none"
            stroke="url(#arcGrad)"
            strokeWidth="0.45"
            strokeDasharray="1.2 0.8"
          />

          {/* Laser arc: Mumbai HQ (37, 62) to Bengaluru (31, 78) */}
          <path
            d="M 37.0 62.0 Q 32.0 68.0 31.0 78.0"
            fill="none"
            stroke="#c084fc"
            strokeWidth="0.4"
            strokeDasharray="1 0.8"
          />

          {/* Laser arc: Mumbai HQ (37, 62) to Chennai (52, 82) */}
          <path
            d="M 37.0 62.0 Q 45.0 72.0 52.0 82.0"
            fill="none"
            stroke="#c084fc"
            strokeWidth="0.4"
            strokeDasharray="1 0.8"
          />

          {/* Laser arc: Mumbai HQ (37, 62) to Gujarat (23, 48) */}
          <path
            d="M 37.0 62.0 Q 28.0 56.0 23.0 48.0"
            fill="none"
            stroke="#c084fc"
            strokeWidth="0.4"
            strokeDasharray="1 0.8"
          />
        </svg>

        {/* ------------------------------------------------------------- */}
        {/* 3D MAPPED CALLOUT PINS (MATCHING USER'S CHATGPT MOCKUP)       */}
        {/* ------------------------------------------------------------- */}
        {OFFICE_DATA.map((office) => {
          const isSelected = activeCityId === office.id;
          const isHovered = hoveredCityId === office.id;
          const isHighlighted = isSelected || isHovered;

          return (
            <div
              key={office.id}
              className="absolute -translate-x-1/2 -translate-y-[85%] cursor-pointer transition-all duration-300 z-20 hover:z-40"
              style={{
                left: `${office.mapCoord.x}%`,
                top: `${office.mapCoord.y}%`,
              }}
              onClick={() => setActiveCityId(office.id)}
              onMouseEnter={() => setHoveredCityId(office.id)}
              onMouseLeave={() => setHoveredCityId(null)}
            >
              {/* Callout Bubble Card matching ChatGPT Screenshot */}
              <div
                className={`relative flex items-center gap-2 rounded-2xl border px-3.5 py-1.5 sm:px-4 sm:py-2 backdrop-blur-xl transition-all duration-300 ${
                  isHighlighted
                    ? "border-violet-400 bg-[#160b38]/95 shadow-[0_0_25px_rgba(168,85,247,0.6)] scale-110"
                    : office.isHq
                    ? "border-violet-400/60 bg-[#10062a]/90 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    : "border-violet-500/35 bg-[#0b041e]/85 shadow-[0_0_15px_rgba(124,58,237,0.25)] hover:border-violet-300 hover:scale-105"
                }`}
              >
                <span className="font-display text-xs sm:text-sm font-bold tracking-wider text-white">
                  {office.cityName.toUpperCase()}
                </span>

                {office.isHq ? (
                  <span className="rounded-md bg-violet-600 px-1.5 py-0.5 text-[9.5px] font-extrabold tracking-wider text-white shadow-[0_0_8px_#a855f7]">
                    HQ
                  </span>
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_#a855f7]" />
                )}

                {/* Speech Bubble Pointer Triangle */}
                <div
                  className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-0 w-0 border-x-6 border-x-transparent border-t-6 transition-colors ${
                    isHighlighted
                      ? "border-t-[#160b38]"
                      : office.isHq
                      ? "border-t-[#10062a]"
                      : "border-t-[#0b041e]"
                  }`}
                />
              </div>

              {/* Pinpoint Anchor Dot with Concentric Radar Wave Rings */}
              <div className="relative mt-2 flex items-center justify-center">
                {/* Concentric Rings for Mumbai HQ or Selected node */}
                {(office.isHq || isHighlighted) && (
                  <>
                    <div className="absolute h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-violet-400/60 animate-ping" />
                    <div className="absolute h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-violet-500/30 blur-xs" />
                  </>
                )}

                {/* Glowing Core Dot */}
                <div
                  className={`h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-white shadow-[0_0_14px_#c084fc] transition-all ${
                    isHighlighted ? "scale-125 ring-2 ring-violet-300" : ""
                  }`}
                />
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
      <div className="relative z-10 mx-auto mt-10 w-full max-w-[1100px] overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] p-6 sm:p-8 lg:p-10 backdrop-blur-2xl shadow-2xl transition-all duration-300">
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

            {/* View Office Button matching screenshot */}
            <div className="mt-8">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1d143c] border border-violet-400/40 px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all duration-200 hover:bg-violet-600 hover:border-violet-300 hover:scale-[1.02]"
              >
                <span>View {activeOffice.cityName} Office</span>
                <span className="text-base">&rarr;</span>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: LOCATIONS LIST (01, 02, 03, 04) */}
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
