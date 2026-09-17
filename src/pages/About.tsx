import { Kicker, Reveal, RevealText } from "../components/ui";
import { COMPLIANCE } from "../data";
import { CtaBand } from "./Home";
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
        {/* Center Person */}
        <circle cx="24" cy="14" r="5" />
        <path d="M16 33c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        {/* Left Person */}
        <circle cx="11" cy="18" r="4" />
        <path d="M5 34c0-3.3 2.7-6 6-6 1.8 0 3.3.8 4.3 2" />
        {/* Right Person */}
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
        {/* Modern Buildings / City Skyline */}
        <path d="M8 40V24l12-8v24" />
        <path d="M20 16l14-6v30" />
        <path d="M34 26l6 3v11" />
        {/* Windows */}
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
        {/* Three Hands in Unity / Collaboration */}
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

export default function About() {
  return (
    <>
      {/* Hero Section — Deep Royal Purple Theme */}
      <section className="relative overflow-hidden bg-[#150a2e] text-white pt-24 pb-12 transition-colors duration-300 dark:bg-[#0c061e] sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-16 lg:min-h-[75vh] lg:flex lg:flex-col lg:justify-center">
        {/* Soft atmospheric background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full opacity-40 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(124,58,237,0.15) 50%, transparent 70%)",
          }}
        />

        <div className={WRAP}>
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#c4b5fd] shadow-xs backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
              <span className="font-mono text-[10.5px] uppercase tracking-wider">About Envista</span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.12]">
              <RevealText
                text="A cyber defence practice for organizations, individuals and governments."
                stagger={45}
              />
            </h1>
            <Reveal delay={250}>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#d8cefa]">
                Envista Cyber Defence exists to stop what others miss. We unify offensive rigour,
                defensive discipline and compliance-first governance into a single, accountable
                practice — protecting the people and institutions that cannot afford to be breached.
              </p>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#c4b5fd]">
                As the attack surface expands, so does the ground an adversary can reach. Our work
                is to see it in full, test it honestly, and harden it where the blast radius is
                greatest.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pillars Section: Who We Are / Our Vision / Our Mission — (White Section) */}
      <section className="border-t border-slate-200/80 bg-white py-10 sm:py-12 lg:py-16 transition-colors duration-300 dark:border-white/10 dark:bg-[#090a10]">
        <div className={WRAP}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {/* 1. Who We Are */}
            <Reveal delay={100}>
              <div className="group flex flex-col">
                <WhoWeAreIcon />
                <h2 className="mt-5 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#0d1020] transition-colors duration-200 dark:text-white">
                  Who We Are
                </h2>
                <p className="mt-2.5 text-xs sm:text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                  Envista Cyber Defence is one of the fastest growing cybersecurity practices with a dynamic
                  team of certified cybersecurity practitioners dedicated to safeguarding businesses against
                  digital threats. With a strong commitment to proactive defence and adversary emulation,
                  we deliver end-to-end security for modern enterprises and public sector institutions.
                </p>
              </div>
            </Reveal>

            {/* 2. Our Vision */}
            <Reveal delay={200}>
              <div className="group flex flex-col">
                <OurVisionIcon />
                <h2 className="mt-5 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#0d1020] transition-colors duration-200 dark:text-white">
                  Our Vision
                </h2>
                <p className="mt-2.5 text-xs sm:text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                  To be a cybersecurity partner of choice and to build an unyielding defence ecosystem that
                  empowers our clients in their digital journeys by setting new benchmarks through constant
                  innovation, implementing proactive defence strategies, and fostering long-term resilience
                  against sophisticated global threat actors.
                </p>
              </div>
            </Reveal>

            {/* 3. Our Mission */}
            <Reveal delay={300}>
              <div className="group flex flex-col">
                <OurMissionIcon />
                <h2 className="mt-5 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#0d1020] transition-colors duration-200 dark:text-white">
                  Our Mission
                </h2>
                <p className="mt-2.5 text-xs sm:text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                  Our mission is to provide cutting-edge cybersecurity solutions and services to our customers
                  designed to fortify defences against sophisticated threats, prevent security breaches, and
                  ensure complete operational resilience across people, processes, and technology.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Team Section — (Purple Section) */}
      <section className="relative overflow-hidden bg-[#150a2e] text-white py-10 sm:py-12 lg:py-16 transition-colors duration-300 dark:bg-[#0c061e]">
        <div className={WRAP}>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#c4b5fd] shadow-xs backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
              <span className="font-mono text-[10.5px] uppercase tracking-wider">Leadership</span>
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white lg:text-[36px]">
              <RevealText text="Our Team" />
            </h2>
            <Reveal delay={120}>
              <p className="mx-auto mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-[#d8cefa]">
                The cybersecurity specialists, researchers, and strategists engineering relentless protection for modern organizations.
              </p>
            </Reveal>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.map((member, i) => (
              <Reveal key={member.name} delay={i * 120}>
                <div className="group relative flex h-full flex-col items-center rounded-2xl border border-white/12 bg-white/[0.06] p-5 sm:p-6 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:bg-white/[0.1] hover:shadow-[0_12px_32px_rgba(124,58,237,0.25)]">
                  {/* Avatar Photo */}
                  <div className="relative mb-4">
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
                  <p className="mt-5 text-[13.5px] leading-relaxed text-[#d8cefa]">
                    {member.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance — light band */}
      <section className="paper relative">
        <div className={`${WRAP} py-10 sm:py-12 lg:py-16`}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="lg:max-w-sm">
              <Kicker n="07" tone="light">Compliance</Kicker>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[color:var(--color-paper-fg)]">
                <RevealText text="Aligned to the frameworks that matter." />
              </h2>
              <p className="paper-muted mt-3 text-xs sm:text-sm leading-relaxed">
                We operate inside the standards our clients answer to — turning compliance from a
                checkbox into continuously evidenced advantage.
              </p>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-px sm:grid-cols-3 lg:max-w-2xl" style={{ background: "var(--color-paper-line)" }}>
              {COMPLIANCE.map((c, i) => (
                <Reveal key={c} delay={i * 60}>
                  <div className="flex items-center justify-center bg-white px-3 py-6 font-mono text-xs sm:text-[12.5px] tracking-[0.14em] text-[color:var(--color-paper-fg)] transition-colors hover:text-purple-deep">
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
