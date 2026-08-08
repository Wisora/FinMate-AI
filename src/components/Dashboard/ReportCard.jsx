// Report preview card: current-month summary (income / expenses / savings /
// savings rate) plus a lightweight CSS bar chart of the last 6 months.

import { Link } from "@tanstack/react-router";
import { useLanguage } from "../../i18n/LanguageContext";
import { formatCurrency, formatPercent } from "../../i18n/translations";
import { monthLabel, shortMonthLabel } from "../../services/reportsService";

export function ReportCard({ history, currency, locale }) {
  const { t } = useLanguage();
  if (!history || history.length === 0) return null;

  const latest = history[history.length - 1];
  const savings = latest.income - latest.expenses;
  const rate = latest.income > 0 ? (savings / latest.income) * 100 : 0;
  const max = Math.max(
    ...history.map((m) => Math.max(m.income, m.expenses)),
    1,
  );

  const summary = history
    .map(
      (m) =>
        `${monthLabel(m.month, locale, { month: "long" })}: income ${formatCurrency(m.income, currency, locale)}, expenses ${formatCurrency(m.expenses, currency, locale)}`,
    )
    .join("; ");

  return (
    <section className="card" aria-label={t("dashboard.reportTitle")}>
      <header className="card-head">
        <h2 className="card-title">{t("dashboard.reportTitle")}</h2>
        <Link className="link" to="/reports">
          {t("dashboard.viewFullReports")}
        </Link>
      </header>

      <dl className="stat-grid">
        <div className="stat">
          <dt>{t("dashboard.reportIncome")}</dt>
          <dd className="stat-value stat-income">
            {formatCurrency(latest.income, currency, locale)}
          </dd>
        </div>
        <div className="stat">
          <dt>{t("dashboard.reportExpenses")}</dt>
          <dd className="stat-value stat-expenses">
            {formatCurrency(latest.expenses, currency, locale)}
          </dd>
        </div>
        <div className="stat">
          <dt>{t("dashboard.reportSavings")}</dt>
          <dd
            className={`stat-value ${savings < 0 ? "stat-negative" : "stat-positive"}`}
          >
            {formatCurrency(savings, currency, locale)}
          </dd>
        </div>
        <div className="stat">
          <dt>{t("dashboard.reportRate")}</dt>
          <dd
            className={`stat-value ${rate < 0 ? "stat-negative" : "stat-positive"}`}
          >
            {formatPercent(Math.round(rate * 10) / 10, locale)}
          </dd>
        </div>
      </dl>

      <h3 className="chart-title">{t("dashboard.lastSixMonths")}</h3>
      <div
        className="bar-chart"
        role="img"
        aria-label={`${t("dashboard.lastSixMonths")}: ${summary}`}
      >
        {history.map((m) => (
          <div className="bar-col" key={m.month}>
            <div className="bar-bars">
              <div
                className="bar bar-income"
                style={{ height: `${Math.max(2, (m.income / max) * 100)}%` }}
                title={`${t("dashboard.reportIncome")} ${formatCurrency(m.income, currency, locale)}`}
              />
              <div
                className="bar bar-expenses"
                style={{ height: `${Math.max(2, (m.expenses / max) * 100)}%` }}
                title={`${t("dashboard.reportExpenses")} ${formatCurrency(m.expenses, currency, locale)}`}
              />
            </div>
            <span className="bar-label">
              {shortMonthLabel(m.month, locale)}
            </span>
          </div>
        ))}
      </div>
      <div className="chart-legend">
        <span className="legend-item">
          <i className="swatch swatch-income" aria-hidden="true" />{" "}
          {t("dashboard.reportIncome")}
        </span>
        <span className="legend-item">
          <i className="swatch swatch-expenses" aria-hidden="true" />{" "}
          {t("dashboard.reportExpenses")}
        </span>
      </div>
    </section>
  );
}
