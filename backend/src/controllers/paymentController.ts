import { Request, Response } from 'express';
import { PaymentService } from '../services/paymentService';

const paymentService = new PaymentService();

export class PaymentController {
  getPaymentMethods = async (req: Request, res: Response) => {
    res.json(await paymentService.getPaymentMethods());
  }

  getOrderByTable = async (req: Request, res: Response) => {
    const order = await paymentService.getOrderByTable(Number(req.params.tableId));
    if (!order) {
      return res.status(404).json({ error: 'Order not found for this table' });
    }
    res.json(order);
  }

  processPayment = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.userId;
      const payment = await paymentService.processPayment(Number(req.params.orderId), req.body, userId);
      res.json(payment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
