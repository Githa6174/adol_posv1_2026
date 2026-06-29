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

  async updateTable(id: number, data: any) {
    const updateData: any = {
      table_number: data.table_number,
      capacity: data.capacity !== undefined ? Number(data.capacity) : undefined,
      status: data.status,
      is_active: data.is_active,
      zone_id: data.zone_id !== undefined ? (data.zone_id ? Number(data.zone_id) : null) : undefined,
      x_position: data.x_position !== undefined ? Number(data.x_position) : undefined,
      y_position: data.y_position !== undefined ? Number(data.y_position) : undefined,
      width: data.width !== undefined ? Number(data.width) : undefined,
      height: data.height !== undefined ? Number(data.height) : undefined,
      shape: data.shape
    };
    return prisma.table.update({
      where: { id },
      data: updateData
    });
  }

  async deleteTable(id: number) {
    return prisma.table.delete({
      where: { id }
    });
  }
}
