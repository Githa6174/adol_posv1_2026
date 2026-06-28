import { Request, Response } from 'express';
import { prisma } from '../config/database';

export const reportController = {
  getDashboardSummary: async (req: Request, res: Response) => {
    try {
      const { startDate, endDate } = req.query;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let start = new Date(today);
      let end = new Date(today);
      end.setHours(23, 59, 59, 999);

      if (startDate && endDate) {
        const [sYear, sMonth, sDay] = (startDate as string).split('-').map(Number);
        start = new Date(sYear, sMonth - 1, sDay, 0, 0, 0, 0);
        
        const [eYear, eMonth, eDay] = (endDate as string).split('-').map(Number);
        end = new Date(eYear, eMonth - 1, eDay, 23, 59, 59, 999);
      }

      // 1. Period Sales
      const periodOrders = await prisma.order.findMany({
        where: {
          created_at: { gte: start, lte: end },
          status: 'paid'
        }
      });
      const periodSales = periodOrders.reduce((sum, order) => sum + (order.grand_total || 0), 0);
      const periodOrderCount = periodOrders.length;

      // 2. Period Expenses
      const periodExpenses = await prisma.expense.findMany({
        where: {
          expense_date: { gte: start, lte: end }
        }
      });
      const totalExpense = periodExpenses.reduce((sum, exp) => sum + exp.amount, 0);

      // 3. Net Profit
      const netSales = periodSales - totalExpense;

      // 4. Best Sellers (for Period)
      const bestSellersRaw = await prisma.orderItem.groupBy({
        by: ['item_id'],
        _sum: {
          quantity: true,
          subtotal: true
        },
        where: {
          order: {
            created_at: { gte: start, lte: end },
            status: 'paid'
          }
        },
        orderBy: {
          _sum: {
            quantity: 'desc'
          }
        },
        take: 5
      });

      const bestSellers = await Promise.all(bestSellersRaw.map(async (bs) => {
        const item = await prisma.item.findUnique({ where: { id: bs.item_id as number } });
        return {
          name: item?.name || 'Unknown',
          quantity: bs._sum.quantity || 0,
          revenue: bs._sum.subtotal || 0
        };
      }));

      // 5. Sales Trend (group by day)
      const startOfDayStart = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const startOfDayEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate());
      const diffTime = Math.abs(startOfDayEnd.getTime() - startOfDayStart.getTime());
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
      
      const trendOrders = await prisma.order.findMany({
        where: {
          created_at: { gte: start, lte: end },
          status: 'paid'
        },
        select: { created_at: true, grand_total: true }
      });

      const salesTrend = [];
      for (let i = 0; i <= diffDays && i < 31; i++) {
        const d = new Date(start);
        d.setDate(d.getDate() + i);
        const dayString = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
        
        const daySales = trendOrders
          .filter(o => 
            o.created_at.getDate() === d.getDate() && 
            o.created_at.getMonth() === d.getMonth() &&
            o.created_at.getFullYear() === d.getFullYear()
          )
          .reduce((sum, o) => sum + (o.grand_total || 0), 0);
          
        salesTrend.push({
          name: dayString,
          total: daySales
        });
      }

      // 6. Active Tables Count
      const activeTablesCount = await prisma.table.count({
        where: { status: 'occupied' }
      });

      // 7. Payment Methods Breakdown (for Period)
      const periodPayments = await prisma.payment.findMany({
        where: {
          created_at: { gte: start, lte: end }
        },
        include: {
          method: true
        }
      });
      
      const paymentBreakdownMap: Record<string, number> = {};
      periodPayments.forEach(p => {
        const methodName = p.method?.name || 'Lainnya';
        if (!paymentBreakdownMap[methodName]) paymentBreakdownMap[methodName] = 0;
        paymentBreakdownMap[methodName] += (p.amount || 0);
      });

      const paymentBreakdown = Object.keys(paymentBreakdownMap).map(key => ({
        name: key,
        amount: paymentBreakdownMap[key]
      }));

      res.json({
        totalSales: periodSales,
        totalOrderCount: periodOrderCount,
        totalExpense,
        netSales,
        bestSellers,
        salesTrend,
        activeTablesCount,
        paymentBreakdown,
        dateRange: { start, end }
      });
    } catch (error: any) {
      console.error('Error fetching dashboard summary:', error);
      res.status(500).json({ message: error.message });
    }
  }
};
