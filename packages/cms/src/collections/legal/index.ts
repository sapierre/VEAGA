import { defineCollection } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import slugify from "slugify";

import { ContentStatus } from "../../types";
import { getLastModifiedAt } from "../../utils";

export const legal = defineCollection({
  name: "legal",
  directory: "src/collections/legal/content",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    status: z.nativeEnum(ContentStatus),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    const lastModifiedAt = await context.cache(
      document._meta.filePath,
      getLastModifiedAt,
    );

    return {
      ...document,
      mdx,
      lastModifiedAt,
      slug: slugify(document.title, { lower: true }),
    };
  },
});
