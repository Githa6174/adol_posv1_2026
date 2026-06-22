import { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3001/api';

export function AddProduct() {
  const { token } = useAuthStore();
  const navigate = useNavigate();

  // Reference Data
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [variationTemplates, setVariationTemplates] = useState<any[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    code: '', // internal code
    barcode_type: 'C128',
    category_id: '',
    brand_id: '',
    unit_id: '',
    warranty_id: '',
    manage_stock: false,
    alert_quantity: 0,
    current_stock: 0,
    type: 'single', // single or variable
    price_level_1: 0,
    price_level_2: 0,
    price_level_3: 0,
    price_level_4: 0,
    price_level_5: 0,
    tax_percentage: 0,
    service_percentage: 0
  });

  // Variables for variable product
  const [generatedVariations, setGeneratedVariations] = useState<any[]>([]);

  useEffect(() => {
    // Fetch all required references
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [catRes, brandRes, unitRes, varRes] = await Promise.all([
          fetch(`${API_URL}/items/categories`, { headers }),
          fetch(`${API_URL}/product-settings/brands`, { headers }),
          fetch(`${API_URL}/product-settings/units`, { headers }),
          fetch(`${API_URL}/product-settings/variations`, { headers })
        ]);

        if (catRes.ok) setCategories(await catRes.json());
        if (brandRes.ok) setBrands(await brandRes.json());
        if (unitRes.ok) setUnits(await unitRes.json());
        if (varRes.ok) setVariationTemplates(await varRes.json());
      } catch (err) {
        console.error('Failed to load references', err);
      }
    };
    fetchData();
  }, []);

  const handleVariationSelect = (templateId: string) => {
    const template = variationTemplates.find(v => v.id.toString() === templateId);
    
    if (template) {
      // Auto generate variations options
      const rows = template.options.map((opt: any) => ({
        variation_option_id: opt.id,
        option_name: opt.name,
        sku: `${formData.sku || 'SKU'}-${opt.name.toUpperCase()}`,
        sell_price_inc_tax: formData.price_level_1 || 0,
        stock: 0
      }));
      setGeneratedVariations(rows);
    } else {
      setGeneratedVariations([]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      category_id: formData.category_id ? Number(formData.category_id) : null,
      brand_id: formData.brand_id ? Number(formData.brand_id) : null,
      unit_id: formData.unit_id ? Number(formData.unit_id) : null,
      warranty_id: formData.warranty_id ? Number(formData.warranty_id) : null,
      variations: formData.type === 'variable' ? generatedVariations : []
    };

    try {
      const res = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        navigate('/products/list');
      } else {
        const error = await res.json();
        alert(`Failed to save: ${error.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Network error while saving');
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto pb-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-text-main mb-2">Add New Product</h1>
          <p className="text-text-muted">Isi form di bawah ini untuk menambahkan produk baru ke sistem.</p>
        </div>
        <button onClick={() => navigate('/products/list')} className="text-text-muted hover:text-text-main transition-colors underline">
          Kembali ke List
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: General Info */}
        <div className="glass rounded-3xl p-8 border border-border">
          <h2 className="text-2xl font-bold text-text-main mb-6 border-b border-border pb-4">General Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Product Name *</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-field w-full" placeholder="Nama Produk" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">SKU (Stock Keeping Unit)</label>
              <input type="text" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} className="input-field w-full" placeholder="Biarkan kosong untuk generate otomatis" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Barcode Type</label>
              <select value={formData.barcode_type} onChange={e => setFormData({...formData, barcode_type: e.target.value})} className="input-field w-full">
                <option value="C128" className="bg-surface text-text-main">CODE 128 (Default)</option>
                <option value="C39" className="bg-surface text-text-main">CODE 39</option>
                <option value="EAN13" className="bg-surface text-text-main">EAN-13</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Category</label>
              <select value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})} className="input-field w-full">
                <option value="" className="bg-surface text-text-main">Pilih Kategori...</option>
                {categories.map(c => <option key={c.id} value={c.id} className="bg-surface text-text-main">{c.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Brand</label>
              <select value={formData.brand_id} onChange={e => setFormData({...formData, brand_id: e.target.value})} className="input-field w-full">
                <option value="" className="bg-surface text-text-main">Pilih Brand...</option>
                {brands.map(b => <option key={b.id} value={b.id} className="bg-surface text-text-main">{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Unit</label>
              <select value={formData.unit_id} onChange={e => setFormData({...formData, unit_id: e.target.value})} className="input-field w-full">
                <option value="" className="bg-surface text-text-main">Pilih Satuan...</option>
                {units.map(u => <option key={u.id} value={u.id} className="bg-surface text-text-main">{u.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Product Type & Variations */}
        <div className="glass rounded-3xl p-8 border border-border">
          <h2 className="text-2xl font-bold text-text-main mb-6 border-b border-border pb-4">Tipe Produk & Variasi</h2>
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-muted mb-2">Product Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-text-main cursor-pointer p-4 border border-border rounded-xl hover:bg-surface-dark flex-1 text-center justify-center transition-colors">
                <input type="radio" name="type" value="single" checked={formData.type === 'single'} onChange={() => setFormData({...formData, type: 'single'})} />
                Single (Standar)
              </label>
              <label className="flex items-center gap-2 text-text-main cursor-pointer p-4 border border-brand-500/20 rounded-xl hover:bg-brand-500/5 flex-1 text-center justify-center transition-colors">
                <input type="radio" name="type" value="variable" checked={formData.type === 'variable'} onChange={() => setFormData({...formData, type: 'variable'})} />
                Variable (Memiliki Pilihan)
              </label>
            </div>
          </div>

          {formData.type === 'variable' && (
            <div className="mt-6 bg-surface-dark/50 p-6 rounded-2xl border border-border">
              <label className="block text-sm font-medium text-text-muted mb-2">Pilih Template Variasi</label>
              <select onChange={e => handleVariationSelect(e.target.value)} className="input-field w-full mb-6">
                <option value="" className="bg-surface text-text-main">Pilih Variasi...</option>
                {variationTemplates.map(v => <option key={v.id} value={v.id} className="bg-surface text-text-main">{v.name}</option>)}
              </select>

              {generatedVariations.length > 0 && (
                <div className="overflow-x-auto border border-border rounded-2xl">
                  <table className="w-full text-left text-text-main">
                    <thead>
                      <tr className="border-b border-border bg-surface-light">
                        <th className="p-4 text-sm font-semibold text-text-muted">Pilihan</th>
                        <th className="p-4 text-sm font-semibold text-text-muted">SKU</th>
                        <th className="p-4 text-sm font-semibold text-text-muted">Harga Jual</th>
                        <th className="p-4 text-sm font-semibold text-text-muted">Stok</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generatedVariations.map((v, idx) => (
                        <tr key={idx} className="border-b border-border hover:bg-surface-light transition-colors">
                          <td className="p-4 font-bold text-brand-600 dark:text-brand-300">{v.option_name}</td>
                          <td className="p-3 pr-2">
                            <input type="text" value={v.sku} onChange={e => {
                              const newArr = [...generatedVariations];
                              newArr[idx].sku = e.target.value;
                              setGeneratedVariations(newArr);
                            }} className="input-field w-full py-1 text-sm" />
                          </td>
                          <td className="p-3 pr-2">
                            <input type="number" value={v.sell_price_inc_tax} onChange={e => {
                              const newArr = [...generatedVariations];
                              newArr[idx].sell_price_inc_tax = Number(e.target.value);
                              setGeneratedVariations(newArr);
                            }} className="input-field w-full py-1 text-sm" />
                          </td>
                          <td className="p-3">
                            <input type="number" value={v.stock} onChange={e => {
                              const newArr = [...generatedVariations];
                              newArr[idx].stock = Number(e.target.value);
                              setGeneratedVariations(newArr);
                            }} className="input-field w-full py-1 text-sm" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Section 3: Pricing (If Single) */}
        {formData.type === 'single' && (
          <div className="glass rounded-3xl p-8 border border-border">
            <h2 className="text-2xl font-bold text-text-main mb-6 border-b border-border pb-4">Harga & Stok</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Harga Jual Dasar (Level 1)</label>
                <input type="number" value={formData.price_level_1} onChange={e => setFormData({...formData, price_level_1: Number(e.target.value)})} className="input-field w-full text-xl font-bold text-green-600 dark:text-green-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Harga GoFood/GrabFood (Level 2)</label>
                <input type="number" value={formData.price_level_2} onChange={e => setFormData({...formData, price_level_2: Number(e.target.value)})} className="input-field w-full" />
              </div>
              <div className="col-span-2 border-t border-border my-2 pt-4">
                <div className="flex items-center gap-3 mb-4">
                  <input type="checkbox" id="manageStock" checked={formData.manage_stock} onChange={e => setFormData({...formData, manage_stock: e.target.checked})} className="w-5 h-5 rounded border-border bg-background text-brand-500 focus:ring-brand-500 focus:ring-offset-background" />
                  <label htmlFor="manageStock" className="text-text-main font-bold cursor-pointer">Kelola Stok (Manage Stock)</label>
                </div>
                
                {formData.manage_stock && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-dark/30 p-4 rounded-xl border border-border">
                    <div>
                      <label className="block text-sm font-medium text-text-muted mb-2">Stok Saat Ini</label>
                      <input type="number" value={formData.current_stock} onChange={e => setFormData({...formData, current_stock: Number(e.target.value)})} className="input-field w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-muted mb-2">Batas Minimum (Alert)</label>
                      <input type="number" value={formData.alert_quantity} onChange={e => setFormData({...formData, alert_quantity: Number(e.target.value)})} className="input-field w-full" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 sticky bottom-8 pt-4 bg-background/80 backdrop-blur-sm z-10">
          <button type="button" onClick={() => navigate('/products/list')} className="flex-1 btn-secondary py-4 text-lg">Batal</button>
          <button type="submit" className="flex-[2] btn-primary text-white font-bold rounded-2xl shadow-lg shadow-brand-500/20 transition-all transform hover:scale-[1.01] text-lg py-4">
            <span className="material-icons text-xl align-middle mr-1">save</span> Simpan Produk
          </button>
        </div>
      </form>
    </div>
  );
}
