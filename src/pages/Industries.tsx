import { useState } from "react";
import { Link } from "react-router";
import {
  AirplaneTakeoff,
  ArrowRight,
  Bank,
  BookOpen,
  Buildings,
  CheckCircle,
  Factory,
  GraduationCap,
  Heartbeat,
  Lightning,
  Rocket,
  ShieldCheck,
  Storefront,
  Truck,
} from "@phosphor-icons/react";
import { Btn, Eyebrow, Reveal, RevealText } from "../components/ui";
import { INDUSTRIES } from "../data";
import { CtaBand } from "./Home";

const WRAP = "mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8";

const SECTOR_ICONS: Record<string, typeof Heartbeat> = {
  healthcare: Heartbeat,
  "financial-services": Bank,
  "federal-government": ShieldCheck,
  manufacturing: Factory,
  energy: Lightning,
  "transportation-logistics": Truck,
  "higher-education": GraduationCap,
  "k12-education": BookOpen,
  "retail-hospitality": Storefront,
  "smb-startups": Rocket,
  "state-local-government": Buildings,
};

const SECTOR_COMPLIANCE: Record<string, string[]> = {
  healthcare: ["HIPAA", "DPDP Act", "ISO 27799"],
  "financial-services": ["RBI / SEBI CSCRF", "SOC 2", "PCI-DSS"],
  "federal-government": ["Zero Trust", "Sovereign Cloud", "CERT-In"],
  manufacturing: ["IEC 62443", "Purdue Model", "NIST CSF"],
  energy: ["NERC CIP", "SCADA Hardening", "CEA Grid Guidelines"],
  "transportation-logistics": ["Fleet Telemetry", "Port ICS", "Supply Chain"],
  "higher-education": ["Research IP", "Campus Zero Trust", "FERPA / DPDP"],
  "k12-education": ["Student Data Privacy", "Endpoint Isolation", "Anti-Ransomware"],
  "retail-hospitality": ["PCI-DSS 4.0", "POS Hardening", "Loyalty Shield"],
  "smb-startups": ["Virtual CISO", "Cloud Posture", "ISO 27001 FastTrack"],
  "state-local-government": ["Public Utilities", "Citizen Records", "Municipal SecOps"],
};

