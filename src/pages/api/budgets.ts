import { PrismaClient, Budget } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Budget[] | Budget | { message: string }>
) {
  try {
    if (req.method === 'GET') {
      const budgets = await prisma.budget.findMany({ include: { user: true } });
      return res.status(200).json(budgets);
    }

    if (req.method === 'POST') {
      const { userId, limit, period } = req.body;
      const budget = await prisma.budget.create({
        data: { userId, limit, period },
      });
      return res.status(201).json(budget);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
