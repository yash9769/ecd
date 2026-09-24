import { Pool } from "pg";

/* Either DATABASE_URL, or the standard PGHOST/PGUSER/PGPASSWORD/PGDATABASE vars (which pg
   reads natively — the Docker deployment uses these so a generated password can't corrupt a
   connection-string URL). */
const connectionString = process.env.DATABASE_URL;
if (!connectionString && !process.env.PGHOST) {
  throw new Error(
    "DATABASE_URL (or PGHOST/PGUSER/PGPASSWORD/PGDATABASE) is not set. Copy server/.env.example to server/.env and fill in a Postgres connection.",
  );
}

/* A single shared pool for the whole process. `ssl` is opt-in via
   PGSSLMODE=require — most managed Postgres (including a self-hosted
   instance behind a proxy on BharatCloud) either doesn't need TLS on a
   private network or terminates it upstream, so we don't force it. */
export const pool = new Pool({
  connectionString,
  ssl: process.env.PGSSLMODE === "require" ? { rejectUnauthorized: false } : undefined,
  max: Number(process.env.PGPOOL_MAX ?? 10),
});

pool.on("error", (err) => {
  // A background/idle client error must not crash the whole API process.
  console.error("[db] unexpected error on idle client", err);
});
