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
  if (!response.ok) {
    if (response.status === 401) {
      useAuthStore.getState().logout();
    }
    const error = await response.json().catch(() => ({ error: 'An error occurred' }));
    throw new Error(error.error || 'Request failed');
  }
  return response.json();
};

export const itemService = {
  getItems: () => fetchWithAuth('/items'),
  createItem: (data: any) => fetchWithAuth('/items', { method: 'POST', body: JSON.stringify(data) }),
  getCategories: () => fetchWithAuth('/items/categories'),
  createCategory: (data: any) => fetchWithAuth('/items/categories', { method: 'POST', body: JSON.stringify(data) }),
  getDepartments: () => fetchWithAuth('/items/departments'),
  createDepartment: (data: any) => fetchWithAuth('/items/departments', { method: 'POST', body: JSON.stringify(data) }),
};
