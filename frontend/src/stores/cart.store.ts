import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types/cart.types';
import { Product } from '@/types/product.types';

interface CartStore {
  items: CartItem[];
  subtotal: number;
  total: number;
  itemCount: number;
  addItem: (product: Product, quantity: number) => void;
  updateItem: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      total: 0,
      itemCount: 0,
      addItem: (product, quantity) => {
        const existing = get().items.find(item => item.product_id === product.id);
        if (existing) {
          const updated = get().items.map(item =>
            item.product_id === product.id ? { ...item, quantity: item.quantity + quantity } : item
          );
          set({ items: updated });
        } else {
          set({ items: [...get().items, { product_id: product.id, quantity, product }] });
        }
        get().calculateTotals();
      },
      updateItem: (productId, quantity) => {
        set({ items: get().items.map(item => item.product_id === productId ? { ...item, quantity } : item) });
        get().calculateTotals();
      },
      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.product_id !== productId) });
        get().calculateTotals();
      },
      clearCart: () => set({ items: [], subtotal: 0, total: 0, itemCount: 0 }),
      calculateTotals: () => {
        const items = get().items;
        const subtotal = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
        set({ subtotal, total: subtotal, itemCount: items.reduce((sum, item) => sum + item.quantity, 0) });
      },
    }),
    { name: 'cart-storage' }
  )
);
