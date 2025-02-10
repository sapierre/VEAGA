"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";

import { ContentTag } from "@turbostarter/cms";
import { useTranslation } from "@turbostarter/i18n";
import { cn } from "@turbostarter/ui";
import { Button } from "@turbostarter/ui-web/button";

export const TagsPicker = () => {
  const { t } = useTranslation("marketing");
  const [activeTag, setActiveTag] = useQueryState("tag", {
    ...parseAsStringLiteral(Object.values(ContentTag)),
    shallow: false,
  });

  return (
    <div className="mx-auto flex flex-wrap items-center justify-center gap-1.5">
      {Object.values(ContentTag).map((tag) => (
        <Button
          key={tag}
          variant={tag === activeTag ? "default" : "outline"}
          size="sm"
          className={cn("rounded-full px-4", {
            "border border-primary": tag === activeTag,
          })}
          onClick={() =>
            activeTag === tag ? setActiveTag(null) : setActiveTag(tag)
          }
        >
          {t(`blog.tag.${tag}`)}
        </Button>
      ))}
    </div>
  );
};

TagsPicker.displayName = "TagsPicker";
