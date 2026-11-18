import { apiClient } from './client';

export interface Order {
  id: string;
  user_id: string;
  status: string;
  subtotal: number;
  tax: number;
  total: number;
  shipping_address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  payment_method?: string;
  payment_status: string;
  wompi_transaction_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface OrderCreate {
  shipping_address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  payment_method: string;
  notes?: string;
  items?: Array<{
    product_id: string;
    quantity: number;
    unit_price?: number;
  }>;
}

export const ordersApi = {
  list: (params?: { status?: string; page?: number; limit?: number }) =>
    apiClient.get<Order[]>('/api/v1/orders/', { params }).then(r => r.data),

  getById: (id: string) =>
    apiClient.get<Order>(`/api/v1/orders/${id}`).then(r => r.data),

  create: (data: OrderCreate) =>
    apiClient.post<Order>('/api/v1/orders/', data).then(r => r.data),

  updateStatus: (id: string, status: string) =>
    apiClient.put<Order>(`/api/v1/orders/${id}/status`, { status }).then(r => r.data),
};
