import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const modifierController = {
  getModifierGroups: async (req: Request, res: Response) => {
    try {
      const groups = await prisma.modifierGroup.findMany({
        include: { options: true },
        orderBy: { name: 'asc' }
      });
      res.json(groups);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  createModifierGroup: async (req: Request, res: Response) => {
    try {
      const { name, options, is_required, allow_multiple, max_select, print_on_receipt } = req.body;

      const group = await prisma.modifierGroup.create({
        data: {
          name,
          is_required: is_required || false,
          allow_multiple: allow_multiple || false,
          max_select: max_select || 1,
          print_on_receipt: print_on_receipt !== undefined ? print_on_receipt : true,
          options: {
            create: (options || []).map((opt: any) => ({
              name: typeof opt === 'string' ? opt : opt.name,
              price: typeof opt === 'string' ? 0 : (opt.price || 0)
            }))
          }
        },
        include: { options: true }
      });
      res.status(201).json(group);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  updateModifierGroup: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, options, is_required, allow_multiple, max_select, print_on_receipt } = req.body;

      await prisma.modifierOption.deleteMany({ where: { modifier_group_id: Number(id) } });

      const group = await prisma.modifierGroup.update({
        where: { id: Number(id) },
        data: {
          name,
          is_required: is_required || false,
          allow_multiple: allow_multiple || false,
          max_select: max_select || 1,
          print_on_receipt: print_on_receipt !== undefined ? print_on_receipt : true,
          updated_at: new Date(),
          options: {
            create: (options || []).map((opt: any) => ({
              name: typeof opt === 'string' ? opt : opt.name,
              price: typeof opt === 'string' ? 0 : (opt.price || 0)
            }))
          }
        },
        include: { options: true }
      });
      res.json(group);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteModifierGroup: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.modifierGroup.delete({ where: { id: Number(id) } });
      res.json({ message: 'Deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};
