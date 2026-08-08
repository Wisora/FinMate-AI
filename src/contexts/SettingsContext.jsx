// Settings provider: currency, notifications, theme. Persisted to localStorage
// via settingsService; applied app-wide immediately.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import * as settingsService from "../services/settingsService";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const s = settingsService.load();
    return {
      currency: s.currency,
      notifications: s.notifications,
      theme: s.theme,
      plan: s.plan || "free",
    };
  });

  useEffect(() => {
    const s = settingsService.load();
    setSettings({
      currency: s.currency,
      notifications: s.notifications,
      theme: s.theme,
      plan: s.plan || "free",
    });
  }, []);

  const update = useCallback((patch) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      settingsService.save(next);
      return next;
    });
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, update }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx)
    throw new Error("useSettings must be used inside <SettingsProvider>");
  return ctx;
}
