import { useEffect, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";

export type Theme = "light" | "dark";

export function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored === "dark" || stored === "light") {
    return stored;
  }
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "theme" && (e.newValue === "dark" || e.newValue === "light")) {
        setTheme(e.newValue);
      }
    };
    const handleCustom = () => {
      const current = localStorage.getItem("theme") as Theme;
      if (current && current !== theme) {
        setTheme(current);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("theme-change", handleCustom);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("theme-change", handleCustom);
    };
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    const root = document.documentElement;
    if (next === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    window.dispatchEvent(new Event("theme-change"));
  };

  return { theme, toggleTheme, isDark: theme === "dark" };
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`group relative inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105 active:scale-95 ${
        isDark
          ? "border-violet-500/30 bg-[#17142b] text-amber-300 hover:border-violet-400/50 hover:bg-[#201b3d] hover:shadow-[0_0_12px_rgba(167,139,250,0.3)]"
          : "border-slate-200/80 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
      } ${className}`}
    >
      <span className="sr-only">Toggle theme</span>
      <div className="relative flex items-center justify-center">
        {isDark ? (
          <Sun
            size={18}
            weight="fill"
            className="rotate-0 scale-100 text-amber-300 transition-all duration-300 group-hover:rotate-45"
            aria-hidden="true"
          />
        ) : (
          <Moon
            size={18}
            weight="fill"
            className="rotate-0 scale-100 text-indigo-900 transition-all duration-300 group-hover:-rotate-12"
            aria-hidden="true"
          />
        )}
      </div>
    </button>
  );
}
