import { useEffect, useState } from "react";

export default function AdminSubscriptions({ user }) {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    fetch("/api/subscriptions")
      .then(res => res.json())
      .then(data => setSubs(data));
  }, []);

  if (user.role !== "admin") return <h2>Access denied</h2>;

  return (
    <div>
      <h1>Subscription Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>User</th><th>Plan</th><th>Status</th><th>Start</th><th>End</th>
          </tr>
        </thead>
        <tbody>
          {subs.map(sub => (
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
