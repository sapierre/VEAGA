import {
  allBlogMetas,
  allBlogs,
  allLegalMetas,
  allLegals,
} from "../../.content-collections/generated";
import { COLLECTION_TYPE } from "../constants";

export const content = {
  [COLLECTION_TYPE.LEGAL]: {
    all: allLegals,
    meta: allLegalMetas,
  },
  [COLLECTION_TYPE.BLOG]: {
    all: allBlogs,
    meta: allBlogMetas,
  },
} as const;
