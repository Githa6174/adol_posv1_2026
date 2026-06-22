import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const brandController = {
  getBrands: async (req: Request, res: Response) => {
    try {
      const brands = await prisma.brand.findMany({ orderBy: { name: 'asc' } });
      res.json(brands);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  createBrand: async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;
      const brand = await prisma.brand.create({ data: { name, description } });
      res.status(201).json(brand);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  updateBrand: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const brand = await prisma.brand.update({
        where: { id: Number(id) },
        data: { name, description }
      });
      res.json(brand);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteBrand: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.brand.delete({ where: { id: Number(id) } });
      res.json({ message: 'Deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};
