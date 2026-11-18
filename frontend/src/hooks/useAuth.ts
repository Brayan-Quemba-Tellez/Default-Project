import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi, LoginCredentials, RegisterData } from '@/api/auth.api';
import { usersApi } from '@/api/users.api';
import { useAuthStore } from '@/stores/auth.store';
import { User } from '@/types/auth.types';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user, token, isAuthenticated, isLoading, login, logout, updateUser } = useAuthStore();

  const userQuery = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => usersApi.getMe(),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      const authUser: User = {
        id: data.user.id,
        email: data.user.email,
        full_name: data.user.full_name,
        role: data.user.role as 'admin' | 'user',
      };
      login(authUser, data.access_token, data.refresh_token);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      navigate('/');
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
    onSuccess: () => {
      navigate('/login');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        await authApi.logout();
      } catch {
        // Ignorar si falla la invalidación en backend
      }
    },
    onSettled: () => {
      logout();
      queryClient.clear();
      navigate('/login');
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<User>) => usersApi.updateMe(data),
    onSuccess: (updated) => {
      updateUser(updated as unknown as Partial<User>);
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
    },
  });

  return {
    user: userQuery.data || user,
    token,
    isAuthenticated,
    isLoading: isLoading || loginMutation.isPending || registerMutation.isPending,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutate,
    updateProfile: updateProfileMutation.mutateAsync,
    loginMutation,
    registerMutation,
    logoutMutation,
  };
};
