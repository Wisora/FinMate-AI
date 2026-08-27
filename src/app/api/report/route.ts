import { NextResponse } from 'next/server';

/**
 * GET Handler: Returns calculated financial report metrics & breakdowns
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || 'July 2026';

    const reportData = {
      timeframe,
      summary: {
        income: 6200,
        expenses: 3700,
        netSavings: 2500,
        healthScore: 88,
        savingsProgress: 72,
      },
      categories: [
        { category: 'Housing & Rent', amount: 1600, percentage: 43, color: '#3b82f6' },
        { category: 'Groceries & Dining', amount: 850, percentage: 23, color: '#10b981' },
        { category: 'Transportation', amount: 450, percentage: 12, color: '#f59e0b' },
        { category: 'Utilities & Subscriptions', amount: 500, percentage: 14, color: '#ec4899' },
        { category: 'Entertainment & Leisure', amount: 300, percentage: 8, color: '#8b5cf6' },
      ],
    };

    return NextResponse.json(reportData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate financial reports data' },
      { status: 500 }
    );
  }
}

/**
 * POST Handler: Triggers custom AI report synthesis or report saves
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { timeframe = 'July 2026', language = 'en', currency = 'USD' } = body;

    const synthesizedReport = {
      success: true,
      timeframe,
      reportText: `📊 AI Executive Financial Summary (${timeframe}) [${currency}]\n\n` +
        `• Cashflow Analysis: Strong overall net surplus. Income exceeded total expenses by ~40%.\n` +
        `• Top Expense Drivers: Housing & Rent accounts for the largest share of outflows.\n` +
        `• Savings Velocity: On track to hit your annual emergency fund target.\n` +
        `• Recommendations: Consider redirecting $250 of unallocated monthly surplus into low-cost index funds.`,
    };

    return NextResponse.json(synthesizedReport, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process report synthesis request' },
      { status: 500 }
    );
  }
}