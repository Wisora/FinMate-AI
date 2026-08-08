import { useEffect, useState } from "react";

export default function Home() {
  // Track whether the component has mounted on the client
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Welcome to FinMate AI</h1>

      {/* Only render client‑specific content after mount */}
      {mounted ? (
        <p>You are now seeing client‑side hydrated content.</p>
      ) : (
        <p>Loading…</p>
      )}
    </main>
  );
}
