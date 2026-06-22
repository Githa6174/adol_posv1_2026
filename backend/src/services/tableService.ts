import { prisma } from '../config/database';

export class TableService {
  async getZones() {
    return prisma.tableZone.findMany({
      include: {
        tables: true
      }
    });
  }

  async createZone(data: any) {
    return prisma.tableZone.create({ data });
  }

  async getTables() {
    return prisma.table.findMany({
      include: { zone: true }
    });
  }

  async createTable(data: any) {
    return prisma.table.create({ data });
  }

  async updateTableStatus(id: number, status: string) {
    return prisma.table.update({
      where: { id },
      data: { status }
    });
  }
}
