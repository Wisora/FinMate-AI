import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const goals = await prisma.goal.findMany();
      return res.status(200).json(goals);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch transaction data' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, targetAmount, userId, category } = req.body;
      const newGoal = await prisma.goal.create({
        data: {
          title: title || 'New Transaction Item',
          targetAmount: parseFloat(targetAmount) || 0,
          category: category || 'savings',
          userId,
        },
      });
      return res.status(201).json(newGoal);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to record transaction' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}