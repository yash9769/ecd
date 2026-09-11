import { useEffect, useRef, useState, type ReactNode } from "react";
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
        if (e.isIntersecting) {
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

/* Word-by-word text reveal — animates each word on scroll into view */
export function RevealText({
  text,
  className = "",
  stagger = 55,
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
        if (e.isIntersecting) {
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
  return (
    <span ref={ref} data-shown={shown ? "true" : "false"} className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          className="rt-word"
          style={{ transitionDelay: `${start + i * stagger}ms` }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
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
      <span className={tone === "light" ? "text-[#8b5cf6]" : "text-faint"}>{n}</span>
      <span className={`h-px w-8 ${tone === "light" ? "bg-[rgba(20,18,26,0.2)]" : "bg-line-strong"}`} />
      <span className={`uppercase ${tone === "light" ? "text-[#57545f]" : "text-muted"}`}>{children}</span>
    </div>
  );
}

export function Btn({
  children,
  variant = "solid",
  to,
  href,
  onClick,
}: {
  children: ReactNode;
  variant?: "solid" | "ghost" | "dark";
  to?: string;
  href?: string;
  onClick?: () => void;
}) {
  const base =
    "group inline-flex items-center gap-2.5 px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.18em] transition-all duration-300";
  const cls =
    variant === "solid"
      ? `${base} gradient-flow text-white hover:brightness-110`
      : variant === "dark"
        ? `${base} border border-[rgba(20,18,26,0.25)] text-[#14121a] hover:bg-[#14121a] hover:text-white`
        : `${base} border border-line-strong text-fg hover:border-purple-bright hover:bg-[rgba(139,92,246,0.08)]`;
  const style =
    variant === "solid"
      ? {
          backgroundImage: "linear-gradient(115deg,#6d28d9,#8b5cf6,#a78bfa,#6d28d9)",
          boxShadow:
            "0 0 0 1px rgba(196,181,253,0.35) inset, 0 12px 40px -12px rgba(124,58,237,0.8)",
        }
      : undefined;
  const inner = (
    <>
      {children}
      {variant !== "dark" && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      )}
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
        <h2 className="mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.04] tracking-[-0.02em] lg:text-[3.2rem]">
          <RevealText text={title} />
        </h2>
      </div>
      {aside && <div className="max-w-xs text-sm leading-relaxed">{aside}</div>}
    </div>
  );
}
