import { Request, Response } from 'express';
import { prisma } from '../config/database';

export const departmentController = {
  getDepartments: async (req: Request, res: Response) => {
    try {
      const departments = await prisma.department.findMany({
        orderBy: { name: 'asc' },
        include: { _count: { select: { items: true } } }
      });
      res.json(departments);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  createDepartment: async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;
      const department = await prisma.department.create({ data: { name, description } });
      res.status(201).json(department);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  updateDepartment: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const department = await prisma.department.update({
        where: { id: Number(id) },
        data: { name, description }
      });
      res.json(department);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteDepartment: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const count = await prisma.item.count({ where: { department_id: Number(id) } });
      if (count > 0) {
        return res.status(400).json({ message: 'Department masih digunakan oleh item' });
      }
      await prisma.department.delete({ where: { id: Number(id) } });
      res.json({ message: 'Deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};
