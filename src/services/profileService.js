// Profile service — user name/email persisted to localStorage.
// The subscription plan lives in settingsService (plan), so gating is app-wide.

const KEY = "finmate_profile";

export const DEFAULT_PROFILE = { name: "Demo User", email: "demo@finmate.app" };

function canStore() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function load() {
  if (!canStore()) return { ...DEFAULT_PROFILE };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_PROFILE };
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
}

export function save(patch) {
  const next = { ...load(), ...patch };
  if (canStore()) {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // storage unavailable — keep in-memory state, never throw
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
  return { ...DEFAULT_PROFILE };
}
