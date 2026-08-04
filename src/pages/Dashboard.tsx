import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { AlertItem, FinancialSummary, Goal, GoalCategory, Recommendation, UserProfile } from '../types';
import { getGoals, addGoal, updateGoal, deleteGoal } from '../services/goalsService';
import { getFinancialSummary, getCategoryBreakdown } from '../services/reportsService';
import { getRecommendations, toggleApplyRecommendation } from '../services/recommendationsService';
import { GoalCard } from '../components/Dashboard/GoalCard';
import { RecommendationCard } from '../components/Dashboard/RecommendationCard';
import { AssistantChat } from '../components/Dashboard/AssistantChat';
import { PromoBanner } from '../components/common/PromoBanner';
import {
  Wallet,
  PiggyBank,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  Plus,
  X,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Bell,
  Activity,
  Award,
} from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  onNavigate: (tab: string) => void;
  showToast: (msg: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate, showToast }) => {
  const { formatCurrency, t } = useLanguage();

  const [goals, setGoals] = useState<Goal[]>([]);
  const [summary, setSummary] = useState<FinancialSummary>(getFinancialSummary());
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<GoalCategory>('savings');
  const [formCurrentAmount, setFormCurrentAmount] = useState('');
  const [formTargetAmount, setFormTargetAmount] = useState('');
  const [formTargetDate, setFormTargetDate] = useState('2026-12-31');
  const [formPriority, setFormPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [formNotes, setFormNotes] = useState('');

  // Category Filter
  const [categoryFilter, setCategoryFilter] = useState<'all' | GoalCategory>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const loadedGoals = getGoals();
    const loadedSummary = getFinancialSummary();
    const loadedRecs = getRecommendations();

    setGoals(loadedGoals);
    setSummary(loadedSummary);
    setRecommendations(loadedRecs);

    // Compute Proactive Alerts
    const computedAlerts: AlertItem[] = [];

    // Alert 1: Spending vs Income
    if (loadedSummary.expenses > loadedSummary.income * 0.75) {
      computedAlerts.push({
        id: 'alt_spending',
        type: 'warning',
        title: 'High Expense Ratio Alert',
        message: `Your monthly expenses (${formatCurrency(loadedSummary.expenses)}) account for over 75% of your total income. Consider reviewing dining & non-essentials.`,
        date: 'Today',
        isRead: false,
      });
    }

    // Alert 2: Goals nearing completion
    loadedGoals.forEach((g) => {
      const pct = (g.currentAmount / (g.targetAmount || 1)) * 100;
      if (pct >= 85 && pct < 100) {
        computedAlerts.push({
          id: 'alt_goal_' + g.id,
          type: 'success',
          title: `Goal Milestone: ${g.title}`,
          message: `Great progress! You are at ${Math.round(pct)}% of your target for "${g.title}". Just ${formatCurrency(g.targetAmount - g.currentAmount)} left!`,
          date: 'Recent',
          isRead: false,
        });
      }
    });

    setAlerts(computedAlerts);
  };

  const handleOpenAddModal = () => {
    // Check Free tier limit (max 3 goals for free users)
    if (user.plan === 'free' && goals.length >= 3) {
      showToast(t('limitReached'), 'warning');
      onNavigate('upgrade');
      return;
    }
    setEditingGoal(null);
    setFormTitle('');
    setFormCategory('savings');
    setFormCurrentAmount('');
    setFormTargetAmount('');
    setFormTargetDate('2026-12-31');
    setFormPriority('medium');
    setFormNotes('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (goal: Goal) => {
    setEditingGoal(goal);
    setFormTitle(goal.title);
    setFormCategory(goal.category);
    setFormCurrentAmount(goal.currentAmount.toString());
    setFormTargetAmount(goal.targetAmount.toString());
    setFormTargetDate(goal.targetDate);
    setFormPriority(goal.priority);
    setFormNotes(goal.notes || '');
    setIsModalOpen(true);
  };

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formTargetAmount) {
      showToast('Please enter a goal title and target amount.', 'error');
      return;
    }

    const currentNum = parseFloat(formCurrentAmount) || 0;
    const targetNum = parseFloat(formTargetAmount) || 100;

    if (editingGoal) {
      const updated = updateGoal(editingGoal.id, {
        title: formTitle,
        category: formCategory,
        currentAmount: currentNum,
        targetAmount: targetNum,
        targetDate: formTargetDate,
        priority: formPriority,
        notes: formNotes,
      });
      setGoals(updated);
      showToast(t('goalUpdated'), 'success');
    } else {
      addGoal({
        title: formTitle,
        category: formCategory,
        currentAmount: currentNum,
        targetAmount: targetNum,
        targetDate: formTargetDate,
        priority: formPriority,
        notes: formNotes,
      });
      showToast(t('goalAdded'), 'success');
    }

    setIsModalOpen(false);
    loadData();
  };

  const handleDeleteGoal = (id: string) => {
    const updated = deleteGoal(id);
    setGoals(updated);
    showToast(t('goalDeleted'), 'info');
    setIsModalOpen(false);
    loadData();
  };

  const handleAddProgress = (goal: Goal, delta: number) => {
    const updated = updateGoal(goal.id, {
      currentAmount: goal.currentAmount + delta,
    });
    setGoals(updated);
    showToast(`Added ${formatCurrency(delta)} to ${goal.title}!`, 'success');
    loadData();
  };

  const handleToggleRec = (id: string) => {
    const updated = toggleApplyRecommendation(id);
    setRecommendations(updated);
    showToast('Recommendation status updated!', 'info');
  };

  const filteredGoals = categoryFilter === 'all' ? goals : goals.filter((g) => g.category === categoryFilter);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Top Banner for Free tier */}
      <PromoBanner onUpgradeClick={() => onNavigate('upgrade')} userPlan={user.plan} />

      {/* Financial Health Header & Key Performance Indicators */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Health Gauge Box */}
        <div className="lg:col-span-1 p-6 rounded-3xl bg-slate-900 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Activity className="w-4 h-4" /> {t('financialHealthScore')}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-white/10 text-slate-200">
                Live Rating
              </span>
            </div>

            <div className="flex items-baseline gap-2 my-3">
              <span className="text-5xl font-black tracking-tight text-white">{summary.healthScore}</span>
              <span className="text-sm font-bold text-slate-400">/ 100</span>
            </div>

            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  summary.healthScore >= 80
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    : summary.healthScore >= 60
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                    : 'bg-gradient-to-r from-rose-500 to-red-400'
                }`}
                style={{ width: `${summary.healthScore}%` }}
              />
            </div>

            <p className="text-xs text-slate-300">
              {summary.healthScore >= 80
                ? t('healthScoreExcellent')
                : summary.healthScore >= 65
                ? t('healthScoreGood')
                : t('healthScoreNeedsWork')}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>Net Savings Rate:</span>
            <span className="font-bold text-emerald-400">
              {Math.round((summary.netSavings / (summary.income || 1)) * 100)}%
            </span>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
              <span>{t('netWorth')}</span>
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                <PiggyBank className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {formatCurrency(summary.netSavings)}
              </span>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                +{formatCurrency(summary.income - summary.expenses)} cashflow this month
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
              <span>{t('totalDebt')}</span>
              <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {formatCurrency(summary.totalDebtGoals)}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                {summary.debtProgress}% Paid off to date
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
              <span>{t('totalInvestments')}</span>
              <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {formatCurrency(summary.investments)}
              </span>
              <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold mt-1">
                Compounding in Index Funds
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proactive Alerts Section */}
      {alerts.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">{t('proactiveAlerts')}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.map((alt) => (
              <div
                key={alt.id}
                className={`p-4 rounded-2xl border flex items-start gap-3 shadow-sm ${
                  alt.type === 'warning'
                    ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200'
                    : 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200'
                }`}
              >
                {alt.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-bold text-sm">{alt.title}</h4>
                  <p className="text-xs mt-0.5 leading-relaxed opacity-90">{alt.message}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Grid: Goals & Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Goals Column (2 cols wide) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{t('goalsTitle')}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track savings buffers, debt payoff plans, and long-term investments.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              {/* Category Filter Pills */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    categoryFilter === 'all'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setCategoryFilter('savings')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    categoryFilter === 'savings'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                  }`}
                >
                  Savings
                </button>
                <button
                  onClick={() => setCategoryFilter('debt')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    categoryFilter === 'debt'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                  }`}
                >
                  Debt
                </button>
                <button
                  onClick={() => setCategoryFilter('investment')}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    categoryFilter === 'investment'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                  }`}
                >
                  Investments
                </button>
              </div>

              <button
                onClick={handleOpenAddModal}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors focus:ring-2 focus:ring-emerald-500"
              >
                <Plus className="w-4 h-4" />
                <span>{t('addGoal')}</span>
              </button>
            </div>
          </div>

          {/* Goal Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onEdit={handleOpenEditModal}
                onAddProgress={handleAddProgress}
              />
            ))}
          </div>

          {filteredGoals.length === 0 && (
            <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <PiggyBank className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No goals found in this category.</p>
              <button
                onClick={handleOpenAddModal}
                className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs inline-flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Create First Goal
              </button>
            </div>
          )}

          {/* AI Smart Recommendations Carousel / Section */}
          <div className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  <span>{t('recommendationsTitle')}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Algorithmic tips tuned to your income & spending velocity.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendations.map((rec) => (
                <RecommendationCard key={rec.id} recommendation={rec} onApply={handleToggleRec} />
              ))}
            </div>
          </div>
        </div>

        {/* Assistant Chat Sidebar (1 col wide) */}
        <div className="lg:col-span-1 sticky top-24">
          <AssistantChat financialSummary={summary} />
        </div>
      </div>

      {/* Goal Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingGoal ? t('editGoal') : t('addGoal')}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGoal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Goal Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Emergency Fund or Credit Card Payoff"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as GoalCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="savings">Savings</option>
                    <option value="debt">Debt Repayment</option>
                    <option value="investment">Investment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Current Balance
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    placeholder="0"
                    value={formCurrentAmount}
                    onChange={(e) => setFormCurrentAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Target Amount
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="50"
                    required
                    placeholder="5000"
                    value={formTargetAmount}
                    onChange={(e) => setFormTargetAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Target Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formTargetDate}
                    onChange={(e) => setFormTargetDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Account info or strategy"
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                {editingGoal ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteGoal(editingGoal.id)}
                    className="px-4 py-2.5 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
                  >
                    Delete Goal
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    Save Goal
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
