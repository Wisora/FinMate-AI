import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { UserProfile } from '../types';
import { getFinancialSummary, getCategoryBreakdown, fetchAISummaryReport } from '../services/reportsService';
import { Spinner } from '../components/common/Spinner';
import { PromoBanner } from '../components/common/PromoBanner';
import {
  PieChart as PieChartIcon,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Sparkles,
  Lock,
  Calendar,
  DollarSign,
  FileSpreadsheet,
  FileText,
  CheckCircle2,
} from 'lucide-react';

interface ReportsProps {
  user: UserProfile;
  onNavigate: (tab: string) => void;
  showToast: (msg: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
}

export const Reports: React.FC<ReportsProps> = ({ user, onNavigate, showToast }) => {
  const { formatCurrency, t, language, currency } = useLanguage();

  const [timeframe, setTimeframe] = useState('July 2026');
  const [summary, setSummary] = useState(getFinancialSummary());
  const [categories, setCategories] = useState(getCategoryBreakdown());

  const [aiReportText, setAiReportText] = useState<string | null>(null);
  const [generatingAI, setGeneratingAI] = useState(false);

  useEffect(() => {
    setSummary(getFinancialSummary());
    setCategories(getCategoryBreakdown());
  }, [timeframe]);

  const handleGenerateAIReport = async () => {
    setGeneratingAI(true);
    try {
      const text = await fetchAISummaryReport(timeframe, language, currency);
      setAiReportText(text);
      showToast('AI Financial Analysis Report generated successfully!', 'success');
    } catch (err) {
      showToast('Failed to generate report analysis.', 'error');
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleExport = (type: 'pdf' | 'csv') => {
    if (user.plan === 'free') {
      showToast(t('upgradePrompt'), 'warning');
      onNavigate('upgrade');
      return;
    }

    if (type === 'csv') {
      const csvContent =
        'data:text/csv;charset=utf-8,Category,Amount,Percentage\n' +
        categories.map((c) => `"${c.category}",${c.amount},${c.percentage}%`).join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `FinMate_Financial_Report_${timeframe.replace(' ', '_')}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('CSV Report exported successfully!', 'success');
    } else {
      // Simulate PDF print trigger
      window.print();
      showToast('Preparing PDF print preview...', 'info');
    }
  };

  // Sample historical monthly data for bar chart visualization
  const monthlyData = [
    { month: 'Mar', income: 5100, expenses: 3800 },
    { month: 'Apr', income: 5200, expenses: 3600 },
    { month: 'May', income: 5800, expenses: 3900 },
    { month: 'Jun', income: 5900, expenses: 3700 },
    { month: 'Jul', income: summary.income, expenses: summary.expenses },
  ];

  const maxChartVal = Math.max(...monthlyData.flatMap((m) => [m.income, m.expenses])) * 1.15;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <PromoBanner onUpgradeClick={() => onNavigate('upgrade')} userPlan={user.plan} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-emerald-500" />
            <span>Financial Analytics & Reports</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Weekly & monthly income vs expense trends, breakdown charts, and AI synthesis.
          </p>
        </div>

        {/* Timeframe selector & export tools */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm">
            <Calendar className="w-4 h-4 text-emerald-500" />
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="July 2026">July 2026 (Current)</option>
              <option value="June 2026">June 2026</option>
              <option value="May 2026">May 2026</option>
              <option value="Q2 2026">Q2 2026 Summary</option>
            </select>
          </div>

          <button
            onClick={() => handleExport('csv')}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t('exportCSV')}</span>
            {user.plan === 'free' && <Lock className="w-3 h-3 text-amber-500 ml-0.5" />}
          </button>

          <button
            onClick={() => handleExport('pdf')}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>{t('exportPDF')}</span>
            {user.plan === 'free' && <Lock className="w-3 h-3 text-amber-300 ml-0.5" />}
          </button>
        </div>
      </div>

      {/* KPI Overview Summary Bar */}
      <section className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Income ({timeframe})</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-5 h-5" />
            {formatCurrency(summary.income)}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Expenses ({timeframe})</span>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1">
            <TrendingDown className="w-5 h-5" />
            {formatCurrency(summary.expenses)}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Net Surplus</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {formatCurrency(summary.netSavings)}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Savings Efficiency</span>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
            {Math.round((summary.netSavings / (summary.income || 1)) * 100)}%
          </div>
        </div>
      </section>

      {/* Interactive Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Income vs Expenses Bar Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cashflow Trend (Last 5 Months)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Income (Green) vs Expenses (Rose)</p>
            </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-4 pt-6 px-2 border-b border-slate-200 dark:border-slate-700">
            {monthlyData.map((d, i) => {
              const incomeHeight = (d.income / maxChartVal) * 100;
              const expenseHeight = (d.expenses / maxChartVal) * 100;

              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1.5 h-full">
                    {/* Income Bar */}
                    <div
                      title={`Income: ${formatCurrency(d.income)}`}
                      className="w-1/2 bg-emerald-500 dark:bg-emerald-400 rounded-t-lg transition-all duration-500 hover:brightness-110"
                      style={{ height: `${incomeHeight}%` }}
                    />
                    {/* Expense Bar */}
                    <div
                      title={`Expenses: ${formatCurrency(d.expenses)}`}
                      className="w-1/2 bg-rose-500 dark:bg-rose-400 rounded-t-lg transition-all duration-500 hover:brightness-110"
                      style={{ height: `${expenseHeight}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{d.month}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-6 text-xs font-semibold">
            <span className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <span className="w-3 h-3 rounded bg-emerald-500" /> Income
            </span>
            <span className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <span className="w-3 h-3 rounded bg-rose-500" /> Expenses
            </span>
          </div>
        </div>

        {/* Category Spending Breakdown */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Spending by Category</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Expense distribution for {timeframe}</p>
            </div>
            <PieChartIcon className="w-5 h-5 text-indigo-500" />
          </div>

          <div className="space-y-4">
            {categories.map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.category}
                  </span>
                  <span>
                    {formatCurrency(cat.amount)} ({cat.percentage}%)
                  </span>
                </div>

                <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Synthesis & Summary Report Generator */}
      <section className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>POWERED BY GEMINI 3.6 FLASH</span>
            </div>
            <h2 className="text-2xl font-black">AI Financial Analysis Synthesis</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Generate an automated executive summary report summarizing cashflow, top savings, and debt opportunities.
            </p>
          </div>

          <button
            onClick={handleGenerateAIReport}
            disabled={generatingAI}
            className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all duration-200 shrink-0"
          >
            {generatingAI ? (
              <Spinner size="sm" label="Generating..." />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{generatingAI ? 'Analyzing Financial Data...' : t('generateReport')}</span>
          </button>
        </div>

        {/* Generated Report Content Area */}
        {aiReportText ? (
          <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 text-sm leading-relaxed text-slate-100 whitespace-pre-line font-sans space-y-4">
            {aiReportText}
          </div>
        ) : (
          <div className="p-8 text-center rounded-2xl bg-slate-800/50 border border-dashed border-slate-700 text-slate-400 space-y-2">
            <FileText className="w-10 h-10 mx-auto text-emerald-400 opacity-80" />
            <p className="text-sm font-semibold text-slate-200">No AI synthesis report generated yet for {timeframe}.</p>
            <p className="text-xs text-slate-400">Click "{t('generateReport')}" above to synthesize your financial metrics.</p>
          </div>
        )}
      </section>
    </div>
  );
};
