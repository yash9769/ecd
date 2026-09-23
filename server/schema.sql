-- Envista Cyber Defence — database schema
--
-- Run once against a fresh Postgres database (createdb envista, then
-- psql envista -f schema.sql), or via `npm run migrate` from server/,
-- which applies this same file idempotently.
--
-- Scope note: this stage implements consent capture + policy notices
-- only (cookie banner + DPDP processing notice), not a self-service
-- Data Subject Request portal — so there is deliberately no
-- dsr_requests table yet. Add one when that portal is built.

CREATE EXTENSION IF NOT EXISTS pgcrypto; -- gen_random_uuid()

-- Contact form submissions.
--
-- Retention: 12 months from created_at (see the DPDP processing notice
-- on the contact form, which states this to the data subject). Nothing
-- here auto-deletes yet — run a periodic job such as:
--   DELETE FROM contact_submissions WHERE created_at < now() - interval '12 months';
-- on whatever scheduler is available on the deploy target.
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT NOT NULL,
  selected_services TEXT[] NOT NULL,
  message TEXT,
  heard_about TEXT,
  ip_address INET,
  user_agent TEXT,
  consent_given BOOLEAN NOT NULL,
  consent_timestamp TIMESTAMPTZ NOT NULL,
  consent_version TEXT NOT NULL DEFAULT '1.0',
  consent_session_id TEXT -- links to consent_records.session_id when the cookie-consent banner ran first
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions (created_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions (email);

-- Cookie consent (necessary/analytics/marketing) and the DPDP processing
-- consent captured on the contact form, keyed by a client-generated
-- session id stored in localStorage. One session can have several rows
-- over time (e.g. "reject all" now, "accept all" later after Manage
-- Preferences) — the latest row per session_id is the current state.
CREATE TABLE IF NOT EXISTS consent_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  session_id TEXT NOT NULL,
  email TEXT, -- filled in after a contact form submission links this session to a person
  necessary BOOLEAN NOT NULL DEFAULT TRUE,
  analytics BOOLEAN NOT NULL DEFAULT FALSE,
  marketing BOOLEAN NOT NULL DEFAULT FALSE,
  dpdp_processing_consent BOOLEAN NOT NULL DEFAULT FALSE,
  dpdp_consent_version TEXT NOT NULL DEFAULT '1.0',
  ip_address INET,
  user_agent TEXT,
  withdrawn_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_consent_records_session_id ON consent_records (session_id);
CREATE INDEX IF NOT EXISTS idx_consent_records_created_at ON consent_records (created_at);
