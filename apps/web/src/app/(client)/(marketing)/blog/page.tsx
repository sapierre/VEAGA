import dayjs from "dayjs";
import Image from "next/image";

import {
  CollectionType,
  ContentStatus,
  getContentItems,
} from "@turbostarter/cms";
import { SortOrder } from "@turbostarter/shared/constants";
import { Badge } from "@turbostarter/ui-web/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@turbostarter/ui-web/card";

import { TagsPicker } from "~/components/blog/tags-picker";
import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";
import { getMetadata } from "~/lib/metadata";

import type { ContentTag } from "@turbostarter/cms";

export const metadata = getMetadata({
  title: "Blog",
  description: "News and updates about the platform",
});

const BlogPage = ({ searchParams }: { searchParams: { tag?: ContentTag } }) => {
  const { items } = getContentItems({
    collection: CollectionType.BLOG,
    tags: searchParams.tag ? [searchParams.tag] : [],
    sortBy: "publishedAt",
    sortOrder: SortOrder.DESCENDING,
    status: ContentStatus.PUBLISHED,
  });

  return (
    <div className="flex flex-col gap-6 self-start sm:gap-8 md:gap-10 lg:gap-12">
      <header className="flex flex-col items-center justify-center gap-3">
        <h1 className="lg:leading-tighter max-w-4xl text-center text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Blog
        </h1>
        <p className="max-w-2xl text-center text-muted-foreground">
          News and updates about the platform
        </p>
      </header>

      <TagsPicker />

      <main className="grid grid-cols-1 items-start justify-center gap-x-10 gap-y-8 md:grid-cols-2 md:gap-y-12 lg:grid-cols-3 lg:gap-y-16">
        {items.map((post) => (
          <TurboLink
            key={post.slug}
            href={pathsConfig.marketing.blog.post(post.slug)}
            className="group basis-[34rem]"
          >
            <Card className="border-none shadow-none">
              <CardHeader className="space-y-2 p-3 pb-2">
                <div className="-mx-3 -mt-3 mb-3 aspect-[12/8] overflow-hidden rounded-lg bg-muted">
                  <div className="relative h-full w-full transition-transform duration-300 group-hover:scale-105">
                    <Image
                      alt=""
                      fill
                      src={post.thumbnail}
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 pb-1">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="leading-tight">
                  <span className="bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-300 ease-out group-hover:bg-[length:100%_2px]">
                    {post.title}
                  </span>
                </CardTitle>
                <div className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                  <time dateTime={post.publishedAt.toISOString()}>
                    {dayjs(post.publishedAt).format("MMMM D, YYYY")}
                  </time>
                  <span>·</span>
                  <span>{post.timeToRead}</span>
                </div>
              </CardHeader>

              <CardContent className="p-3 pt-0">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
              </CardContent>
            </Card>
          </TurboLink>
        ))}
      </main>
    </div>
  );
};

export default BlogPage;
