export function getAssistantResponse(query) {
  const q = query.toLowerCase();

  if (q.includes("save")) {
    return "Based on your spending, you could save an extra R500/month by reducing dining expenses.";
  }
  if (q.includes("report")) {
    return "Your July expenses were R8,500 compared to R12,000 income. Savings rate: 29%.";
  }
  if (q.includes("goal")) {
    return "You currently have 3 active goals. Try adding progress to your Emergency Fund.";
  }
  return "I'm here to help with your finances. Try asking about savings, reports, or goals!";
}
