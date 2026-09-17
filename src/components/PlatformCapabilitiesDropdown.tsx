import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Broadcast,
  CaretDown,
  Certificate,
  CheckCircle,
  Cpu,
  Database,
  Eye,
  Globe,
  ShieldCheck,
  Sparkle,
  Users,
} from "@phosphor-icons/react";
import { PLATFORM_CAPABILITIES } from "../data";

export function PlatformCapabilitiesDropdownTrigger({
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
      className={`group inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[14px] font-medium transition-all duration-200 cursor-pointer ${
        isOpen
          ? "bg-violet-600/10 text-violet-700 font-semibold ring-1 ring-violet-500/25 dark:bg-violet-500/20 dark:text-[#c4b5fd] dark:ring-violet-400/30"
          : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
      }`}
    >
      <span>Platform Capabilities</span>
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

function getIcon(id: string) {
  switch (id) {
    case "platform-features":
      return <Cpu size={19} weight="bold" />;
    case "brand-monitoring":
      return <Globe size={19} weight="bold" />;
    case "dark-web-monitoring":
      return <Eye size={19} weight="bold" />;
    case "email-health-monitoring":
      return <CheckCircle size={19} weight="bold" />;
    case "infrastructure-monitoring":
      return <Database size={19} weight="bold" />;
    case "external-attack-surface":
      return <Broadcast size={19} weight="bold" />;
    case "compliance-monitoring":
      return <Certificate size={19} weight="bold" />;
    case "supply-chain-risk":
      return <Users size={19} weight="bold" />;
    default:
      return <ShieldCheck size={19} weight="bold" />;
  }
}

export default function PlatformCapabilitiesDropdown({
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
      aria-label="Platform Capabilities Navigation"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute inset-x-0 top-full z-50 border-b border-slate-200/90 bg-white/98 shadow-[0_25px_60px_-15px_rgba(79,70,229,0.12),0_4px_16px_rgba(0,0,0,0.04)] backdrop-blur-2xl transition-all duration-200 dark:border-violet-500/25 dark:bg-[#0c0e1c]/98 dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_35px_rgba(124,58,237,0.12)] animate-in fade-in slide-in-from-top-2"
    >
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#6d28d9] to-transparent opacity-80 dark:via-[#a78bfa]" />

      <div className="mx-auto max-w-[1320px] px-6 py-8 lg:px-10">
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-5 mb-6 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-5 items-center rounded-full bg-[#6d28d9] px-2 text-[10px] font-bold uppercase tracking-wider text-white">
                ENVISTA PLATFORM
              </span>
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#6d28d9] dark:text-[#a78bfa]">
                PARTNER CAPABILITIES &amp; OUTSIDE-IN INTELLIGENCE
              </span>
            </div>
            <h3 className="font-display text-[20px] sm:text-[22px] font-bold tracking-[-0.01em] text-[#0d1020] dark:text-white mt-1.5">
              Continuous Digital Risk Protection &amp; Attack Surface Defense
            </h3>
            <p className="mt-0.5 text-[13px] text-[#575f75] dark:text-slate-400">
              Autonomous reconnaissance, threat intelligence, and human analyst validation across all external attack vectors.
            </p>
          </div>

          <Link
            to="/capabilities#platform-hub"
            onClick={onClose}
            className="group inline-flex items-center gap-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-[#6d28d9] hover:underline dark:text-[#a78bfa] shrink-0"
          >
            <span>Explore All 8 Pillars</span>
            <ArrowRight size={13} weight="bold" className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 8 Platform Capabilities Grid (4 Columns x 2 Rows) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORM_CAPABILITIES.map((cap) => (
            <Link
              key={cap.id}
              to={cap.id === "brand-monitoring" || cap.id === "dark-web-monitoring" ? "/solutions/brm-dwm" : `/capabilities#${cap.id}`}
              onClick={onClose}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-[#fafafc] p-4.5 transition-all hover:-translate-y-0.5 hover:border-[#6d28d9] hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:border-violet-500/50 dark:hover:bg-[#160f33]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6d28d9]/10 text-[#6d28d9] transition-colors group-hover:bg-[#6d28d9] group-hover:text-white dark:bg-violet-500/20 dark:text-[#c4b5fd]">
                    {getIcon(cap.id)}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-slate-400 group-hover:text-[#6d28d9] dark:group-hover:text-[#a78bfa]">
                    #{cap.n}
                  </span>
                </div>

                <h4 className="mt-3.5 font-display text-[14.5px] font-bold text-[#0d1020] transition-colors group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#c4b5fd]">
                  {cap.title}
                </h4>

                <p className="mt-1.5 text-[11.5px] leading-relaxed text-[#575f75] dark:text-slate-400 line-clamp-2">
                  {cap.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-[#6d28d9] dark:text-[#a78bfa]">
                  {cap.badge}
                </span>
                <ArrowRight
                  size={12}
                  weight="bold"
                  className="text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-[#6d28d9] dark:group-hover:text-[#c4b5fd]"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Banner Strip */}
        <div className="mt-6 pt-5 border-t border-slate-200/70 dark:border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#575f75] dark:text-slate-400">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              Autonomous outside-in intelligence powered in partnership with <strong className="text-[#0d1020] dark:text-white">TechOwl Shield</strong>.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/solutions/brm-dwm"
              onClick={onClose}
              className="font-semibold text-[#6d28d9] hover:underline dark:text-[#c4b5fd]"
            >
              Brand Risk &amp; Dark Web Monitoring →
            </Link>
            <Link
              to="/contact"
              onClick={onClose}
              className="font-semibold text-[#0d1020] hover:text-[#6d28d9] dark:text-white dark:hover:text-[#c4b5fd]"
            >
              Request External Attack Scan →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobilePlatformCapabilitiesAccordion({ onItemClick }: { onItemClick: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-slate-200/60 pb-2 dark:border-white/10">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center justify-between py-2.5 text-sm font-semibold text-[#0d1020] dark:text-white"
      >
        <span>Platform Capabilities</span>
        <CaretDown
          size={14}
          className={`transition-transform duration-200 ${expanded ? "rotate-180 text-[#6d28d9] dark:text-[#a78bfa]" : ""}`}
        />
      </button>

      {expanded && (
        <div className="space-y-3 pl-3 pt-2 pb-3">
          <Link
            to="/capabilities#platform-hub"
            onClick={onItemClick}
            className="block text-[12px] font-bold text-[#6d28d9] dark:text-[#a78bfa]"
          >
            Explore All 8 Capabilities Hub →
          </Link>

          <div className="grid grid-cols-1 gap-2 pl-2 border-l border-slate-200 dark:border-white/10">
            {PLATFORM_CAPABILITIES.map((cap) => (
              <Link
                key={cap.id}
                to={cap.id === "brand-monitoring" || cap.id === "dark-web-monitoring" ? "/solutions/brm-dwm" : `/capabilities#${cap.id}`}
                onClick={onItemClick}
                className="block py-1 text-[12px] text-slate-600 hover:text-[#0d1020] dark:text-slate-300 dark:hover:text-white"
              >
                <div className="font-semibold text-[#0d1020] dark:text-white">{cap.title}</div>
                <div className="text-[11px] text-slate-400 line-clamp-1">{cap.tagline}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
