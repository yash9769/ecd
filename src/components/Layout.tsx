import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import Logo from "./Logo";
import { Btn } from "./ui";
import { CursorGlow, Magnetic } from "./motion";
import { NAV, CAPABILITIES } from "../data";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  return (
    <div className="min-h-full overflow-x-hidden bg-ink text-fg antialiased">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-purple-deep focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-white"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <CursorGlow />

      {/* Ambient ground. Deliberately restrained: a faint structural grid and a
          single low cool wash. The page's colour comes from content that has
          earned it, not from a full-screen purple gradient. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div
          className="absolute -top-64 right-[-20%] h-[820px] w-[820px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(91,33,182,0.16),transparent 66%)" }}
        />
      </div>

      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-4 lg:px-10">
          <Link to="/" className="flex items-center">
            <Logo className="h-7 lg:h-8" />
          </Link>
          <nav className="hidden items-center gap-9 lg:flex">
            {NAV.map(([label, href]) => (
              <NavLink
                key={label}
                to={href}
                className={({ isActive }) =>
                  `nav-underline font-mono text-[12px] uppercase tracking-[0.16em] transition-colors hover:text-fg ${
                    isActive ? "is-active text-fg" : "text-muted"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Magnetic strength={0.5}>
              <Btn to="/contact">Get Protected</Btn>
            </Magnetic>
          </div>
          <button
            className="font-mono text-xs uppercase tracking-widest text-muted lg:hidden"
            onClick={() => setMenu((m) => !m)}
          >
            {menu ? "Close" : "Menu"}
          </button>
        </div>
        {menu && (
          <div className="border-t border-line bg-ink px-6 py-5 lg:hidden">
            {NAV.map(([label, href]) => (
              <NavLink
                key={label}
                to={href}
                onClick={() => setMenu(false)}
                className="block py-2.5 font-mono text-sm uppercase tracking-widest text-muted"
              >
                {label}
              </NavLink>
            ))}
            <div className="pt-4">
              <Btn to="/contact" onClick={() => setMenu(false)}>
                Get Protected
              </Btn>
            </div>
          </div>
        )}
      </header>

      <main id="main" key={pathname} className="page-in relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-line bg-ink">
        <div className="mx-auto max-w-[1320px] px-6 py-16 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <Logo className="h-10" />
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
                Built to stop what others miss — cyber defence for organizations, individuals
                and governments.
              </p>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Capabilities</div>
              <ul className="mt-5 space-y-3 text-sm text-muted">
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
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Company</div>
              <ul className="mt-5 space-y-3 text-sm text-muted">
                <li><Link to="/about" className="hover:text-fg">About</Link></li>
                <li><Link to="/methodology" className="hover:text-fg">Methodology</Link></li>
                <li><Link to="/insights" className="hover:text-fg">Insights</Link></li>
                <li><Link to="/faq" className="hover:text-fg">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-fg">Get Protected</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-faint sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Envista Cyber Defence</span>
            <span>Compliance-first · Defence-led</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
