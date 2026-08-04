export type GoalCategory = 'savings' | 'debt' | 'investment';

export interface Goal {
  id: string;
  title: string;
  category: GoalCategory;
  currentAmount: number;
  targetAmount: number;
  targetDate: string;
  priority: 'high' | 'medium' | 'low';
  isCompleted: boolean;
  notes?: string;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  isRecurring?: boolean;
}

export type RecommendationCategory = 'budgeting' | 'savings' | 'debt' | 'investments';

export interface Recommendation {
  id: string;
  title: string;
  category: RecommendationCategory;
  description: string;
  impact: 'high' | 'medium' | 'low';
  potentialSavings: number;
  actionText: string;
  applied: boolean;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface ReportData {
  id: string;
  timeframe: string; // e.g. "July 2026"
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  topCategories: CategoryBreakdown[];
  aiSummary?: string;
  createdAt: string;
}

export type PlanType = 'free' | 'pro';

export interface UserProfile {
  name: string;
  email: string;
  plan: PlanType;
  avatarUrl: string;
  joinedDate: string;
  persona: string;
  monthlyIncome: number;
  monthlyExpensesBudget: number;
}

export type CurrencyCode = 'USD' | 'EUR' | 'ZAR' | 'GBP' | 'JPY';
export type LanguageCode = 'en' | 'af' | 'fr' | 'es' | 'ar';

export interface SettingsState {
  notificationsEnabled: boolean;
  alertOverspending: boolean;
  alertGoalMilestones: boolean;
  weeklyInsights: boolean;
  currency: CurrencyCode;
  language: LanguageCode;
  darkMode: boolean;
}

export interface AlertItem {
  id: string;
  type: 'warning' | 'success' | 'info';
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isFallback?: boolean;
}

export interface FinancialSummary {
  income: number;
  expenses: number;
  netSavings: number;
  totalSavingsGoals: number;
  savingsProgress: number;
  totalDebtGoals: number;
  debtProgress: number;
  investments: number;
  healthScore: number;
}
