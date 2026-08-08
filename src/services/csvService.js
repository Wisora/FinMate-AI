// CSV export (Pro feature) — builds a single CSV with a Goals section and a
// Monthly summary section, then triggers a client-side download.

function csvCell(v) {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function toCsv(rows) {
  return rows.map((r) => r.map(csvCell).join(",")).join("\r\n");
}

export function downloadCsv(filename, csv) {
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Headers/sections are passed in pre-localized by the caller (t()).
export function buildCsv({ goals, history, headers, monthLabels }) {
  const rows = [];
  rows.push([headers.goalsSection]);
  rows.push([
    headers.type,
    headers.title,
    headers.current,
    headers.target,
    headers.progress,
    headers.targetDate,
    headers.monthlyContribution,
  ]);
  (goals || []).forEach((g) => {
    rows.push([
      g.type,
      g.title || "",
      g.currentAmount,
      g.targetAmount,
      g.targetAmount ? Math.round((g.currentAmount / g.targetAmount) * 100) : 0,
      g.targetDate || "",
      g.monthlyContribution ?? "",
    ]);
  });
  rows.push([]);
  rows.push([headers.monthlySection]);
  rows.push([
    headers.month,
    headers.income,
    headers.expenses,
    headers.savings,
    headers.savingsRate,
  ]);
  (history || []).forEach((m, i) => {
    const savings = m.income - m.expenses;
    rows.push([
      monthLabels[i] || m.month,
      m.income,
      m.expenses,
      savings,
      m.income > 0 ? ((savings / m.income) * 100).toFixed(1) : 0,
    ]);
  });
  return toCsv(rows);
}
