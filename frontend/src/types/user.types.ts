export type UserRole = 'admin' | 'user' | 'vendor';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  phone?: string;
  document_type?: string;
  document_number?: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface UserUpdatePayload {
  full_name?: string;
  phone?: string;
  document_type?: string;
  document_number?: string;
}
