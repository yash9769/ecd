import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import {
  EnvelopeSimple,
  LinkedinLogo,
  MagnifyingGlass,
  MapPin,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import Logo from "./Logo";
import { Btn } from "./ui";
import { Magnetic } from "./motion";
import { CAPABILITIES, CONTACT, NAV } from "../data";
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

const COMPANY: [string, string][] = [
  ["About", "/about"],
  ["Industries", "/industries"],
  ["Solutions", "/methodology"],
  ["Case Studies", "/case-studies"],
  ["Insights", "/insights"],
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
];

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
    <div className="min-h-full overflow-x-clip bg-ink text-fg antialiased">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-purple-deep focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <ScrollToTop />

      <header
        className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl"
        style={{ backgroundColor: "rgba(255,255,255,0.92)", borderColor: "rgba(13,16,32,0.08)" }}
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

      <footer className="relative z-10" style={{ backgroundColor: "var(--color-band)" }}>
        <div className="mx-auto max-w-[1240px] px-6 py-16 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
            <div>
              <LogoOnDark className="h-8" />
              <p className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                A specialist cybersecurity firm delivering end-to-end protection for enterprises,
                SMBs and government entities.
              </p>
              <ul className="mt-6 flex gap-2.5">
                {SOCIALS.map(([name, Icon]) => (
                  <li key={name}>
                    <a
                      href="/"
                      aria-label={name}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:border-purple-bright hover:text-purple-bright"
                      style={{ borderColor: "rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.6)" }}
                    >
                      <Icon size={16} weight="fill" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[13px] font-semibold text-white">Services</h2>
              <ul className="mt-4 space-y-2.5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                {CAPABILITIES.map((c) => (
                  <li key={c.id}>
                    <Link to={`/capabilities#${c.id}`} className="transition-colors hover:text-white">
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[13px] font-semibold text-white">Company</h2>
              <ul className="mt-4 space-y-2.5 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                {COMPANY.map(([label, href]) => (
                  <li key={label}>
                    <Link to={href} className="transition-colors hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[13px] font-semibold text-white">Contact</h2>
              <ul className="mt-4 space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                <li className="flex items-start gap-2.5">
                  <EnvelopeSimple size={16} className="mt-0.5 shrink-0" style={{ color: "rgba(255,255,255,0.4)" }} aria-hidden="true" />
                  <a href={`mailto:${CONTACT.email}`} className="break-all transition-colors hover:text-white">
                    {CONTACT.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: "rgba(255,255,255,0.4)" }} aria-hidden="true" />
                  {CONTACT.location}
                </li>
              </ul>
              <div className="mt-6">
                <Btn to="/contact">Talk to an expert</Btn>
              </div>
            </div>
          </div>

          <div
            className="mt-14 flex flex-col gap-3 border-t pt-6 text-[12px] sm:flex-row sm:items-center sm:justify-between"
            style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}
          >
            <span>© {new Date().getFullYear()} Envista Cyber Defence. All rights reserved.</span>
            <span className="flex items-center gap-6">
              <Link to="/faq" className="transition-colors hover:text-white">
                Privacy
              </Link>
              <Link to="/faq" className="transition-colors hover:text-white">
                Terms
              </Link>
              <Link to="/faq" className="transition-colors hover:text-white">
                Cookie Policy
              </Link>
              <span aria-hidden="true" className="h-3 w-px" style={{ background: "rgba(255,255,255,0.16)" }} />
              <span className="font-medium text-purple-bright">From Risk to Resilience.</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
