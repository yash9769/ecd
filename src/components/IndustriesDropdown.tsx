import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, CaretDown, ShieldCheck } from "@phosphor-icons/react";
import { INDUSTRIES } from "../data";

export function IndustriesDropdownTrigger({
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
      <span>Industries</span>
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

export default function IndustriesDropdown({
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
      aria-label="Industries Navigation"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute inset-x-0 top-full z-50 border-b border-slate-200/90 bg-white/98 shadow-[0_25px_60px_-15px_rgba(79,70,229,0.12),0_4px_16px_rgba(0,0,0,0.04)] backdrop-blur-2xl transition-all duration-200 dark:border-violet-500/25 dark:bg-[#0c0e1c]/98 dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_35px_rgba(124,58,237,0.12)] animate-in fade-in slide-in-from-top-2"
    >
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#6d28d9] to-transparent opacity-80 dark:via-[#a78bfa]" />

      <div className="mx-auto max-w-[1320px] px-6 py-8 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-5 mb-6 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-5 items-center rounded-full bg-[#6d28d9] px-2 text-[10px] font-bold uppercase tracking-wider text-white">
                SPECIALIZED COVERAGE
              </span>
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#6d28d9] dark:text-[#a78bfa]">
                SECTOR ARCHITECTURE
              </span>
            </div>
            <h3 className="font-display text-[20px] sm:text-[22px] font-bold tracking-[-0.01em] text-[#0d1020] dark:text-white mt-1.5">
              Envista for Regulated &amp; Enterprise Industries
            </h3>
            <p className="mt-0.5 text-[13px] text-[#575f75] dark:text-slate-400">
              Cyber defence architectures tuned for statutory compliance, operational technology, and data sovereignty.
            </p>
          </div>

          <Link
            to="/industries"
            onClick={onClose}
            className="group inline-flex items-center gap-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-[#6d28d9] hover:underline dark:text-[#a78bfa] shrink-0"
          >
            <span>See All Industries</span>
            <ArrowRight size={13} weight="bold" className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4-Column Grid of 11 Industries */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((ind) => (
            <Link
              key={ind.name}
              to={`/industries#${ind.slug}`}
              onClick={onClose}
              className="group flex flex-col rounded-xl p-3 transition-colors hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent hover:border-slate-200/60 dark:hover:border-white/10"
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

        {/* Bottom Banner */}
        <div className="mt-6 pt-5 border-t border-slate-200/70 dark:border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#575f75] dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#6d28d9] dark:text-[#a78bfa]" />
            <span>Need tailored compliance mapping for RBI, SEBI, HIPAA, CERT-In, or DPDP Act?</span>
          </div>
          <Link
            to="/contact"
            onClick={onClose}
            className="font-semibold text-[#6d28d9] hover:underline dark:text-[#c4b5fd] shrink-0"
          >
            Schedule Industry Consultation →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function MobileIndustriesAccordion({ onItemClick }: { onItemClick: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-slate-200/60 pb-2 dark:border-white/10">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center justify-between py-2.5 text-sm font-semibold text-[#0d1020] dark:text-white"
      >
        <span>Industries</span>
        <CaretDown
          size={14}
          className={`transition-transform duration-200 ${expanded ? "rotate-180 text-[#6d28d9] dark:text-[#a78bfa]" : ""}`}
        />
      </button>

      {expanded && (
        <div className="space-y-3 pl-3 pt-2 pb-3">
          <Link
            to="/industries"
            onClick={onItemClick}
            className="block text-[12px] font-bold text-[#6d28d9] dark:text-[#a78bfa]"
          >
            Explore All 11 Industries →
          </Link>
          <div className="grid grid-cols-1 gap-2 pl-2 border-l border-slate-200 dark:border-white/10">
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind.name}
                to={`/industries#${ind.slug}`}
                onClick={onItemClick}
                className="block py-1 text-[12px] text-slate-600 hover:text-[#0d1020] dark:text-slate-300 dark:hover:text-white"
              >
                <div className="font-semibold">{ind.name}</div>
                <div className="text-[11px] text-slate-400">{ind.promise}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
