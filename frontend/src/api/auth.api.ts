import { apiClient } from './client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  document_type: string;
  document_number: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: {
    id: string;
    email: string;
    full_name: string;
    role: string;
    is_active: boolean;
    created_at: string;
  };
}

export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<TokenResponse>('/api/v1/auth/login', credentials).then(r => r.data),

  register: (data: RegisterData) =>
    apiClient.post<{ id: string; email: string; full_name: string; role: string; created_at: string }>(
      '/api/v1/auth/register', data
    ).then(r => r.data),

  logout: () =>
    apiClient.post<{ detail: string }>('/api/v1/auth/logout').then(r => r.data),

  refresh: (refresh_token: string) =>
    apiClient.post<TokenResponse>('/api/v1/auth/refresh', { refresh_token }).then(r => r.data),
};
