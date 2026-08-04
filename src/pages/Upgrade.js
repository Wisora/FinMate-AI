import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import PromoBanner from '../components/common/PromoBanner';

function Upgrade({ showToast }) {
  const [plan, setPlan] = useState("Free");
  const { t } = useLanguage();

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    if (savedProfile && savedProfile.plan) {
      setPlan(savedProfile.plan);
    }
    showToast("💎 Upgrade page loaded");
  }, [showToast]);

  const handleUpgrade = () => {
    const updatedProfile = { name: "Craig", email: "craig@example.com", plan: "Pro" };
    localStorage.setItem("profile", JSON.stringify(updatedProfile));
    setPlan("Pro");
    showToast("🚀 Successfully upgraded to Pro!");
  };

  return (
    <div className="upgrade-page">
      <h2>{t("upgrade")}</h2>

      {/* Promo banner */}
      <PromoBanner 
        message="🔥 Special Offer: Upgrade now and save 20%!" 
        link="/profile" 
      />

      <div className="plans-grid">
        <div className="plan-card free-plan" role="region" aria-label="Free Plan">
          <h3>Free Plan</h3>
          <ul>
            <li>✔ Track up to 3 goals</li>
            <li>✔ Weekly reports</li>
            <li>✔ Basic AI recommendations</li>
            <li>✘ No monthly reports</li>
            <li>✘ Limited analytics</li>
          </ul>
          {plan === "Free" && (
            <button onClick={handleUpgrade} aria-label="Upgrade to Pro">
              Upgrade to Pro
            </button>
          )}
        </div>

        <div className="plan-card pro-plan" role="region" aria-label="Pro Plan">
          <h3>Pro Plan</h3>
          <ul>
            <li>✔ Unlimited goals</li>
            <li>✔ Weekly + Monthly reports</li>
            <li>✔ Advanced AI recommendations</li>
            <li>✔ Export reports (PDF/CSV)</li>
            <li>✔ Full analytics dashboard</li>
          </ul>
          {plan === "Pro" ? (
            <p>✅ You are on the Pro plan</p>
          ) : (
            <button onClick={handleUpgrade} aria-label="Upgrade to Pro">
              Upgrade to Pro
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
