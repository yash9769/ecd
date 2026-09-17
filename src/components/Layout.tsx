import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { LinkedinLogo, MagnifyingGlass, XLogo, YoutubeLogo } from "@phosphor-icons/react";
import Logo from "./Logo";
import { Btn } from "./ui";
import { Magnetic } from "./motion";
import { NAV } from "../data";
import markUrl from "../imports/envista-mark.png";

/* The flattened lockup PNG sets "Cyber Defence" in near-black — invisible on
   the dark footer. Rather than invert the whole asset (which would also
   flatten the brand's purple gradient to white) or redraw the mark, this
   recomposes the same mark image with real, recolourable text beside it —
   the graphic itself is untouched. */
function LogoOnDark({ className = "h-8" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img src={markUrl} alt="" aria-hidden="true" className="h-full w-auto" />
      <span className="flex flex-col leading-none">
        <span
          className="font-display text-[1.35em] font-bold tracking-[-0.01em]"
          style={{ backgroundImage: "linear-gradient(120deg,#c084fc,#818cf8)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
        >
          Envista
        </span>
        <span className="mt-0.5 text-[0.34em] font-semibold uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,0.55)" }}>
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
  const { pathname } = useLocation();

  /* overflow-x: clip, not hidden. `hidden` makes this element a scroll
     container, which silently breaks position: sticky for every descendant.

     Dark by default: inner pages (About, Capabilities, ...) still assume
     this canvas for their own hero sections, which set light-on-dark text
     without an explicit background of their own. The homepage's sections
     are unaffected — every one of them sets its own explicit light
     background rather than relying on this default. */
  return (
    <div className="min-h-full overflow-x-clip bg-white text-slate-900 antialiased">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-purple-deep focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <ScrollToTop />

      <header
        className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl"
        style={{ backgroundColor: "rgba(255,255,255,0.95)", borderColor: "rgba(13,16,32,0.08)" }}
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-6 py-4 lg:px-10">
          <Link to="/" className="flex shrink-0 items-center" aria-label="Envista Cyber Defence — home">
            <Logo className="h-9 lg:h-10" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {NAV.map(([label, href]) => (
              <NavLink
                key={label}
                to={href}
                className={({ isActive }) =>
                  `text-[13px] font-medium transition-colors ${
                    isActive ? "" : "hover:opacity-100"
                  }`
                }
                style={({ isActive }) => ({
                  color: isActive ? "#0d1020" : "#575f75",
                })}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <button
              type="button"
              aria-label="Search"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-black/5"
              style={{ color: "#575f75" }}
            >
              <MagnifyingGlass size={17} aria-hidden="true" />
            </button>
            <Magnetic strength={0.35}>
              <Btn to="/contact" variant="navy">
                Talk to an Expert
              </Btn>
            </Magnetic>
          </div>

          <button
            type="button"
            aria-expanded={menu}
            aria-controls="mobile-nav"
            className="rounded-full border px-4 py-2 text-xs font-semibold lg:hidden"
            style={{ borderColor: "rgba(13,16,32,0.14)", color: "#575f75" }}
            onClick={() => setMenu((m) => !m)}
          >
            {menu ? "Close" : "Menu"}
          </button>
        </div>

        {menu && (
          <div id="mobile-nav" className="border-t px-6 py-5 lg:hidden" style={{ borderColor: "rgba(13,16,32,0.08)", backgroundColor: "#ffffff" }}>
            {NAV.map(([label, href]) => (
              <NavLink
                key={label}
                to={href}
                onClick={() => setMenu(false)}
                className="block py-2.5 text-sm font-medium"
                style={{ color: "#575f75" }}
              >
                {label}
              </NavLink>
            ))}
            <div className="pt-4">
              <Btn to="/contact" variant="navy" onClick={() => setMenu(false)}>
                Talk to an Expert
              </Btn>
            </div>
          </div>
        )}
      </header>

      <main id="main" key={pathname} className="page-in relative z-10">
        <Outlet />
      </main>

      {/* Clean Light Footer matching the white theme */}
      <footer className="relative z-10 border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-9">
            <Logo className="h-8 shrink-0" />

            <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {NAV.map(([label, href]) => (
                <Link
                  key={label}
                  to={href}
                  className="text-[13px] font-medium text-slate-600 transition-colors hover:text-slate-900"
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
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:text-slate-900 hover:border-slate-300"
                  >
                    <Icon size={16} weight="fill" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="flex flex-col gap-3 border-t border-slate-200 py-5 text-[12px] text-slate-500 sm:flex-row sm:items-center sm:justify-between"
          >
            <span>© {new Date().getFullYear()} Envista Cyber Defence. All rights reserved.</span>
            <span className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link to="/faq" className="transition-colors hover:text-slate-800">
                Privacy
              </Link>
              <Link to="/faq" className="transition-colors hover:text-slate-800">
                Terms
              </Link>
              <Link to="/faq" className="transition-colors hover:text-slate-800">
                Cookie Policy
              </Link>
              <span aria-hidden="true" className="hidden h-3 w-px bg-slate-300 sm:block" />
              <span className="font-medium text-[#4f46e5]">From Risk to Resilience.</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
