import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, CaretDown, CaretRight, ShieldCheck } from "@phosphor-icons/react";
import { INDUSTRIES } from "../data";

export function SolutionsDropdownTrigger({
  isOpen,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  isOpen: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-expanded={isOpen}
      aria-haspopup="true"
      className={`group inline-flex items-center gap-1.5 text-[13px] font-medium transition-all ${
        isOpen
          ? "text-[#6d28d9] dark:text-[#a78bfa] font-semibold"
          : "text-[#575f75] hover:text-[#0d1020] dark:text-slate-400 dark:hover:text-white"
      }`}
    >
      <span>Solutions</span>
      <CaretDown
        size={13}
        weight="bold"
        className={`transition-transform duration-200 ${
          isOpen ? "rotate-180 text-[#6d28d9] dark:text-[#a78bfa]" : "group-hover:translate-y-0.5"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}

type SolutionTab = "industries" | "transformation" | "protection" | "operations";

const TABS: { id: SolutionTab; label: string }[] = [
  { id: "industries", label: "For Industries" },
  { id: "transformation", label: "For Business Transformation" },
  { id: "protection", label: "For Threat Protection" },
  { id: "operations", label: "For Security Operations" },
];

export default function SolutionsDropdown({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<SolutionTab>("transformation");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Solutions Navigation"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute inset-x-0 top-full z-50 border-b border-slate-200/90 bg-white/98 shadow-[0_25px_60px_-15px_rgba(79,70,229,0.12),0_4px_16px_rgba(0,0,0,0.04)] backdrop-blur-2xl transition-all duration-200 dark:border-violet-500/25 dark:bg-[#0c0e1c]/98 dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_35px_rgba(124,58,237,0.12)] animate-in fade-in slide-in-from-top-2"
    >
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#6d28d9] to-transparent opacity-80 dark:via-[#a78bfa]" />

      <div className="mx-auto max-w-[1320px] px-6 py-8 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Sidebar Tabs matching SentinelOne reference */}
          <div className="lg:col-span-3 border-b border-slate-200/80 pb-6 dark:border-white/10 lg:border-b-0 lg:border-r lg:pr-8">
            <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#575f75] dark:text-slate-400 mb-4">
              SOLUTIONS &amp; USE CASES
            </div>
            
            <nav className="flex flex-col gap-1">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    onMouseEnter={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-left text-[13.5px] transition-all cursor-pointer ${
                      isActive
                        ? "bg-slate-100 font-semibold text-[#0d1020] shadow-xs dark:bg-white/10 dark:text-white"
                        : "font-medium text-[#575f75] hover:bg-slate-50 hover:text-[#0d1020] dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <CaretRight
                      size={14}
                      weight="bold"
                      className={`transition-all ${
                        isActive
                          ? "translate-x-0.5 text-[#6d28d9] dark:text-[#a78bfa]"
                          : "text-slate-400 opacity-60"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            <div className="mt-10 pt-5 border-t border-slate-200/70 dark:border-white/10">
              <Link
                to="/solutions/brm-dwm"
                onClick={onClose}
                className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#0d1020] hover:text-[#6d28d9] dark:text-white dark:hover:text-[#a78bfa] transition-colors"
              >
                <span className="underline decoration-slate-300 underline-offset-4 group-hover:decoration-[#6d28d9] dark:decoration-slate-600">
                  See all solutions
                </span>
                <ArrowRight size={13} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Panel matching SentinelOne reference */}
          <div className="lg:col-span-9">
            {/* 1. For Business Transformation (Screenshots 1 & 2) */}
            {activeTab === "transformation" && (
              <div className="animate-in fade-in duration-150">
                {/* Hero Card */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-slate-200/90 bg-[#fafafc] p-6 sm:p-7 shadow-xs dark:border-white/10 dark:bg-[#13172e]/60">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.01em] text-[#0d1020] dark:text-white">
                      Secure Your Business Growth
                    </h3>
                    <p className="mt-1 text-sm text-[#575f75] dark:text-slate-300">
                      Accelerate Change, Innovate Safely, and Defend Your Priorities.
                    </p>
                  </div>
                  <Link
                    to="/capabilities"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#6d28d9] dark:bg-white dark:text-black dark:hover:bg-[#a78bfa] dark:hover:text-black shrink-0"
                  >
                    <span>Learn More</span>
                    <ArrowRight size={13} weight="bold" />
                  </Link>
                </div>

                {/* 3 Columns Sub-items */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <Link
                    to="/capabilities"
                    onClick={onClose}
                    className="group block"
                  >
                    <h4 className="font-display text-[15px] font-bold text-[#0d1020] transition-colors group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#a78bfa]">
                      Cut Costs and Consolidate Tools
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#575f75] dark:text-slate-400">
                      Retire Point Tools. Cut Cost. Increase Coverage.
                    </p>
                  </Link>

                  <Link
                    to="/capabilities"
                    onClick={onClose}
                    className="group block"
                  >
                    <h4 className="font-display text-[15px] font-bold text-[#0d1020] transition-colors group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#a78bfa]">
                      Secure Business Transformation
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#575f75] dark:text-slate-400">
                      Secure and Simplify M&amp;A, Cloud Migration, and AI Rollout.
                    </p>
                  </Link>

                  <Link
                    to="/capabilities"
                    onClick={onClose}
                    className="group block"
                  >
                    <h4 className="font-display text-[15px] font-bold text-[#0d1020] transition-colors group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#a78bfa]">
                      Achieve Compliance Faster
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#575f75] dark:text-slate-400">
                      Stay Ready. Simplify Reporting. Prove Compliance.
                    </p>
                  </Link>
                </div>
              </div>
            )}

            {/* 2. For Threat Protection (Screenshot 3) */}
            {activeTab === "protection" && (
              <div className="animate-in fade-in duration-150">
                {/* Hero Card */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-slate-200/90 bg-[#fafafc] p-6 sm:p-7 shadow-xs dark:border-white/10 dark:bg-[#13172e]/60">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.01em] text-[#0d1020] dark:text-white">
                      Secure Every Attack Surface
                    </h3>
                    <p className="mt-1 text-sm text-[#575f75] dark:text-slate-300">
                      Reduce Risk, Mitigate, and Recover from Attacks Faster.
                    </p>
                  </div>
                  <Link
                    to="/solutions/brm-dwm"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#6d28d9] dark:bg-white dark:text-black dark:hover:bg-[#a78bfa] dark:hover:text-black shrink-0"
                  >
                    <span>Learn More</span>
                    <ArrowRight size={13} weight="bold" />
                  </Link>
                </div>

                {/* 4 Columns Sub-items */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Link
                    to="/capabilities#defensive"
                    onClick={onClose}
                    className="group block"
                  >
                    <h4 className="font-display text-[15px] font-bold text-[#0d1020] transition-colors group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#a78bfa]">
                      Protect Users and Endpoints
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#575f75] dark:text-slate-400">
                      Secure Every User, Endpoint, and Identity.
                    </p>
                  </Link>

                  <Link
                    to="/capabilities#offensive"
                    onClick={onClose}
                    className="group block"
                  >
                    <h4 className="font-display text-[15px] font-bold text-[#0d1020] transition-colors group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#a78bfa]">
                      Secure AI, Apps, and Data
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#575f75] dark:text-slate-400">
                      Secure AI Tools, App Workloads, and Sensitive Data.
                    </p>
                  </Link>

                  <Link
                    to="/capabilities#defensive"
                    onClick={onClose}
                    className="group block"
                  >
                    <h4 className="font-display text-[15px] font-bold text-[#0d1020] transition-colors group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#a78bfa]">
                      Defend Hybrid and Cloud Environments
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#575f75] dark:text-slate-400">
                      Unify Defense Across Cloud and Hybrid Surfaces.
                    </p>
                  </Link>

                  <Link
                    to="/capabilities#defensive"
                    onClick={onClose}
                    className="group block"
                  >
                    <h4 className="font-display text-[15px] font-bold text-[#0d1020] transition-colors group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#a78bfa]">
                      Secure On-Prem and Legacy Systems
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#575f75] dark:text-slate-400">
                      AI-Powered Protection for Air-Gapped, Sovereign, and Hybrid Systems.
                    </p>
                  </Link>
                </div>

                {/* High-visibility feature callout for Brand Risk Monitoring & Dark Web Monitoring */}
                <div className="mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-[#e4dfef] bg-gradient-to-r from-[#fbf8fe] via-white to-[#f5effb] p-4 shadow-xs dark:border-violet-500/25 dark:bg-[#160e33]">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-6 items-center rounded-md bg-[#6d28d9] px-2 text-[10px] font-bold uppercase tracking-wider text-white">
                      SPECIALIZED SOLUTION
                    </span>
                    <span className="text-xs font-semibold text-[#150c2e] dark:text-white">
                      Brand Risk Monitoring (BRM) &amp; Dark Web Monitoring (DWM) Services
                    </span>
                  </div>
                  <Link
                    to="/solutions/brm-dwm"
                    onClick={onClose}
                    className="inline-flex items-center gap-1 font-mono text-[11.5px] font-bold text-[#6d28d9] hover:underline dark:text-[#c4b5fd]"
                  >
                    <span>View Dedicated Page</span>
                    <ArrowRight size={13} weight="bold" />
                  </Link>
                </div>
              </div>
            )}

            {/* 3. For Security Operations (Screenshot 4) */}
            {activeTab === "operations" && (
              <div className="animate-in fade-in duration-150">
                {/* Hero Card */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-slate-200/90 bg-[#fafafc] p-6 sm:p-7 shadow-xs dark:border-white/10 dark:bg-[#13172e]/60">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.01em] text-[#0d1020] dark:text-white">
                      Optimize Security Operations
                    </h3>
                    <p className="mt-1 text-sm text-[#575f75] dark:text-slate-300">
                      Maximize Efficiency and Effectiveness.
                    </p>
                  </div>
                  <Link
                    to="/capabilities"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#6d28d9] dark:bg-white dark:text-black dark:hover:bg-[#a78bfa] dark:hover:text-black shrink-0"
                  >
                    <span>Learn More</span>
                    <ArrowRight size={13} weight="bold" />
                  </Link>
                </div>

                {/* 3 Columns Sub-items */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <Link
                    to="/capabilities#soc"
                    onClick={onClose}
                    className="group block"
                  >
                    <h4 className="font-display text-[15px] font-bold text-[#0d1020] transition-colors group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#a78bfa]">
                      Unify All Data, Tools, and Intelligence
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#575f75] dark:text-slate-400">
                      Consolidate Data, Tooling, and Intel for the Autonomous SOC.
                    </p>
                  </Link>

                  <Link
                    to="/capabilities#soc"
                    onClick={onClose}
                    className="group block"
                  >
                    <h4 className="font-display text-[15px] font-bold text-[#0d1020] transition-colors group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#a78bfa]">
                      Detect, Investigate, and Respond with AI
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#575f75] dark:text-slate-400">
                      Triage, Investigate, and Respond in Natural Language.
                    </p>
                  </Link>

                  <Link
                    to="/capabilities#soc"
                    onClick={onClose}
                    className="group block"
                  >
                    <h4 className="font-display text-[15px] font-bold text-[#0d1020] transition-colors group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#a78bfa]">
                      Alleviate Analyst Workload
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#575f75] dark:text-slate-400">
                      Automate Tier-1 Triage. Free Analysts for Real Work.
                    </p>
                  </Link>
                </div>
              </div>
            )}

            {/* 4. For Industries */}
            {activeTab === "industries" && (
              <div className="animate-in fade-in duration-150">
                {/* Hero Card */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-slate-200/90 bg-[#fafafc] p-6 sm:p-7 shadow-xs dark:border-white/10 dark:bg-[#13172e]/60">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.01em] text-[#0d1020] dark:text-white">
                      Envista for Industries
                    </h3>
                    <p className="mt-1 text-sm text-[#575f75] dark:text-slate-300">
                      Security Tuned for Your Industry.
                    </p>
                  </div>
                  <Link
                    to="/industries"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#6d28d9] dark:bg-white dark:text-black dark:hover:bg-[#a78bfa] dark:hover:text-black shrink-0"
                  >
                    <span>See All Industries</span>
                    <ArrowRight size={13} weight="bold" />
                  </Link>
                </div>

                {/* 4-Column Grid of 11 Industries */}
                <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
                  {INDUSTRIES.map((ind) => (
                    <Link
                      key={ind.name}
                      to={`/industries#${ind.slug}`}
                      onClick={onClose}
                      className="group flex flex-col rounded-xl p-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
                    >
                      <h4 className="font-display text-[13.5px] font-bold leading-snug text-[#0d1020] transition-colors group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#c4b5fd]">
                        {ind.name}
                      </h4>
                      <p className="mt-1 text-[11.5px] leading-snug text-slate-500 dark:text-slate-400 line-clamp-2">
                        {ind.promise}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileSolutionsAccordion({ onItemClick }: { onItemClick: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<SolutionTab>("transformation");

  return (
    <div className="border-b border-slate-200/60 pb-2 dark:border-white/10">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center justify-between py-2.5 text-sm font-semibold text-[#0d1020] dark:text-white"
      >
        <span>Solutions</span>
        <CaretDown
          size={14}
          className={`transition-transform duration-200 ${expanded ? "rotate-180 text-[#6d28d9] dark:text-[#a78bfa]" : ""}`}
        />
      </button>

      {expanded && (
        <div className="space-y-4 pl-3 pt-2 pb-3">
          <Link
            to="/solutions/brm-dwm"
            onClick={onItemClick}
            className="block text-[12px] font-bold text-[#6d28d9] dark:text-[#a78bfa]"
          >
            Brand Risk &amp; Dark Web Monitoring →
          </Link>

          {/* Quick Tab Selector for Mobile */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSection(tab.id)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
                  activeSection === tab.id
                    ? "bg-[#6d28d9] text-white"
                    : "bg-slate-100 text-[#575f75] dark:bg-white/10 dark:text-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="pt-2 pl-1 border-l-2 border-slate-200 dark:border-white/10">
            {activeSection === "transformation" && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-[#0d1020] dark:text-white">
                  Secure Your Business Growth
                </div>
                <div className="space-y-2 text-[12px]">
                  <Link to="/capabilities" onClick={onItemClick} className="block text-slate-600 dark:text-slate-300">
                    <div className="font-semibold text-[#0d1020] dark:text-white">Cut Costs and Consolidate Tools</div>
                    <div className="text-[11px] text-slate-400">Retire Point Tools. Cut Cost. Increase Coverage.</div>
                  </Link>
                  <Link to="/capabilities" onClick={onItemClick} className="block text-slate-600 dark:text-slate-300">
                    <div className="font-semibold text-[#0d1020] dark:text-white">Secure Business Transformation</div>
                    <div className="text-[11px] text-slate-400">Secure and Simplify M&amp;A, Cloud Migration, and AI Rollout.</div>
                  </Link>
                  <Link to="/capabilities" onClick={onItemClick} className="block text-slate-600 dark:text-slate-300">
                    <div className="font-semibold text-[#0d1020] dark:text-white">Achieve Compliance Faster</div>
                    <div className="text-[11px] text-slate-400">Stay Ready. Simplify Reporting. Prove Compliance.</div>
                  </Link>
                </div>
              </div>
            )}

            {activeSection === "protection" && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-[#0d1020] dark:text-white">
                  Secure Every Attack Surface
                </div>
                <div className="space-y-2 text-[12px]">
                  <Link to="/capabilities#defensive" onClick={onItemClick} className="block text-slate-600 dark:text-slate-300">
                    <div className="font-semibold text-[#0d1020] dark:text-white">Protect Users and Endpoints</div>
                    <div className="text-[11px] text-slate-400">Secure Every User, Endpoint, and Identity.</div>
                  </Link>
                  <Link to="/capabilities#offensive" onClick={onItemClick} className="block text-slate-600 dark:text-slate-300">
                    <div className="font-semibold text-[#0d1020] dark:text-white">Secure AI, Apps, and Data</div>
                    <div className="text-[11px] text-slate-400">Secure AI Tools, App Workloads, and Sensitive Data.</div>
                  </Link>
                  <Link to="/capabilities#defensive" onClick={onItemClick} className="block text-slate-600 dark:text-slate-300">
                    <div className="font-semibold text-[#0d1020] dark:text-white">Defend Hybrid and Cloud Environments</div>
                    <div className="text-[11px] text-slate-400">Unify Defense Across Cloud and Hybrid Surfaces.</div>
                  </Link>
                  <Link to="/capabilities#defensive" onClick={onItemClick} className="block text-slate-600 dark:text-slate-300">
                    <div className="font-semibold text-[#0d1020] dark:text-white">Secure On-Prem and Legacy Systems</div>
                    <div className="text-[11px] text-slate-400">AI-Powered Protection for Air-Gapped, Sovereign, and Hybrid Systems.</div>
                  </Link>
                </div>
              </div>
            )}

            {activeSection === "operations" && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-[#0d1020] dark:text-white">
                  Optimize Security Operations
                </div>
                <div className="space-y-2 text-[12px]">
                  <Link to="/capabilities#soc" onClick={onItemClick} className="block text-slate-600 dark:text-slate-300">
                    <div className="font-semibold text-[#0d1020] dark:text-white">Unify All Data, Tools, and Intelligence</div>
                    <div className="text-[11px] text-slate-400">Consolidate Data, Tooling, and Intel for the Autonomous SOC.</div>
                  </Link>
                  <Link to="/capabilities#soc" onClick={onItemClick} className="block text-slate-600 dark:text-slate-300">
                    <div className="font-semibold text-[#0d1020] dark:text-white">Detect, Investigate, and Respond with AI</div>
                    <div className="text-[11px] text-slate-400">Triage, Investigate, and Respond in Natural Language.</div>
                  </Link>
                  <Link to="/capabilities#soc" onClick={onItemClick} className="block text-slate-600 dark:text-slate-300">
                    <div className="font-semibold text-[#0d1020] dark:text-white">Alleviate Analyst Workload</div>
                    <div className="text-[11px] text-slate-400">Automate Tier-1 Triage. Free Analysts for Real Work.</div>
                  </Link>
                </div>
              </div>
            )}

            {activeSection === "industries" && (
              <div className="space-y-2">
                <Link to="/industries" onClick={onItemClick} className="block text-xs font-bold text-[#6d28d9] dark:text-[#a78bfa]">
                  Explore All 11 Industries →
                </Link>
                {INDUSTRIES.slice(0, 6).map((ind) => (
                  <Link
                    key={ind.name}
                    to={`/industries#${ind.slug}`}
                    onClick={onItemClick}
                    className="block text-[12px] text-slate-600 dark:text-slate-300 py-0.5"
                  >
                    {ind.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
