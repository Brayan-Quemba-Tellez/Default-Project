import { z } from 'zod';

export const userUpdateSchema = z.object({
  full_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
  phone: z.string().optional().or(z.literal('')),
  document_type: z.enum(['CC', 'NIT', 'CE', 'TI', 'PASAPORTE']).optional(),
  document_number: z.string().min(5, 'El número de documento debe tener al menos 5 caracteres').optional(),
});

export const changePasswordSchema = z
  .object({
    current_password: z.string().min(1, 'La contraseña actual es requerida'),
    new_password: z.string().min(8, 'La nueva contraseña debe tener al menos 8 caracteres'),
    confirm_password: z.string().min(1, 'Debe confirmar la nueva contraseña'),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Las nuevas contraseñas no coinciden',
    path: ['confirm_password'],
  });

export type UserUpdateFormData = z.infer<typeof userUpdateSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
