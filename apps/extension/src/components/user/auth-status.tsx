import { sendToBackground } from "@plasmohq/messaging";
import { useQuery } from "@tanstack/react-query";

import { cn } from "@turbostarter/ui";
import { Skeleton } from "@turbostarter/ui/web";

import { UserNavigation } from "./navigation/user-navigation";

import type { Session } from "@turbostarter/auth";

import { MESSAGE } from "~background";
import { SESSION_MESSAGE_TYPE } from "~background/messages/session";

const AuthStatusSkeleton = () => {
  return <Skeleton className="h-[50px] w-52" />;
};

export const AuthStatus = () => {
  const { data, isLoading } = useQuery({
    queryKey: [MESSAGE.SESSION],
    queryFn: () =>
      sendToBackground<
        {
          type: typeof SESSION_MESSAGE_TYPE.GET;
        },
        {
          session: Session | null;
        }
      >({
        name: MESSAGE.SESSION,
        body: { type: SESSION_MESSAGE_TYPE.GET },
      }),
  });

  const user = data?.session?.user;

  if (isLoading) {
    return <AuthStatusSkeleton />;
  }

  return (
    <div className="flex w-full items-center justify-center gap-3 md:w-fit">
      <p
        className={cn("grow rounded-md border px-6 py-3 text-center", {
          "border-destructive bg-destructive/25 text-destructive": !user,
          "border-success bg-success/25": user,
        })}
      >
        {user ? (
          <span>
            Logged in as <b>{user.email}</b>
          </span>
        ) : (
          "You're not logged in."
        )}
      </p>

      {user && <UserNavigation user={user} />}
    </div>
  );
};
