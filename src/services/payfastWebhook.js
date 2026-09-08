/**
 * PayFast Instant Transaction Notification (ITN) webhook handling.
 *
 * PayFast POSTs an `application/x-www-form-urlencoded` body to
 * `/api/payfast-notify` server-to-server after every payment event. This module
 * holds the pure, DB-independent logic (parsing + signature verification) and the
 * idempotent persistence, plus `handlePayfastNotify` which the API route calls.
 *
 * Signature rule (PayFast spec): exclude the `signature` field (and any
 * `passphrase` field), sort the remaining params alphabetically by key, urlencode
 * each key/value with PHP-style encoding (space -> '+'), join with '&', append
 * `&passphrase=<urlencoded passphrase>` and md5 the result.
 */
import { md5, encode } from "./payfastService.js";
import { getDb } from "../db.js";

/* ---------------- Schema ---------------- */

export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS payments (
  id              BIGSERIAL PRIMARY KEY,
  pf_payment_id   TEXT NOT NULL UNIQUE,
  merchant_id     TEXT,
  m_payment_id    TEXT,
  amount          TEXT,
  item_name       TEXT,
  name_first      TEXT,
  name_last       TEXT,
  email_address   TEXT,
  payment_status  TEXT,
  signature_check BOOLEAN,
  payload         JSONB,
  received_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS payments_status_idx ON payments (payment_status);
`;

/* ---------------- Config ---------------- */

// Webhook runs server-side, so read the PayFast secrets from process.env (the
// deploy job sets them and go-live passes them). globalThis.__FINMATE_ENV__ is a
// hook used by tests/local to inject values without the real secrets.
const getConfig = () => {
  const e =
    globalThis.__FINMATE_ENV__ ||
    (typeof process !== "undefined" ? process.env : {});
  return {
    merchantId: e.VITE_PAYFAST_MERCHANT_ID,
    merchantKey: e.VITE_PAYFAST_MERCHANT_KEY,
    passphrase: e.VITE_PAYFAST_PASSPHRASE,
  };
};

/* ---------------- Parsing & signature ---------------- */

/** Parse an application/x-www-form-urlencoded body into a plain object. */
export function parseUrlEncodedBody(text) {
  const params = {};
  new URLSearchParams(text || "").forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

/**
 * Build the exact string PayFast signs: sorted, urlencoded key=value pairs joined
 * by '&' with the passphrase appended. Excludes `signature` and `passphrase`
 * fields (the passphrase is secret; it is not part of the posted params).
 */
export function buildSignatureInput(payload, passphrase) {
  const entries = Object.entries(payload)
    .filter(([k]) => k !== "signature" && k !== "passphrase")
    .filter(([, v]) => v != null && v !== "")
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  const query = entries.map(([k, v]) => `${encode(k)}=${encode(v)}`).join("&");
  return `${query}&passphrase=${encode(passphrase)}`;
}

/** Compute the expected PayFast signature for a payload. */
export function signPayload(payload, passphrase) {
  return md5(buildSignatureInput(payload, passphrase));
}

/** True when the payload's `signature` matches a recomputation using passphrase. */
export function verifyPayfastSignature(payload, passphrase) {
  if (!passphrase || !payload || typeof payload.signature !== "string") {
    return false;
  }
  const expected = signPayload(payload, passphrase);
  return expected === payload.signature;
}

/* ---------------- Idempotent persistence ---------------- */

/**
 * Build the idempotent upsert for a payment. `pf_payment_id` is UNIQUE, so a
 * repeated ITN for the same payment overwrites the row in place instead of
 * inserting a duplicate (update made_at + updated_at).
 */
export function upsertPaymentSql(p) {
  return {
    text: `
INSERT INTO payments
  (pf_payment_id, merchant_id, m_payment_id, amount, item_name,
   name_first, name_last, email_address, payment_status, signature_check, payload, updated_at)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, now())
ON CONFLICT (pf_payment_id) DO UPDATE SET
  merchant_id    = EXCLUDED.merchant_id,
  m_payment_id   = EXCLUDED.m_payment_id,
  amount         = EXCLUDED.amount,
  item_name      = EXCLUDED.item_name,
  name_first     = EXCLUDED.name_first,
  name_last      = EXCLUDED.name_last,
  email_address  = EXCLUDED.email_address,
  payment_status = EXCLUDED.payment_status,
  signature_check= EXCLUDED.signature_check,
  payload        = EXCLUDED.payload,
  updated_at     = now()
RETURNING *;
`,
    values: [
      p.pf_payment_id ?? null,
      p.merchant_id ?? null,
      p.m_payment_id ?? null,
      p.amount ?? null,
      p.item_name ?? null,
      p.name_first ?? null,
      p.name_last ?? null,
      p.email_address ?? null,
      p.payment_status ?? null,
      p.signature_check === undefined ? null : p.signature_check,
      p.payload === undefined ? null : p.payload,
    ],
  };
}

/** Create the `payments` table if it does not exist (lazy, on first webhook). */
export async function ensureSchema(db) {
  await db.query(SCHEMA_SQL);
}

/**
 * Persist a validated payment. `db` must expose `query(text, values)` (see
 * src/db.ts's getDb()). Idempotent by pf_payment_id via upsert.
 */
export async function recordPayment(db, payload, signatureCheck = true) {
  const values = { ...payload, signature_check: signatureCheck };
  if (payload.payload === undefined) {
    values.payload = payload;
  }
  const { text, values: params } = upsertPaymentSql(values);
  const res = await db.query(text, params);
  return res.rows ? res.rows[0] : res;
}

/* ---------------- Orchestration ---------------- */

/**
 * Full webhook flow. Returns a plain Web `Response`:
 *   - 400 "OK"            invalid signature or merchant_id mismatch (reject)
 *   - 200 "OK"            valid request, persisted
 *   - 500 "OK"            valid request but could not persist (PayFast will retry)
 * Always responds with a plain "OK" body — no HTML shell — so PayFast is happy.
 */
export async function handlePayfastNotify(request, deps = {}) {
  const db = deps.db || getDb();
  const config = deps.config || getConfig();

  let raw = "";
  try {
    raw = await request.text();
  } catch (err) {
    console.error("[payfast] failed to read request body", err);
    return new Response("OK", { status: 400 });
  }

  const payload = parseUrlEncodedBody(raw);

  if (!verifyPayfastSignature(payload, config.passphrase)) {
    console.error("[payfast] invalid signature rejected");
    return new Response("OK", { status: 400 });
  }

  // Reject notifications that aren't addressed to our merchant.
  if (
    config.merchantId &&
    payload.merchant_id &&
    payload.merchant_id !== String(config.merchantId)
  ) {
    console.error(
      `[payfast] merchant_id mismatch: ${payload.merchant_id} != ${config.merchantId}`,
    );
    return new Response("OK", { status: 400 });
  }

  try {
    await ensureSchema(db);
    await recordPayment(db, payload, true);
    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("[payfast] could not persist payment", err);
    return new Response("OK", { status: 500 });
  }
}
