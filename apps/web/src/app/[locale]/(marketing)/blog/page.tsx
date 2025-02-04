import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";

import {
  CollectionType,
  ContentStatus,
  getContentItems,
} from "@turbostarter/cms";
import { getTranslation } from "@turbostarter/i18n/server";
import { SortOrder } from "@turbostarter/shared/constants";
import { Badge } from "@turbostarter/ui-web/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@turbostarter/ui-web/card";

import { TurboLink } from "~/components/common/turbo-link";
import { TagsPicker } from "~/components/marketing/blog/tags-picker";
import { pathsConfig } from "~/config/paths";
import { getMetadata } from "~/lib/metadata";

import type { ContentTag } from "@turbostarter/cms";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const generateMetadata = getMetadata({
  title: "marketing:blog.title",
  description: "marketing:blog.description",
  canonical: pathsConfig.marketing.blog.index,
});

export default async function BlogPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ tag?: ContentTag }>;
  params: Promise<{ locale: string }>;
}) {
  const tag = (await searchParams).tag;
  const locale = (await params).locale;

  const { t } = await getTranslation({ ns: "marketing" });
  const { items } = getContentItems({
    collection: CollectionType.BLOG,
    tags: tag ? [tag] : [],
    sortBy: "publishedAt",
    sortOrder: SortOrder.DESCENDING,
    status: ContentStatus.PUBLISHED,
    locale,
  });

  return (
    <div className="flex flex-col gap-6 self-start sm:gap-8 md:gap-10 lg:gap-12">
      <header className="flex flex-col items-center justify-center gap-3">
        <h1 className="lg:leading-tighter max-w-4xl text-center text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          {t("blog.title")}
        </h1>
        <p className="max-w-2xl text-center text-muted-foreground">
          {t("blog.description")}
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
                      {t(`blog.tag.${tag}`)}
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
                  <span>
                    {t("blog.timeToRead", {
                      time: Math.ceil(
                        dayjs.duration(post.timeToRead).asMinutes(),
                      ),
                    })}
                  </span>
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
}
