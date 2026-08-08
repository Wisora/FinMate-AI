// SVG semi-circular gauge for the financial health score.

function scoreColor(score) {
  if (score >= 80) return "var(--success)";
  if (score >= 60) return "var(--info)";
  if (score >= 40) return "var(--warning)";
  return "var(--danger)";
}

export function HealthGauge({ score, label, outOf100 }) {
  const pct = Math.max(0, Math.min(100, Number(score) || 0));
  const R = 80;
  const C = Math.PI * R; // semicircle length
  const color = scoreColor(pct);
  const dash = (C * pct) / 100;

  return (
    <div
      className="gauge"
      role="img"
      aria-label={`${label}: ${pct} ${outOf100 || "out of 100"}`}
    >
      <svg viewBox="0 0 200 120" width="200" height="120">
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="var(--surface-3)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={color}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${Math.max(0, dash - 2)} ${C}`}
        />
      </svg>
      <div className="gauge-center">
        <span className="gauge-number" style={{ color }}>
          {pct}
        </span>
        <span className="gauge-max">/ 100</span>
        <span className="gauge-label">{label}</span>
      </div>
    </div>
  );
}
