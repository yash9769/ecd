# Deploying Envista Cyber Defence to Bharat Cloud (aaPanel)

Same approach as the Vendor and CRM apps: two environments on the same VM, push-to-deploy via
GitHub Actions over SSH, each environment its own git checkout + `.env` + Docker Compose project.

| Environment | Branch       | Directory on VM             | Port     | DB tunnel (loopback only) |
|-------------|--------------|------------------------------|----------|----------------------------|
| Staging     | `staging`    | `~/apps/envista-staging`     | **8055** | 15455                      |
| Production  | `production` | `~/apps/envista-production`  | **8050** | 15450                      |

Both branches were created from `v1`. **Push to `staging` → staging updates. Push to
`production` → production updates.** Recommended flow: work on `staging`, check it on 8055, then
merge `staging` into `production` and push.

**Architecture per environment — two containers:**

- `app` — one Node container. It serves the built React site *and* the API (`/api/submissions`,
  `/api/consent`, `/api/health`) on a single port. Nothing to split or proxy.
- `db` — `postgres:16-alpine` with a named volume. **Not** exposed to the internet; bound to the
  VM's loopback only, so you can reach it through an SSH tunnel (section 6).

The schema (`server/schema.sql`) is applied automatically every time the `app` container starts —
it's idempotent, so there's nothing to run by hand. Staging is served `noindex`
(robots.txt Disallow + `X-Robots-Tag`) so search engines never pick it up.

---

## 1. One-time VM prerequisites

**a) Open ports 8050 and 8055** (TCP, inbound) in **both** places, or traffic won't get through:

- Bharat Cloud's firewall / security-group console
- aaPanel's own firewall: Security → Firewall → Add Port Rule

They don't clash with anything already on the box (Vendor 8010/8020, CRM 8030–8045).

**b) Install Git LFS on the VM — required.** This repo stores its images and logos in Git LFS.
Without it the VM checks out tiny text placeholders instead of the real files (the Docker build
detects that and refuses to build rather than shipping a site with broken images):

```bash
sudo apt install -y git-lfs
git lfs install
```

(Docker and aaPanel's Docker plugin are already installed from the Vendor/CRM deployments.)

**c) Deploy key.** If the same VM user + deploy key from Vendor/CRM are fine to reuse, there's
nothing to do on the VM — reuse the same `SSH_PRIVATE_KEY` value in this repo's secrets.

## 2. GitHub repo setup

Push both branches:

```bash
git push -u origin staging production
```

