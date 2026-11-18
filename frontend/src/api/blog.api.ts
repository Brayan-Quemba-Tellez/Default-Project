import { apiClient } from './client';

export interface BlogPost {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category: string;
  tags: string[];
  featured_image?: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPostCreate {
  title: string;
  content: string;
  category: string;
  excerpt?: string;
  tags?: string[];
  featured_image?: string;
  is_published?: boolean;
}

export interface BlogPostUpdate {
  title?: string;
  content?: string;
  category?: string;
  excerpt?: string;
  tags?: string[];
  featured_image?: string;
  is_published?: boolean;
}

export const blogApi = {
  list: (params?: { category?: string; page?: number; limit?: number }) =>
    apiClient.get<BlogPost[]>('/api/v1/blog/', { params }).then(r => r.data),

  getBySlug: (slug: string) =>
    apiClient.get<BlogPost>(`/api/v1/blog/${slug}`).then(r => r.data),

  create: (data: BlogPostCreate) =>
    apiClient.post<BlogPost>('/api/v1/blog/', data).then(r => r.data),

  update: (id: string, data: BlogPostUpdate) =>
    apiClient.put<BlogPost>(`/api/v1/blog/${id}`, data).then(r => r.data),

  delete: (id: string) =>
    apiClient.delete(`/api/v1/blog/${id}`),
};
