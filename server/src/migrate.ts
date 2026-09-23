/* Applies schema.sql against DATABASE_URL. Every statement in that file
   uses CREATE ... IF NOT EXISTS, so running this repeatedly (e.g. on every
   deploy) is safe and a no-op once the schema already matches. */
import "dotenv/config";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { pool } from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.join(__dirname, "..", "schema.sql");

async function main() {
  const sql = readFileSync(schemaPath, "utf8");
  console.log(`[migrate] applying ${schemaPath}`);
  await pool.query(sql);
  console.log("[migrate] done");
  await pool.end();
}

main().catch((err) => {
  console.error("[migrate] failed:", err);
  process.exitCode = 1;
});
