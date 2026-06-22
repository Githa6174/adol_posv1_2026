import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:3001/api';

export function ListProducts() {
  const { token } = useAuthStore();
  const [items, setItems] = useState<any[]>([]);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_URL}/items`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setItems(await res.json());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;
    try {
      const res = await fetch(`${API_URL}/items/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchItems();
    } catch (err) {}
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-text-main mb-2">List Products</h1>
          <p className="text-text-muted">Kelola seluruh produk, stok, dan harga.</p>
        </div>
        <Link 
          to="/products/add"
          className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl font-bold transition-colors"
        >
          + Tambah Produk Baru
        </Link>
      </div>
      
      <div className="bg-surface rounded-3xl p-6 border border-border overflow-x-auto">
        <table className="w-full text-left text-text-main whitespace-nowrap">
          <thead>
            <tr className="border-b border-border">
              <th className="py-4 font-semibold text-text-muted">Produk</th>
              <th className="py-4 font-semibold text-text-muted">Kategori</th>
              <th className="py-4 font-semibold text-text-muted">Tipe</th>
              <th className="py-4 font-semibold text-text-muted">Brand / Unit</th>
              <th className="py-4 font-semibold text-text-muted">Stok</th>
              <th className="py-4 font-semibold text-text-muted">Harga Jual</th>
              <th className="py-4 font-semibold text-text-muted text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-text-muted">
                  Belum ada produk.
                </td>
              </tr>
            ) : (
              items.map(item => (
                <tr key={item.id} className="border-b border-border hover:bg-surface-dark transition-colors">
                  <td className="py-4">
                    <div className="font-bold">{item.name}</div>
                    <div className="text-xs text-brand-600 dark:text-brand-300">SKU: {item.sku}</div>
                  </td>
                  <td className="py-4">{item.category?.name || '-'}</td>
                  <td className="py-4 capitalize">{item.type}</td>
                  <td className="py-4 text-sm">
                    {item.brand?.name || '-'}<br/>
                    <span className="text-text-muted">{item.unit?.name || '-'}</span>
                  </td>
                  <td className="py-4 font-mono">
                    {item.type === 'variable' 
                      ? item.variations?.reduce((sum:any, v:any) => sum + (v.stock||0), 0)
                      : (item.manage_stock ? item.current_stock : 'N/A')}
                  </td>
                  <td className="py-4 font-bold text-green-600 dark:text-green-400">
                    Rp {item.price_level_1?.toLocaleString('id-ID') || 0}
                  </td>
                  <td className="py-4 text-right">
                    <Link to={`/products/edit/${item.id}`} className="text-blue-500 hover:underline mr-4 font-medium">Edit</Link>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline font-medium">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
