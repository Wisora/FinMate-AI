// SVG donut chart for category breakdown, with a legend list.

const PALETTE = [
  "var(--info)",
  "var(--danger)",
  "var(--warning)",
  "var(--success)",
  "var(--primary)",
  "var(--text-muted)",
];

export function DonutChart({ data, size = 180, thickness = 26, formatValue }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const R = (size - thickness) / 2;
  const C = 2 * Math.PI * R;
  const cx = size / 2;

  let acc = 0;
  const segments = data.map((d, i) => {
    const frac = Math.max(0, d.value) / total;
    const dash = frac * C;
    const offset = -acc * C;
    acc += frac;
    return (
      <circle
        key={i}
        cx={cx}
        cy={cx}
        r={R}
        fill="none"
        stroke={PALETTE[i % PALETTE.length]}
        strokeWidth={thickness}
        strokeDasharray={`${Math.max(0, dash - 1.5)} ${C}`}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${cx} ${cx})`}
      >
        <title>{`${d.label}: ${formatValue ? formatValue(d.value) : d.value}`}</title>
      </circle>
    );
  });

  return (
    <div className="donut-wrap">
      <svg
        className="donut"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={data
          .map(
            (d) => `${d.label} ${formatValue ? formatValue(d.value) : d.value}`,
          )
          .join(", ")}
      >
        <circle
          cx={cx}
          cy={cx}
          r={R}
          fill="none"
          stroke="var(--surface-3)"
          strokeWidth={thickness}
        />
        {segments}
      </svg>
      <ul className="donut-legend">
        {data.map((d, i) => (
          <li key={d.label}>
            <i
              className="donut-dot"
              style={{ background: PALETTE[i % PALETTE.length] }}
              aria-hidden="true"
            />
            <span className="donut-label">{d.label}</span>
            <strong className="donut-value">
              {formatValue ? formatValue(d.value) : d.value}
            </strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
