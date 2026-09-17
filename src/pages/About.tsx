import { Eye, ShieldCheck, Target } from "@phosphor-icons/react";
import { Kicker, Reveal, RevealText } from "../components/ui";
import { COMPLIANCE } from "../data";
import { CtaBand } from "./Home";
import amitUrl from "../imports/amitkumar-clean.jpg";
import ctoUrl from "../imports/team-cto.jpg";
import strategyUrl from "../imports/team-strategy.jpg";

const WRAP = "mx-auto max-w-[1320px] px-6 lg:px-10";

function MissionVisionPanel() {
  return (
    <div className="flex flex-col gap-4">
      {/* Who We Are */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:border-violet-300 hover:shadow-md dark:border-white/10 dark:bg-[#111425] dark:hover:border-violet-500/40">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-[#6d28d9] dark:bg-violet-950/60 dark:text-[#c4b5fd]">
            <ShieldCheck size={20} weight="fill" />
          </div>
          <div>
            <h2 className="font-display text-[18px] font-bold text-[#0d1020] dark:text-white">
              Who We Are
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-violet-600 dark:text-violet-400">
              Cyber Defence Practice
            </p>
          </div>
        </div>
        <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
          Envista Cyber Defence is an elite cybersecurity practice uniting offensive security researchers, SOC defensive engineers, and regulatory compliance leaders to safeguard critical digital frontiers across enterprises, financial institutions, and governments.
        </p>
      </div>

      {/* Our Vision */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:border-violet-300 hover:shadow-md dark:border-white/10 dark:bg-[#111425] dark:hover:border-violet-500/40">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[#4f46e5] dark:bg-indigo-950/60 dark:text-[#a5b4fc]">
            <Eye size={20} weight="fill" />
          </div>
          <div>
            <h2 className="font-display text-[18px] font-bold text-[#0d1020] dark:text-white">
              Our Vision
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
              Uncompromised Future
            </p>
          </div>
        </div>
        <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
          To build an uncompromised digital world where global organizations operate, innovate, and expand with unwavering confidence, absolute data sovereignty, and proactive resilience against evolving adversaries.
        </p>
      </div>

      {/* Our Mission */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:border-violet-300 hover:shadow-md dark:border-white/10 dark:bg-[#111425] dark:hover:border-violet-500/40">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[#7c3aed] dark:bg-purple-950/60 dark:text-[#d8b4fe]">
            <Target size={20} weight="fill" />
          </div>
          <div>
            <h2 className="font-display text-[18px] font-bold text-[#0d1020] dark:text-white">
              Our Mission
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-purple-600 dark:text-purple-400">
              Proactive Protection
            </p>
          </div>
        </div>
        <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
          To stop what others miss by bridging deep adversary emulation with continuous defensive hardening, turning vulnerability exposure into evidenced, measurable resilience for the people and systems that cannot afford to fail.
        </p>
      </div>
    </div>
  );
}

const TEAM_MEMBERS = [
  {
    name: "AMITKUMAR MORE",
    role: "Founder & Chief Executive Officer",
    image: amitUrl,
    linkedin: "https://www.linkedin.com/",
    bio: "Amitkumar leads Envista Cyber Defence with extensive executive leadership in cybersecurity, threat intelligence, and digital risk governance. He has spearheaded critical infrastructure protection and strategic resilience programs for high-stakes enterprise and government clients across India and globally.",
  },
  {
    name: "RAHUL VERMA",
    role: "Co-Founder & Chief Technology Officer",
    image: ctoUrl,
    linkedin: "https://www.linkedin.com/",
    bio: "Rahul spearheads our offensive security research, adversary emulation, and technical architecture. With over 15+ years across cloud security, penetration testing, and zero-day research, he architects robust security postures that outmaneuver modern threat actors.",
  },
  {
    name: "DEVENDRA SINGH",
    role: "Co-Founder & Head of Strategy",
    image: strategyUrl,
    linkedin: "https://www.linkedin.com/",
    bio: "Devendra leads strategic cyber advisory, BFSI compliance, and managed security operations. He has spent 16+ years building agile cyber defense frameworks, incident response runbooks, and risk governance models across enterprise banking and fintech sectors.",
  },
];

export default function About() {
  return (
    <>
      {/* Hero Section with Who We Are, Our Vision, Our Mission */}
      <section className={`${WRAP} pt-36 pb-20 lg:pt-44 lg:pb-24`}>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Kicker n="05">About Envista</Kicker>
            <h1 className="mt-6 display-xl">
              <RevealText text="A cyber defence practice for organizations, individuals and governments." stagger={45} />
            </h1>
            <Reveal delay={250}>
              <p className="lead mt-8">
                Envista Cyber Defence exists to stop what others miss. We unify offensive rigour,
                defensive discipline and compliance-first governance into a single, accountable
                practice — protecting the people and institutions that cannot afford to be breached.
              </p>
              <p className="lead mt-4">
                As the attack surface expands, so does the ground an adversary can reach. Our work
                is to see it in full, test it honestly, and harden it where the blast radius is
                greatest.
              </p>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <MissionVisionPanel />
          </Reveal>
        </div>
      </section>

      {/* Our Team Section — styled like CyberNX reference cards */}
      <section className="border-t border-slate-200/80 bg-slate-50/60 py-20 transition-colors duration-300 dark:border-white/10 dark:bg-[#0c0e1a] lg:py-28">
        <div className={WRAP}>
          <div className="text-center">
            <Kicker n="06" tone="light">Leadership</Kicker>
            <h2 className="mt-4 font-display text-[32px] font-bold tracking-tight text-[#0d1020] dark:text-white sm:text-[38px] lg:text-[44px]">
              <RevealText text="Our Team" />
            </h2>
            <Reveal delay={120}>
              <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                The cybersecurity specialists, researchers, and strategists engineering relentless protection for modern organizations.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.map((member, i) => (
              <Reveal key={member.name} delay={i * 120}>
                <div className="group relative flex h-full flex-col items-center rounded-2xl border border-slate-200/90 bg-white p-8 text-center shadow-[0_4px_25px_-5px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#111425] dark:shadow-none dark:hover:border-violet-500/30">
                  {/* Avatar Photo */}
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-36 w-36 rounded-full object-cover object-[center_18%] border-4 border-slate-100 shadow-sm transition-transform duration-300 group-hover:scale-105 dark:border-white/10"
                      draggable={false}
                    />
                  </div>

                  {/* Name & LinkedIn Badge */}
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="font-display text-[17px] font-extrabold uppercase tracking-wide text-[#0d1020] dark:text-white sm:text-[18px]">
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
                  <p className="mt-1.5 text-[14px] font-medium text-slate-600 dark:text-slate-400">
                    {member.role}
                  </p>

                  {/* Bio */}
                  <p className="mt-5 text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
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
        <div className={`${WRAP} py-24`}>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="lg:max-w-sm">
              <Kicker n="07" tone="light">Compliance</Kicker>
              <h2 className="mt-6 display-lg text-[color:var(--color-paper-fg)]">
                <RevealText text="Aligned to the frameworks that matter." />
              </h2>
              <p className="paper-muted mt-5 text-sm leading-relaxed">
                We operate inside the standards our clients answer to — turning compliance from a
                checkbox into continuously evidenced advantage.
              </p>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-px sm:grid-cols-3 lg:max-w-2xl" style={{ background: "var(--color-paper-line)" }}>
              {COMPLIANCE.map((c, i) => (
                <Reveal key={c} delay={i * 60}>
                  <div className="flex items-center justify-center bg-white px-4 py-10 font-mono text-[13px] tracking-[0.14em] text-[color:var(--color-paper-fg)] transition-colors hover:text-purple-deep">
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
