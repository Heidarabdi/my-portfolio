import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(), // ✅ Proper date handling instead of string
    readTime: z.string(),
    category: z.enum(['Machine Learning', 'Web Development', 'IT Operations']),
    imageUrl: z.string(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    imageUrl: z.string(),
    link: z.string(),
    category: z.enum(['Machine Learning', 'Web Development', 'IT Support', 'Other']),
    longDescription: z.string(),
    features: z.array(z.string()),
    gallery: z.array(z.string()),
  }),
});

export const collections = { blog, projects };