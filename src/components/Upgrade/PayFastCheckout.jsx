// PayFast checkout — renders the real PayFast POST form when the three env
// vars are configured (VITE_PAYFAST_MERCHANT_ID / _KEY / _PASSPHRASE); otherwise
// a clear "payments are being set up" demo state with a demo-unlock button.
// Never fabricates credentials or fake success.

import { useLanguage } from "../../i18n/LanguageContext";
import { Spinner } from "../common/Spinner";
import {
  PAYFAST_PROCESS_URL,
  payfastConfigured,
  buildPayfastParams,
} from "../../services/payfastService";

export function PayFastCheckout({ price, itemName, busy, onDemoUnlock }) {
  const { t } = useLanguage();
  const configured = payfastConfigured();

  if (configured) {
    const params = buildPayfastParams({ amount: "79.00", itemName });
    return (
      <section
        className="card checkout-card"
        aria-label={t("upgrade.payfastTitle")}
      >
        <h3 className="card-title">{t("upgrade.payfastTitle")}</h3>
        <p className="muted">
          {itemName} — {t("upgrade.pricePro")}
          {t("upgrade.perMonth")}
        </p>
        <form method="POST" action={PAYFAST_PROCESS_URL}>
          {Object.entries(params).map(([k, v]) => (
            <input type="hidden" name={k} value={v} key={k} />
          ))}
          <button type="submit" className="btn btn-primary btn-lg">
            {t("upgrade.payButton", { price })}
          </button>
        </form>
        <p className="muted checkout-secured">{t("upgrade.securedBy")}</p>
      </section>
    );
  }

  return (
    <section
      className="card checkout-card"
      aria-label={t("upgrade.payfastSetupTitle")}
    >
      <span className="checkout-icon" aria-hidden="true">
        🔧
      </span>
      <h3 className="card-title">{t("upgrade.payfastSetupTitle")}</h3>
      <p className="muted">{t("upgrade.payfastSetupBody")}</p>
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={onDemoUnlock}
        disabled={busy}
      >
        {busy ? (
          <Spinner label={t("common.loading")} size={16} />
        ) : (
          `⭐ ${t("upgrade.demoUnlock")}`
        )}
      </button>
      <p className="muted checkout-demo-note">{t("upgrade.demoUnlockDesc")}</p>
    </section>
  );
}
