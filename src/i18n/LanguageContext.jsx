// Language provider: current language, RTL direction, locale and t() function.
// Language is persisted via settingsService (it is one of the user prefs).

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getLangMeta, translate } from "./translations";
import * as settingsService from "../services/settingsService";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const saved = settingsService.load().language;
    if (saved && getLangMeta(saved).code === saved) setLanguage(saved);
  }, []);

  const changeLanguage = useCallback((code) => {
    setLanguage(code);
    settingsService.save({ language: code });
  }, []);

  const meta = getLangMeta(language);
  const t = useCallback(
    (key, vars) => translate(language, key, vars),
    [language],
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        lang: language,
        setLanguage: changeLanguage,
        dir: meta.dir,
        locale: meta.locale,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
