import { z } from 'zod';

export const addToCartSchema = z.object({
  product_id: z.string().uuid('ID de producto inválido'),
  quantity: z.coerce.number().int().positive('La cantidad debe ser al menos 1').default(1),
});

export const updateCartItemSchema = z.object({
  quantity: z.coerce.number().int().positive('La cantidad debe ser al menos 1'),
});

export type AddToCartFormData = z.infer<typeof addToCartSchema>;
export type UpdateCartItemFormData = z.infer<typeof updateCartItemSchema>;
