import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi, OrderCreate } from '@/api/orders.api';
import { useAuthStore } from '@/stores/auth.store';

export const useOrders = (params?: { status?: string; page?: number; limit?: number }) => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const ordersQuery = useQuery({
    queryKey: ['orders', params],
    queryFn: () => ordersApi.list(params),
    enabled: isAuthenticated,
    staleTime: 60 * 1000,
  });

  const createOrderMutation = useMutation({
    mutationFn: (data: OrderCreate) => ordersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => ordersApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  return {
    orders: ordersQuery.data || [],
    isLoading: ordersQuery.isLoading,
    error: ordersQuery.error,
    createOrder: createOrderMutation.mutateAsync,
    updateStatus: updateStatusMutation.mutateAsync,
    isCreating: createOrderMutation.isPending,
  };
};

export const useOrderDetail = (id: string) => {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => ordersApi.getById(id),
    enabled: isAuthenticated && !!id,
    staleTime: 30 * 1000,
  });
};
