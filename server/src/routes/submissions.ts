import { Router, type Request, type Response } from "express";
import { pool } from "../db.js";
import { sendSubmissionNotification } from "../email.js";

export const submissionsRouter = Router();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type SubmissionBody = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  selectedServices?: unknown;
  message?: unknown;
  heardAbout?: unknown;
  consent?: unknown;
  consentSessionId?: unknown;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

/* Mirrors the validation already run client-side in src/pages/Contact.tsx
   (required fields, email pattern, 8-15 digit phone, at least one
   service, consent checkbox) — the server can't trust the client to have
   actually enforced it. */
function validate(body: SubmissionBody): string[] {
  const errors: string[] = [];

  if (!isNonEmptyString(body.firstName)) errors.push("First name is required.");
  if (!isNonEmptyString(body.lastName)) errors.push("Last name is required.");

  if (!isNonEmptyString(body.email)) {
    errors.push("Email address is required.");
  } else if (!EMAIL_PATTERN.test(body.email.trim())) {
    errors.push("Please enter a valid email address.");
  }

  if (!isNonEmptyString(body.phone)) {
    errors.push("Phone number is required.");
  } else {
    const digits = body.phone.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) errors.push("Phone number must be between 8 and 15 digits.");
  }

  if (!isNonEmptyString(body.company)) errors.push("Company name is required.");

  if (!Array.isArray(body.selectedServices) || body.selectedServices.length === 0) {
    errors.push("Please select at least one service.");
  } else if (!body.selectedServices.every((s) => typeof s === "string")) {
    errors.push("Selected services must be a list of strings.");
  }

  if (body.consent !== true) errors.push("Consent to the privacy policy is required.");

  return errors;
}

submissionsRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body as SubmissionBody;
  const errors = validate(body);
  if (errors.length > 0) {
    return res.status(400).json({ error: "validation_failed", details: errors });
  }

  const firstName = (body.firstName as string).trim();
  const lastName = (body.lastName as string).trim();
  const email = (body.email as string).trim();
  const phone = (body.phone as string).trim();
  const company = (body.company as string).trim();
  const selectedServices = body.selectedServices as string[];
  const message = isNonEmptyString(body.message) ? body.message.trim() : null;
  const heardAbout = isNonEmptyString(body.heardAbout) ? body.heardAbout.trim() : null;
  const consentSessionId = isNonEmptyString(body.consentSessionId) ? body.consentSessionId.trim() : null;

  const ip = req.ip ?? null;
  const userAgent = req.get("user-agent") ?? null;
  const now = new Date();

  try {
    const result = await pool.query(
      `INSERT INTO contact_submissions
         (first_name, last_name, email, phone, company, selected_services,
          message, heard_about, ip_address, user_agent,
          consent_given, consent_timestamp, consent_version, consent_session_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
       RETURNING id, created_at`,
      [
        firstName,
        lastName,
        email,
        phone,
        company,
        selectedServices,
        message,
        heardAbout,
        ip,
        userAgent,
        true,
        now,
        "1.0",
        consentSessionId,
      ],
    );

    // Link this session's consent record to the email address that just
    // identified itself, if a consent session was passed. Best-effort:
    // never block or fail the submission over it.
    if (consentSessionId) {
      pool
        .query(
          `UPDATE consent_records SET email = $1
           WHERE session_id = $2 AND email IS NULL
           AND id = (SELECT id FROM consent_records WHERE session_id = $2 ORDER BY created_at DESC LIMIT 1)`,
          [email, consentSessionId],
        )
        .catch((err) => console.error("[submissions] failed to link consent session to email:", err));
    }

    // Fire-and-forget: the row is already durably saved, so an email
    // failure must not turn into a failed submission for the visitor.
    void sendSubmissionNotification({
      firstName,
      lastName,
      email,
      phone,
      company,
      selectedServices,
      message,
      heardAbout,
    });

    return res.status(201).json({ id: result.rows[0].id, createdAt: result.rows[0].created_at });
  } catch (err) {
    console.error("[submissions] insert failed:", err);
    return res.status(500).json({ error: "internal_error" });
  }
});
