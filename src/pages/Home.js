import React from 'react';
import { Link } from 'react-router-dom';
import PromoBanner from '../components/common/PromoBanner';
import { useLanguage } from '../i18n/LanguageContext';

function Home() {
  const { t } = useLanguage();

  return (
    <div className="home-page">
      <h1>Welcome to FinMate AI</h1>
      <p>
        Your personal AI-powered finance assistant. Track goals, generate reports, 
        and get smart recommendations to improve your financial health.
      </p>

      {/* Promo banner for upsell */}
      <PromoBanner 
        message="🚀 Upgrade to Pro for unlimited goals, advanced analytics, and report exports!" 
        link="/upgrade" 
      />

      <div className="home-actions">
        <h2>Quick Start</h2>
        <ul>
          <li>
            <Link to="/dashboard" aria-label="Go to Dashboard">
              📊 {t("dashboard")} — Manage your goals and reports
            </Link>
          </li>
          <li>
            <Link to="/reports" aria-label="Go to Reports">
              📈 {t("reports")} — View weekly and monthly insights
            </Link>
          </li>
          <li>
            <Link to="/settings" aria-label="Go to Settings">
              ⚙️ {t("settings")} — Customize notifications, currency, and language
            </Link>
          </li>
          <li>
            <Link to="/profile" aria-label="Go to Profile">
              👤 {t("profile")} — Manage your account and subscription
            </Link>
          </li>
        </ul>
      </div>

      <div className="home-onboarding">
        <h2>Getting Started</h2>
        <p>
          Start by setting up your first savings goal in the Dashboard. 
          Generate a weekly report to see where your money is going, 
          and let FinMate AI recommend smarter ways to save.
        </p>
      </div>
    </div>
  );
}

export default Home;
