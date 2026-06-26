import { Request, Response } from 'express';
import { prisma } from '../config/database';

export const printerController = {
  getPrinters: async (req: Request, res: Response) => {
    try {
      const printers = await prisma.printerSetting.findMany({ orderBy: { name: 'asc' } });
      res.json(printers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  createPrinter: async (req: Request, res: Response) => {
    try {
      const printer = await prisma.printerSetting.create({ data: req.body });
      res.status(201).json(printer);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  updatePrinter: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const printer = await prisma.printerSetting.update({
        where: { id: Number(id) },
        data: req.body
      });
      res.json(printer);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  deletePrinter: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.printerSetting.delete({ where: { id: Number(id) } });
      res.json({ message: 'Deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  testPrinter: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const printer = await prisma.printerSetting.findUnique({ where: { id: Number(id) } });
      if (!printer) return res.status(404).json({ message: 'Printer not found' });
      res.json({ message: `Test print sent to ${printer.name}`, success: true });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};
