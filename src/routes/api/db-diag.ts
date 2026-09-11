import { createFileRoute } from "@tanstack/react-router";
import { getDb } from "~/db.js";

/**
 * TEMPORARY diagnostic route for the webhook 500 ("could not persist payment").
 *
 * Root-causes the live Postgres connection failure on the serverless runtime by
 * surfacing the raw `pg` error message (we cannot read the masked DATABASE_URL
 * secret, but the deploy env has it set — so the failure is the connection/query
 * itself: DNS, TLS/sslmode, auth, timeout, etc.).
 *
 * This is a server-only route: it bypasses the React render pipeline and returns
 * plain text. Delete once the webhook 500 is fixed. Never prints credentials —
 * only url.host (which excludes user:pass).
 */
export const Route = createFileRoute("/api/db-diag")({
  server: {
    handlers: {
      GET: async () => runDiagnostic(),
      POST: async () => runDiagnostic(),
    },
  },
});

function plain(body: string, status: number): Response {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/plain" },
  });
}

/** Mirrors the sslmode decision in src/db.ts's resolveSsl(). */
function resolveSslFlag(url: string): string {
  const match = /(?:[?&])sslmode=([^&]+)/.exec(url);
  if (match && match[1] === "disable") return "disable";
  return "rejectUnauthorized:false";
}

async function runDiagnostic(): Promise<Response> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    return plain("env: DATABASE_URL not set", 500);
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return plain(`url-parse-fail: ${message}`, 500);
  }

  const lines = [
    `host: ${parsed.host}`,
    `internal: ${url.includes("railway.internal")}`,
    `public: ${url.includes("railway.app")}`,
    `ssl: ${resolveSslFlag(url)}`,
  ];

  try {
    const { rows } = await getDb().query("select 1");
    lines.push(`db-ok: ${JSON.stringify(rows)}`);
    return plain(lines.join("\n"), 200);
  } catch (err) {
    const e = err as { message?: string; code?: string };
    const code = e.code ? ` (code: ${e.code})` : "";
    lines.push(`connect-fail: ${e.message ?? String(err)}${code}`);
    return plain(lines.join("\n"), 500);
  }
}
