import { prisma } from '../config/database';

export class ItemService {
  async getCategories() {
    return prisma.category.findMany();
  }

  async createCategory(data: { name: string; description?: string }) {
    return prisma.category.create({ data });
  }

  async updateCategory(id: number, data: { name: string; description?: string }) {
    return prisma.category.update({ where: { id }, data });
  }

  async deleteCategory(id: number) {
    return prisma.category.delete({ where: { id } });
  }

  async getDepartments() {
    return prisma.department.findMany();
  }

  async createDepartment(data: { name: string; description?: string }) {
    return prisma.department.create({ data });
  }

  async getItems() {
    return prisma.item.findMany({
      include: {
        category: true,
        department: true,
        brand: true,
        unit: true,
        warranty: true,
        variations: {
          include: {
            variation_option: {
              include: { variation: true }
            }
          }
        }
      }
    });
  }

  async getItemById(id: number) {
    return prisma.item.findUnique({
      where: { id },
      include: {
        category: true,
        department: true,
        brand: true,
        unit: true,
        warranty: true,
        variations: {
          include: {
            variation_option: {
              include: { variation: true }
            }
          }
        }
      }
    });
  }

  async createItem(data: any) {
    if (!data.code) {
      data.code = `ITM-${Date.now()}`;
    }
    if (!data.sku) {
      data.sku = data.code;
    }
    
    // Extract variations
    const { variations, ...itemData } = data;

    const item = await prisma.item.create({ data: itemData });

    // Handle variations if variable
    if (item.type === 'variable' && variations && variations.length > 0) {
      await prisma.itemVariation.createMany({
        data: variations.map((v: any) => ({
          item_id: item.id,
          variation_option_id: v.variation_option_id,
          sku: v.sku || `${item.sku}-${v.variation_option_id}`,
          sell_price_inc_tax: v.sell_price_inc_tax,
          stock: v.stock || 0
        }))
      });
    }

    return item;
  }

  async updateItem(id: number, data: any) {
    const { variations, ...itemData } = data;
    
    await prisma.item.update({
      where: { id },
      data: itemData
    });

    if (variations) {
      // Very basic approach: delete old, create new
      await prisma.itemVariation.deleteMany({ where: { item_id: id } });
      await prisma.itemVariation.createMany({
        data: variations.map((v: any) => ({
          item_id: id,
          variation_option_id: v.variation_option_id,
          sku: v.sku,
          sell_price_inc_tax: v.sell_price_inc_tax,
          stock: v.stock || 0
        }))
      });
    }
    
    return prisma.item.findUnique({ where: { id } });
  }

  async deleteItem(id: number) {
    return prisma.item.delete({ where: { id } });
  }
}
