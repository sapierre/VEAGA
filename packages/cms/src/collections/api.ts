import {
  allBlogMetas,
  allBlogs,
  allLegalMetas,
  allLegals,
} from "../../.content-collections/generated";
import { COLLECTION_TYPE } from "../constants";

import type { CollectionType } from "../constants";

const content = {
  [COLLECTION_TYPE.LEGAL]: {
    all: allLegals,
    meta: allLegalMetas,
  },
  [COLLECTION_TYPE.BLOG]: {
    all: allBlogs,
    meta: allBlogMetas,
  },
} as const;

export const getPage = (collection: CollectionType, slug: string) => {
  return content[collection].all.find((page) => page.slug === slug);
};

export const getAll = (collection: CollectionType) => {
  return content[collection].all;
};

export const getMeta = (collection: CollectionType) => {
  return content[collection].meta;
};
