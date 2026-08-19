import React from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  FileText,
  ArrowRight,
} from "lucide-react";

interface ReportCardProps {
  timeframe: string;
  income: number;
  expenses: number;
  netSavings: number;
  topCategory: { category: string; amount: number; percentage: number };
  aiInsight?: string;
  onViewDetails: () => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  timeframe,
  income,
  expenses,
  netSavings,
  topCategory,
  aiInsight,
  onViewDetails,
}) => {
  const { formatCurrency, t } = useLanguage();

  const savingsRate = income > 0 ? Math.round((netSavings / income) * 100) : 0;

  return (
    <div className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                {timeframe} Financial Summary
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Monthly Cashflow Performance
              </p>
            </div>
          </div>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
            {savingsRate}% Savings Rate
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
              Income
            </span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              {formatCurrency(income)}
            </span>
          </div>

          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
              Expenses
            </span>
            <span className="text-sm font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" />
              {formatCurrency(expenses)}
            </span>
          </div>

          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
              Net Surplus
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {formatCurrency(netSavings)}
            </span>
          </div>
        </div>

        {topCategory && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300 mb-1 font-medium">
              <span>Top Spending: {topCategory.category}</span>
              <span>
                {formatCurrency(topCategory.amount)} ({topCategory.percentage}%)
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full"
                style={{ width: `${topCategory.percentage}%` }}
              />
            </div>
          </div>
        )}

        {aiInsight && (
          <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <p className="line-clamp-3 leading-relaxed">{aiInsight}</p>
          </div>
        )}
      </div>

      <button
        onClick={onViewDetails}
        className="mt-5 w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
      >
        <span>View Full Reports & Analytics</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
