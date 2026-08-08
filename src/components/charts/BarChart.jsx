// Reusable grouped bar chart (CSS bars, accessible via role="img" + label).

export function BarChart({
  groups,
  incomeLabel,
  expensesLabel,
  valueFormatter,
  ariaLabel,
}) {
  const max = Math.max(...groups.flatMap((g) => [g.income, g.expenses]), 1);
  return (
    <div className="bar-chart" role="img" aria-label={ariaLabel}>
      {groups.map((g) => (
        <div className="bar-col" key={g.label}>
          <div className="bar-bars">
            <div
              className="bar bar-income"
              style={{ height: `${Math.max(2, (g.income / max) * 100)}%` }}
              title={`${incomeLabel}: ${valueFormatter(g.income)}`}
            />
            <div
              className="bar bar-expenses"
              style={{ height: `${Math.max(2, (g.expenses / max) * 100)}%` }}
              title={`${expensesLabel}: ${valueFormatter(g.expenses)}`}
            />
          </div>
          <span className="bar-label">{g.label}</span>
        </div>
      ))}
    </div>
  );
}

export function ChartLegend({ items }) {
  return (
    <div className="chart-legend">
      {items.map((it) => (
        <span className="legend-item" key={it.label}>
          <i className={`swatch swatch-${it.swatch}`} aria-hidden="true" />
          {it.label}
        </span>
      ))}
    </div>
  );
}
