import { useEffect, useState } from 'react';
import { kitchenService } from '../services/kitchenService';

export function KitchenMonitor() {
  const [pendingItems, setPendingItems] = useState<any[]>([]);

  const loadItems = async () => {
    try {
      const items = await kitchenService.getPendingItems();
      setPendingItems(items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadItems();
    // Polling setiap 5 detik (Sebagai pengganti websocket di MVP)
    const interval = setInterval(loadItems, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkReady = async (id: number) => {
    try {
      await kitchenService.updateStatus(id, 'ready');
      loadItems(); // refresh list
    } catch (error) {
      alert('Gagal mengupdate status pesanan.');
    }
  };

  return (
    <div className="h-full bg-background text-text-main p-8 overflow-y-auto w-full relative">
      <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6 relative z-10">
        <h1 className="text-5xl font-extrabold tracking-tight text-orange-500 flex items-center gap-4"><span className="material-icons text-5xl">soup_kitchen</span> KITCHEN DISPLAY</h1>
        <div className="text-3xl font-mono glass px-6 py-3 rounded-2xl text-green-400 font-bold border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
          {new Date().toLocaleTimeString('id-ID')}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
        {pendingItems.map((orderItem) => (
          <div key={orderItem.id} className="glass-card overflow-hidden flex flex-col group">
            <div className="bg-brand-600/30 p-5 flex justify-between items-center border-b border-brand-500/20 backdrop-blur-md">
              <div>
                <div className="font-bold text-xl text-white tracking-wide">ORDER #{orderItem.order?.order_number?.split('-')[1]}</div>
                <div className="text-sm font-black text-brand-300 mt-1">
                  {orderItem.order?.table ? `MEJA ${orderItem.order.table.table_number}` : 'TAKEAWAY / RETAIL'}
                </div>
              </div>
              <div className="text-sm bg-black/50 px-4 py-2 rounded-xl font-mono font-bold border border-white/10 shadow-inner">
                {new Date(orderItem.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col bg-surface/30">
              <div className="flex items-start justify-between mb-6 flex-1">
                <div className="text-3xl font-bold leading-tight text-white">
                  <span className="text-brand-400 mr-4 text-4xl">{orderItem.quantity}x</span> 
                  {orderItem.item?.name}
                </div>
              </div>
              
              {orderItem.special_instructions && (
                <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-5 mb-8 rounded-r-xl shadow-inner">
                  <div className="text-xs text-yellow-500/80 font-black uppercase tracking-widest mb-2">Catatan Khusus:</div>
                  <div className="text-xl text-yellow-100 font-medium italic">"{orderItem.special_instructions}"</div>
                </div>
              )}
              
              <button 
                onClick={() => handleMarkReady(orderItem.id)}
                className="w-full bg-green-500 hover:bg-green-400 text-white font-black py-5 rounded-2xl text-xl transition-all mt-auto shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:-translate-y-1"
              >
                <span className="material-icons text-xl align-middle mr-2">check_circle</span> SELESAI (READY)
              </button>
            </div>
          </div>
        ))}
        {pendingItems.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center mt-32 opacity-50">
            <span className="material-icons text-8xl mb-6 text-text-muted">restaurant</span>
            <div className="text-4xl font-light text-text-muted tracking-wide">
              Dapur Bersih. Tidak ada pesanan.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
