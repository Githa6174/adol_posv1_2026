import { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';

const API_URL = 'http://localhost:3001/api';

export function Warranties() {
  const { token } = useAuthStore();
  const [warranties, setWarranties] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: 0, name: '', description: '', duration: 1, duration_type: 'months' });

  const fetchWarranties = async () => {
    try {
      const res = await fetch(`${API_URL}/product-settings/warranties`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setWarranties(await res.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchWarranties(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = formData.id ? 'PUT' : 'POST';
    const url = formData.id ? `${API_URL}/product-settings/warranties/${formData.id}` : `${API_URL}/product-settings/warranties`;
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowModal(false);
        fetchWarranties();
      }
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus garansi ini?')) return;
    try {
      await fetch(`${API_URL}/product-settings/warranties/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchWarranties();
    } catch (err) {}
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Warranties (Garansi)</h1>
          <p className="text-text-muted">Kelola jenis-jenis garansi untuk produk elektronik/retail</p>
        </div>
        <button 
          onClick={() => { setFormData({ id: 0, name: '', description: '', duration: 1, duration_type: 'months' }); setShowModal(true); }}
          className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl font-bold transition-colors"
        >
          + Tambah Garansi
        </button>
      </div>

      <div className="glass rounded-3xl p-6 border border-white/10">
        <table className="w-full text-left text-white">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-4 font-semibold text-text-muted">Name</th>
              <th className="py-4 font-semibold text-text-muted">Duration</th>
              <th className="py-4 font-semibold text-text-muted">Description</th>
              <th className="py-4 font-semibold text-text-muted text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {warranties.map(w => (
              <tr key={w.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-4 font-medium">{w.name}</td>
                <td className="py-4 text-brand-300">{w.duration} {w.duration_type}</td>
                <td className="py-4 text-text-muted">{w.description || '-'}</td>
                <td className="py-4 text-right">
                  <button onClick={() => { setFormData(w); setShowModal(true); }} className="text-blue-400 hover:text-blue-300 mr-4">Edit</button>
                  <button onClick={() => handleDelete(w.id)} className="text-red-400 hover:text-red-300">Delete</button>
                </td>
              </tr>
            ))}
            {warranties.length === 0 && (
              <tr><td colSpan={4} className="py-8 text-center text-text-muted">Belum ada data garansi.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass rounded-3xl p-8 w-full max-w-md border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">{formData.id ? 'Edit Garansi' : 'Tambah Garansi'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-field w-full" placeholder="e.g. Garansi Resmi 1 Tahun" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-text-muted mb-2">Duration</label>
                  <input required type="number" min="1" value={formData.duration} onChange={e => setFormData({...formData, duration: Number(e.target.value)})} className="input-field w-full" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-text-muted mb-2">Type</label>
                  <select value={formData.duration_type} onChange={e => setFormData({...formData, duration_type: e.target.value})} className="input-field w-full">
                    <option value="days">Days</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="input-field w-full h-20" placeholder="Syarat dan ketentuan..." />
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
