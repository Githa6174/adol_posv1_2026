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

export const paymentService = {
  getMethods: () => fetchWithAuth('/payments/methods'),
  getOrderByTable: (tableId: number) => fetchWithAuth(`/payments/table/${tableId}/order`),
  processPayment: (orderId: number, data: any) => fetchWithAuth(`/payments/order/${orderId}`, { method: 'POST', body: JSON.stringify(data) }),
  applyDiscount: (orderId: number, discount_amount: number) => fetchWithAuth(`/orders/${orderId}/discount`, { method: 'PUT', body: JSON.stringify({ discount_amount }) })
};
