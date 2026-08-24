import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full px-4 pointer-events-none"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-500 shrink-0" />,
  };

  const borders = {
    success:
      'border-emerald-200 dark:border-emerald-900 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100',
    warning:
      'border-amber-200 dark:border-amber-900 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100',
    error:
      'border-rose-200 dark:border-rose-900 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100',
    info: 'border-sky-200 dark:border-sky-900 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100',
  };

  return (
    <div
      role="alert"
      className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl border shadow-lg transition-all duration-200 transform translate-y-0 ${borders[toast.type]}`}
    >
      <div className="flex items-center gap-3">
        {icons[toast.type]}
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        aria-label="Close notification"
        className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
