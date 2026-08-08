// /success — confirmation state shown after a PayFast checkout redirect.

import { Link } from "@tanstack/react-router";
import { useLanguage } from "../i18n/LanguageContext";

export default function Success() {
  const { t } = useLanguage();
  return (
    <div className="page container narrow">
      <section className="card placeholder-card checkout-state" role="status">
        <span
          className="checkout-icon checkout-icon-success"
          aria-hidden="true"
        >
          ✅
        </span>
        <h1 className="page-title">{t("checkout.successTitle")}</h1>
        <p className="page-sub">{t("checkout.successBody")}</p>
        <p className="muted">{t("checkout.successNote")}</p>
        <div className="form-actions">
          <Link className="btn btn-primary" to="/dashboard">
            {t("checkout.successCta")}
          </Link>
        </div>
      </section>
    </div>
  );
}
