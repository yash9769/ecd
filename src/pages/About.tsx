import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Kicker, Reveal, RevealText } from "../components/ui";
import { COMPLIANCE } from "../data";
import { CtaBand } from "./Home";
import AboutHeroShield from "../components/about/AboutHeroShield";
import amitUrl from "../imports/amitkumar-clean.jpg";
import ctoUrl from "../imports/team-cto.jpg";
import strategyUrl from "../imports/team-strategy.jpg";

const WRAP = "mx-auto max-w-[1320px] px-6 lg:px-10";

/* ---------------------------------------------------------------- */
/* Pillar Icons matching CyberNX reference                          */
/* ---------------------------------------------------------------- */
function WhoWeAreIcon() {
  return (
    <div className="relative flex h-[74px] w-[74px] items-center justify-center rounded-[22px] bg-[#f5f0ff] transition-transform duration-300 group-hover:scale-105 dark:bg-violet-950/40">
      <svg
        className="h-9 w-9 text-[#6d28d9] dark:text-[#c4b5fd]"
        fill="none"
        viewBox="0 0 48 48"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="24" cy="14" r="5" />
        <path d="M16 33c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        <circle cx="11" cy="18" r="4" />
        <path d="M5 34c0-3.3 2.7-6 6-6 1.8 0 3.3.8 4.3 2" />
        <circle cx="37" cy="18" r="4" />
        <path d="M43 34c0-3.3-2.7-6-6-6-1.8 0-3.3.8-4.3 2" />
      </svg>
    </div>
  );
}

function OurVisionIcon() {
  return (
    <div className="relative flex h-[74px] w-[74px] items-center justify-center rounded-[22px] bg-[#f5f0ff] transition-transform duration-300 group-hover:scale-105 dark:bg-violet-950/40">
      <svg
        className="h-9 w-9 text-[#6d28d9] dark:text-[#c4b5fd]"
        fill="none"
        viewBox="0 0 48 48"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 40V24l12-8v24" />
        <path d="M20 16l14-6v30" />
        <path d="M34 26l6 3v11" />
        <line x1="14" y1="28" x2="14" y2="29" strokeWidth="3" />
        <line x1="14" y1="34" x2="14" y2="35" strokeWidth="3" />
        <line x1="26" y1="18" x2="26" y2="19" strokeWidth="3" />
        <line x1="26" y1="24" x2="26" y2="25" strokeWidth="3" />
        <line x1="26" y1="30" x2="26" y2="31" strokeWidth="3" />
        <line x1="26" y1="36" x2="26" y2="37" strokeWidth="3" />
        <line x1="6" y1="40" x2="42" y2="40" />
      </svg>
    </div>
  );
}

function OurMissionIcon() {
  return (
    <div className="relative flex h-[74px] w-[74px] items-center justify-center rounded-[22px] bg-[#f5f0ff] transition-transform duration-300 group-hover:scale-105 dark:bg-violet-950/40">
      <svg
        className="h-9 w-9 text-[#6d28d9] dark:text-[#c4b5fd]"
        fill="none"
        viewBox="0 0 48 48"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="24" cy="24" r="15" strokeDasharray="3 3" opacity="0.35" />
        <path d="M24 10v10l5-3" />
        <path d="M15 27l7 4-2 6" />
        <path d="M33 27l-7 4 2 6" />
        <path d="M20 15a4 4 0 0 1 8 0" />
        <path d="M14 27a4 4 0 0 1 4-6" />
        <path d="M34 27a4 4 0 0 0-4-6" />
      </svg>
    </div>
  );
}

