import { prisma } from '../config/database';

export class OrderService {
  async createOrder(data: any, userId: string) {
    const orderNumber = `ORD-${Date.now()}`;
    
    let subtotal = 0;
    
    const orderItemsData = data.items.map((item: any) => {
      const modifierTotal = (item.modifiers || []).reduce((sum: number, m: any) => sum + (m.price || 0), 0);
      const basePrice = item.quantity * (item.unit_price + modifierTotal);
      const itemDiscount = item.discount_amount || 0;
      const itemSubtotal = basePrice - itemDiscount;
      
      subtotal += itemSubtotal;
      
      const itemTax = itemSubtotal * 0.10;
      const itemService = itemSubtotal * 0.05;

      return {
        itemData: {
          item_id: item.item_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          discount_amount: itemDiscount,
          subtotal: itemSubtotal,
          tax_amount: itemTax,
          service_amount: itemService,
          total: itemSubtotal + itemTax + itemService,
          special_instructions: item.special_instructions
        },
        modifiers: item.modifiers || []
      };
    });

    const taxAmount = subtotal * 0.10;
    const serviceAmount = subtotal * 0.05;
    const discountAmount = data.discount_amount || 0;
    const grandTotal = subtotal + taxAmount + serviceAmount - discountAmount;

    const order = await prisma.order.create({
      data: {
        order_number: orderNumber,
        table_id: data.table_id || null,
        customer_name: data.customer_name || '',
        order_type: data.order_type || 'dine-in',
        status: 'pending',
        subtotal,
        tax_amount: taxAmount,
        service_amount: serviceAmount,
        discount_amount: discountAmount,
        grand_total: grandTotal,
        total_items: data.items.reduce((acc: number, item: any) => acc + item.quantity, 0),
        created_by: userId,
        order_items: {
          create: orderItemsData.map((d: any) => d.itemData)
        }
      },
      include: {
        order_items: true
      }
    });

    for (let i = 0; i < order.order_items.length; i++) {
      const mods = orderItemsData[i].modifiers;
      if (mods.length > 0) {
        await prisma.orderItemModifier.createMany({
          data: mods.map((m: any) => ({
            order_item_id: order.order_items[i].id,
            modifier_option_id: m.modifier_option_id,
            name: m.name,
            price: m.price || 0,
            print_on_receipt: m.print_on_receipt !== undefined ? m.print_on_receipt : true
          }))
        });
      }
    }

    return prisma.order.findUnique({
      where: { id: order.id },
      include: {
        order_items: {
          include: { modifiers: true }
        }
      }
    });
  }

  async getOrders() {
    return prisma.order.findMany({
      include: {
        order_items: {
          include: {
            item: true,
            modifiers: true
          }
        },
        table: true
      },
      orderBy: { created_at: 'desc' }
    });
  }

  async updateDiscount(orderId: number, discountAmount: number) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new Error('Order not found');

    const newGrandTotal = (order.subtotal || 0) + (order.tax_amount || 0) + (order.service_amount || 0) - discountAmount;
    
