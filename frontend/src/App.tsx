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
    if (theme === 'dark') {
      document.documentElement.classList.add('theme-dark', 'dark');
      document.documentElement.classList.remove('theme-light');
    } else {
      document.documentElement.classList.remove('theme-dark', 'dark');
      document.documentElement.classList.add('theme-light');
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
      {/* Sidebar - Solid Clean */}
      <div className="w-64 bg-surface flex flex-col z-20 border-r border-border relative no-print shadow-sm">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-extrabold tracking-tight text-brand-600 flex items-center gap-2">
            <span className="material-icons text-brand-500">point_of_sale</span> ADOL<span className="text-text-main font-light text-xl">POS</span>
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {user?.role === 'admin' && (
            <Link to="/" className="block py-3 px-4 rounded-xl hover:bg-surface-dark transition-colors font-medium flex items-center gap-3"><span className="material-icons text-xl">dashboard</span> Dashboard</Link>
          )}
          <Link to="/tables" className="flex items-center gap-3 py-3 px-4 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20 font-bold hover:bg-brand-500/20"><span className="material-icons text-xl">table_restaurant</span> Pilih Meja / Table</Link>
          <Link to="/pos" className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-surface-dark transition-colors font-medium"><span className="material-icons text-xl">point_of_sale</span> Kasir (POS)</Link>
          
          {(user?.role === 'admin' || user?.role === 'kitchen') && (
            <Link to="/kitchen" className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-surface-dark transition-colors font-medium text-amber-600 hover:text-amber-500 dark:text-yellow-400/80 dark:hover:text-yellow-400"><span className="material-icons text-xl">soup_kitchen</span> Kitchen Display</Link>
          )}
          
          {user?.role === 'admin' && (
            <>
              {/* Kontak / People Dropdown */}
              <div className="pt-2 pb-1">
                <button 
                  onClick={() => setIsContactsOpen(!isContactsOpen)}
                  className="w-full flex items-center justify-between py-3 px-4 rounded-xl hover:bg-surface-dark transition-colors font-medium text-left"
                >
                  <span className="flex items-center gap-3"><span className="material-icons text-xl">people</span> Kontak & Pengguna</span>
                  <span className={`transform transition-transform ${isContactsOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {isContactsOpen && (
                  <div className="pl-8 pr-4 space-y-1 mt-1 border-l-2 border-border ml-4">
                    <Link to="/customers" className={`flex items-center gap-2 py-2 px-3 rounded-lg text-sm hover:bg-surface-dark transition-colors ${location.pathname === '/customers' ? 'bg-surface-dark text-orange-600 dark:text-orange-400 font-medium' : 'text-text-muted hover:text-text-main'}`}><span className="material-icons text-base">loyalty</span> Konsumen / Pelanggan</Link>
                    <Link to="/users" className={`flex items-center gap-2 py-2 px-3 rounded-lg text-sm hover:bg-surface-dark transition-colors ${location.pathname === '/users' ? 'bg-surface-dark text-brand-600 dark:text-blue-400 font-medium' : 'text-text-muted hover:text-text-main'}`}><span className="material-icons text-base">badge</span> Staff / Admin</Link>
                  </div>
                )}
              </div>
              <div className="pt-2 pb-1">
                <button 
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="w-full flex items-center justify-between py-3 px-4 rounded-xl hover:bg-surface-dark transition-colors font-medium text-left"
                >
                  <span className="flex items-center gap-3"><span className="material-icons text-xl">inventory_2</span> Products</span>
                  <span className={`transform transition-transform ${isProductsOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {isProductsOpen && (
                  <div className="pl-8 pr-4 space-y-1 mt-1 border-l-2 border-border ml-4">
                    <Link to="/products/list" className={`block py-2 px-3 rounded-lg text-sm hover:bg-surface-light transition-colors ${location.pathname === '/products/list' ? 'bg-surface-light text-brand-600 dark:text-brand-400 font-medium' : 'text-text-muted hover:text-text-main'}`}>List Products</Link>
                    <Link to="/products/add" className={`block py-2 px-3 rounded-lg text-sm hover:bg-surface-light transition-colors ${location.pathname === '/products/add' ? 'bg-surface-light text-brand-600 dark:text-brand-400 font-medium' : 'text-text-muted hover:text-text-main'}`}>Add Product</Link>
                    <Link to="/products/categories" className={`block py-2 px-3 rounded-lg text-sm hover:bg-surface-light transition-colors ${location.pathname === '/products/categories' ? 'bg-surface-light text-brand-600 dark:text-brand-400 font-medium' : 'text-text-muted hover:text-text-main'}`}>Categories</Link>
                    <Link to="/products/variations" className={`block py-2 px-3 rounded-lg text-sm hover:bg-surface-light transition-colors ${location.pathname === '/products/variations' ? 'bg-surface-light text-brand-600 dark:text-brand-400 font-medium' : 'text-text-muted hover:text-text-main'}`}>Variations</Link>
                    <Link to="/products/units" className={`block py-2 px-3 rounded-lg text-sm hover:bg-surface-light transition-colors ${location.pathname === '/products/units' ? 'bg-surface-light text-brand-600 dark:text-brand-400 font-medium' : 'text-text-muted hover:text-text-main'}`}>Units</Link>
                    <Link to="/products/brands" className={`block py-2 px-3 rounded-lg text-sm hover:bg-surface-light transition-colors ${location.pathname === '/products/brands' ? 'bg-surface-light text-brand-600 dark:text-brand-400 font-medium' : 'text-text-muted hover:text-text-main'}`}>Brands</Link>
                    <Link to="/products/warranties" className={`block py-2 px-3 rounded-lg text-sm hover:bg-surface-light transition-colors ${location.pathname === '/products/warranties' ? 'bg-surface-light text-brand-600 dark:text-brand-400 font-medium' : 'text-text-muted hover:text-text-main'}`}>Warranties</Link>
                  </div>
                )}
              </div>
              <Link to="/expenses" className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-surface-dark transition-colors font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"><span className="material-icons text-xl">account_balance_wallet</span> Pengeluaran</Link>
            </>
          )}
        </nav>
        <div className="p-6 border-t border-border bg-surface-dark/30">
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
              className="p-2 rounded-full bg-surface border border-border text-text-main hover:bg-surface-light transition-colors"
              title="Toggle Theme"
            >
              <span className="material-icons text-lg">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
            </button>
          </div>
          <button onClick={handleLogout} className="w-full btn-secondary py-2 text-sm text-red-600 hover:text-red-500 border-red-500/20 hover:border-red-500/50 hover:bg-red-500/5 dark:hover:bg-red-500/10">
            Log Out
          </button>
        </div>
      </div>
      <div className="flex-1 relative overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-brand-600/5 dark:bg-brand-600/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none no-print"></div>
        <div className="absolute -bottom-40 -right-20 w-[600px] h-[600px] bg-purple-600/5 dark:bg-purple-600/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none no-print"></div>
        
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