Then in the repo: **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Value |
|---|---|
| `SSH_HOST` | the VM's IP |
| `SSH_USER` | the VM user the deploy key belongs to |
| `SSH_PRIVATE_KEY` | full private key (whole `-----BEGIN...-----` block) |
| `SSH_PORT` | only if SSH isn't on 22 |
| `PROD_POSTGRES_PASSWORD` | `openssl rand -hex 24` |
| `STAGING_POSTGRES_PASSWORD` | a **different** value, same command |
| `RESEND_API_KEY`, `NOTIFY_EMAIL_TO`, `NOTIFY_EMAIL_FROM` | *optional* — production-only email alert per contact-form submission (https://resend.com). Skip them to run without email; submissions are saved to the database either way. |

(`-hex` rather than `-base64` on purpose: no special characters to worry about in `.env`.)

Each workflow can also be run by hand from the **Actions** tab (`workflow_dispatch`) — use that
for the first deploy of each environment.

> **`.env` is only written on the very first run** of an environment. To change a value later (for
> example adding the Resend keys), edit `~/apps/envista-production/.env` on the VM and re-run the
> workflow (or `./deploy.sh`).

**If the repo is private**, the first clone on the VM (plain `https://github.com/...`) fails with an
authentication error. Fix: add a read-only deploy key on the repo (Settings → Deploy keys) and clone
with it, or make the repo public. (LFS downloads use the same credentials.)

Confirm it worked:

```bash
curl http://<VM_IP>:8055/api/health    # staging    -> {"ok":true}
curl http://<VM_IP>:8050/api/health    # production -> {"ok":true}
```

then open `http://<VM_IP>:8055` and `http://<VM_IP>:8050` in a browser. `/api/health` also checks the
database, so `{"ok":true}` means the app *and* Postgres are up.

### See it in aaPanel

Docker plugin → Compose → Import, pointing at `~/apps/envista-production/docker-compose.yml` (and the
staging one separately). Just a UI over the same containers — it doesn't change how they deploy.

---

## 3. Where the data goes

The database starts empty. Visitors' data lands in two tables:

- `contact_submissions` — contact-form enquiries
- `consent_records` — cookie / DPDP consent choices

```bash
cd ~/apps/envista-production
docker compose exec db psql -U envista -d envista_prod \
  -c "SELECT created_at, first_name, last_name, email, company, selected_services FROM contact_submissions ORDER BY created_at DESC LIMIT 20;"
```

(Staging: `~/apps/envista-staging`, database `envista_staging`.)

**Retention:** the site's DPDP notice promises contact submissions are deleted after 12 months, but
nothing deletes them automatically yet. Schedule this (cron on the VM) against production:

```sql
DELETE FROM contact_submissions WHERE created_at < now() - interval '12 months';
```

## 4. Day-to-day

- Logs: `docker compose logs -f app` (from the environment's directory)
- Manual redeploy on the VM: `./deploy.sh`
- The database survives redeploys (named volume). Only `docker compose down -v` deletes it — never
  run that in production.

## 5. What changed from `v1` to make this work

Deliberately small; the site itself is untouched.

- `src/lib/api.ts` — when `VITE_API_URL` is unset the site calls `/api` on its own origin (before, it
  refused to call anything without it). The old cross-origin setup still works if you set it.
- `server/src/index.ts` — also serves the built frontend + SPA fallback (`STATIC_DIR`), `/api/health`
  now checks the database, staging `noindex`, and a Content-Security-Policy tuned for the site.
- `server/src/db.ts` — accepts `PGHOST`/`PGUSER`/… as well as `DATABASE_URL`.
- `vite.config.ts` — dev-server proxy `/api` → `localhost:3001`.
- New: `Dockerfile`, `docker-compose.yml`, `deploy.sh`, `deploy.env.example`, `.dockerignore`,
  `.github/workflows/deploy-*.yml`, this file.

Note `v1`'s own `deploy/` folder (nginx + systemd, for `envistacyberdefence.com`) describes a
different, non-Docker layout; it's left in place but isn't used by this setup.

**Third-party dependency to be aware of:** the home and About hero visuals load a lighting map
(`potsdamer_platz_1k.hdr`) from `raw.githack.com` at runtime (drei's `<Environment preset="city">`).
The CSP allows that host. If it's ever unreachable those pages error out — self-hosting the file
would remove the dependency.

## 6. Connecting pgAdmin (or psql) to the database

Postgres is bound to the VM's loopback (`15450` production / `15455` staging), never `0.0.0.0`. Use
pgAdmin's built-in SSH tunnel (Connection: host `127.0.0.1`, that port, database `envista_prod` /
`envista_staging`, user `envista`, password = the matching secret; SSH Tunnel tab: the VM IP, port 22,
your SSH user + key), or a manual tunnel:

```bash
ssh -L 15450:127.0.0.1:15450 <user>@<VM_IP>
```

and connect to `127.0.0.1:15450`.

## 7. Later: domain + SSL via aaPanel

1. Website → Add Site for e.g. `www.envistacyberdefence.com` (no PHP / static root needed).
2. On that site add a **Reverse Proxy** → target `http://127.0.0.1:8050`.
3. SSL tab → Let's Encrypt → issue the certificate (aaPanel renews it).
4. Same again for a staging subdomain → `http://127.0.0.1:8055`.
5. In each environment's `.env` set `TRUST_PROXY=1` and run `docker compose up -d`, so the
   contact-form rate limit sees real visitor IPs instead of the proxy's.

No changes to the app or containers are needed for the domain itself.

---

## Local development

```bash
npm ci
npm run dev          # Vite on :8443; proxies /api to http://localhost:3001
```

To exercise the forms locally, also run the API (see `server/README.md`), or run the whole production
stack: copy `deploy.env.example` to `.env`, set `POSTGRES_PASSWORD`, then `docker compose up --build`
and open `http://localhost:8050`.
