import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, CaretDown, ShieldCheck } from "@phosphor-icons/react";
import { SERVICES_MEGA_MENU } from "../data";

export function ServicesDropdownTrigger({
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
      <span>Services</span>
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

export default function ServicesDropdown({
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
      aria-label="Services Navigation"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute inset-x-0 top-full z-50 border-b border-slate-200/90 bg-white/98 shadow-[0_25px_60px_-15px_rgba(79,70,229,0.12),0_4px_16px_rgba(0,0,0,0.04)] backdrop-blur-2xl transition-all duration-200 dark:border-violet-500/25 dark:bg-[#0c0e1c]/98 dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_35px_rgba(124,58,237,0.12)] animate-in fade-in slide-in-from-top-2"
    >
      {/* Subtle top indicator bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#6d28d9] to-transparent opacity-80 dark:via-[#a78bfa]" />

      <div className="mx-auto max-w-[1280px] px-6 py-9 lg:px-10">
        {/* 5 Columns layout matching Techdefence reference */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-7">
          {SERVICES_MEGA_MENU.map((col) => (
            <div key={col.category} className="flex flex-col">
              {/* Category Header */}
              <div className="mb-3.5 border-b border-slate-200/80 pb-2.5 dark:border-white/10">
                <h3 className="font-display text-[13px] font-bold leading-snug tracking-[-0.01em] text-[#0d1020] dark:text-white">
                  {col.category}
                </h3>
              </div>

              {/* Service Items */}
              <ul className="flex flex-col gap-2">
                {col.items.map((item) => (
                  <li key={item.title}>
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className="group flex items-start text-[12.5px] leading-snug text-[#575f75] transition-all hover:translate-x-1 hover:text-[#6d28d9] dark:text-slate-300 dark:hover:text-[#c4b5fd]"
                    >
                      <span
                        className="mr-1.5 opacity-0 transition-opacity group-hover:opacity-100 text-[#6d28d9] dark:text-[#a78bfa]"
                        aria-hidden="true"
                      >
                        ›
                      </span>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Platform Capabilities Quick Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e2d5ef] bg-[#fbf9fe] px-4 py-2.5 text-xs dark:border-violet-500/25 dark:bg-[#150e2d]">
          <div className="flex items-center gap-2.5 font-medium text-[#150c2e] dark:text-white">
            <span className="rounded bg-[#6d28d9] px-2 py-0.5 font-mono text-[9.5px] font-bold text-white uppercase">Platform</span>
            <span>Looking for Outside-In Threat Intelligence &amp; Continuous Digital Risk Defense?</span>
          </div>
          <Link
            to="/capabilities#platform-hub"
            onClick={onClose}
            className="font-mono text-[11.5px] font-bold text-[#6d28d9] hover:underline dark:text-[#c4b5fd] inline-flex items-center gap-1"
          >
            <span>Explore 8 Platform Capabilities (Brand, Dark Web, EASM, Supply Chain)</span>
            <ArrowRight size={12} weight="bold" />
          </Link>
        </div>

        {/* Bottom Banner Strip */}
        <div className="mt-4 flex flex-col items-center justify-between gap-4 rounded-xl border border-violet-200/60 bg-gradient-to-r from-violet-50/70 via-white to-purple-50/70 p-4 dark:border-violet-500/20 dark:bg-gradient-to-r dark:from-[#13172e] dark:via-[#111425] dark:to-[#17142e] sm:flex-row">
          <div className="flex items-center gap-3 text-[13px] text-[#0d1020] dark:text-slate-200">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#6d28d9] text-white dark:bg-[#7c3aed]">
              <ShieldCheck size={16} weight="bold" />
            </div>
            <span>
              Unsure which security assessment fits your architecture?{" "}
              <strong className="font-semibold text-[#6d28d9] dark:text-[#a78bfa]">
                Consult our cybersecurity architects.
              </strong>
            </span>
          </div>

          <Link
            to="/contact"
            onClick={onClose}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#0d1020] px-4 py-1.5 text-[12px] font-semibold text-white transition-all hover:bg-[#6d28d9] dark:bg-white dark:text-[#0d1020] dark:hover:bg-[#c4b5fd]"
          >
            <span>Talk to an Expert</span>
            <ArrowRight size={13} weight="bold" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function MobileServicesAccordion({ onItemClick }: { onItemClick: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-slate-200/60 pb-2 dark:border-white/10">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center justify-between py-2.5 text-sm font-semibold text-[#0d1020] dark:text-white"
      >
        <span>Services</span>
        <CaretDown
          size={14}
          className={`transition-transform duration-200 ${expanded ? "rotate-180 text-[#6d28d9] dark:text-[#a78bfa]" : ""}`}
        />
      </button>

      {expanded && (
        <div className="space-y-4 pl-3 pt-2 pb-3">
          {SERVICES_MEGA_MENU.map((col) => (
            <div key={col.category} className="space-y-1.5">
              <h4 className="text-[11.5px] font-bold uppercase tracking-wider text-[#6d28d9] dark:text-[#a78bfa]">
                {col.category}
              </h4>
              <ul className="space-y-1 pl-2 border-l border-slate-200 dark:border-white/10">
                {col.items.map((item) => (
                  <li key={item.title}>
                    <Link
                      to={item.href}
                      onClick={onItemClick}
                      className="block py-1 text-[12px] text-slate-600 hover:text-[#0d1020] dark:text-slate-300 dark:hover:text-white"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

