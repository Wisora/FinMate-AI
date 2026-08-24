import { FinancialSummary, ReportData, Transaction } from '../types';
import { getGoals } from './goalsService';

const TRANSACTIONS_KEY = 'finmate_transactions';

const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    title: 'Tech Monthly Salary',
    amount: 5400,
    type: 'income',
    category: 'Salary',
    date: '2026-07-01',
    isRecurring: true,
  },
  {
    id: 't2',
    title: 'Freelance Design Retainer',
    amount: 850,
    type: 'income',
    category: 'Freelance',
    date: '2026-07-12',
  },
  {
    id: 't3',
    title: 'Apartment Rent & Water',
    amount: 1850,
    type: 'expense',
    category: 'Housing',
    date: '2026-07-02',
    isRecurring: true,
  },
  {
    id: 't4',
    title: 'Whole Foods Grocery',
    amount: 480,
    type: 'expense',
    category: 'Food & Dining',
    date: '2026-07-05',
  },
  {
    id: 't5',
    title: 'Dining Out & Bistro',
    amount: 320,
    type: 'expense',
    category: 'Food & Dining',
    date: '2026-07-15',
  },
  {
    id: 't6',
    title: 'Electric & High-Speed Fiber',
    amount: 165,
    type: 'expense',
    category: 'Utilities',
    date: '2026-07-08',
    isRecurring: true,
  },
  {
    id: 't7',
    title: 'Uber & EV Charging',
    amount: 190,
    type: 'expense',
    category: 'Transport',
    date: '2026-07-18',
  },
  {
    id: 't8',
    title: 'Streaming & Cinema Pass',
    amount: 85,
    type: 'expense',
    category: 'Entertainment',
    date: '2026-07-10',
  },
  {
    id: 't9',
    title: 'Health Insurance & Gym',
    amount: 240,
    type: 'expense',
    category: 'Health',
    date: '2026-07-03',
  },
  {
    id: 't10',
    title: 'Gadgets & Summer Apparel',
    amount: 290,
    type: 'expense',
    category: 'Shopping',
    date: '2026-07-22',
  },
];

export const getTransactions = (): Transaction[] => {
  try {
    const saved = localStorage.getItem(TRANSACTIONS_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Failed to load transactions', e);
  }
  try {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(SAMPLE_TRANSACTIONS));
  } catch (e) {
    console.warn('Failed to save transactions', e);
  }
  return SAMPLE_TRANSACTIONS;
};

export const getFinancialSummary = (): FinancialSummary => {
  const transactions = getTransactions();
  const goals = getGoals();

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netSavings = Math.max(0, totalIncome - totalExpenses);

  const savingsGoals = goals.filter((g) => g.category === 'savings');
  const totalSavingsTarget = savingsGoals.reduce(
    (sum, g) => sum + g.targetAmount,
    0
  );
  const totalSavingsCurrent = savingsGoals.reduce(
    (sum, g) => sum + g.currentAmount,
    0
  );
  const savingsProgress =
    totalSavingsTarget > 0
      ? Math.round((totalSavingsCurrent / totalSavingsTarget) * 100)
      : 0;

  const debtGoals = goals.filter((g) => g.category === 'debt');
  const totalDebtTarget = debtGoals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalDebtCurrent = debtGoals.reduce(
    (sum, g) => sum + g.currentAmount,
    0
  );
  const debtProgress =
    totalDebtTarget > 0
      ? Math.round((totalDebtCurrent / totalDebtTarget) * 100)
      : 0;

  const investmentGoals = goals.filter((g) => g.category === 'investment');
  const investments = investmentGoals.reduce(
    (sum, g) => sum + g.currentAmount,
    0
  );

  // Financial Health Score Calculation (0 to 100)
  // Factors: savings rate (35%), debt progress (35%), emergency ratio (30%)
  const savingsRate = totalIncome > 0 ? netSavings / totalIncome : 0;
  const savingsScore = Math.min(35, Math.round(savingsRate * 100));
  const debtScore = Math.min(35, Math.round((debtProgress / 100) * 35));
  const investmentScore = Math.min(30, Math.round((investments / 20000) * 30));

  const healthScore = Math.min(
    98,
    Math.max(45, savingsScore + debtScore + investmentScore + 20)
  );

  return {
    income: totalIncome,
    expenses: totalExpenses,
    netSavings,
    totalSavingsGoals: totalSavingsTarget,
    savingsProgress,
    totalDebtGoals: totalDebtTarget,
    debtProgress,
    investments,
    healthScore,
  };
};

export const getCategoryBreakdown = () => {
  const transactions = getTransactions().filter((t) => t.type === 'expense');
  const totals: Record<string, number> = {};
  let totalExpense = 0;

  transactions.forEach((t) => {
    totals[t.category] = (totals[t.category] || 0) + t.amount;
    totalExpense += t.amount;
  });

  const colors: Record<string, string> = {
    Housing: '#3B82F6',
    'Food & Dining': '#10B981',
    Utilities: '#F59E0B',
    Transport: '#6366F1',
    Entertainment: '#EC4899',
    Health: '#14B8A6',
    Shopping: '#8B5CF6',
  };

  return Object.keys(totals).map((cat) => ({
    category: cat,
    amount: totals[cat],
    percentage:
      totalExpense > 0 ? Math.round((totals[cat] / totalExpense) * 100) : 0,
    color: colors[cat] || '#9CA3AF',
  }));
};

export const fetchAISummaryReport = async (
  timeframe: string,
  language: string,
  currency: string
): Promise<string> => {
  const summary = getFinancialSummary();
  const breakdown = getCategoryBreakdown();

  try {
    const res = await fetch('/api/reports/ai-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timeframe,
        financialData: { summary, breakdown },
        language,
        currency,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.summary;
    }
  } catch (e) {
    console.warn('API report call failed, returning fallback analysis', e);
  }

  return `📊 **FinMate Financial Report (${timeframe})**
• **Cashflow Performance**: Income of ${currency} ${summary.income} vs Expenses of ${currency} ${summary.expenses} resulting in net savings of ${currency} ${summary.netSavings}.
• **Savings Rate**: ${Math.round((summary.netSavings / (summary.income || 1)) * 100)}% of income saved.
• **Top Expense Category**: ${breakdown[0]?.category || 'Housing'} (${breakdown[0]?.percentage || 40}% of expenses).
• **Action Step**: Maintain your momentum on paying off high-interest debt goals while contributing to emergency savings!`;
};
