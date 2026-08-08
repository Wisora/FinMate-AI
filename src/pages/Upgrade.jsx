// Upgrade — Free vs Pro comparison table, price card, PayFast checkout form
// (env-driven; demo state + demo-unlock without credentials), success/cancel.

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "../i18n/LanguageContext";
import { useSettings } from "../contexts/SettingsContext";
import { useToast } from "../components/common/Toast";
import { PayFastCheckout } from "../components/Upgrade/PayFastCheckout";
import { isProPlan } from "../services/planService";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ROWS = [
  ["rowGoals", "rowGoalsFree", "rowGoalsPro"],
  ["rowReports", "rowReportsFree", "rowReportsPro"],
  ["rowInsights", "rowInsightsFree", "rowInsightsPro"],
  ["rowExport", "rowExportFree", "rowExportPro"],
  ["rowAssistant", "rowAssistantFree", "rowAssistantPro"],
];

export default function Upgrade() {
  const { t } = useLanguage();
  const { settings, update } = useSettings();
  const { showToast } = useToast();
  const [demoBusy, setDemoBusy] = useState(false);

  const isPro = isProPlan(settings.plan);
  const price = `${t("upgrade.pricePro")}${t("upgrade.perMonth")}`;

  const handleDemoUnlock = async () => {
    setDemoBusy(true);
    await delay(700); // simulated async
    update({ plan: "pro" });
    setDemoBusy(false);
    showToast(t("upgrade.demoUnlocked"), "success");
  };

  return (
    <div className="page container narrow">
      <header className="page-head">
        <div>
          <h1 className="page-title">{t("upgrade.title")}</h1>
          <p className="page-sub">{t("upgrade.subtitle")}</p>
        </div>
      </header>

      {isPro ? (
        <section
          className="card pro-active"
          aria-label={t("upgrade.youArePro")}
        >
          <span className="checkout-icon" aria-hidden="true">
            🏆
          </span>
          <h2 className="card-title">{t("upgrade.youArePro")}</h2>
          <p className="muted">{t("upgrade.youAreProDesc")}</p>
          <div className="form-actions">
            <Link className="btn btn-primary" to="/dashboard">
              {t("checkout.successCta")}
            </Link>
            <Link className="btn btn-secondary" to="/reports">
              {t("nav.reports")}
            </Link>
          </div>
        </section>
      ) : (
        <>
          <section className="card" aria-label={t("upgrade.title")}>
            <div className="table-scroll">
              <table className="plan-table">
                <caption className="sr-only">{t("upgrade.subtitle")}</caption>
                <thead>
                  <tr>
                    <th scope="col">{t("upgrade.feature")}</th>
                    <th scope="col">
                      {t("upgrade.freeBadge")}
                      <span className="plan-price">
                        {t("upgrade.priceFree")}
                      </span>
                    </th>
                    <th scope="col" className="col-pro">
                      {t("upgrade.proBadge")}
                      <span className="plan-price">
                        {t("upgrade.pricePro")}
                        {t("upgrade.perMonth")}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map(([feature, freeVal, proVal]) => (
                    <tr key={feature}>
                      <th scope="row">{t(`upgrade.${feature}`)}</th>
                      <td>{t(`upgrade.${freeVal}`)}</td>
                      <td className="col-pro">{t(`upgrade.${proVal}`)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="muted plan-desc">{t("plan.goalLimit", { max: 3 })}</p>
          </section>

          <PayFastCheckout
            price={price}
            itemName={`FinMate Pro — ${t("upgrade.perMonth")}`}
            busy={demoBusy}
            onDemoUnlock={handleDemoUnlock}
          />

          <p className="muted text-center">
            <Link className="link" to="/dashboard">
              {t("upgrade.back")}
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
