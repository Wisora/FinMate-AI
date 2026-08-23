import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { UserProfile } from '../types';
import { PromoBanner } from '../components/common/PromoBanner';
import {
  Wallet,
  Sparkles,
  TrendingUp,
  ShieldAlert,
  Bot,
  ArrowRight,
  PieChart,
  CheckCircle2,
  Globe,
  Award,
} from 'lucide-react';

interface HomeProps {
  onNavigate: (tab: string) => void;
  user: UserProfile;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, user }) => {
  const { t, formatCurrency } = useLanguage();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <PromoBanner
        onUpgradeClick={() => onNavigate('upgrade')}
        userPlan={user.plan}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-12 shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>AI-POWERED MULTILINGUAL FINANCIAL COACH</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Take Control of Your Savings, Debt & Investments with{' '}
            <span className="text-emerald-400">FinMate AI</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Welcome back, <strong className="text-white">{user.name}</strong>.
            FinMate combines real-time cashflow analytics, proactive
            overspending alerts, and conversational Gemini 3.6 AI
            recommendations to fast-track your wealth goals.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/25 flex items-center gap-2.5 transition-all duration-200"
            >
              <span>Go to Financial Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('reports')}
              className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm border border-slate-700 flex items-center gap-2 transition-all duration-200"
            >
              <PieChart className="w-4 h-4 text-emerald-400" />
              <span>View Financial Reports</span>
            </button>
          </div>
        </div>
      </section>

      {/* Core Capability Highlights Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Wallet className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Tri-Tier Goal Engine
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Track savings buffers, debt payoff snowballs, and index investment
            portfolios with target dates, milestones, and automated progress
            updates.
          </p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 pt-1"
          >
            Manage Goals &rarr;
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Gemini 3.6 Conversational Coach
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Ask natural queries like *"How much did I save last month?"* or
            *"Generate a July expense report"* with context-aware financial
            answers.
          </p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 pt-1"
          >
            Chat with FinMate &rarr;
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Multilingual & Global Currencies
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Instant support for English, Afrikaans, French, Spanish, and Arabic
            with RTL layout formatting, alongside USD, EUR, ZAR, GBP, and JPY
            currencies.
          </p>
          <button
            onClick={() => onNavigate('settings')}
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1 pt-1"
          >
            Configure Settings &rarr;
          </button>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="p-8 rounded-3xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Why FinMate AI?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Built for proactive money management, accessibility, and high
              financial health scores.
            </p>
          </div>
          <button
            onClick={() => onNavigate('upgrade')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs shadow-md"
          >
            Explore Free vs Pro Tiers
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-2" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Proactive Alerts
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Get notified when expenses trend higher than income or goals hit
              90% completion.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <Award className="w-5 h-5 text-emerald-500 mb-2" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Health Score Gauge
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Automated 0-100 score analyzing savings ratio, debt-to-income, and
              investments.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <TrendingUp className="w-5 h-5 text-emerald-500 mb-2" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Smart Insights
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Tailored advice on meal budgets, high-yield funds, and credit
              payoff strategies.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <ShieldAlert className="w-5 h-5 text-emerald-500 mb-2" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Local Persistence
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              100% offline-friendly state persistence in browser localStorage
              for privacy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
