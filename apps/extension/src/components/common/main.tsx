import { useQuery } from "@tanstack/react-query";

import { cn } from "@turbostarter/ui";
import { Icons } from "@turbostarter/ui-web/icons";
import { Skeleton } from "@turbostarter/ui-web/skeleton";

import { Message, sendMessage } from "~/lib/messaging";

interface MainProps {
  readonly className?: string;
  readonly filename: string;
}

export const Main = ({ className, filename }: MainProps) => {
  const { data } = useQuery({
    queryKey: [Message.HELLO, filename],
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
        <p className="text-pretty text-center leading-tight">
          {data.split(filename).map((part, i) =>
            i === 0 ? (
              <>
                {part}
                <code className="inline-block rounded-sm bg-muted px-1.5 text-sm text-muted-foreground">
                  {filename}
                </code>
              </>
            ) : (
              part
            ),
          )}
        </p>
      ) : (
        <Skeleton className="h-5 w-64" />
      )}
      <a
        href="https://turbostarter.dev/docs/extension"
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer text-sm text-primary underline hover:no-underline"
      >
        Learn more
      </a>
    </main>
  );
};
