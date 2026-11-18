import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { quotationsApi, QuotationCreate } from '@/api/quotations.api';
import { useAuthStore } from '@/stores/auth.store';

export const useQuotations = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const quotationsQuery = useQuery({
    queryKey: ['quotations'],
    queryFn: () => quotationsApi.list(),
    enabled: isAuthenticated,
    staleTime: 60 * 1000,
  });

  const createQuotationMutation = useMutation({
    mutationFn: (data: QuotationCreate) => quotationsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotations'] });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      quotationsApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotations'] });
    },
  });

  return {
    quotations: quotationsQuery.data || [],
    isLoading: quotationsQuery.isLoading,
    error: quotationsQuery.error,
    createQuotation: createQuotationMutation.mutateAsync,
    updateStatus: updateStatusMutation.mutateAsync,
    isCreating: createQuotationMutation.isPending,
  };
};

export const useQuotationDetail = (id: string) => {
  const { isAuthenticated } = useAuthStore();
  return useQuery({
    queryKey: ['quotation', id],
    queryFn: () => quotationsApi.getById(id),
    enabled: isAuthenticated && !!id,
    staleTime: 30 * 1000,
  });
};
