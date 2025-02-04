import { useQuery } from "@tanstack/react-query";

import { useTranslation } from "@turbostarter/i18n";
import { cn } from "@turbostarter/ui";
import { Icons } from "@turbostarter/ui-web/icons";
import { Skeleton } from "@turbostarter/ui-web/skeleton";

import { Message, sendMessage } from "~/lib/messaging";

interface MainProps {
  readonly className?: string;
  readonly filename: string;
}

export const Main = ({ className, filename }: MainProps) => {
  const { t, i18n } = useTranslation("common");
  const { data } = useQuery({
    queryKey: [Message.HELLO, filename, i18n.language],
    queryFn: () => sendMessage(Message.HELLO, filename),
  });

  return (
    <main
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className,
      )}
    >
      <Icons.Logo className="w-20 animate-pulse text-primary" />
      {data ? (
        <p
          className="text-pretty text-center leading-tight"
          dangerouslySetInnerHTML={{
            __html: data.replace(
              "<code>",
              "<code class='inline-block rounded-sm bg-muted px-1.5 text-sm text-muted-foreground'>",
            ),
          }}
        ></p>
      ) : (
        <Skeleton className="h-5 w-64" />
      )}
      <a
        href="https://turbostarter.dev/docs/extension"
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer text-sm text-primary underline hover:no-underline"
      >
        {t("learnMore")}
      </a>
    </main>
  );
};
