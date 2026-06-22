import { prisma } from '../config/database';

export class PaymentService {
  async getPaymentMethods() {
    return prisma.paymentMethod.findMany({ where: { is_active: true } });
  }

  async getOrderByTable(tableId: number) {
    return prisma.order.findFirst({
      where: { table_id: tableId, status: 'pending' },
      include: { 
        order_items: { include: { item: true } },
        payments: true
      },
      orderBy: { created_at: 'desc' }
    });
  }

  async processPayment(orderId: number, data: any, userId: string) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new Error('Order not found');

    const payment = await prisma.payment.create({
      data: {
        order_id: orderId,
        payment_method_id: data.payment_method_id,
        amount: data.amount,
        reference_number: data.reference_number,
        processed_by: userId,
        status: 'completed'
      }
    });

    const allPayments = await prisma.payment.findMany({ where: { order_id: orderId } });
    const totalPaid = allPayments.reduce((sum, p) => sum + (p.amount || 0), 0);

    // If fully paid, close order and release table
    if (totalPaid >= (order.grand_total || 0)) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'paid', closed_at: new Date() }
      });

      if (order.customer_id) {
        const earnedPoints = Math.floor((order.grand_total || 0) / 10000);
        await prisma.customer.update({
          where: { id: order.customer_id },
          data: { points: { increment: earnedPoints } }
        });
      }

      if (order.table_id) {
        await prisma.table.update({
          where: { id: order.table_id },
          data: { status: 'available' }
        });
      }
    }

    return payment;
  }
}
