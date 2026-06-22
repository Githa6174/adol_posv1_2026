import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const unitController = {
  getUnits: async (req: Request, res: Response) => {
    try {
      const units = await prisma.unit.findMany({ orderBy: { name: 'asc' } });
      res.json(units);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  createUnit: async (req: Request, res: Response) => {
    try {
      const { name, short_name, allow_decimal } = req.body;
      const unit = await prisma.unit.create({
        data: { name, short_name, allow_decimal: allow_decimal || false }
      });
      res.status(201).json(unit);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  updateUnit: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, short_name, allow_decimal } = req.body;
      const unit = await prisma.unit.update({
        where: { id: Number(id) },
        data: { name, short_name, allow_decimal }
      });
      res.json(unit);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteUnit: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.unit.delete({ where: { id: Number(id) } });
      res.json({ message: 'Deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};
