// Settings persistence (localStorage). Holds all user prefs:
// language, currency, notifications, theme + UI state (promo banner dismissed).

const KEY = "finmate_settings";

export const DEFAULT_SETTINGS = {
  language: "en",
  currency: "ZAR",
  notifications: true,
  theme: "light",
  promoDismissed: false,
  plan: "free",
};

function canStore() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function load() {
  if (!canStore()) return { ...DEFAULT_SETTINGS };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function save(patch) {
  const next = { ...load(), ...patch };
  if (canStore()) {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // storage full / unavailable — keep in-memory state, never throw
    }
  }
  return next;
}

export function reset() {
  if (canStore()) {
    try {
      localStorage.removeItem(KEY);
    } catch {
      // ignore
    }
  }
  return { ...DEFAULT_SETTINGS };
}
