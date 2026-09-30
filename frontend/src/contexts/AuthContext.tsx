import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { AuthState, User } from '@/types/auth.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const AuthContext = createContext<AuthState | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));
  const navigate = useNavigate();

  const fetchProfile = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/api/v1/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    enabled: !!token,
    onSuccess: (data) => setUser(data),
    onError: () => {
      setToken(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await axios.post(`${API_URL}/api/v1/auth/login`, credentials);
      return response.data;
    },
    onSuccess: (data) => {
      setToken(data.access_token);
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      navigate('/');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await axios.post(`${API_URL}/api/v1/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      setToken(null);
      setUser(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/login');
    },
  });

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return null;
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/refresh`, { refresh_token: refreshToken });
      const newToken = response.data.access_token;
      setToken(newToken);
      localStorage.setItem('access_token', newToken);
      return newToken;
    } catch {
      logoutMutation.mutate();
      return null;
    }
  };

  useEffect(() => {
    if (token && !user && !fetchProfile.isLoading) {
      fetchProfile.refetch();
    }
  }, [token, user]);

  const value: AuthState = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading: fetchProfile.isLoading,
    login: loginMutation.mutate,
    logout: () => logoutMutation.mutate(),
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
