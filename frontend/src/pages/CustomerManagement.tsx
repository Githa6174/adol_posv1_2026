import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { Plus, Trash2, Edit, Search, Users, Star } from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

export function CustomerManagement() {
  const token = useAuthStore((state) => state.token);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    is_member: false,
    points: 0
  });

  const fetchCustomers = async (search = '') => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ search }).toString();
      const res = await fetch(`${API_URL}/customers?${query}`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) setCustomers(await res.json());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(searchQuery);
  }, [token, searchQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `${API_URL}/customers/${editingId}` : `${API_URL}/customers`;
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ name: '', phone: '', email: '', is_member: false, points: 0 });
        fetchCustomers(searchQuery);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (customer: any) => {
    setEditingId(customer.id);
    setFormData({
      name: customer.name,
      phone: customer.phone || '',
      email: customer.email || '',
      is_member: customer.is_member,
      points: customer.points
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus pelanggan ini?')) return;
    try {
      const res = await fetch(`${API_URL}/customers/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchCustomers(searchQuery);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
            Manajemen Pelanggan (CRM)
          </h1>
          <p className="text-text-muted mt-1">Kelola data pelanggan dan loyalty poin.</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setFormData({ name: '', phone: '', email: '', is_member: false, points: 0 });
            setIsModalOpen(true);
          }}
          className="btn-primary py-2.5 px-5 flex items-center gap-2"
        >
          <Plus size={20} /> Tambah Pelanggan
        </button>
      </div>

      <div className="flex-1 glass-card overflow-hidden flex flex-col">
        <div className="p-4 border-b border-white/5">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama atau no telepon..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-dark border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {loading ? (
            <div className="text-center py-10 text-text-muted">Memuat data...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-text-muted text-sm border-b border-white/10">
                  <th className="pb-3 px-4 font-medium">Nama Pelanggan</th>
                  <th className="pb-3 px-4 font-medium">No. Telepon</th>
                  <th className="pb-3 px-4 font-medium text-center">Membership</th>
                  <th className="pb-3 px-4 font-medium text-center">Poin</th>
                  <th className="pb-3 px-4 font-medium text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c: any) => (
                  <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="py-4 px-4 font-bold text-white">{c.name}</td>
                    <td className="py-4 px-4 text-sm text-text-main">{c.phone || '-'}</td>
                    <td className="py-4 px-4 text-center">
                      {c.is_member ? (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-lg font-medium border border-yellow-500/20">Member</span>
                      ) : (
                        <span className="px-2 py-1 bg-white/5 text-text-muted text-xs rounded-lg font-medium">Regular</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 text-orange-400 font-bold">
                        <Star size={16} fill="currentColor" /> {c.points}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(c)}
                          className="p-2 text-blue-400 hover:bg-blue-400/20 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(c.id)}
                          className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {customers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-text-muted">Tidak ada pelanggan ditemukan.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal Add/Edit Customer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md overflow-hidden flex flex-col">
            <div className="p-5 border-b border-white/10 bg-surface-dark/50">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Users className="text-orange-400" /> {editingId ? 'Edit Pelanggan' : 'Tambah Pelanggan'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Nama Lengkap</label>
                <input 
                  type="text" required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-surface-dark border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Nomor Telepon</label>
                <input 
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-surface-dark border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Email</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-surface-dark border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <input 
                  type="checkbox" 
                  id="is_member"
                  checked={formData.is_member}
                  onChange={(e) => setFormData({...formData, is_member: e.target.checked})}
                  className="w-5 h-5 rounded border-white/10 bg-surface-dark text-brand-500 focus:ring-brand-500 focus:ring-offset-surface-dark"
                />
                <label htmlFor="is_member" className="text-sm font-medium text-white">
                  Daftarkan sebagai Member Aktif
                </label>
              </div>
              
              {editingId && (
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Total Poin</label>
                  <input 
                    type="number"
                    value={formData.points}
                    onChange={(e) => setFormData({...formData, points: parseInt(e.target.value) || 0})}
                    className="w-full bg-surface-dark border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              )}
              
              <div className="mt-8 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white hover:bg-white/5">Batal</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-medium">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
