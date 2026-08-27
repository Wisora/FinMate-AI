import { Goal, GoalCategory } from '../types';

const STORAGE_KEY = 'finmate_goals';

const INITIAL_GOALS: Goal[] = [
  {
    id: 'g1',
    title: 'Emergency Savings Fund',
    category: 'savings',
    currentAmount: 3200,
    targetAmount: 5000,
    targetDate: '2026-12-31',
    priority: 'high',
    isCompleted: false,
    notes: 'Aiming for 3 months of expenses.',
  },
  {
    id: 'g2',
    title: 'Pay Off Credit Card',
    category: 'debt',
    currentAmount: 1400,
    targetAmount: 2000,
    targetDate: '2026-10-15',
    priority: 'high',
    isCompleted: false,
  },
];

export const goalsService = {
  getGoals(): Goal[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (error) {
      console.warn('Failed to read goals:', error);
    }
    return INITIAL_GOALS;
  },

  addGoal(newGoal: Omit<Goal, 'id' | 'isCompleted'>): Goal {
    const goals = this.getGoals();
    const created: Goal = {
      ...newGoal,
      id: `g_${Date.now()}`,
      isCompleted: newGoal.currentAmount >= newGoal.targetAmount,
    };
    const updated = [created, ...goals];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return created;
  },

  updateProgress(id: string, addedAmount: number): Goal[] {
    const goals = this.getGoals().map((goal) => {
      if (goal.id === id) {
        const currentAmount = goal.currentAmount + addedAmount;
        return {
          ...goal,
          currentAmount,
          isCompleted: currentAmount >= goal.targetAmount,
        };
      }
      return goal;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    return goals;
  },

  deleteGoal(id: string): Goal[] {
    const filtered = this.getGoals().filter((g) => g.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  },
};