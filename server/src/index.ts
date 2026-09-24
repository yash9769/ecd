import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "node:path";
import { existsSync } from "node:fs";
import { pool } from "./db.js";
import { submissionsRouter } from "./routes/submissions.js";
import { consentRouter } from "./routes/consent.js";
import { submissionLimiter, consentLimiter } from "./middleware/rateLimiter.js";

const app = express();

/* In the single-container deployment the built frontend (dist/) is served from this same
   process — set STATIC_DIR to its location. Left unset (local `npm run dev`), only the API runs. */
const staticDir = process.env.STATIC_DIR ? path.resolve(process.env.STATIC_DIR) : null;
/* Staging sets NOINDEX=1 so search engines never index it. */
const noIndex = process.env.NOINDEX === "1";

/* Deploying behind a reverse proxy (nginx/Caddy on the same BharatCloud
   VM, or a load balancer in front of it) is the default assumption for
   this stack — trust the proxy's X-Forwarded-For so req.ip and the rate
   limiter see the real client IP instead of the proxy's. Set
   TRUST_PROXY=0 if this is ever run directly exposed with no proxy. */
app.set("trust proxy", process.env.TRUST_PROXY === "0" ? false : 1);

/* helmet's default CSP (script/style/img self-only) is tuned for APIs; the site needs Google
   Fonts, data:/blob: images and WebGL, so widen it just enough. */
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "blob:"],
        mediaSrc: ["'self'", "blob:"],
        workerSrc: ["'self'", "blob:"],
        // drei's <Environment preset="city"> (home + About hero) fetches its HDR lighting map
        // from this host at runtime.
        connectSrc: ["'self'", "https://raw.githack.com"],
        objectSrc: ["'none'"],
        frameAncestors: ["'self'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        // Deployed on plain http://<ip>:<port> until a domain + SSL is set up; forcing https would break assets.
        upgradeInsecureRequests: null,
      },
    },
  }),
);

if (noIndex) {
  app.use((_req, res, next) => {
    res.set("X-Robots-Tag", "noindex, nofollow");
    next();
  });
  app.get("/robots.txt", (_req, res) => res.type("text/plain").send("User-agent: *\nDisallow: /\n"));
}

const allowedOrigins = (process.env.CORS_ORIGIN ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

if (allowedOrigins.length === 0 && !staticDir) {
  console.warn(
    "[cors] CORS_ORIGIN is not set — no browser origin will be allowed to call this API. " +
      "Set it to the frontend's origin(s), comma-separated, e.g. https://envistacyberdefence.com",
  );
}

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH"],
  }),
);

app.use(express.json({ limit: "64kb" }));

app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true });
  } catch (err) {
    console.error("[health] database check failed:", err);
    res.status(503).json({ ok: false });
  }
});

app.use("/api/submissions", submissionLimiter, submissionsRouter);
app.use("/api/consent", consentLimiter, consentRouter);

// Unknown /api paths get a JSON 404 rather than falling through to the SPA shell below.
app.use("/api", (_req, res) => res.status(404).json({ error: "not_found" }));

if (staticDir) {
  if (!existsSync(path.join(staticDir, "index.html"))) {
    console.error(`[static] STATIC_DIR=${staticDir} has no index.html — did the frontend build run?`);
  }
  // Vite fingerprints everything under /assets, so it can be cached forever; index.html
  // must always be revalidated so a new deploy shows up immediately.
  app.use(
    express.static(staticDir, {
      index: false,
      setHeaders(res, file) {
        if (file.split(path.sep).includes("assets")) {
          res.set("Cache-Control", "public, max-age=31536000, immutable");
        }
      },
    }),
  );
  // SPA fallback for client-side routes (/capabilities, /contact, …) — but only for page
  // navigations, so a missing /robots.txt or image is a real 404 instead of index.html.
  app.get("*", (req, res, next) => {
    if (path.extname(req.path) || !req.accepts("html")) return next();
    res.set("Cache-Control", "no-cache");
    res.sendFile(path.join(staticDir, "index.html"), (err) => err && next(err));
  });
}

// Last-resort handler: anything that reaches here is a bug, not a
// client validation failure (those are handled inside each router).
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("[unhandled]", err);
  res.status(500).json({ error: "internal_error" });
});

const port = Number(process.env.PORT ?? 3001);
app.listen(port, () => {
  console.log(`[envista-api] listening on port ${port}`);
});
