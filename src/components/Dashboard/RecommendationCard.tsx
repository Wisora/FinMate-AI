import React from 'react';
import { Recommendation } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Sparkles,
  Check,
  ArrowUpRight,
  DollarSign,
  ShieldAlert,
  Zap,
} from 'lucide-react';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onApply: (id: string) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onApply,
}) => {
  const { formatCurrency, t } = useLanguage();

  const impactBadges = {
    high: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    medium:
      'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    low: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600',
  };

  const categoryIcons = {
    budgeting: <Zap className="w-4 h-4 text-amber-500" />,
    savings: <DollarSign className="w-4 h-4 text-emerald-500" />,
    debt: <ShieldAlert className="w-4 h-4 text-rose-500" />,
    investments: <ArrowUpRight className="w-4 h-4 text-sky-500" />,
  };

  return (
    <div className="flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700">
              {categoryIcons[recommendation.category]}
            </span>
            <span className="text-xs font-semibold capitalize text-slate-500 dark:text-slate-400">
              {recommendation.category}
            </span>
          </div>

          <span
            className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${impactBadges[recommendation.impact]}`}
          >
            {recommendation.impact.toUpperCase()} IMPACT
          </span>
        </div>

        <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
          {recommendation.title}
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {recommendation.description}
        </p>

        {recommendation.potentialSavings > 0 && (
          <div className="mb-4 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />{' '}
              Est. Annual Benefit:
            </span>
            <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-300">
              +{formatCurrency(recommendation.potentialSavings)}
            </span>
          </div>
        )}
      </div>

      <button
        onClick={() => onApply(recommendation.id)}
        aria-pressed={recommendation.applied}
        className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 ${
          recommendation.applied
            ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 cursor-default'
            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm focus:ring-2 focus:ring-emerald-500'
        }`}
      >
        {recommendation.applied ? (
          <>
            <Check className="w-4 h-4" />
            <span>{t('applied')}</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>{recommendation.actionText}</span>
          </>
        )}
      </button>
    </div>
  );
};
