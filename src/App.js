import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Upgrade from './pages/Upgrade';
import Profile from './pages/Profile';

// Common Components
import Toast from './components/common/Toast';
import PromoBanner from './components/common/PromoBanner';
import Spinner from './components/common/Spinner';

// Language Provider
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  // Apply dark mode class to body
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Helper to show toast
  const showToast = (msg) => {
    setToastMessage(msg);
  };

  // Simulate loading (example usage)
  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("✅ Data loaded successfully!");
    }, 2000);
  };

  return (
    <div className="app">
      <header>
        <h1>FinMate AI</h1>
        <nav>
          <button 
            className="menu-toggle" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>
          <ul className={menuOpen ? "open" : ""}>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>{t("dashboard")}</Link></li>
            <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>{t("dashboard")}</Link></li>
            <li><Link to="/reports" onClick={() => setMenuOpen(false)}>{t("reports")}</Link></li>
            <li><Link to="/settings" onClick={() => setMenuOpen(false)}>{t("settings")}</Link></li>
            <li><Link to="/upgrade" onClick={() => setMenuOpen(false)}>{t("upgrade")}</Link></li>
            <li><Link to="/profile" onClick={() => setMenuOpen(false)}>{t("profile")}</Link></li>
            <li>
              <button 
                className="toggle-btn" 
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle dark mode"
              >
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Promo banner for offers/ads */}
      <PromoBanner 
        message="🔥 Special Offer: Upgrade to Pro and unlock advanced analytics!" 
        link="/upgrade" 
      />

      <main>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard showToast={showToast} />} />
            <Route path="/reports" element={<Reports showToast={showToast} />} />
            <Route path="/settings" element={<Settings showToast={showToast} />} />
            <Route path="/upgrade" element={<Upgrade showToast={showToast} />} />
            <Route path="/profile" element={<Profile showToast={showToast} />} />
          </Routes>
        )}
      </main>

      <footer>
        <p>© {new Date().getFullYear()} FinMate AI</p>
        <button onClick={simulateLoading}>Simulate Loading</button>
      </footer>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;
