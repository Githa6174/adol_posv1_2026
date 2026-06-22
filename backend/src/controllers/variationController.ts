import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const variationController = {
  getVariations: async (req: Request, res: Response) => {
    try {
      const variations = await prisma.variation.findMany({ 
        include: { options: true },
        orderBy: { name: 'asc' } 
      });
      res.json(variations);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  createVariation: async (req: Request, res: Response) => {
    try {
      const { name, options } = req.body; // options is an array of strings
      
      const variation = await prisma.variation.create({
        data: {
          name,
          options: {
            create: options.map((opt: string) => ({ name: opt }))
          }
        },
        include: { options: true }
      });
      res.status(201).json(variation);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  updateVariation: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, options } = req.body;
      
      // For simplicity, delete old options and recreate
      await prisma.variationOption.deleteMany({ where: { variation_id: Number(id) } });
      
      const variation = await prisma.variation.update({
        where: { id: Number(id) },
        data: {
          name,
          options: {
            create: options.map((opt: string) => ({ name: opt }))
          }
        },
        include: { options: true }
      });
      res.json(variation);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteVariation: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.variation.delete({ where: { id: Number(id) } });
      res.json({ message: 'Deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};
