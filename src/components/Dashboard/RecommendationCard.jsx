// Recommendation card: rule-based tips derived from real data.

import { useLanguage } from "../../i18n/LanguageContext";
import { formatCurrency, formatPercent } from "../../i18n/translations";

const ICONS = { warning: "⚠️", tip: "💡", success: "✅" };

export function RecommendationCard({ recommendations, currency, locale }) {
  const { t } = useLanguage();

  return (
    <section className="card" aria-label={t("dashboard.recommendationsTitle")}>
      <header className="card-head">
        <h2 className="card-title">{t("dashboard.recommendationsTitle")}</h2>
      </header>
      {recommendations.length === 0 ? (
        <p className="muted">{t("dashboard.noGoals")}</p>
      ) : (
        <ul className="rec-list">
          {recommendations.map((rec, i) => {
            const params = { ...rec.params };
            if ("expenses" in params)
              params.expenses = formatCurrency(
                params.expenses,
                currency,
                locale,
              );
            if ("income" in params)
              params.income = formatCurrency(params.income, currency, locale);
            if ("rate" in params)
              params.rate = formatPercent(Number(params.rate), locale);
            if ("pct" in params) params.pct = `${params.pct}%`;
            if ("months" in params) params.months = String(params.months);
            return (
              <li
                className={`rec-item rec-${rec.type}`}
                key={`${rec.key}-${i}`}
              >
                <span className="rec-icon" aria-hidden="true">
                  {ICONS[rec.type] || ICONS.tip}
                </span>
                <div>
                  <strong className="rec-title">
                    {t(`rec.${rec.key}.title`, params)}
                  </strong>
                  <p className="rec-body">{t(`rec.${rec.key}.body`, params)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
