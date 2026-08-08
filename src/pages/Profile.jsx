// Profile — editable name/email (localStorage), current plan badge, financial
// health score with a gauge + factor breakdown, upgrade CTA, promo banner.

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "../i18n/LanguageContext";
import { useSettings } from "../contexts/SettingsContext";
import { useToast } from "../components/common/Toast";
import { PromoBanner } from "../components/common/PromoBanner";
import { Spinner } from "../components/common/Spinner";
import { HealthGauge } from "../components/charts/HealthGauge";
import * as profileService from "../services/profileService";
import * as goalsService from "../services/goalsService";
import * as reportsService from "../services/reportsService";
import { getHealthScore } from "../services/healthScoreService";
import { isProPlan } from "../services/planService";
import { formatPercent } from "../i18n/translations";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Profile() {
  const { t, locale } = useLanguage();
  const { settings } = useSettings();
  const { showToast } = useToast();

  const [form, setForm] = useState({ name: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [goals, setGoals] = useState([]);
  const [history, setHistory] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const p = profileService.load();
    setForm({ name: p.name, email: p.email });
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
  const health = getHealthScore({ goals, history });
  const ratingLabel = t(`health.${health.rating}`);

  const factorValue = (f) => {
    if (f.key === "health.savingsRate") return formatPercent(f.value, locale);
    if (f.key === "health.debtProgress") return `${f.value}%`;
    return t("health.months", { months: f.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    if (!name || !email) return;
    setSaving(true);
    await delay(500); // simulated async
    profileService.save({ name, email });
    setSaving(false);
    showToast(t("profile.saved"), "success");
  };

  const setField = (k) => (e) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  return (
    <div className="page container">
      <PromoBanner />

      <header className="page-head">
        <div>
          <h1 className="page-title">{t("profile.title")}</h1>
          <p className="page-sub">{t("profile.subtitle")}</p>
        </div>
      </header>

      <div className="profile-grid">
        <section className="card" aria-label={t("profile.title")}>
          <h2 className="card-title">{t("profile.title")}</h2>
          <form onSubmit={handleSave} className="profile-form">
            <div className="form-field">
              <label className="form-label" htmlFor="profile-name">
                {t("profile.name")}
              </label>
              <input
                id="profile-name"
                className="input"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={setField("name")}
                required
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="profile-email">
                {t("profile.email")}
              </label>
              <input
                id="profile-email"
                className="input"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={setField("email")}
                required
              />
            </div>
            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? (
                  <Spinner label={t("common.loading")} size={14} />
                ) : (
                  t("profile.save")
                )}
              </button>
            </div>
          </form>
        </section>

        <section className="card" aria-label={t("profile.plan")}>
          <h2 className="card-title">{t("profile.plan")}</h2>
          <div className="plan-badge-row">
            <span className={`badge ${isPro ? "badge-pro" : "badge-free"}`}>
              {isPro ? t("upgrade.proBadge") : t("upgrade.freeBadge")}
            </span>
            <span className="muted">{t("upgrade.currentPlan")}</span>
          </div>
          <p className="muted plan-desc">
            {isPro
              ? t("upgrade.youAreProDesc")
              : t("plan.goalLimit", { max: 3 })}
          </p>
          <Link className="btn btn-primary" to="/upgrade">
            {isPro ? t("profile.managePlan") : `⭐ ${t("profile.upgrade")}`}
          </Link>
        </section>
      </div>

      <section
        className="card health-card"
        aria-label={t("profile.healthTitle")}
      >
        <h2 className="card-title">{t("profile.healthTitle")}</h2>
        <p className="muted">{t("profile.healthDesc")}</p>
        <div className="health-grid">
          <HealthGauge
            score={health.score}
            label={ratingLabel}
            outOf100={t("profile.outOf100")}
          />
          <ul className="health-factors">
            {health.factors.map((f) => (
              <li className="health-factor" key={f.key}>
                <div className="health-factor-head">
                  <span>{t(f.key)}</span>
                  <strong>{factorValue(f)}</strong>
                  <span className="muted health-factor-score">
                    {f.score}/{f.max}
                  </span>
                </div>
                <div className="progress" role="presentation">
                  <div
                    className="progress-fill"
                    style={{ width: `${f.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
