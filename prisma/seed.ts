import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed a test user
  const user = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin User",
      role: "ADMIN"
    }
  });

  // Seed a goal linked to the user
  await prisma.goal.create({
    data: {
      title: "Save for Emergency Fund",
      targetAmount: 5000,
      currentAmount: 500,
      userId: user.id
    }
  });

  // Seed a report linked to the user
  await prisma.report.create({
    data: {
      title: "Weekly Budget Report",
      content: "This is a sample report for testing.",
      userId: user.id
    }
  });

  // Seed a subscription linked to the user
  await prisma.subscription.create({
    data: {
      plan: "PRO",
      status: "ACTIVE",
      userId: user.id
    }
  });
}

main()
  .then(() => {
    console.log("✅ Database seeding complete");
  })
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
