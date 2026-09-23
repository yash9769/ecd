# Envista API

Express + PostgreSQL backend for the Envista Cyber Defence website: contact
form submissions and cookie/DPDP consent records. Deployed separately from
the static frontend (this project targets a general Node-capable host —
e.g. a BharatCloud VM — not a specific serverless platform).

## Endpoints

- `GET /api/health` — liveness check.
- `POST /api/submissions` — validates and inserts a contact form row,
  sends a best-effort email notification (Resend) if configured.
- `POST /api/consent` — inserts a cookie/DPDP consent record; returns
  `{ id, sessionId, createdAt }`. Pass an existing `sessionId` to record a
  later change from the same browser; omit it to mint a new one.
- `PATCH /api/consent/:sessionId/withdraw` — marks that session's latest
  consent record as withdrawn (all optional categories set to false).

## Local development

Requires Docker (for Postgres) or a local Postgres install.

```bash
cd server
cp .env.example .env
# fill in CORS_ORIGIN (your Vite dev origin, e.g. http://localhost:5173)
# and, optionally, RESEND_API_KEY / NOTIFY_EMAIL_TO / NOTIFY_EMAIL_FROM

# Option A — Postgres via Docker, API on the host:
docker compose up -d db
npm install
npm run migrate   # applies schema.sql
npm run dev       # tsx watch on src/index.ts, http://localhost:3001

# Option B — everything in Docker:
docker compose up --build
# then, in a separate shell, run the migration once against the running db:
docker compose exec db psql -U envista -d envista -f /dev/stdin < schema.sql
```

## Deploying to a VM (BharatCloud or similar)

This is a plain Node/Express app with no platform-specific build step, so
any of these work:

**With Docker (recommended — matches local dev exactly):**

```bash
# on the VM, after cloning the repo
cd server
cp .env.example .env   # fill in real DATABASE_URL, CORS_ORIGIN, RESEND_* values
docker compose up -d --build
# apply the schema once (safe to re-run — every statement is IF NOT EXISTS)
docker compose exec db psql -U envista -d envista -f /dev/stdin < schema.sql
```

If you'd rather point the API at a managed/external Postgres instance
instead of the bundled `db` service, delete the `db` service from
`docker-compose.yml` and set `DATABASE_URL` in `.env` to that instance's
connection string (set `PGSSLMODE=require` if it needs TLS).

**Without Docker (bare Node on the VM):**

```bash
cd server
cp .env.example .env   # fill in real values, including a reachable DATABASE_URL
npm install
npm run migrate
npm run build
npm start               # or run under pm2/systemd for a real deployment
```

Put nginx or Caddy in front of it as a reverse proxy (TLS termination,
and forwarding `/api/*` to `http://127.0.0.1:3001`), and set `CORS_ORIGIN`
to the exact frontend origin(s) that will call it.

## Frontend wiring

The frontend reads the API's base URL from `VITE_API_URL` (see the
project root `.env.example`). Point it at wherever this API ends up
running, e.g. `https://api.envistacyberdefence.com` — no trailing slash.

## What's intentionally not here yet

Per the current implementation scope, this stage covers consent capture
and policy notices only — there's no Data Subject Request (access /
erasure / correction / withdrawal) portal or `dsr_requests` table. Add
`server/schema.sql`'s missing table and a `routes/dsr.ts` router
(`POST /api/dsr`) if/when that portal is built.

Retention: the DPDP notice states 12 months for contact submissions.
Nothing here deletes old rows automatically yet — schema.sql has the
exact `DELETE` statement to run on a schedule (cron, systemd timer, or
whatever the deploy target supports).
