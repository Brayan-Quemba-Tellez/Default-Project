import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentsApi, AppointmentCreate, AppointmentUpdate } from '@/api/appointments.api';
import { useAuthStore } from '@/stores/auth.store';

export const useAppointments = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const appointmentsQuery = useQuery({
    queryKey: ['appointments'],
    queryFn: () => appointmentsApi.list(),
    enabled: isAuthenticated,
    staleTime: 60 * 1000,
  });

  const createAppointmentMutation = useMutation({
    mutationFn: (data: AppointmentCreate) => appointmentsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });

  const updateAppointmentMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AppointmentUpdate }) =>
      appointmentsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });

  const cancelAppointmentMutation = useMutation({
    mutationFn: (id: string) => appointmentsApi.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });

  return {
    appointments: appointmentsQuery.data || [],
    isLoading: appointmentsQuery.isLoading,
    error: appointmentsQuery.error,
    createAppointment: createAppointmentMutation.mutateAsync,
    updateAppointment: updateAppointmentMutation.mutateAsync,
    cancelAppointment: cancelAppointmentMutation.mutateAsync,
    isCreating: createAppointmentMutation.isPending,
  };
};

export const useAvailableSlots = (date: string, serviceType: string) => {
  return useQuery({
    queryKey: ['appointment-slots', date, serviceType],
    queryFn: () => appointmentsApi.getAvailable(date, serviceType),
    enabled: !!date && !!serviceType,
    staleTime: 2 * 60 * 1000,
  });
};
