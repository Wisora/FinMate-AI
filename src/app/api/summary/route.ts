import { NextResponse } from 'next/server';

// Correct App Router Route Handler signatures
export async function GET(request: Request) {
  try {
    // Replace with your database fetch logic (e.g., prisma.summary.findUnique(...))
    const summaryData = {
      income: 6200,
      expenses: 3700,
      netSavings: 2500,
      healthScore: 88,
      savingsProgress: 72,
    };

    return NextResponse.json(summaryData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch financial summary data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Process summary updates here...
    
    return NextResponse.json(
      { message: 'Summary updated successfully', data: body },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update summary' },
      { status: 500 }
    );
  }
}