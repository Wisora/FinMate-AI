import { useEffect, useState } from "react";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Dashboard</h1>

      {mounted ? (
        <section>
          <p>Client‑side data will load here.</p>
          {/* Example: Replace with Prisma data or charts */}
        </section>
      ) : (
        <p>Loading…</p>
      )}
    </main>
  );
}