    return prisma.order.update({
      where: { id: orderId },
      data: {
        discount_amount: discountAmount,
        grand_total: newGrandTotal > 0 ? newGrandTotal : 0
      }
    });
  }

  async addItemsToOrder(orderId: number, data: { items?: any[], updated_items?: any[] }) {
    const order = await prisma.order.findUnique({ 
      where: { id: orderId },
      include: { 
        order_items: {
          include: { modifiers: true }
        }
      }
    });
    if (!order) throw new Error('Order not found');

    const items = data.items || [];
    const updatedItems = data.updated_items || [];

    // Process updated items (existing items)
    for (const update of updatedItems) {
      const existingItem = order.order_items.find(i => i.id === update.id);
      if (existingItem) {
        const modifierTotal = (existingItem.modifiers || []).reduce((sum: number, m: any) => sum + (m.price || 0), 0);
        const basePrice = existingItem.quantity * ((existingItem.unit_price || 0) + modifierTotal);
        const itemDiscount = update.discount_amount || 0;
        const itemSubtotal = basePrice - itemDiscount;
        const itemTax = itemSubtotal * 0.10;
        const itemService = itemSubtotal * 0.05;

        await prisma.orderItem.update({
          where: { id: update.id },
          data: {
            discount_amount: itemDiscount,
            subtotal: itemSubtotal,
            tax_amount: itemTax,
            service_amount: itemService,
            total: itemSubtotal + itemTax + itemService
          }
        });
      }
    }

    const newItemsData = items.map((item: any) => {
      const modifierTotal = (item.modifiers || []).reduce((sum: number, m: any) => sum + (m.price || 0), 0);
      const basePrice = item.quantity * (item.unit_price + modifierTotal);
      const itemDiscount = item.discount_amount || 0;
      const itemSubtotal = basePrice - itemDiscount;
      
      const itemTax = itemSubtotal * 0.10;
      const itemService = itemSubtotal * 0.05;

      return {
        itemData: {
          item_id: item.item_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          discount_amount: itemDiscount,
          subtotal: itemSubtotal,
          tax_amount: itemTax,
          service_amount: itemService,
          total: itemSubtotal + itemTax + itemService,
          special_instructions: item.special_instructions
        },
        modifiers: item.modifiers || []
      };
    });

    if (newItemsData.length > 0) {
      const createdItems = [];
      for (const d of newItemsData) {
        const created = await prisma.orderItem.create({
          data: { order_id: orderId, ...d.itemData }
        });
        createdItems.push({ id: created.id, modifiers: d.modifiers });
      }
      for (const ci of createdItems) {
        if (ci.modifiers.length > 0) {
          await prisma.orderItemModifier.createMany({
            data: ci.modifiers.map((m: any) => ({
              order_item_id: ci.id,
              modifier_option_id: m.modifier_option_id,
              name: m.name,
              price: m.price || 0,
              print_on_receipt: m.print_on_receipt !== undefined ? m.print_on_receipt : true
            }))
          });
        }
      }
    }

    // Recalculate everything for the order
    const updatedOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { order_items: true }
    });

    let newSubtotal = 0;
    let newTax = 0;
    let newService = 0;
    let totalItems = 0;

    updatedOrder?.order_items.forEach((item: any) => {
      newSubtotal += item.subtotal || 0;
      newTax += item.tax_amount || 0;
      newService += item.service_amount || 0;
      totalItems += item.quantity || 0;
    });

    const newGrandTotal = newSubtotal + newTax + newService - (updatedOrder?.discount_amount || 0);

    return prisma.order.update({
      where: { id: orderId },
      data: {
        subtotal: newSubtotal,
        tax_amount: newTax,
        service_amount: newService,
        grand_total: newGrandTotal > 0 ? newGrandTotal : 0,
        total_items: totalItems
      },
      include: {
        order_items: true
      }
    });
  }

  async updateItemDiscount(orderId: number, itemId: number, discountAmount: number) {
    const orderItem = await prisma.orderItem.findFirst({
      where: { id: itemId, order_id: orderId },
      include: { modifiers: true }
    });
    if (!orderItem) throw new Error('Order Item not found');

    const modifierTotal = (orderItem.modifiers || []).reduce((sum: number, m: any) => sum + (m.price || 0), 0);
    const basePrice = orderItem.quantity * ((orderItem.unit_price || 0) + modifierTotal);
    const itemSubtotal = basePrice - discountAmount;
    const itemTax = itemSubtotal * 0.10;
    const itemService = itemSubtotal * 0.05;

    await prisma.orderItem.update({
      where: { id: itemId },
      data: {
        discount_amount: discountAmount,
        subtotal: itemSubtotal,
        tax_amount: itemTax,
        service_amount: itemService,
        total: itemSubtotal + itemTax + itemService
      }
    });

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { order_items: true }
    });

    if (!order) throw new Error('Order not found');

    let newSubtotal = 0;
    let newTax = 0;
    let newService = 0;

    order.order_items.forEach((item: any) => {
      newSubtotal += item.subtotal || 0;
      newTax += item.tax_amount || 0;
      newService += item.service_amount || 0;
    });

    const newGrandTotal = newSubtotal + newTax + newService - (order.discount_amount || 0);

    return prisma.order.update({
      where: { id: orderId },
      data: {
        subtotal: newSubtotal,
        tax_amount: newTax,
        service_amount: newService,
        grand_total: newGrandTotal > 0 ? newGrandTotal : 0
      },
      include: {
        order_items: {
          include: { item: true }
        }
      }
    });
  }

  async deleteOrder(orderId: number) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (order?.table_id) {
      await prisma.table.update({ where: { id: order.table_id }, data: { status: 'available' } });
    }
    return prisma.order.delete({ where: { id: orderId } });
  }

  async assignCustomer(orderId: number, customerId: number) {
    return prisma.order.update({
      where: { id: orderId },
      data: { customer_id: customerId }
    });
  }
}
