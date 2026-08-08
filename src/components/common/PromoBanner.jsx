// Dismissible promo banner (used on the Dashboard to advertise the Pro tier).
// Dismissal persists in localStorage.

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "../../i18n/LanguageContext";
import { useSettings } from "../../contexts/SettingsContext";
import { isProPlan } from "../../services/planService";
import * as settingsService from "../../services/settingsService";

export function PromoBanner() {
  const { t } = useLanguage();
  const { settings } = useSettings();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDismissed(settingsService.load().promoDismissed);
  }, []);

  if (dismissed || isProPlan(settings.plan)) return null;

  return (
    <aside
      className="banner banner-pro"
      role="region"
      aria-label={t("dashboard.promoTitle")}
    >
      <div className="banner-content">
        <strong className="banner-title">{t("dashboard.promoTitle")}</strong>
        <span className="banner-text">{t("dashboard.promoBody")}</span>
      </div>
      <div className="banner-actions">
        <Link className="btn btn-primary btn-sm" to="/upgrade">
          {t("dashboard.promoCta")}
        </Link>
        <button
          type="button"
          className="banner-close"
          aria-label={t("dashboard.dismiss")}
          onClick={() => {
            settingsService.save({ promoDismissed: true });
            setDismissed(true);
          }}
        >
          ×
        </button>
      </div>
    </aside>
  );
}
