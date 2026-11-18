import { apiClient } from './client';

export interface Product {
  id: string;
  category_id: string;
  vendor_id: string;
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  price: number;
  discount_price?: number;
  stock_quantity: number;
  sku?: string;
  is_available: boolean;
  is_featured: boolean;
  image_urls: string[];
  specifications: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ProductFilters {
  search?: string;
  min_price?: number;
  max_price?: number;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export interface ProductCreate {
  category_id: string;
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  price: number;
  discount_price?: number;
  stock_quantity: number;
  sku?: string;
  specifications?: Record<string, unknown>;
}

export interface ProductUpdate {
  name?: string;
  description?: string;
  price?: number;
  stock_quantity?: number;
  is_available?: boolean;
  is_featured?: boolean;
}

export const productsApi = {
  list: (params?: ProductFilters) =>
    apiClient.get<Product[]>('/api/v1/products/', { params }).then(r => r.data),

  featured: () =>
    apiClient.get<Product[]>('/api/v1/products/featured').then(r => r.data),

  getBySlug: (slug: string) =>
    apiClient.get<Product>(`/api/v1/products/${slug}`).then(r => r.data),

  create: (data: ProductCreate) =>
    apiClient.post<Product>('/api/v1/products/', data).then(r => r.data),

  update: (id: string, data: ProductUpdate) =>
    apiClient.put<Product>(`/api/v1/products/${id}`, data).then(r => r.data),

  delete: (id: string) =>
    apiClient.delete(`/api/v1/products/${id}`),
};
