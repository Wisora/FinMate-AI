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

// Fallback interfaces if @prisma/client is not generated
export interface Transaction {
  id: string | number;
  amount: number;
  createdAt: string | Date;
  category?: { name: string };
  user?: { email: string };
}

export interface Budget {
  id: string | number;
  limit: number;
  period: string;
  user?: { email: string };
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

export function Dashboard() {
  const { status } = useSession();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const txRes = await fetch('/api/transactions');
        if (txRes.ok) {
          const txData = await txRes.json();
          setTransactions(Array.isArray(txData) ? txData : []);
        }

        const budgetRes = await fetch('/api/budgets');
        if (budgetRes.ok) {
          const budgetData = await budgetRes.json();
          setBudgets(Array.isArray(budgetData) ? budgetData : []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (status === 'loading') return <p>Checking authentication...</p>;
  if (loading) return <p>Loading dashboard...</p>;

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      search === '' ||
      tx.category?.name?.toLowerCase().includes(search.toLowerCase()) ||
      tx.user?.email?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === '' || tx.category?.name === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const income = transactions
    .filter((tx) => tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0);

  const expenses = transactions
    .filter((tx) => tx.amount < 0)
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  const monthlyData = transactions.reduce(
    (acc, tx) => {
      const month = new Date(tx.createdAt).toLocaleString('default', {
        month: 'short',
      });
      acc[month] = (acc[month] || 0) + tx.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  const categoryData = transactions.reduce(
    (acc, tx) => {
      const category = tx.category?.name || 'Uncategorized';
      acc[category] = (acc[category] || 0) + Math.abs(tx.amount);
      return acc;
    },
    {} as Record<string, number>
  );

  const barData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Financial Overview',
        data: [income, expenses],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  };

  const lineData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Monthly Net Flow',
        data: Object.values(monthlyData),
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        fill: true,
      },
    ],
  };

  const pieData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#9C27B0',
        ],
      },
    ],
  };

  return (
    <div
      className={
        darkMode
          ? 'dark bg-gray-900 text-white min-h-screen p-6'
          : 'bg-gray-50 text-black min-h-screen p-6'
      }
    >
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
        <h3 className="text-lg font-semibold mb-2">Filters</h3>
        <div className="flex gap-4">
          <input
            aria-label="Search transactions"
            type="text"
            placeholder="Search by category or user"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded w-1/3 dark:bg-gray-800"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border rounded dark:bg-gray-800"
          >
            <option value="">All Categories</option>
            {Object.keys(categoryData).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Transactions</h3>
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr
                key={tx.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="border px-4 py-2">{tx.id}</td>
                <td className="border px-4 py-2">{tx.amount}</td>
                <td className="border px-4 py-2">
                  {tx.category?.name || 'Uncategorized'}
                </td>
                <td className="border px-4 py-2">{tx.user?.email}</td>
                <td className="border px-4 py-2">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Budgets</h3>
        <ul className="space-y-2">
          {budgets.map((b) => (
            <li key={b.id} className="p-2 border rounded dark:border-gray-600">
              {b.period} budget: {b.limit} (User: {b.user?.email})
              <progress
                value={expenses}
                max={b.limit}
                className="w-full h-2"
              ></progress>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Income vs Expenses</h3>
        <Bar data={barData} />
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Monthly Trend</h3>
        <Line data={lineData} />
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Category Breakdown</h3>
        <Pie data={pieData} />
      </section>
    </div>
  );
}

export default Dashboard;