import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  CaretDown,
  CaretRight,
  Cpu,
  Crosshair,
  GraduationCap,
  LockKey,
  Scales,
  ShieldCheck,
} from "@phosphor-icons/react";
import { CAPABILITIES } from "../data";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  offensive: <Crosshair size={17} weight="duotone" />,
  defensive: <ShieldCheck size={17} weight="duotone" />,
  grc: <Scales size={17} weight="duotone" />,
  dpdp: <LockKey size={17} weight="duotone" />,
  training: <GraduationCap size={17} weight="duotone" />,
  ai: <Cpu size={17} weight="duotone" />,
};

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
      className={`group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-all duration-200 cursor-pointer ${
        isOpen
          ? "bg-violet-600/10 text-violet-700 font-semibold ring-1 ring-violet-500/25 dark:bg-violet-500/20 dark:text-[#c4b5fd] dark:ring-violet-400/30"
          : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
      }`}
    >
      <span>Services</span>
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
      aria-label="Services Navigation"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="pointer-events-auto absolute inset-x-0 top-[calc(100%+0.5rem)] z-50 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-2xl transition-all duration-200 dark:border-slate-800 dark:bg-[#0c0e1c] animate-in fade-in slide-in-from-top-2 before:absolute before:-top-4 before:inset-x-0 before:h-4 before:content-[''] max-h-[calc(100vh-5.5rem)] overflow-y-auto"
    >
      {/* Subtle top indicator bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#6d28d9] to-transparent opacity-80 dark:via-[#a78bfa]" />

      <div className="mx-auto max-w-[1360px] px-4 py-3.5 sm:px-6 sm:py-4">
        {/* Header Eyebrow */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5 mb-3.5 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-400 animate-pulse shrink-0" />
            <span className="font-mono text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#6d28d9] dark:text-[#a78bfa]">
              CYBER SECURITY SERVICES FOR FUTURE-DRIVEN BUSINESSES
            </span>
          </div>
          <Link
            to="/capabilities"
            onClick={onClose}
            className="font-mono text-[11px] sm:text-xs font-bold text-violet-700 hover:text-violet-900 dark:text-violet-300 dark:hover:text-white inline-flex items-center gap-1 shrink-0 group"
          >
            <span>View All Services</span>
            <ArrowRight size={11} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 6 Core Services Grid — 6 columns on desktop so all 6 are visible in ONE row without cutting off */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {CAPABILITIES.map((service) => (
            <Link
              key={service.id}
              to={`/capabilities#${service.id}`}
              onClick={onClose}
              className="group relative flex flex-col justify-between rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 transition-all duration-200 hover:border-violet-500/50 hover:bg-violet-50/50 hover:shadow-sm dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-violet-400/40 dark:hover:bg-violet-950/20"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                    {SERVICE_ICONS[service.id] || <ShieldCheck size={16} weight="duotone" />}
                  </div>
                  <span className="font-mono text-[10px] font-bold text-slate-400 dark:text-slate-500">
                    #{service.n}
                  </span>
                </div>

                <h3 className="mt-2 font-display text-[13px] font-bold text-slate-900 group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-300 transition-colors leading-tight">
                  {service.title}
                </h3>

                <p className="mt-0.5 font-mono text-[9.5px] font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wide">
                  {service.promise}
                </p>

                {/* Sub-services list: all items visible at one glance */}
                <div className="mt-2 border-t border-slate-200/70 pt-2 dark:border-white/10">
                  <ul className="space-y-1 text-[10.5px] text-slate-700 dark:text-slate-300">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-1.5 leading-snug">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-600 dark:bg-[#a78bfa]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-slate-200/60 pt-2 dark:border-white/10">
                <span className="font-mono text-[9px] font-semibold text-slate-400 dark:text-slate-500 uppercase">
                  {service.items.length} Offerings
                </span>
                <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-violet-600 dark:text-violet-400 group-hover:translate-x-0.5 transition-transform">
                  <span>Explore</span>
                  <ArrowRight size={10} weight="bold" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Quick Bar with Consult an Expert button */}
        <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/80 px-4 py-2.5 dark:border-white/10 dark:bg-[#13172e]/60">
          <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet-600 text-white">
              <ShieldCheck size={14} weight="bold" />
            </div>
            <span>
              Need a tailored cybersecurity engagement?{" "}
              <strong className="font-semibold text-violet-700 dark:text-violet-300">
                Consult our senior practitioners.
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/contact"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors"
            >
              <span>Consult an Expert</span>
              <ArrowRight size={11} weight="bold" />
            </Link>
          </div>
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
        className="flex w-full items-center justify-between py-2.5 text-sm font-semibold text-[#0d1020] dark:text-white cursor-pointer"
      >
        <span>Services</span>
        <CaretDown
          size={14}
          className={`transition-transform duration-200 ${expanded ? "rotate-180 text-violet-600 dark:text-[#a78bfa]" : ""}`}
        />
      </button>

      {expanded && (
        <div className="space-y-2 pl-1 pt-1 pb-3">
          {CAPABILITIES.map((service) => (
            <div
              key={service.id}
              className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3 dark:border-white/10 dark:bg-white/[0.02]"
            >
              <Link
                to={`/capabilities#${service.id}`}
                onClick={onItemClick}
                className="flex items-center justify-between font-semibold text-slate-900 dark:text-white"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{service.title}</span>
                  <span className="font-mono text-[10px] font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wide">
                    {service.promise}
                  </span>
                </div>
                <CaretRight size={13} className="text-slate-400 shrink-0" />
              </Link>
              <ul className="mt-2 space-y-1 border-t border-slate-200/60 pt-2 text-[11px] text-slate-600 dark:text-slate-300">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-1.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-600 dark:bg-violet-400" />
                    <span>{item}</span>
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
