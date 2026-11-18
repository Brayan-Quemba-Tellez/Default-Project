import { apiClient } from './client';

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source?: string;
  consent_given: boolean;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source?: string;
  status: string;
  salesforce_id?: string;
  created_at: string;
}

export const contactApi = {
  send: (data: ContactForm) =>
    apiClient.post<Contact>('/api/v1/contact/', data).then(r => r.data),

  list: (params?: { status?: string; page?: number; limit?: number }) =>
    apiClient.get<Contact[]>('/api/v1/contact/', { params }).then(r => r.data),
};
