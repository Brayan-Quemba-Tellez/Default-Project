import { z } from 'zod';

export const quotationItemSchema = z.object({
  description: z.string().min(3, 'La descripción debe tener al menos 3 caracteres'),
  quantity: z.coerce.number().int().min(1, 'La cantidad debe ser al menos 1'),
  unit_price: z.coerce.number().min(0, 'El precio unitario no puede ser negativo'),
});

export const quotationSchema = z.object({
  items: z.array(quotationItemSchema).min(1, 'Debe incluir al menos un ítem en la cotización'),
  notes: z.string().optional().or(z.literal('')),
});

export const quotationStatusSchema = z.object({
  status: z.enum(['draft', 'sent', 'approved', 'rejected', 'expired'], {
    errorMap: () => ({ message: 'Estado de cotización no válido' }),
  }),
});

export type QuotationItemFormData = z.infer<typeof quotationItemSchema>;
export type QuotationFormData = z.infer<typeof quotationSchema>;
export type QuotationStatusFormData = z.infer<typeof quotationStatusSchema>;
