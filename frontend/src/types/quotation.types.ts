export type QuotationStatus = 'draft' | 'sent' | 'approved' | 'rejected' | 'expired';

export interface QuotationItem {
  id?: string;
  description: string;
  quantity: number;
  unit_price: number;
  total?: number;
}

export interface Quotation {
  id: string;
  user_id: string;
  status: QuotationStatus;
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
  items: QuotationItem[];
  created_at: string;
  updated_at?: string;
}

export interface QuotationCreatePayload {
  items: {
    description: string;
    quantity: number;
    unit_price: number;
  }[];
  notes?: string;
}
