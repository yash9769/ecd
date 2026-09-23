import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Kicker, Reveal, RevealText } from "../components/ui";
import { COMPLIANCE } from "../data";
import { CtaBand } from "./Home";
import AboutHeroShield from "../components/about/AboutHeroShield";
import LocationGlobe from "../components/about/LocationGlobe";
import amitUrl from "../imports/amitkumar-clean.jpg";
import dipikaUrl from "../imports/dipika-bisawa.png";
import yashodhanUrl from "../imports/yashodhan_headshot.jpg";
import prajhotUrl from "../imports/prajhot-naik.png";

const WRAP = "mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8";

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

interface TeamMember {
  name: string;
  role: string;
  category: "directors" | "advisory" | "foundational";
  categoryLabel: string;
  image?: string;
  initials?: string;
  linkedin: string;
  bio: string;
}

const LEADERSHIP_DATA: TeamMember[] = [
  // 1. BOARD OF DIRECTORS
  {
    name: "AMITKUMAR MORE",
    role: "Founder & Chief Executive Officer",
    category: "directors",
    categoryLabel: "Board of Directors",
    image: amitUrl,
    linkedin: "https://www.linkedin.com/in/amitkumarmore/",
    bio: "Amitkumar leads Envista Cyber Defence with over a decade of executive leadership in cybersecurity, threat intelligence, and digital defense governance. He has spearheaded critical security transformations across enterprise infrastructures, empowering organizations across India and globally to maintain proactive cyber resilience.",
  },

  // 2. FOUNDATIONAL TEAM
  {
    name: "PRAJHOT P NAIK",
    role: "Senior Manager",
    category: "foundational",
    categoryLabel: "Management Team",
    image: prajhotUrl,
    initials: "PN",
    linkedin: "https://www.linkedin.com/in/prajhot-pnaik/",
    bio: "Senior Manager driving proactive threat defense operations, critical infrastructure vulnerability assessments, defensive security tooling, and enterprise client engagements.",
  },
  {
    name: "KARTHIK",
    role: "Regional Head BD",
    category: "foundational",
    categoryLabel: "Business Development",
    initials: "K",
    linkedin: "https://www.linkedin.com/",
    bio: "Regional Head - Business Development steering enterprise cybersecurity client engagements, strategic sovereign defense partnerships, and regional growth.",
  },
  {
    name: "YASHODHAN RAJAPKAR",
    role: "Offensive Security Intern",
    category: "foundational",
    categoryLabel: "Core Security Team",
    image: yashodhanUrl,
    initials: "YR",
    linkedin: "https://www.linkedin.com/in/yashodhan-rajapkar-807014284/",
    bio: "Offensive Security Intern specializing in adversary emulation, penetration testing, red teaming operations, vulnerability research, and continuous defensive telemetry.",
  },

  // 3. ADVISORY BOARD
  {
    name: "DIPIKA BISAWA",
    role: "Executive Director, CHRO & Advisory Board Member",
    category: "advisory",
    categoryLabel: "Advisory Board",
    image: dipikaUrl,
    linkedin: "https://www.linkedin.com/in/dipika-bisawa-0a9a211a/",
    bio: "Executive Director & Chief Human Resources Officer with extensive expertise across corporate governance, human capital leadership, regulatory compliance, risk management, and organizational culture. She brings strategic leadership in designing enterprise compliance architectures and advisory across premier financial and consulting institutions.",
  },
  {
    name: "CA HUZEIFA UNWALA",
    role: "Strategic Advisor & Advisory Board Member",
    category: "advisory",
    categoryLabel: "Advisory Board",
    initials: "HU",
    linkedin: "https://www.linkedin.com/in/ca-huzeifa-unwala/",
    bio: "Senior Partner at JHS & Associates LLP. Widely regarded authority in corporate governance, enterprise risk mitigation, internal audit, and CERT-In empanelled cybersecurity auditing frameworks for multinational enterprises and regulated financial institutions.",
  },
  {
    name: "TAHER PEPERMINTWALA",
    role: "Strategic Advisor & Advisory Board Member",
    category: "advisory",
    categoryLabel: "Advisory Board",
    initials: "TP",
    linkedin: "https://www.linkedin.com/in/taherpepermintwala/",
    bio: "Senior Partner at JHS & Associates LLP. Strategic advisor specializing in corporate risk mitigation, financial governance, operational internal controls, regulatory compliance, and cyber resilience strategies across enterprise sectors.",
  },
];

