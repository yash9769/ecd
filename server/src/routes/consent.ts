import { Router, type Request, type Response } from "express";
import { randomUUID } from "node:crypto";
import { pool } from "../db.js";

export const consentRouter = Router();

type ConsentBody = {
  sessionId?: unknown;
  necessary?: unknown;
  analytics?: unknown;
  marketing?: unknown;
  dpdpProcessingConsent?: unknown;
};

/* One call handles both "first choice on this device" (no sessionId yet
   — the client hasn't minted one) and "changed my mind later" (sessionId
   already in localStorage from a prior call): either way we insert a new
   row, since consent_records is an append-only history, not a row you
   update in place. The session id is echoed back so the client can start
   persisting it from the very first call. */
consentRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body as ConsentBody;

  const sessionId = typeof body.sessionId === "string" && body.sessionId.trim() ? body.sessionId.trim() : randomUUID();

  const necessary = true; // strictly necessary cookies are never optional
  const analytics = body.analytics === true;
  const marketing = body.marketing === true;
  const dpdpProcessingConsent = body.dpdpProcessingConsent === true;

  const ip = req.ip ?? null;
  const userAgent = req.get("user-agent") ?? null;

  try {
    const result = await pool.query(
      `INSERT INTO consent_records
         (session_id, necessary, analytics, marketing, dpdp_processing_consent, dpdp_consent_version, ip_address, user_agent)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING id, created_at`,
      [sessionId, necessary, analytics, marketing, dpdpProcessingConsent, "1.0", ip, userAgent],
    );

    return res.status(201).json({
      id: result.rows[0].id,
      sessionId,
      createdAt: result.rows[0].created_at,
    });
  } catch (err) {
    console.error("[consent] insert failed:", err);
    return res.status(500).json({ error: "internal_error" });
  }
});

/* Marks the most recent consent row for a session as withdrawn. Also
   append-only in spirit: withdrawal is recorded on the existing latest
   row rather than by inserting a new "all false" row, so the original
   grant and its later withdrawal both stay visible in history. */
consentRouter.patch("/:sessionId/withdraw", async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  if (!sessionId) {
    return res.status(400).json({ error: "sessionId is required" });
  }

  try {
    const result = await pool.query(
      `UPDATE consent_records
       SET withdrawn_at = now(), analytics = FALSE, marketing = FALSE, dpdp_processing_consent = FALSE
       WHERE id = (SELECT id FROM consent_records WHERE session_id = $1 ORDER BY created_at DESC LIMIT 1)
       RETURNING id, withdrawn_at`,
      [sessionId],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "no consent record found for this session" });
    }

    return res.status(200).json({ id: result.rows[0].id, withdrawnAt: result.rows[0].withdrawn_at });
  } catch (err) {
    console.error("[consent] withdraw failed:", err);
    return res.status(500).json({ error: "internal_error" });
  }
});
