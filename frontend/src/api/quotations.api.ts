import { apiClient } from './client';

export interface QuotationItem {
  description: string;
  quantity: number;
  unit_price: number;
}

export interface Quotation {
  id: string;
  user_id: string;
  status: string;
  subtotal: number;
  tax: number;
  total: number;
  valid_until?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  items?: {
    id: string;
    description: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }[];
}

export interface QuotationCreate {
  items: QuotationItem[];
  notes?: string;
}

export const quotationsApi = {
  list: () =>
    apiClient.get<Quotation[]>('/api/v1/quotations/').then(r => r.data),

  getById: (id: string) =>
    apiClient.get<Quotation>(`/api/v1/quotations/${id}`).then(r => r.data),

  create: (data: QuotationCreate) =>
    apiClient.post<Quotation>('/api/v1/quotations/', data).then(r => r.data),

  updateStatus: (id: string, status: string) =>
    apiClient.put<Quotation>(`/api/v1/quotations/${id}/status`, { status }).then(r => r.data),
};
