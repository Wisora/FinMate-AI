// src/services/reportsService.ts

export interface FinancialSummary {
  income: number;
  expenses: number;
  netSavings: number;
  healthScore: number;
  savingsProgress: number;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

/**
 * Returns summary overview metrics.
 */
export async function getFinancialSummary(): Promise<FinancialSummary> {
  // Simulating async API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        income: 6200,
        expenses: 3700,
        netSavings: 2500,
        healthScore: 88,
        savingsProgress: 72,
      });
    }, 100);
  });
}

/**
 * Returns breakdown of spending by category.
 */
export async function getCategoryBreakdown(): Promise<CategoryBreakdown[]> {
  // Simulating async API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { category: 'Housing & Rent', amount: 1600, percentage: 43, color: '#3b82f6' },
        { category: 'Groceries & Dining', amount: 850, percentage: 23, color: '#10b981' },
        { category: 'Transportation', amount: 450, percentage: 12, color: '#f59e0b' },
        { category: 'Utilities & Subscriptions', amount: 500, percentage: 14, color: '#ec4899' },
        { category: 'Entertainment & Leisure', amount: 300, percentage: 8, color: '#8b5cf6' },
      ]);
    }, 100);
  });
}

/**
 * Generates an AI-synthesized report analysis for the given timeframe.
 */
export async function fetchAISummaryReport(
  timeframe: string,
  language: string = 'en',
  currency: string = 'USD'
): Promise<string> {
  // Simulating AI response generation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `📊 AI Executive Financial Summary (${timeframe}) [${currency}]\n\n` +
          `• Cashflow Analysis: Strong overall net surplus. Income exceeded total expenses by ~40%.\n` +
          `• Top Expense Drivers: Housing & Rent accounts for the largest share of outflows, followed by Groceries & Dining.\n` +
          `• Savings Velocity: On track to hit your annual emergency fund target.\n` +
          `• Recommendations: Consider redirecting $250 of unallocated monthly surplus into low-cost index funds.`
      );
    }, 800);
  });
}