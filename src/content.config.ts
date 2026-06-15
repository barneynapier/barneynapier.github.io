import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Frontmatter `tags` may be a single string or a list; normalise to an array.
const tagList = z
  .union([z.string(), z.array(z.string())])
  .default([])
  .transform((t) => (Array.isArray(t) ? t : [t]));

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: tagList,
  }),
});

const books = defineCollection({
  loader: glob({ base: './src/content/books', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().default('Untitled'),
    author: z.string().default('Unknown'),
    rating: z.coerce.number().default(0),
    is_fiction: z.boolean().default(false),
    tags: tagList,
    date: z.coerce.date().optional().catch(undefined),
    excerpt: z.string().optional().default(''),
    cover_image: z.string().optional(),
  }),
});

export const collections = { writing, books };
