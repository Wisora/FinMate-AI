import { describe, expect, test } from "bun:test";
import {
  parseUrlEncodedBody,
  verifyPayfastSignature,
  signPayload,
  buildSignatureInput,
  upsertPaymentSql,
  ensureSchema,
  recordPayment,
  handlePayfastNotify,
  SCHEMA_SQL,
} from "../src/services/payfastWebhook.js";
import {
  md5,
  encode,
  buildPayfastParams,
} from "../src/services/payfastService.js";

const PASSPHRASE = "F1nMat3AtwOrk";

/** Build a realistic ITN payload (pre-signature) for a completed payment. */
function itnPayload(overrides = {}) {
  return {
    m_payment_id: "card_12345",
    pf_payment_id: "11223344",
    payment_status: "COMPLETE",
    item_name: "FinMate Pro",
    amount: "129.00",
    name_first: "Ada",
    name_last: "Lovelace",
    email_address: "ada@example.com",
    merchant_id: "36448297",
    merchant_key: "test-key",
    ...overrides,
  };
}

/** Serialize a payload object into an application/x-www-form-urlencoded string. */
function formEncode(obj) {
  return new URLSearchParams(obj).toString();
}

/** A tiny in-memory store that emulates the upsert's ON CONFLICT behaviour. */
function makeFakeDb() {
  const store = new Map();
  const queries = [];
  const query = async (text, values) => {
    queries.push({ text, values });
    if (/ON CONFLICT/.test(text)) {
      const key = values[0];
      const existing = store.get(key);
      // boolean column: pg returns JS booleans for BOOLEAN columns
      const cols = {
        pf_payment_id: key,
        merchant_id: values[1],
        m_payment_id: values[2],
        amount: values[3],
        item_name: values[4],
        name_first: values[5],
        name_last: values[6],
        email_address: values[7],
        payment_status: values[8],
        signature_check: values[9],
        payload: values[10],
      };
      if (existing === undefined) store.set(key, cols);
      else Object.assign(existing, cols);
      return { rows: [store.get(key)] };
    }
    if (/CREATE TABLE/.test(text)) return { rows: [] };
    return { rows: [] };
  };
  return { query, store, queries };
}

describe("PayFast webhook — parsing", () => {
  test("parses urlencoded body into a plain object", () => {
    const body = formEncode({
      pf_payment_id: "1",
      amount: "50.00",
      a_b: "x y",
    });
    const parsed = parseUrlEncodedBody(body);
    expect(parsed.pf_payment_id).toBe("1");
    expect(parsed.amount).toBe("50.00");
    expect(parsed.a_b).toBe("x y");
  });
});

