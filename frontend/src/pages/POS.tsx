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
  const [savingExisting, setSavingExisting] = useState(false);
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
    <div className="flex h-full overflow-hidden bg-transparent">
      {/* Left Area: Menu Items */}
      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-white">Daftar Menu</h2>
          {selectedTable && (
            <div className="flex gap-2">
              {activeOrderNumber && (
                <div className="glass px-6 py-2 rounded-full font-bold text-yellow-400 border-yellow-500/30">
                  Tagihan: {activeOrderNumber}
                </div>
              )}
              <div className="glass px-6 py-2 rounded-full font-bold text-brand-300 border-brand-500/30">
                Meja: {selectedTable.table_number} <span className="text-white/30 mx-2">|</span> Pax: {selectedTable.pax}
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => openItemConfig(item)}
              className="glass-card p-6 flex flex-col items-center justify-center h-40 focus:outline-none group hover:border-brand-500/50 hover:shadow-brand-500/20"
            >
              <div className="font-bold text-text-main text-center mb-3 text-lg group-hover:text-brand-300 transition-colors">{item.name}</div>
              <div className="text-brand-400 font-black text-xl bg-brand-500/10 px-4 py-1 rounded-full">
                Rp {item.price_level_1?.toLocaleString('id-ID') || 0}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Area: Order Cart */}
      <div className="w-[400px] glass flex flex-col z-10 border-l border-white/5 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-6 bg-surface/50 border-b border-white/5">
          <h2 className="text-xl font-bold tracking-wider text-white">
            {activeOrderId ? 'Menu Tambahan' : 'Order Saat Ini'}
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {existingItems.length > 0 && (
            <div className="mb-4">
              <div className="text-xs font-bold text-brand-300 uppercase tracking-wider mb-3 px-2">Sudah Dipesan (Dapur)</div>
              <div className="space-y-3 opacity-70">
                {existingItems.map((orderItem, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => openExistingItemConfig(orderItem)}
                    className="w-full text-left flex justify-between items-start bg-surface-dark/30 hover:bg-surface-dark/60 hover:border-brand-500/50 transition-colors p-3 rounded-xl border border-white/5 group cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="font-bold text-white text-md flex items-center gap-2 group-hover:text-brand-300">
                                        <span className="material-icons text-base">lock</span> {orderItem.item.name}
                      </div>
                      <div className="text-xs text-brand-300 font-medium flex items-center gap-2 mt-1">
                        <span className="bg-brand-500/20 px-2 py-0.5 rounded">{orderItem.quantity}x</span>
                        <span>@ Rp {orderItem.unit_price?.toLocaleString('id-ID')}</span>
                      </div>
                      {orderItem.discount_amount > 0 && (
                        <div className="text-xs text-red-400 mt-1">Diskon: -Rp {orderItem.discount_amount.toLocaleString('id-ID')}</div>
                      )}
                    </div>
                    <div className="flex flex-col items-end h-full ml-3 justify-between">
                      <div className="font-bold text-white text-md">
                        Rp {orderItem.subtotal?.toLocaleString('id-ID')}
                      </div>
                      <div className="text-[10px] text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity mt-1">Edit Diskon</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {items.length === 0 && existingItems.length === 0 ? (
            <div className="text-center flex flex-col items-center justify-center h-full text-text-muted opacity-50 pt-10">
              <span className="material-icons text-6xl mb-4 text-text-muted">shopping_cart</span>
              <p className="font-medium text-lg">Pilih menu di sebelah kiri</p>
            </div>
          ) : (
            <div className="space-y-3">
              {existingItems.length > 0 && items.length > 0 && (
                <div className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-2 px-2 mt-6 border-t border-white/10 pt-4">Tambahan Baru</div>
              )}
              {items.map((orderItem, idx) => {
                const basePrice = orderItem.item[`price_level_${orderItem.priceLevel}`] || orderItem.item.price_level_1;
                const discount = orderItem.discountType === 'percentage' ? (basePrice * orderItem.discountAmount) / 100 : orderItem.discountAmount;
                return (
                  <div key={idx} className="flex justify-between items-start bg-surface-dark/80 p-4 rounded-2xl border border-white/10 hover:border-brand-500/50 transition-colors group">
                    <div className="flex-1">
                      <div className="font-bold text-white text-lg">{orderItem.item.name}</div>
                      <div className="text-sm text-brand-300 font-medium flex items-center gap-2 mt-1">
                        <span className="bg-brand-500/20 px-2 py-0.5 rounded text-brand-200">{orderItem.quantity}x</span>
                        <span>@ Rp {basePrice.toLocaleString('id-ID')}</span>
                        <span className="text-text-muted text-xs bg-surface px-1.5 rounded">(Lvl {orderItem.priceLevel})</span>
                      </div>
                      {discount > 0 && (
                        <div className="text-xs text-red-400 mt-1">
                          Diskon per item: {orderItem.discountType === 'percentage' ? `${orderItem.discountAmount}%` : `Rp ${orderItem.discountAmount.toLocaleString('id-ID')}`} (-Rp {discount.toLocaleString('id-ID')})
                        </div>
                      )}
                      {orderItem.specialInstructions && (
                        <div className="text-xs text-yellow-400 mt-2 italic bg-yellow-400/10 p-2 rounded-lg border border-yellow-400/20">
                          <span className="material-icons text-sm align-middle mr-1">sticky_note_2</span> {orderItem.specialInstructions}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-3 justify-between h-full ml-3">
                      <div className="font-black text-white text-lg">
                        Rp {((basePrice - discount) * orderItem.quantity).toLocaleString('id-ID')}
                      </div>
                      <button 
                        onClick={() => removeItem(orderItem.item.id)}
                        className="text-red-400 hover:text-white hover:bg-red-500 px-3 py-1 rounded-lg text-xs font-bold transition-all border border-red-500/30 opacity-0 group-hover:opacity-100"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-6 bg-surface-dark/80 border-t border-white/5 backdrop-blur-xl">
          <div className="flex justify-between items-end mb-6">
            <span className="text-text-muted font-medium uppercase tracking-wider text-sm">Subtotal</span>
            <span className="text-3xl font-black text-brand-400 leading-none">Rp {getSubtotal().toLocaleString('id-ID')}</span>
          </div>
          <button
            onClick={handleSendToKitchen}
            disabled={(items.length === 0 && existingItems.filter(i => i.isModified).length === 0) || submitting}
            className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            <span className="material-icons text-2xl">soup_kitchen</span> 
            {submitting ? 'Menyimpan...' : 
             (activeOrderId 
                ? (items.length > 0 ? 'Simpan & Kirim ke Dapur' : 'Simpan Perubahan Diskon') 
                : 'Kirim Pesanan Baru'
             )}
          </button>
        </div>
      </div>

      {/* Item Config Modal */}
      {selectedConfigItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass rounded-3xl w-full max-w-md transform transition-all border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 pb-4">
              <h2 className="text-3xl font-black mb-2 text-white">{selectedConfigItem.name}</h2>
              <p className="text-brand-200 text-sm">{selectedConfigItem.description}</p>
            </div>
            
            <div className="p-8 pt-4 space-y-6 overflow-y-auto custom-scrollbar">
              <div className="bg-surface/30 p-5 rounded-2xl border border-white/5">
                <label className="block text-brand-200 font-medium mb-3 text-sm">Jumlah Porsi</label>
                <div className="flex items-center gap-4 bg-surface-dark p-2 rounded-xl border border-white/5">
                  <button onClick={() => setConfigQty(Math.max(1, configQty - 1))} className="flex-1 bg-surface hover:bg-white/10 py-3 rounded-lg font-bold text-xl transition-colors text-white">-</button>
                  <span className="text-2xl font-black w-16 text-center text-white">{configQty}</span>
                  <button onClick={() => setConfigQty(configQty + 1)} className="flex-1 bg-surface hover:bg-white/10 py-3 rounded-lg font-bold text-xl transition-colors text-white">+</button>
                </div>
              </div>
              
              <div className="bg-surface/30 p-5 rounded-2xl border border-white/5">
                <label className="block text-brand-200 font-medium mb-3 text-sm">Level Harga</label>
                <select 
                  value={configPriceLevel}
                  onChange={(e) => setConfigPriceLevel(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-white font-medium appearance-none"
                >
                  <option value={1}>Level 1 - Rp {selectedConfigItem.price_level_1?.toLocaleString('id-ID')}</option>
                  <option value={2}>Level 2 - Rp {selectedConfigItem.price_level_2?.toLocaleString('id-ID')}</option>
                  <option value={3}>Level 3 - Rp {selectedConfigItem.price_level_3?.toLocaleString('id-ID')}</option>
                  <option value={4}>Level 4 - Rp {selectedConfigItem.price_level_4?.toLocaleString('id-ID')}</option>
                  <option value={5}>Level 5 - Rp {selectedConfigItem.price_level_5?.toLocaleString('id-ID')}</option>
                </select>
              </div>

              <div className="bg-surface/30 p-5 rounded-2xl border border-white/5">
                <label className="block text-brand-200 font-medium mb-3 text-sm">Diskon per Item (Opsional)</label>
                <div className="flex items-center gap-2">
                  <select 
                    value={configDiscountType}
                    onChange={(e) => setConfigDiscountType(e.target.value as any)}
                    className="bg-surface-dark border border-white/10 rounded-xl px-3 py-3 focus:outline-none focus:border-brand-500 text-white font-bold"
                  >
                    <option value="nominal">Rp</option>
                    <option value="percentage">%</option>
                  </select>
                  <input
                    type="number"
                    value={configDiscountAmount}
                    onChange={(e) => setConfigDiscountAmount(Number(e.target.value))}
                    min="0"
                    placeholder="Nilai diskon"
                    className="flex-1 px-4 py-3 bg-surface-dark border border-white/10 rounded-xl focus:outline-none focus:border-brand-500 text-white font-bold"
                  />
                </div>
              </div>

              <div className="bg-surface/30 p-5 rounded-2xl border border-white/5">
                <label className="block text-brand-200 font-medium mb-3 text-sm">Instruksi Khusus (Notes)</label>
                <textarea
                  value={configNotes}
                  onChange={(e) => setConfigNotes(e.target.value)}
                  placeholder="Contoh: Jangan pakai pedas, tambah es..."
                  className="w-full px-4 py-3 bg-surface-dark border border-white/10 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 h-28 resize-none text-white placeholder-white/30"
                />
              </div>
            </div>

            <div className="p-6 border-t border-white/10 bg-surface/50 flex gap-4">
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass rounded-3xl w-full max-w-md transform transition-all border border-brand-500/30 shadow-2xl shadow-brand-500/20 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 pb-4 border-b border-white/10 bg-surface/30">
              <div className="flex items-center gap-3 text-brand-300 font-bold text-sm tracking-widest uppercase mb-2">
                                <span className="material-icons text-base">lock</span> Menu Dapur
              </div>
              <h2 className="text-3xl font-black mb-2 text-white">{editingExistingItem.item.name}</h2>
              <div className="flex items-center gap-3 text-sm text-text-muted">
                <span className="bg-white/10 px-3 py-1 rounded-full font-bold">{editingExistingItem.quantity} Porsi</span>
                <span>@ Rp {editingExistingItem.unit_price?.toLocaleString('id-ID')}</span>
              </div>
            </div>
            
            <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
              <div className="bg-surface/30 p-5 rounded-2xl border border-white/5">
                <label className="block text-brand-200 font-medium mb-3 text-sm">Diskon / Compliment</label>
                <div className="flex items-center gap-2">
                  <select 
                    value={existingConfigDiscountType}
                    onChange={(e) => setExistingConfigDiscountType(e.target.value as any)}
                    className="bg-surface-dark border border-white/10 rounded-xl px-3 py-3 focus:outline-none focus:border-brand-500 text-white font-bold"
                  >
                    <option value="nominal">Rp</option>
                    <option value="percentage">%</option>
                  </select>
                  <input
                    type="number"
                    value={existingConfigDiscountAmount}
                    onChange={(e) => setExistingConfigDiscountAmount(Number(e.target.value))}
                    min="0"
                    placeholder="Nilai diskon"
                    className="flex-1 px-4 py-3 bg-surface-dark border border-white/10 rounded-xl focus:outline-none focus:border-brand-500 text-white font-bold"
                  />
                </div>
                <div className="mt-4 p-3 bg-brand-500/10 border border-brand-500/20 rounded-xl text-brand-200 text-xs flex items-start gap-2">
                  <span className="material-icons text-lg">info</span>
                  <p>Menerapkan diskon pada item ini akan secara otomatis memperbarui database dan menghitung ulang Grand Total tagihan secara seketika.</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 bg-surface/50 flex gap-4">
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
