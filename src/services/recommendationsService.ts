import { Recommendation } from '../types';

const INITIAL_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec_1',
    title: 'Consolidate High-Interest Debt',
    category: 'debt',
    description: 'Switch credit balance to a 0% APR balance transfer card to save on monthly interest.',
    impact: 'high',
    potentialSavings: 450,
    actionText: 'Explore Cards',
    applied: false,
  },
  {
    id: 'rec_2',
    title: 'Optimize Dining Subscriptions',
    category: 'budgeting',
    description: 'AI noticed repetitive food delivery orders exceeding monthly targets by 18%.',
    impact: 'medium',
    potentialSavings: 120,
    actionText: 'Review Spending',
    applied: false,
  },
];

export const recommendationsService = {
  getRecommendations(): Recommendation[] {
    try {
      const saved = localStorage.getItem('finmate_recommendations');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load recommendations', e);
    }
    return INITIAL_RECOMMENDATIONS;
  },

  applyRecommendation(id: string): Recommendation[] {
    const updated = this.getRecommendations().map((rec) =>
      rec.id === id ? { ...rec, applied: true } : rec
    );
    localStorage.setItem('finmate_recommendations', JSON.stringify(updated));
    return updated;
  },
};