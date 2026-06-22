import { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';

const API_URL = 'http://localhost:3001/api';

export function Categories() {
  const { token } = useAuthStore();
  const [categories, setCategories] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: 0, name: '', description: '' });

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/items/categories`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setCategories(await res.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = formData.id ? 'PUT' : 'POST';
    const url = formData.id ? `${API_URL}/items/categories/${formData.id}` : `${API_URL}/items/categories`;
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: formData.name, description: formData.description })
      });
      if (res.ok) {
        setShowModal(false);
        fetchCategories();
      }
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus kategori ini?')) return;
    try {
      await fetch(`${API_URL}/items/categories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCategories();
    } catch (err) {}
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-text-main mb-2">Categories (Kategori)</h1>
          <p className="text-text-muted">Kelola kategori produk untuk sistem POS</p>
        </div>
        <button 
          onClick={() => { setFormData({ id: 0, name: '', description: '' }); setShowModal(true); }}
          className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-brand-500/30"
        >
          + Tambah Kategori
        </button>
      </div>

      <div className="glass rounded-3xl p-6 border border-[var(--color-border)]">
        <table className="w-full text-left text-text-main">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th className="py-4 font-semibold text-text-muted">Name</th>
              <th className="py-4 font-semibold text-text-muted">Description</th>
              <th className="py-4 font-semibold text-text-muted text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id} className="border-b border-[var(--color-border)] hover:bg-surface-light transition-colors">
                <td className="py-4 font-medium">{cat.name}</td>
                <td className="py-4 text-text-muted">{cat.description || '-'}</td>
                <td className="py-4 text-right">
                  <button onClick={() => { setFormData(cat); setShowModal(true); }} className="text-blue-400 hover:text-blue-300 mr-4 font-medium transition-colors">Edit</button>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-400 hover:text-red-300 font-medium transition-colors">Delete</button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr><td colSpan={3} className="py-8 text-center text-text-muted">Belum ada kategori.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300">
          <div className="glass rounded-3xl p-8 w-full max-w-md border border-[var(--color-border)] shadow-2xl transform transition-transform duration-300 scale-100">
            <h2 className="text-2xl font-bold text-text-main mb-6">{formData.id ? 'Edit Kategori' : 'Tambah Kategori'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Nama Kategori</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-field w-full" placeholder="e.g. Minuman, Makanan Utama" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Deskripsi (Opsional)</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="input-field w-full h-24 resize-none" placeholder="Deskripsi singkat..." />
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
