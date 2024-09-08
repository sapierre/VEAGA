import { defineCollection } from "@content-collections/core";
import { transformMDX } from "@fumadocs/content-collections/configuration";
import slugify from "slugify";

import { createMetaSchema } from "../../constants";

const content = defineCollection({
  name: "blog",
  directory: "src/collections/blog/content",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()),
  }),
  transform: async (doc, context) => {
    const mdx = await transformMDX(doc, context);

    return {
      ...mdx,
      slug: slugify(doc.title, { lower: true }),
    };
  },
});

const meta = defineCollection({
  name: "blogMeta",
  directory: "src/collections/blog/content",
  include: "**/meta.json",
  parser: "json",
  schema: createMetaSchema,
});

export const blog = [content, meta];
