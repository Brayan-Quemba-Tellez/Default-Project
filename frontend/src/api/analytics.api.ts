import { apiClient } from './client';

export interface AnalyticsEvent {
  event_type: string;
  event_data?: Record<string, unknown>;
  session_id?: string;
}

export interface DashboardData {
  total_visits: number;
  total_leads: number;
  top_products: Array<{ id: string; name: string; views: number }>;
}

export const analyticsApi = {
  trackEvent: (event: AnalyticsEvent) =>
    apiClient.post<{ detail: string }>('/api/v1/analytics/event', event).then(r => r.data),

  getDashboard: () =>
    apiClient.get<DashboardData>('/api/v1/analytics/dashboard').then(r => r.data),
};
