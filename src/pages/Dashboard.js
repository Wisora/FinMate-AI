import React, { useState } from 'react';
import GoalCard from '../components/Dashboard/GoalCard';
import GoalForm from '../components/Dashboard/GoalForm';
import ReportCard from '../components/Dashboard/ReportCard';
import RecommendationCard from '../components/Dashboard/RecommendationCard';
import AssistantChat from '../components/Dashboard/AssistantChat';
import Spinner from '../components/common/Spinner';

import { getGoals, addGoal, updateGoal, deleteGoal } from '../services/goalsService';
import { getReports, generateWeeklyReport, generateMonthlyReport } from '../services/reportsService';
import { getRecommendations } from '../services/recommendationsService';

function Dashboard({ showToast }) {
  const [goals, setGoals] = useState(getGoals());
  const [reports, setReports] = useState(getReports());
  const [recommendations] = useState(getRecommendations());
  const [loading, setLoading] = useState(false);

  // Add a new goal via GoalForm
  const handleAddGoal = async (title, target, deadline) => {
    setLoading(true);
    const newGoal = await addGoal(title, target, deadline);
    setGoals([...goals, newGoal]);
    setLoading(false);
    showToast("🎯 New goal added!");
  };

  // Update progress for a goal
  const handleAddProgress = async (goalId, amount) => {
    setLoading(true);
    const updated = await updateGoal(goalId, amount);
    setGoals(goals.map(g => g.id === updated.id ? updated : g));
    setLoading(false);
    showToast("💰 Progress updated!");
  };

  // Delete a goal
  const handleDeleteGoal = async (goalId) => {
    setLoading(true);
    await deleteGoal(goalId);
    setGoals(goals.filter(g => g.id !== goalId));
    setLoading(false);
    showToast("🗑️ Goal deleted!");
  };

  // Generate weekly report
  const handleWeeklyReport = async () => {
    setLoading(true);
    const newReport = await generateWeeklyReport(15000, 9000); // replace with real data
    setReports([...reports, newReport]);
    setLoading(false);
    showToast("📊 Weekly report generated!");
  };

  // Generate monthly report
  const handleMonthlyReport = async () => {
    setLoading(true);
    const newReport = await generateMonthlyReport(60000, 42000); // replace with real data
    setReports([...reports, newReport]);
    setLoading(false);
    showToast("📈 Monthly report generated!");
  };

  return (
    <div className="dashboard-page">
      <h2>📊 Dashboard</h2>
      {loading && <Spinner />}

      {/* Goals Section */}
      <section>
        <h3>🎯 Goals</h3>
        <GoalForm onAddGoal={handleAddGoal} />
        <div className="goals-grid">
          {goals.map(goal => (
            <GoalCard 
              key={goal.id} 
              goal={goal} 
              onAddProgress={handleAddProgress} 
              onDeleteGoal={handleDeleteGoal}
            />
          ))}
        </div>
      </section>

      {/* Reports Section */}
      <section>
        <h3>📈 Reports</h3>
        <div className="report-actions">
          <button onClick={handleWeeklyReport}>Generate Weekly Report</button>
          <button onClick={handleMonthlyReport}>Generate Monthly Report</button>
        </div>
        <div className="reports-grid">
          {reports.map(report => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </section>

      {/* Recommendations Section */}
      <section>
        <h3>💡 Recommendations</h3>
        <div className="recommendations-grid">
          {recommendations.map(rec => (
            <RecommendationCard key={rec.id} recommendation={rec} />
          ))}
        </div>
      </section>

      {/* Assistant Chat Section */}
      <section>
        <AssistantChat />
      </section>
    </div>
  );
}

export default Dashboard;
