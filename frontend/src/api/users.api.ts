import { apiClient } from './client';

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  document_type: string;
  document_number: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserUpdate {
  full_name?: string;
  phone?: string;
  email?: string;
}

export const usersApi = {
  getMe: () =>
    apiClient.get<User>('/api/v1/users/me').then(r => r.data),

  updateMe: (data: UserUpdate) =>
    apiClient.put<User>('/api/v1/users/me', data).then(r => r.data),

  getUserById: (id: string) =>
    apiClient.get<User>(`/api/v1/users/${id}`).then(r => r.data),
};
