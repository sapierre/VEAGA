import { CollectionType, getContentItems } from "@turbostarter/cms";

import { pathsConfig } from "~/config/paths";
import { env } from "~/lib/env";

import type { MetadataRoute } from "next";

const url = (path: string) => `${env.NEXT_PUBLIC_SITE_URL}/${path}`;

export default function sitemap(): Promise<MetadataRoute.Sitemap> {
  return Promise.resolve([
    {
      url: url(pathsConfig.index),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...getContentItems({ collection: CollectionType.BLOG }).items.map<
      MetadataRoute.Sitemap[number]
    >((post) => ({
      url: url(pathsConfig.marketing.blog.post(post.slug)),
      lastModified: new Date(post.lastModifiedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ]);
}
