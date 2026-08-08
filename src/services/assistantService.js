// Assistant service — deterministic rule-based intent matching over stored data.
// No external calls. The UI localizes the returned { key, params } with t().
// Intents: greeting, help, expense report for a month, saved last/this month,
// summary/balance, goals detail, recommendations, fallback.

import * as reportsService from "./reportsService";
import { getRecommendations } from "./recommendationsService";
import { getMonths, formatCurrency } from "../i18n/translations";
import { progressOf } from "./goalsService";

function includesAny(text, needles) {
  return needles.some((n) => text.includes(n));
}

// Find which month (1-12) the question refers to, if any.
function detectMonth(question, months) {
  const q = question.toLowerCase();
  const candidates = months.map((m) => m.toLowerCase());
  const english = getMonths("en").map((m) => m.toLowerCase());
  for (let i = 0; i < 12; i++) {
    if (q.includes(candidates[i]) || q.includes(english[i])) return i + 1;
  }
  return null;
}

function formatCategories(categories, t) {
  return Object.entries(categories || {})
    .sort((a, b) => b[1] - a[1])
    .map(([name, amount]) => `${t(`cats.${name}`)}: ${amount}`)
    .join(" · ");
}

export function getReply(
  question,
  { goals, history, t, lang, locale, currency },
) {
  const q = (question || "").toLowerCase().trim();
  const months = getMonths(lang);
  const monthIdx = detectMonth(question, months);
  const h = history && history.length ? history : reportsService.getHistory();
  const list = goals && goals.length ? goals : [];
  const latest = h[h.length - 1];
  const lastMonth = h.length > 1 ? h[h.length - 2] : latest;
  const money = (n) => formatCurrency(n, currency, locale);

  // Greeting
  if (
    includesAny(q, [
      "hello",
      "hi ",
      "hi!",
      "hey",
      "مرحبا",
      "hallo",
      "salut",
      "hola",
    ])
  ) {
    return { key: "assistant.hello" };
  }

  // Help
  if (
    includesAny(q, ["help", "wat kan", "aide", "ayuda", "مساعدة", "help me"])
  ) {
    return {
      key: "assistant.help",
      params: { month: months[new Date().getMonth()] },
    };
  }

  // Expense report for a specific month
  if (
    monthIdx &&
    includesAny(q, [
      "report",
      "rapport",
      "informe",
      "verslag",
      "تقرير",
      "expense",
      "spend",
    ])
  ) {
    const entry =
      h.find((m) => reportsService.parseMonthKey(m.month).month === monthIdx) ||
      null;
    if (!entry) {
      return {
        key: "assistant.noDataForMonth",
        params: {
          month: months[monthIdx - 1],
          latestMonth: latest
            ? reportsService.monthLabel(latest.month, locale)
            : "",
        },
      };
    }
    const top = Object.entries(entry.categories || {}).sort(
      (a, b) => b[1] - a[1],
    )[0];
    return {
      key: "assistant.expenseReport",
      params: {
        month: reportsService.monthLabel(entry.month, locale, {
          month: "long",
        }),
        expenses: entry.expenses,
        topCategory: top ? t(`cats.${top[0]}`) : "",
        topAmount: top ? top[1] : 0,
        categories: formatCategories(entry.categories, t),
      },
    };
  }

  // How much did I save last month
  if (
    includesAny(q, [
      "save",
      "spaar",
      "éparg",
      "ahorr",
      "ادّخر",
      "saved",
      "gespaar",
    ]) &&
    includesAny(q, [
      "last month",
      "verlede maand",
      "mois dernier",
      "mes pasado",
      "الشهر الماضي",
    ])
  ) {
    if (!lastMonth)
      return { key: "assistant.help", params: { month: months[0] } };
    const saved = lastMonth.income - lastMonth.expenses;
    return {
      key: "assistant.savedLastMonth",
      params: {
        amount: saved,
        month: reportsService.monthLabel(lastMonth.month, locale, {
          month: "long",
        }),
        income: lastMonth.income,
        expenses: lastMonth.expenses,
      },
    };
  }

  // How much did I save this month (so far)
  if (
    includesAny(q, [
      "save",
      "spaar",
      "éparg",
      "ahorr",
      "ادّخر",
      "saved",
      "gespaar",
    ]) &&
    includesAny(q, [
      "this month",
      "hierdie maand",
      "ce mois",
      "este mes",
      "هذا الشهر",
    ])
  ) {
    if (!latest) return { key: "assistant.help", params: { month: months[0] } };
    const saved = latest.income - latest.expenses;
    return {
      key: "assistant.savedThisMonth",
      params: {
        amount: saved,
        month: reportsService.monthLabel(latest.month, locale, {
          month: "long",
        }),
        income: latest.income,
        expenses: latest.expenses,
      },
    };
  }

  // Balance across goals (pure balance question)
  if (includesAny(q, ["balance", "saldo", "solde", "رصيد", "balans"])) {
    const total = list.reduce((s, g) => s + g.currentAmount, 0);
    return { key: "assistant.balance", params: { amount: total } };
  }

  // Overall summary: month income/expenses/savings + balance across goals
  if (
    latest &&
    includesAny(q, [
      "summary",
      "overview",
      "sommaire",
      "résumé",
      "resumen",
      "opsomming",
      "ملخص",
      "نظرة",
      "status",
    ])
  ) {
    const total = list.reduce((s, g) => s + g.currentAmount, 0);
    const savings = latest.income - latest.expenses;
    const rate =
      latest.income > 0 ? Math.round((savings / latest.income) * 1000) / 10 : 0;
    return {
      key: "assistant.summary",
      params: {
        month: reportsService.monthLabel(latest.month, locale, {
          month: "long",
        }),
        income: latest.income,
        expenses: latest.expenses,
        savings,
        rate: `${rate}%`,
        balance: total,
      },
    };
  }

  // Goals: what are my goals / how are they doing
  if (
    includesAny(q, [
      "goal",
      "doelwit",
      "objectif",
      "meta",
      "هدف",
      "أهداف",
      "progress",
      "vordering",
      "progres",
      "how are",
      "goals",
    ])
  ) {
    if (list.length === 0) {
      return { key: "assistant.noGoals" };
    }
    const lines = list.map((g) => {
      const pct = progressOf(g);
      const title = g.titleKey ? t(g.titleKey) : g.title || "";
      return `• ${title}: ${pct}% (${money(g.currentAmount)} ${t("assistant.of")} ${money(g.targetAmount)})`;
    });
    return {
      key: "assistant.goalsDetail",
      params: { lines: lines.join("\n") },
    };
  }

  // Recommendations
  if (
    includesAny(q, [
      "recommend",
      "advice",
      "tip",
      "توص",
      "conseil",
      "consejo",
      "aanbevel",
      "suggest",
    ])
  ) {
    const recs = getRecommendations({ goals: list, history: h });
    const lines = recs
      .map((r) => `• ${t(`rec.${r.key}.title`, r.params || {})}`)
      .join("\n");
    return { key: "assistant.recommend", params: { list: lines } };
  }

  // Fallback
  return { key: "assistant.fallback" };
}
