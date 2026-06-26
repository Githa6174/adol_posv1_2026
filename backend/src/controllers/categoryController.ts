import { Request, Response } from 'express';
import { prisma } from '../config/database';

export const categoryController = {
  getCategories: async (req: Request, res: Response) => {
    try {
      const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
        include: { _count: { select: { items: true } } }
      });
      res.json(categories);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  createCategory: async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;
      const category = await prisma.category.create({ data: { name, description } });
      res.status(201).json(category);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  updateCategory: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const category = await prisma.category.update({
        where: { id: Number(id) },
        data: { name, description }
      });
      res.json(category);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteCategory: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const count = await prisma.item.count({ where: { category_id: Number(id) } });
      if (count > 0) {
        return res.status(400).json({ message: 'Kategori masih digunakan oleh item' });
      }
      await prisma.category.delete({ where: { id: Number(id) } });
      res.json({ message: 'Deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};
