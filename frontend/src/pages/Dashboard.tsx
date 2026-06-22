import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { DollarSign, ShoppingBag, TrendingUp, Users, Calendar, ArrowDownRight, ArrowUpRight } from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

export function Dashboard() {
  const token = useAuthStore((state) => state.token);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams({ startDate, endDate }).toString();
        const response = await fetch(`${API_URL}/reports/dashboard?${query}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch report');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [token, startDate, endDate]);

  if (loading && !data) return <div className="p-8 text-center">Memuat Data Analitik...</div>;
  if (!data) return <div className="p-8 text-center text-red-500">Gagal memuat data.</div>;

  return (
    <div className="p-8 overflow-y-auto h-full pb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-600">
            Ringkasan Penjualan
          </h1>
          <p className="text-text-muted mt-1">Pantau performa bisnis Anda secara real-time</p>
        </div>
        
        <div className="flex items-center gap-2 bg-surface-dark border border-border rounded-xl p-2">
          <Calendar size={18} className="text-text-muted ml-2" />
          <input 
            type="date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-transparent text-text-main text-sm focus:outline-none px-2"
          />
          <span className="text-text-muted">-</span>
          <input 
            type="date" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-transparent text-text-main text-sm focus:outline-none px-2"
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-card p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-text-muted text-sm font-medium mb-1">Total Penjualan</p>
              <h3 className="text-2xl font-bold text-text-main">
                Rp {data.totalSales?.toLocaleString('id-ID')}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
              <ShoppingBag size={24} />
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-text-muted text-sm font-medium mb-1">Total Pengeluaran</p>
              <h3 className="text-2xl font-bold text-red-400">
                Rp {data.totalExpense?.toLocaleString('id-ID')}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
              <ArrowDownRight size={24} />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 border border-brand-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/10 rounded-full filter blur-xl"></div>
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-text-muted text-sm font-medium mb-1">Laba Bersih (Net Profit)</p>
              <h3 className="text-2xl font-bold text-text-main">
                Rp {data.netSales?.toLocaleString('id-ID')}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-brand-500/30 flex items-center justify-center text-brand-500 dark:text-brand-300">
              <ArrowUpRight size={24} />
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-text-muted text-sm font-medium mb-1">Total Pesanan</p>
              <h3 className="text-2xl font-bold text-text-main">
                {data.totalOrderCount} <span className="text-sm font-normal text-text-muted">transaksi</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>
        <div className="glass-card p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-text-muted text-sm font-medium mb-1">Pelanggan Aktif</p>
              <h3 className="text-2xl font-bold text-text-main">
                {data.activeTablesCount || 0} <span className="text-sm font-normal text-text-muted">meja terisi</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
              <Users size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-brand-400" /> Grafik Penjualan
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.salesTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" tickFormatter={(value) => `Rp ${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                  labelStyle={{ color: 'var(--color-text-main)' }}
                  itemStyle={{ color: '#3b82f6' }}
                  formatter={(value: any) => ['Rp ' + value?.toLocaleString('id-ID'), 'Pendapatan']}
                />
                <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods Breakdown */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <DollarSign size={20} className="text-green-400" /> Metode Pembayaran
          </h3>
          {data.paymentBreakdown?.length > 0 ? (
            <div className="h-[200px] w-full mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.paymentBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="amount"
                  >
                    {data.paymentBreakdown.map((_: any, index: number) => {
                      const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
                      return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />;
                    })}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => ['Rp ' + value?.toLocaleString('id-ID'), 'Total']}
                    contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                    labelStyle={{ color: 'var(--color-text-main)' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-text-muted text-sm">
              Belum ada data pembayaran hari ini.
            </div>
          )}
          <div className="space-y-3 border-t border-border pt-4">
            {data.paymentBreakdown?.map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-text-main font-medium">{item.name}</span>
                <span className="text-brand-600 dark:text-brand-300 font-bold">Rp {item.amount.toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Best Sellers */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <ShoppingBag size={20} className="text-brand-400" /> Menu Terlaris
          </h3>
          <div className="space-y-4">
            {data.bestSellers.map((item: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-surface-dark/40 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-brand-500/10 text-brand-600 dark:bg-brand-600/20 dark:text-brand-400 flex items-center justify-center font-bold">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-text-main">{item.name}</p>
                    <p className="text-xs text-text-muted">{item.quantity} terjual</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-brand-600 dark:text-brand-300">Rp {item.revenue.toLocaleString('id-ID')}</p>
                </div>
              </div>
            ))}
            {data.bestSellers.length === 0 && (
              <p className="text-text-muted text-center text-sm mt-8">Belum ada data penjualan.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
