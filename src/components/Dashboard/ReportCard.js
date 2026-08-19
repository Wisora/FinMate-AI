import React from "react";

function ReportCard({ report }) {
  const savingsRate = ((report.savings / report.income) * 100).toFixed(1);

  return (
    <div className="report-card" role="region" aria-label="Financial Report">
      <h4>{report.type} Report</h4>
      <p>
        <strong>Date:</strong> {report.date}
      </p>
      <p>
        <strong>Income:</strong> {report.income}
      </p>
      <p>
        <strong>Expenses:</strong> {report.expenses}
      </p>
      <p>
        <strong>Savings:</strong> {report.savings}
      </p>
      <p>
        <strong>Savings Rate:</strong> {savingsRate}%
      </p>
    </div>
  );
}

export default ReportCard;
