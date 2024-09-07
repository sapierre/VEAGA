import { createMDXSource } from "@fumadocs/content-collections";
import { loader } from "fumadocs-core/source";

import { COLLECTION_TYPE, getAll, getMeta } from "@turbostarter/cms";

import { BLOG_PREFIX } from "~/config/paths";

export const { getPage, getPages, generateParams, pageTree } = loader({
  baseUrl: BLOG_PREFIX,
  source: createMDXSource(
    getAll(COLLECTION_TYPE.BLOG),
    getMeta(COLLECTION_TYPE.BLOG),
  ),
});
