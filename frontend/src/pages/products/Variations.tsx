import { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';

const API_URL = 'http://localhost:3001/api';

export function Variations() {
  const { token } = useAuthStore();
  const [variations, setVariations] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: 0, name: '', optionsStr: '' });

  const fetchVariations = async () => {
    try {
      const res = await fetch(`${API_URL}/product-settings/variations`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setVariations(await res.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchVariations(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = formData.id ? 'PUT' : 'POST';
    const url = formData.id ? `${API_URL}/product-settings/variations/${formData.id}` : `${API_URL}/product-settings/variations`;
    
    // Split comma separated options
    const optionsArray = formData.optionsStr.split(',').map(s => s.trim()).filter(s => s.length > 0);
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: formData.name, options: optionsArray })
      });
      if (res.ok) {
        setShowModal(false);
        fetchVariations();
      }
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus variasi ini?')) return;
    try {
      await fetch(`${API_URL}/product-settings/variations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchVariations();
    } catch (err) {}
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-text-main mb-2">Variations</h1>
          <p className="text-text-muted">Template variasi (Ukuran, Warna, Topping) untuk produk</p>
        </div>
        <button 
          onClick={() => { setFormData({ id: 0, name: '', optionsStr: '' }); setShowModal(true); }}
          className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-brand-500/30"
        >
          + Tambah Variasi
        </button>
      </div>

      <div className="glass rounded-3xl p-6 border border-border">
        <table className="w-full text-left text-text-main">
          <thead>
            <tr className="border-b border-border">
              <th className="py-4 font-semibold text-text-muted">Nama Variasi</th>
              <th className="py-4 font-semibold text-text-muted">Opsi (Pilihan)</th>
              <th className="py-4 font-semibold text-text-muted text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {variations.map(v => (
              <tr key={v.id} className="border-b border-border hover:bg-surface-dark transition-colors">
                <td className="py-4 font-medium">{v.name}</td>
                <td className="py-4 text-text-muted">
                  <div className="flex gap-2 flex-wrap">
                    {v.options?.map((opt: any) => (
                      <span key={opt.id} className="bg-surface-dark border border-border px-2 py-1 rounded text-xs text-text-main">{opt.name}</span>
                    ))}
                  </div>
                </td>
                <td className="py-4 text-right">
                  <button onClick={() => { 
                    setFormData({ id: v.id, name: v.name, optionsStr: v.options.map((o:any)=>o.name).join(', ') }); 
                    setShowModal(true); 
                  }} className="text-blue-500 hover:underline mr-4 font-medium transition-colors">Edit</button>
                  <button onClick={() => handleDelete(v.id)} className="text-red-500 hover:underline font-medium transition-colors">Delete</button>
                </td>
              </tr>
            ))}
            {variations.length === 0 && (
              <tr><td colSpan={3} className="py-8 text-center text-text-muted">Belum ada variasi.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-3xl p-8 w-full max-w-md border border-border shadow-2xl">
            <h2 className="text-2xl font-bold text-text-main mb-6">{formData.id ? 'Edit Variasi' : 'Tambah Variasi'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Nama Variasi (e.g. Ukuran Cup)</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-field w-full" placeholder="Ukuran Cup" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Opsi (Pisahkan dengan koma)</label>
                <input required type="text" value={formData.optionsStr} onChange={e => setFormData({...formData, optionsStr: e.target.value})} className="input-field w-full" placeholder="Regular, Large, Extra Large" />
                <p className="text-xs text-text-muted mt-2">Contoh: Merah, Biru, Hijau</p>
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
