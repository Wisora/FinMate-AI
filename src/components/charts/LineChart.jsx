// SVG line chart for the savings trend (handles negative values, zero baseline).

export function LineChart({ points, width = 560, height = 190, formatValue }) {
  if (!points || points.length < 2) return null;
  const pad = 8;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;
  const values = points.map((p) => p.value);
  const max = Math.max(...values, 0);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const stepX = innerW / (points.length - 1);

  const coords = points.map((p, i) => ({
    x: pad + i * stepX,
    y: pad + innerH - ((p.value - min) / range) * innerH,
    ...p,
  }));

  const zeroY = pad + innerH - ((0 - min) / range) * innerH;
  const line = coords
    .map((c, i) => `${i ? "L" : "M"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L ${coords[coords.length - 1].x.toFixed(1)} ${zeroY.toFixed(1)} L ${coords[0].x.toFixed(1)} ${zeroY.toFixed(1)} Z`;

  return (
    <div className="line-chart">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        role="img"
        aria-label={points
          .map(
            (p) =>
              `${p.label}: ${formatValue ? formatValue(p.value) : p.value}`,
          )
          .join(", ")}
      >
        <path d={area} fill="var(--success-soft)" stroke="none" />
        <line
          x1={pad}
          x2={width - pad}
          y1={zeroY}
          y2={zeroY}
          stroke="var(--border)"
          strokeDasharray="4 4"
        />
        <path
          d={line}
          fill="none"
          stroke="var(--success)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {coords.map((c) => (
          <circle
            key={c.label}
            cx={c.x}
            cy={c.y}
            r="4"
            fill="var(--success)"
            stroke="var(--surface)"
            strokeWidth="1.5"
          >
            <title>{`${c.label}: ${formatValue ? formatValue(c.value) : c.value}`}</title>
          </circle>
        ))}
      </svg>
      <div className="line-labels">
        {points.map((p) => (
          <span key={p.label}>{p.label}</span>
        ))}
      </div>
    </div>
  );
}
