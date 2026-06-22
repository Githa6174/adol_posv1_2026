import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { Plus, Trash2, Receipt, Search } from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

export function Expenses() {
  const token = useAuthStore((state) => state.token);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    expense_category_id: '',
    amount: '',
    description: '',
    expense_date: new Date().toISOString().split('T')[0]
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [expRes, catRes] = await Promise.all([
        fetch(`${API_URL}/expenses`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_URL}/expenses/categories`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);
      
      if (expRes.ok) setExpenses(await expRes.json());
      if (catRes.ok) setCategories(await catRes.json());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({
          expense_category_id: '',
          amount: '',
          description: '',
          expense_date: new Date().toISOString().split('T')[0]
        });
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus pengeluaran ini?')) return;
    try {
      const res = await fetch(`${API_URL}/expenses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateCategory = async () => {
    const name = prompt('Nama Kategori Pengeluaran Baru:');
    if (!name) return;
    try {
      const res = await fetch(`${API_URL}/expenses/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name })
      });
      if (res.ok) fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
            Pengeluaran (Expenses)
          </h1>
          <p className="text-text-muted mt-1">Catat biaya operasional dan bahan baku Anda di sini.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary py-2.5 px-5 shadow-lg shadow-brand-500/30 flex items-center gap-2"
        >
          <Plus size={20} /> Tambah Pengeluaran
        </button>
      </div>

      <div className="flex-1 glass-card overflow-hidden flex flex-col">
        <div className="p-4 border-b border-white/5 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Cari deskripsi pengeluaran..." 
              className="w-full bg-surface-dark border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-brand-500 transition-colors text-white"
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
                  <th className="pb-3 px-4 font-medium">Tanggal</th>
                  <th className="pb-3 px-4 font-medium">Kategori</th>
                  <th className="pb-3 px-4 font-medium">Deskripsi</th>
                  <th className="pb-3 px-4 font-medium text-right">Nominal</th>
                  <th className="pb-3 px-4 font-medium text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {expenses.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-text-muted">Belum ada pengeluaran dicatat.</td>
                  </tr>
                ) : (
                  expenses.map((exp: any) => (
                    <tr key={exp.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-4 text-sm text-text-main">
                        {new Date(exp.expense_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-lg font-medium border border-red-500/20">
                          {exp.category?.name || 'Umum'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-text-muted">{exp.description || '-'}</td>
                      <td className="py-4 px-4 text-right font-bold text-text-main">
                        Rp {exp.amount.toLocaleString('id-ID')}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button 
                          onClick={() => handleDelete(exp.id)}
                          className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal Add Expense */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-surface-dark/50">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Receipt className="text-red-400" /> Catat Pengeluaran
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Nominal (Rp)</label>
                  <input 
                    type="number" 
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full bg-surface-dark border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-500 text-lg font-bold"
                    placeholder="Contoh: 50000"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="block text-sm font-medium text-text-muted">Kategori</label>
                    <button type="button" onClick={handleCreateCategory} className="text-xs text-brand-400 hover:text-brand-300">
                      + Kategori Baru
                    </button>
                  </div>
                  <select 
                    required
                    value={formData.expense_category_id}
                    onChange={(e) => setFormData({...formData, expense_category_id: e.target.value})}
                    className="w-full bg-surface-dark border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="">-- Pilih Kategori --</option>
                    {categories.map((c: any) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Deskripsi / Catatan</label>
                  <input 
                    type="text" 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-surface-dark border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-500"
                    placeholder="Contoh: Beli es batu darurat"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Tanggal</label>
                  <input 
                    type="date" 
                    required
                    value={formData.expense_date}
                    onChange={(e) => setFormData({...formData, expense_date: e.target.value})}
                    className="w-full bg-surface-dark border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-red-500 [color-scheme:dark]"
                  />
                </div>
              </div>
              
              <div className="mt-8 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors font-medium"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2.5 px-4 rounded-xl bg-red-500 hover:bg-red-400 text-white transition-colors font-medium shadow-lg shadow-red-500/30"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