export default function About() {
  const [leadershipTab, setLeadershipTab] = useState<"all" | "directors" | "advisory" | "foundational">("all");

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH 3D METALLIC SHIELD & "SECURITY BEYOND THE SURFACE"   */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-[#150a2e] text-white pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24 transition-colors duration-300">
        {/* Top-Left Subtle Dot Grid Pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[2%] top-[10%] hidden h-[120px] w-[120px] opacity-20 lg:block"
          style={{
            backgroundImage: "radial-gradient(rgba(148,163,184,0.4) 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* Cyber aura blob (SentinelOne vibrant purple style) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-100"
          style={{
            background: "radial-gradient(1200px 900px at 50% 30%, rgba(124, 58, 237, 0.4) 0%, rgba(79, 70, 229, 0.15) 50%, transparent 100%)",
          }}
        />
        {/* Aurora ambient layer */}
        <div className="aurora-bg block" aria-hidden="true" />

        {/* Luxurious luminous ambient nebula aura */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 h-[600px] w-[800px] rounded-full opacity-45 blur-[140px] animate-pink-blob"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(192, 132, 252, 0.32) 0%, rgba(168, 85, 247, 0.26) 30%, rgba(217, 70, 239, 0.18) 55%, rgba(99, 102, 241, 0.12) 75%, transparent 100%)",
          }}
        />

        {/* Bottom atmospheric gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-[60%] w-[40%] opacity-30"
          style={{
            background: "radial-gradient(800px 600px at 100% 100%, rgba(151, 38, 182, 0.3) 0%, transparent 100%)",
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
        className="relative overflow-hidden bg-[#150a2e] text-white py-16 sm:py-20 lg:py-24 border-t border-white/[0.08] transition-colors duration-300"
      >
        <div className="aurora-bg block" aria-hidden="true" />
        {/* Soft subtle radial ambient lighting arc */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 left-1/2 -translate-x-1/2 h-[450px] w-[900px] rounded-full opacity-35 blur-[130px]"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(124,58,237,0.2) 60%, transparent 80%)",
          }}
        />

        <div className={WRAP}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12 items-start">
            {/* LEFT COLUMN: HEADING & PARAGRAPH */}
            <div className="lg:col-span-6 xl:col-span-7 lg:pr-10">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#c4b5fd] shadow-xs backdrop-blur-md mb-5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
                  <span className="font-mono text-[10.5px] uppercase tracking-wider">02 / Key Facts</span>
                </div>

                <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[46px] leading-[1.14]">
                  Key Facts about <br />
                  <span className="bg-gradient-to-r from-white via-violet-200 to-purple-300 bg-clip-text text-transparent">
                    Envista Cyber Defence
                  </span>
                </h2>

                <p className="mt-6 text-sm sm:text-base leading-relaxed text-[#d8cefa]">
                  With a focused, dedicated in-house team of certified cybersecurity specialists, ethical hackers,
                  and defensive architects, Envista Cyber Defence is a reliable partner in meeting stringent
                  security standards and continuous threat protection.
                </p>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#c4b5fd]">
                  Headquartered in Mumbai (India), we operate globally and service enterprise clients across
                  the US, APAC, the Middle East, and Europe.
                </p>
              </Reveal>
            </div>

            {/* RIGHT COLUMN: BOLD STATS WITH EXACT CYBERCREST METALLIC TEXT EFFECT */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-11">
              {/* Stat 1: Decades */}
              <Reveal delay={100}>
                <div>
                  <h3
                    className="font-display text-5xl sm:text-[60px] font-medium tracking-tight leading-[1.1]"
                    style={{
                      backgroundImage: "linear-gradient(-15deg, #000000 8%, #89c6ea 57%, #ffffff 82%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Decades
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-300/90 font-normal">
                    of experience in the cybersecurity & defence industry
                  </p>
                </div>
              </Reveal>

              {/* Stat 2: 500+ */}
              <Reveal delay={200}>
                <div>
                  <h3
                    className="font-display text-5xl sm:text-[60px] font-medium tracking-tight leading-[1.1]"
                    style={{
                      backgroundImage: "linear-gradient(-15deg, #000000 8%, #89c6ea 57%, #ffffff 82%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    500+
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-300/90 font-normal">
                    client engagements and security assessments delivered across industries
                  </p>
                </div>
              </Reveal>

              {/* Stat 3: 20+ */}
              <Reveal delay={300}>
                <div>
                  <h3
                    className="font-display text-5xl sm:text-[60px] font-medium tracking-tight leading-[1.1]"
                    style={{
                      backgroundImage: "linear-gradient(-15deg, #000000 8%, #89c6ea 57%, #ffffff 82%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    20+
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-300/90 font-normal">
                    industry-leading organization accreditations & consulting certifications
                  </p>
                </div>
              </Reveal>

              {/* Stat 4: 99% */}
              <Reveal delay={400}>
                <div>
                  <h3
                    className="font-display text-5xl sm:text-[60px] font-medium tracking-tight leading-[1.1]"
                    style={{
                      backgroundImage: "linear-gradient(-15deg, #000000 8%, #89c6ea 57%, #ffffff 82%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    99%
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-300/90 font-normal">
                    client retention rate. Our client retention rate speaks for itself
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
      {/* 4. LOCATION & GLOBAL REACH: 3D GLOBE STRUCTURE & OFFICE MAPPING           */}
      {/* ========================================================================= */}
      <section
        id="location"
        className="relative overflow-hidden bg-[#150a2e] text-white py-16 sm:py-20 lg:py-24 border-t border-white/[0.08] transition-colors duration-300"
      >
        <div className="aurora-bg block" aria-hidden="true" />
        <div className={WRAP}>
          <LocationGlobe />
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
      {/* ========================================================================= */}
      {/* 6. OUR LEADERSHIP TEAM (PURPLE SECTION)                                   */}
      {/* ========================================================================= */}
      <section
        id="leadership"
        className="relative overflow-hidden bg-[#150a2e] text-white py-16 sm:py-20 lg:py-24 border-t border-white/[0.08] transition-colors duration-300 dark:bg-[#0f0724]"
      >
        <div className="aurora-bg block" aria-hidden="true" />
        {/* Soft background ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[900px] rounded-full opacity-30 blur-[130px]"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(91,33,182,0.15) 70%, transparent 80%)",
          }}
        />

        <div className={WRAP}>
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#c4b5fd] shadow-xs backdrop-blur-md mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
              <span className="font-mono text-[10.5px] uppercase tracking-wider">05 / Leadership</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[42px]">
              <RevealText text="Our Leadership Team" />
            </h2>
            <Reveal delay={120}>
              <p className="mt-3 text-xs sm:text-sm lg:text-base leading-relaxed text-[#d8cefa]">
                The cybersecurity specialists, seasoned directors, advisory partners, and foundational engineers safeguarding enterprise resilience.
              </p>
            </Reveal>

            {/* Category Filter Tabs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {[
                { id: "all", label: "All Leadership" },
                { id: "directors", label: "Board of Directors" },
                { id: "foundational", label: "Foundational Team" },
                { id: "advisory", label: "Advisory Board" },
              ].map((tab) => {
                const isActive = leadershipTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setLeadershipTab(tab.id as any)}
                    className={`rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-violet-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.45)] border border-violet-300 scale-105"
                        : "bg-white/[0.06] text-slate-300 border border-white/10 hover:bg-white/[0.12] hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* TIER 1: BOARD OF DIRECTORS                                    */}
          {/* ------------------------------------------------------------- */}
          {(leadershipTab === "all" || leadershipTab === "directors") && (
            <div className="mb-16">
              {leadershipTab === "all" && (
                <div className="mb-8 flex items-center justify-center gap-4 max-w-4xl mx-auto">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/30 to-violet-400/60" />
                  <div className="flex items-center gap-2.5 rounded-full border border-violet-400/40 bg-violet-950/60 px-5 py-1.5 shadow-[0_0_15px_rgba(168,85,247,0.35)] backdrop-blur-md shrink-0">
                    <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse shadow-[0_0_8px_#a855f7]" />
                    <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-violet-200">
                      Board of Directors
                    </h3>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent via-violet-500/30 to-violet-400/60" />
                </div>
              )}

              <div className="flex justify-center max-w-6xl mx-auto">
                {LEADERSHIP_DATA.filter((m) => m.category === "directors").map((member, i) => (
                  <div key={member.name} className="w-full max-w-xl">
                    <Reveal delay={i * 120}>
                    <div className="group relative flex h-full flex-col items-center rounded-2xl border border-white/15 bg-white/[0.05] p-7 text-center shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/60 hover:bg-white/[0.08] hover:shadow-[0_16px_36px_rgba(124,58,237,0.3)]">
                      {/* Category Pill */}
                      <span className="mb-4 rounded-full border border-violet-400/40 bg-violet-950/60 px-3 py-0.5 text-[10.5px] font-mono font-semibold uppercase tracking-wider text-[#d8b4fe]">
                        Director
                      </span>

                      {/* Photo */}
                      <div className="relative mb-5">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="h-32 w-32 sm:h-36 sm:w-36 rounded-full object-cover object-top border-4 border-violet-400/40 shadow-lg transition-transform duration-300 group-hover:scale-105"
                          draggable={false}
                        />
                      </div>

                      {/* Name & LinkedIn */}
                      <div className="flex items-center justify-center gap-2">
                        <h4 className="font-display text-lg sm:text-xl font-extrabold uppercase tracking-wide text-white">
                          {member.name}
                        </h4>
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
                      <p className="mt-1.5 text-sm font-semibold text-[#c4b5fd]">
                        {member.role}
                      </p>

                      {/* Bio */}
                      <p className="mt-3.5 text-xs sm:text-[13px] leading-relaxed text-[#d8cefa]">
                        {member.bio}
                      </p>

                      {/* Connect on LinkedIn Button */}
                      <div className="mt-auto pt-5">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-sky-400/35 bg-[#0077b5]/15 px-4 py-1.5 text-xs font-semibold text-sky-200 shadow-sm transition-all duration-200 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] hover:shadow-[0_0_16px_rgba(0,119,181,0.6)] hover:scale-105 cursor-pointer"
                        >
                          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.6a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66A1.65 1.65 0 0 0 7.83 6.6Z" />
                          </svg>
                          <span>Connect</span>
                          <span className="text-[11px]">&rarr;</span>
                        </a>
                      </div>
                    </div>
                  </Reveal>
                </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TIER 2: FOUNDATIONAL TEAM                                     */}
          {/* ------------------------------------------------------------- */}
          {(leadershipTab === "all" || leadershipTab === "foundational") && (
            <div className="mb-16">
              {leadershipTab === "all" && (
                <div className="mb-8 flex items-center justify-center gap-4 max-w-4xl mx-auto">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-emerald-400/60" />
                  <div className="flex items-center gap-2.5 rounded-full border border-emerald-400/40 bg-emerald-950/60 px-5 py-1.5 shadow-[0_0_15px_rgba(52,211,153,0.35)] backdrop-blur-md shrink-0">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                    <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-200">
                      Foundational Team
                    </h3>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent via-emerald-500/30 to-emerald-400/60" />
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {LEADERSHIP_DATA.filter((m) => m.category === "foundational").map((member, i) => (
                  <Reveal key={member.name} delay={i * 120}>
                    <div className="group relative flex h-full flex-col items-center rounded-2xl border border-white/15 bg-white/[0.05] p-6 text-center shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-white/[0.08] hover:shadow-[0_16px_36px_rgba(16,185,129,0.25)]">
                      {/* Category Pill */}
                      <span className="mb-4 rounded-full border border-emerald-400/40 bg-emerald-950/60 px-3 py-0.5 text-[10.5px] font-mono font-semibold uppercase tracking-wider text-emerald-300">
                        Foundational Team
                      </span>

                      {/* Avatar Photo or Initials Crest */}
                      <div className="relative mb-5">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover object-center border-4 border-emerald-400/40 shadow-lg transition-transform duration-300 group-hover:scale-105"
                            draggable={false}
                          />
                        ) : (
                          <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full border-4 border-emerald-400/40 bg-gradient-to-br from-emerald-900/60 via-purple-950/80 to-[#0b051e] shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:border-emerald-300">
                            <span className="font-display text-xl sm:text-2xl font-extrabold tracking-wider text-emerald-200 drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]">
                              {member.initials}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Name & LinkedIn */}
                      <div className="flex items-center justify-center gap-2">
                        <h4 className="font-display text-base sm:text-lg font-extrabold uppercase tracking-wide text-white">
                          {member.name}
                        </h4>
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
                      <p className="mt-1.5 text-xs sm:text-sm font-semibold text-emerald-300">
                        {member.role}
                      </p>

                      {/* Bio */}
                      <p className="mt-3 text-xs sm:text-[12.5px] leading-relaxed text-[#d8cefa]">
                        {member.bio}
                      </p>

                      {/* Connect on LinkedIn Button */}
                      <div className="mt-auto pt-5">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-sky-400/35 bg-[#0077b5]/15 px-4 py-1.5 text-xs font-semibold text-sky-200 shadow-sm transition-all duration-200 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] hover:shadow-[0_0_16px_rgba(0,119,181,0.6)] hover:scale-105 cursor-pointer"
                        >
                          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.6a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66A1.65 1.65 0 0 0 7.83 6.6Z" />
                          </svg>
                          <span>Connect</span>
                          <span className="text-[11px]">&rarr;</span>
                        </a>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TIER 3: ADVISORY BOARD                                        */}
          {/* ------------------------------------------------------------- */}
          {(leadershipTab === "all" || leadershipTab === "advisory") && (
            <div>
              {leadershipTab === "all" && (
                <div className="mb-8 flex items-center justify-center gap-4 max-w-4xl mx-auto">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-cyan-400/60" />
                  <div className="flex items-center gap-2.5 rounded-full border border-cyan-400/40 bg-cyan-950/60 px-5 py-1.5 shadow-[0_0_15px_rgba(34,211,238,0.35)] backdrop-blur-md shrink-0">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                    <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-200">
                      Advisory Board
                    </h3>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent via-cyan-500/30 to-cyan-400/60" />
                </div>
              )}

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto">
                {LEADERSHIP_DATA.filter((m) => m.category === "advisory").map((member, i) => (
                  <Reveal key={member.name} delay={i * 120}>
                    <div className="group relative flex h-full flex-col items-center rounded-2xl border border-white/15 bg-white/[0.05] p-7 text-center shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-white/[0.08] hover:shadow-[0_16px_36px_rgba(6,182,212,0.25)]">
                      {/* Category Pill */}
                      <span className="mb-4 rounded-full border border-cyan-400/40 bg-cyan-950/60 px-3 py-0.5 text-[10.5px] font-mono font-semibold uppercase tracking-wider text-cyan-200">
                        Strategic Advisor
                      </span>

                      {/* Initials Crest / Avatar */}
                      <div className="relative mb-5 flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-full border-4 border-cyan-400/40 bg-gradient-to-br from-cyan-900/60 via-purple-950/80 to-[#0b051e] shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:border-cyan-300">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="h-full w-full rounded-full object-cover object-center"
                            draggable={false}
                          />
                        ) : (
                          <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-wider text-cyan-200 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]">
                            {member.initials}
                          </span>
                        )}
                      </div>

                      {/* Name & LinkedIn */}
                      <div className="flex items-center justify-center gap-2">
                        <h4 className="font-display text-lg sm:text-xl font-extrabold uppercase tracking-wide text-white">
                          {member.name}
                        </h4>
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
                      <p className="mt-1.5 text-sm font-semibold text-cyan-200">
                        {member.role}
                      </p>

                      {/* Bio */}
                      <p className="mt-3.5 text-xs sm:text-[13px] leading-relaxed text-[#d8cefa]">
                        {member.bio}
                      </p>

                      {/* Connect on LinkedIn Button */}
                      <div className="mt-auto pt-5">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-sky-400/35 bg-[#0077b5]/15 px-4 py-1.5 text-xs font-semibold text-sky-200 shadow-sm transition-all duration-200 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] hover:shadow-[0_0_16px_rgba(0,119,181,0.6)] hover:scale-105 cursor-pointer"
                        >
                          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.6a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66A1.65 1.65 0 0 0 7.83 6.6Z" />
                          </svg>
                          <span>Connect</span>
                          <span className="text-[11px]">&rarr;</span>
                        </a>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
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
