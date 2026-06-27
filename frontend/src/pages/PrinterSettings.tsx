import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

const API_URL = 'http://localhost:3001/api';

const PRINTER_TYPES = [
  { value: 'thermal', label: 'Thermal Receipt (POS)' },
  { value: 'kitchen', label: 'Kitchen Printer' },
  { value: 'bar', label: 'Bar Printer' },
  { value: 'label', label: 'Label Printer' },
];

const LOCATIONS = [
  { value: 'Kitchen', label: 'Dapur / Kitchen' },
  { value: 'Bar', label: 'Bar / Minuman' },
  { value: 'Cashier', label: 'Kasir Utama' },
  { value: 'Takeaway', label: 'Takeaway Counter' },
];

const PAPER_WIDTHS = [
  { value: 58, label: '58mm' },
  { value: 80, label: '80mm (Default)' },
];

const CONNECTION_TYPES = [
  { value: 'ethernet', label: 'Ethernet / LAN', icon: 'lan' },
  { value: 'usb', label: 'USB', icon: 'usb' },
  { value: 'bluetooth', label: 'Bluetooth', icon: 'bluetooth' },
];

const emptyForm = {
  id: 0,
  name: '',
  location: '',
  printer_type: 'thermal',
  connection_type: 'ethernet',
  ip_address: '',
  port: 9100,
  usb_port: '',
  bluetooth_name: '',
  bluetooth_address: '',
  paper_width: 80,
  is_active: true,
};

