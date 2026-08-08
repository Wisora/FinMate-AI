// Dashboard — goal cards, current-month report preview, recommendations,
// assistant chat, proactive alert + promo banner. All client-side/localStorage.

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "../i18n/LanguageContext";
import { useSettings } from "../contexts/SettingsContext";
import { useToast } from "../components/common/Toast";
import { PromoBanner } from "../components/common/PromoBanner";
import { Spinner } from "../components/common/Spinner";
import { GoalCard } from "../components/Dashboard/GoalCard";
import { ReportCard } from "../components/Dashboard/ReportCard";
import { RecommendationCard } from "../components/Dashboard/RecommendationCard";
import { AssistantChat } from "../components/Dashboard/AssistantChat";
import * as goalsService from "../services/goalsService";
import * as reportsService from "../services/reportsService";
import { getRecommendations } from "../services/recommendationsService";
import {
  isProPlan,
  visibleGoals,
  FREE_MAX_GOALS,
} from "../services/planService";
import { formatCurrency } from "../i18n/translations";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Dashboard() {
  const { t, locale } = useLanguage();
  const { settings } = useSettings();
  const { showToast } = useToast();

  const [goals, setGoals] = useState([]);
  const [history, setHistory] = useState([]);
  const [ready, setReady] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [contributingId, setContributingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({
    type: "savings",
    title: "",
    targetAmount: "",
    currentAmount: "",
    targetDate: "",
    monthlyContribution: "",
  });

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

  const recommendations = getRecommendations({ goals, history });
  const latest = history[history.length - 1];
  const alertVisible =
    settings.notifications && reportsService.expensesAboveIncome();
  const isPro = isProPlan(settings.plan);
  const shownGoals = visibleGoals(settings.plan, goals);
  const hiddenGoals = Math.max(0, goals.length - shownGoals.length);

  const setField = (name) => (e) =>
    setForm((prev) => ({ ...prev, [name]: e.target.value }));

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || Number(form.targetAmount) <= 0) return;
    if (!isPro && goals.length >= FREE_MAX_GOALS) {
      showToast(t("plan.goalLimit", { max: FREE_MAX_GOALS }), "error");
      return;
    }
    setSubmitting(true);
    await delay(700); // simulated async
    const added = goalsService.addGoal(form);
    setGoals(goalsService.getAll());
    setShowForm(false);
    setForm({
      type: "savings",
      title: "",
      targetAmount: "",
      currentAmount: "",
      targetDate: "",
      monthlyContribution: "",
    });
    setSubmitting(false);
    showToast(
      `${t("dashboard.goalAdded")}: ${added.titleKey ? t(added.titleKey) : added.title}`,
      "success",
    );
  };

  const handleContribute = async (id, amount) => {
    setContributingId(id);
    await delay(500); // simulated async
    goalsService.addContribution(id, amount);
    setGoals(goalsService.getAll());
    setContributingId(null);
    showToast(t("dashboard.contributionAdded"), "success");
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    await delay(350);
    goalsService.deleteGoal(id);
    setGoals(goalsService.getAll());
    setDeletingId(null);
    showToast(t("dashboard.goalDeleted"), "info");
  };

  const addGoalForm = (
    <form
      className="card add-goal-form"
      onSubmit={handleAddGoal}
      aria-label={t("dashboard.addGoalTitle")}
    >
      <h3 className="card-title">{t("dashboard.addGoalTitle")}</h3>
      <div className="form-grid">
        <div className="form-field">
          <label className="form-label" htmlFor="goal-type">
            {t("dashboard.goalType")}
          </label>
          <select
            id="goal-type"
            className="input"
            value={form.type}
            onChange={setField("type")}
          >
            <option value="savings">{t("dashboard.typeSavings")}</option>
            <option value="debt">{t("dashboard.typeDebt")}</option>
            <option value="investment">{t("dashboard.typeInvestment")}</option>
          </select>
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="goal-title">
            {t("dashboard.goalTitle")} *
          </label>
          <input
            id="goal-title"
            className="input"
            type="text"
            required
            value={form.title}
            onChange={setField("title")}
          />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="goal-target">
            {t("dashboard.goalTarget")} *
          </label>
          <input
            id="goal-target"
            className="input"
            type="number"
            min="1"
            step="any"
            required
            value={form.targetAmount}
            onChange={setField("targetAmount")}
          />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="goal-current">
            {t("dashboard.goalCurrent")}
          </label>
          <input
            id="goal-current"
            className="input"
            type="number"
            min="0"
            step="any"
            value={form.currentAmount}
            onChange={setField("currentAmount")}
          />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="goal-date">
            {t("dashboard.goalDate")}
          </label>
          <input
            id="goal-date"
            className="input"
            type="date"
            value={form.targetDate}
            onChange={setField("targetDate")}
          />
        </div>
        <div className="form-field">
          <label className="form-label" htmlFor="goal-monthly">
            {t("dashboard.goalMonthly")}
          </label>
          <input
            id="goal-monthly"
            className="input"
            type="number"
            min="0"
            step="any"
            value={form.monthlyContribution}
            onChange={setField("monthlyContribution")}
          />
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? (
            <>
              <Spinner label={t("common.loading")} size={14} />{" "}
              {t("common.saving")}…
            </>
          ) : (
            t("dashboard.goalSubmit")
          )}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => setShowForm(false)}
          disabled={submitting}
        >
          {t("common.cancel")}
        </button>
      </div>
    </form>
  );

  return (
    <div className="page container">
      <PromoBanner />

      {alertVisible && latest && (
        <div className="banner banner-alert" role="alert">
          <div className="banner-content">
            <strong className="banner-title">
              {t("dashboard.alertTitle")}
            </strong>
            <span className="banner-text">
              {t("dashboard.alertBody", {
                month: reportsService.monthLabel(latest.month, locale, {
                  month: "long",
                }),
                expenses: formatCurrency(
                  latest.expenses,
                  settings.currency,
                  locale,
                ),
                income: formatCurrency(
                  latest.income,
                  settings.currency,
                  locale,
                ),
              })}
            </span>
          </div>
        </div>
      )}

      <header className="page-head">
        <div>
          <h1 className="page-title">{t("dashboard.title")}</h1>
          <p className="page-sub">{t("dashboard.subtitle")}</p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowForm((v) => !v)}
        >
          {showForm ? t("common.cancel") : `+ ${t("dashboard.addGoal")}`}
        </button>
      </header>

      {showForm && addGoalForm}

      <section aria-labelledby="goals-title">
        <div className="section-head">
          <h2 id="goals-title" className="section-title">
            {t("dashboard.goalsTitle")}
          </h2>
          {!isPro && goals.length > 0 && (
            <span className="muted goal-count-chip">
              {t("plan.goalCount", {
                count: shownGoals.length,
                max: FREE_MAX_GOALS,
              })}
            </span>
          )}
        </div>
        {goals.length === 0 ? (
          <p className="card empty-state">{t("dashboard.noGoals")}</p>
        ) : (
          <>
            <div className="goals-grid">
              {shownGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  currency={settings.currency}
                  locale={locale}
                  contributing={contributingId === goal.id}
                  deleting={deletingId === goal.id}
                  onContribute={handleContribute}
                  onDelete={handleDelete}
                />
              ))}
            </div>
            {!isPro && hiddenGoals > 0 && (
              <div className="card goals-locked-note">
                <span aria-hidden="true">🔒</span>
                <span>
                  {t("plan.moreGoals", { count: hiddenGoals })}{" "}
                  <Link className="link" to="/upgrade">
                    {t("dashboard.promoCta")}
                  </Link>
                </span>
              </div>
            )}
          </>
        )}
      </section>

      <div className="dash-grid">
        <ReportCard
          history={history}
          currency={settings.currency}
          locale={locale}
        />
        <RecommendationCard
          recommendations={recommendations}
          currency={settings.currency}
          locale={locale}
        />
      </div>

      <AssistantChat goals={goals} history={history} />
    </div>
  );
}
