import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    readTime: z.string(),
    category: z.enum(["Machine Learning", "Web Development", "IT Operations"]),
    imageUrl: z.string(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      longDescription: z.string().optional(),
      technologies: z.array(z.string()),
      features: z.array(z.string()).default([]),
      liveUrl: z.string().optional(),
      githubUrl: z.string().optional(),
      image: image().optional(),
      imageUrl: z.string().optional(),
      gallery: z.array(z.string()).default([]),
      category: z.enum([
        "Machine Learning",
        "Web Development",
        "IT Support",
        "Other",
      ]),
      featured: z.boolean().default(false),
      order: z.number().default(100),
      status: z
        .enum(["completed", "in-progress", "archived"])
        .default("completed"),
      client: z.string().optional(),
      year: z.number().optional(),
      teamSize: z.number().optional(),
    }),
});

export const collections = { blog, projects };
