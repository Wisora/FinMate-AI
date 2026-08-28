import React from 'react';
import { GoalCategory } from '@prisma/client';

// Local Mock Data with strict Prisma enum casting
const mockGoal = {
  id: '1',
  title: 'Emergency Fund',
  targetAmount: 10000,
  currentAmount: 2500,
  category: 'savings' as GoalCategory,
  targetDate: '2026-12-31',
  priority: 'high',
  isCompleted: false,
};

const mockReport = {
  timeframe: 'August 2026',
  income: 5000,
  expenses: 3000,
  netSavings: 2000,
  reportDate: '2026-08-28',
};

const mockRecommendation = {
  id: '1',
  title: 'Reduce Dining Out',
  description: 'You spent 15% more on food this month.',
  impact: 'High',
  category: 'expenses' as any,
  potentialSavings: 150,
  actionText: 'Set Budget',
  applied: false,
};

export default function Dashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">FinMate AI Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border rounded-lg shadow-sm bg-card">
          <h2 className="font-semibold text-lg mb-2">Primary Goal</h2>
          <p className="text-sm font-medium">{mockGoal.title}</p>
          <p className="text-2xl font-bold">${mockGoal.currentAmount} / ${mockGoal.targetAmount}</p>
        </div>

        <div className="p-4 border rounded-lg shadow-sm bg-card">
          <h2 className="font-semibold text-lg mb-2">Monthly Summary</h2>
          <p className="text-sm font-medium">{mockReport.timeframe}</p>
          <p className="text-2xl font-bold text-green-600">+${mockReport.netSavings}</p>
        </div>

        <div className="p-4 border rounded-lg shadow-sm bg-card">
          <h2 className="font-semibold text-lg mb-2">Top Recommendation</h2>
          <p className="text-sm font-medium">{mockRecommendation.title}</p>
          <p className="text-xs text-muted-foreground">{mockRecommendation.description}</p>
        </div>
      </div>
    </div>
  );
}