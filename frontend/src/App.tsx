import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { Login } from './pages/Login';
import { ListProducts } from './pages/products/ListProducts';
import { AddProduct } from './pages/products/AddProduct';
import { POS } from './pages/POS';
import { TableMap } from './pages/TableMap';
import { KitchenMonitor } from './pages/KitchenMonitor';
import { Expenses } from './pages/Expenses';
import { UserManagement } from './pages/UserManagement';
import { CustomerManagement } from './pages/CustomerManagement';
import { Units } from './pages/products/Units';
import { Brands } from './pages/products/Brands';
import { Warranties } from './pages/products/Warranties';
import { Variations } from './pages/products/Variations';
import { Categories } from './pages/products/Categories';
import { EditProduct } from './pages/products/EditProduct';
import { useAuthStore } from './stores/authStore';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProductsOpen, setIsProductsOpen] = useState(location.pathname.startsWith('/products'));
  const [isContactsOpen, setIsContactsOpen] = useState(location.pathname === '/customers' || location.pathname === '/users');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('theme-light');
    } else {
      document.documentElement.classList.remove('theme-light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-background text-text-main overflow-hidden">
      {/* Sidebar - Glassmorphism */}
      <div className="w-64 glass flex flex-col z-20 border-r border-white/5 relative no-print">
        <div className="p-6">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
            ADOL<span className="text-text-main font-light text-xl ml-1">POS</span>
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {user?.role === 'admin' && (
            <Link to="/" className="block py-3 px-4 rounded-xl hover:bg-white/10 transition-colors font-medium">📊 Dashboard</Link>
          )}
          <Link to="/tables" className="block py-3 px-4 rounded-xl bg-brand-600/20 text-brand-300 border border-brand-500/30 font-bold shadow-[0_0_15px_rgba(59,130,246,0.2)]">🪑 Pilih Meja / Table</Link>
          <Link to="/pos" className="block py-3 px-4 rounded-xl hover:bg-white/10 transition-colors font-medium">💻 Kasir (POS)</Link>
          
          {(user?.role === 'admin' || user?.role === 'kitchen') && (
            <Link to="/kitchen" className="block py-3 px-4 rounded-xl hover:bg-white/10 transition-colors font-medium text-yellow-400/80 hover:text-yellow-400">🔥 Kitchen Display</Link>
          )}
          
          {user?.role === 'admin' && (
            <>
              {/* Kontak / People Dropdown */}
              <div className="pt-2 pb-1">
                <button 
                  onClick={() => setIsContactsOpen(!isContactsOpen)}
                  className="w-full flex items-center justify-between py-3 px-4 rounded-xl hover:bg-white/10 transition-colors font-medium text-left"
                >
                  <span>👥 Kontak & Pengguna</span>
                  <span className={`transform transition-transform ${isContactsOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {isContactsOpen && (
                  <div className="pl-8 pr-4 space-y-1 mt-1 border-l-2 border-white/5 ml-4">
                    <Link to="/customers" className={`block py-2 px-3 rounded-lg text-sm hover:bg-white/10 transition-colors ${location.pathname === '/customers' ? 'bg-white/10 text-orange-400' : 'text-orange-400/70 hover:text-orange-300'}`}>🏅 Konsumen / Pelanggan</Link>
                    <Link to="/users" className={`block py-2 px-3 rounded-lg text-sm hover:bg-white/10 transition-colors ${location.pathname === '/users' ? 'bg-white/10 text-blue-400' : 'text-blue-400/70 hover:text-blue-300'}`}>👨‍💼 Staff / Admin</Link>
                  </div>
                )}
              </div>
              <div className="pt-2 pb-1">
                <button 
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="w-full flex items-center justify-between py-3 px-4 rounded-xl hover:bg-white/10 transition-colors font-medium text-left"
                >
                  <span>📦 Products</span>
                  <span className={`transform transition-transform ${isProductsOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {isProductsOpen && (
                  <div className="pl-8 pr-4 space-y-1 mt-1 border-l-2 border-[var(--color-border)] ml-4">
                    <Link to="/products/list" className={`block py-2 px-3 rounded-lg text-sm hover:bg-surface-light transition-colors ${location.pathname === '/products/list' ? 'bg-surface-light text-brand-400' : 'text-text-muted hover:text-text-main'}`}>List Products</Link>
                    <Link to="/products/add" className={`block py-2 px-3 rounded-lg text-sm hover:bg-surface-light transition-colors ${location.pathname === '/products/add' ? 'bg-surface-light text-brand-400' : 'text-text-muted hover:text-text-main'}`}>Add Product</Link>
                    <Link to="/products/categories" className={`block py-2 px-3 rounded-lg text-sm hover:bg-surface-light transition-colors ${location.pathname === '/products/categories' ? 'bg-surface-light text-brand-400' : 'text-text-muted hover:text-text-main'}`}>Categories</Link>
                    <Link to="/products/variations" className={`block py-2 px-3 rounded-lg text-sm hover:bg-surface-light transition-colors ${location.pathname === '/products/variations' ? 'bg-surface-light text-brand-400' : 'text-text-muted hover:text-text-main'}`}>Variations</Link>
                    <Link to="/products/units" className={`block py-2 px-3 rounded-lg text-sm hover:bg-surface-light transition-colors ${location.pathname === '/products/units' ? 'bg-surface-light text-brand-400' : 'text-text-muted hover:text-text-main'}`}>Units</Link>
                    <Link to="/products/brands" className={`block py-2 px-3 rounded-lg text-sm hover:bg-surface-light transition-colors ${location.pathname === '/products/brands' ? 'bg-surface-light text-brand-400' : 'text-text-muted hover:text-text-main'}`}>Brands</Link>
                    <Link to="/products/warranties" className={`block py-2 px-3 rounded-lg text-sm hover:bg-surface-light transition-colors ${location.pathname === '/products/warranties' ? 'bg-surface-light text-brand-400' : 'text-text-muted hover:text-text-main'}`}>Warranties</Link>
                  </div>
                )}
              </div>
              <Link to="/expenses" className="block py-3 px-4 rounded-xl hover:bg-white/10 transition-colors font-medium text-red-400 hover:text-red-300">💸 Pengeluaran</Link>
            </>
          )}
        </nav>
        <div className="p-6 border-t border-[var(--color-border)] bg-surface-dark/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center font-bold shadow-lg shadow-brand-500/30 text-white">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-text-main">{user?.name}</p>
                <p className="text-xs text-text-muted capitalize">{user?.role}</p>
              </div>
            </div>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-surface border border-[var(--color-border)] text-text-main hover:bg-surface-light transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
          </div>
          <button onClick={handleLogout} className="w-full btn-secondary py-2 text-sm text-red-400 hover:text-red-300 border-red-500/20 hover:border-red-500/50 hover:bg-red-500/10">
            Log Out
          </button>
        </div>
      </div>
      <div className="flex-1 relative overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-brand-600/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none no-print"></div>
        <div className="absolute -bottom-40 -right-20 w-[600px] h-[600px] bg-purple-600/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none no-print"></div>
        
        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

import { Dashboard } from './pages/Dashboard';

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.token);
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <DashboardLayout><Dashboard /></DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tables" 
          element={
            <ProtectedRoute>
              <DashboardLayout><TableMap /></DashboardLayout>
            </ProtectedRoute>
          } 
        />

        {/* New Product Settings Routes */}
        <Route path="/products/categories" element={<ProtectedRoute><DashboardLayout><Categories /></DashboardLayout></ProtectedRoute>} />
        <Route path="/products/units" element={<ProtectedRoute><DashboardLayout><Units /></DashboardLayout></ProtectedRoute>} />
        <Route path="/products/brands" element={<ProtectedRoute><DashboardLayout><Brands /></DashboardLayout></ProtectedRoute>} />
        <Route path="/products/warranties" element={<ProtectedRoute><DashboardLayout><Warranties /></DashboardLayout></ProtectedRoute>} />
        <Route path="/products/variations" element={<ProtectedRoute><DashboardLayout><Variations /></DashboardLayout></ProtectedRoute>} />
        <Route path="/products/list" element={<ProtectedRoute><DashboardLayout><ListProducts /></DashboardLayout></ProtectedRoute>} />
        <Route path="/products/add" element={<ProtectedRoute><DashboardLayout><AddProduct /></DashboardLayout></ProtectedRoute>} />
        <Route path="/products/edit/:id" element={<ProtectedRoute><DashboardLayout><EditProduct /></DashboardLayout></ProtectedRoute>} />
        <Route path="/items" element={<Navigate to="/products/list" replace />} />
        <Route 
          path="/expenses" 
          element={
            <ProtectedRoute>
              <DashboardLayout><Expenses /></DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/users" 
          element={
            <ProtectedRoute>
              <DashboardLayout><UserManagement /></DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/customers" 
          element={
            <ProtectedRoute>
              <DashboardLayout><CustomerManagement /></DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/pos" 
          element={
            <ProtectedRoute>
              <DashboardLayout><POS /></DashboardLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/kitchen" 
          element={
            <ProtectedRoute>
              <DashboardLayout><KitchenMonitor /></DashboardLayout>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
