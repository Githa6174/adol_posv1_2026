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
import { ToastContainer } from './components/Common/ToastContainer';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProductsOpen, setIsProductsOpen] = useState(location.pathname.startsWith('/products'));
  const [isContactsOpen, setIsContactsOpen] = useState(location.pathname === '/customers' || location.pathname === '/users');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isCollapsed, setIsCollapsed] = useState(localStorage.getItem('sidebar-collapsed') === 'true');

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

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', String(isCollapsed));
  }, [isCollapsed]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleContactsClick = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setIsContactsOpen(true);
    } else {
      setIsContactsOpen(!isContactsOpen);
    }
  };

  const handleProductsClick = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setIsProductsOpen(true);
    } else {
      setIsProductsOpen(!isProductsOpen);
    }
  };

  return (
    <div className="flex h-screen bg-background text-text-main overflow-hidden">
      {/* Sidebar - Solid Clean */}
      <div className={`bg-surface flex flex-col z-20 border-r border-border relative no-print shadow-sm transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-[280px]'}`}>
        <div className={`border-b border-border flex transition-all duration-300 ${isCollapsed ? 'p-4 flex-col gap-3 items-center' : 'p-6 items-center justify-between'}`}>
          <h1 className="text-2xl font-extrabold tracking-tight text-brand-600 flex items-center gap-2">
            <span className="material-icons text-brand-500">point_of_sale</span>
            {!isCollapsed && (
              <span className="transition-opacity duration-300">
                ADOL<span className="text-text-main font-light text-xl">POS</span>
              </span>
            )}
          </h1>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`hover:bg-surface-dark text-text-muted hover:text-text-main transition-colors flex items-center justify-center cursor-pointer rounded-lg ${isCollapsed ? 'p-1' : 'p-1.5 bg-surface-dark border border-border'}`}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <span className="material-icons text-lg font-bold">
              {isCollapsed ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto no-scrollbar">
          {user?.role === 'admin' && (
            <Link 
              to="/" 
              className={`flex items-center rounded-xl transition-all py-3 ${location.pathname === '/' ? 'bg-brand-highlight text-brand-600 dark:text-brand-300 border border-brand-highlight font-bold' : 'border border-transparent text-text-muted hover:bg-surface-dark hover:text-text-main font-medium'} ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-4'}`}
              title={isCollapsed ? "Dashboard" : ""}
            >
              <span className="material-icons text-xl">dashboard</span>
              {!isCollapsed && <span className="whitespace-nowrap">Dashboard</span>}
            </Link>
          )}
          <Link 
            to="/tables" 
            className={`flex items-center rounded-xl transition-all py-3 ${location.pathname === '/tables' ? 'bg-brand-highlight text-brand-600 dark:text-brand-300 border border-brand-highlight font-bold' : 'border border-transparent text-text-muted hover:bg-surface-dark hover:text-text-main font-medium'} ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-4'}`}
            title={isCollapsed ? "Pilih Meja / Table" : ""}
          >
            <span className="material-icons text-xl">table_restaurant</span>
            {!isCollapsed && <span className="whitespace-nowrap">Pilih Meja / Table</span>}
          </Link>

          
          {(user?.role === 'admin' || user?.role === 'kitchen') && (
            <Link 
              to="/kitchen" 
              className={`flex items-center rounded-xl transition-all py-3 ${location.pathname === '/kitchen' ? 'bg-amber-highlight text-amber-600 dark:text-yellow-400 border border-amber-highlight font-bold' : 'border border-transparent text-text-muted hover:bg-surface-dark hover:text-text-main font-medium'} ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-4'}`}
              title={isCollapsed ? "Kitchen Display" : ""}
            >
              <span className="material-icons text-xl">soup_kitchen</span>
              {!isCollapsed && <span className="whitespace-nowrap">Kitchen Display</span>}
            </Link>
          )}
          
          {user?.role === 'admin' && (
            <>
              {/* Kontak / People Dropdown */}
              <div className="pt-2 pb-1">
                <button 
                  onClick={handleContactsClick}
                  className={`w-full flex items-center rounded-xl hover:bg-surface-dark transition-all text-text-muted hover:text-text-main cursor-pointer ${isContactsOpen && !isCollapsed ? 'font-bold' : 'font-medium'} ${isCollapsed ? 'justify-center px-0 py-3' : 'justify-between px-4 py-3'}`}
                  title={isCollapsed ? "Kontak & Pengguna" : ""}
                >
                  <span className={`flex items-center ${isCollapsed ? 'justify-center gap-0' : 'gap-3'}`}>
                    <span className="material-icons text-xl">people</span>
                    {!isCollapsed && <span className="whitespace-nowrap">Kontak & Pengguna</span>}
                  </span>
                  {!isCollapsed && <span className={`transform transition-transform ml-2 ${isContactsOpen ? 'rotate-180' : ''}`}>▼</span>}
                </button>
                {!isCollapsed && isContactsOpen && (
                  <div className="pl-8 pr-4 space-y-1 mt-1 border-l-2 border-border ml-4">
                    <Link to="/customers" className={`flex items-center gap-2 py-2 px-3 rounded-lg text-sm hover:bg-surface-dark transition-colors ${location.pathname === '/customers' ? 'bg-surface-dark text-brand-600 dark:text-brand-400 font-bold' : 'text-text-muted hover:text-text-main'}`}><span className="material-icons text-base">loyalty</span>Konsumen / Pelanggan</Link>
                    <Link to="/users" className={`flex items-center gap-2 py-2 px-3 rounded-lg text-sm hover:bg-surface-dark transition-colors ${location.pathname === '/users' ? 'bg-surface-dark text-brand-600 dark:text-brand-400 font-bold' : 'text-text-muted hover:text-text-main'}`}><span className="material-icons text-base">badge</span>Staff / Admin</Link>
                  </div>
                )}
              </div>
              <div className="pt-2 pb-1">
                <button 
                  onClick={handleProductsClick}
                  className={`w-full flex items-center rounded-xl hover:bg-surface-dark transition-all text-text-muted hover:text-text-main cursor-pointer ${isProductsOpen && !isCollapsed ? 'font-bold' : 'font-medium'} ${isCollapsed ? 'justify-center px-0 py-3' : 'justify-between px-4 py-3'}`}
                  title={isCollapsed ? "Products" : ""}
                >
                  <span className={`flex items-center ${isCollapsed ? 'justify-center gap-0' : 'gap-3'}`}>
                    <span className="material-icons text-xl">inventory_2</span>
                    {!isCollapsed && <span className="whitespace-nowrap">Products</span>}
                  </span>
                  {!isCollapsed && <span className={`transform transition-transform ml-2 ${isProductsOpen ? 'rotate-180' : ''}`}>▼</span>}
                </button>
                {!isCollapsed && isProductsOpen && (
                  <div className="pl-8 pr-4 space-y-1 mt-1 border-l-2 border-border ml-4">
                    <Link to="/products/list" className={`block py-2 px-3 rounded-lg text-sm hover:bg-surface-light transition-colors ${location.pathname === '/products/list' ? 'bg-surface-light text-brand-600 dark:text-brand-400 font-bold' : 'text-text-muted hover:text-text-main'}`}>List Products</Link>
                    <Link to="/products/add" className={`block py-2 px-3 rounded-lg text-sm hover:bg-surface-light transition-colors ${location.pathname === '/products/add' ? 'bg-surface-light text-brand-600 dark:text-brand-400 font-bold' : 'text-text-muted hover:text-text-main'}`}>Add Product</Link>
                    <Link to="/products/categories" className={`block py-2 px-3 rounded-lg text-sm hover:bg-surface-light transition-colors ${location.pathname === '/products/categories' ? 'bg-surface-light text-brand-600 dark:text-brand-400 font-bold' : 'text-text-muted hover:text-text-main'}`}>Categories</Link>
                    <Link to="/products/variations" className={`block py-2 px-3 rounded-lg text-sm hover:bg-surface-light transition-colors ${location.pathname === '/products/variations' ? 'bg-surface-light text-brand-600 dark:text-brand-400 font-bold' : 'text-text-muted hover:text-text-main'}`}>Variations</Link>
                    <Link to="/products/units" className={`block py-2 px-3 rounded-lg text-sm hover:bg-surface-light transition-colors ${location.pathname === '/products/units' ? 'bg-surface-light text-brand-600 dark:text-brand-400 font-bold' : 'text-text-muted hover:text-text-main'}`}>Units</Link>
                    <Link to="/products/brands" className={`block py-2 px-3 rounded-lg text-sm hover:bg-surface-light transition-colors ${location.pathname === '/products/brands' ? 'bg-surface-light text-brand-600 dark:text-brand-400 font-bold' : 'text-text-muted hover:text-text-main'}`}>Brands</Link>
                    <Link to="/products/warranties" className={`block py-2 px-3 rounded-lg text-sm hover:bg-surface-light transition-colors ${location.pathname === '/products/warranties' ? 'bg-surface-light text-brand-600 dark:text-brand-400 font-bold' : 'text-text-muted hover:text-text-main'}`}>Warranties</Link>
                  </div>
                )}
              </div>
              <Link 
                to="/expenses" 
                className={`flex items-center rounded-xl transition-all py-3 ${location.pathname === '/expenses' ? 'bg-red-highlight text-red-600 dark:text-red-400 border border-red-highlight font-bold' : 'border border-transparent text-text-muted hover:bg-surface-dark hover:text-text-main font-medium'} ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-4'}`}
                title={isCollapsed ? "Pengeluaran" : ""}
              >
                <span className="material-icons text-xl">account_balance_wallet</span>
                {!isCollapsed && <span className="whitespace-nowrap">Pengeluaran</span>}
              </Link>
            </>
          )}
        </nav>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header Navbar */}
        <header className="h-16 border-b border-border bg-surface flex items-center justify-between px-8 z-30 no-print shadow-sm">
          <div className="flex items-center gap-4">
            <span className="material-icons text-text-muted text-xl">store</span>
            <span className="text-sm font-bold text-text-muted">Cabang Utama POS</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-surface-dark border border-border text-text-main hover:bg-surface transition-colors flex items-center justify-center"
              title="Toggle Theme"
            >
              <span className="material-icons text-lg">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
            </button>

            {/* User Profile dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-3 p-1.5 px-3 rounded-xl border border-border bg-surface-dark/50 hover:bg-surface-dark transition-all">
                <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-brand-500/20">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold text-text-main leading-tight">{user?.name}</p>
                  <p className="text-[10px] text-text-muted capitalize leading-none">{user?.role}</p>
                </div>
                <span className="text-text-muted text-xs">▼</span>
              </button>

              {/* Hover Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
                <div className="px-4 py-2 border-b border-border mb-1 bg-surface-dark/20">
                  <p className="text-sm font-bold text-text-main">{user?.name}</p>
                  <p className="text-xs text-text-muted">@{user?.username}</p>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-500/10 hover:text-red-500 transition-colors flex items-center gap-2"
                >
                  <span className="material-icons text-sm">logout</span> Log Out
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 relative overflow-hidden">
          {/* Background Decorative Blobs */}
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-brand-600/5 dark:bg-brand-600/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none no-print"></div>
          <div className="absolute -bottom-40 -right-20 w-[600px] h-[600px] bg-purple-600/5 dark:bg-purple-600/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none no-print"></div>
          
          <div className="relative h-full">
            {children}
          </div>
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
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
