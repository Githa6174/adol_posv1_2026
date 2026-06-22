import { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';

const API_URL = 'http://localhost:3001/api';

export function Brands() {
  const { token } = useAuthStore();
  const [brands, setBrands] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: 0, name: '', description: '' });

  const fetchBrands = async () => {
    try {
      const res = await fetch(`${API_URL}/product-settings/brands`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setBrands(await res.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchBrands(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = formData.id ? 'PUT' : 'POST';
    const url = formData.id ? `${API_URL}/product-settings/brands/${formData.id}` : `${API_URL}/product-settings/brands`;
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowModal(false);
        fetchBrands();
      }
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus brand ini?')) return;
    try {
      await fetch(`${API_URL}/product-settings/brands/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBrands();
    } catch (err) {}
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-text-main mb-2">Brands (Merek)</h1>
          <p className="text-text-muted">Kelola merek produk untuk mempermudah filter</p>
        </div>
        <button 
          onClick={() => { setFormData({ id: 0, name: '', description: '' }); setShowModal(true); }}
          className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl font-bold transition-colors"
        >
          + Tambah Brand
        </button>
      </div>

      <div className="bg-surface rounded-3xl p-6 border border-border">
        <table className="w-full text-left text-text-main">
          <thead>
            <tr className="border-b border-border">
              <th className="py-4 font-semibold text-text-muted">Name</th>
              <th className="py-4 font-semibold text-text-muted">Description</th>
              <th className="py-4 font-semibold text-text-muted text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {brands.map(brand => (
              <tr key={brand.id} className="border-b border-border hover:bg-surface-dark transition-colors">
                <td className="py-4 font-medium">{brand.name}</td>
                <td className="py-4 text-text-muted">{brand.description || '-'}</td>
                <td className="py-4 text-right font-medium">
                  <button onClick={() => { setFormData(brand); setShowModal(true); }} className="text-blue-500 hover:underline mr-4">Edit</button>
                  <button onClick={() => handleDelete(brand.id)} className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {brands.length === 0 && (
              <tr><td colSpan={3} className="py-8 text-center text-text-muted">Belum ada brand.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-3xl p-8 w-full max-w-md border border-border shadow-2xl">
            <h2 className="text-2xl font-bold text-text-main mb-6">{formData.id ? 'Edit Brand' : 'Tambah Brand'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-field w-full" placeholder="e.g. Nike, Coca-Cola" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="input-field w-full h-24" placeholder="Optional description..." />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 btn-secondary">Batal</button>
                <button type="submit" className="flex-1 btn-primary py-3">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
