import { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';

const API_URL = 'http://localhost:3001/api';

export function Units() {
  const { token } = useAuthStore();
  const [units, setUnits] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: 0, name: '', short_name: '', allow_decimal: false });

  const fetchUnits = async () => {
    try {
      const res = await fetch(`${API_URL}/product-settings/units`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setUnits(await res.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchUnits(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = formData.id ? 'PUT' : 'POST';
    const url = formData.id ? `${API_URL}/product-settings/units/${formData.id}` : `${API_URL}/product-settings/units`;
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowModal(false);
        fetchUnits();
      }
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus unit ini?')) return;
    try {
      await fetch(`${API_URL}/product-settings/units/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUnits();
    } catch (err) {}
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Units (Satuan)</h1>
          <p className="text-text-muted">Kelola satuan barang (Pcs, Kg, Cup, dll)</p>
        </div>
        <button 
          onClick={() => { setFormData({ id: 0, name: '', short_name: '', allow_decimal: false }); setShowModal(true); }}
          className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl font-bold transition-colors"
        >
          + Tambah Unit
        </button>
      </div>

      <div className="glass rounded-3xl p-6 border border-white/10">
        <table className="w-full text-left text-white">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-4 font-semibold text-text-muted">Name</th>
              <th className="py-4 font-semibold text-text-muted">Short Name</th>
              <th className="py-4 font-semibold text-text-muted">Allow Decimal</th>
              <th className="py-4 font-semibold text-text-muted text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {units.map(unit => (
              <tr key={unit.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-4">{unit.name}</td>
                <td className="py-4">{unit.short_name}</td>
                <td className="py-4">{unit.allow_decimal ? 'Yes' : 'No'}</td>
                <td className="py-4 text-right">
                  <button onClick={() => { setFormData(unit); setShowModal(true); }} className="text-blue-400 hover:text-blue-300 mr-4">Edit</button>
                  <button onClick={() => handleDelete(unit.id)} className="text-red-400 hover:text-red-300">Delete</button>
                </td>
              </tr>
            ))}
            {units.length === 0 && (
              <tr><td colSpan={4} className="py-8 text-center text-text-muted">Belum ada unit.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass rounded-3xl p-8 w-full max-w-md border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">{formData.id ? 'Edit Unit' : 'Tambah Unit'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-field w-full" placeholder="e.g. Kilogram" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Short Name</label>
                <input required type="text" value={formData.short_name} onChange={e => setFormData({...formData, short_name: e.target.value})} className="input-field w-full" placeholder="e.g. Kg" />
              </div>
              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" checked={formData.allow_decimal} onChange={e => setFormData({...formData, allow_decimal: e.target.checked})} className="w-5 h-5" id="decimal" />
                <label htmlFor="decimal" className="text-white text-sm">Allow Decimal (Izinkan Desimal)</label>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 btn-secondary">Batal</button>
                <button type="submit" className="flex-1 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
