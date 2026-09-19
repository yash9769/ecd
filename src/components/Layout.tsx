import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  CaretDown,
  EnvelopeSimple,
  Globe,
  LinkedinLogo,
  List,
  Phone,
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
import PlatformCapabilitiesDropdown, {
  MobilePlatformCapabilitiesAccordion,
  PlatformCapabilitiesDropdownTrigger,
} from "./PlatformCapabilitiesDropdown";

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
  const [platformOpen, setPlatformOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const indTimeoutRef = useRef<number | null>(null);
  const solTimeoutRef = useRef<number | null>(null);
  const platTimeoutRef = useRef<number | null>(null);
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
    const isAnyOpen = platformOpen || servicesOpen || industriesOpen || solutionsOpen;
    if (!isAnyOpen) return;

    const handleOutsideInteraction = (e: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setPlatformOpen(false);
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
  }, [platformOpen, servicesOpen, industriesOpen, solutionsOpen]);

  const handlePlatformEnter = () => {
    if (platTimeoutRef.current) {
      clearTimeout(platTimeoutRef.current);
      platTimeoutRef.current = null;
    }
    setServicesOpen(false);
    setIndustriesOpen(false);
    setSolutionsOpen(false);
    setPlatformOpen(true);
  };

  const handlePlatformLeave = () => {
    platTimeoutRef.current = window.setTimeout(() => {
      setPlatformOpen(false);
    }, 50);
  };

  const handleServicesEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setPlatformOpen(false);
    setIndustriesOpen(false);
    setSolutionsOpen(false);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setServicesOpen(false);
    }, 50);
  };

  const handleIndustriesEnter = () => {
    if (indTimeoutRef.current) {
      clearTimeout(indTimeoutRef.current);
      indTimeoutRef.current = null;
    }
    setPlatformOpen(false);
    setServicesOpen(false);
    setSolutionsOpen(false);
    setIndustriesOpen(true);
  };

  const handleIndustriesLeave = () => {
    indTimeoutRef.current = window.setTimeout(() => {
      setIndustriesOpen(false);
    }, 50);
  };

  const handleSolutionsEnter = () => {
    if (solTimeoutRef.current) {
      clearTimeout(solTimeoutRef.current);
      solTimeoutRef.current = null;
    }
    setPlatformOpen(false);
    setServicesOpen(false);
    setIndustriesOpen(false);
    setSolutionsOpen(true);
  };

  const handleSolutionsLeave = () => {
    solTimeoutRef.current = window.setTimeout(() => {
      setSolutionsOpen(false);
    }, 50);
  };

  const handleHeaderLeave = () => {
    handlePlatformLeave();
    handleServicesLeave();
    handleIndustriesLeave();
    handleSolutionsLeave();
  };

  useEffect(() => {
    setPlatformOpen(false);
    setServicesOpen(false);
    setIndustriesOpen(false);
    setSolutionsOpen(false);
    setMenu(false);
  }, [pathname]);

  const isAnyDropdownOpen = platformOpen || servicesOpen || industriesOpen || solutionsOpen;

  return (
    <div className="min-h-full overflow-x-clip bg-white text-slate-900 antialiased dark:bg-[#090a10] dark:text-slate-100 transition-colors duration-300">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-purple-deep focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <ScrollToTop />

      <header
        ref={headerRef}
        className="fixed left-4 right-4 sm:left-6 sm:right-6 lg:left-10 lg:right-10 top-4 z-50 mx-auto max-w-[1320px] pointer-events-none"
      >
        <div className="mx-auto flex w-full items-center justify-between lg:justify-center gap-3 sm:gap-4">
          {/* LEFT: Logo Pill */}
          <Link
            to="/"
            className={`pointer-events-auto flex shrink-0 items-center justify-center rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
              isScrolled || isAnyDropdownOpen
                ? "bg-white/95 shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-white/40 backdrop-blur-2xl"
                : "bg-white/80 border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl"
            } h-11 w-11 sm:h-[50px] sm:w-[50px] p-2.5`}
            aria-label="Envista Cyber Defence — home"
          >
            <img src={markUrl} alt="Envista" className="h-full w-auto object-contain" />
          </Link>

          {/* CENTER: Primary Navigation Pill */}
          <nav
            aria-label="Primary"
            onMouseLeave={handleHeaderLeave}
            className={`pointer-events-auto relative hidden items-center gap-1 xl:gap-2 rounded-full transition-all duration-300 px-3 py-2 sm:py-2.5 lg:flex ${
              isScrolled || isAnyDropdownOpen
                ? "bg-white/95 shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-white/40 backdrop-blur-2xl"
                : "bg-white/80 border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl"
            }`}
          >
            {/* Invisible bridge to catch mouse events between nav and dropdowns */}
            <div className="absolute left-0 right-0 top-full h-6" aria-hidden="true" />

            {NAV.map(([label, href]) => {
              if (label === "Contact") return null; // We use a dedicated CTA button for Contact

              if (label === "Platform Capabilities") {
                return (
                  <div key={label} className="relative flex items-center" onMouseEnter={handlePlatformEnter}>
                    <PlatformCapabilitiesDropdownTrigger
                      isOpen={platformOpen}
                      onClick={() => {
                        setServicesOpen(false);
                        setIndustriesOpen(false);
                        setSolutionsOpen(false);
                        setPlatformOpen((prev) => !prev);
                      }}
                      onMouseEnter={handlePlatformEnter}
                      onMouseLeave={handlePlatformLeave}
                    />
                  </div>
                );
              }
              if (label === "Solutions") {
                return (
                  <div key={label} className="relative flex items-center" onMouseEnter={handleSolutionsEnter}>
                    <SolutionsDropdownTrigger
                      isOpen={solutionsOpen}
                      onClick={() => {
                        setPlatformOpen(false);
                        setServicesOpen(false);
                        setIndustriesOpen(false);
                        setSolutionsOpen((prev) => !prev);
                      }}
                      onMouseEnter={handleSolutionsEnter}
                      onMouseLeave={handleSolutionsLeave}
                    />
                  </div>
                );
              }
              if (label === "Services") {
                return (
                  <div key={label} className="relative flex items-center" onMouseEnter={handleServicesEnter}>
                    <ServicesDropdownTrigger
                      isOpen={servicesOpen}
                      onClick={() => {
                        setPlatformOpen(false);
                        setIndustriesOpen(false);
                        setSolutionsOpen(false);
                        setServicesOpen((prev) => !prev);
                      }}
                      onMouseEnter={handleServicesEnter}
                      onMouseLeave={handleServicesLeave}
                    />
                  </div>
                );
              }
              if (label === "Industries") {
                return (
                  <div key={label} className="relative flex items-center" onMouseEnter={handleIndustriesEnter}>
                    <IndustriesDropdownTrigger
                      isOpen={industriesOpen}
                      onClick={() => {
                        setPlatformOpen(false);
                        setServicesOpen(false);
                        setSolutionsOpen(false);
                        setIndustriesOpen((prev) => !prev);
                      }}
                      onMouseEnter={handleIndustriesEnter}
                      onMouseLeave={handleIndustriesLeave}
                    />
                  </div>
                );
              }
              return (
                <NavLink
                  key={label}
                  to={href}
                  onMouseEnter={() => {
                    handleHeaderLeave();
                  }}
                  className={({ isActive }) =>
                    `group relative inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[14px] font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-violet-600/10 text-violet-700 font-semibold ring-1 ring-violet-500/25"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                    }`
                  }
                >
                  <span>{label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* RIGHT: CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/contact"
              className="pointer-events-auto hidden h-[46px] sm:h-[50px] lg:inline-flex items-center justify-center rounded-full bg-[#150a2e] px-6 text-[14.5px] font-semibold text-white transition-all duration-300 hover:bg-[#201046] hover:scale-[1.02] active:scale-[0.98] shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(21,10,46,0.25)]"
            >
              Contact Us
            </Link>

            <button
              type="button"
              aria-expanded={menu}
              aria-controls="mobile-nav"
              aria-label={menu ? "Close menu" : "Open menu"}
              className={`pointer-events-auto flex h-11 w-11 sm:h-[50px] sm:w-[50px] items-center justify-center rounded-full border transition-all lg:hidden cursor-pointer ${
                menu
                  ? "border-violet-500/50 bg-violet-600/10 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300 dark:border-violet-400/40"
                  : isScrolled || isAnyDropdownOpen
                  ? "bg-white/95 border-white/40 text-slate-700 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-2xl hover:bg-slate-50"
                  : "bg-white/80 border-white/20 text-slate-700 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl hover:bg-white/90"
              }`}
              onClick={() => setMenu((m) => !m)}
            >
              {menu ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
            </button>
          </div>
        </div>

        {/* Desktop Platform Capabilities Mega Menu Dropdown */}
        <PlatformCapabilitiesDropdown
          isOpen={platformOpen}
          onClose={() => setPlatformOpen(false)}
          onMouseEnter={handlePlatformEnter}
          onMouseLeave={handlePlatformLeave}
        />

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
            className="fixed inset-0 top-[65px] z-40 bg-slate-950/20 backdrop-blur-[2px] transition-opacity duration-300 dark:bg-black/60 cursor-pointer"
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
            <MobilePlatformCapabilitiesAccordion onItemClick={() => setMenu(false)} />
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
          className="relative z-10"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      {/* Footer supporting both Light and Dark Themes */}
      <footer className="relative z-10 border-t border-slate-200 bg-slate-50 transition-colors duration-300 dark:border-white/10 dark:bg-[#0b0d18]">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-9">
            {isDark ? <LogoOnDark className="h-8 shrink-0" /> : <Logo className="h-8 shrink-0" />}

            <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {NAV.map(([label, href]) => (
                <Link
                  key={label}
                  to={href}
                  className="text-[13px] font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <ul className="flex shrink-0 items-center gap-2.5">
              {SOCIALS.map(([name, Icon]) => (
                <li key={name}>
                  <a
                    href="/"
                    aria-label={name}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-[#14172b] dark:text-slate-400 dark:hover:border-violet-500/40 dark:hover:text-white"
                  >
                    <Icon size={16} weight="fill" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 py-5 text-[12px] text-slate-500 transition-colors duration-300 dark:border-white/10 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Envista Cyber Defence. All rights reserved.</span>
            <span className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link to="/faq" className="transition-colors hover:text-slate-800 dark:hover:text-slate-200">
                Privacy
              </Link>
              <Link to="/faq" className="transition-colors hover:text-slate-800 dark:hover:text-slate-200">
                Terms
              </Link>
              <Link to="/faq" className="transition-colors hover:text-slate-800 dark:hover:text-slate-200">
                Cookie Policy
              </Link>
              <span aria-hidden="true" className="hidden h-3 w-px bg-slate-300 dark:bg-slate-700 sm:block" />
              <span className="font-medium text-[#4f46e5] dark:text-[#a78bfa]">From Risk to Resilience.</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
