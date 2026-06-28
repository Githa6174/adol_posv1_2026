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

  async updateDepartment(id: number, data: { name: string; description?: string }) {
    return prisma.department.update({ where: { id }, data });
  }

  async deleteDepartment(id: number) {
    return prisma.department.delete({ where: { id } });
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
        },
        modifier_groups: {
          include: {
            modifier_group: {
              include: { options: true }
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
        },
        modifier_groups: {
          include: {
            modifier_group: {
              include: { options: true }
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
    
    const { variations, modifier_group_ids, ...itemData } = data;

    const item = await prisma.item.create({ data: itemData });

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

    if (modifier_group_ids && modifier_group_ids.length > 0) {
      await prisma.itemModifierGroup.createMany({
        data: modifier_group_ids.map((gId: number) => ({
          item_id: item.id,
          modifier_group_id: gId
        }))
      });
    }

    return item;
  }

  async updateItem(id: number, data: any) {
    const { variations, modifier_group_ids, ...itemData } = data;
    
    await prisma.item.update({
      where: { id },
      data: itemData
    });

    if (variations) {
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

    if (modifier_group_ids !== undefined) {
      await prisma.itemModifierGroup.deleteMany({ where: { item_id: id } });
      if (modifier_group_ids.length > 0) {
        await prisma.itemModifierGroup.createMany({
          data: modifier_group_ids.map((gId: number) => ({
            item_id: id,
            modifier_group_id: gId
          }))
        });
      }
    }
    
    return prisma.item.findUnique({ where: { id } });
  }

  async deleteItem(id: number) {
    return prisma.item.delete({ where: { id } });
  }
}
