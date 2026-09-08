import pg from "pg";

/**
 * Server-only connection layer to the team Postgres database over TCP.
 *
 * Switched away from @neondatabase/serverless (Neon's HTTP protocol) because the
 * team DB is Railway Postgres — a standard Postgres server speaking the wire
 * protocol — and the webhook must reach it from Vercel (a serverless function)
 * and from local Bun. `pg` (node-postgres) is a light, pure-JS TCP driver that
 * works in both.
 *
 * The connection string comes from `DATABASE_URL` (injected into the sandbox and
 * passed to Vercel by go-live.sh / the deploy job env). The pool is resolved
 * lazily and cached so the site still builds/serves before a database is
 * connected — the error only surfaces if a query actually runs without
 * `DATABASE_URL`.
 *
 * Use it only inside an `src/routes/api/*` route's `server.handlers` (never client
 * code):
 *
 *   import { getDb } from "~/db";
 *   const db = getDb();
 *   const { rows } = await db.query("select 1 as ok");
 */

const { Pool } = pg;

let sharedPool: pg.Pool | null = null;

/** Best-effort SSL decision based on the connection string. */
function resolveSsl(url: string) {
  const match = /(?:[?&])sslmode=([^&]+)/.exec(url);
  if (match && match[1] === "disable") return false;
  // Railway/Vercel public Postgres connections are TLS-terminated; some
  // providers use self-signed certs, so accept them rather than failing.
  return { rejectUnauthorized: false };
}

export interface Db {
  query: (text: string, values?: unknown[]) => Promise<{ rows: any[] }>;
}

export function getPool(): pg.Pool {
  if (sharedPool) return sharedPool;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set — connect the Railway Postgres database and inject DATABASE_URL before running queries.",
    );
  }
  sharedPool = new Pool({
    connectionString: url,
    ssl: resolveSsl(url),
    // Keep the pool tiny: Vercel serverless functions are short-lived and each
    // connection is precious. per-function concurrency is low.
    max: 2,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });
  // A pool error (e.g. the DB dropped a socket) should not crash the function;
  // log it instead. Pool errors are per-idle-client and the pool recovers.
  sharedPool.on("error", (err) => {
    console.error("[db] idle client error", err);
  });
  return sharedPool;
}

export function getDb(): Db {
  const pool = getPool();
  return {
    query: (text: string, values?: unknown[]) => pool.query(text, values),
  };
}
