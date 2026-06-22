import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { authService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await authService.login(username, password);
      setAuth(response.user, response.token);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md glass-card p-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-600">
          ADOL<span className="text-text-main font-light text-xl ml-1">POS</span>
        </h1>
        <p className="text-text-muted text-sm mt-2">Masuk ke sistem point of sale</p>
      </div>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
          <span className="material-icons text-base align-middle mr-1">error_outline</span>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-text-muted text-sm font-medium mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            placeholder="Masukkan username"
            required
          />
        </div>
        
        <div>
          <label className="block text-text-muted text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            placeholder="Masukkan password"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-3 px-4 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Memproses...' : 'Masuk'}
        </button>
      </form>
    </div>
  );
}
