// reportsService.js
// Handles financial report generation for FinMate AI

let reports = [
  {
    id: 1,
    type: "Weekly",
    income: 12000,
    expenses: 8500,
    savings: 3500,
    date: "2026-07-25"
  },
  {
    id: 2,
    type: "Monthly",
    income: 48000,
    expenses: 36000,
    savings: 12000,
    date: "2026-07-31"
  }
];

// Fetch all reports
export function getReports() {
  return reports;
}

// Generate a weekly report dynamically
export async function generateWeeklyReport(income, expenses) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newReport = {
        id: reports.length + 1,
        type: "Weekly",
        income,
        expenses,
        savings: income - expenses,
        date: new Date().toISOString().split("T")[0]
      };
      reports.push(newReport);
      resolve(newReport);
    }, 500); // simulate API delay
  });
}

// Generate a monthly report dynamically
export async function generateMonthlyReport(income, expenses) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newReport = {
        id: reports.length + 1,
        type: "Monthly",
        income,
        expenses,
        savings: income - expenses,
        date: new Date().toISOString().split("T")[0]
      };
      reports.push(newReport);
      resolve(newReport);
    }, 500);
  });
}
