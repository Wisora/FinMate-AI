import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create fake users
  const user1 = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice",
      transactions: {
        create: [
          { amount: 100.5, currency: "USD" },
          { amount: 250.0, currency: "EUR" },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "bob@example.com",
      name: "Bob",
      transactions: {
        create: [
          { amount: 75.0, currency: "USD" },
          { amount: 300.0, currency: "ZAR" },
        ],
      },
    },
  });

  console.log("Seeded users:", user1, user2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
