import type { PrismaClient } from '@prisma/client';

// Create a mock Prisma client with jest.fn for each method you need
export function createMockPrismaClient(
  overrides?: Partial<PrismaClient>
): PrismaClient {
  const baseMock = {
    $connect: jest.fn().mockResolvedValue(undefined),
    $disconnect: jest.fn().mockResolvedValue(undefined),
    $queryRaw: jest.fn().mockResolvedValue([{ result: 1 }]),
    user: {
      findUnique: jest.fn().mockResolvedValue({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
      }),
      create: jest.fn().mockResolvedValue({
        id: 2,
        name: 'New User',
        email: 'new@example.com',
      }),
    },
    // add other models/methods you use in your app
  } as unknown as PrismaClient;

  return { ...baseMock, ...overrides };
}
