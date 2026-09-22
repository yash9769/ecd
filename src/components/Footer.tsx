import React from "react";
import { Link } from "react-router";
import { LinkedinLogo, XLogo, YoutubeLogo } from "@phosphor-icons/react";
import logoDarkUrl from "../imports/envista-logo-dark.png";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "Offensive Security", href: "/capabilities" },
      { label: "Defensive Security", href: "/capabilities" },
      { label: "GRC & Compliance", href: "/capabilities" },
      { label: "DPDP Readiness", href: "/capabilities" },
      { label: "AI Security", href: "/capabilities" },
      { label: "Security Awareness", href: "/capabilities" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Manufacturing", href: "/industries" },
      { label: "Financial Services", href: "/industries" },
      { label: "Healthcare", href: "/industries" },
      { label: "Technology", href: "/industries" },
      { label: "Education", href: "/industries" },
      { label: "And more", href: "/industries" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Insights", href: "/insights" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/faq" },
      { label: "Terms of Service", href: "/faq" },
      { label: "Cookie Policy", href: "/faq" },
      { label: "Responsible Disclosure", href: "/faq" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    icon: LinkedinLogo,
    href: "https://www.linkedin.com/company/envista-cyber-defence/",
  },
  {
    name: "X",
    icon: XLogo,
    href: "https://x.com",
  },
  {
    name: "YouTube",
    icon: YoutubeLogo,
    href: "https://youtube.com",
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-violet-500/20 bg-[#050713] text-white">
      {/* Top subtle ambient light streaks / aurora glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-36 w-3/4 max-w-4xl rounded-full bg-gradient-to-r from-cyan-500/15 via-violet-600/25 to-indigo-500/15 blur-[60px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent"
      />

      <div className="mx-auto max-w-[1360px] px-6 sm:px-8 lg:px-12 pt-12 pb-8">
        {/* Main Grid: Columns & Socials matching reference image */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-8 pb-12">
          {/* Left Brand Identity: Authentic Envista Cyber Defence Logo (Dark Mode) */}
          <div className="shrink-0 max-w-xs space-y-3">
            <Link to="/" className="inline-block transition-opacity hover:opacity-90">
              <img
                src={logoDarkUrl}
                alt="Envista Cyber Defence"
                width={1695}
                height={516}
                className="h-8 sm:h-9 w-auto select-none object-contain"
                draggable={false}
              />
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              Sovereign, adversary-grade cybersecurity architecture, defensive intelligence, and enterprise resilience across India and the GCC.
            </p>
          </div>

          {/* Nav Columns (Services, Industries, Resources, Company, Legal) */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5 flex-1 lg:max-w-4xl">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="space-y-3">
                <h3 className="text-sm font-semibold tracking-wide text-[#c084fc]">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-[13px] text-slate-400 transition-colors duration-150 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Top-Right Social Media Buttons matching image */}
          <div className="shrink-0 flex items-center gap-2.5 lg:self-start">
            {SOCIAL_LINKS.map(({ name, icon: Icon, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-slate-300 transition-all duration-200 hover:border-violet-400/60 hover:bg-violet-600/20 hover:text-white hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:scale-105"
              >
                <Icon size={17} weight="bold" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright on left, Slogan on right */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Envista Cyber Defence. All rights reserved.
          </div>
          <div className="text-slate-400 font-normal tracking-wide">
            Security beyond the surface.
          </div>
        </div>
      </div>
    </footer>
  );
}
