import { z } from 'zod';

export const shippingAddressSchema = z.object({
  street: z.string().min(3, 'La dirección es requerida'),
  city: z.string().min(2, 'La ciudad es requerida'),
  state: z.string().min(2, 'El departamento/estado es requerido'),
  zip: z.string().min(2, 'El código postal es requerido'),
  country: z.string().min(2, 'El país es requerido').default('Colombia'),
});

export const checkoutOrderSchema = z.object({
  shipping_address: shippingAddressSchema,
  payment_method: z.enum(['wompi', 'pse', 'nequi', 'credit_card', 'cash_on_delivery'], {
    errorMap: () => ({ message: 'Seleccione un método de pago válido' }),
  }),
  notes: z.string().optional().or(z.literal('')),
});

export const orderStatusUpdateSchema = z.object({
  status: z.enum(['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'], {
    errorMap: () => ({ message: 'Estado de pedido no válido' }),
  }),
});

export type ShippingAddressFormData = z.infer<typeof shippingAddressSchema>;
export type CheckoutOrderFormData = z.infer<typeof checkoutOrderSchema>;
export type OrderStatusUpdateFormData = z.infer<typeof orderStatusUpdateSchema>;
