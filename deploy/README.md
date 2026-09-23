# Deploying to envistacyberdefence.com (BharatCloud + GoDaddy)

Nothing is hosted yet — this is the path from "runs on localhost" to
"live at envistacyberdefence.com". One VM runs everything: the built
frontend (served as static files by nginx), the API (Node process on
port 3001, proxied by nginx), and Postgres.

Config files referenced below live in this `deploy/` folder — copy them
onto the VM rather than retyping anything.

---

## 0. What you'll end up with

```
GoDaddy DNS                              BharatCloud VM
─────────────                            ──────────────
envistacyberdefence.com      ──A──>      nginx :80/:443
www.envistacyberdefence.com  ──A──>        ├─ serves dist/ (the built frontend)
api.envistacyberdefence.com  ──A──>        └─ proxies to the API on :3001
                                          Postgres (local, or the bundled
                                          docker-compose db service)
```

A subdomain for the API (`api.envistacyberdefence.com`) rather than a
`/api` path under the main domain — it keeps nginx config simple and
`CORS_ORIGIN` a plain origin match. See `deploy/nginx-*.conf`.

---

## 1. Provision the BharatCloud VM

Whatever BharatCloud calls its VM/compute product (they may call it a
"cloud server" or "VPS"), you want:

- Ubuntu 22.04 or 24.04
- At least 1 vCPU / 2GB RAM (this stack is light)
- A public IPv4 address — write it down, you need it for step 2

Once it's up, SSH in and do basic setup:

```bash
ssh root@<VM_PUBLIC_IP>

apt update && apt upgrade -y
apt install -y nginx postgresql postgresql-contrib certbot python3-certbot-nginx git

# Node 22 (via NodeSource)
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
```

---

## 2. Point the domain at the VM (GoDaddy)

In the GoDaddy dashboard: **My Products → DNS → Manage** for
envistacyberdefence.com, then add/edit these records:

| Type | Name | Value               | TTL     |
| ---- | ---- | -------------------- | ------- |
| A    | @    | `<VM_PUBLIC_IP>`      | 1 hour  |
| A    | www  | `<VM_PUBLIC_IP>`      | 1 hour  |
| A    | api  | `<VM_PUBLIC_IP>`      | 1 hour  |

(If GoDaddy already has a parked-page A record or a "Forwarding" rule
for `@`, remove/disable it first — it'll otherwise override this.)

DNS propagation is usually minutes, sometimes a few hours. Check with:

```bash
dig +short envistacyberdefence.com
dig +short api.envistacyberdefence.com
```

Don't move on to certbot (step 6) until these resolve to your VM's IP.

---

## 3. Get the code onto the VM

```bash
mkdir -p /var/www/envistacyberdefence.com
cd /var/www/envistacyberdefence.com
git clone https://github.com/yash9769/ecd.git .
git checkout v1

# This repo uses Git LFS for images — without this step the site ships
# with tiny placeholder files instead of real photos/logos.
apt install -y git-lfs
git lfs install
git lfs pull
```

---

## 4. Build and serve the frontend

Vite bakes `VITE_API_URL` into the build at build time (not read at
runtime), so set it before building:

```bash
cd /var/www/envistacyberdefence.com
echo "VITE_API_URL=https://api.envistacyberdefence.com" > .env.production.local

npm install
npm run build
# produces dist/ — this is what nginx serves
```

Re-run `npm run build` after every future `git pull` to pick up changes.

---

## 5. Set up the database and API

```bash
# Create the database and a role for the API to use
sudo -u postgres psql -c "CREATE USER envista WITH PASSWORD 'CHANGE_ME';"
sudo -u postgres psql -c "CREATE DATABASE envista OWNER envista;"

cd /var/www/envistacyberdefence.com/server
cp .env.example .env
```

Edit `server/.env` and fill in:

```bash
DATABASE_URL=postgresql://envista:CHANGE_ME@localhost:5432/envista
PORT=3001
CORS_ORIGIN=https://envistacyberdefence.com,https://www.envistacyberdefence.com
RESEND_API_KEY=          # from resend.com, once you have one
NOTIFY_EMAIL_TO=         # inbox that should receive contact-form alerts
NOTIFY_EMAIL_FROM=       # a Resend-verified address, or onboarding@resend.dev while testing
TRUST_PROXY=             # leave blank — nginx is the reverse proxy in front of this
```

Then build and start the API:

```bash
npm install
npm run migrate    # applies server/schema.sql
npm run build       # compiles to dist/

# Run it under systemd instead of a terminal session, so it survives
# reboots and SSH disconnects:
cd /var/www/envistacyberdefence.com
cp deploy/envista-api.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now envista-api
systemctl status envista-api   # should show "active (running)"
```

If you'd rather use the bundled Docker setup instead of a bare Postgres
install, see `server/README.md`'s Docker section — either works, this
guide assumes the bare-Postgres path since it needs one less moving
part on a fresh VM.

---

## 6. Configure nginx and get HTTPS

```bash
cd /var/www/envistacyberdefence.com
cp deploy/nginx-envistacyberdefence.com.conf /etc/nginx/sites-available/envistacyberdefence.com
cp deploy/nginx-api.envistacyberdefence.com.conf /etc/nginx/sites-available/api.envistacyberdefence.com
ln -s /etc/nginx/sites-available/envistacyberdefence.com /etc/nginx/sites-enabled/
ln -s /etc/nginx/sites-available/api.envistacyberdefence.com /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default   # remove the placeholder site, if present

nginx -t    # should say "syntax is ok" / "test is successful"
systemctl reload nginx
```

Confirm both domains load over plain HTTP first (you should see the
site, unencrypted) before running certbot:

```bash
curl -I http://envistacyberdefence.com
curl -I http://api.envistacyberdefence.com/api/health
```

Then get free TLS certificates and let certbot rewrite the nginx configs
to add the HTTPS server blocks and the HTTP→HTTPS redirect:

```bash
certbot --nginx -d envistacyberdefence.com -d www.envistacyberdefence.com
certbot --nginx -d api.envistacyberdefence.com
```

Certbot auto-renews via a systemd timer it installs — nothing else to
do for renewal.

---

## 7. Verify end to end

```bash
curl -s https://api.envistacyberdefence.com/api/health
# {"ok":true}
```

Then in a browser: open `https://envistacyberdefence.com`, confirm the
cookie banner appears, submit the contact form, and check the row
landed in Postgres:

```bash
sudo -u postgres psql envista -c \
  "SELECT first_name, last_name, email, created_at FROM contact_submissions ORDER BY created_at DESC LIMIT 5;"
```

---

## 8. Redeploying after future changes

```bash
cd /var/www/envistacyberdefence.com
git pull origin v1
git lfs pull

npm install && npm run build              # frontend

cd server
npm install && npm run build && npm run migrate
systemctl restart envista-api             # backend
```

---

## Still outstanding (see the earlier plan)

- **Grievance officer details** — placeholder text in
  `src/components/DpdpNotice.tsx` (`GRIEVANCE_OFFICER`). Replace before
  relying on this notice.
- **Resend account** — `RESEND_API_KEY` / `NOTIFY_EMAIL_TO` /
  `NOTIFY_EMAIL_FROM` in `server/.env`. Submissions save to the database
  regardless; only the email alert is skipped until these are set.
- **Postgres backups** — nothing here schedules them. At minimum, a
  cron job running `pg_dump` to a file (and ideally off the VM) before
  this holds real customer data:
  ```bash
  # /etc/cron.d/envista-db-backup
  0 2 * * * postgres pg_dump envista | gzip > /var/backups/envista-$(date +\%F).sql.gz
  ```
