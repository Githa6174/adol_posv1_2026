import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const customerController = {
  // Get all customers (with search)
  getCustomers: async (req: Request, res: Response) => {
    try {
      const { search } = req.query;
      
      const filter = search ? {
        OR: [
          { name: { contains: search as string } },
          { phone: { contains: search as string } }
        ]
      } : {};

      const customers = await prisma.customer.findMany({
        where: filter,
        orderBy: { name: 'asc' }
      });
      res.json(customers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new customer
  createCustomer: async (req: Request, res: Response) => {
    try {
      const { name, phone, email, is_member } = req.body;

      const customer = await prisma.customer.create({
        data: {
          name,
          phone,
          email,
          is_member: is_member !== undefined ? is_member : false
        }
      });

      res.status(201).json(customer);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a customer
  updateCustomer: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, phone, email, is_member, points } = req.body;

      const customer = await prisma.customer.update({
        where: { id: Number(id) },
        data: { name, phone, email, is_member, points }
      });

      res.json(customer);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete a customer
  deleteCustomer: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.customer.delete({
        where: { id: Number(id) }
      });
      res.json({ message: 'Customer deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};
