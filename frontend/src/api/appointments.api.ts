import { apiClient } from './client';

export interface Appointment {
  id: string;
  user_id: string;
  service_type: string;
  title: string;
  description?: string;
  scheduled_date: string;
  scheduled_time: string;
  duration_minutes: number;
  status: string;
  location?: string;
  notes?: string;
  created_at: string;
}

export interface AppointmentCreate {
  service_type: 'consulta' | 'mantenimiento' | 'desarrollo';
  title: string;
  description?: string;
  scheduled_date: string;
  scheduled_time: string;
  duration_minutes?: number;
  location?: string;
  notes?: string;
}

export interface AppointmentUpdate {
  scheduled_date?: string;
  scheduled_time?: string;
  notes?: string;
}

export interface AvailableSlots {
  date: string;
  available_slots: string[];
}

export const appointmentsApi = {
  list: () =>
    apiClient.get<Appointment[]>('/api/v1/appointments/').then(r => r.data),

  getAvailable: (date: string, service_type: string) =>
    apiClient.get<AvailableSlots>('/api/v1/appointments/available', {
      params: { date, service_type },
    }).then(r => r.data),

  create: (data: AppointmentCreate) =>
    apiClient.post<Appointment>('/api/v1/appointments/', data).then(r => r.data),

  update: (id: string, data: AppointmentUpdate) =>
    apiClient.put<Appointment>(`/api/v1/appointments/${id}`, data).then(r => r.data),

  cancel: (id: string) =>
    apiClient.delete<{ detail: string }>(`/api/v1/appointments/${id}`).then(r => r.data),
};
