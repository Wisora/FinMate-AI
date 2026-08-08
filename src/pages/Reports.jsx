// Reports — Weekly/Monthly tabs with CSS/SVG charts, smart insights, CSV export
// (Pro) and Pro gating (Free users get the current-month summary + upgrade CTA).

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "../i18n/LanguageContext";
import { useSettings } from "../contexts/SettingsContext";
import { useToast } from "../components/common/Toast";
import { PromoBanner } from "../components/common/PromoBanner";
import { Spinner } from "../components/common/Spinner";
import { BarChart, ChartLegend } from "../components/charts/BarChart";
import { DonutChart } from "../components/charts/DonutChart";
import { LineChart } from "../components/charts/LineChart";
import { InsightsList } from "../components/Reports/InsightsList";
import * as goalsService from "../services/goalsService";
import * as reportsService from "../services/reportsService";
import { getInsights } from "../services/insightsService";
import { buildCsv, downloadCsv } from "../services/csvService";
import { isProPlan } from "../services/planService";
import { formatCurrency, formatPercent } from "../i18n/translations";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Reports() {
  const { t, locale } = useLanguage();
  const { settings } = useSettings();
  const { showToast } = useToast();

  const [goals, setGoals] = useState([]);
  const [history, setHistory] = useState([]);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState("monthly");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    setGoals(goalsService.getAll());
    setHistory(reportsService.getHistory());
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="page container page-loading" role="status">
        <Spinner label={t("common.loading")} size={26} />
        <span className="sr-only">{t("common.loading")}</span>
      </div>
    );
  }

  const isPro = isProPlan(settings.plan);
  const currency = settings.currency;
  const money = (n) => formatCurrency(n, currency, locale);
  const pct = (n) => formatPercent(Math.round(Number(n) * 10) / 10, locale);

  const weekly = reportsService.getWeeklyReport();
  const monthly = reportsService.getMonthlyReport();
  const insights = getInsights({ goals, history });
  const latest = monthly[monthly.length - 1];
  const latestCategories = latest
    ? Object.entries(latest.categories || {})
        .sort((a, b) => b[1] - a[1])
        .map(([name, value]) => ({ label: t(`cats.${name}`), value }))
    : [];
  const monthLabels = monthly.map((m) =>
    reportsService.monthLabel(m.month, locale, { month: "long" }),
  );

  const handleExport = async () => {
    setExporting(true);
    await delay(500); // simulated async
    const headers = {
      goalsSection: t("csv.goalsSection"),
      monthlySection: t("csv.monthlySection"),
      type: t("csv.type"),
      title: t("csv.title"),
      current: t("csv.current"),
      target: t("csv.target"),
      progress: t("csv.progress"),
      targetDate: t("csv.targetDate"),
      monthlyContribution: t("csv.monthlyContribution"),
      month: t("csv.month"),
      income: t("csv.income"),
      expenses: t("csv.expenses"),
      savings: t("csv.savings"),
      savingsRate: t("csv.savingsRate"),
    };
    const csv = buildCsv({ goals, history: monthly, headers, monthLabels });
    downloadCsv(
      `finmate-export-${new Date().toISOString().slice(0, 10)}.csv`,
      csv,
    );
    setExporting(false);
    showToast(t("reports.exportDone"), "success");
  };

  const weeklyGroups = weekly.weeks.map((w) => ({
    label: w.label,
    income: w.income,
    expenses: w.expenses,
  }));
  const monthlyGroups = monthly.map((m) => ({
    label: reportsService.shortMonthLabel(m.month, locale),
    income: m.income,
    expenses: m.expenses,
  }));

  const currentMonthStats = latest ? (
    <dl className="stat-grid">
      <div className="stat">
        <dt>{t("dashboard.reportIncome")}</dt>
        <dd className="stat-value stat-income">{money(latest.income)}</dd>
      </div>
      <div className="stat">
        <dt>{t("dashboard.reportExpenses")}</dt>
        <dd className="stat-value stat-expenses">{money(latest.expenses)}</dd>
      </div>
      <div className="stat">
        <dt>{t("dashboard.reportSavings")}</dt>
        <dd
          className={`stat-value ${latest.savings < 0 ? "stat-negative" : "stat-positive"}`}
        >
          {money(latest.savings)}
        </dd>
      </div>
      <div className="stat">
        <dt>{t("dashboard.reportRate")}</dt>
        <dd
          className={`stat-value ${latest.savingsRate < 0 ? "stat-negative" : "stat-positive"}`}
        >
          {pct(latest.savingsRate)}
        </dd>
      </div>
    </dl>
  ) : null;

  const legend = (
    <ChartLegend
      items={[
        { label: t("dashboard.reportIncome"), swatch: "income" },
        { label: t("dashboard.reportExpenses"), swatch: "expenses" },
      ]}
    />
  );

  return (
    <div className="page container">
      <PromoBanner />

      <header className="page-head">
        <div>
          <h1 className="page-title">{t("reports.title")}</h1>
          <p className="page-sub">{t("reports.subtitle")}</p>
        </div>
        {isPro && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleExport}
            disabled={exporting}
          >
            {exporting ? (
              <Spinner label={t("common.loading")} size={14} />
            ) : (
              `⬇ ${t("reports.exportCsv")}`
            )}
          </button>
        )}
      </header>

      {history.length === 0 ? (
        <p className="card empty-state">{t("reports.noData")}</p>
      ) : !isPro ? (
        <>
          <section className="card" aria-label={t("reports.currentMonth")}>
            <h2 className="card-title">{t("reports.currentMonth")}</h2>
            {currentMonthStats}
          </section>
          <section
            className="card locked-card"
            aria-label={t("reports.lockedTitle")}
          >
            <span className="locked-icon" aria-hidden="true">
              🔒
            </span>
            <h2 className="card-title">{t("reports.lockedTitle")}</h2>
            <p className="muted">{t("reports.lockedBody")}</p>
            <Link className="btn btn-primary" to="/upgrade">
              {t("reports.lockedCta")}
            </Link>
          </section>
        </>
      ) : (
        <>
          <div className="tabs" role="tablist" aria-label={t("reports.title")}>
            <button
              type="button"
              role="tab"
              id="tab-monthly"
              aria-selected={tab === "monthly"}
              aria-controls="panel-monthly"
              className={`tab-btn ${tab === "monthly" ? "tab-active" : ""}`}
              onClick={() => setTab("monthly")}
            >
              {t("reports.tabMonthly")}
            </button>
            <button
              type="button"
              role="tab"
              id="tab-weekly"
              aria-selected={tab === "weekly"}
              aria-controls="panel-weekly"
              className={`tab-btn ${tab === "weekly" ? "tab-active" : ""}`}
              onClick={() => setTab("weekly")}
            >
              {t("reports.tabWeekly")}
            </button>
          </div>

          <div
            id="panel-monthly"
            role="tabpanel"
            aria-labelledby="tab-monthly"
            hidden={tab !== "monthly"}
          >
            <p className="muted report-desc">{t("reports.monthlyDesc")}</p>
            {currentMonthStats}
            <section
              className="card"
              aria-label={t("reports.incomeVsExpenses")}
            >
              <h3 className="chart-title">{t("reports.incomeVsExpenses")}</h3>
              <BarChart
                groups={monthlyGroups}
                incomeLabel={t("dashboard.reportIncome")}
                expensesLabel={t("dashboard.reportExpenses")}
                valueFormatter={money}
                ariaLabel={`${t("reports.incomeVsExpenses")}: ${monthly
                  .map(
                    (m) =>
                      `${reportsService.monthLabel(m.month, locale, { month: "long" })} ${money(m.income)} ${money(m.expenses)}`,
                  )
                  .join("; ")}`}
              />
              {legend}
            </section>

            <div className="report-grid">
              <section
                className="card"
                aria-label={t("reports.categoryBreakdown")}
              >
                <h3 className="chart-title">
                  {t("reports.categoryBreakdown")}
                </h3>
                <DonutChart data={latestCategories} formatValue={money} />
              </section>
              <section className="card" aria-label={t("reports.savingsTrend")}>
                <h3 className="chart-title">{t("reports.savingsTrend")}</h3>
                <LineChart
                  points={monthly.map((m) => ({
                    label: reportsService.shortMonthLabel(m.month, locale),
                    value: m.savings,
                  }))}
                  formatValue={money}
                />
              </section>
            </div>
          </div>

          <div
            id="panel-weekly"
            role="tabpanel"
            aria-labelledby="tab-weekly"
            hidden={tab !== "weekly"}
          >
            <p className="muted report-desc">
              {t("reports.weeklyDesc", {
                month: reportsService.monthLabel(weekly.month, locale, {
                  month: "long",
                }),
              })}
            </p>
            <section
              className="card"
              aria-label={t("reports.incomeVsExpenses")}
            >
              <h3 className="chart-title">{t("reports.incomeVsExpenses")}</h3>
              <BarChart
                groups={weeklyGroups}
                incomeLabel={t("dashboard.reportIncome")}
                expensesLabel={t("dashboard.reportExpenses")}
                valueFormatter={money}
                ariaLabel={`${t("reports.incomeVsExpenses")}: ${weekly.weeks
                  .map(
                    (w) => `${w.label} ${money(w.income)} ${money(w.expenses)}`,
                  )
                  .join("; ")}`}
              />
              {legend}
            </section>
          </div>

          <InsightsList
            insights={insights}
            currency={currency}
            locale={locale}
          />
        </>
      )}
    </div>
  );
}
