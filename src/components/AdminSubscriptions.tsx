import { useEffect, useState } from 'react';

interface User {
  role: string;
}

interface Subscription {
  id: number;
  user_id: string;
  plan: string;
  status: string;
  start_date: string;
  end_date: string;
}

export default function AdminSubscriptions({ user }: { user?: User }) {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    // Prevent sensitive API fetching for non-admin clients
    if (!isAdmin) return;

    fetch('/api/subscriptions')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch subscriptions');
        return res.json();
      })
      .then((data) => setSubs(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [isAdmin]);

  if (!isAdmin) return <h2>Access denied</h2>;
  if (loading) return <p>Loading subscriptions...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Subscription Dashboard</h1>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>User</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {subs.map((sub) => (
            <tr key={sub.id}>
              <td>{sub.user_id}</td>
              <td>{sub.plan}</td>
              <td>{sub.status}</td>
              <td>{sub.start_date}</td>
              <td>{sub.end_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}