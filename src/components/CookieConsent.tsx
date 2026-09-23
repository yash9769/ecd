import { useEffect, useState } from "react";
import { Link } from "react-router";
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

/* Fixed bottom banner shown once per browser until a choice is made. The
   choice (necessary/analytics/marketing) is written to the DB via
   POST /api/consent — see server/schema.sql `consent_records` — and
   mirrored in localStorage so the banner doesn't reappear on the same
   device. "Manage Preferences" reveals the two optional toggles inline
   rather than opening a separate modal, since there are only two. */
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
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-slate-200 bg-white/97 px-4 py-5 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:px-6 dark:border-white/10 dark:bg-[#0a0714]/97"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">We use cookies</p>
          <p className="mt-1 text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">
            We use necessary cookies to run this site, and optional analytics/marketing cookies to
            understand traffic and improve our services. See our{" "}
            <Link to="/about" className="text-purple-700 underline hover:text-purple-900 dark:text-violet-300 dark:hover:text-white">
              Privacy Policy
            </Link>{" "}
            for details.
          </p>

          {managing && (
            <div className="mt-4 space-y-3 border-t border-slate-200 pt-4 dark:border-white/10">
              <label className="flex items-start gap-3 opacity-60">
                <input type="checkbox" checked disabled className="mt-0.5 h-4 w-4 rounded" />
                <span className="text-[13px] text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Necessary</span> — required for the site to function.
                  Always on.
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 select-none">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-purple-700 focus:ring-0"
                />
                <span className="text-[13px] text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Analytics</span> — helps us understand how the site is
                  used.
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 select-none">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-purple-700 focus:ring-0"
                />
                <span className="text-[13px] text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Marketing</span> — used to tailor communications to
                  your interests.
                </span>
              </label>
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2.5">
          {managing ? (
            <button
              type="button"
              onClick={savePreferences}
              className="rounded-full bg-purple-700 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-purple-800"
            >
              Save preferences
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setManaging(true)}
                className="rounded-full border border-slate-300 px-5 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:border-purple-700 hover:text-purple-700 dark:border-white/20 dark:text-slate-200 dark:hover:border-violet-300 dark:hover:text-violet-300"
              >
                Manage Preferences
              </button>
              <button
                type="button"
                onClick={rejectOptional}
                className="rounded-full border border-slate-300 px-5 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:border-purple-700 hover:text-purple-700 dark:border-white/20 dark:text-slate-200 dark:hover:border-violet-300 dark:hover:text-violet-300"
              >
                Reject Optional
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-purple-700 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-purple-800"
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

/* Exposed for a future "Cookie Preferences" link in the footer/privacy
   page — re-opens the choice by clearing the stored decision, withdrawing
   the existing consent record server-side, and reloading so the banner
   reappears fresh. */
export function resetCookieConsent(): void {
  try {
    localStorage.removeItem(CHOICE_KEY);
  } catch {
    /* ignore */
  }
  if (getConsentSessionId()) void withdrawConsent();
  window.location.reload();
}
