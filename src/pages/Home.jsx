// Home — product landing page.

import { Link } from "@tanstack/react-router";
import { useLanguage } from "../i18n/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const features = t("home.features");

  return (
    <div className="page home-page">
      <section className="hero">
        <div className="container hero-inner">
          <span className="hero-badge">{t("home.heroBadge")}</span>
          <h1 className="hero-title">{t("home.heroTitle")}</h1>
          <p className="hero-sub">{t("home.heroSubtitle")}</p>
          <div className="hero-ctas">
            <Link className="btn btn-primary btn-lg" to="/dashboard">
              {t("home.ctaDashboard")}
            </Link>
            <Link className="btn btn-secondary btn-lg" to="/upgrade">
              {t("home.ctaUpgrade")}
            </Link>
          </div>
          <p className="hero-trust">{t("home.trustLine")}</p>
        </div>
      </section>

      <section
        className="container features-section"
        aria-labelledby="features-title"
      >
        <h2 id="features-title" className="section-title">
          {t("home.featuresTitle")}
        </h2>
        <ul className="features-grid">
          {features.map((f) => (
            <li className="card feature-card" key={f.title}>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-body">{f.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
