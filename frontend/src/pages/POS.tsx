import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { itemService } from '../services/itemService';
import { orderService } from '../services/orderService';
import { tableService } from '../services/tableService';
import { useOrderStore } from '../stores/orderStore';

export function POS() {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const { items, existingItems, addItem, removeItem, clearOrder, getSubtotal, selectedTable, activeOrderId, activeOrderNumber } = useOrderStore();
  const [submitting, setSubmitting] = useState(false);
  
  // Modal State for Item Config
  const [selectedConfigItem, setSelectedConfigItem] = useState<any>(null);
  const [editingExistingItem, setEditingExistingItem] = useState<any>(null);
  const [existingConfigDiscountAmount, setExistingConfigDiscountAmount] = useState(0);
  const [existingConfigDiscountType, setExistingConfigDiscountType] = useState<'nominal' | 'percentage'>('nominal');
  const [configQty, setConfigQty] = useState(1);
  const [configPriceLevel, setConfigPriceLevel] = useState(1);
  const [configNotes, setConfigNotes] = useState('');
  const [configDiscountAmount, setConfigDiscountAmount] = useState(0);
  const [configDiscountType, setConfigDiscountType] = useState<'nominal' | 'percentage'>('nominal');

  const navigate = useNavigate();

  useEffect(() => {
    itemService.getItems().then(setMenuItems).catch(console.error);
  }, []);

  const openItemConfig = (item: any) => {
    setSelectedConfigItem(item);
    setConfigQty(1);
    setConfigPriceLevel(1);
    setConfigNotes('');
    setConfigDiscountAmount(0);
    setConfigDiscountType('nominal');
  };

  const confirmAddItem = () => {
    if (!selectedConfigItem) return;
    addItem({
      item: selectedConfigItem,
      quantity: configQty,
      priceLevel: configPriceLevel,
      specialInstructions: configNotes,
      discountAmount: configDiscountAmount,
      discountType: configDiscountType
    });
    setSelectedConfigItem(null);
  };

  const openExistingItemConfig = (orderItem: any) => {
    setEditingExistingItem(orderItem);
    setExistingConfigDiscountAmount(orderItem.discount_amount || 0);
    setExistingConfigDiscountType('nominal');
  };

  const confirmUpdateExistingItem = () => {
    if (!editingExistingItem) return;
    const basePrice = editingExistingItem.quantity * editingExistingItem.unit_price;
    const finalDiscount = existingConfigDiscountType === 'percentage' 
      ? (basePrice * existingConfigDiscountAmount) / 100 
      : existingConfigDiscountAmount;
      
    const newSubtotal = basePrice - finalDiscount;
    useOrderStore.getState().updateExistingItemDiscount(editingExistingItem.id, finalDiscount, newSubtotal);
    
    setEditingExistingItem(null);
  };

  const handleSendToKitchen = async () => {
    const modifiedExisting = existingItems.filter(i => i.isModified);
    if (items.length === 0 && modifiedExisting.length === 0) return;
    
    setSubmitting(true);
    try {
      const orderData = {
        order_type: selectedTable ? 'dine-in' : 'retail',
        table_id: selectedTable?.id || null,
        pax: selectedTable?.pax || 1,
        items: items.map(i => {
          const basePrice = i.item[`price_level_${i.priceLevel}`] || i.item.price_level_1;
          const discount = i.discountType === 'percentage' ? (basePrice * i.discountAmount) / 100 : i.discountAmount;
          return {
            item_id: i.item.id,
            quantity: i.quantity,
            unit_price: basePrice,
            price_level: i.priceLevel,
            discount_amount: discount,
            special_instructions: i.specialInstructions
          };
        }),
        updated_items: modifiedExisting.map(i => ({
          id: i.id,
          discount_amount: i.discount_amount
        }))
      };
      
      if (activeOrderId) {
        await orderService.addItemsToOrder(activeOrderId, { items: orderData.items, updated_items: orderData.updated_items });
        alert('Perubahan berhasil disimpan!');
      } else {
        await orderService.createOrder(orderData);
        if (selectedTable?.id) {
          await tableService.updateStatus(selectedTable.id, 'occupied');
        }
        alert('Pesanan baru berhasil dikirim ke Dapur!');
      }
      
      clearOrder();
      navigate('/tables'); // Go back to table map
    } catch (error: any) {
      alert('Gagal mengirim pesanan: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-full overflow-hidden bg-background">
      {/* Left Area: Menu Items */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header & Filters */}
        <div className="p-8 pb-4 bg-background border-b border-[var(--color-border)] z-10 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-text-main flex items-center gap-2">
              <span className="material-icons text-brand-500">add_shopping_cart</span> New Order
            </h2>
            {selectedTable && (
              <div className="flex items-center gap-3 text-sm">
                {activeOrderNumber && (
                  <div className="bg-yellow-100 text-yellow-800 border border-yellow-200 px-4 py-1.5 rounded-lg font-bold flex items-center gap-2">
                    <span className="material-icons text-base">receipt</span> {activeOrderNumber}
                  </div>
                )}
                <div className="bg-brand-50 text-brand-700 border border-brand-200 px-4 py-1.5 rounded-lg font-bold flex items-center gap-2">
                  <span className="material-icons text-base">table_restaurant</span> {selectedTable.table_number} <span className="text-brand-300 mx-1">|</span> {selectedTable.pax} Pax
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">search</span>
              <input 
                type="text" 
                placeholder="Search products by name, SKU or barcode..." 
                className="w-full bg-surface border border-[var(--color-border)] rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all shadow-sm"
              />
              <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-brand-500 cursor-pointer">qr_code_scanner</span>
            </div>
            
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 flex-1">
              {['All Items', 'Coffee', 'Tea', 'Pastries', 'Meals', 'Snacks'].map((cat, i) => (
                <button key={i} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-colors border ${i === 0 ? 'bg-brand-600 text-white border-brand-600' : 'bg-surface text-text-muted border-[var(--color-border)] hover:bg-surface-dark hover:text-text-main'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => openItemConfig(item)}
                className="glass-card bg-surface p-4 flex flex-col items-start h-48 focus:outline-none group text-left relative overflow-hidden"
              >
                <div className="w-full h-24 bg-surface-dark rounded-xl mb-3 flex items-center justify-center text-text-muted/30 border border-[var(--color-border)]">
                  <span className="material-icons text-4xl">image</span>
                </div>
                <div className="font-bold text-text-main text-sm line-clamp-2 mb-1 group-hover:text-brand-600 transition-colors w-full">{item.name}</div>
                <div className="text-text-main font-bold text-base mt-auto">
                  Rp {item.price_level_1?.toLocaleString('id-ID') || 0}
                </div>
                <div className="absolute bottom-4 right-4 w-8 h-8 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  <span className="material-icons text-sm">add</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Area: Order Cart */}
      <div className="w-[420px] bg-surface flex flex-col z-20 border-l border-[var(--color-border)] shadow-xl">
        <div className="p-6 bg-surface border-b border-[var(--color-border)] flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
            <span className="material-icons text-brand-500">shopping_cart</span> 
            {activeOrderId ? 'Menu Tambahan' : 'Current Order'}
          </h2>
          <div className="flex items-center gap-2">
             <button className="text-text-muted hover:text-brand-600 transition-colors p-1"><span className="material-icons text-xl">person_add</span></button>
             <button className="text-text-muted hover:text-red-500 transition-colors p-1" onClick={clearOrder}><span className="material-icons text-xl">delete_sweep</span></button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-background/50">
          {existingItems.length > 0 && (
            <div className="mb-4">
              <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 px-2">Sudah Dipesan (Dapur)</div>
              <div className="space-y-3 opacity-80">
                {existingItems.map((orderItem, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => openExistingItemConfig(orderItem)}
                    className="w-full text-left flex justify-between items-start bg-surface hover:bg-surface-dark hover:border-brand-500 transition-colors p-3 rounded-xl border border-[var(--color-border)] shadow-sm group cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="font-bold text-text-main text-sm flex items-center gap-2 group-hover:text-brand-600">
                                        <span className="material-icons text-sm text-text-muted">lock</span> {orderItem.item.name}
                      </div>
                      <div className="text-xs text-text-muted font-medium flex items-center gap-2 mt-1.5">
                        <span className="bg-surface-dark px-1.5 py-0.5 rounded border border-[var(--color-border)] font-semibold">{orderItem.quantity}x</span>
                        <span>@ Rp {orderItem.unit_price?.toLocaleString('id-ID')}</span>
                      </div>
                      {orderItem.discount_amount > 0 && (
                        <div className="text-xs text-red-500 mt-1.5 font-medium flex items-center gap-1"><span className="material-icons text-[10px]">sell</span> Diskon: -Rp {orderItem.discount_amount.toLocaleString('id-ID')}</div>
                      )}
                    </div>
                    <div className="flex flex-col items-end h-full ml-3 justify-between">
                      <div className="font-bold text-text-main text-sm">
                        Rp {orderItem.subtotal?.toLocaleString('id-ID')}
                      </div>
                      <div className="text-[10px] font-semibold text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity mt-1">Edit Diskon</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {items.length === 0 && existingItems.length === 0 ? (
            <div className="text-center flex flex-col items-center justify-center h-full text-text-muted opacity-50 pt-10">
              <span className="material-icons text-6xl mb-4 text-text-muted/30">shopping_basket</span>
              <p className="font-medium text-sm">Cart is empty</p>
              <p className="text-xs mt-1">Select items from the catalog</p>
            </div>
          ) : (
            <div className="space-y-3">
              {existingItems.length > 0 && items.length > 0 && (
                <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-2 px-2 mt-6 border-t border-[var(--color-border)] pt-4">Tambahan Baru</div>
              )}
              {items.map((orderItem, idx) => {
                const basePrice = orderItem.item[`price_level_${orderItem.priceLevel}`] || orderItem.item.price_level_1;
                const discount = orderItem.discountType === 'percentage' ? (basePrice * orderItem.discountAmount) / 100 : orderItem.discountAmount;
                return (
                  <div key={idx} className="flex justify-between items-start bg-surface p-3 rounded-xl border border-[var(--color-border)] shadow-sm hover:border-brand-500 transition-colors group">
                    <div className="flex-1">
                      <div className="font-bold text-text-main text-sm">{orderItem.item.name}</div>
                      <div className="text-xs text-text-muted font-medium flex items-center gap-2 mt-1.5">
                        <span className="bg-surface-dark px-1.5 py-0.5 rounded border border-[var(--color-border)] font-semibold text-text-main">{orderItem.quantity}x</span>
                        <span>@ Rp {basePrice.toLocaleString('id-ID')}</span>
                        <span className="text-[10px] bg-surface-dark border border-[var(--color-border)] px-1 rounded">(Lvl {orderItem.priceLevel})</span>
                      </div>
                      {discount > 0 && (
                        <div className="text-xs text-red-500 mt-1.5 font-medium">
                           <span className="material-icons text-[10px] align-middle mr-1">sell</span>{orderItem.discountType === 'percentage' ? `${orderItem.discountAmount}%` : `Rp ${orderItem.discountAmount.toLocaleString('id-ID')}`} (-Rp {discount.toLocaleString('id-ID')})
                        </div>
                      )}
                      {orderItem.specialInstructions && (
                        <div className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-medium bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 flex gap-1 items-start">
                          <span className="material-icons text-sm">sticky_note_2</span> {orderItem.specialInstructions}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-3 justify-between h-full ml-3">
                      <div className="font-bold text-text-main text-sm">
                        Rp {((basePrice - discount) * orderItem.quantity).toLocaleString('id-ID')}
                      </div>
                      <button 
                        onClick={() => removeItem(orderItem.item.id)}
                        className="text-red-500 hover:text-white hover:bg-red-500 w-6 h-6 flex items-center justify-center rounded-md transition-all opacity-0 group-hover:opacity-100 bg-red-500/10"
                        title="Remove Item"
                      >
                         <span className="material-icons text-sm">close</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-6 bg-surface border-t border-[var(--color-border)]">
          <div className="flex justify-between items-center mb-4 text-text-muted">
            <span className="text-sm">Subtotal</span>
            <span className="font-bold text-text-main">Rp {getSubtotal().toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm">Tax (0%)</span>
            <span className="font-bold text-text-main">Rp 0</span>
          </div>
          <div className="flex justify-between items-end mb-6 border-t border-[var(--color-border)] pt-4">
            <span className="text-base font-bold text-text-main">Grand Total</span>
            <span className="text-3xl font-black text-brand-600 tracking-tight">
              Rp {getSubtotal().toLocaleString('id-ID')}
            </span>
          </div>
          <button 
            onClick={handleSendToKitchen}
            disabled={(items.length === 0 && existingItems.filter(i => i.isModified).length === 0) || submitting}
            className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <span className="material-icons text-xl">soup_kitchen</span> 
            {submitting ? 'Processing...' : 
             (activeOrderId 
                ? (items.length > 0 ? 'Send to Kitchen' : 'Update Discount') 
                : 'Send to Kitchen')}
          </button>
        </div>
      </div>

      {/* Item Config Modal */}
      {selectedConfigItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-3xl w-full max-w-md transform transition-all border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 pb-4">
              <h2 className="text-3xl font-black mb-2 text-text-main">{selectedConfigItem.name}</h2>
              <p className="text-text-muted text-sm">{selectedConfigItem.description}</p>
            </div>
            
            <div className="p-8 pt-4 space-y-6 overflow-y-auto custom-scrollbar">
              <div className="bg-surface-dark/40 p-5 rounded-2xl border border-border">
                <label className="block text-text-muted font-medium mb-3 text-sm">Jumlah Porsi</label>
                <div className="flex items-center gap-4 bg-background p-2 rounded-xl border border-border">
                  <button onClick={() => setConfigQty(Math.max(1, configQty - 1))} className="flex-1 bg-surface hover:bg-surface-dark py-3 rounded-lg font-bold text-xl transition-colors text-text-main">-</button>
                  <span className="text-2xl font-black w-16 text-center text-text-main">{configQty}</span>
                  <button onClick={() => setConfigQty(configQty + 1)} className="flex-1 bg-surface hover:bg-surface-dark py-3 rounded-lg font-bold text-xl transition-colors text-text-main">+</button>
                </div>
              </div>
              
              <div className="bg-surface-dark/40 p-5 rounded-2xl border border-border">
                <label className="block text-text-muted font-medium mb-3 text-sm">Level Harga</label>
                <select 
                  value={configPriceLevel}
                  onChange={(e) => setConfigPriceLevel(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-text-main font-medium appearance-none"
                >
                  <option value={1} className="bg-surface text-text-main">Level 1 - Rp {selectedConfigItem.price_level_1?.toLocaleString('id-ID')}</option>
                  <option value={2} className="bg-surface text-text-main">Level 2 - Rp {selectedConfigItem.price_level_2?.toLocaleString('id-ID')}</option>
                  <option value={3} className="bg-surface text-text-main">Level 3 - Rp {selectedConfigItem.price_level_3?.toLocaleString('id-ID')}</option>
                  <option value={4} className="bg-surface text-text-main">Level 4 - Rp {selectedConfigItem.price_level_4?.toLocaleString('id-ID')}</option>
                  <option value={5} className="bg-surface text-text-main">Level 5 - Rp {selectedConfigItem.price_level_5?.toLocaleString('id-ID')}</option>
                </select>
              </div>

              <div className="bg-surface-dark/40 p-5 rounded-2xl border border-border">
                <label className="block text-text-muted font-medium mb-3 text-sm">Diskon per Item (Opsional)</label>
                <div className="flex items-center gap-2">
                  <select 
                    value={configDiscountType}
                    onChange={(e) => setConfigDiscountType(e.target.value as any)}
                    className="bg-background border border-border rounded-xl px-3 py-3 focus:outline-none focus:border-brand-500 text-text-main font-bold"
                  >
                    <option value="nominal" className="bg-surface text-text-main">Rp</option>
                    <option value="percentage" className="bg-surface text-text-main">%</option>
                  </select>
                  <input
                    type="number"
                    value={configDiscountAmount}
                    onChange={(e) => setConfigDiscountAmount(Number(e.target.value))}
                    min="0"
                    placeholder="Nilai diskon"
                    className="flex-1 px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-brand-500 text-text-main font-bold"
                  />
                </div>
              </div>

              <div className="bg-surface-dark/40 p-5 rounded-2xl border border-border">
                <label className="block text-text-muted font-medium mb-3 text-sm">Instruksi Khusus (Notes)</label>
                <textarea
                  value={configNotes}
                  onChange={(e) => setConfigNotes(e.target.value)}
                  placeholder="Contoh: Jangan pakai pedas, tambah es..."
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 h-28 resize-none text-text-main placeholder-text-muted/40"
                />
              </div>
            </div>

            <div className="p-6 border-t border-border bg-surface-dark/20 flex gap-4">
              <button 
                onClick={() => setSelectedConfigItem(null)}
                className="flex-1 btn-secondary py-4"
              >
                Batal
              </button>
              <button 
                onClick={confirmAddItem}
                className="flex-1 btn-primary py-4"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Item Config Modal (Compliment) */}
      {editingExistingItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-all p-4">
          <div className="bg-surface rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-border">
            <div className="p-6 pb-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider">
                <span className="material-icons text-sm">lock</span> Existing Kitchen Item
              </div>
              <button onClick={() => setEditingExistingItem(null)} className="text-text-muted hover:text-red-500"><span className="material-icons">close</span></button>
            </div>
            <div className="px-6 py-2 bg-surface-dark border-b border-border">
              <h2 className="text-xl font-bold text-text-main">{editingExistingItem.item.name}</h2>
              <div className="flex items-center gap-3 text-sm text-text-muted mt-1">
                <span className="font-semibold">{editingExistingItem.quantity}x</span>
                <span>@ Rp {editingExistingItem.unit_price?.toLocaleString('id-ID')}</span>
              </div>
            </div>
            
            <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
              <div className="bg-surface-dark/40 p-5 rounded-2xl border border-border">
                <label className="block text-text-muted font-medium mb-3 text-sm">Diskon / Compliment</label>
                <div className="flex items-center gap-2">
                  <select 
                    value={existingConfigDiscountType}
                    onChange={(e) => setExistingConfigDiscountType(e.target.value as any)}
                    className="bg-background border border-border rounded-xl px-3 py-3 focus:outline-none focus:border-brand-500 text-text-main font-bold"
                  >
                    <option value="nominal" className="bg-surface text-text-main">Rp</option>
                    <option value="percentage" className="bg-surface text-text-main">%</option>
                  </select>
                  <input
                    type="number"
                    value={existingConfigDiscountAmount}
                    onChange={(e) => setExistingConfigDiscountAmount(Number(e.target.value))}
                    min="0"
                    placeholder="Nilai diskon"
                    className="flex-1 px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-brand-500 text-text-main font-bold"
                  />
                </div>
                <div className="mt-4 p-3 bg-brand-500/10 border border-brand-500/20 rounded-lg text-brand-600 dark:text-brand-300 text-xs flex items-start gap-2">
                  <span className="material-icons text-sm">info</span>
                  <p>Applying a discount here immediately updates the database and recalculates the grand total.</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border bg-surface-dark/20 flex gap-4">
              <button 
                onClick={() => setEditingExistingItem(null)}
                className="flex-1 btn-secondary py-4"
              >
                Batal
              </button>
              <button 
                onClick={confirmUpdateExistingItem}
                className="flex-1 btn-primary py-4"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
