// src/pages/dashboard.tsx
import { AssistantChat } from '@/components/Dashboard/AssistantChat';
import { GoalCard } from '@/components/Dashboard/GoalCard';
import { RecommendationCard } from '@/components/Dashboard/RecommendationCard';
import { ReportCard } from '@/components/Dashboard/ReportCard';
import Subscriptions from '@/components/Dashboard/Subscriptions';
import Dashboard from '@/components/Dashboard/Dashboard';

export default function DashboardPage() {
  const mockGoal = {
    id: '1',
    title: 'Emergency Savings',
    targetAmount: 5000,
    currentAmount: 1500,
    category: 'Savings',
  };

  const mockRecommendation = {
    id: '1',
    title: 'Cut Down Dining Out',
    description: 'Reduce weekly restaurant spending by 20%.',
    impact: 'High',
  };

  return (
    <main style={{ padding: '20px' }}>
      <Dashboard />
      <GoalCard 
        goal={mockGoal} 
        onEdit={() => {}} 
        onAddProgress={() => {}} 
      />
      <ReportCard 
        timeframe="Weekly" 
        income={2000} 
        expenses={1200} 
        netSavings={800} 
        topExpenseCategory="Food"
        reportDate="2026-08-26"
      />
      <RecommendationCard 
        recommendation={mockRecommendation} 
        onApply={() => {}} 
      />
      <AssistantChat />
      <Subscriptions />
    </main>
  );
}