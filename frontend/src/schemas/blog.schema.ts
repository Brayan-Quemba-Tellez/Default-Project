import { z } from 'zod';

export const blogPostSchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  excerpt: z.string().optional().or(z.literal('')),
  content: z.string().min(20, 'El contenido debe tener al menos 20 caracteres'),
  category: z.string().min(1, 'La categoría es requerida'),
  tags: z.array(z.string()).default([]),
  featured_image: z.string().url('URL de imagen inválida').optional().or(z.literal('')),
  is_published: z.boolean().default(false),
});

export const blogFilterSchema = z.object({
  category: z.string().optional(),
  tag: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  page_size: z.coerce.number().int().positive().default(10),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;
export type BlogFilterData = z.infer<typeof blogFilterSchema>;
