// Insights service — deterministic smart insights computed from stored data.
// Each insight = { key, params, type: 'positive'|'warning'|'neutral' }.
// The UI localizes the key with t(`insights.${key}.title|body`) and formats
// numeric params (rate/prevRate/pct → percent, amount → currency, days → int).

import * as reportsService from "./reportsService";

const ROUND = (n) => Math.round(n * 10) / 10;
const roundInt = (n) => Math.round(n);

export function getInsights({ goals, history } = {}) {
  const list = goals && goals.length ? goals : [];
  const h = history && history.length ? history : reportsService.getHistory();
  const report = h.map((m) => {
    const savings = m.income - m.expenses;
    return {
      ...m,
      savings,
      savingsRate: m.income > 0 ? (savings / m.income) * 100 : 0,
    };
  });
  const latest = report[report.length - 1];
  const previous = report.length > 1 ? report[report.length - 2] : null;
  const insights = [];

  if (!latest) return insights;

  // 1. Savings rate trend (up / down / steady).
  const rate = ROUND(latest.savingsRate);
  if (previous) {
    const prevRate = ROUND(previous.savingsRate);
    if (rate > prevRate + 0.5) {
      insights.push({
        key: "savingsRateUp",
        type: "positive",
        params: { rate, prevRate },
      });
    } else if (rate < prevRate - 0.5) {
      insights.push({
        key: "savingsRateDown",
        type: "warning",
        params: { rate, prevRate },
      });
    } else {
      insights.push({
        key: "savingsRateSteady",
        type: "neutral",
        params: { rate },
      });
    }
  } else {
    insights.push({
      key: "savingsRateSteady",
      type: "neutral",
      params: { rate },
    });
  }

  // 2. Top spending category this month.
  const cats = Object.entries(latest.categories || {}).sort(
    (a, b) => b[1] - a[1],
  );
  if (cats.length) {
    insights.push({
      key: "topCategory",
      type: "neutral",
      params: { categoryKey: cats[0][0], amount: cats[0][1] },
    });
  }

  // 3. Expenses trend vs previous month.
  if (previous && previous.expenses > 0) {
    const pct = ROUND(
      ((latest.expenses - previous.expenses) / previous.expenses) * 100,
    );
    if (pct > 0.5) {
      insights.push({
        key: "expensesRising",
        type: "warning",
        params: { pct },
      });
    } else if (pct < -0.5) {
      insights.push({
        key: "expensesFalling",
        type: "positive",
        params: { pct: Math.abs(pct) },
      });
    }
  }

  // 4. Runway: total savings vs average daily expenses.
  const totalSavings = list
    .filter((g) => g.type === "savings")
    .reduce((s, g) => s + g.currentAmount, 0);
  const avgExpenses = h.length
    ? h.reduce((s, m) => s + m.expenses, 0) / h.length
    : 0;
  if (avgExpenses > 0 && totalSavings > 0) {
    const days = roundInt((totalSavings / avgExpenses) * 30);
    insights.push({
      key: "runway",
      type: days < 90 ? "warning" : "positive",
      params: { days: Math.max(0, days) },
    });
  }

  return insights.slice(0, 5);
}
