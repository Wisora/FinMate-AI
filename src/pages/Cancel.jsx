// /cancel — cancellation state shown when a user abandons PayFast checkout.

import { Link } from "@tanstack/react-router";
import { useLanguage } from "../i18n/LanguageContext";

export default function Cancel() {
  const { t } = useLanguage();
  return (
    <div className="page container narrow">
      <section className="card placeholder-card checkout-state" role="status">
        <span className="checkout-icon" aria-hidden="true">
          ↩️
        </span>
        <h1 className="page-title">{t("checkout.cancelTitle")}</h1>
        <p className="page-sub">{t("checkout.cancelBody")}</p>
        <div className="form-actions">
          <Link className="btn btn-primary" to="/upgrade">
            {t("checkout.cancelCta")}
          </Link>
          <Link className="btn btn-secondary" to="/dashboard">
            {t("checkout.cancelAlt")}
          </Link>
        </div>
      </section>
    </div>
  );
}
