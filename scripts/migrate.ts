/**
 * Optional standalone schema migration for the FinMate AI Postgres database.
 *
 * Usage (requires DATABASE_URL in the environment):
 *   bun run scripts/migrate.ts
 *
 * This is convenience tooling — the webhook also creates the `payments` table
 * lazily on its first call (see src/services/payfastWebhook.js `ensureSchema`), so
 * nothing has to run at deploy time for the webhook to function. Running this
 * ahead of time just makes the schema explicit and reviewable.
 */
import { getPool } from "../src/db.js";
import { SCHEMA_SQL } from "../src/services/payfastWebhook.js";

const pool = getPool();
await pool.query(SCHEMA_SQL);
console.log("schema ready: payments table ensured");
await pool.end();
