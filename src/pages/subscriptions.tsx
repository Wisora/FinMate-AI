import { useEffect, useState } from "react";

type Subscription = {
  id: number;
  plan: string;
  status: string;
  amount: number;
  payment_method: string;
  user: { email: string };
};

export default function SubscriptionsPage() {
  const [subs, setSubs] = useState<Subscription[]>([]);

  useEffect(() => {
    fetch("/api/subscriptions")
      .then((res) => res.json())
      .then((data) => setSubs(data));
  }, []);

  if (!subs.length) return <p>No subscriptions found.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Subscriptions</h1>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>User Email</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {subs.map((sub) => (
            <tr key={sub.id}>
              <td>{sub.user.email}</td>
              <td>{sub.plan}</td>
              <td>{sub.status}</td>
              <td>${sub.amount}</td>
              <td>{sub.payment_method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