const TEAM_MEMBERS = [
  {
    name: "AMITKUMAR MORE",
    role: "Founder & Chief Executive Officer",
    image: amitUrl,
    linkedin: "https://www.linkedin.com/",
    bio: "Amitkumar leads Envista Cyber Defence with over a decade of executive leadership in cybersecurity, threat intelligence, and digital defense governance. He has spearheaded critical security transformations across enterprise infrastructures, empowering organizations across India and globally to maintain proactive cyber resilience.",
  },
  {
    name: "RAHUL VERMA",
    role: "Co-Founder & Chief Technology Officer",
    image: ctoUrl,
    linkedin: "https://www.linkedin.com/",
    bio: "Rahul spearheads our offensive security research, cloud architecture, penetration testing, and zero-day threat analysis. With over 15+ years of hands-on security engineering, he architects robust cyber defense postures that outmaneuver sophisticated threat actors.",
  },
  {
    name: "DEVENDRA SINGH",
    role: "Co-Founder & Head of Strategy",
    image: strategyUrl,
    linkedin: "https://www.linkedin.com/",
    bio: "Devendra leads strategic cyber advisory, BFSI compliance, and managed defensive operations. He has spent 16+ years designing agile cyber frameworks, incident response runbooks, and risk governance models across enterprise banking and fintech sectors.",
  },
];

const SECTIONS_NAV = [
  { id: "who-we-are", label: "01 / WHO WE ARE" },
  { id: "key-facts", label: "02 / KEY FACTS" },
  { id: "location", label: "03 / LOCATION" },
  { id: "what-we-offer", label: "04 / WHAT WE OFFER" },
  { id: "leadership", label: "05 / LEADERSHIP" },
  { id: "accreditations", label: "06 / ACCREDITATIONS" },
];

