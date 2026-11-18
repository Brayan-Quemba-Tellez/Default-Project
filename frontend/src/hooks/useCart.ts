import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '@/api/cart.api';
import { useAuthStore } from '@/stores/auth.store';
import { useCartStore } from '@/stores/cart.store';

export const useCart = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();
  const localCart = useCartStore();

  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: () => cartApi.getCart(),
    enabled: isAuthenticated,
    staleTime: 30 * 1000,
  });

  const addItemMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      cartApi.addItem(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      cartApi.updateItem(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (itemId: string) => cartApi.removeItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const items = isAuthenticated && cartQuery.data ? cartQuery.data.items : localCart.items;
  const subtotal = isAuthenticated && cartQuery.data ? cartQuery.data.subtotal : localCart.subtotal;
  const total = isAuthenticated && cartQuery.data ? cartQuery.data.total : localCart.total;
  const itemCount = items.reduce((acc, curr) => acc + (curr.quantity || 1), 0);

  return {
    items,
    subtotal,
    total,
    itemCount,
    isLoading: isAuthenticated ? cartQuery.isLoading : false,
    addItem: (productId: string, quantity = 1) => {
      if (isAuthenticated) {
        return addItemMutation.mutateAsync({ productId, quantity });
      }
      return Promise.resolve();
    },
    updateQuantity: (itemId: string, quantity: number) => {
      if (isAuthenticated) {
        return updateItemMutation.mutateAsync({ itemId, quantity });
      }
      localCart.updateItem(itemId, quantity);
      return Promise.resolve();
    },
    removeItem: (itemId: string) => {
      if (isAuthenticated) {
        return removeItemMutation.mutateAsync(itemId);
      }
      localCart.removeItem(itemId);
      return Promise.resolve();
    },
    clearCart: localCart.clearCart,
  };
};
