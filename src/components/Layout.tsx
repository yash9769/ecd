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
import { CursorGlow, Magnetic } from "./motion";
import { CAPABILITIES, CONTACT, NAV } from "../data";

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
     container, which silently breaks position: sticky for every descendant —
     it stopped the pinned hero sequence from pinning at all. `clip` crops the
     same way without establishing a scrollport. */
  return (
    <div className="min-h-full overflow-x-clip bg-ink text-fg antialiased">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-purple-deep focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <CursorGlow />

      {/* Ambient ground: a faint structural grid only. Colour comes from
          content that has earned it, not a full-screen wash. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="bg-grid absolute inset-0 opacity-30" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-6 py-4 lg:px-10">
          <Link to="/" className="flex shrink-0 items-center" aria-label="Envista Cyber Defence — home">
            <Logo className="h-7" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {NAV.map(([label, href]) => (
              <NavLink
                key={label}
                to={href}
                className={({ isActive }) =>
                  `nav-underline text-[13px] font-medium transition-colors hover:text-fg ${
                    isActive ? "is-active text-fg" : "text-muted"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <button
              type="button"
              aria-label="Search"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-fg"
            >
              <MagnifyingGlass size={17} aria-hidden="true" />
            </button>
            <Magnetic strength={0.35}>
              <Btn to="/contact">Talk to an Expert</Btn>
            </Magnetic>
          </div>

          <button
            type="button"
            aria-expanded={menu}
            aria-controls="mobile-nav"
            className="rounded-full border border-line-strong px-4 py-2 text-xs font-semibold text-muted lg:hidden"
            onClick={() => setMenu((m) => !m)}
          >
            {menu ? "Close" : "Menu"}
          </button>
        </div>

        {menu && (
          <div id="mobile-nav" className="border-t border-line bg-ink px-6 py-5 lg:hidden">
            {NAV.map(([label, href]) => (
              <NavLink
                key={label}
                to={href}
                onClick={() => setMenu(false)}
                className="block py-2.5 text-sm font-medium text-muted"
              >
                {label}
              </NavLink>
            ))}
            <div className="pt-4">
              <Btn to="/contact" onClick={() => setMenu(false)}>
                Talk to an Expert
              </Btn>
            </div>
          </div>
        )}
      </header>

      <main id="main" key={pathname} className="page-in relative z-10">
        <Outlet />
      </main>

      <footer className="relative z-10 border-t border-line bg-ink-2">
        <div className="mx-auto max-w-[1240px] px-6 py-16 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
            <div>
              <Logo className="h-8" />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
                A specialist cybersecurity firm delivering end-to-end protection for enterprises,
                SMBs and government entities.
              </p>
              <ul className="mt-6 flex gap-2.5">
                {SOCIALS.map(([name, Icon]) => (
                  <li key={name}>
                    <a
                      href="/"
                      aria-label={name}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:border-purple-bright hover:text-purple-bright"
                    >
                      <Icon size={16} weight="fill" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[13px] font-semibold text-fg">Services</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-muted">
                {CAPABILITIES.map((c) => (
                  <li key={c.id}>
                    <Link to={`/capabilities#${c.id}`} className="transition-colors hover:text-fg">
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[13px] font-semibold text-fg">Company</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-muted">
                {COMPANY.map(([label, href]) => (
                  <li key={label}>
                    <Link to={href} className="transition-colors hover:text-fg">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[13px] font-semibold text-fg">Contact</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li className="flex items-start gap-2.5">
                  <EnvelopeSimple size={16} className="mt-0.5 shrink-0 text-faint" aria-hidden="true" />
                  <a href={`mailto:${CONTACT.email}`} className="break-all transition-colors hover:text-fg">
                    {CONTACT.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-faint" aria-hidden="true" />
                  {CONTACT.location}
                </li>
              </ul>
              <div className="mt-6">
                <Btn to="/contact">Talk to an expert</Btn>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-[12px] text-faint sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Envista Cyber Defence. All rights reserved.</span>
            <span className="flex gap-6">
              <Link to="/faq" className="transition-colors hover:text-muted">
                Privacy Policy
              </Link>
              <Link to="/faq" className="transition-colors hover:text-muted">
                Terms of Service
              </Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