export default function About() {
  const [activeSection, setActiveSection] = useState("key-facts");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = SECTIONS_NAV.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      }));

      const scrollY = window.scrollY + 250;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= scrollY) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH 3D METALLIC SHIELD & "SECURITY BEYOND THE SURFACE"   */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-[#070314] text-white pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24 transition-colors duration-300">
        {/* Subtle Cyber Hexagon Mesh Accents in background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 20%, rgba(147, 51, 234, 0.18) 0%, transparent 60%),
                              radial-gradient(circle, rgba(168, 85, 247, 0.08) 1px, transparent 1px)`,
            backgroundSize: "100% 100%, 36px 36px",
          }}
        />

        {/* Decorative Hexagon Patterns on Left and Right (matching CyberCrest reference) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-12 left-8 h-44 w-44 opacity-15 sm:left-16 lg:left-24"
        >
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-purple-400">
            <polygon points="50 3, 90 25, 90 75, 50 97, 10 75, 10 25" strokeWidth="1.2" />
            <polygon points="50 18, 78 33, 78 67, 50 82, 22 67, 22 33" strokeWidth="0.8" strokeDasharray="3 3" />
          </svg>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-16 right-8 h-48 w-48 opacity-15 sm:right-16 lg:right-28"
        >
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-violet-400">
            <polygon points="50 3, 90 25, 90 75, 50 97, 10 75, 10 25" strokeWidth="1.2" />
            <polygon points="50 18, 78 33, 78 67, 50 82, 22 67, 22 33" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Ambient Violet/Purple Backlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[750px] rounded-full opacity-35 blur-[120px]"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(124,58,237,0.2) 50%, transparent 75%)",
          }}
        />

        <div className={`relative z-10 ${WRAP} flex flex-col items-center text-center`}>
          {/* 3D ROTATING METALLIC PURPLE SHIELD EMBLEM */}
          <div className="relative w-full max-w-[500px] sm:max-w-[560px] -mt-6 sm:-mt-8">
            <AboutHeroShield />

            {/* "ABOUT US" Pill Badge Centered Over the Shield Bottom (Exact CyberCrest Reference) */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-[#09041a]/90 px-5 py-1.5 text-xs font-mono uppercase tracking-[0.25em] text-[#e9d5ff] shadow-[0_0_25px_rgba(168,85,247,0.35)] backdrop-blur-xl transition-all duration-300 hover:border-violet-300">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                <span>ABOUT US</span>
              </div>
            </div>
          </div>

          {/* MAIN HEADLINE WITH STRONG TAGLINE */}
          <div className="mt-5 sm:mt-6 max-w-4xl">
            <h1 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-white sm:text-4xl lg:text-[48px] leading-[1.15]">
              <RevealText
                text="Envista Cyber Defence — Security Beyond The Surface"
                stagger={30}
              />
            </h1>

            {/* DESCRIPTION */}
            <Reveal delay={150}>
              <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-sm lg:text-base leading-relaxed text-[#d8cefa]">
                The team at Envista Cyber Defence has come together to streamline enterprise cybersecurity,
                proactive threat intelligence, and deep-spectrum vulnerability management. We protect modern
                enterprises from hidden exposures with offensive precision and 24/7 resilience.
              </p>
            </Reveal>

            {/* ACTION BUTTONS: TALK TO AN EXPERT & READ MORE > */}
            <Reveal delay={250}>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-5 sm:gap-6">
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-slate-100 hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] hover:scale-105 active:scale-95"
                >
                  TALK TO AN EXPERT
                </Link>

                <a
                  href="#key-facts"
                  className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#c4b5fd] transition-colors hover:text-white"
                >
                  READ MORE
                  <span className="text-base transition-transform duration-200 group-hover:translate-x-1">
                    &gt;
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. KEY FACTS ABOUT ENVISTA CYBER DEFENCE (SCREENSHOT 2 RECREATION)        */}
      {/* ========================================================================= */}
      <section
        id="key-facts"
        className="relative overflow-hidden bg-[#080417] text-white py-16 sm:py-20 lg:py-24 border-t border-white/[0.08] transition-colors duration-300"
      >
        {/* Soft subtle radial ambient lighting arc */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 left-1/2 -translate-x-1/2 h-[450px] w-[900px] rounded-full opacity-25 blur-[130px]"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, rgba(91,33,182,0.15) 60%, transparent 80%)",
          }}
        />

        <div className={WRAP}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-start">
            {/* COLUMN 1: LEFT NAVIGATION INDEX (01 / WHO WE ARE, 02 / KEY FACTS...) */}
            <div className="lg:col-span-3 flex flex-col justify-between self-stretch pr-4">
              <nav className="space-y-4 font-mono text-xs tracking-wider" aria-label="About Page Navigation">
                {SECTIONS_NAV.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className={`group flex items-center gap-3 transition-all duration-200 ${
                        isActive
                          ? "text-white font-bold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                          isActive
                            ? "bg-violet-400 shadow-[0_0_8px_#a855f7] scale-125"
                            : "bg-transparent group-hover:bg-slate-400"
                        }`}
                      />
                      <span>{sec.label}</span>
                    </a>
                  );
                })}
              </nav>

              {/* FLOATING TALK TO AN EXPERT CARD (MATCHING CYBERCREST BOTTOM-LEFT DOCK) */}
              <div className="mt-12 hidden lg:block">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl shadow-lg transition-transform duration-300 hover:border-violet-400/40">
                  <img
                    src={ctoUrl}
                    alt="Cybersecurity Expert"
                    className="h-28 w-full rounded-xl object-cover object-[center_20%]"
                  />
                  <Link
                    to="/contact"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-900 transition-colors hover:bg-slate-100"
                  >
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                    </svg>
                    TALK TO AN EXPERT
                  </Link>
                </div>
              </div>
            </div>

            {/* COLUMN 2: MIDDLE HEADING & PARAGRAPH */}
            <div className="lg:col-span-5 lg:pr-6">
              <Reveal>
                <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[44px] leading-[1.14]">
                  Key Facts about <br />
                  <span className="bg-gradient-to-r from-white via-violet-200 to-purple-300 bg-clip-text text-transparent">
                    Envista Cyber Defence
                  </span>
                </h2>

                <p className="mt-6 text-sm sm:text-[15px] leading-relaxed text-[#d8cefa]">
                  With a focused, dedicated in-house team of certified cybersecurity specialists, ethical hackers,
                  and defensive architects, Envista Cyber Defence is a reliable partner in meeting stringent
                  security standards and continuous threat protection.
                </p>

                <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#c4b5fd]">
                  Headquartered in Mumbai (India), we operate globally and service enterprise clients across
                  the US, APAC, the Middle East, and Europe.
                </p>
              </Reveal>
            </div>

            {/* COLUMN 3: RIGHT BOLD STATS WITH METALLIC/GRADIENT NUMBERS */}
            <div className="lg:col-span-4 space-y-9">
              {/* Stat 1: Decades */}
              <Reveal delay={100}>
                <div>
                  <h3 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-violet-300">
                    Decades
                  </h3>
                  <p className="mt-2 text-xs sm:text-[13.5px] font-medium leading-snug text-slate-300">
                    of combined experience in the cybersecurity & defence industry
                  </p>
                </div>
              </Reveal>

              {/* Stat 2: 500+ */}
              <Reveal delay={200}>
                <div>
                  <h3 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-violet-300">
                    500+
                  </h3>
                  <p className="mt-2 text-xs sm:text-[13.5px] font-medium leading-snug text-slate-300">
                    security assessments and client engagements delivered across critical enterprise industries
                  </p>
                </div>
              </Reveal>

              {/* Stat 3: 20+ */}
              <Reveal delay={300}>
                <div>
                  <h3 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-violet-300">
                    20+
                  </h3>
                  <p className="mt-2 text-xs sm:text-[13.5px] font-medium leading-snug text-slate-300">
                    industry-leading organization accreditations & certified practitioners (OSCP, CEH, ISO 27001, CISSP)
                  </p>
                </div>
              </Reveal>

              {/* Stat 4: 99% / 100% */}
              <Reveal delay={400}>
                <div>
                  <h3 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-violet-300">
                    99%
                  </h3>
                  <p className="mt-2 text-xs sm:text-[13.5px] font-medium leading-snug text-slate-300">
                    client retention rate. Our continuous vigilance, proactive defense, and rapid incident response speak for itself.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. WHO WE ARE, OUR VISION, OUR MISSION (WHITE PAPER SECTION)              */}
      {/* ========================================================================= */}
      <section
        id="who-we-are"
        className="border-t border-slate-200/80 bg-white py-16 sm:py-20 lg:py-24 transition-colors duration-300 dark:border-white/10 dark:bg-[#090a10]"
      >
        <div className={WRAP}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Kicker n="01" tone="light">Who We Are</Kicker>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0d1020] dark:text-white">
              Who We Are and What We Offer
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              The foundational pillars that guide our proactive security practices, technical rigor, and client partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
            {/* 1. Who We Are */}
            <Reveal delay={100}>
              <div className="group flex flex-col h-full rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 sm:p-8 dark:border-white/10 dark:bg-white/[0.03] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <WhoWeAreIcon />
                <h3 className="mt-6 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#0d1020] transition-colors duration-200 dark:text-white">
                  Who We Are
                </h3>
                <p className="mt-3 text-xs sm:text-[14px] leading-relaxed text-slate-600 dark:text-slate-300">
                  Envista Cyber Defence is one of the fastest growing cybersecurity practices with a dynamic
                  team of certified cybersecurity practitioners dedicated to safeguarding businesses against
                  modern digital threats. With a strong commitment to proactive defence and adversary emulation,
                  we deliver end-to-end security for modern enterprises and public sector institutions.
                </p>
              </div>
            </Reveal>

            {/* 2. Our Vision */}
            <Reveal delay={200}>
              <div className="group flex flex-col h-full rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 sm:p-8 dark:border-white/10 dark:bg-white/[0.03] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <OurVisionIcon />
                <h3 className="mt-6 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#0d1020] transition-colors duration-200 dark:text-white">
                  Our Vision
                </h3>
                <p className="mt-3 text-xs sm:text-[14px] leading-relaxed text-slate-600 dark:text-slate-300">
                  To be a cybersecurity partner of choice and to build an unyielding defence ecosystem that
                  empowers our clients in their digital journeys by setting new benchmarks through constant
                  innovation, implementing proactive defence strategies, and fostering long-term resilience
                  against sophisticated global threat actors.
                </p>
              </div>
            </Reveal>

            {/* 3. Our Mission */}
            <Reveal delay={300}>
              <div className="group flex flex-col h-full rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 sm:p-8 dark:border-white/10 dark:bg-white/[0.03] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <OurMissionIcon />
                <h3 className="mt-6 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#0d1020] transition-colors duration-200 dark:text-white">
                  Our Mission
                </h3>
                <p className="mt-3 text-xs sm:text-[14px] leading-relaxed text-slate-600 dark:text-slate-300">
                  Our mission is to provide cutting-edge cybersecurity solutions and services to our customers
                  designed to fortify defences against sophisticated threats, prevent security breaches, and
                  ensure complete operational resilience across people, processes, and technology.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. LOCATION & GLOBAL REACH (PURPLE SECTION)                               */}
      {/* ========================================================================= */}
      <section
        id="location"
        className="relative overflow-hidden bg-[#150a2e] text-white py-16 sm:py-20 lg:py-24 transition-colors duration-300 dark:bg-[#0c061e]"
      >
        <div className={WRAP}>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <Kicker n="03">Location</Kicker>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Global Footprint. <br />
                <span className="text-[#c4b5fd]">Mumbai Headquarters.</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#d8cefa]">
                From our state-of-the-art Security Operations Center in Mumbai, Envista Cyber Defence orchestrates
                offensive testing, proactive threat intelligence, and compliance monitoring across 4 continents.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-md">
                  <div className="text-xs font-mono uppercase tracking-wider text-violet-300">HQ Office</div>
                  <div className="mt-1 text-sm font-bold text-white">Mumbai, Maharashtra</div>
                  <div className="text-xs text-slate-300">India — Global Delivery Center</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-md">
                  <div className="text-xs font-mono uppercase tracking-wider text-violet-300">Operations</div>
                  <div className="mt-1 text-sm font-bold text-white">24/7 Follow-the-Sun</div>
                  <div className="text-xs text-slate-300">US, APAC, Middle East & Europe</div>
                </div>
              </div>
            </div>

            <div className="w-full lg:max-w-lg rounded-2xl border border-white/12 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-xl">
              <h3 className="font-display text-lg font-bold text-white">Global Enterprise Coverage</h3>
              <ul className="mt-4 space-y-3.5 text-xs sm:text-sm text-[#d8cefa]">
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  <span><strong>APAC:</strong> Financial institutions, fintech unicorns, and tech conglomerates</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  <span><strong>Middle East:</strong> Critical infrastructure, retail chains, and government bodies</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  <span><strong>Americas & Europe:</strong> Cross-border data privacy, SOC 2, and cloud perimeter defence</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. WHAT WE OFFER (WHITE SECTION)                                          */}
      {/* ========================================================================= */}
      <section
        id="what-we-offer"
        className="border-t border-slate-200/80 bg-white py-16 sm:py-20 lg:py-24 transition-colors duration-300 dark:border-white/10 dark:bg-[#090a10]"
      >
        <div className={WRAP}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Kicker n="04" tone="light">What We Offer</Kicker>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0d1020] dark:text-white">
              End-to-End Cyber Defence Capabilities
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              High-fidelity offensive testing, continuous vigilance, and regulatory assurance under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Offensive Security & Red Teaming",
                desc: "Simulate real-world advanced persistent threats (APTs) to uncover structural vulnerabilities before attackers exploit them.",
              },
              {
                title: "Attack Surface Management",
                desc: "Discover, catalogue, and continuously monitor external assets, cloud perimeters, and unknown shadows across your ecosystem.",
              },
              {
                title: "Penetration Testing (VAPT)",
                desc: "Deep-dive assessments across web apps, APIs, cloud environments, mobile binaries, and enterprise networks.",
              },
              {
                title: "24/7 Managed SOC & Incident Response",
                desc: "Rapid threat hunting, log anomaly correlation, and swift containment to mitigate breach blast radiuses.",
              },
              {
                title: "Cloud & Zero-Trust Architecture",
                desc: "Harden AWS, Azure, and GCP workloads with immutable identities, granular access controls, and posture management.",
              },
              {
                title: "Governance, Risk & Compliance",
                desc: "Streamlined audit readiness and policy engineering for ISO 27001, SOC 2, PCI DSS, GDPR, CERT-In, and RBI.",
              },
            ].map((srv, idx) => (
              <Reveal key={srv.title} delay={idx * 80}>
                <div className="flex flex-col justify-between h-full rounded-2xl border border-slate-200/90 bg-slate-50/60 p-6 dark:border-white/10 dark:bg-white/[0.03] transition-all duration-300 hover:border-purple-deep/40 hover:shadow-lg">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#6d28d9] dark:text-violet-400">
                      0{idx + 1}
                    </span>
                    <h3 className="mt-2.5 font-display text-lg font-bold text-slate-900 dark:text-white">
                      {srv.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                      {srv.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/10">
                    <Link
                      to="/capabilities"
                      className="text-xs font-bold text-[#6d28d9] hover:underline dark:text-violet-400"
                    >
                      Explore capability &rarr;
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. OUR LEADERSHIP TEAM (PURPLE SECTION)                                   */}
      {/* ========================================================================= */}
      <section
        id="leadership"
        className="relative overflow-hidden bg-[#150a2e] text-white py-16 sm:py-20 lg:py-24 transition-colors duration-300 dark:bg-[#0c061e]"
      >
        <div className={WRAP}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#c4b5fd] shadow-xs backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
              <span className="font-mono text-[10.5px] uppercase tracking-wider">05 / Leadership</span>
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white lg:text-[38px]">
              <RevealText text="Our Leadership Team" />
            </h2>
            <Reveal delay={120}>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#d8cefa]">
                The cybersecurity specialists, researchers, and strategists engineering relentless protection for modern organizations.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.map((member, i) => (
              <Reveal key={member.name} delay={i * 120}>
                <div className="group relative flex h-full flex-col items-center rounded-2xl border border-white/12 bg-white/[0.06] p-6 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:bg-white/[0.1] hover:shadow-[0_12px_32px_rgba(124,58,237,0.25)]">
                  {/* Avatar Photo */}
                  <div className="relative mb-5">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-cover object-[center_18%] border-4 border-violet-400/30 shadow-sm transition-transform duration-300 group-hover:scale-105"
                      draggable={false}
                    />
                  </div>

                  {/* Name & LinkedIn Badge */}
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="font-display text-[17px] font-extrabold uppercase tracking-wide text-white sm:text-[18px]">
                      {member.name}
                    </h3>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[3px] bg-[#0077b5] text-white transition-opacity hover:opacity-85"
                      aria-label={`${member.name} LinkedIn profile`}
                      title="LinkedIn Profile"
                    >
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.6a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66A1.65 1.65 0 0 0 7.83 6.6Z" />
                      </svg>
                    </a>
                  </div>

                  {/* Role */}
                  <p className="mt-1.5 text-[14px] font-medium text-[#c4b5fd]">
                    {member.role}
                  </p>

                  {/* Bio */}
                  <p className="mt-4 text-[13px] sm:text-[13.5px] leading-relaxed text-[#d8cefa]">
                    {member.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. ACCREDITATIONS & COMPLIANCE (WHITE PAPER SECTION)                      */}
      {/* ========================================================================= */}
      <section id="accreditations" className="paper relative">
        <div className={`${WRAP} py-16 sm:py-20 lg:py-24`}>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="lg:max-w-sm">
              <Kicker n="06" tone="light">Accreditations</Kicker>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[color:var(--color-paper-fg)]">
                <RevealText text="Aligned to the frameworks that matter." />
              </h2>
              <p className="paper-muted mt-3 text-xs sm:text-sm leading-relaxed">
                We operate inside the global standards our enterprise clients answer to — turning compliance from a
                checkbox into continuously evidenced security advantage.
              </p>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-px sm:grid-cols-3 lg:max-w-2xl" style={{ background: "var(--color-paper-line)" }}>
              {COMPLIANCE.map((c, i) => (
                <Reveal key={c} delay={i * 60}>
                  <div className="flex items-center justify-center bg-white px-4 py-7 font-mono text-xs sm:text-[13px] tracking-[0.14em] text-[color:var(--color-paper-fg)] transition-colors hover:text-purple-deep">
                    {c}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
