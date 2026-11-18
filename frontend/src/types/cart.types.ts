import { Product } from './product.types';

export interface CartItem {
  product_id: string;
  quantity: number;
  product?: Product;
}

export interface CartSummary {
  subtotal: number;
  tax?: number;
  shipping?: number;
  total: number;
}
