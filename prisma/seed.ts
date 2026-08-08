import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed a test user
  await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: 'securepassword123', // matches schema
    },
  });

  // Add more seed data here if needed
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
