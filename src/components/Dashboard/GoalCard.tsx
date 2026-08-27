import React from 'react';
import { Goal } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  PiggyBank,
  CreditCard,
  TrendingUp,
  CheckCircle,
  Clock,
} from 'lucide-react';

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onAddProgress: (goal: Goal, deltaAmount: number) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onEdit,
  onAddProgress,
}) => {
  const { formatCurrency, t } = useLanguage();

  const percentage = Math.min(
    100,
    Math.round((goal.currentAmount / (goal.targetAmount || 1)) * 100)
  );

  const categoryIcons = {
    savings: (
      <PiggyBank className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
    ),
    debt: <CreditCard className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
    investment: (
      <TrendingUp className="w-5 h-5 text-sky-600 dark:text-sky-400" />
    ),
  };

  const categoryColors = {
    savings:
      'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    debt: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    investment:
      'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 border-sky-200 dark:border-sky-800',
  };

  const barColors = {
    savings: 'bg-emerald-500 dark:bg-emerald-400',
    debt: 'bg-rose-500 dark:bg-rose-400',
    investment: 'bg-sky-500 dark:bg-sky-400',
  };

  return (
    <div
      tabIndex={0}
      aria-label={`${goal.title}, ${goal.category} goal, ${percentage}% completed`}
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2.5 rounded-xl border ${categoryColors[goal.category]}`}
            >
              {categoryIcons[goal.category]}
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white text-base leading-snug">
                {goal.title}
              </h4>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 capitalize flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3" /> Target: {goal.targetDate}
              </span>
            </div>
          </div>
          <button
            onClick={() => onEdit(goal)}
            className="text-xs font-medium text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {t('editGoal')}
          </button>
        </div>

        {goal.notes && (
          <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 bg-slate-50 dark:bg-slate-900/40 p-2 rounded-lg">
            {goal.notes}
          </p>
        )}

        {/* Amount details */}
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            {formatCurrency(goal.currentAmount)}
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            of {formatCurrency(goal.targetAmount)}
          </span>
        </div>

        {/* Progress bar */}
        <div
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-3"
        >
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColors[goal.category]}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1 text-slate-700 dark:text-slate-200">
            {goal.isCompleted ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Goal Completed!
              </span>
            ) : (
              <span>{percentage}% Completed</span>
            )}
          </span>
          <span className="capitalize px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
            {goal.priority} priority
          </span>
        </div>
      </div>

      {/* Quick top-up button */}
      {!goal.isCompleted && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2">
          <button
            onClick={() => onAddProgress(goal, 100)}
            className="flex-1 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 rounded-lg transition-colors"
          >
            + Add $100
          </button>
          <button
            onClick={() => onAddProgress(goal, 500)}
            className="flex-1 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 rounded-lg transition-colors"
          >
            + Add $500
          </button>
        </div>
      )}
    </div>
  );
};