"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { useTranslation } from "@turbostarter/i18n";
import { Button } from "@turbostarter/ui-web/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@turbostarter/ui-web/card";
import { Icons } from "@turbostarter/ui-web/icons";
import { Skeleton } from "@turbostarter/ui-web/skeleton";

import { listSessions, revokeSession, useSession } from "~/lib/auth/client";

export const Sessions = () => {
  const { data: session } = useSession();
  const { t } = useTranslation(["common", "auth"]);

  const {
    data: sessions,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sessions", session?.user.id],
    queryFn: () => listSessions(),
  });

  const revoke = useMutation({
    mutationFn: (token: string) => {
      const loadingToast = toast.loading(t("account.sessions.revoke.loading"));
      return revokeSession(
        { token },
        {
          onSuccess: async () => {
            toast.success(t("account.sessions.revoke.success"), {
              id: loadingToast,
            });
            await refetch();
          },
          onError: ({ error }) => {
            toast.error(error.message, {
              id: loadingToast,
            });
          },
        },
      );
    },
  });

  return (
    <Card className="h-fit w-full overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{t("account.sessions.title")}</CardTitle>
        <CardDescription className="flex flex-col gap-1 pb-1.5 text-foreground">
          {t("account.sessions.description")}
        </CardDescription>
      </CardHeader>

      {isLoading && <Skeleton className="m-6 mt-0 h-24" />}

      {sessions?.data && sessions.data.length > 0 ? (
        <ul className="m-6 mt-0 overflow-hidden rounded-md border">
          {sessions.data.map((session) => {
            return (
              <li
                key={session.id}
                className="flex min-w-0 items-center gap-3 border-b px-4 py-3 last:border-b-0"
              >
                <Icons.MonitorSmartphone className="size-6 shrink-0" />

                <div className="mr-auto grid grid-cols-1">
                  <span className="truncate text-sm font-medium capitalize">
                    {session.ipAddress}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {session.userAgent}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  disabled={revoke.isPending}
                  onClick={() => revoke.mutate(session.token)}
                  className="shrink-0"
                >
                  <span className="sr-only">
                    {t("account.sessions.revoke.cta")}
                  </span>
                  {revoke.isPending && revoke.variables === session.token ? (
                    <Icons.Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Icons.Trash className="size-4" />
                  )}
                </Button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mx-6 mb-6 flex items-center justify-center rounded-md border border-dashed p-6">
          <p className="text-center">{t("account.sessions.noSessions")}</p>
        </div>
      )}

      <CardFooter className="min-h-14 border-t bg-muted/75 py-3 text-sm text-muted-foreground dark:bg-card">
        <span>{t("account.sessions.info")}</span>
      </CardFooter>
    </Card>
  );
};
