import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { Plus, Trash2, KeyRound, UserCog, Edit, RefreshCw } from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

export function UserManagement() {
  const token = useAuthStore((state) => state.token);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    role: 'cashier'
  });

  const [resetPassword, setResetPassword] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/users`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) setUsers(await res.json());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ username: '', password: '', name: '', email: '', role: 'cashier' });
        fetchUsers();
      } else {
        const error = await res.json();
        alert(error.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    
    try {
      const res = await fetch(`${API_URL}/users/${selectedUser.id}/reset-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ newPassword: resetPassword })
      });
      if (res.ok) {
        setIsResetModalOpen(false);
        setResetPassword('');
        alert('Password berhasil direset!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Nonaktifkan pengguna ini?')) return;
    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8 h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            Manajemen Pengguna
          </h1>
          <p className="text-text-muted mt-1">Kelola akses akun admin dan kasir.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary py-2.5 px-5 flex items-center gap-2"
        >
          <Plus size={20} /> Tambah Pengguna
        </button>
      </div>

      <div className="flex-1 glass-card overflow-auto p-4">
        {loading ? (
          <div className="text-center py-10 text-text-muted">Memuat data...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-text-muted text-sm border-b border-white/10">
                <th className="pb-3 px-4 font-medium">Username</th>
                <th className="pb-3 px-4 font-medium">Nama Lengkap</th>
                <th className="pb-3 px-4 font-medium">Role</th>
                <th className="pb-3 px-4 font-medium">Status</th>
                <th className="pb-3 px-4 font-medium text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u: any) => (
                <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-4 font-medium text-white">{u.username}</td>
                  <td className="py-4 px-4 text-sm text-text-main">{u.name || '-'}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs rounded-lg font-medium border ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-400 border-purple-500/20' : 'bg-blue-500/20 text-blue-400 border-blue-500/20'}`}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs rounded-lg font-medium border ${u.is_active ? 'bg-green-500/20 text-green-400 border-green-500/20' : 'bg-red-500/20 text-red-400 border-red-500/20'}`}>
                      {u.is_active ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => { setSelectedUser(u); setIsResetModalOpen(true); }}
                        className="p-2 text-yellow-400 hover:bg-yellow-400/20 rounded-lg transition-colors"
                        title="Reset Password"
                      >
                        <KeyRound size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(u.id)}
                        disabled={!u.is_active}
                        className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors disabled:opacity-50"
                        title="Nonaktifkan"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Add User */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md overflow-hidden flex flex-col">
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-surface-dark/50">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <UserCog className="text-blue-400" /> Tambah Pengguna
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Username</label>
                <input 
                  type="text" required
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full bg-surface-dark border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Password</label>
                <input 
                  type="password" required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-surface-dark border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Nama Lengkap</label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-surface-dark border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Role</label>
                <select 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-surface-dark border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="cashier">Kasir</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div className="mt-8 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white hover:bg-white/5">Batal</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-medium">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Reset Password */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card w-full max-w-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-white/10 bg-surface-dark/50">
              <h2 className="text-xl font-bold">Reset Password</h2>
              <p className="text-sm text-text-muted">Untuk {selectedUser?.username}</p>
            </div>
            <form onSubmit={handleResetPassword} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Password Baru</label>
                <input 
                  type="password" required
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                  className="w-full bg-surface-dark border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
                />
              </div>
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setIsResetModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white hover:bg-white/5">Batal</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-medium">Reset</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
