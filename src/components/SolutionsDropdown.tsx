import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Broadcast, CaretDown, Eye, ShieldCheck, ShieldWarning, Sparkle } from "@phosphor-icons/react";

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

      <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Featured Solution Highlight */}
          <div className="lg:col-span-5 border-b border-slate-200/80 pb-6 dark:border-white/10 lg:border-b-0 lg:border-r lg:pr-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex h-5 items-center rounded-full bg-[#6d28d9] px-2 text-[10px] font-bold uppercase tracking-wider text-white">
                NEW SOLUTION
              </span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#6d28d9] dark:text-[#a78bfa]">
                THREAT INTELLIGENCE
              </span>
            </div>

            <Link
              to="/solutions/brm-dwm"
              onClick={onClose}
              className="group block rounded-2xl border border-[#e4dfef] bg-gradient-to-br from-[#f8f4fe] to-[#f4e8fa] p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#6d28d9] hover:shadow-[0_12px_28px_rgba(91,42,184,0.12)] dark:border-violet-500/30 dark:bg-gradient-to-br dark:from-[#150c2e] dark:to-[#1c113b]"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#6d28d9] text-white shadow-md shadow-[#6d28d9]/30">
                  <Broadcast size={22} weight="bold" />
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#6d28d9] group-hover:underline dark:text-[#c4b5fd]">
                  Explore Solution
                  <ArrowRight size={13} weight="bold" />
                </span>
              </div>

              <h4 className="mt-4 font-display text-lg font-bold text-[#150c2e] transition-colors group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#c4b5fd]">
                Brand Risk Monitoring and Dark Web Monitoring Services
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-[#575f75] dark:text-slate-300">
                Continuous surveillance across Tor networks, Telegram syndicates, and paste sites to detect
                credential theft, spoofed domains, and third-party data leaks before adversaries strike.
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-purple-200/50 dark:border-white/10">
                <span className="rounded bg-white/80 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#5a3470] dark:bg-white/10 dark:text-[#c4b5fd]">
                  Live Recon
                </span>
                <span className="rounded bg-white/80 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#5a3470] dark:bg-white/10 dark:text-[#c4b5fd]">
                  Tor Markets
                </span>
                <span className="rounded bg-white/80 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#5a3470] dark:bg-white/10 dark:text-[#c4b5fd]">
                  Fast Takedowns
                </span>
              </div>
            </Link>
          </div>

          {/* Right Columns: Solutions by Practice Area */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Category 1 */}
            <div>
              <div className="mb-3.5 border-b border-slate-200/80 pb-2.5 dark:border-white/10">
                <h3 className="font-display text-[13.5px] font-bold tracking-[-0.01em] text-[#0d1020] dark:text-white">
                  Exposure &amp; Threat Defense
                </h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/solutions/brm-dwm"
                    onClick={onClose}
                    className="group block"
                  >
                    <div className="font-display text-[13px] font-bold text-[#150c2e] transition-colors group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#c4b5fd]">
                      Brand Risk &amp; Dark Web Monitoring
                    </div>
                    <div className="text-[11.5px] text-[#575f75] dark:text-slate-400">
                      Surveillance of leaked corporate credentials and spoofed domains.
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/capabilities#defensive"
                    onClick={onClose}
                    className="group block"
                  >
                    <div className="font-display text-[13px] font-bold text-[#150c2e] transition-colors group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#c4b5fd]">
                      Attack Surface Intelligence
                    </div>
                    <div className="text-[11.5px] text-[#575f75] dark:text-slate-400">
                      Discovery and continuous inventory of internet-exposed digital assets.
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/capabilities#offensive"
                    onClick={onClose}
                    className="group block"
                  >
                    <div className="font-display text-[13px] font-bold text-[#150c2e] transition-colors group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#c4b5fd]">
                      Red Teaming &amp; Adversary Emulation
                    </div>
                    <div className="text-[11.5px] text-[#575f75] dark:text-slate-400">
                      Full-spectrum offensive testing against high-value crown jewels.
                    </div>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Category 2 */}
            <div>
              <div className="mb-3.5 border-b border-slate-200/80 pb-2.5 dark:border-white/10">
                <h3 className="font-display text-[13.5px] font-bold tracking-[-0.01em] text-[#0d1020] dark:text-white">
                  Compliance &amp; Resilience
                </h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/capabilities#dpdp"
                    onClick={onClose}
                    className="group block"
                  >
                    <div className="font-display text-[13px] font-bold text-[#150c2e] transition-colors group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#c4b5fd]">
                      DPDP Readiness Assessment
                    </div>
                    <div className="text-[11.5px] text-[#575f75] dark:text-slate-400">
                      Data principal consent architecture &amp; statutory compliance.
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/methodology"
                    onClick={onClose}
                    className="group block"
                  >
                    <div className="font-display text-[13px] font-bold text-[#150c2e] transition-colors group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#c4b5fd]">
                      Cyber Defence Methodology
                    </div>
                    <div className="text-[11.5px] text-[#575f75] dark:text-slate-400">
                      Discover, assess, fortify, and sustain security operating model.
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/capabilities#grc"
                    onClick={onClose}
                    className="group block"
                  >
                    <div className="font-display text-[13px] font-bold text-[#150c2e] transition-colors group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#c4b5fd]">
                      SEBI, RBI &amp; ISO 27001 GRC
                    </div>
                    <div className="text-[11.5px] text-[#575f75] dark:text-slate-400">
                      Audit-ready proof generation and continuous security governance.
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-violet-200/60 bg-gradient-to-r from-violet-50/70 via-white to-purple-50/70 p-4 dark:border-violet-500/20 dark:bg-gradient-to-r dark:from-[#13172e] dark:via-[#111425] dark:to-[#17142e] sm:flex-row">
          <div className="flex items-center gap-3 text-[13px] text-[#0d1020] dark:text-slate-200">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#6d28d9] text-white dark:bg-[#7c3aed]">
              <ShieldCheck size={16} weight="bold" />
            </div>
            <span>
              Concerned your credentials or domain are exposed on the dark web?{" "}
              <strong className="font-semibold text-[#6d28d9] dark:text-[#a78bfa]">
                Request an immediate confidential exposure scan.
              </strong>
            </span>
          </div>
          <Link
            to="/solutions/brm-dwm"
            onClick={onClose}
            className="shrink-0 rounded-full bg-[#6d28d9] px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-105 dark:bg-[#7c3aed]"
          >
            Explore BRM &amp; DWM
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
        className="flex w-full items-center justify-between py-2.5 text-sm font-semibold text-[#0d1020] dark:text-white"
      >
        <span>Solutions</span>
        <CaretDown
          size={14}
          className={`transition-transform duration-200 ${expanded ? "rotate-180 text-[#6d28d9] dark:text-[#a78bfa]" : ""}`}
        />
      </button>

      {expanded && (
        <div className="space-y-3 pl-3 pt-2 pb-3">
          <Link
            to="/solutions/brm-dwm"
            onClick={onItemClick}
            className="flex flex-col gap-0.5 rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/5"
          >
            <div className="flex items-center gap-1.5 font-display text-sm font-bold text-[#6d28d9] dark:text-[#c4b5fd]">
              <span>Brand Risk &amp; Dark Web Monitoring</span>
              <span className="rounded bg-[#6d28d9] px-1.5 py-0.2 text-[9px] text-white">NEW</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Detect stolen credentials, rogue domains, and paste leaks.
            </p>
          </Link>

          <Link
            to="/methodology"
            onClick={onItemClick}
            className="flex flex-col gap-0.5 rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/5"
          >
            <div className="font-display text-sm font-bold text-[#0d1020] dark:text-white">
              Cyber Defence Methodology
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Discover, assess, fortify, and sustain your security operating model.
            </p>
          </Link>

          <Link
            to="/capabilities#dpdp"
            onClick={onItemClick}
            className="flex flex-col gap-0.5 rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/5"
          >
            <div className="font-display text-sm font-bold text-[#0d1020] dark:text-white">
              DPDP Readiness Assessment
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Comprehensive privacy compliance &amp; statutory auditing.
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
