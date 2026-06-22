import { useAuthStore } from '../stores/authStore';

const API_URL = 'http://localhost:3001/api';

const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = useAuthStore.getState().token;
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  if (!response.ok) throw new Error('Request failed');
  return response.json();
};

export const kitchenService = {
  getPendingItems: () => fetchWithAuth('/kitchen/pending'),
  updateStatus: (id: number, status: string) => fetchWithAuth(`/kitchen/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) })
};
