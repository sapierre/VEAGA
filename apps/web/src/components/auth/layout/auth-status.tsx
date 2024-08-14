import { Suspense } from "react";

import { cn } from "@turbostarter/ui";
import { Skeleton } from "@turbostarter/ui/web";

import { api } from "~/trpc/server";

import { UserNavigation } from "./user-navigation";

const AuthStatusContent = async () => {
  const user = await api.user.get();

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

const AuthStatusSkeleton = () => {
  return <Skeleton className="h-[50px] w-52" />;
};

export const AuthStatus = () => {
  return (
    <Suspense fallback={<AuthStatusSkeleton />}>
      <AuthStatusContent />
    </Suspense>
  );
};
