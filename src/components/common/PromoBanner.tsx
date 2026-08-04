import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface PromoBannerProps {
  onUpgradeClick: () => void;
  userPlan: 'free' | 'pro';
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onUpgradeClick, userPlan }) => {
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  if (userPlan === 'pro' || dismissed) return null;

  return (
    <div
      role="banner"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 p-5 text-white shadow-md transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md text-amber-300 border border-white/20 shrink-0">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-amber-400 text-slate-900 rounded-full">
                {t('upgradeToPro')}
              </span>
              <span className="text-xs text-emerald-100 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 30-Day Money-Back Guarantee
              </span>
            </div>
            <h3 className="text-lg font-bold mt-1 text-white">{t('proBenefits')}</h3>
            <p className="text-xs text-emerald-100 mt-0.5">
              Get priority Gemini AI insights, automated report PDF export, and unlimited goal tracking.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={onUpgradeClick}
            aria-label={t('upgradeToPro')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-sm rounded-xl shadow-md transition-all duration-200 focus:ring-2 focus:ring-white focus:outline-none"
          >
            <span>{t('upgradeToPro')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
