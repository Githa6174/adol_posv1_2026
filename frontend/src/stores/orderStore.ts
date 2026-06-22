import { create } from 'zustand';

export interface OrderItem {
  item: any;
  quantity: number;
  priceLevel: number;
  specialInstructions: string;
  discountAmount: number;
  discountType: 'percentage' | 'nominal';
}

interface OrderState {
  selectedTable: any | null;
  activeOrderId: number | null;
  activeOrderNumber: string | null;
  items: OrderItem[];
  existingItems: any[]; // Items already in the database
  setSelectedTable: (table: any) => void;
  setActiveOrder: (orderId: number | null, orderNumber: string | null, existingItems?: any[]) => void;
  updateExistingItemDiscount: (itemId: number, newDiscountAmount: number, newSubtotal: number) => void;
  addItem: (payload: { item: any; quantity: number; priceLevel: number; specialInstructions?: string; discountAmount?: number; discountType?: 'percentage' | 'nominal' }) => void;
  removeItem: (itemId: number) => void;
  clearOrder: () => void;
  getSubtotal: () => number;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  selectedTable: null,
  activeOrderId: null,
  activeOrderNumber: null,
  items: [],
  existingItems: [],
  setSelectedTable: (table) => set({ selectedTable: table }),
  setActiveOrder: (orderId, orderNumber, existingItems = []) => set({ activeOrderId: orderId, activeOrderNumber: orderNumber, existingItems }),
  updateExistingItemDiscount: (itemId, newDiscountAmount, newSubtotal) => set((state) => ({
    existingItems: state.existingItems.map(item => 
      item.id === itemId 
        ? { ...item, discount_amount: newDiscountAmount, subtotal: newSubtotal, isModified: true } 
        : item
    )
  })),
  addItem: ({ item, quantity, priceLevel, specialInstructions, discountAmount = 0, discountType = 'nominal' }) => {
    set((state) => {
      const existingItemIndex = state.items.findIndex(i => i.item.id === item.id && i.discountAmount === discountAmount);
      if (existingItemIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += quantity;
        return { items: newItems };
      }
      return { items: [...state.items, { item, quantity, priceLevel, specialInstructions: specialInstructions || '', discountAmount, discountType }] };
    });
  },
  removeItem: (itemId) => {
    set((state) => ({ items: state.items.filter(i => i.item.id !== itemId) }));
  },
  clearOrder: () => set({ items: [], existingItems: [], selectedTable: null, activeOrderId: null, activeOrderNumber: null }),
  getSubtotal: () => {
    const existingTotal = get().existingItems.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    const newItemsTotal = get().items.reduce((total, i) => {
      const basePrice = i.item[`price_level_${i.priceLevel}`] || i.item.price_level_1;
      let itemDiscount = i.discountAmount;
      if (i.discountType === 'percentage') {
        itemDiscount = (basePrice * i.discountAmount) / 100;
      }
      return total + ((basePrice - itemDiscount) * i.quantity);
    }, 0);
    return existingTotal + newItemsTotal;
  }
}));
