import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const expenseController = {
  // Get all expenses (with optional date filter)
  getExpenses: async (req: Request, res: Response) => {
    try {
      const { startDate, endDate } = req.query;
      
      let dateFilter = {};
      if (startDate && endDate) {
        const start = new Date(startDate as string);
        start.setHours(0, 0, 0, 0);
        
        const end = new Date(endDate as string);
        end.setHours(23, 59, 59, 999);
        
        dateFilter = {
          expense_date: {
            gte: start,
            lte: end
          }
        };
      }

      const expenses = await prisma.expense.findMany({
        where: dateFilter,
        include: {
          category: true,
          creator: { select: { id: true, name: true, role: true } }
        },
        orderBy: {
          expense_date: 'desc'
        }
      });
      res.json(expenses);
    } catch (error: any) {
      console.error('Error fetching expenses:', error);
      res.status(500).json({ message: error.message });
    }
  },

  // Get all expense categories
  getCategories: async (req: Request, res: Response) => {
    try {
      const categories = await prisma.expenseCategory.findMany({
        orderBy: { name: 'asc' }
      });
      res.json(categories);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create an expense category
  createCategory: async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;
      const category = await prisma.expenseCategory.create({
        data: { name, description }
      });
      res.status(201).json(category);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create an expense
  createExpense: async (req: Request, res: Response) => {
    try {
      const { expense_category_id, amount, description, reference_number, expense_date } = req.body;
      
      const expense = await prisma.expense.create({
        data: {
          expense_category_id: expense_category_id ? Number(expense_category_id) : null,
          amount: Number(amount),
          description,
          reference_number,
          expense_date: expense_date ? new Date(expense_date) : new Date(),
          created_by: (req as any).user?.id
        },
        include: {
          category: true
        }
      });
      res.status(201).json(expense);
    } catch (error: any) {
      console.error('Error creating expense:', error);
      res.status(500).json({ message: error.message });
    }
  },

  // Delete an expense
  deleteExpense: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.expense.delete({
        where: { id: Number(id) }
      });
      res.json({ message: 'Expense deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};