export function PrinterSettings() {
  const { token } = useAuthStore();
  const [printers, setPrinters] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ ...emptyForm });
  const [testingId, setTestingId] = useState<number | null>(null);

  const fetchPrinters = async () => {
    try {
      const res = await fetch(`${API_URL}/printers`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setPrinters(await res.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchPrinters(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = formData.id ? 'PUT' : 'POST';
    const url = formData.id ? `${API_URL}/printers/${formData.id}` : `${API_URL}/printers`;
    const { id, ...body } = formData;

    if (body.connection_type === 'ethernet') {
      body.usb_port = '';
      body.bluetooth_name = '';
      body.bluetooth_address = '';
    } else if (body.connection_type === 'usb') {
      body.ip_address = '';
      body.port = 0;
      body.bluetooth_name = '';
      body.bluetooth_address = '';
    } else {
      body.ip_address = '';
      body.port = 0;
      body.usb_port = '';
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        setShowModal(false);
        fetchPrinters();
      }
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus printer ini?')) return;
    try {
      await fetch(`${API_URL}/printers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPrinters();
    } catch (err) {}
  };

  const handleTest = async (id: number) => {
    setTestingId(id);
    try {
      const res = await fetch(`${API_URL}/printers/${id}/test`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert('Gagal mengirim test print');
    } finally {
      setTestingId(null);
    }
  };

  const handleToggleActive = async (printer: any) => {
    try {
      await fetch(`${API_URL}/printers/${printer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ is_active: !printer.is_active })
      });
      fetchPrinters();
    } catch (err) {}
  };

  const openEdit = (printer: any) => {
    setFormData({
      id: printer.id,
      name: printer.name || '',
      location: printer.location || '',
      printer_type: printer.printer_type || 'thermal',
      connection_type: printer.connection_type || 'ethernet',
      ip_address: printer.ip_address || '',
      port: printer.port || 9100,
      usb_port: printer.usb_port || '',
      bluetooth_name: printer.bluetooth_name || '',
      bluetooth_address: printer.bluetooth_address || '',
      paper_width: printer.paper_width || 80,
      is_active: printer.is_active ?? true,
    });
    setShowModal(true);
  };

  const getConnectionInfo = (printer: any) => {
    const type = printer.connection_type || 'ethernet';
    if (type === 'usb') return { icon: 'usb', label: 'USB', detail: printer.usb_port || '-' };
    if (type === 'bluetooth') return { icon: 'bluetooth', label: 'Bluetooth', detail: printer.bluetooth_name || printer.bluetooth_address || '-' };
    return { icon: 'lan', label: 'Ethernet', detail: `${printer.ip_address || '-'}:${printer.port || 9100}` };
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-text-main mb-2">Printer Settings</h1>
          <p className="text-text-muted">Konfigurasi printer untuk cetak struk, dapur, dan bar</p>
        </div>
        <button 
          onClick={() => { setFormData({ ...emptyForm }); setShowModal(true); }}
          className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-brand-500/30"
        >
          + Tambah Printer
        </button>
      </div>

      {printers.length === 0 ? (
        <div className="glass rounded-3xl p-12 border border-[var(--color-border)] text-center">
          <span className="material-icons text-6xl text-text-muted mb-4 block">print</span>
          <p className="text-text-muted text-lg">Belum ada printer terkonfigurasi.</p>
          <p className="text-text-muted text-sm mt-2">Tambahkan printer pertama untuk mulai mencetak struk dan order kitchen.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {printers.map(printer => {
            const conn = getConnectionInfo(printer);
            return (
              <div key={printer.id} className={`glass rounded-3xl border transition-all ${printer.is_active ? 'border-[var(--color-border)]' : 'border-red-500/30 opacity-60'}`}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${printer.is_active ? 'bg-brand-500/20 text-brand-500' : 'bg-red-500/20 text-red-400'}`}>
                        <span className="material-icons text-2xl">print</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-text-main">{printer.name || 'Unnamed'}</h3>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${printer.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {printer.is_active ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm mb-6">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Tipe</span>
                      <span className="text-text-main font-medium capitalize">{printer.printer_type || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Lokasi</span>
                      <span className="text-text-main font-medium">{printer.location || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Koneksi</span>
                      <span className="text-text-main font-medium flex items-center gap-1.5">
                        <span className="material-icons" style={{fontSize:'16px'}}>{conn.icon}</span>
                        {conn.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">{conn.label === 'Bluetooth' ? 'Device' : conn.label === 'USB' ? 'USB Port' : 'IP Address'}</span>
                      <span className="text-text-main font-mono text-xs">{conn.detail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Lebar Kertas</span>
                      <span className="text-text-main font-medium">{printer.paper_width || 80}mm</span>
                    </div>
                  </div>

                  <div className="flex gap-2 border-t border-[var(--color-border)] pt-4">
                    <button onClick={() => handleTest(printer.id)} disabled={testingId === printer.id} className="flex-1 text-sm font-medium py-2 px-3 rounded-xl bg-brand-500/10 text-brand-500 hover:bg-brand-500/20 transition-colors disabled:opacity-50">
                      {testingId === printer.id ? 'Sending...' : 'Test Print'}
                    </button>
                    <button onClick={() => openEdit(printer)} className="text-sm font-medium py-2 px-3 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">
                      Edit
                    </button>
                    <button onClick={() => handleToggleActive(printer)} className={`text-sm font-medium py-2 px-3 rounded-xl transition-colors ${printer.is_active ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20' : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'}`}>
                      {printer.is_active ? 'Disable' : 'Enable'}
                    </button>
                    <button onClick={() => handleDelete(printer.id)} className="text-sm font-medium py-2 px-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                      <span className="material-icons text-base">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass rounded-3xl p-8 w-full max-w-lg border border-[var(--color-border)] shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-text-main mb-6">{formData.id ? 'Edit Printer' : 'Tambah Printer Baru'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Nama Printer *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-field w-full" placeholder="e.g. Kasir Utama, Printer Dapur" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Tipe Printer</label>
                  <select value={formData.printer_type} onChange={e => setFormData({...formData, printer_type: e.target.value})} className="input-field w-full">
                    {PRINTER_TYPES.map(t => <option key={t.value} value={t.value} className="bg-surface text-text-main">{t.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Lokasi</label>
                  <select value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="input-field w-full">
                    <option value="" className="bg-surface text-text-main">Pilih Lokasi...</option>
                    {LOCATIONS.map(l => <option key={l.value} value={l.value} className="bg-surface text-text-main">{l.label}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Tipe Koneksi</label>
                <div className="grid grid-cols-3 gap-3">
                  {CONNECTION_TYPES.map(ct => (
                    <button
                      key={ct.value}
                      type="button"
                      onClick={() => setFormData({...formData, connection_type: ct.value})}
                      className={`flex flex-col items-center justify-center gap-1.5 py-3 px-3 rounded-xl border-2 transition-all ${
                        formData.connection_type === ct.value
                          ? 'border-brand-500 bg-brand-500/10 text-brand-500'
                          : 'border-[var(--color-border)] bg-transparent text-text-muted hover:border-text-muted'
                      }`}
                    >
                      <span className="material-icons" style={{fontSize:'22px'}}>{ct.icon}</span>
                      <span className="font-medium text-xs">{ct.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {formData.connection_type === 'ethernet' && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-text-muted mb-2">IP Address</label>
                    <input type="text" value={formData.ip_address} onChange={e => setFormData({...formData, ip_address: e.target.value})} className="input-field w-full" placeholder="192.168.1.100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">Port</label>
                    <input type="number" value={formData.port} onChange={e => setFormData({...formData, port: Number(e.target.value)})} className="input-field w-full" placeholder="9100" />
                  </div>
                </div>
              )}

              {formData.connection_type === 'usb' && (
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">USB Port / Nama Printer</label>
                  <input type="text" value={formData.usb_port} onChange={e => setFormData({...formData, usb_port: e.target.value})} className="input-field w-full" placeholder="e.g. USB001, COM3, EPSON TM-T82" />
                  <p className="text-xs text-text-muted mt-1.5">Masukkan nama port USB atau nama printer yang terdaftar di sistem</p>
                </div>
              )}

              {formData.connection_type === 'bluetooth' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">Nama Perangkat Bluetooth</label>
                    <input type="text" value={formData.bluetooth_name} onChange={e => setFormData({...formData, bluetooth_name: e.target.value})} className="input-field w-full" placeholder="e.g. RPP02N, PT-210, BlueTooth Printer" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">Alamat MAC (opsional)</label>
                    <input type="text" value={formData.bluetooth_address} onChange={e => setFormData({...formData, bluetooth_address: e.target.value})} className="input-field w-full" placeholder="e.g. 00:11:22:33:44:55" />
                    <p className="text-xs text-text-muted mt-1.5">Alamat MAC perangkat Bluetooth untuk koneksi yang lebih stabil</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Lebar Kertas</label>
                  <select value={formData.paper_width} onChange={e => setFormData({...formData, paper_width: Number(e.target.value)})} className="input-field w-full">
                    {PAPER_WIDTHS.map(p => <option key={p.value} value={p.value} className="bg-surface text-text-main">{p.label}</option>)}
                  </select>
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="w-5 h-5 rounded border-border bg-background text-brand-500 cursor-pointer" />
                    <span className="text-text-main font-medium">Aktif</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 btn-secondary py-3">Batal</button>
                <button type="submit" className="flex-1 btn-primary py-3">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
