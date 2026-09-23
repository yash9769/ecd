/* Thin client for the Envista API (see server/README.md). Every call is
   best-effort from the caller's point of view where that's the right
   default (consent), and surfaces real errors where the user needs to
   know their submission didn't go through (the contact form). */

const API_URL = import.meta.env.VITE_API_URL as string | undefined;

const CONSENT_SESSION_KEY = "envista_consent_session_id";

function apiUrl(path: string): string | null {
  if (!API_URL) {
    console.warn(`[api] VITE_API_URL is not set — cannot call ${path}. See .env.example.`);
    return null;
  }
  return `${API_URL.replace(/\/$/, "")}${path}`;
}

export type ConsentChoice = {
  analytics: boolean;
  marketing: boolean;
  dpdpProcessingConsent?: boolean;
};

export function getConsentSessionId(): string | null {
  try {
    return localStorage.getItem(CONSENT_SESSION_KEY);
  } catch {
    return null;
  }
}

function setConsentSessionId(id: string): void {
  try {
    localStorage.setItem(CONSENT_SESSION_KEY, id);
  } catch {
    // Private-mode/blocked storage: the choice still applies for this
    // page load, it just won't be remembered on the next visit.
  }
}

/* Records a cookie/DPDP consent choice. Never throws — a consent-logging
   failure must not block the visitor from using the site, and there is
   nothing useful to show them if it fails. */
export async function recordConsent(choice: ConsentChoice): Promise<void> {
  const url = apiUrl("/api/consent");
  if (!url) return;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: getConsentSessionId(), ...choice }),
    });
    if (!res.ok) {
      console.error("[api] recordConsent failed:", res.status, await res.text().catch(() => ""));
      return;
    }
    const data = (await res.json()) as { sessionId: string };
    if (data.sessionId) setConsentSessionId(data.sessionId);
  } catch (err) {
    console.error("[api] recordConsent network error:", err);
  }
}

/* Marks the current session's consent as withdrawn. Best-effort, same
   reasoning as recordConsent. */
export async function withdrawConsent(): Promise<void> {
  const sessionId = getConsentSessionId();
  const url = sessionId ? apiUrl(`/api/consent/${encodeURIComponent(sessionId)}/withdraw`) : null;
  if (!url) return;

  try {
    await fetch(url, { method: "PATCH" });
  } catch (err) {
    console.error("[api] withdrawConsent network error:", err);
  }
}

export type SubmissionPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  selectedServices: string[];
  message?: string;
  heardAbout?: string;
  consent: boolean;
};

export type SubmissionResult = { ok: true; id: string } | { ok: false; error: string };

/* Submits the contact form. Unlike recordConsent, a failure here matters
   to the caller — Contact.tsx needs to know whether to show its success
   state or an error. */
export async function submitContactForm(payload: SubmissionPayload): Promise<SubmissionResult> {
  const url = apiUrl("/api/submissions");
  if (!url) {
    return { ok: false, error: "The contact API isn't configured. Please try again later." };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, consentSessionId: getConsentSessionId() }),
    });

    if (res.status === 429) {
      return { ok: false, error: "Too many submissions from this address. Please try again later." };
    }

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      const detail = Array.isArray(body?.details) ? body.details.join(" ") : null;
      return { ok: false, error: detail ?? "Something went wrong. Please try again." };
    }

    const data = (await res.json()) as { id: string };
    return { ok: true, id: data.id };
  } catch {
    return { ok: false, error: "Couldn't reach the server. Please check your connection and try again." };
  }
}
