// Insights list — localizes { key, params, type } objects from insightsService.

import { useLanguage } from "../../i18n/LanguageContext";
import { formatCurrency, formatPercent } from "../../i18n/translations";

const ICONS = { positive: "📈", warning: "⚠️", neutral: "💡" };

export function InsightsList({ insights, currency, locale }) {
  const { t } = useLanguage();
  if (!insights || insights.length === 0) return null;
  return (
    <section className="card" aria-label={t("insights.title")}>
      <header className="card-head">
        <h3 className="card-title">{t("insights.title")}</h3>
      </header>
      <ul className="rec-list">
        {insights.map((ins, i) => {
          const params = { ...ins.params };
          if ("categoryKey" in params) {
            params.category = t(`cats.${params.categoryKey}`);
            delete params.categoryKey;
          }
          if ("amount" in params)
            params.amount = formatCurrency(params.amount, currency, locale);
          if ("rate" in params)
            params.rate = formatPercent(Number(params.rate), locale);
          if ("prevRate" in params)
            params.prevRate = formatPercent(Number(params.prevRate), locale);
          if ("pct" in params)
            params.pct = formatPercent(Number(params.pct), locale);
          if ("days" in params) params.days = String(Math.round(params.days));
          return (
            <li className={`rec-item rec-${ins.type}`} key={`${ins.key}-${i}`}>
              <span className="rec-icon" aria-hidden="true">
                {ICONS[ins.type] || ICONS.neutral}
              </span>
              <div>
                <strong className="rec-title">
                  {t(`insights.${ins.key}.title`, params)}
                </strong>
                <p className="rec-body">
                  {t(`insights.${ins.key}.body`, params)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
