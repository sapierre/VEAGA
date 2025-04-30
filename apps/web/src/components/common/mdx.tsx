import { MDXContent } from "@content-collections/mdx/react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";

import { getTranslation } from "@turbostarter/i18n/server";
import { badgeVariants } from "@turbostarter/ui-web/badge";

import type { ContentTag } from "@turbostarter/cms";

dayjs.extend(duration);
dayjs.extend(relativeTime);

interface MdxProps {
  readonly data: {
    readonly title: string;
    readonly description: string;
    readonly mdx: string;
    readonly thumbnail?: string;
    readonly publishedAt?: Date;
    readonly tags?: ContentTag[];
    readonly timeToRead?: number;
  };
  readonly base: string;
}

export const Mdx = async ({ data, base }: MdxProps) => {
  const { t } = await getTranslation({ ns: "marketing" });

  return (
    <div className="flex w-full max-w-3xl flex-col gap-4 self-start md:mx-auto">
      {data.tags && (
        <div className="mb-1 flex flex-wrap gap-1 md:gap-1.5">
          {data.tags.map((tag) => (
            <Link
              key={tag}
              href={`${base}?tag=${tag}`}
              className={badgeVariants({ variant: "outline" })}
            >
              {t(`blog.tag.${tag}`)}
            </Link>
          ))}
        </div>
      )}

      <h1 className="text-pretty text-4xl font-bold tracking-tighter md:text-5xl">
        {data.title}
      </h1>

      <div className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
        {data.publishedAt && (
          <>
            <time
              className="text-muted-foreground"
              dateTime={data.publishedAt.toISOString()}
            >
              {dayjs(data.publishedAt).format("MMMM D, YYYY")}
            </time>
          </>
        )}

        {data.publishedAt && data.timeToRead && <span>·</span>}
        {typeof data.timeToRead !== "undefined" && (
          <span>
            {t("blog.timeToRead", {
              time: Math.ceil(dayjs.duration(data.timeToRead).asMinutes()),
            })}
          </span>
        )}
      </div>

      <p className="mb-2 text-base text-muted-foreground">{data.description}</p>

      {data.thumbnail && (
        <div className="relative -mx-2 aspect-[12/8]">
          <Image
            alt=""
            fill
            src={data.thumbnail}
            className="rounded-lg object-cover"
          />
        </div>
      )}
      <div className="prose py-6 dark:prose-invert">
        <MDXContent code={data.mdx} />
      </div>
    </div>
  );
};
