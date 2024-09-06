import { defineCollection } from "@content-collections/core";
import { transformMDX } from "@fumadocs/content-collections/configuration";
import slugify from "slugify";

import { createMetaSchema } from "../../constants";

const content = defineCollection({
  name: "legal",
  directory: "src/collections/legal/content",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
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
  name: "legalMeta",
  directory: "src/collections/legal/content",
  include: "**/meta.json",
  parser: "json",
  schema: createMetaSchema,
});

export const legal = [content, meta];
