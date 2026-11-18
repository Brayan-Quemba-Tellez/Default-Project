import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().min(1, 'El correo electrónico es requerido').email('Correo electrónico inválido'),
  phone: z.string().optional().or(z.literal('')),
  company: z.string().optional().or(z.literal('')),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  source: z.string().optional().default('web'),
  consent_given: z.boolean().refine((val) => val === true, {
    message: 'Debe autorizar el tratamiento de sus datos personales según la política de Habeas Data',
  }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
