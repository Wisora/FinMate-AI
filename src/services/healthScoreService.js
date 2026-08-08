// Financial health score — 0..100 from three factors:
//   savings rate (max 40), debt payoff progress (max 30), emergency coverage (max 30).
// Deterministic, computed from stored goals + history.

import { progressOf } from "./goalsService";

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const ROUND = (n) => Math.round(n * 10) / 10;

export function getHealthScore({ goals, history } = {}) {
  const list = goals && goals.length ? goals : [];
  const h = history && history.length ? history : [];
  const latest = h[h.length - 1] || null;

  // Savings rate (target 15% of income → full 40 points).
  let rate = 0;
  if (latest && latest.income > 0) {
    rate = ((latest.income - latest.expenses) / latest.income) * 100;
  }
  const savingsScore = clamp((Math.max(0, rate) / 15) * 40, 0, 40);

  // Debt payoff: average progress across debt goals (target 100% → full 30).
  const debts = list.filter((g) => g.type === "debt");
  const debtPct = debts.length
    ? debts.reduce((s, g) => s + progressOf(g), 0) / debts.length
    : 50;
  const debtScore = clamp((debtPct / 100) * 30, 0, 30);

  // Emergency coverage: total savings vs average monthly expenses (3 months → full 30).
  const totalSavings = list
    .filter((g) => g.type === "savings")
    .reduce((s, g) => s + g.currentAmount, 0);
  const avgExpenses = h.length
    ? h.reduce((s, m) => s + m.expenses, 0) / h.length
    : 0;
  const months = avgExpenses > 0 ? totalSavings / avgExpenses : 0;
  const emergencyScore = clamp((months / 3) * 30, 0, 30);

  const score = Math.round(savingsScore + debtScore + emergencyScore);

  return {
    score,
    rating:
      score >= 80
        ? "excellent"
        : score >= 60
          ? "good"
          : score >= 40
            ? "fair"
            : "needsWork",
    factors: [
      {
        key: "health.savingsRate",
        value: ROUND(Math.max(0, rate)),
        score: Math.round(savingsScore),
        max: 40,
        pct: Math.round((savingsScore / 40) * 100),
      },
      {
        key: "health.debtProgress",
        value: Math.round(debtPct),
        score: Math.round(debtScore),
        max: 30,
        pct: Math.round((debtScore / 30) * 100),
      },
      {
        key: "health.emergencyCoverage",
        value: ROUND(months),
        score: Math.round(emergencyScore),
        max: 30,
        pct: Math.round((emergencyScore / 30) * 100),
      },
    ],
  };
}
