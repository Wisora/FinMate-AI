import React, { createContext, useContext, useState, useEffect } from "react";
import { CurrencyCode, LanguageCode, SettingsState } from "../types";
import { translations, currencies } from "./translations";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;
  formatCurrency: (amountInUSD: number) => string;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  settings: SettingsState;
  updateSettings: (newSettings: Partial<SettingsState>) => void;
}

const DEFAULT_SETTINGS: SettingsState = {
  notificationsEnabled: true,
  alertOverspending: true,
  alertGoalMilestones: true,
  weeklyInsights: true,
  currency: "USD",
  language: "en",
  darkMode: false,
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<SettingsState>(() => {
    try {
      const saved = localStorage.getItem("finmate_settings");
      if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch (e) {
      console.warn("Failed to load settings from localStorage", e);
    }
    return DEFAULT_SETTINGS;
  });

  // Apply dark mode class to html element
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkMode]);

  // Apply RTL direction for Arabic
  const dir = settings.language === "ar" ? "rtl" : "ltr";
  useEffect(() => {
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", settings.language);
  }, [dir, settings.language]);

  const updateSettings = (newSettings: Partial<SettingsState>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem("finmate_settings", JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed to save settings", e);
      }
      return updated;
    });
  };

  const setLanguage = (language: LanguageCode) => updateSettings({ language });
  const setCurrency = (currency: CurrencyCode) => updateSettings({ currency });
  const setDarkMode = (darkMode: boolean) => updateSettings({ darkMode });

  const t = (key: string): string => {
    const langObj = translations[settings.language] || translations.en;
    return langObj[key] || translations.en[key] || key;
  };

  const formatCurrency = (amountInUSD: number): string => {
    const currObj = currencies[settings.currency] || currencies.USD;
    const converted = amountInUSD * currObj.rate;
    // Format nicely with separators
    return `${currObj.symbol} ${Math.round(converted).toLocaleString()}`;
  };

  return (
    <LanguageContext.Provider
      value={{
        language: settings.language,
        setLanguage,
        currency: settings.currency,
        setCurrency,
        formatCurrency,
        t,
        dir,
        darkMode: settings.darkMode,
        setDarkMode,
        settings,
        updateSettings,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
