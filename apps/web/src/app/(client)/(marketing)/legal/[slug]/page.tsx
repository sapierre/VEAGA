import { notFound } from "next/navigation";

import {
  CollectionType,
  getContentItemBySlug,
  getContentItems,
} from "@turbostarter/cms";

import { Mdx } from "~/components/common/mdx";
import { LEGAL_PREFIX } from "~/config/paths";
import { getMetadata } from "~/lib/metadata";

interface PageParams {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PageParams) {
  const item = getContentItemBySlug({
    collection: CollectionType.LEGAL,
    slug: params.slug,
  });

  if (!item) {
    notFound();
  }

  return <Mdx data={item} base={LEGAL_PREFIX} />;
}

export function generateStaticParams() {
  return getContentItems({ collection: CollectionType.LEGAL }).items.map(
    ({ slug }) => ({
      slug,
    }),
  );
}

export function generateMetadata({ params }: PageParams) {
  const item = getContentItemBySlug({
    collection: CollectionType.LEGAL,
    slug: params.slug,
  });

  if (!item) {
    return notFound();
  }

  return getMetadata({
    title: item.title,
    description: item.description,
  });
}
