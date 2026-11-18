import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'El correo electrónico es requerido').email('Correo electrónico inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

export const registerSchema = z
  .object({
    full_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().min(1, 'El correo electrónico es requerido').email('Correo electrónico inválido'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirm_password: z.string().min(1, 'Debe confirmar su contraseña'),
    phone: z.string().optional().or(z.literal('')),
    document_type: z.enum(['CC', 'NIT', 'CE', 'TI', 'PASAPORTE'], {
      errorMap: () => ({ message: 'Seleccione un tipo de documento válido' }),
    }),
    document_number: z.string().min(5, 'El número de documento debe tener al menos 5 caracteres'),
    accept_terms: z.boolean().refine((val) => val === true, {
      message: 'Debe aceptar los términos y condiciones',
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Las contraseñas no coinciden',
    path: ['confirm_password'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
