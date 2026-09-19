import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";

/* Scroll-triggered reveal wrapper (fade + rise) */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: any;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        // Also reveal when the element is already above the viewport: a fast
        // flick can carry it past before the observer delivers, which would
        // otherwise leave the section blank until the user scrolled back.
        if (e.isIntersecting || e.boundingClientRect.top < 0) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref as any}
      data-reveal=""
      data-shown={shown ? "true" : "false"}
      style={{ transitionDelay: `${delay}ms` }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/* Word-by-word text reveal on scroll into view.
   Word-splitting only pays off on short display headings. Past ~8 words the
   last word lands so late the whole line reads as lag, so longer copy fades
   in as a single unit instead. */
const MAX_SPLIT_WORDS = 8;

export function RevealText({
  text,
  className = "",
  stagger = 70,
  start = 0,
}: {
  text: string;
  className?: string;
  stagger?: number;
  start?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting || e.boundingClientRect.top < 0) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const words = text.split(" ");
  const parts = words.length > MAX_SPLIT_WORDS ? [text] : words;
  return (
    <span ref={ref} data-shown={shown ? "true" : "false"} className={className}>
      {parts.map((w, i) => (
        <Fragment key={i}>
          <span className="rt-word" style={{ transitionDelay: `${start + i * stagger}ms` }}>
            {w}
          </span>
          {/* Separator sits BETWEEN the inline-block spans, not inside them:
              a trailing space within an inline-block gets trimmed, which is
              why this was a non-breaking space before — but that also stopped
              headings from ever wrapping. */}
          {i < parts.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </span>
  );
}

/* Small-caps section label used throughout the reference layout. */
export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <div
      className={`font-mono text-[11px] uppercase tracking-[0.22em] ${
        tone === "light" ? "text-purple-deep" : "text-purple-bright"
      }`}
    >
      {children}
    </div>
  );
}

export function Kicker({
  n,
  children,
  tone = "dark",
}: {
  n: string;
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] text-purple-bright">
      <span className={tone === "light" ? "text-purple-deep" : "text-faint"}>{n}</span>
      <span className={`h-px w-8 ${tone === "light" ? "bg-[color:var(--color-paper-line)]" : "bg-line-strong"}`} />
      <span className={`uppercase ${tone === "light" ? "text-[color:var(--color-paper-muted)]" : "text-muted"}`}>{children}</span>
    </div>
  );
}

export function Btn({
  children,
  variant = "solid",
  to,
  href,
  onClick,
  className = "",
}: {
  children: ReactNode;
  variant?: "solid" | "ghost" | "light" | "navy" | "primary";
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const base =
    "group inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full px-6 py-3 text-[13px] font-semibold tracking-[0.01em] transition-all duration-200";
  const cls =
    (variant === "primary"
      ? `${base} bg-[#B4FF00] text-[#0d1020] hover:brightness-110 shadow-[0_0_20px_rgba(180,255,0,0.3)] hover:shadow-[0_0_25px_rgba(180,255,0,0.5)]`
      : variant === "solid"
      ? `${base} text-white hover:brightness-110`
      : variant === "navy"
        ? `${base} text-white hover:brightness-125`
        : variant === "light"
          ? `${base} border border-[color:var(--color-paper-line)] text-[color:var(--color-paper-fg)] hover:border-[color:var(--color-purple-deep)] hover:text-[color:var(--color-purple-deep)]`
          : `${base} border border-line-strong text-fg hover:border-purple-bright hover:bg-[rgba(139,92,246,0.1)]`) +
    (className ? ` ${className}` : "");
  const style =
    variant === "solid"
      ? {
          backgroundImage: "linear-gradient(120deg,#7c3aed,#8b5cf6 55%,#a78bfa)",
          boxShadow: "0 6px 20px -10px rgba(124,58,237,0.75)",
        }
      : variant === "navy"
        ? { backgroundColor: "var(--color-paper-fg)" }
        : undefined;
  const inner = (
    <>
      {children}
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </>
  );
  if (to)
    return (
      <Link to={to} className={cls} style={style} onClick={onClick}>
        {inner}
      </Link>
    );
  return (
    <a href={href ?? "#"} className={cls} style={style} onClick={onClick}>
      {inner}
    </a>
  );
}

/* Shared section heading */
export function SectionHead({
  n,
  kicker,
  title,
  aside,
  tone = "dark",
}: {
  n: string;
  kicker: string;
  title: string;
  aside?: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <div>
        <Kicker n={n} tone={tone}>
          {kicker}
        </Kicker>
        <h2 className="mt-6 max-w-2xl display-lg">
          <RevealText text={title} />
        </h2>
      </div>
      {aside && <div className="max-w-xs text-sm leading-relaxed">{aside}</div>}
    </div>
  );
}
