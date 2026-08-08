// Goal card: type badge, progress bar with %, amounts, target date,
// monthly contribution, quick contribution + delete.

import { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { formatCurrency } from "../../i18n/translations";
import { progressOf } from "../../services/goalsService";
import { Spinner } from "../common/Spinner";

const TYPE_CLASS = {
  savings: "savings",
  debt: "debt",
  investment: "investment",
};

export function GoalCard({
  goal,
  currency,
  locale,
  contributing,
  deleting,
  onContribute,
  onDelete,
}) {
  const { t } = useLanguage();
  const [amount, setAmount] = useState("");
  const progress = progressOf(goal);
  const title = goal.titleKey ? t(goal.titleKey) : goal.title;

  const submit = (e) => {
    e.preventDefault();
    const value = Number(amount);
    if (!value || value <= 0) return;
    onContribute(goal.id, value);
    setAmount("");
  };

  let dateLabel = null;
  if (goal.targetDate) {
    try {
      dateLabel = new Date(`${goal.targetDate}T00:00:00`).toLocaleDateString(
        locale,
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        },
      );
    } catch {
      dateLabel = goal.targetDate;
    }
  }

  return (
    <article
      className={`card goal-card goal-${TYPE_CLASS[goal.type] || "savings"}`}
    >
      <header className="goal-card-head">
        <span className={`badge badge-${TYPE_CLASS[goal.type] || "savings"}`}>
          {t(
            `dashboard.type${goal.type[0].toUpperCase()}${goal.type.slice(1)}`,
          )}
        </span>
        <button
          type="button"
          className="icon-btn icon-btn-danger"
          aria-label={t("dashboard.deleteGoal")}
          title={t("dashboard.deleteGoal")}
          disabled={deleting}
          onClick={() => onDelete(goal.id)}
        >
          🗑
        </button>
      </header>

      <h3 className="goal-title">{title}</h3>

      <div className="goal-amounts">
        <span className="goal-current">
          {formatCurrency(goal.currentAmount, currency, locale)}
        </span>
        <span className="goal-target">
          {t("dashboard.of")}{" "}
          {formatCurrency(goal.targetAmount, currency, locale)}
        </span>
      </div>

      <div
        className="progress"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label={`${title} — ${t("dashboard.progress")}`}
      >
        <span className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="progress-label">
        <span>{progress}%</span>
        <span>{t("dashboard.progress")}</span>
      </div>

      <dl className="goal-meta">
        {dateLabel && (
          <div className="goal-meta-item">
            <dt>{t("dashboard.targetDate")}</dt>
            <dd>{dateLabel}</dd>
          </div>
        )}
        {goal.monthlyContribution > 0 && (
          <div className="goal-meta-item">
            <dt>{t("dashboard.monthlyContribution")}</dt>
            <dd>
              {formatCurrency(goal.monthlyContribution, currency, locale)}
            </dd>
          </div>
        )}
      </dl>

      <form className="contribute-form" onSubmit={submit}>
        <label className="sr-only" htmlFor={`contribute-${goal.id}`}>
          {t("dashboard.contributeLabel")}
        </label>
        <input
          id={`contribute-${goal.id}`}
          className="input input-sm"
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          placeholder={t("dashboard.contributeLabel")}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-secondary btn-sm"
          disabled={contributing || !amount}
        >
          {contributing ? (
            <Spinner label={t("common.loading")} size={14} />
          ) : (
            t("dashboard.contribute")
          )}
        </button>
      </form>
    </article>
  );
}
