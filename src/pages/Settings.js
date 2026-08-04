import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

function Settings({ showToast }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [currency, setCurrency] = useState("USD");
  const [darkMode, setDarkMode] = useState(false);
  const { language, changeLanguage, t } = useLanguage();

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("settings"));
    if (savedSettings) {
      setNotificationsEnabled(savedSettings.notificationsEnabled);
      setCurrency(savedSettings.currency);
      setDarkMode(savedSettings.darkMode);
      changeLanguage(savedSettings.language);
    }
    showToast("⚙️ Settings loaded");
  }, [showToast, changeLanguage]);

  const handleSave = () => {
    localStorage.setItem("settings", JSON.stringify({
      notificationsEnabled,
      currency,
      darkMode,
      language
    }));
    showToast("✅ Settings saved successfully!");
  };

  return (
    <div className="settings-page">
      <h2>{t("settings")}</h2>

      <div className="setting-item">
        <label>
          <input 
            type="checkbox" 
            checked={notificationsEnabled} 
            onChange={() => setNotificationsEnabled(!notificationsEnabled)} 
            aria-label="Enable or disable notifications"
          />
          Enable Notifications
        </label>
      </div>

      <div className="setting-item">
        <label>
          Default Currency:
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)} 
            aria-label="Select default currency"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="ZAR">ZAR (R)</option>
          </select>
        </label>
      </div>

      <div className="setting-item">
        <label>
          Preferred Language:
          <select 
            value={language} 
            onChange={(e) => changeLanguage(e.target.value)} 
            aria-label="Select preferred language"
          >
            <option value="en">English</option>
            <option value="af">Afrikaans</option>
            <option value="fr">Français (French)</option>
            <option value="es">Español (Spanish)</option>
            <option value="ar">العربية (Arabic)</option>
          </select>
        </label>
      </div>

      <div className="setting-item">
        <label>
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)} 
            aria-label="Toggle dark mode"
          />
          Dark Mode
        </label>
      </div>

      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
}

export default Settings;
