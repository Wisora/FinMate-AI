import { Goal } from "../types";

const STORAGE_KEY = "finmate_goals";

const DEFAULT_GOALS: Goal[] = [
  {
    id: "g1",
    title: "3-Month Emergency Fund",
    category: "savings",
    currentAmount: 9200,
    targetAmount: 12000,
    targetDate: "2026-12-31",
    priority: "high",
    isCompleted: false,
    notes: "High-yield savings account allocation.",
  },
  {
    id: "g2",
    title: "High-Interest Credit Card Payoff",
    category: "debt",
    currentAmount: 4100,
    targetAmount: 5000,
    targetDate: "2026-09-30",
    priority: "high",
    isCompleted: false,
    notes: "Pay off 18.5% APR card balance.",
  },
  {
    id: "g3",
    title: "Tech & Index Fund Portfolio",
    category: "investment",
    currentAmount: 14500,
    targetAmount: 20000,
    targetDate: "2027-06-30",
    priority: "medium",
    isCompleted: false,
    notes: "Monthly DCA into low-cost index ETFs.",
  },
  {
    id: "g4",
    title: "Cape Town & Safari Vacation",
    category: "savings",
    currentAmount: 3100,
    targetAmount: 3500,
    targetDate: "2026-11-15",
    priority: "low",
    isCompleted: false,
    notes: "Travel savings goal.",
  },
];

export const getGoals = (): Goal[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn("Failed to load goals from localStorage", e);
  }
  // Save default goals if none exist
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_GOALS));
  } catch (e) {
    console.warn("Failed to initialize goals", e);
  }
  return DEFAULT_GOALS;
};

export const saveGoals = (goals: Goal[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  } catch (e) {
    console.warn("Failed to save goals", e);
  }
};

export const addGoal = (newGoal: Omit<Goal, "id" | "isCompleted">): Goal => {
  const goals = getGoals();
  const goal: Goal = {
    ...newGoal,
    id: "g_" + Date.now(),
    isCompleted: newGoal.currentAmount >= newGoal.targetAmount,
  };
  const updated = [goal, ...goals];
  saveGoals(updated);
  return goal;
};

export const updateGoal = (id: string, updates: Partial<Goal>): Goal[] => {
  const goals = getGoals();
  const updated = goals.map((g) => {
    if (g.id === id) {
      const currentAmount = updates.currentAmount ?? g.currentAmount;
      const targetAmount = updates.targetAmount ?? g.targetAmount;
      return {
        ...g,
        ...updates,
        isCompleted: currentAmount >= targetAmount,
      };
    }
    return g;
  });
  saveGoals(updated);
  return updated;
};

export const deleteGoal = (id: string): Goal[] => {
  const goals = getGoals();
  const updated = goals.filter((g) => g.id !== id);
  saveGoals(updated);
  return updated;
};

export const resetGoalsToDefault = (): Goal[] => {
  saveGoals(DEFAULT_GOALS);
  return DEFAULT_GOALS;
};
