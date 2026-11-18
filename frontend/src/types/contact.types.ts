export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source?: string;
  consent_given: boolean;
  status?: string;
  created_at: string;
}

export interface ContactCreatePayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source?: string;
  consent_given: boolean;
}
