// App shell: skip link, top navigation, main content slot, footer.

import { Link, useLocation } from "@tanstack/react-router";
import { useLanguage } from "../../i18n/LanguageContext";
import { useSettings } from "../../contexts/SettingsContext";
import { isProPlan } from "../../services/planService";

const NAV_ITEMS = [
  { to: "/", labelKey: "nav.home", exact: true },
  { to: "/dashboard", labelKey: "nav.dashboard" },
  { to: "/reports", labelKey: "nav.reports" },
  { to: "/settings", labelKey: "nav.settings" },
  { to: "/profile", labelKey: "nav.profile" },
];

export function AppShell({ children }) {
  const { t } = useLanguage();
  const { settings } = useSettings();
  const { pathname } = useLocation();
  const isPro = isProPlan(settings.plan);

  const isActive = (item) =>
    item.exact ? pathname === item.to : pathname.startsWith(item.to);

  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">
        {t("nav.skipToContent")}
      </a>

      <header className="site-header">
        <div className="container nav-inner">
          <Link to="/" className="brand" aria-label="FinMate AI — Home">
            <span className="brand-mark" aria-hidden="true">
              ◆
            </span>
            <span className="brand-name">FinMate AI</span>
          </Link>

          <nav className="nav" aria-label="Main">
            <ul className="nav-links">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`nav-link ${isActive(item) ? "active" : ""}`}
                    aria-current={isActive(item) ? "page" : undefined}
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            to="/upgrade"
            className={`btn nav-cta ${isPro ? "btn-secondary" : "btn-primary"}`}
          >
            {isPro ? t("nav.proLabel") : t("nav.upgrade")}
          </Link>
        </div>
      </header>

      <main id="main" className="main" tabIndex={-1}>
        {children}
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>
            © {new Date().getFullYear()} FinMate AI. {t("footer.rights")}
          </span>
          <span className="footer-note">{t("footer.madeWith")}</span>
        </div>
      </footer>
    </div>
  );
}
