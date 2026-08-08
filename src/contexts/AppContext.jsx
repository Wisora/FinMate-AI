// Composition root for app-wide providers + applies lang/dir/theme to <html>.
// SSR-safe: server renders defaults; the effect applies persisted values after
// hydration on the client.

import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "../i18n/LanguageContext";
import { SettingsProvider, useSettings } from "./SettingsContext";
import { ToastProvider } from "../components/common/Toast";

function ApplyAppState() {
  const { language, dir, t } = useLanguage();
  const { settings } = useSettings();

  useEffect(() => {
    const el = document.documentElement;
    el.lang = language;
    el.dir = dir;
    el.dataset.theme = settings.theme;
    document.title = `${t("app.name")} — ${t("app.tagline")}`;
  }, [language, dir, settings.theme, t]);

  return null;
}

export function AppProviders({ children }) {
  return (
    <LanguageProvider>
      <SettingsProvider>
        <ToastProvider>
          <ApplyAppState />
          {children}
        </ToastProvider>
      </SettingsProvider>
    </LanguageProvider>
  );
}
