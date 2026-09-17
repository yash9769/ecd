import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { MagnifyingGlass, X, ArrowRight, ShieldCheck, Buildings, Globe, Sparkle } from "@phosphor-icons/react";
import { SERVICES_MEGA_MENU, INDUSTRIES, PLATFORM_CAPABILITIES } from "../data";

type SearchResult = {
  category: "Services" | "Industries" | "Platform" | "Solutions";
  title: string;
  desc: string;
  href: string;
};

export default function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent can toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Aggregate searchable items
  const allItems: SearchResult[] = [
    // Services
    ...SERVICES_MEGA_MENU.flatMap((cat) =>
      cat.items.map((item) => ({
        category: "Services" as const,
        title: item.title,
        desc: `Consulting & assessment under ${cat.category}`,
        href: item.href,
      }))
    ),
    // Platform Capabilities
    ...PLATFORM_CAPABILITIES.map((cap) => ({
      category: "Platform" as const,
      title: cap.title,
      desc: cap.tagline,
      href: "/capabilities#" + cap.id,
    })),
    // Industries
    ...INDUSTRIES.map((ind) => ({
      category: "Industries" as const,
      title: ind.name,
      desc: ind.promise,
      href: `/industries#${ind.slug}`,
    })),
    // Solutions
    {
      category: "Solutions" as const,
      title: "Brand Risk Monitoring & Dark Web Monitoring",
      desc: "Comprehensive outside-in anti-impersonation, credential tracking, and rogue domain takedowns",
      href: "/solutions/brm-dwm",
    },
    {
      category: "Solutions" as const,
      title: "DPDP Readiness Assessment",
      desc: "Digital Personal Data Protection Act compliance mapping and privacy governance",
      href: "/capabilities#dpdp",
    },
  ];

  const results = query.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.desc.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : allItems.slice(0, 6);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-20 sm:p-6 sm:pt-28 backdrop-blur-md bg-[#150c2e]/60 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[#e4dfef] bg-white shadow-2xl transition-all dark:border-white/15 dark:bg-[#120b26]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div className="flex items-center gap-3 border-b border-slate-200/80 px-4 py-3.5 dark:border-white/10">
          <MagnifyingGlass size={20} className="text-[#6d28d9] dark:text-[#a78bfa]" weight="bold" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Envista services, industries, or platform capabilities…"
            className="flex-1 bg-transparent text-sm text-[#0d1020] placeholder:text-slate-400 focus:outline-none dark:text-white"
          />
          <kbd className="hidden sm:inline-block rounded border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-3">
          <div className="px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {query.trim() ? "Search Results" : "Featured Envista Practices & Services"}
          </div>

          <div className="mt-1 space-y-1">
            {results.length > 0 ? (
              results.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => {
                    navigate(item.href);
                    onClose();
                  }}
                  className="group flex w-full items-center justify-between rounded-xl p-3 text-left transition-colors hover:bg-[#f6eefb] dark:hover:bg-[#1f153d] cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#6d28d9] transition-colors group-hover:bg-[#6d28d9] group-hover:text-white dark:bg-white/5 dark:text-[#c4b5fd] dark:group-hover:bg-[#6d28d9] dark:group-hover:text-white">
                      {item.category === "Services" && <ShieldCheck size={18} weight="bold" />}
                      {item.category === "Industries" && <Buildings size={18} weight="bold" />}
                      {item.category === "Platform" && <Sparkle size={18} weight="bold" />}
                      {item.category === "Solutions" && <Globe size={18} weight="bold" />}
                    </span>
                    <div>
                      <div className="font-display text-sm font-bold text-[#0d1020] group-hover:text-[#6d28d9] dark:text-white dark:group-hover:text-[#c4b5fd]">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:bg-white/10 dark:text-slate-400">
                      {item.category}
                    </span>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-[#6d28d9] dark:group-hover:text-[#c4b5fd]" />
                  </div>
                </button>
              ))
            ) : (
              <div className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                No matching services or resources found for "{query}".
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-200/80 bg-slate-50/50 px-4 py-2.5 font-mono text-[11px] text-slate-500 dark:border-white/10 dark:bg-[#0d071e]/40 dark:text-slate-400">
          <span>Envista Cyber Defence Navigation</span>
          <span className="text-[#6d28d9] dark:text-[#a78bfa]">From Risk to Resilience</span>
        </div>
      </div>
    </div>
  );
}
