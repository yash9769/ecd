import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  CaretDown,
  EnvelopeSimple,
  Globe,
  LinkedinLogo,
  List,
  ShieldCheck,
  Sparkle,
  X,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import Logo from "./Logo";
import { Btn } from "./ui";
import { Magnetic } from "./motion";
import { NAV, CONTACT } from "../data";
import { useTheme } from "./ThemeToggle";
import markUrl from "../imports/envista-mark.png";
import ServicesDropdown, {
  MobileServicesAccordion,
  ServicesDropdownTrigger,
} from "./ServicesDropdown";
import IndustriesDropdown, {
  IndustriesDropdownTrigger,
  MobileIndustriesAccordion,
} from "./IndustriesDropdown";
import SolutionsDropdown, {
  MobileSolutionsAccordion,
  SolutionsDropdownTrigger,
} from "./SolutionsDropdown";
import Footer from "./Footer";

/* The flattened lockup PNG sets "Cyber Defence" in near-black — invisible on
   the dark footer/header. This recomposes the mark with vibrant gradient text on dark mode. */
function LogoOnDark({ className = "h-8" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img src={markUrl} alt="Envista" className="h-full w-auto" draggable={false} />
      <span className="flex flex-col leading-none">
        <span
          className="font-display text-[1.35em] font-bold tracking-[-0.01em]"
          style={{ backgroundImage: "linear-gradient(120deg,#c084fc,#818cf8)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
        >
          Envista
        </span>
        <span className="mt-0.5 text-[0.34em] font-semibold uppercase tracking-[0.14em] text-white/70">
          Cyber Defence
        </span>
      </span>
    </span>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

const SOCIALS: [string, typeof LinkedinLogo][] = [
  ["LinkedIn", LinkedinLogo],
  ["X", XLogo],
  ["YouTube", YoutubeLogo],
];

export default function Layout() {
  const [menu, setMenu] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const indTimeoutRef = useRef<number | null>(null);
  const solTimeoutRef = useRef<number | null>(null);
  const { pathname } = useLocation();
  const { isDark } = useTheme();

  // Track scroll position for dynamic glass elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  // Close dropdowns on outside click or tap
  useEffect(() => {
    const isAnyOpen = servicesOpen || industriesOpen || solutionsOpen;
    if (!isAnyOpen) return;

    const handleOutsideInteraction = (e: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
        setIndustriesOpen(false);
        setSolutionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideInteraction);
    document.addEventListener("touchstart", handleOutsideInteraction);
    return () => {
      document.removeEventListener("mousedown", handleOutsideInteraction);
      document.removeEventListener("touchstart", handleOutsideInteraction);
    };
  }, [servicesOpen, industriesOpen, solutionsOpen]);

  const clearAllCloseTimeouts = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (indTimeoutRef.current) {
      clearTimeout(indTimeoutRef.current);
      indTimeoutRef.current = null;
    }
    if (solTimeoutRef.current) {
      clearTimeout(solTimeoutRef.current);
      solTimeoutRef.current = null;
    }
  };

  const handleServicesEnter = () => {
    clearAllCloseTimeouts();
    setIndustriesOpen(false);
    setSolutionsOpen(false);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    clearAllCloseTimeouts();
    closeTimeoutRef.current = window.setTimeout(() => {
      setServicesOpen(false);
    }, 280);
  };

  const handleIndustriesEnter = () => {
    clearAllCloseTimeouts();
    setServicesOpen(false);
    setSolutionsOpen(false);
    setIndustriesOpen(true);
  };

  const handleIndustriesLeave = () => {
    clearAllCloseTimeouts();
    indTimeoutRef.current = window.setTimeout(() => {
      setIndustriesOpen(false);
    }, 280);
  };

  const handleSolutionsEnter = () => {
    clearAllCloseTimeouts();
    setServicesOpen(false);
    setIndustriesOpen(false);
    setSolutionsOpen(true);
  };

  const handleSolutionsLeave = () => {
    clearAllCloseTimeouts();
    solTimeoutRef.current = window.setTimeout(() => {
      setSolutionsOpen(false);
    }, 280);
  };

  const handleHeaderLeave = () => {
    clearAllCloseTimeouts();
    const timeout = 280;
    closeTimeoutRef.current = window.setTimeout(() => setServicesOpen(false), timeout);
    indTimeoutRef.current = window.setTimeout(() => setIndustriesOpen(false), timeout);
    solTimeoutRef.current = window.setTimeout(() => setSolutionsOpen(false), timeout);
  };

  useEffect(() => {
    setServicesOpen(false);
    setIndustriesOpen(false);
    setSolutionsOpen(false);
    setMenu(false);
  }, [pathname]);

  const isAnyDropdownOpen = servicesOpen || industriesOpen || solutionsOpen;

  return (
    <div className="min-h-screen flex flex-col overflow-x-clip bg-white text-slate-900 antialiased dark:bg-[#090a10] dark:text-slate-100 transition-colors duration-300">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-purple-deep focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <ScrollToTop />

      <header
        ref={headerRef}
        className="fixed left-3 right-3 sm:left-6 sm:right-6 lg:left-8 lg:right-8 top-2 sm:top-2.5 z-50 mx-auto max-w-[1380px] pointer-events-none"
      >
        {/* MAIN LONG UNIFIED NAVBAR (SENTINELONE STYLE) */}
        <div
          className={`pointer-events-auto mx-auto flex w-full items-center justify-between gap-4 sm:gap-6 rounded-2xl bg-white px-4.5 sm:px-6 py-1.5 sm:py-2 transition-all duration-300 ${
            isScrolled || isAnyDropdownOpen
              ? "shadow-[0_18px_50px_rgba(0,0,0,0.16),0_2px_8px_rgba(0,0,0,0.06)] border border-slate-200"
              : "shadow-[0_12px_40px_rgba(0,0,0,0.12),0_1px_4px_rgba(0,0,0,0.04)] border border-slate-100"
          }`}
        >
          {/* LEFT: Full Envista Cyber Defence Logo */}
          <Link
            to="/"
            className="flex items-center shrink-0 transition-transform duration-200 hover:opacity-95"
            aria-label="Envista Cyber Defence — Home"
          >
            <Logo className="h-6.5 sm:h-7 lg:h-[29px] w-auto object-contain" />
          </Link>

          {/* CENTER: Primary Navigation Menu Links */}
          <nav
            aria-label="Primary"
            onMouseLeave={handleHeaderLeave}
            className="relative hidden items-center gap-0.5 xl:gap-1 lg:flex"
          >
            {/* Invisible hover bridge to prevent menu closure */}
            <div className="absolute left-0 right-0 top-full h-6" aria-hidden="true" />

            {/* Solutions */}
            <div className="relative flex items-center" onMouseEnter={handleSolutionsEnter}>
              <SolutionsDropdownTrigger
                isOpen={solutionsOpen}
                onClick={() => {
                  setServicesOpen(false);
                  setIndustriesOpen(false);
                  setSolutionsOpen((prev) => !prev);
                }}
                onMouseEnter={handleSolutionsEnter}
                onMouseLeave={handleSolutionsLeave}
              />
            </div>

            {/* Services */}
            <div className="relative flex items-center" onMouseEnter={handleServicesEnter}>
              <ServicesDropdownTrigger
                isOpen={servicesOpen}
                onClick={() => {
                  setIndustriesOpen(false);
                  setSolutionsOpen(false);
                  setServicesOpen((prev) => !prev);
                }}
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              />
            </div>

            {/* Industries */}
            <div className="relative flex items-center" onMouseEnter={handleIndustriesEnter}>
              <IndustriesDropdownTrigger
                isOpen={industriesOpen}
                onClick={() => {
                  setServicesOpen(false);
                  setSolutionsOpen(false);
                  setIndustriesOpen((prev) => !prev);
                }}
                onMouseEnter={handleIndustriesEnter}
                onMouseLeave={handleIndustriesLeave}
              />
            </div>

            {/* About */}
            <NavLink
              to="/about"
              onMouseEnter={handleHeaderLeave}
              className={({ isActive }) =>
                `group relative inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-violet-600/10 text-violet-700 font-semibold ring-1 ring-violet-500/25"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                }`
              }
            >
              <span>About</span>
            </NavLink>

            {/* Insights */}
            <NavLink
              to="/insights"
              onMouseEnter={handleHeaderLeave}
              className={({ isActive }) =>
                `group relative inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[13.5px] font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-violet-600/10 text-violet-700 font-semibold ring-1 ring-violet-500/25"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                }`
              }
            >
              <span>Insights</span>
            </NavLink>
          </nav>

          {/* RIGHT: Action Button ('Contact Us') */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center justify-center rounded-lg bg-black hover:bg-slate-900 px-4 py-1.5 text-[13px] font-semibold text-white transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Contact Us
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              aria-expanded={menu}
              aria-controls="mobile-nav"
              aria-label={menu ? "Close menu" : "Open menu"}
              className={`flex h-8.5 w-8.5 sm:h-9 sm:w-9 items-center justify-center rounded-lg border transition-all lg:hidden cursor-pointer ${
                menu
                  ? "border-violet-500/50 bg-violet-600/10 text-violet-700"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
              onClick={() => setMenu((m) => !m)}
            >
              {menu ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
            </button>
          </div>
        </div>

        {/* Desktop Solutions Mega Menu Dropdown */}
        <SolutionsDropdown
          isOpen={solutionsOpen}
          onClose={() => setSolutionsOpen(false)}
          onMouseEnter={handleSolutionsEnter}
          onMouseLeave={handleSolutionsLeave}
        />

        {/* Desktop Services Mega Menu Dropdown */}
        <ServicesDropdown
          isOpen={servicesOpen}
          onClose={() => setServicesOpen(false)}
          onMouseEnter={handleServicesEnter}
          onMouseLeave={handleServicesLeave}
        />

        {/* Desktop Industries Mega Menu Dropdown */}
        <IndustriesDropdown
          isOpen={industriesOpen}
          onClose={() => setIndustriesOpen(false)}
          onMouseEnter={handleIndustriesEnter}
          onMouseLeave={handleIndustriesLeave}
        />

        {/* Backdrop Dim Overlay when any mega menu is open */}
        {isAnyDropdownOpen && (
          <div
            className="fixed inset-0 top-[65px] z-40 bg-slate-950/15 transition-opacity duration-300 dark:bg-black/50 cursor-pointer"
            onClick={handleHeaderLeave}
            aria-hidden="true"
          />
        )}

        {/* Mobile Navigation Drawer */}
        {menu && (
          <div
            id="mobile-nav"
            className="max-h-[85vh] overflow-y-auto border-t px-5 py-6 lg:hidden bg-white/98 shadow-2xl backdrop-blur-2xl border-slate-200/80 dark:bg-[#0c0e1e]/98 dark:border-white/10 animate-fade-in"
          >
            {/* Accordion Menus */}
            <MobileSolutionsAccordion onItemClick={() => setMenu(false)} />
            <MobileServicesAccordion onItemClick={() => setMenu(false)} />
            <MobileIndustriesAccordion onItemClick={() => setMenu(false)} />

            {/* Standalone Nav Links */}
            <div className="mt-3 space-y-1 border-t border-slate-200/80 pt-3 dark:border-white/10">
              {NAV.filter(
                ([label]) =>
                  label !== "Platform Capabilities" &&
                  label !== "Services" &&
                  label !== "Industries" &&
                  label !== "Solutions"
              ).map(([label, href]) => (
                <NavLink
                  key={label}
                  to={href}
                  onClick={() => setMenu(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-violet-600/10 text-violet-700 font-semibold dark:bg-violet-500/20 dark:text-[#c4b5fd]"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
                    }`
                  }
                >
                  <span>{label}</span>
                  <span className="text-slate-400">→</span>
                </NavLink>
              ))}
            </div>

            {/* Mobile Drawer Bottom CTA */}
            <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-white/10">
              <Link
                to="/contact"
                onClick={() => setMenu(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md shadow-violet-600/30 transition-all hover:brightness-110 active:scale-[0.98]"
              >
                <span>Talk to an Expert</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={pathname}
          className="relative z-10 flex-1 w-full overflow-x-hidden"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      {/* Modern Cyber Defence Footer matching reference image */}
      <Footer />
    </div>
  );
}
