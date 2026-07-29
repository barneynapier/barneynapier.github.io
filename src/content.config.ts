import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
});

const books = defineCollection({
  loader: glob({ base: './src/content/books', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().default('Untitled'),
    author: z.string().default('Unknown'),
    rating: z.coerce.number().default(0),
    is_fiction: z.boolean().default(false),
    date: z.coerce.date().optional().catch(undefined),
    excerpt: z.string().optional().default(''),
    cover_image: z.string().optional(),
  }),
});

export const collections = { writing, books };
