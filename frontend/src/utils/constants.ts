export const DOCUMENT_TYPES = [
  { value: 'CC', label: 'Cédula de Ciudadanía (CC)' },
  { value: 'NIT', label: 'Número de Identificación Tributaria (NIT)' },
  { value: 'CE', label: 'Cédula de Extranjería (CE)' },
  { value: 'TI', label: 'Tarjeta de Identidad (TI)' },
  { value: 'PASAPORTE', label: 'Pasaporte' },
];

export const SERVICE_TYPES = [
  { value: 'consulta', label: 'Consulta General' },
  { value: 'mantenimiento', label: 'Soporte y Mantenimiento' },
  { value: 'desarrollo', label: 'Desarrollo de Software y TI' },
];

export const ORDER_STATUS_LABELS: Record<string, { label: string; variant: 'default' | 'success' | 'warning' | 'danger' | 'info' }> = {
  pending: { label: 'Pendiente', variant: 'warning' },
  paid: { label: 'Pagado', variant: 'info' },
  processing: { label: 'En preparación', variant: 'info' },
  shipped: { label: 'Enviado', variant: 'info' },
  delivered: { label: 'Entregado', variant: 'success' },
  cancelled: { label: 'Cancelado', variant: 'danger' },
};

export const APPOINTMENT_STATUS_LABELS: Record<string, { label: string; variant: 'default' | 'success' | 'warning' | 'danger' | 'info' }> = {
  pending: { label: 'Pendiente', variant: 'warning' },
  confirmed: { label: 'Confirmada', variant: 'success' },
  cancelled: { label: 'Cancelada', variant: 'danger' },
  completed: { label: 'Completada', variant: 'default' },
};

export const DEFAULT_PAGE_SIZE = 12;
