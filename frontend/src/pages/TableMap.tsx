import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tableService } from '../services/tableService';
import { paymentService } from '../services/paymentService';
import { useOrderStore } from '../stores/orderStore';
import { useAuthStore } from '../stores/authStore';

const API_URL = 'http://localhost:3001/api';

export function TableMap() {
  const [tables, setTables] = useState<any[]>([]);
  const [showPaxModal, setShowPaxModal] = useState(false);
  const [selectedTableLocal, setSelectedTableLocal] = useState<any>(null);
  const [pax, setPax] = useState(1);
  
  // Table Action Modal
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedOccupiedTable, setSelectedOccupiedTable] = useState<any>(null);
  const [selectedOccupiedOrder, setSelectedOccupiedOrder] = useState<any>(null);
  
  // Payment State
  const [billingOrder, setBillingOrder] = useState<any>(null);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [selectedMethodId, setSelectedMethodId] = useState<number>(0);
  const [cashAmount, setCashAmount] = useState<number>(0);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [processing, setProcessing] = useState(false);
  const [printedOrder, setPrintedOrder] = useState<any>(null);
  
  // Discount State
  const [discountInput, setDiscountInput] = useState<string>('');
  const [discountType, setDiscountType] = useState<'nominal' | 'percentage'>('nominal');
  const [applyingDiscount, setApplyingDiscount] = useState(false);

  // Auth & Admin Pin
  const { user, token } = useAuthStore();
  const [showPinModal, setShowPinModal] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  
  // Customer State
  const [customers, setCustomers] = useState<any[]>([]);
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const navigate = useNavigate();
  const { setSelectedTable, setActiveOrder } = useOrderStore();

  const loadTables = () => {
    tableService.getTables().then(setTables).catch(console.error);
  };

  useEffect(() => {
    loadTables();
  }, []);

  const handleTableClick = async (table: any) => {
    if (table.status === 'occupied') {
      try {
        const order = await paymentService.getOrderByTable(table.id);
        setSelectedOccupiedTable(table);
        setSelectedOccupiedOrder(order);
        setShowActionModal(true);
      } catch (err) {
        alert('Gagal mengambil data tagihan meja ini.');
      }
      return;
    }
    
    setSelectedTableLocal(table);
    setPax(1);
    setShowPaxModal(true);
  };

  const confirmTable = () => {
    setSelectedTable({ ...selectedTableLocal, pax });
    setActiveOrder(null, null); // New order
    navigate('/pos');
  };

  const handleActionAddOrder = () => {
    setSelectedTable(selectedOccupiedTable);
    setActiveOrder(selectedOccupiedOrder.id, selectedOccupiedOrder.order_number, selectedOccupiedOrder.order_items || []);
    navigate('/pos');
  };

  const handleActionPay = async () => {
    setShowActionModal(false);
    const order = selectedOccupiedOrder;
    setBillingOrder(order);
    setDiscountInput(order.discount_amount?.toString() || '0');
    
    // Fetch customer if already attached
    if (order.customer_id) {
      try {
        const res = await fetch(`${API_URL}/customers?search=`, { headers: { Authorization: `Bearer ${token}` } });
        const allCust = await res.json();
        const found = allCust.find((c: any) => c.id === order.customer_id);
        if (found) setSelectedCustomer(found);
      } catch (err) {}
    } else {
      setSelectedCustomer(null);
    }
    
    try {
      const methods = await paymentService.getMethods();
      setPaymentMethods(methods);
      if (methods.length > 0) setSelectedMethodId(methods[0].id);
      
      const totalPaid = order.payments?.reduce((sum: number, p: any) => sum + p.amount, 0) || 0;
      const sisaTagihan = (order.grand_total || 0) - totalPaid;
      setCashAmount(sisaTagihan > 0 ? sisaTagihan : 0);
    } catch (err) {}
  };

  const fetchCustomers = async (search: string) => {
    try {
      const res = await fetch(`${API_URL}/customers?search=${search}`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setCustomers(await res.json());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (billingOrder) fetchCustomers(customerSearch);
  }, [customerSearch, billingOrder]);

  const handleAssignCustomer = async (cust: any) => {
    try {
      await fetch(`${API_URL}/orders/${billingOrder.id}/customer`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ customer_id: cust.id })
      });
      setSelectedCustomer(cust);
      setCustomerSearch('');
    } catch (err) {
      alert('Gagal memilih pelanggan');
    }
  };

  const handleDeleteOrder = async () => {
    if (user?.role !== 'admin' && !adminPin) {
      alert('PIN Admin dibutuhkan!');
      return;
    }
    
    try {
      const res = await fetch(`${API_URL}/orders/${selectedOccupiedOrder.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ adminPin })
      });
      
      if (res.ok) {
        alert('Pesanan berhasil dibatalkan!');
        setShowPinModal(false);
        setAdminPin('');
        setShowActionModal(false);
        loadTables();
      } else {
        const error = await res.json();
        alert(error.error || 'Gagal menghapus pesanan');
      }
    } catch (err) {
      alert('Terjadi kesalahan server');
    }
  };

  const handleApplyDiscount = async () => {
    setApplyingDiscount(true);
    let finalDiscount = Number(discountInput);
    
    // Calculate percentage if needed
    if (discountType === 'percentage') {
      const subtotal = billingOrder.subtotal || 0;
      finalDiscount = (subtotal * finalDiscount) / 100;
    }

    try {
      await paymentService.applyDiscount(billingOrder.id, finalDiscount);
      // Refresh order
      const order = await paymentService.getOrderByTable(selectedTableLocal?.id || billingOrder.table_id);
      setBillingOrder(order);
      const totalPaid = order.payments?.reduce((sum: number, p: any) => sum + p.amount, 0) || 0;
      const sisaTagihan = (order.grand_total || 0) - totalPaid;
      setCashAmount(sisaTagihan > 0 ? sisaTagihan : 0);
    } catch (err) {
      alert('Gagal menerapkan diskon');
    } finally {
      setApplyingDiscount(false);
    }
  };

  const handleProcessPayment = async () => {
    setProcessing(true);
    try {
      const selectedMethod = paymentMethods.find(m => m.id === selectedMethodId);
      const totalPaid = billingOrder.payments?.reduce((sum: number, p: any) => sum + p.amount, 0) || 0;

      if (selectedMethod?.name === 'Tunai (Cash)' && cashAmount <= 0) {
        alert('Jumlah harus lebih dari 0!');
        setProcessing(false);
        return;
      }

      await paymentService.processPayment(billingOrder.id, {
        payment_method_id: selectedMethodId,
        amount: cashAmount,
        reference_number: referenceNumber
      });
      
      const isFullyPaid = (totalPaid + cashAmount) >= billingOrder.grand_total;
      
      if (isFullyPaid) {
        setPrintedOrder(billingOrder);
        setBillingOrder(null);
        loadTables(); // Refresh tables
        // Trigger Print
        setTimeout(() => {
          window.print();
          setPrintedOrder(null);
        }, 300);
      } else {
        alert(`Pembayaran Rp ${cashAmount.toLocaleString('id-ID')} berhasil disimpan. Sisa tagihan akan diperbarui.`);
        const order = await paymentService.getOrderByTable(billingOrder.table_id);
        setBillingOrder(order);
        const newTotalPaid = order.payments?.reduce((sum: number, p: any) => sum + p.amount, 0) || 0;
        const newSisa = (order.grand_total || 0) - newTotalPaid;
        setCashAmount(newSisa > 0 ? newSisa : 0);
      }

    } catch (err) {
      alert('Gagal memproses pembayaran');
    } finally {
      setProcessing(false);
    }
  };

  const selectedMethodObj = paymentMethods.find(m => m.id === selectedMethodId);
  const currentTotalPaid = billingOrder?.payments?.reduce((sum: number, p: any) => sum + p.amount, 0) || 0;
  const sisaTagihan = (billingOrder?.grand_total || 0) - currentTotalPaid;
  const changeAmount = cashAmount - sisaTagihan;

  return (
    <>
    <div className="p-8 h-full overflow-y-auto no-print">
      <h1 className="text-4xl font-extrabold mb-8 text-brand-600">Peta Meja</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {tables.map(table => (
          <button
            key={table.id}
            onClick={() => handleTableClick(table)}
            className={`glass-card p-6 flex flex-col items-center justify-center h-36 focus:outline-none relative overflow-hidden group
              ${table.status === 'available' ? 'hover:border-green-400/50 hover:shadow-green-500/20' : 'hover:border-red-400/50 hover:shadow-red-500/20 opacity-80'}`}
          >
            {/* Glowing Indicator */}
            <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl transition-all group-hover:scale-150 
              ${table.status === 'available' ? 'bg-green-500/20' : 'bg-red-500/20'}`}></div>

            <span className="text-3xl font-black text-text-main relative z-10">{table.table_number}</span>
            <span className={`mt-2 font-bold tracking-wider text-sm relative z-10 
              ${table.status === 'available' ? 'text-green-400' : 'text-red-400'}`}>
              {table.status === 'available' ? 'KOSONG' : 'TERISI'}
            </span>
            <span className="text-xs text-text-muted mt-1 relative z-10 font-medium">Pax: {table.capacity}</span>
          </button>
        ))}
      </div>

      {/* Modal Aksi Meja Terisi */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-surface p-8 rounded-3xl w-96 transform transition-all border border-border shadow-2xl text-center">
            <h2 className="text-2xl font-bold mb-2 text-text-main">Meja {selectedOccupiedTable?.table_number}</h2>
            <p className="text-brand-600 dark:text-brand-300 mb-8 font-medium text-sm">Tagihan: {selectedOccupiedOrder?.order_number}</p>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={handleActionAddOrder}
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-brand-500/30 flex items-center justify-center gap-3"
              >
                <span className="text-2xl">+</span> Tambah Pesanan
              </button>
              
              <button 
                onClick={handleActionPay}
                className="w-full bg-surface hover:bg-surface-dark text-text-main font-bold py-4 rounded-xl transition-colors border border-border flex items-center justify-center gap-3"
              >
                <span className="material-icons text-2xl">receipt_long</span> Lihat Tagihan / Bayar
              </button>

              <div className="border-t border-border my-2"></div>
              
              <button 
                onClick={() => {
                  if (user?.role === 'admin') {
                    if (confirm('Yakin ingin membatalkan pesanan ini?')) handleDeleteOrder();
                  } else {
                    setShowPinModal(true);
                  }
                }}
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 dark:text-red-400 font-bold py-3 rounded-xl transition-colors border border-red-500/20 flex items-center justify-center gap-2"
              >
                <span className="material-icons text-xl align-middle mr-1">delete</span> Batalkan Pesanan
              </button>
              
              <button 
                onClick={() => setShowActionModal(false)}
                className="mt-2 text-text-muted hover:text-text-main transition-colors underline text-sm"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal PIN Admin */}
      {showPinModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60]">
          <div className="bg-surface p-8 rounded-3xl w-80 transform transition-all border border-red-500/30 shadow-2xl text-center shadow-red-500/20">
            <span className="material-icons text-5xl mb-4 text-red-500 dark:text-red-400">admin_panel_settings</span>
            <h2 className="text-xl font-bold mb-2 text-text-main">Otorisasi Admin</h2>
            <p className="text-text-muted mb-6 text-sm">Masukkan PIN (Password Admin) untuk membatalkan pesanan.</p>
            
            <input 
              type="password"
              placeholder="PIN Admin..."
              value={adminPin}
              onChange={(e) => setAdminPin(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 text-center text-xl text-text-main tracking-[0.5em] mb-6"
              autoFocus
            />
            
            <div className="flex gap-3">
              <button onClick={() => setShowPinModal(false)} className="flex-1 btn-secondary">Batal</button>
              <button onClick={handleDeleteOrder} className="flex-1 bg-red-500 hover:bg-red-400 text-white font-bold rounded-xl">Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Pax (Order Baru) */}
      {showPaxModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-surface p-8 rounded-3xl w-96 transform transition-all border border-border shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-text-main">Meja {selectedTableLocal?.table_number}</h2>
            <div className="mb-6">
              <label className="block text-text-muted font-medium mb-2 text-sm">Jumlah Tamu (Pax)</label>
              <input
                type="number"
                min="1"
                value={pax}
                onChange={(e) => setPax(Number(e.target.value))}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-xl font-bold text-center text-text-main"
              />
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowPaxModal(false)}
                className="flex-1 btn-secondary"
              >
                Batal
              </button>
              <button 
                onClick={confirmTable}
                className="flex-1 btn-primary py-3"
              >
                Pilih Meja
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tagihan & Pembayaran */}
      {billingOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-3xl w-full max-w-2xl flex flex-col max-h-[90vh] border border-border shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-border bg-surface-dark/40 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-text-main mb-1">Tagihan #{billingOrder.order_number?.split('-')[1]}</h2>
                
                {/* Customer Section */}
                <div className="mt-3 relative">
                  {selectedCustomer ? (
                    <div className="items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3 py-2 rounded-lg inline-flex">
                      <span className="material-icons text-base text-orange-600 dark:text-orange-400">loyalty</span>
                      <span className="text-orange-600 dark:text-orange-300 font-bold text-sm">{selectedCustomer.name}</span>
                      <span className="text-orange-500 dark:text-orange-400/50 text-xs">({selectedCustomer.points} Pts)</span>
                      <button onClick={() => setSelectedCustomer(null)} className="ml-2 text-text-muted hover:text-red-400">&times;</button>
                    </div>
                  ) : (
                    <div className="relative w-64">
                      <input 
                        type="text"
                        placeholder="Pilih Pelanggan (CRM)..."
                        value={customerSearch}
                        onChange={(e) => setCustomerSearch(e.target.value)}
                        className="w-full px-3 py-1.5 bg-background border border-border rounded-lg text-sm text-text-main focus:outline-none focus:border-orange-500"
                      />
                      {customerSearch && customers.length > 0 && (
                        <div className="absolute top-full left-0 w-full mt-1 bg-surface border border-border rounded-lg shadow-xl z-20 max-h-40 overflow-y-auto">
                          {customers.map(c => (
                            <div 
                              key={c.id} 
                              onClick={() => handleAssignCustomer(c)}
                              className="px-3 py-2 hover:bg-surface-dark cursor-pointer text-sm flex justify-between items-center"
                            >
                              <span className="text-text-main font-medium">{c.name}</span>
                              <span className="text-orange-600 dark:text-orange-400 text-xs flex items-center gap-1"><span className="material-icons text-sm">star</span> {c.points}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>
              <button onClick={() => setBillingOrder(null)} className="text-text-muted hover:text-red-400 transition-colors text-3xl leading-none">&times;</button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
              <div className="space-y-4 mb-6">
                {billingOrder.order_items?.map((oi: any) => (
                  <div key={oi.id} className="flex justify-between items-center border-b border-border pb-3">
                    <div>
                      <div className="font-bold text-text-main text-lg">{oi.item.name}</div>
                      <div className="text-sm text-brand-600 dark:text-brand-300">
                        {oi.quantity}x @ Rp {oi.unit_price?.toLocaleString('id-ID')}
                      </div>
                      {oi.discount_amount > 0 && (
                        <div className="text-xs text-red-500 dark:text-red-400 mt-0.5">
                          Diskon per item: -Rp {oi.discount_amount.toLocaleString('id-ID')}
                        </div>
                      )}
                    </div>
                    <div className="font-bold text-text-main text-lg">
                      Rp {oi.subtotal?.toLocaleString('id-ID')}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-brand-500/10 border border-brand-500/20 p-5 rounded-2xl mb-6 shadow-inner space-y-2">
                <div className="flex justify-between items-center text-text-muted">
                  <span>Subtotal</span>
                  <span>Rp {billingOrder.subtotal?.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center text-text-muted">
                  <span>Pajak (10%)</span>
                  <span>Rp {billingOrder.tax_amount?.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center text-text-muted">
                  <span>Service (5%)</span>
                  <span>Rp {billingOrder.service_amount?.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center text-brand-600 dark:text-brand-300">
                  <div className="flex flex-col gap-1">
                    <span>Diskon</span>
                    <div className="flex items-center gap-1">
                      <select 
                        value={discountType} 
                        onChange={(e) => setDiscountType(e.target.value as any)}
                        className="bg-background border border-border rounded text-sm text-text-main px-1 py-1 focus:outline-none"
                      >
                        <option value="nominal" className="bg-surface text-text-main">Rp</option>
                        <option value="percentage" className="bg-surface text-text-main">%</option>
                      </select>
                      <input 
                        type="number" 
                        value={discountInput}
                        onChange={(e) => setDiscountInput(e.target.value)}
                        className="w-20 px-2 py-1 bg-background border border-border rounded text-sm text-text-main focus:outline-none focus:border-brand-500"
                      />
                      <button 
                        onClick={handleApplyDiscount}
                        disabled={applyingDiscount}
                        className="text-xs bg-brand-600 hover:bg-brand-500 text-white px-2 py-1.5 rounded transition-colors"
                      >
                        {applyingDiscount ? '...' : 'Terapkan'}
                      </button>
                    </div>
                  </div>
                  <span>- Rp {billingOrder.discount_amount?.toLocaleString('id-ID')}</span>
                </div>
                
                <div className="border-t border-border my-2 pt-2 flex justify-between items-center">
                  <span className="text-lg font-medium text-text-main">Grand Total</span>
                  <span className="text-xl font-bold text-text-main">Rp {billingOrder.grand_total?.toLocaleString('id-ID')}</span>
                </div>

                {currentTotalPaid > 0 && (
                  <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                    <span>Telah Dibayar</span>
                    <span>- Rp {currentTotalPaid.toLocaleString('id-ID')}</span>
                  </div>
                )}

                <div className="border-t border-brand-500/30 pt-3 mt-3 flex justify-between items-center">
                  <span className="text-xl font-bold text-brand-600 dark:text-brand-300">Sisa Tagihan</span>
                  <span className="text-4xl font-black text-brand-600 dark:text-brand-400">Rp {sisaTagihan.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-text-muted font-medium mb-3 text-sm uppercase tracking-wider">Metode Pembayaran</label>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map(pm => (
                    <button
                      key={pm.id}
                      onClick={() => {
                        setSelectedMethodId(pm.id);
                        if (pm.name !== 'Tunai (Cash)') setCashAmount(sisaTagihan);
                      }}
                      className={`p-4 rounded-xl font-bold transition-all border ${selectedMethodId === pm.id ? 'bg-brand-600 text-white border-brand-500 shadow-lg shadow-brand-500/20' : 'bg-surface-dark/40 text-text-muted border-border hover:bg-surface-dark hover:text-text-main'}`}
                    >
                      {pm.name}
                    </button>
                  ))}
                </div>
              </div>

              {selectedMethodObj?.name === 'Tunai (Cash)' ? (
                <div className="bg-surface-dark/40 p-5 rounded-2xl border border-border">
                  <label className="block text-text-muted font-medium mb-2">Uang Diterima (Cash)</label>
                  <input
                    type="number"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-brand-500 text-2xl font-bold text-text-main mb-2"
                  />
                  {changeAmount > 0 && (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-500 dark:text-green-400 rounded-xl font-bold flex justify-between items-center mt-4">
                      <span>Kembalian:</span>
                      <span className="text-2xl">Rp {changeAmount.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-surface-dark/40 p-5 rounded-2xl border border-border">
                  <label className="block text-text-muted font-medium mb-2">Nomor Referensi (Opsional)</label>
                  <input
                    type="text"
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value)}
                    placeholder="No. Kartu / Ref Transfer"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-brand-500 text-text-main"
                  />
                </div>
              )}
            </div>

            <div className="p-6 border-t border-border bg-surface-dark/40 flex gap-4">
              <button 
                onClick={() => setBillingOrder(null)}
                className="flex-1 btn-secondary py-4 text-lg"
              >
                Batal
              </button>
              <button 
                onClick={handleProcessPayment}
                disabled={processing || cashAmount <= 0}
                className="flex-[2] btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {processing ? 'Memproses...' : (cashAmount >= sisaTagihan ? <><span className="material-icons text-xl align-middle mr-1">check_circle</span> Lunas & Selesai</> : <><span className="material-icons text-xl align-middle mr-1">schedule</span> Bayar Sebagian</>)}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>

    {/* RECEIPT TEMPLATE (PRINT ONLY) */}
    {printedOrder && (
      <div className="hidden print-only text-black bg-white p-4 font-mono w-[80mm] mx-auto text-sm">
        <div className="text-center border-b border-black pb-2 mb-2">
          <h2 className="font-bold text-xl">ADOL POS</h2>
          <p>Jl. Contoh Resto No. 123</p>
          <p>Telp: 08123456789</p>
        </div>
        
        <div className="mb-2">
          <p>No: {printedOrder.order_number}</p>
          <p>Meja: {printedOrder.table?.table_number || 'Takeaway'}</p>
          <p>Kasir: Admin</p>
          <p>Waktu: {new Date().toLocaleString('id-ID')}</p>
        </div>
        
        <div className="border-b border-dashed border-black mb-2"></div>
        
        <table className="w-full mb-2 text-left">
          <tbody>
            {printedOrder.order_items?.map((oi: any) => (
              <tr key={oi.id} className="align-top">
                <td className="pr-2">{oi.quantity}x</td>
                <td className="pr-2 w-full">
                  <div>{oi.item.name}</div>
                  {oi.modifiers?.filter((m: any) => m.print_on_receipt).map((m: any, mIdx: number) => (
                    <div key={mIdx} className="text-[10px] text-gray-600 pl-2">
                      + {m.name} {m.price > 0 && `(Rp ${m.price.toLocaleString('id-ID')})`}
                    </div>
                  ))}
                  {oi.discount_amount > 0 && (
                    <div className="text-[10px] italic">- Disc: Rp {oi.discount_amount.toLocaleString('id-ID')}</div>
                  )}
                </td>
                <td className="text-right whitespace-nowrap">
                  {oi.subtotal?.toLocaleString('id-ID')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="border-t border-dashed border-black pt-2 mb-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>Rp {printedOrder.subtotal?.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span>Pajak (10%)</span>
            <span>Rp {printedOrder.tax_amount?.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span>Service (5%)</span>
            <span>Rp {printedOrder.service_amount?.toLocaleString('id-ID')}</span>
          </div>
          {printedOrder.discount_amount > 0 && (
            <div className="flex justify-between">
              <span>Diskon</span>
              <span>-Rp {printedOrder.discount_amount?.toLocaleString('id-ID')}</span>
            </div>
          )}
          
          <div className="flex justify-between font-bold text-lg border-t border-dashed border-black mt-1 pt-1">
            <span>GRAND TOTAL</span>
            <span>Rp {printedOrder.grand_total?.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Tunai/Bayar</span>
            <span>Rp {cashAmount.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span>Kembali</span>
            <span>Rp {Math.max(0, cashAmount - (printedOrder.grand_total - currentTotalPaid)).toLocaleString('id-ID')}</span>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p>Terima Kasih</p>
          <p>Silakan Datang Kembali</p>
        </div>
      </div>
    )}
    </>
  );
}
