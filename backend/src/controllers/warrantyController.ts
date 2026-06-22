import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const warrantyController = {
  getWarranties: async (req: Request, res: Response) => {
    try {
      const warranties = await prisma.warranty.findMany({ orderBy: { name: 'asc' } });
      res.json(warranties);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  createWarranty: async (req: Request, res: Response) => {
    try {
      const { name, description, duration, duration_type } = req.body;
      const warranty = await prisma.warranty.create({ 
        data: { name, description, duration: Number(duration), duration_type } 
      });
      res.status(201).json(warranty);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  updateWarranty: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, description, duration, duration_type } = req.body;
      const warranty = await prisma.warranty.update({
        where: { id: Number(id) },
        data: { name, description, duration: Number(duration), duration_type }
      });
      res.json(warranty);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteWarranty: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.warranty.delete({ where: { id: Number(id) } });
      res.json({ message: 'Deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};
