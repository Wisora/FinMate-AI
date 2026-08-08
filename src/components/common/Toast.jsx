// Toast system: provider + useToast + live region viewport.
// Accessible: the viewport is an aria-live="polite" region; each toast carries a
// status role and a labelled close button. Auto-dismisses after 4.5s.

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useLanguage } from "../../i18n/LanguageContext";

const ToastContext = createContext(null);

const ICONS = {
  success: "✓",
  error: "✕",
  info: "ℹ",
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = "info", duration = 4500) => {
      const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev.slice(-3), { id, message, type }]);
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
      return id;
    },
    [dismiss],
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

function ToastViewport({ toasts, onDismiss }) {
  const { t } = useLanguage();
  return (
    <div
      className="toast-viewport"
      role="region"
      aria-live="polite"
      aria-label={t("common.notifications")}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          role="status"
        >
          <span className="toast-icon" aria-hidden="true">
            {ICONS[toast.type] || ICONS.info}
          </span>
          <span className="toast-message">{toast.message}</span>
          <button
            type="button"
            className="toast-close"
            aria-label={t("common.close")}
            onClick={() => onDismiss(toast.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
