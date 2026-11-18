import { apiClient } from './client';

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product?: {
    id: string;
    name: string;
    price: number;
    image_urls: string[];
  };
}

export interface CartResponse {
  items: CartItem[];
  subtotal: number;
  total: number;
}

export const cartApi = {
  getCart: () =>
    apiClient.get<CartResponse>('/api/v1/cart/').then(r => r.data),

  addItem: (product_id: string, quantity: number) =>
    apiClient.post<CartItem>('/api/v1/cart/items', { product_id, quantity }).then(r => r.data),

  updateItem: (id: string, quantity: number) =>
    apiClient.put<CartItem>(`/api/v1/cart/items/${id}`, { quantity }).then(r => r.data),

  removeItem: (id: string) =>
    apiClient.delete(`/api/v1/cart/items/${id}`),
};
