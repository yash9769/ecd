# One container for the whole site: the Vite build is baked in and served by the Express API
# (server/), which also handles /api/submissions, /api/consent and /api/health and talks to
# Postgres. Build context is the repo root:  docker build -t envista:latest .

# ---------- Stage 1: build the React frontend ----------
FROM node:22-alpine AS web
WORKDIR /web
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# Images/logos are tracked with Git LFS. A checkout made without git-lfs contains ~130-byte
# text pointers instead of the real files, and the build would "succeed" with broken images.
# Fail loudly instead (see DEPLOYMENT.md: `sudo apt install git-lfs && git lfs install`).
RUN test -z "$(find src public -type f -size -300c -exec grep -l 'git-lfs.github.com/spec' {} +)" \
  || { echo "ERROR: Git LFS pointer files found in src/ or public/ - install git-lfs on the host and run 'git lfs pull'." >&2; exit 1; }

# VITE_API_URL is deliberately NOT set: the site then calls /api on its own origin.
RUN npm run build

# ---------- Stage 2: build the API (TypeScript -> dist/) ----------
FROM node:22-alpine AS api
WORKDIR /api
COPY server/package.json server/package-lock.json ./
RUN npm ci
COPY server/tsconfig.json ./
COPY server/src ./src
RUN npm run build

# ---------- Stage 3: runtime ----------
FROM node:22-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev
COPY --from=api /api/dist ./dist
COPY server/schema.sql ./schema.sql
COPY --from=web /web/dist ./public

ENV PORT=3000 STATIC_DIR=/app/public
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# Apply the (idempotent) schema, then start the server. One process, one container.
CMD ["sh", "-c", "node dist/migrate.js && node dist/index.js"]
