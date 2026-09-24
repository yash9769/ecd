import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ShieldCheck, Gear, Check, X } from "@phosphor-icons/react";
import { getConsentSessionId, recordConsent, withdrawConsent } from "../lib/api";

const CHOICE_KEY = "envista_cookie_choice";

type Categories = { analytics: boolean; marketing: boolean };

function loadStoredChoice(): Categories | null {
  try {
    const raw = localStorage.getItem(CHOICE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.analytics === "boolean" && typeof parsed?.marketing === "boolean") return parsed;
    return null;
  } catch {
    return null;
  }
}

function storeChoice(choice: Categories): void {
  try {
    localStorage.setItem(CHOICE_KEY, JSON.stringify(choice));
  } catch {
    // Choice still applies for this page load even if it can't persist.
  }
}

/* Floating dark glassmorphism cookie card at bottom-left corner */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [managing, setManaging] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!loadStoredChoice()) setVisible(true);
  }, []);

  async function apply(choice: Categories) {
    storeChoice(choice);
    setVisible(false);
    await recordConsent({ analytics: choice.analytics, marketing: choice.marketing });
  }

  function acceptAll() {
    void apply({ analytics: true, marketing: true });
  }

  function rejectOptional() {
    void apply({ analytics: false, marketing: false });
  }

  function savePreferences() {
    void apply({ analytics, marketing });
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-[999] transition-all duration-300"
    >
      <div className="relative overflow-hidden rounded-2xl border border-violet-500/35 bg-[#090518]/95 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(168,85,247,0.2)] backdrop-blur-2xl text-white">
        {/* Subtle Ambient Background Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-violet-600/20 blur-3xl"
        />

        {/* Header with Icon & DPDP Tag */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-500/40 bg-violet-500/15 text-violet-300 shadow-inner">
              <ShieldCheck size={20} weight="bold" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-white tracking-tight">
                Privacy &amp; Cookie Consent
              </h4>
              <span className="inline-block mt-0.5 rounded-full bg-violet-500/20 px-2 py-0.5 font-mono text-[9px] font-bold text-violet-300 uppercase tracking-wider border border-violet-500/30">
                DPDP Act 2023 Compliant
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={rejectOptional}
            className="text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
            title="Dismiss"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        {/* Body Text */}
        <p className="mt-3 text-xs leading-relaxed text-slate-300">
          Envista Cyber Defence uses essential cookies for platform security, and optional analytics to improve cyber threat intelligence. See our{" "}
          <Link to="/about" className="text-sky-300 underline hover:text-white">
            Privacy Policy
          </Link>{" "}
          for details.
        </p>

        {/* Preferences Toggles Drawer */}
        {managing && (
          <div className="mt-3.5 pt-3.5 border-t border-white/10 space-y-2.5">
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
              <div>
                <span className="text-xs font-semibold text-white">Essential Security</span>
                <p className="text-[10px] text-slate-400">CSRF protection &amp; session integrity.</p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">Always On</span>
            </div>

            <label className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] p-2.5 cursor-pointer hover:border-violet-500/40 transition-colors">
              <div>
                <span className="text-xs font-semibold text-white">Threat Analytics</span>
                <p className="text-[10px] text-slate-400">Telemetry &amp; aggregate traffic insights.</p>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-slate-900 text-violet-500 focus:ring-0 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] p-2.5 cursor-pointer hover:border-violet-500/40 transition-colors">
              <div>
                <span className="text-xs font-semibold text-white">Advisory Outreach</span>
                <p className="text-[10px] text-slate-400">Tailored cybersecurity updates.</p>
              </div>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-slate-900 text-violet-500 focus:ring-0 cursor-pointer"
              />
            </label>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap items-center justify-end gap-2 pt-1 border-t border-white/10">
          {managing ? (
            <button
              type="button"
              onClick={savePreferences}
              className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white shadow-lg transition-all hover:bg-violet-500 cursor-pointer"
            >
              <Check size={13} weight="bold" />
              <span>Save Preferences</span>
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setManaging(true)}
                className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-white/30 hover:bg-white/10 cursor-pointer"
              >
                <Gear size={13} weight="bold" />
                <span>Options</span>
              </button>
              <button
                type="button"
                onClick={rejectOptional}
                className="rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white transition-all hover:bg-white/20 cursor-pointer"
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all hover:from-violet-500 hover:to-indigo-500 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Accept All
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function resetCookieConsent(): void {
  try {
    localStorage.removeItem(CHOICE_KEY);
  } catch {
    /* ignore */
  }
  if (getConsentSessionId()) void withdrawConsent();
  window.location.reload();
}
