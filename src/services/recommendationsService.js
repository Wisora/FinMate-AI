// Recommendations service — deterministic, rule-based tips derived from the
// stored goals + history. Each recommendation is a { key, params } pair that the
// UI localizes via t(`rec.${key}`, params).

import * as reportsService from "./reportsService";
import { progressOf } from "./goalsService";

const ROUND = (n) => Math.round(n * 10) / 10;

export function getRecommendations({ goals, history } = {}) {
  const recs = [];
  const list = goals && goals.length ? goals : [];
  const hist =
    history && history.length ? history : reportsService.getHistory();
  const latest = hist[hist.length - 1];
  const previous = hist.length > 1 ? hist[hist.length - 2] : null;

  if (latest) {
    const prevExpenses = previous ? previous.expenses : latest.expenses;
    const pctUp =
      prevExpenses > 0
        ? ROUND(((latest.expenses - prevExpenses) / prevExpenses) * 100)
        : 0;

    if (latest.expenses > latest.income) {
      recs.push({
        key: "expensesAboveIncome",
        type: "warning",
        params: {
          expenses: latest.expenses,
          income: latest.income,
          pct: pctUp >= 0 ? String(pctUp) : "0",
        },
      });
    } else if (pctUp > 0) {
      recs.push({
        key: "expensesRising",
        type: "tip",
        params: {
          pct: String(pctUp),
          prevMonth: previous ? previous.month : "",
        },
      });
    }
  }

  // Emergency fund: savings current amounts vs average monthly expenses.
  if (latest && latest.expenses > 0) {
    const savingsGoals = list.filter((g) => g.type === "savings");
    const totalSavings = savingsGoals.reduce((s, g) => s + g.currentAmount, 0);
    const avgExpenses = hist.reduce((s, m) => s + m.expenses, 0) / hist.length;
    const monthsCovered =
      avgExpenses > 0 ? ROUND(totalSavings / avgExpenses) : 0;
    if (monthsCovered < 3) {
      recs.push({
        key: "emergencyFund",
        type: "tip",
        params: { months: String(monthsCovered) },
      });
    }
  }

  // Debt progress.
  const debtGoals = list.filter((g) => g.type === "debt");
  for (const g of debtGoals) {
    const p = progressOf(g);
    if (p >= 50 && p < 100) {
      recs.push({
        key: "debtHalfway",
        type: "success",
        params: { title: g.title || "", pct: String(p) },
      });
      break;
    }
  }

  // Savings rate.
  if (latest && latest.income > 0) {
    const rate = ROUND(
      ((latest.income - latest.expenses) / latest.income) * 100,
    );
    if (rate < 15) {
      recs.push({
        key: "savingsRate",
        type: "tip",
        params: { rate: String(Math.max(0, rate)) },
      });
    }
  }

  // Contribution boost: any savings goal with a monthly contribution and a
  // target still > 12 months away at the current pace.
  const now = new Date();
  for (const g of list.filter((x) => x.type === "savings")) {
    if (g.monthlyContribution > 0 && g.targetDate) {
      const target = new Date(`${g.targetDate}T00:00:00`);
      const remaining = g.targetAmount - g.currentAmount;
      const monthsLeft =
        g.monthlyContribution > 0
          ? remaining / g.monthlyContribution
          : Infinity;
      if (remaining > 0 && monthsLeft > 12 && target > now) {
        recs.push({
          key: "boostContribution",
          type: "tip",
          params: { title: g.title || "" },
        });
        break;
      }
    }
  }

  // Always return something actionable.
  if (recs.length === 0) {
    recs.push({
      key: "savingsRate",
      type: "tip",
      params: { rate: "15" },
    });
  }

  return recs.slice(0, 5);
}
