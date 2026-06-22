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

export const orderService = {
  createOrder: (data: any) => fetchWithAuth('/orders', { method: 'POST', body: JSON.stringify(data) }),
  getOrders: () => fetchWithAuth('/orders'),
  addItemsToOrder: (orderId: number, data: any) => fetchWithAuth(`/orders/${orderId}/items`, { method: 'POST', body: JSON.stringify(data) }),
  updateItemDiscount: (orderId: number, itemId: number, discountAmount: number) => fetchWithAuth(`/orders/${orderId}/items/${itemId}/discount`, { method: 'PUT', body: JSON.stringify({ discount_amount: discountAmount }) })
};
