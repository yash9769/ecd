import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const notifyTo = process.env.NOTIFY_EMAIL_TO;
const fromAddress = process.env.NOTIFY_EMAIL_FROM || "Envista Website <onboarding@resend.dev>";

const resend = apiKey ? new Resend(apiKey) : null;

export type SubmissionForEmail = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  selectedServices: string[];
  message?: string | null;
  heardAbout?: string | null;
};

/* Best-effort notification: a submission is already durably stored in
   Postgres by the time this runs, so an email failure (missing API key,
   Resend outage, bad address) must never fail the request or lose the
   lead — it only logs. */
export async function sendSubmissionNotification(sub: SubmissionForEmail): Promise<void> {
  if (!resend || !notifyTo) {
    console.warn(
      "[email] RESEND_API_KEY or NOTIFY_EMAIL_TO not set — skipping submission notification. " +
        "The submission itself was still saved to the database.",
    );
    return;
  }

  const servicesList = sub.selectedServices.map((s) => `<li>${escapeHtml(s)}</li>`).join("");

  try {
    await resend.emails.send({
      from: fromAddress,
      to: notifyTo,
      replyTo: sub.email,
      subject: `New contact form submission — ${sub.firstName} ${sub.lastName} (${sub.company})`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(sub.firstName)} ${escapeHtml(sub.lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(sub.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(sub.phone)}</p>
        <p><strong>Company:</strong> ${escapeHtml(sub.company)}</p>
        <p><strong>Services of interest:</strong></p>
        <ul>${servicesList}</ul>
        ${sub.heardAbout ? `<p><strong>Heard about us via:</strong> ${escapeHtml(sub.heardAbout)}</p>` : ""}
        ${sub.message ? `<p><strong>Message:</strong><br/>${escapeHtml(sub.message).replace(/\n/g, "<br/>")}</p>` : ""}
      `,
    });
  } catch (err) {
    console.error("[email] failed to send submission notification:", err);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
