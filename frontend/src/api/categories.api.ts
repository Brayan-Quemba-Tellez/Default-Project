import { apiClient } from './client';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string;
  sector: string;
  image_url?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface CategoryCreate {
  name: string;
  description?: string;
  parent_id?: string;
  sector: string;
  image_url?: string;
}

export interface CategoryUpdate {
  name?: string;
  description?: string;
  sector?: string;
  is_active?: boolean;
  sort_order?: number;
}

export const categoriesApi = {
  list: (params?: { sector?: string; is_active?: boolean }) =>
    apiClient.get<Category[]>('/api/v1/categories', { params }).then(r => r.data),

  getBySlug: (slug: string) =>
    apiClient.get<Category>(`/api/v1/categories/${slug}`).then(r => r.data),

  create: (data: CategoryCreate) =>
    apiClient.post<Category>('/api/v1/categories', data).then(r => r.data),

  update: (id: string, data: CategoryUpdate) =>
    apiClient.put<Category>(`/api/v1/categories/${id}`, data).then(r => r.data),

  delete: (id: string) =>
    apiClient.delete(`/api/v1/categories/${id}`),
};
