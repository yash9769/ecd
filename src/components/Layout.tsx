import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { LinkedinLogo, MagnifyingGlass, XLogo, YoutubeLogo } from "@phosphor-icons/react";
import Logo from "./Logo";
import { Btn } from "./ui";
import { Magnetic } from "./motion";
import { NAV } from "../data";
import ThemeToggle, { useTheme } from "./ThemeToggle";
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
  const closeTimeoutRef = useRef<number | null>(null);
  const indTimeoutRef = useRef<number | null>(null);
  const solTimeoutRef = useRef<number | null>(null);
  const { pathname } = useLocation();
  const { isDark } = useTheme();

  const handleServicesEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIndustriesOpen(false);
    setSolutionsOpen(false);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setServicesOpen(false);
    }, 200);
  };

  const handleIndustriesEnter = () => {
    if (indTimeoutRef.current) {
      clearTimeout(indTimeoutRef.current);
      indTimeoutRef.current = null;
    }
    setServicesOpen(false);
    setSolutionsOpen(false);
    setIndustriesOpen(true);
  };

  const handleIndustriesLeave = () => {
    indTimeoutRef.current = window.setTimeout(() => {
      setIndustriesOpen(false);
    }, 200);
  };

  const handleSolutionsEnter = () => {
    if (solTimeoutRef.current) {
      clearTimeout(solTimeoutRef.current);
      solTimeoutRef.current = null;
    }
    setServicesOpen(false);
    setIndustriesOpen(false);
    setSolutionsOpen(true);
  };

  const handleSolutionsLeave = () => {
    solTimeoutRef.current = window.setTimeout(() => {
      setSolutionsOpen(false);
    }, 200);
  };

  const handleHeaderLeave = () => {
    handleServicesLeave();
    handleIndustriesLeave();
    handleSolutionsLeave();
  };

  useEffect(() => {
    setServicesOpen(false);
    setIndustriesOpen(false);
    setSolutionsOpen(false);
    setMenu(false);
  }, [pathname]);

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
        className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 bg-white/95 border-slate-900/10 dark:bg-[#0b0d18]/90 dark:border-white/10"
        onMouseLeave={handleHeaderLeave}
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-6 py-4 lg:px-10">
          <Link to="/" className="flex shrink-0 items-center" aria-label="Envista Cyber Defence — home">
            {isDark ? <LogoOnDark className="h-9 lg:h-10" /> : <Logo className="h-9 lg:h-10" />}
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {NAV.map(([label, href]) => {
              if (label === "Services") {
                return (
                  <div
                    key={label}
                    className="relative flex items-center py-1"
                    onMouseEnter={handleServicesEnter}
                  >
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
                );
              }
              if (label === "Industries") {
                return (
                  <div
                    key={label}
                    className="relative flex items-center py-1"
                    onMouseEnter={handleIndustriesEnter}
                  >
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
                );
              }
              if (label === "Solutions") {
                return (
                  <div
                    key={label}
                    className="relative flex items-center py-1"
                    onMouseEnter={handleSolutionsEnter}
                  >
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
                );
              }
              return (
                <NavLink
                  key={label}
                  to={href}
                  className={({ isActive }) =>
                    `text-[13px] font-medium transition-colors ${
                      isActive
                        ? "text-[#0d1020] dark:text-white font-semibold"
                        : "text-[#575f75] hover:text-[#0d1020] dark:text-slate-400 dark:hover:text-white"
                    }`
                  }
                >
                  {label}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>

            <div className="hidden lg:block">
              <Magnetic strength={0.16}>
                <Btn to="/contact" variant="solid">Talk to an Expert</Btn>
              </Magnetic>
            </div>

            <button
              type="button"
              aria-expanded={menu}
              aria-controls="mobile-nav"
              className="rounded-full border px-4 py-2 text-xs font-semibold text-[#575f75] border-slate-900/15 hover:bg-black/5 dark:text-slate-300 dark:border-white/15 dark:hover:bg-white/5"
              onClick={() => setMenu((m) => !m)}
            >
              {menu ? "Close" : "Menu"}
            </button>
          </div>
        </div>

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

        {/* Desktop Solutions Mega Menu Dropdown */}
        <SolutionsDropdown
          isOpen={solutionsOpen}
          onClose={() => setSolutionsOpen(false)}
          onMouseEnter={handleSolutionsEnter}
          onMouseLeave={handleSolutionsLeave}
        />

        {menu && (
          <div
            id="mobile-nav"
            className="max-h-[80vh] overflow-y-auto border-t px-6 py-5 lg:hidden bg-white border-slate-900/10 dark:bg-[#0e1122] dark:border-white/10"
          >
            <MobileServicesAccordion onItemClick={() => setMenu(false)} />
            <MobileIndustriesAccordion onItemClick={() => setMenu(false)} />
            <MobileSolutionsAccordion onItemClick={() => setMenu(false)} />
            {NAV.filter(([label]) => label !== "Services" && label !== "Industries" && label !== "Solutions").map(([label, href]) => (
              <NavLink
                key={label}
                to={href}
                onClick={() => setMenu(false)}
                className="block py-2.5 text-sm font-medium text-[#575f75] hover:text-[#0d1020] dark:text-slate-400 dark:hover:text-white"
              >
                {label}
              </NavLink>
            ))}
            <div className="pt-4 flex items-center justify-between gap-3">
              <Btn to="/contact" variant="navy" onClick={() => setMenu(false)}>
                Talk to an Expert
              </Btn>
              <ThemeToggle />
            </div>
          </div>
        )}
      </header>

      <main id="main" key={pathname} className="page-in relative z-10">
        <Outlet />
      </main>

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