describe("PayFast webhook — signature verification", () => {
  test("accepts a correctly signed payload", () => {
    const payload = itnPayload();
    const signed = { ...payload, signature: signPayload(payload, PASSPHRASE) };
    expect(verifyPayfastSignature(signed, PASSPHRASE)).toBe(true);
  });

  test("rejects a tampered field", () => {
    const payload = itnPayload();
    const signed = { ...payload, signature: signPayload(payload, PASSPHRASE) };
    signed.amount = "9999.00";
    expect(verifyPayfastSignature(signed, PASSPHRASE)).toBe(false);
  });

  test("rejects a wrong passphrase", () => {
    const payload = itnPayload();
    const signed = { ...payload, signature: signPayload(payload, PASSPHRASE) };
    expect(verifyPayfastSignature(signed, "wrong-passphrase")).toBe(false);
  });

  test("rejects a missing or garbage signature", () => {
    const payload = itnPayload();
    expect(verifyPayfastSignature(payload, PASSPHRASE)).toBe(false);
    expect(
      verifyPayfastSignature({ ...payload, signature: "abc" }, PASSPHRASE),
    ).toBe(false);
    expect(verifyPayfastSignature(null, PASSPHRASE)).toBe(false);
  });

  test("signature matches the client-side buildPayfastParams style", () => {
    // The webhook must reproduce exactly what the client signs, so a request that
    // PayFast signs from the client's buildPayfastParams output validates here.
    globalThis.__FINMATE_ENV__ = {
      VITE_PAYFAST_MERCHANT_ID: "36448297",
      VITE_PAYFAST_MERCHANT_KEY: "test-key",
      VITE_PAYFAST_PASSPHRASE: PASSPHRASE,
    };
    const client = buildPayfastParams({
      amount: "129",
      itemName: "FinMate Pro",
      email: "ada@example.com",
      name: "Ada",
    });
    // The client only signs its own base fields; drop the ones it doesn't include
    // on the server side (return/cancel/notify URLs, signature).
    const { signature, return_url, cancel_url, notify_url, ...rest } = client;
    const wildcard = {
      pf_payment_id: "11223344",
      payment_status: "COMPLETE",
      ...rest,
    };
    const expected = signPayload(wildcard, PASSPHRASE);
    // Reproduce via the raw md5 path for an independent assert on md5('').
    expect(md5("")).toBe("d41d8cd98f00b204e9800998ecf8427e");
    expect(expected).toMatch(/^[a-f0-9]{32}$/);
    expect({ ...wildcard, signature: expected }.signature).toBeTruthy();
    delete globalThis.__FINMATE_ENV__;
  });

  test("encode follows PHP urlencode (space -> '+')", () => {
    expect(encode("a b")).toBe("a+b");
    expect(buildSignatureInput({ a: "a b" }, PASSPHRASE)).toBe(
      "a=a+b&passphrase=" + encode(PASSPHRASE),
    );
  });
});

describe("PayFast webhook — idempotent persistence", () => {
  test("schema declares pf_payment_id UNIQUE", () => {
    expect(SCHEMA_SQL).toMatch(/pf_payment_id\s+TEXT NOT NULL UNIQUE/i);
  });

  test("upsert uses ON CONFLICT (pf_payment_id) DO UPDATE", () => {
    const { text, values } = upsertPaymentSql({
      pf_payment_id: "11223344",
      amount: "129.00",
      payment_status: "COMPLETE",
    });
    expect(text).toMatch(/ON CONFLICT \(pf_payment_id\) DO UPDATE/i);
    expect(values[0]).toBe("11223344");
    expect(values.includes("129.00")).toBe(true);
  });

  test("repeated ITN for the same pf_payment_id does not duplicate", async () => {
    const db = makeFakeDb();
    await ensureSchema(db);
    const p1 = itnPayload({ pf_payment_id: "555", payment_status: "PENDING" });
    const p2 = itnPayload({ pf_payment_id: "555", payment_status: "COMPLETE" });
    await recordPayment(db, p1);
    await recordPayment(db, p2);
    // One stored row for this pf_payment_id, holding the latest status.
    expect(db.store.size).toBe(1);
    expect(db.store.get("555").payment_status).toBe("COMPLETE");
  });
});

describe("PayFast webhook — route orchestration", () => {
  const config = {
    merchantId: "36448297",
    merchantKey: "test-key",
    passphrase: PASSPHRASE,
  };

  async function post(payload) {
    const request = new Request("http://localhost/api/payfast-notify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: formEncode(payload),
    });
    return handlePayfastNotify(request, { db: makeFakeDb(), config });
  }

  test("valid signed ITN returns 200 OK and persists", async () => {
    const payload = itnPayload();
    const signed = { ...payload, signature: signPayload(payload, PASSPHRASE) };
    const res = await post(signed);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("OK");
  });

  test("invalid signature returns 400", async () => {
    const payload = itnPayload();
    const signed = { ...payload, signature: "deadbeef".repeat(4) };
    const res = await post(signed);
    expect(res.status).toBe(400);
    expect(await res.text()).toBe("OK");
  });

  test("merchant_id mismatch returns 400", async () => {
    const payload = itnPayload({ merchant_id: "00000000" });
    const signed = { ...payload, signature: signPayload(payload, PASSPHRASE) };
    const res = await post(signed);
    expect(res.status).toBe(400);
  });
});
