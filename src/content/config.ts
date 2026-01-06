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
  schema: ({ image }) => z.object({
    // Core fields
    title: z.string(),
    description: z.string(),
    longDescription: z.string().optional(),

    // Technical
    technologies: z.array(z.string()),
    features: z.array(z.string()).default([]),

    // Links
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),

    // Media - supports local images via image() helper
    image: image().optional(),
    imageUrl: z.string().optional(), // Fallback for external URLs
    gallery: z.array(z.string()).default([]),

    // Categorization
    category: z.enum(['Machine Learning', 'Web Development', 'IT Support', 'Other']),

    // Display control
    featured: z.boolean().default(false),
    order: z.number().default(100),
    status: z.enum(['completed', 'in-progress', 'archived']).default('completed'),

    // Additional metadata
    client: z.string().optional(),
    year: z.number().optional(),
    teamSize: z.number().optional(),
  }),
});

export const collections = { blog, projects };