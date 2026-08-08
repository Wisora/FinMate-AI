// Reports service — deterministic, computed from stored sample history.
// History entry = { month: 'YYYY-MM', income, expenses, categories: {...} }

import { uid } from "./goalsService";

const KEY = "finmate_history";

const CATEGORY_PERCENTS = {
  housing: 0.32,
  transport: 0.14,
  food: 0.22,
  utilities: 0.12,
  entertainment: 0.1,
  other: 0.1,
};

// Sample monthly data, ending with the current month (expenses above income to
// exercise the proactive alert). Offset 0 = current month.
const SEED_MONTHS = [
  { income: 28400, expenses: 23100 },
  { income: 28400, expenses: 24600 },
  { income: 28600, expenses: 25200 },
  { income: 28600, expenses: 25900 },
  { income: 28800, expenses: 27100 },
  { income: 28500, expenses: 29950 },
];

export function monthKey(offsetFromNow) {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() - offsetFromNow);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export function parseMonthKey(key) {
  const [y, m] = String(key).split("-").map(Number);
  return { year: y, month: m };
}

export function monthLabel(
  key,
  locale,
  options = { month: "long", year: "numeric" },
) {
  const { year, month } = parseMonthKey(key);
  try {
    return new Date(year, month - 1, 1).toLocaleDateString(locale, options);
  } catch {
    return key;
  }
}

export function shortMonthLabel(key, locale) {
  return monthLabel(key, locale, { month: "short" });
}

function buildCategories(expenses) {
  const cats = {};
  let assigned = 0;
  for (const [name, pct] of Object.entries(CATEGORY_PERCENTS)) {
    if (name === "other") continue;
    cats[name] = Math.round(expenses * pct);
    assigned += cats[name];
  }
  cats.other = expenses - assigned;
  return cats;
}

function seed() {
  const history = SEED_MONTHS.map((m, i) => {
    const offset = SEED_MONTHS.length - 1 - i; // oldest first
    return {
      id: `h-${uid()}`,
      month: monthKey(offset),
      income: m.income,
      expenses: m.expenses,
      categories: buildCategories(m.expenses),
    };
  });
  writeRaw(history);
  return history;
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

export function getHistory() {
  const raw = readRaw();
  if (raw == null) return seed();
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : seed();
  } catch {
    return seed();
  }
}

export function getMonthlyReport() {
  return monthlyReportFor(getHistory());
}
export function resetData() {
  writeRaw(null);
  return seed();
}

export function getLatest() {
  const h = getHistory();
  return h[h.length - 1] || null;
}

export function getLastMonth() {
  const h = getHistory();
  return h.length > 1 ? h[h.length - 2] : h[h.length - 1] || null;
}

// Full monthly report: each entry with savings + savingsRate added.
export function monthlyReportFor(history) {
  return history.map((m) => {
    const savings = m.income - m.expenses;
    return {
      ...m,
      savings,
      savingsRate: m.income > 0 ? (savings / m.income) * 100 : 0,
    };
  });
}

// Simple deterministic weekly breakdown derived from the latest month.
export function getWeeklyReport() {
  return weeklyReportFor(getLatest());
}
export function weeklyReportFor(latest) {
  if (!latest) return { weeks: [], income: 0, expenses: 0 };
  const weeks = [];
  const income = latest.income / 4.33;
  const expenses = latest.expenses / 4.33;
  let incAcc = 0;
  let expAcc = 0;
  for (let w = 1; w <= 4; w++) {
    let inc = Math.round(income);
    let exp = Math.round(expenses);
    incAcc += inc;
    expAcc += exp;
    if (w === 4) {
      inc = latest.income - incAcc + inc;
      exp = latest.expenses - expAcc + exp;
    }
    weeks.push({
      label: `W${w}`,
      income: inc,
      expenses: exp,
      savings: inc - exp,
    });
  }
  return {
    weeks,
    income: latest.income,
    expenses: latest.expenses,
    month: latest.month,
  };
}

export function findMonth(monthNumber) {
  return (
    getHistory().find((m) => parseMonthKey(m.month).month === monthNumber) ||
    null
  );
}

// Expenses trending above income? Used by the proactive alert.
export function expensesAboveIncome() {
  const h = getHistory();
  if (h.length === 0) return false;
  const latest = h[h.length - 1];
  if (latest.expenses > latest.income) return true;
  const last3 = h.slice(-3);
  if (last3.length === 3) {
    const avgExp = last3.reduce((s, m) => s + m.expenses, 0) / 3;
    const avgInc = last3.reduce((s, m) => s + m.income, 0) / 3;
    return avgExp > avgInc;
  }
  return false;
}
