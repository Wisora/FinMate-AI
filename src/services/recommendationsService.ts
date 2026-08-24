import { Recommendation } from '../types';

const RECS_STORAGE_KEY = 'finmate_recommendations';

const INITIAL_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'r1',
    title: 'Automate 15% Paycheck Transfer',
    category: 'savings',
    description:
      'Set up automatic recurring transfer to your 3-Month Emergency Fund goal every 1st of the month to build reserves effortlessy.',
    impact: 'high',
    potentialSavings: 810,
    actionText: 'Automate Savings',
    applied: false,
  },
  {
    id: 'r2',
    title: 'Avalanche Debt Repayment Boost',
    category: 'debt',
    description:
      'Redirect $150/mo from discretionary dining to your 18.5% credit card debt. You will save an estimated $420 in interest charges.',
    impact: 'high',
    potentialSavings: 420,
    actionText: 'Apply Debt Surge',
    applied: true,
  },
  {
    id: 'r3',
    title: 'Optimize Food & Dining Subscriptions',
    category: 'budgeting',
    description:
      'Food & Dining expenses represent 22% of monthly spending. Preparing 2 extra home meals per week will save ~$210/mo.',
    impact: 'medium',
    potentialSavings: 210,
    actionText: 'Set Dining Cap',
    applied: false,
  },
  {
    id: 'r4',
    title: 'Index Fund Dollar-Cost Averaging',
    category: 'investments',
    description:
      'Split investment contributions into bi-weekly $250 index fund buys to smooth market volatility and lower long-term risk.',
    impact: 'high',
    potentialSavings: 1200,
    actionText: 'Enable Bi-weekly DCA',
    applied: false,
  },
];

export const getRecommendations = (): Recommendation[] => {
  try {
    const saved = localStorage.getItem(RECS_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Failed to load recommendations', e);
  }
  try {
    localStorage.setItem(
      RECS_STORAGE_KEY,
      JSON.stringify(INITIAL_RECOMMENDATIONS)
    );
  } catch (e) {
    console.warn('Failed to save recommendations', e);
  }
  return INITIAL_RECOMMENDATIONS;
};

export const toggleApplyRecommendation = (id: string): Recommendation[] => {
  const current = getRecommendations();
  const updated = current.map((r) =>
    r.id === id ? { ...r, applied: !r.applied } : r
  );
  try {
    localStorage.setItem(RECS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save recommendations', e);
  }
  return updated;
};
