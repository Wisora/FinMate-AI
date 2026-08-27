import { PrismaClient, GoalCategory, Priority, PlanType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Clean existing records
  await prisma.subscription.deleteMany();
  await prisma.report.deleteMany();
  await prisma.goal.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create primary demo user
  const demoUser = await prisma.user.create({
    data: {
      email: 'alex.johnson@example.com',
      name: 'Alex Johnson',
      role: 'user',
      persona: 'Young Professional',
      monthlyIncome: 5000,
      monthlyExpensesBudget: 3200,
      plan: PlanType.pro,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
  });

  console.log(`👤 Created User: ${demoUser.email} (ID: ${demoUser.id})`);

  // 3. Seed financial goals
  const goal1 = await prisma.goal.create({
    data: {
      title: 'Emergency Savings Fund',
      category: GoalCategory.savings,
      targetAmount: 5000,
      currentAmount: 3200,
      targetDate: new Date('2026-12-31'),
      priority: Priority.high,
      isCompleted: false,
      notes: 'Aiming for 3 months of basic living expenses.',
      userId: demoUser.id,
    },
  });

  const goal2 = await prisma.goal.create({
    data: {
      title: 'Pay Off High-Interest Credit Card',
      category: GoalCategory.debt,
      targetAmount: 2000,
      currentAmount: 1400,
      targetDate: new Date('2026-10-15'),
      priority: Priority.high,
      isCompleted: false,
      userId: demoUser.id,
    },
  });

  console.log(`🎯 Seeded ${2} financial goals.`);

  // 4. Seed monthly financial report
  await prisma.report.create({
    data: {
      timeframe: 'August 2026',
      totalIncome: 5000,
      totalExpenses: 3100,
      netSavings: 1900,
      aiSummary: 'Great progress this month! Expenses remained well under budget.',
      userId: demoUser.id,
    },
  });

  console.log(`📊 Seeded initial report data.`);

  // 5. Seed user subscription details
  await prisma.subscription.create({
    data: {
      plan: PlanType.pro,
      status: 'ACTIVE',
      payfastToken: 'pf_sub_token_mock_123',
      userId: demoUser.id,
    },
  });

  console.log('✅ Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });