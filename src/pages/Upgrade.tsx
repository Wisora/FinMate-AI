import React, { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { UserProfile } from "../types";
import { Spinner } from "../components/common/Spinner";
import {
  Crown,
  Check,
  Zap,
  ShieldCheck,
  Sparkles,
  FileSpreadsheet,
  FileText,
  BarChart3,
  Bot,
  ArrowRight,
  Star,
  X,
} from "lucide-react";

interface UpgradeProps {
  user: UserProfile;
  onUpgradeSuccess: (newPlan: "pro") => void;
  showToast: (
    msg: string,
    type?: "success" | "warning" | "error" | "info",
  ) => void;
}

export const Upgrade: React.FC<UpgradeProps> = ({
  user,
  onUpgradeSuccess,
  showToast,
}) => {
  const { t, currency } = useLanguage();

  const [isAnnual, setIsAnnual] = useState(true);
  const [loading, setLoading] = useState(false);

  const isPro = user.plan === "pro";

  // Currency pricing display
  const monthlyPrices: Record<string, string> = {
    USD: "$9.99",
    EUR: "€9.20",
    ZAR: "R149",
    GBP: "£7.99",
    JPY: "¥1,500",
  };

  const annualPrices: Record<string, string> = {
    USD: "$7.99",
    EUR: "€7.40",
    ZAR: "R119",
    GBP: "£6.40",
    JPY: "¥1,200",
  };

  const priceDisplay = isAnnual
    ? (annualPrices[currency] || "$7.99") + "/mo"
    : (monthlyPrices[currency] || "$9.99") + "/mo";

  const handleSimulateCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      onUpgradeSuccess("pro");
      setLoading(false);
      showToast(
        "🎉 Congratulations! You are now a FinMate AI Pro member!",
        "success",
      );
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-bold">
          <Crown className="w-4 h-4 text-amber-500" />
          <span>UPGRADE TO FINMATE PRO</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Supercharge Your Wealth Building with Pro Analytics & Priority AI
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Unlock unlimited goals, automated PDF & CSV export reports, and
          priority Gemini 3.6 financial coaching.
        </p>

        {/* Annual / Monthly Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span
            className={`text-xs font-bold ${!isAnnual ? "text-slate-900 dark:text-white" : "text-slate-500"}`}
          >
            Monthly Billing
          </span>

          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-8 rounded-full bg-slate-900 dark:bg-slate-700 relative p-1 focus:outline-none"
          >
            <div
              className={`w-6 h-6 rounded-full bg-emerald-500 transition-transform ${
                isAnnual ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>

          <span
            className={`text-xs font-bold ${isAnnual ? "text-slate-900 dark:text-white" : "text-slate-500"} flex items-center gap-1.5`}
          >
            Annual Billing
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-extrabold uppercase">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Free Plan Card */}
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Free Starter Tier
              </h3>
              {!isPro && (
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold">
                  Current Plan
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900 dark:text-white">
                $0
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                / forever
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Essential personal finance tools for basic goal tracking.
            </p>

            <ul className="space-y-3 pt-2 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Up to 3 Financial Goals (Savings/Debt)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Standard Gemini AI Assistant</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Basic Weekly & Monthly Summaries</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <X className="w-4 h-4 text-slate-300 shrink-0" />
                <span>No PDF / CSV Export Capabilities</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <X className="w-4 h-4 text-slate-300 shrink-0" />
                <span>No Advanced Historical Analytics</span>
              </li>
            </ul>
          </div>

          <button
            disabled
            className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-400 font-bold text-xs cursor-default text-center"
          >
            {!isPro ? "Your Current Active Tier" : "Downgrade to Free"}
          </button>
        </div>

        {/* Pro Plan Card (Highlighted) */}
        <div className="relative p-8 rounded-3xl bg-slate-900 text-white border-2 border-emerald-500 shadow-2xl flex flex-col justify-between space-y-6 overflow-hidden">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500 to-teal-400 text-slate-950 text-[11px] font-black uppercase px-4 py-1.5 rounded-bl-2xl">
            MOST POPULAR
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-extrabold text-white">FinMate Pro</h3>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-white">
                {priceDisplay}
              </span>
              <span className="text-xs text-slate-400">
                billed {isAnnual ? "annually" : "monthly"}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Complete wealth coaching suite with zero goal limits and full
              exports.
            </p>

            <ul className="space-y-3 pt-2 text-xs text-slate-200">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold text-white">
                  Unlimited Goals
                </span>{" "}
                (Savings, Debt, Investments)
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold text-white">
                  Priority Gemini 3.6
                </span>{" "}
                Financial Coach
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold text-white">
                  PDF & CSV Data Exports
                </span>{" "}
                for tax & records
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold text-white">
                  Real-Time Overspending
                </span>{" "}
                Proactive Alerts
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold text-white">
                  Advanced Historical
                </span>{" "}
                Analytics & Custom Ranges
              </li>
            </ul>
          </div>

          {isPro ? (
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-center text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>You have unlocked FinMate Pro Membership!</span>
            </div>
          ) : (
            <button
              onClick={handleSimulateCheckout}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all duration-200"
            >
              {loading ? (
                <Spinner size="sm" label="Processing..." />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Upgrade to Pro Now &rarr;</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Guarantee Badge */}
      <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 text-center text-xs text-emerald-900 dark:text-emerald-200 flex flex-col sm:flex-row items-center justify-center gap-3">
        <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        <span>
          <strong>30-Day Money-Back Guarantee:</strong> Try FinMate Pro
          completely risk-free. Cancel anytime with 1 click in your Profile.
        </span>
      </div>
    </div>
  );
};
