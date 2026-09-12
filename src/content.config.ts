import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const researchers = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/researchers' }),
  schema: z.object({
    username: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens.'),
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    role: z.string().optional(),
    affiliation: z.string().optional(),
    summary: z.string().optional(),
    website: z.url().optional(),
    order: z.number().default(100),
    placeholder: z.boolean().default(false),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/articles' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      // YAML strings (one username or comma-separated) and YAML lists both work.
      authors: z.preprocess(
        (value) => typeof value === 'string' ? value.split(',').map((name) => name.trim()) : value,
        z.array(reference('researchers')).default([]),
      ),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { articles, researchers };
