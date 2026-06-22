import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const userController = {
  // Get all users
  getUsers: async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          name: true,
          email: true,
          role: true,
          is_active: true,
          created_at: true,
          updated_at: true
        },
        orderBy: { created_at: 'desc' }
      });
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new user
  createUser: async (req: Request, res: Response) => {
    try {
      const { username, password, name, email, role } = req.body;

      // Check if username already exists
      const existingUser = await prisma.user.findUnique({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          name,
          email,
          role: role || 'cashier',
          is_active: true
        },
        select: { id: true, username: true, name: true, role: true }
      });

      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a user (excluding password)
  updateUser: async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const { name, email, role, is_active } = req.body;

      const user = await prisma.user.update({
        where: { id },
        data: { name, email, role, is_active },
        select: { id: true, username: true, name: true, role: true, is_active: true }
      });

      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Reset user password
  resetPassword: async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const { newPassword } = req.body;

      if (!newPassword) {
        return res.status(400).json({ message: 'New password is required' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: { id },
        data: { password: hashedPassword }
      });

      res.json({ message: 'Password reset successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete/Deactivate user
  deleteUser: async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      // Soft delete by deactivating instead of hard delete to preserve foreign key constraints (like orders)
      await prisma.user.update({
        where: { id },
        data: { is_active: false }
      });
      res.json({ message: 'User deactivated successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};
