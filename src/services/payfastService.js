// PayFast checkout support (client-side POST form, no new dependencies).
// Reads VITE_PAYFAST_MERCHANT_ID / VITE_PAYFAST_MERCHANT_KEY /
// VITE_PAYFAST_PASSPHRASE from import.meta.env. If any is missing the caller
// renders a "payments are being set up" demo state — no fake credentials.

export const PAYFAST_PROCESS_URL = "https://www.payfast.co.za/eng/process";

/* ---------------- MD5 (RFC 1321, hand-rolled — no deps) ---------------- */
function utf8Bytes(str) {
  const out = [];
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if (c < 0x80) {
      out.push(c);
    } else if (c < 0x800) {
      out.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
    } else if (c >= 0xd800 && c <= 0xdbff && i + 1 < str.length) {
      const c2 = str.charCodeAt(i + 1);
      if (c2 >= 0xdc00 && c2 <= 0xdfff) {
        const v = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        out.push(
          0xf0 | (v >> 18),
          0x80 | ((v >> 12) & 0x3f),
          0x80 | ((v >> 6) & 0x3f),
          0x80 | (v & 0x3f),
        );
        i++;
        continue;
      }
    } else {
      out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
    }
  }
  return out;
}

const K = [
  0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a,
  0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
  0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340,
  0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
  0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8,
  0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
  0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa,
  0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
  0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92,
  0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
  0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391,
];

const S = [
  7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5,
  9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11,
  16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15,
  21,
];

export function md5(str) {
  const bytes = utf8Bytes(str);
  const len = bytes.length;
  const bitLenLo = (len << 3) & 0xffffffff;
  const bitLenHi = Math.floor(len / 0x20000000);

  const padded = bytes.slice();
  padded.push(0x80);
  while (padded.length % 64 !== 56) padded.push(0);
  for (let i = 0; i < 4; i++) padded.push((bitLenLo >>> (8 * i)) & 0xff);
  for (let i = 0; i < 4; i++) padded.push((bitLenHi >>> (8 * i)) & 0xff);

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  for (let i = 0; i < padded.length; i += 64) {
    const M = [];
    for (let j = 0; j < 16; j++) {
      M[j] =
        padded[i + j * 4] |
        (padded[i + j * 4 + 1] << 8) |
        (padded[i + j * 4 + 2] << 16) |
        (padded[i + j * 4 + 3] << 24);
    }
    let A = a0,
      B = b0,
      C = c0,
      D = d0;
    for (let j = 0; j < 64; j++) {
      let F, g;
      if (j < 16) {
        F = (B & C) | (~B & D);
        g = j;
      } else if (j < 32) {
        F = (D & B) | (~D & C);
        g = (5 * j + 1) % 16;
      } else if (j < 48) {
        F = B ^ C ^ D;
        g = (3 * j + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * j) % 16;
      }
      F = (F + A + K[j] + M[g]) & 0xffffffff;
      A = D;
      D = C;
      C = B;
      B = (B + (((F << S[j]) | (F >>> (32 - S[j]))) & 0xffffffff)) & 0xffffffff;
    }
    a0 = (a0 + A) & 0xffffffff;
    b0 = (b0 + B) & 0xffffffff;
    c0 = (c0 + C) & 0xffffffff;
    d0 = (d0 + D) & 0xffffffff;
  }

  const HEX = "0123456789abcdef";
  let hex = "";
  for (const w of [a0, b0, c0, d0]) {
    for (let i = 0; i < 4; i++) {
      hex += HEX[(w >>> (8 * i + 4)) & 0x0f] + HEX[(w >>> (8 * i)) & 0x0f];
    }
  }
  return hex;
}

/* ---------------- PayFast helpers ---------------- */

const env = () =>
  globalThis.__FINMATE_ENV__ ||
  (typeof import.meta !== "undefined" ? import.meta.env || {} : {});

export function payfastConfigured() {
  const e = env();
  return Boolean(
    e.VITE_PAYFAST_MERCHANT_ID &&
    e.VITE_PAYFAST_MERCHANT_KEY &&
    e.VITE_PAYFAST_PASSPHRASE,
  );
}

// PHP-style urlencode (PayFast signature rule): space → '+'.
const encode = (v) => encodeURIComponent(String(v)).replace(/%20/g, "+");

// Build the POST fields incl. the md5 signature. Fields are sorted
// alphabetically and the passphrase appended as &passphrase=... (PayFast spec).
export function buildPayfastParams({ amount, itemName, email, name }) {
  const e = env();
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const base = {
    merchant_id: e.VITE_PAYFAST_MERCHANT_ID,
    merchant_key: e.VITE_PAYFAST_MERCHANT_KEY,
    amount: String(amount),
    item_name: itemName,
    return_url: `${origin}/success`,
    cancel_url: `${origin}/cancel`,
    notify_url: `${origin}/api/payfast-notify`,
    email_address: email || "",
    name_first: name || "",
  };
  const entries = Object.entries(base).filter(([, v]) => v !== "" && v != null);
  entries.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  const query = entries.map(([k, v]) => `${encode(k)}=${encode(v)}`).join("&");
  const signature = md5(
    `${query}&passphrase=${encode(e.VITE_PAYFAST_PASSPHRASE)}`,
  );
  return { ...base, signature };
}
