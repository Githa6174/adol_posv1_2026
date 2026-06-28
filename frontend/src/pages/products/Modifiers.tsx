import { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';

const API_URL = 'http://localhost:3001/api';

interface ModifierOption {
  id?: number;
  name: string;
  price: number;
}

interface ModifierGroup {
  id: number;
  name: string;
  is_required: boolean;
  allow_multiple: boolean;
  max_select: number;
  print_on_receipt: boolean;
  options: ModifierOption[];
}

export function Modifiers() {
  const { token } = useAuthStore();
  const [groups, setGroups] = useState<ModifierGroup[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    is_required: false,
    allow_multiple: false,
    max_select: 1,
    print_on_receipt: true,
    options: [{ name: '', price: 0 }] as ModifierOption[]
  });

  const fetchGroups = async () => {
    try {
      const res = await fetch(`${API_URL}/product-settings/modifiers`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setGroups(await res.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchGroups(); }, []);

  const resetForm = () => {
    setFormData({
      id: 0, name: '', is_required: false, allow_multiple: false,
      max_select: 1, print_on_receipt: true,
      options: [{ name: '', price: 0 }]
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = formData.id ? 'PUT' : 'POST';
    const url = formData.id
      ? `${API_URL}/product-settings/modifiers/${formData.id}`
      : `${API_URL}/product-settings/modifiers`;

    const validOptions = formData.options.filter(o => o.name.trim().length > 0);
    if (validOptions.length === 0) return;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: formData.name,
          is_required: formData.is_required,
          allow_multiple: formData.allow_multiple,
          max_select: formData.max_select,
          print_on_receipt: formData.print_on_receipt,
          options: validOptions
        })
      });
      if (res.ok) {
        setShowModal(false);
        fetchGroups();
      }
    } catch (err) { console.error(err); }
  };

  const handleEdit = (group: ModifierGroup) => {
    setFormData({
      id: group.id,
      name: group.name,
      is_required: group.is_required,
      allow_multiple: group.allow_multiple,
      max_select: group.max_select,
      print_on_receipt: group.print_on_receipt,
      options: group.options.length > 0
        ? group.options.map(o => ({ name: o.name, price: o.price }))
        : [{ name: '', price: 0 }]
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus modifier group ini?')) return;
    try {
      await fetch(`${API_URL}/product-settings/modifiers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchGroups();
    } catch (err) {}
  };

  const addOptionRow = () => {
    setFormData({ ...formData, options: [...formData.options, { name: '', price: 0 }] });
  };

  const removeOptionRow = (idx: number) => {
    if (formData.options.length <= 1) return;
    const newOpts = formData.options.filter((_, i) => i !== idx);
    setFormData({ ...formData, options: newOpts });
  };

  const updateOption = (idx: number, field: string, value: any) => {
    const newOpts = [...formData.options];
    (newOpts[idx] as any)[field] = value;
    setFormData({ ...formData, options: newOpts });
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-text-main mb-2">Modifiers</h1>
          <p className="text-text-muted">Kelola modifier (Extra Topping, Level Pedas, dll) untuk produk</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-brand-500/30 flex items-center gap-2"
        >
          <span className="material-icons text-lg">add</span> Tambah Modifier
        </button>
      </div>

      <div className="glass rounded-3xl p-6 border border-border">
        <table className="w-full text-left text-text-main">
          <thead>
            <tr className="border-b border-border">
              <th className="py-4 font-semibold text-text-muted">Nama Group</th>
              <th className="py-4 font-semibold text-text-muted">Opsi</th>
              <th className="py-4 font-semibold text-text-muted text-center">Wajib</th>
              <th className="py-4 font-semibold text-text-muted text-center">Multi</th>
              <th className="py-4 font-semibold text-text-muted text-center">Print Receipt</th>
              <th className="py-4 font-semibold text-text-muted text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {groups.map(g => (
              <tr key={g.id} className="border-b border-border hover:bg-surface-dark transition-colors">
                <td className="py-4 font-medium">{g.name}</td>
                <td className="py-4 text-text-muted">
                  <div className="flex gap-2 flex-wrap">
                    {g.options?.map((opt: any) => (
                      <span key={opt.id} className="bg-surface-dark border border-border px-2 py-1 rounded text-xs text-text-main">
                        {opt.name} {opt.price > 0 && <span className="text-brand-500 font-semibold ml-1">+Rp {opt.price.toLocaleString('id-ID')}</span>}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-4 text-center">
                  {g.is_required
                    ? <span className="material-icons text-brand-500 text-lg">check_circle</span>
                    : <span className="material-icons text-text-muted/30 text-lg">radio_button_unchecked</span>}
                </td>
                <td className="py-4 text-center">
                  {g.allow_multiple
                    ? <span className="text-xs bg-brand-50 text-brand-600 border border-brand-200 px-2 py-1 rounded font-bold">Max {g.max_select}</span>
                    : <span className="text-xs text-text-muted">1 only</span>}
                </td>
                <td className="py-4 text-center">
                  {g.print_on_receipt
                    ? <span className="material-icons text-brand-500 text-lg">print</span>
                    : <span className="material-icons text-text-muted/30 text-lg">print_disabled</span>}
                </td>
                <td className="py-4 text-right">
                  <button onClick={() => handleEdit(g)} className="text-blue-500 hover:underline mr-4 font-medium transition-colors">Edit</button>
                  <button onClick={() => handleDelete(g.id)} className="text-red-500 hover:underline font-medium transition-colors">Delete</button>
                </td>
              </tr>
            ))}
            {groups.length === 0 && (
              <tr><td colSpan={6} className="py-8 text-center text-text-muted">Belum ada modifier group.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-3xl p-8 w-full max-w-lg border border-border shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-text-main mb-6">{formData.id ? 'Edit Modifier Group' : 'Tambah Modifier Group'}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Nama Group</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-field w-full" placeholder="Contoh: Level Pedas, Extra Topping" />
              </div>

              <div className="bg-surface-dark/50 rounded-2xl p-5 border border-border space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-main">Opsi Modifier</label>
                  <button type="button" onClick={addOptionRow} className="text-brand-500 hover:text-brand-400 text-sm font-bold flex items-center gap-1 transition-colors">
                    <span className="material-icons text-sm">add</span> Tambah Opsi
                  </button>
                </div>
                {formData.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={opt.name}
                      onChange={e => updateOption(idx, 'name', e.target.value)}
                      className="input-field flex-1"
                      placeholder="Nama opsi"
                    />
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-xs font-bold">Rp</span>
                      <input
                        type="number"
                        value={opt.price}
                        onChange={e => updateOption(idx, 'price', Number(e.target.value))}
                        className="input-field w-32 pl-9"
                        placeholder="0"
                        min="0"
                      />
                    </div>
                    {formData.options.length > 1 && (
                      <button type="button" onClick={() => removeOptionRow(idx)} className="text-red-500 hover:text-red-400 transition-colors p-1">
                        <span className="material-icons text-lg">close</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-3 p-4 bg-surface-dark/40 rounded-xl border border-border cursor-pointer hover:bg-surface-dark transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.is_required}
                    onChange={e => setFormData({...formData, is_required: e.target.checked})}
                    className="w-5 h-5 rounded border-border bg-background text-brand-500 focus:ring-brand-500 cursor-pointer"
                  />
                  <div>
                    <div className="text-sm font-bold text-text-main">Wajib Dipilih</div>
                    <div className="text-xs text-text-muted">Kasir harus pilih minimal 1</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-surface-dark/40 rounded-xl border border-border cursor-pointer hover:bg-surface-dark transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.allow_multiple}
                    onChange={e => setFormData({...formData, allow_multiple: e.target.checked})}
                    className="w-5 h-5 rounded border-border bg-background text-brand-500 focus:ring-brand-500 cursor-pointer"
                  />
                  <div>
                    <div className="text-sm font-bold text-text-main">Pilih Lebih dari 1</div>
                    <div className="text-xs text-text-muted">Boleh pilih beberapa opsi</div>
                  </div>
                </label>
              </div>

              {formData.allow_multiple && (
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Maksimal Pilihan</label>
                  <input
                    type="number"
                    value={formData.max_select}
                    onChange={e => setFormData({...formData, max_select: Number(e.target.value)})}
                    min="1"
                    className="input-field w-full"
                  />
                </div>
              )}

              <label className="flex items-center gap-3 p-4 bg-surface-dark/40 rounded-xl border border-border cursor-pointer hover:bg-surface-dark transition-colors">
                <input
                  type="checkbox"
                  checked={formData.print_on_receipt}
                  onChange={e => setFormData({...formData, print_on_receipt: e.target.checked})}
                  className="w-5 h-5 rounded border-border bg-background text-brand-500 focus:ring-brand-500 cursor-pointer"
                />
                <div>
                  <div className="text-sm font-bold text-text-main flex items-center gap-2">
                    <span className="material-icons text-sm">print</span> Print di Receipt
                  </div>
                  <div className="text-xs text-text-muted">Tampilkan detail modifier di struk dan kitchen ticket</div>
                </div>
              </label>

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
