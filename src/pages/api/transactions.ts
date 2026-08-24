import { PrismaClient, Transaction } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Transaction[] | Transaction | { message: string }>
) {
  try {
    if (req.method === 'GET') {
      const transactions = await prisma.transaction.findMany({
        include: { user: true, category: true },
      });
      return res.status(200).json(transactions);
    }

    if (req.method === 'POST') {
      const { amount, userId, categoryId } = req.body;
      const transaction = await prisma.transaction.create({
        data: { amount, userId, categoryId },
      });
      return res.status(201).json(transaction);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
