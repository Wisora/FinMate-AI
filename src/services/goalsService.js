// Goals CRUD, seeded with a realistic sample dataset on first run.
// A goal = { id, type: 'savings'|'debt'|'investment', title, titleKey?,
//            targetAmount, currentAmount, targetDate?, monthlyContribution? }

const KEY = "finmate_goals";

const SEED_GOALS = [
  {
    type: "savings",
    titleKey: "seed.emergencyFund",
    targetAmount: 12000,
    currentAmount: 5200,
    targetDate: "2026-12-31",
    monthlyContribution: 400,
  },
  {
    type: "savings",
    titleKey: "seed.capeTownHoliday",
    targetAmount: 8000,
    currentAmount: 3100,
    targetDate: "2026-11-30",
    monthlyContribution: 250,
  },
  {
    type: "debt",
    titleKey: "seed.carLoan",
    targetAmount: 95000,
    currentAmount: 62000,
    targetDate: "2027-06-30",
    monthlyContribution: 2500,
  },
  {
    type: "debt",
    titleKey: "seed.creditCard",
    targetAmount: 15000,
    currentAmount: 9400,
    targetDate: "2026-10-31",
    monthlyContribution: 600,
  },
  {
    type: "investment",
    titleKey: "seed.retirementAnnuity",
    targetAmount: 500000,
    currentAmount: 118000,
    targetDate: "2040-12-31",
    monthlyContribution: 3500,
  },
  {
    type: "investment",
    titleKey: "seed.etfPortfolio",
    targetAmount: 60000,
    currentAmount: 21400,
    targetDate: "2029-12-31",
    monthlyContribution: 1500,
  },
];

export function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function canStore() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function readRaw() {
  if (!canStore()) return null;
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function writeRaw(value) {
  if (!canStore()) return;
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function seed() {
  const goals = SEED_GOALS.map((g, i) => ({ id: `seed-${i + 1}`, ...g }));
  writeRaw(goals);
  return goals;
}

// Ensure sample data exists on first run; return all goals (seeded if empty).
export function getAll() {
  const raw = readRaw();
  if (raw == null) return seed();
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : seed();
  } catch {
    return seed();
  }
}

export function getById(id) {
  return getAll().find((g) => g.id === id) || null;
}

export function addGoal(goal) {
  const goals = getAll();
  const newGoal = {
    id: uid(),
    type: goal.type || "savings",
    title: String(goal.title || "").trim(),
    targetAmount: Number(goal.targetAmount) || 0,
    currentAmount: Number(goal.currentAmount) || 0,
    targetDate: goal.targetDate || null,
    monthlyContribution:
      goal.monthlyContribution != null && goal.monthlyContribution !== ""
        ? Number(goal.monthlyContribution) || 0
        : null,
  };
  writeRaw([...goals, newGoal]);
  return newGoal;
}

export function updateGoal(id, patch) {
  const goals = getAll().map((g) => (g.id === id ? { ...g, ...patch } : g));
  writeRaw(goals);
  return goals;
}

export function addContribution(id, amount) {
  const n = Number(amount) || 0;
  if (n <= 0) return getAll();
  return updateGoal(id, {
    currentAmount: Math.max(0, (getById(id)?.currentAmount || 0) + n),
  });
}

export function deleteGoal(id) {
  const goals = getAll().filter((g) => g.id !== id);
  writeRaw(goals);
  return goals;
}

export function resetData() {
  writeRaw(null);
  return seed();
}

// 0..100 (capped) progress for display purposes.
export function progressOf(goal) {
  if (!goal || !goal.targetAmount) return 0;
  return Math.max(
    0,
    Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100)),
  );
}
