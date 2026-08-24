/**
 * @jest-environment node
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Prisma Client", () => {
  it("connects and queries users", async () => {
    const users = await prisma.user.findMany();
    expect(Array.isArray(users)).toBe(true);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
