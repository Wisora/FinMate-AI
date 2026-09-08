import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSession } from 'next-auth/react';

export interface Goal {
  id: string;
  title: string;
  category?: string | null;
  targetAmount: number;
  currentAmount: number;
  priority?: string | null;
}

export interface Report {
  id: string;
  timeframe: string;
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  aiSummary: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { status } = useSession();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [goalsRes, reportsRes] = await Promise.all([
          fetch('/api/goals'),
          fetch('/api/reports'),
        ]);

        if (goalsRes.ok) {
          const goalsData = await goalsRes.json();
          setGoals(Array.isArray(goalsData) ? goalsData : []);
        }

        if (reportsRes.ok) {
          const reportsData = await reportsRes.json();
          setReports(Array.isArray(reportsData) ? reportsData : []);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (status === 'loading' || loading) {
    return <div className="p-6 text-center">Loading dashboard...</div>;
  }

  const filteredGoals = goals.filter((goal) => {
    return (
      search === '' ||
      goal.title.toLowerCase().includes(search.toLowerCase()) ||
      (goal.category && goal.category.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const latestReport = reports[0] || {
    totalIncome: 0,
    totalExpenses: 0,
    netSavings: 0,
  };

  const goalCategoryData = goals.reduce((acc, goal) => {
    const category = goal.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + goal.currentAmount;
    return acc;
  }, {} as Record<string, number>);

  const barData = {
    labels: ['Income', 'Expenses', 'Savings'],
    datasets: [
      {
        label: 'Financial Overview',
        data: [latestReport.totalIncome, latestReport.totalExpenses, latestReport.netSavings],
        backgroundColor: ['#4CAF50', '#F44336', '#2196F3'],
      },
    ],
  };

  const lineData = {
    labels: reports.map((r) => r.timeframe),
    datasets: [
      {
        label: 'Net Savings Trend',
        data: reports.map((r) => r.netSavings),
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        fill: true,
      },
    ],
  };

  const pieData = {
    labels: Object.keys(goalCategoryData),
    datasets: [
      {
        data: Object.values(goalCategoryData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0'],
      },
    ],
  };

  return (
    <div className={darkMode ? 'dark bg-gray-900 text-white min-h-screen p-6' : 'bg-gray-50 text-black min-h-screen p-6'}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📊 Dashboard</h2>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded border bg-gray-200 dark:bg-gray-700"
        >
          Toggle Dark Mode
        </button>
      </div>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Search Goals</h3>
        <input
          aria-label="Search goals"
          type="text"
          placeholder="Search by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded w-1/3 dark:bg-gray-800 dark:text-white"
        />
      </section>

      <section className="mb-6 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-2">Financial Goals</h3>
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Target Amount</th>
              <th className="border px-4 py-2">Current Amount</th>
              <th className="border px-4 py-2">Progress</th>
            </tr>
          </thead>
          <tbody>
            {filteredGoals.length === 0 ? (
              <tr>
                <td colSpan={5} className="border px-4 py-2 text-center">
                  No goals found.
                </td>
              </tr>
            ) : (
              filteredGoals.map((goal) => (
                <tr key={goal.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                  <td className="border px-4 py-2">{goal.title}</td>
                  <td className="border px-4 py-2">{goal.category || 'General'}</td>
                  <td className="border px-4 py-2">${goal.targetAmount}</td>
                  <td className="border px-4 py-2">${goal.currentAmount}</td>
                  <td className="border px-4 py-2">
                    <progress
                      value={goal.currentAmount}
                      max={goal.targetAmount}
                      className="w-full h-2"
                    ></progress>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section>
          <h3 className="text-lg font-semibold mb-2">Income vs Expenses</h3>
          <Bar data={barData} />
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Savings Trend</h3>
          <Line data={lineData} />
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Goal Funding by Category</h3>
          <Pie data={pieData} />
        </section>
      </div>
    </div>
  );
}