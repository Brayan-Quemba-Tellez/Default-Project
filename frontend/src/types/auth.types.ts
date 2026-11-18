export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'user';
  phone?: string;
  document_type?: string;
  document_number?: string;
  created_at?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  full_name: string;
  email: string;
  password: string;
  phone?: string;
  document_type: string;
  document_number: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => void;
  logout: () => void;
  refreshToken: () => Promise<string | null>;
}
