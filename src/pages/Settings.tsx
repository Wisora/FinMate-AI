import React, { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { CurrencyCode, LanguageCode, SettingsState } from "../types";
import { currencies } from "../i18n/translations";
import {
  Settings as SettingsIcon,
  Globe,
  DollarSign,
  Moon,
  Sun,
  Bell,
  ShieldCheck,
  CheckCircle2,
  Save,
  RotateCcw,
  Volume2,
} from "lucide-react";

interface SettingsProps {
  showToast: (
    msg: string,
    type?: "success" | "warning" | "error" | "info",
  ) => void;
}

export const Settings: React.FC<SettingsProps> = ({ showToast }) => {
  const { settings, updateSettings, t, formatCurrency } = useLanguage();

  const [localSettings, setLocalSettings] = useState<SettingsState>(settings);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(localSettings);
    showToast(t("settingsSaved"), "success");
  };

  const handleReset = () => {
    localStorage.clear();
    showToast("Application data & settings reset to initial state.", "info");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-emerald-500" />
          <span>{t("settings")}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize language, default currency, dark theme, and proactive
          alerts.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Localization & Regional Settings Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
            <Globe className="w-5 h-5 text-emerald-500" />
            <span>Regional & Language Configuration</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Language Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                {t("language")}
              </label>
              <select
                value={localSettings.language}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    language: e.target.value as LanguageCode,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="en">English (US / UK)</option>
                <option value="af">Afrikaans (ZA)</option>
                <option value="fr">Français (FR)</option>
                <option value="es">Español (ES)</option>
                <option value="ar">العربية (Arabic - RTL)</option>
              </select>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Switches all interface translations and direction layout.
              </p>
            </div>

            {/* Currency Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                {t("currency")}
              </label>
              <select
                value={localSettings.currency}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    currency: e.target.value as CurrencyCode,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {Object.keys(currencies).map((code) => {
                  const curr = currencies[code as CurrencyCode];
                  return (
                    <option key={code} value={code}>
                      {curr.name} ({curr.symbol})
                    </option>
                  );
                })}
              </select>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                All goal amounts & reports convert dynamically to{" "}
                {localSettings.currency}.
              </p>
            </div>
          </div>
        </div>

        {/* Theme & Visual Preferences */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
            <Moon className="w-5 h-5 text-indigo-500" />
            <span>Theme & Accessibility</span>
          </h2>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                {localSettings.darkMode ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {t("darkMode")}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  High-contrast dark color palette for evening use.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setLocalSettings({
                  ...localSettings,
                  darkMode: !localSettings.darkMode,
                })
              }
              aria-checked={localSettings.darkMode}
              role="switch"
              className={`w-14 h-8 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                localSettings.darkMode ? "bg-emerald-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full bg-white absolute top-1 transition-transform ${
                  localSettings.darkMode ? "right-1" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Proactive Notification Controls */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
            <Bell className="w-5 h-5 text-amber-500" />
            <span>Proactive Notifications & Alerts</span>
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {t("overspendingAlerts")}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Notify when monthly expenses exceed 75% of total income.
                </p>
              </div>
              <input
                type="checkbox"
                checked={localSettings.alertOverspending}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    alertOverspending: e.target.checked,
                  })
                }
                className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {t("goalAlerts")}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Notify when goals hit 85%+ completion milestones.
                </p>
              </div>
              <input
                type="checkbox"
                checked={localSettings.alertGoalMilestones}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    alertGoalMilestones: e.target.checked,
                  })
                }
                className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-rose-300 dark:border-rose-900 text-rose-600 dark:text-rose-400 font-bold text-xs hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Data to Sample Defaults</span>
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-colors focus:ring-2 focus:ring-emerald-500"
          >
            <Save className="w-4 h-4" />
            <span>{t("saveSettings")}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
