import { prisma } from '../config/database';

export class KitchenService {
  async getPendingItems() {
    return prisma.orderItem.findMany({
      where: {
        status: { in: ['pending', 'cooking'] }
      },
      include: {
        item: true,
        order: {
          include: { table: true }
        },
        modifiers: true
      },
      orderBy: { created_at: 'asc' }
    });
  }

  async updateItemStatus(id: number, status: string) {
    return prisma.orderItem.update({
      where: { id },
      data: { status }
    });
  }
}
