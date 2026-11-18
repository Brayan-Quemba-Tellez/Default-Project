import { z } from 'zod';

export const appointmentSchema = z.object({
  service_type: z.string().min(1, 'Seleccione un tipo de servicio'),
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().optional().or(z.literal('')),
  scheduled_date: z.string().min(1, 'La fecha es requerida'),
  scheduled_time: z.string().min(1, 'La hora es requerida'),
  duration_minutes: z.coerce.number().int().min(15).max(480).default(60),
  location: z.string().optional().or(z.literal('')),
  notes: z.string().optional().or(z.literal('')),
});

export const appointmentStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed'], {
    errorMap: () => ({ message: 'Estado de cita no válido' }),
  }),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
export type AppointmentStatusFormData = z.infer<typeof appointmentStatusSchema>;
