import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const orderService = new OrderService();

export class OrderController {
  createOrder = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.userId;
      const order = await orderService.createOrder(req.body, userId);
      res.status(201).json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  getOrders = async (req: Request, res: Response) => {
    try {
      const orders = await orderService.getOrders();
      res.json(orders);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  applyDiscount = async (req: Request, res: Response) => {
    try {
      const orderId = parseInt(req.params.id as string);
      const { discount_amount } = req.body;
      const order = await orderService.updateDiscount(orderId, discount_amount);
      res.json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  addItems = async (req: Request, res: Response) => {
    try {
      const orderId = parseInt(req.params.id as string);
      const order = await orderService.addItemsToOrder(orderId, req.body);
      res.json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  updateItemDiscount = async (req: Request, res: Response) => {
    try {
      const orderId = parseInt(req.params.id as string);
      const itemId = parseInt(req.params.itemId as string);
      const { discount_amount } = req.body;
      const order = await orderService.updateItemDiscount(orderId, itemId, discount_amount);
      res.json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  deleteOrder = async (req: Request, res: Response) => {
    try {
      const orderId = parseInt(req.params.id as string);
      const { adminPin } = req.body;
      const userRole = (req as any).user?.role;
      
      if (userRole !== 'admin') {
        if (!adminPin) {
          return res.status(403).json({ error: 'PIN Admin dibutuhkan' });
        }
        const adminUser = await prisma.user.findFirst({ where: { role: 'admin', is_active: true } });
        if (!adminUser) return res.status(403).json({ error: 'Tidak ada admin aktif' });
        
        const isValid = await bcrypt.compare(adminPin, adminUser.password);
        if (!isValid) return res.status(403).json({ error: 'PIN Admin salah' });
      }

      await orderService.deleteOrder(orderId);
      res.json({ message: 'Pesanan berhasil dibatalkan/dihapus' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  assignCustomer = async (req: Request, res: Response) => {
    try {
      const orderId = parseInt(req.params.id as string);
      const { customer_id } = req.body;
      const order = await orderService.assignCustomer(orderId, customer_id);
      res.json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
