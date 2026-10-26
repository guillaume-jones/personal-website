import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({
    base: "./src/content/blog",
    pattern: "*/index.{md,mdx}",
    generateId: ({ entry }) => entry.split("/")[0],
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      date: z.coerce.date(),
      cover: image(),
      excerpt: z.string(),
    }),
});

export const collections = { blog };
