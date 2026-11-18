export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Appointment {
  id: string;
  user_id: string;
  service_type: string;
  title: string;
  description?: string;
  scheduled_date: string;
  scheduled_time: string;
  duration_minutes: number;
  status: AppointmentStatus;
  location?: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface AppointmentCreatePayload {
  service_type: string;
  title: string;
  description?: string;
  scheduled_date: string;
  scheduled_time: string;
  duration_minutes?: number;
  location?: string;
  notes?: string;
}

export interface AppointmentUpdatePayload {
  service_type?: string;
  title?: string;
  description?: string;
  scheduled_date?: string;
  scheduled_time?: string;
  duration_minutes?: number;
  status?: AppointmentStatus;
  location?: string;
  notes?: string;
}

export interface AvailableTimeSlot {
  time: string;
  available: boolean;
}
