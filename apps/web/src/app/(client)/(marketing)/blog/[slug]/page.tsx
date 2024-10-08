import { notFound } from "next/navigation";

import { getContentItemBySlug, getContentItems } from "@turbostarter/cms";
import { CollectionType } from "@turbostarter/cms";

import { Mdx } from "~/components/common/mdx";
import { BLOG_PREFIX } from "~/config/paths";
import { getMetadata } from "~/lib/metadata";

export default function Page({ params }: { params: { slug: string } }) {
  const item = getContentItemBySlug({
    collection: CollectionType.BLOG,
    slug: params.slug,
  });

  if (!item) {
    return notFound();
  }

  return <Mdx data={item} base={BLOG_PREFIX} />;
}

export function generateStaticParams() {
  return getContentItems({ collection: CollectionType.BLOG }).items.map(
    (post) => ({
      slug: post.slug,
    }),
  );
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const item = getContentItemBySlug({
    collection: CollectionType.BLOG,
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
