import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  ArrowSquareOut,
  Broadcast,
  CaretDown,
  Eye,
  Globe,
  LockKey,
  ShieldCheck,
  Sparkle,
} from "@phosphor-icons/react";

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
      className={`group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-all duration-200 cursor-pointer ${
        isOpen
          ? "bg-violet-600/10 text-violet-700 font-semibold ring-1 ring-violet-500/25 dark:bg-violet-500/20 dark:text-[#c4b5fd] dark:ring-violet-400/30"
          : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
      }`}
    >
      <span>Solutions</span>
      <CaretDown
        size={13}
        weight="bold"
        className={`transition-transform duration-200 ${
          isOpen ? "rotate-180 text-violet-600 dark:text-[#a78bfa]" : "opacity-60 group-hover:translate-y-0.5 group-hover:opacity-100"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}

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
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
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
      className="pointer-events-auto absolute inset-x-0 top-[calc(100%+0.5rem)] z-50 rounded-[32px] overflow-hidden border border-slate-200 bg-white shadow-2xl transition-all duration-200 dark:border-slate-800 dark:bg-[#0c0e1c] animate-in fade-in slide-in-from-top-2 before:absolute before:-top-4 before:inset-x-0 before:h-4 before:content-['']"
    >
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#6d28d9] to-transparent opacity-80 dark:via-[#a78bfa]" />

      <div className="mx-auto max-w-[1320px] px-6 py-8 lg:px-10">
        <div className="border-b border-slate-200/80 pb-5 mb-6 dark:border-white/10">
          <h3 className="font-display text-[20px] sm:text-[22px] font-bold tracking-[-0.01em] text-[#0d1020] dark:text-white">
            Specialized Enterprise Solutions
          </h3>
          <p className="mt-1 text-[13px] text-[#575f75] dark:text-slate-400">
            Dedicated compliance ecosystems and autonomous threat reconnaissance platforms.
          </p>
        </div>

        {/* Two Featured Solutions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. DPDP Compliance & Privacy */}
          <a
            href="https://envistadpdp.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-gradient-to-br from-violet-50/40 via-white to-slate-50/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#6d28d9] hover:shadow-xl hover:shadow-violet-500/10 dark:border-white/10 dark:bg-gradient-to-br dark:from-white/5 dark:via-transparent dark:to-white/5 dark:hover:border-violet-500/50 dark:hover:bg-[#160f33]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600/10 text-[#6d28d9] transition-all duration-200 group-hover:scale-105 group-hover:bg-[#6d28d9] group-hover:text-white dark:bg-violet-500/20 dark:text-[#c4b5fd]">
                  <LockKey size={22} weight="bold" />
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#6d28d9] dark:bg-violet-900/40 dark:text-violet-300">
                  <Sparkle size={12} weight="fill" />
                  DPDP 2023 Dedicated Suite
                </span>
              </div>

              <h4 className="mt-5 font-display text-[18px] font-bold text-[#0d1020] transition-colors group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#c4b5fd]">
                DPDP Compliance &amp; Data Privacy Solutions
              </h4>

              <p className="mt-2 text-[13px] leading-relaxed text-[#575f75] dark:text-slate-300">
                End-to-end statutory compliance, digital personal data protection audits, Consent Manager architecture, Data Protection Officer (DPO) advisory, and penalty mitigation framework under the Digital Personal Data Protection Act.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between">
              <span className="font-mono text-[12px] font-bold uppercase tracking-wider text-[#6d28d9] dark:text-[#c4b5fd] group-hover:underline inline-flex items-center gap-1.5">
                <span>Visit envistadpdp.com</span>
                <ArrowSquareOut size={14} weight="bold" />
              </span>
              <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
                Official Portal
              </span>
            </div>
          </a>

          {/* 2. Brand Risk Monitoring (BRM) & Dark Web Monitoring (DWM) Services */}
          <Link
            to="/solutions/brm-dwm"
            onClick={onClose}
            className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-gradient-to-br from-indigo-50/40 via-white to-slate-50/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-white/10 dark:bg-gradient-to-br dark:from-white/5 dark:via-transparent dark:to-white/5 dark:hover:border-indigo-500/50 dark:hover:bg-[#110f2c]"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600 transition-all duration-200 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-500/20 dark:text-[#a5b4fc]">
                  <Globe size={22} weight="bold" />
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                  <Broadcast size={12} weight="bold" />
                  Outside-In Reconnaissance
                </span>
              </div>

              <h4 className="mt-5 font-display text-[18px] font-bold text-[#0d1020] transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-[#a5b4fc]">
                Brand Risk Monitoring (BRM) &amp; Dark Web Monitoring (DWM) Services
              </h4>

              <p className="mt-2 text-[13px] leading-relaxed text-[#575f75] dark:text-slate-300">
                Continuous perimeter surveillance, darknet credential harvesting detection, automated typosquatting takedown enforcement, leaked database reconnaissance, and executive identity defense.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between">
              <span className="font-mono text-[12px] font-bold uppercase tracking-wider text-indigo-600 dark:text-[#a5b4fc] group-hover:underline inline-flex items-center gap-1.5">
                <span>Explore BRM &amp; DWM Solution</span>
                <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </span>
              <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
                Platform Solution
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function MobileSolutionsAccordion({ onItemClick }: { onItemClick: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-slate-200/60 pb-2 dark:border-white/10">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center justify-between py-2.5 text-sm font-semibold text-[#0d1020] dark:text-white cursor-pointer"
      >
        <span>Solutions</span>
        <CaretDown
          size={14}
          className={`transition-transform duration-200 ${expanded ? "rotate-180 text-[#6d28d9] dark:text-[#a78bfa]" : ""}`}
        />
      </button>

      {expanded && (
        <div className="space-y-3 pl-3 pt-2 pb-3">
          <div className="grid grid-cols-1 gap-3 pl-2 border-l-2 border-violet-500/30">
            {/* DPDP */}
            <a
              href="https://envistadpdp.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onItemClick}
              className="block rounded-xl bg-violet-50/70 p-3 text-[13px] transition-colors hover:bg-violet-100 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <div className="flex items-center justify-between font-bold text-[#6d28d9] dark:text-[#c4b5fd]">
                <span>DPDP Compliance &amp; Data Privacy</span>
                <ArrowSquareOut size={13} />
              </div>
              <div className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">
                Visit envistadpdp.com portal →
              </div>
            </a>

            {/* BRM & DWM */}
            <Link
              to="/solutions/brm-dwm"
              onClick={onItemClick}
              className="block rounded-xl bg-slate-50 p-3 text-[13px] transition-colors hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <div className="flex items-center justify-between font-bold text-[#0d1020] dark:text-white">
                <span>Brand Risk Monitoring (BRM) &amp; Dark Web Monitoring (DWM) Services</span>
                <ArrowRight size={13} />
              </div>
              <div className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">
                Autonomous outside-in surveillance →
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