export default function Industries() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredIndustries =
    activeFilter === "all"
      ? INDUSTRIES
      : INDUSTRIES.filter((ind) => {
          if (activeFilter === "critical") {
            return ["energy", "manufacturing", "transportation-logistics", "federal-government"].includes(ind.slug);
          }
          if (activeFilter === "regulated") {
            return ["financial-services", "healthcare", "state-local-government"].includes(ind.slug);
          }
          if (activeFilter === "commercial") {
            return ["retail-hospitality", "smb-startups", "higher-education", "k12-education"].includes(ind.slug);
          }
          return true;
        });

  return (
    <>
      {/* SECTION 1: HERO (PURPLE) */}
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
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#c4b5fd] shadow-xs backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
              <span className="font-mono text-[10.5px] uppercase tracking-wider">SOLUTIONS &amp; USE CASES</span>
            </div>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.12]">
              <RevealText text="Envista for Industries." stagger={50} />
            </h1>
            <p className="mt-1.5 text-base sm:text-lg font-semibold text-white/90">
              Security Tuned for Your Industry.
            </p>
            <Reveal delay={180}>
              <p className="mt-3 text-xs sm:text-sm text-[#d8cefa] leading-relaxed">
                Every sector operates under distinct threat vectors, specialized infrastructures, and stringent
                regulatory mandates. Envista engineers mission-tailored cyber defense and DPDP compliance
                built around how your business operates.
              </p>
            </Reveal>

            {/* Category Quick Filter Pills */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "All 11 Industries" },
                { id: "regulated", label: "Financial & Health" },
                { id: "critical", label: "Critical Infrastructure & OT" },
                { id: "commercial", label: "Commercial & Education" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setActiveFilter(pill.id)}
                  className={`rounded-full px-3 py-1 text-[11px] sm:px-3.5 sm:py-1.5 sm:text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activeFilter === pill.id
                      ? "bg-violet-600 text-white shadow-md shadow-violet-500/30 ring-1 ring-white/30"
                      : "border border-white/15 bg-white/10 text-[#d8cefa] hover:border-violet-400/50 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INDUSTRIES GRID (WHITE) */}
      <section className="border-t border-slate-200/80 bg-white py-10 sm:py-12 lg:py-16 transition-colors duration-300 dark:border-white/10 dark:bg-[#0c0e1a]">
        <div className={WRAP}>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end mb-8">
            <div>
              <Eyebrow tone="light">Tailored Defense</Eyebrow>
              <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-[#150c2e] dark:text-white sm:text-3xl lg:text-[34px]">
                Sector-Specific Cybersecurity Programs
              </h2>
            </div>
            <p className="text-xs font-mono text-[#6d28d9] dark:text-[#a78bfa] font-bold">
              Showing {filteredIndustries.length} of {INDUSTRIES.length} Sectors
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
            {filteredIndustries.map((ind, i) => {
              const Icon = SECTOR_ICONS[ind.slug] || ShieldCheck;
              const complianceTags = SECTOR_COMPLIANCE[ind.slug] || ["DPDP Act", "ISO 27001"];

              return (
                <li key={ind.slug}>
                  <Reveal delay={(i % 3) * 60} className="h-full">
                    <div
                      className="group flex h-full flex-col justify-between rounded-xl sm:rounded-2xl border border-[#e4dfef] bg-white p-5 sm:p-5.5 shadow-[0_4px_20px_rgba(91,42,184,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#6d28d9] hover:shadow-[0_14px_32px_rgba(91,42,184,0.12)] dark:border-white/10 dark:bg-[#14182b] dark:hover:border-violet-500/50 dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                    >
                      <div>
                        {/* Top Icon Badge & Arrow */}
                        <div className="flex items-center justify-between">
                          <span
                            aria-hidden="true"
                            className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/10 text-[#6d28d9] transition-transform duration-300 group-hover:scale-110 dark:bg-violet-500/20 dark:text-[#a78bfa]"
                          >
                            <Icon size={24} weight="bold" />
                          </span>

                          <span
                            aria-hidden="true"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#e4dfef] text-[#8890a4] transition-all duration-200 group-hover:border-[#6d28d9] group-hover:bg-[#6d28d9] group-hover:text-white dark:border-white/15 dark:text-slate-400 dark:group-hover:border-violet-400 dark:group-hover:bg-violet-600 dark:group-hover:text-white"
                          >
                            <ArrowRight size={14} weight="bold" />
                          </span>
                        </div>

                        {/* Title & Action Promise */}
                        <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.01em] text-[#150c2e] dark:text-white">
                          {ind.name}
                        </h3>
                        <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-[#6d28d9] dark:text-[#c4b5fd]">
                          {ind.promise}
                        </p>

                        {/* Sector Description */}
                        <p className="mt-3.5 text-[13.5px] leading-relaxed text-[#575f75] dark:text-slate-300">
                          {ind.d}
                        </p>
                      </div>

                      {/* Compliance Tags & CTA link */}
                      <div className="mt-6 pt-5 border-t border-[#f0ebf8] dark:border-white/10">
                        <div className="flex flex-wrap gap-1.5">
                          {complianceTags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-[#f6eefb] px-2.5 py-1 font-mono text-[10.5px] font-semibold text-[#5a3470] dark:bg-violet-950/40 dark:text-[#c4b5fd]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <Link
                          to="/contact"
                          className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#6d28d9] hover:text-[#5b2ab8] dark:text-[#a78bfa] dark:hover:text-[#c4b5fd]"
                        >
                          Request Sector Assessment
                          <ArrowRight size={13} weight="bold" />
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* SECTION 3: WHY INDUSTRY-FOCUSED DEFENCE MATTERS (PURPLE) */}
      <section className="relative overflow-hidden bg-[#150a2e] text-white py-10 sm:py-12 transition-colors duration-300 dark:bg-[#0c061e] lg:py-16">
        <div className={WRAP}>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#c4b5fd] shadow-xs backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
              <span className="font-mono text-[10.5px] uppercase tracking-wider">The Envista Advantage</span>
            </div>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-[34px]">
              Why Industry Alignment Changes Outcomes
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#d8cefa] leading-relaxed">
              Generic cybersecurity checklists leave blind spots in sector-specific architectures.
              We combine deep domain regulatory mastery with targeted threat emulation.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {[
              {
                title: "Threat Actor Profiling",
                desc: "We track adversaries actively targeting your industry vertical, replicating real-world nation-state or ransomware campaigns before they strike.",
              },
              {
                title: "Mandate-Aligned Governance",
                desc: "DPDP Act, HIPAA, SEBI CSCRF, ISO 27001 and IEC 62443 mappings are embedded directly into your technical architecture, turning audits into routine proofs.",
              },
              {
                title: "Zero Operational Downtime",
                desc: "Offensive assessments and defense monitoring designed specifically for production OT networks, hospital telemetry, and high-velocity financial exchanges without disruption.",
              },
            ].map((col, idx) => (
              <div
                key={col.title}
                className="rounded-xl sm:rounded-2xl border border-white/12 bg-white/[0.06] p-5 sm:p-5.5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-violet-400/50 hover:bg-white/[0.1]"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/20 text-[#c4b5fd] font-mono font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-white">
                  {col.title}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-[#d8cefa]">
                  {col.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CTA BAND (DEEP PURPLE) */}
      <CtaBand />
    </>
  );
}
