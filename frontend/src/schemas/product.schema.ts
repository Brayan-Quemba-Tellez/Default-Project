import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  category_id: z.string().uuid('Debe seleccionar una categoría válida'),
  description: z.string().optional().or(z.literal('')),
  short_description: z.string().optional().or(z.literal('')),
  price: z.coerce.number().positive('El precio debe ser mayor a 0'),
  discount_price: z.coerce.number().positive('El precio de descuento debe ser mayor a 0').optional().nullable(),
  stock: z.coerce.number().int().nonnegative('El stock no puede ser negativo').default(0),
  sku: z.string().optional().or(z.literal('')),
  image_urls: z.array(z.string().url('URL de imagen inválida')).default([]),
  is_featured: z.boolean().default(false),
  is_active: z.boolean().default(true),
});

export const productFilterSchema = z.object({
  category_id: z.string().optional(),
  search: z.string().optional(),
  min_price: z.coerce.number().optional(),
  max_price: z.coerce.number().optional(),
  is_featured: z.boolean().optional(),
  page: z.coerce.number().int().positive().default(1),
  page_size: z.coerce.number().int().positive().default(12),
});

export type ProductFormData = z.infer<typeof productSchema>;
export type ProductFilterData = z.infer<typeof productFilterSchema>;
