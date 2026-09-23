import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { submissionsRouter } from "./routes/submissions.js";
import { consentRouter } from "./routes/consent.js";
import { submissionLimiter, consentLimiter } from "./middleware/rateLimiter.js";

const app = express();

/* Deploying behind a reverse proxy (nginx/Caddy on the same BharatCloud
   VM, or a load balancer in front of it) is the default assumption for
   this stack — trust the proxy's X-Forwarded-For so req.ip and the rate
   limiter see the real client IP instead of the proxy's. Set
   TRUST_PROXY=0 if this is ever run directly exposed with no proxy. */
app.set("trust proxy", process.env.TRUST_PROXY === "0" ? false : 1);

app.use(helmet());

const allowedOrigins = (process.env.CORS_ORIGIN ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

if (allowedOrigins.length === 0) {
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

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/submissions", submissionLimiter, submissionsRouter);
app.use("/api/consent", consentLimiter, consentRouter);

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
