import { ChatMessage, FinancialSummary } from '../types';

export const sendChatMessage = async (
  message: string,
  history: ChatMessage[],
  financialSummary: FinancialSummary,
  language: string,
  currency: string
): Promise<{ text: string; isFallback: boolean }> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history,
        financialSummary,
        language,
        currency,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    return {
      text: data.response || 'I am sorry, I could not complete your request at this moment.',
      isFallback: !!data.isFallback,
    };
  } catch (error) {
    console.warn('Network error calling /api/chat, using intelligent local client fallback', error);

    // Contextual local responses
    const lower = message.toLowerCase();
    const symbol = currency === 'ZAR' ? 'R' : currency === 'EUR' ? '€' : '$';

    if (lower.includes('save') || lower.includes('savings')) {
      return {
        text: `💰 **Saved Amount Update**:
According to your current profile, you saved **${symbol} ${financialSummary.netSavings.toLocaleString()}** this month!
• Your total savings goals progress stands at **${financialSummary.savingsProgress}%**.
• Tip: Consider boosting your Emergency Fund goal to reach 100%!`,
        isFallback: true,
      };
    }

    if (lower.includes('report') || lower.includes('july') || lower.includes('expense')) {
      return {
        text: `📊 **July Financial Report Summary**:
• **Income**: ${symbol} ${financialSummary.income.toLocaleString()}
• **Expenses**: ${symbol} ${financialSummary.expenses.toLocaleString()}
• **Net Surplus**: ${symbol} ${financialSummary.netSavings.toLocaleString()}
• **Debt Payoff Progress**: ${financialSummary.debtProgress}%
• **Investments**: ${symbol} ${financialSummary.investments.toLocaleString()}`,
        isFallback: true,
      };
    }

    return {
      text: `🤖 **FinMate Coach**:
Your financial health score is **${financialSummary.healthScore}/100**.
• Monthly Surplus: ${symbol} ${financialSummary.netSavings}
• Try asking: *"How can I lower my food expenses?"* or *"Generate a July expense report"*.`,
      isFallback: true,
    };
  }
};
