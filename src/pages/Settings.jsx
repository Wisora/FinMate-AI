// Settings — notifications toggle, currency, language, theme, reset demo data.
// All changes persist to localStorage and apply app-wide immediately.

import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { useSettings } from "../contexts/SettingsContext";
import { useToast } from "../components/common/Toast";
import { Spinner } from "../components/common/Spinner";
import { LANGUAGES, CURRENCIES } from "../i18n/translations";
import * as goalsService from "../services/goalsService";
import * as reportsService from "../services/reportsService";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`switch ${checked ? "switch-on" : ""}`}
      onClick={() => onChange(!checked)}
    >
      <span className="switch-track" aria-hidden="true">
        <span className="switch-thumb" />
      </span>
    </button>
  );
}

export default function Settings() {
  const { t, language, setLanguage } = useLanguage();
  const { settings, update } = useSettings();
  const { showToast } = useToast();
  const [resetting, setResetting] = useState(false);

  const handleReset = async () => {
    if (!window.confirm(t("settings.resetConfirm"))) return;
    setResetting(true);
    await delay(800); // simulated async
    goalsService.resetData();
    reportsService.resetData();
    setResetting(false);
    showToast(t("settings.dataReset"), "success");
  };

  const notify = () => showToast(t("settings.saved"), "success");

  return (
    <div className="page container narrow">
      <header className="page-head">
        <div>
          <h1 className="page-title">{t("settings.title")}</h1>
          <p className="page-sub">{t("settings.subtitle")}</p>
        </div>
      </header>

      <section className="card settings-card" aria-label={t("settings.title")}>
        <div className="setting-row">
          <div className="setting-info">
            <h2 className="setting-title">{t("settings.notifications")}</h2>
            <p className="setting-desc">{t("settings.notificationsDesc")}</p>
          </div>
          <Switch
            checked={settings.notifications}
            onChange={(v) => {
              update({ notifications: v });
              notify();
            }}
            label={t("settings.notifications")}
          />
        </div>

        <div className="setting-row">
          <div className="setting-info">
            <h2 className="setting-title">{t("settings.currency")}</h2>
            <p className="setting-desc">{t("settings.currencyDesc")}</p>
          </div>
          <select
            className="input setting-select"
            aria-label={t("settings.currency")}
            value={settings.currency}
            onChange={(e) => {
              update({ currency: e.target.value });
              notify();
            }}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="setting-row">
          <div className="setting-info">
            <h2 className="setting-title">{t("settings.language")}</h2>
            <p className="setting-desc">{t("settings.languageDesc")}</p>
          </div>
          <select
            className="input setting-select"
            aria-label={t("settings.language")}
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              notify();
            }}
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        <div className="setting-row">
          <div className="setting-info">
            <h2 className="setting-title">{t("settings.theme")}</h2>
            <p className="setting-desc">{t("settings.themeDesc")}</p>
          </div>
          <div
            className="theme-toggle"
            role="group"
            aria-label={t("settings.theme")}
          >
            <button
              type="button"
              className={`btn btn-sm ${settings.theme === "light" ? "btn-primary" : "btn-ghost"}`}
              aria-pressed={settings.theme === "light"}
              onClick={() => {
                update({ theme: "light" });
                notify();
              }}
            >
              {t("settings.light")}
            </button>
            <button
              type="button"
              className={`btn btn-sm ${settings.theme === "dark" ? "btn-primary" : "btn-ghost"}`}
              aria-pressed={settings.theme === "dark"}
              onClick={() => {
                update({ theme: "dark" });
                notify();
              }}
            >
              {t("settings.dark")}
            </button>
          </div>
        </div>

        <div className="setting-row setting-row-danger">
          <div className="setting-info">
            <h2 className="setting-title">{t("settings.resetData")}</h2>
            <p className="setting-desc">{t("settings.resetDataDesc")}</p>
          </div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleReset}
            disabled={resetting}
          >
            {resetting ? (
              <Spinner label={t("common.loading")} size={14} />
            ) : (
              t("settings.resetData")
            )}
          </button>
        </div>
      </section>
    </div>
  );
}
