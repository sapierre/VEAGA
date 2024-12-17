import { useQuery } from "@tanstack/react-query";

import { ThemeControls } from "~/components/common/theme";
import {
  UserNavigation,
  UserNavigationSkeleton,
} from "~/components/user/user-navigation";
import { api } from "~/lib/api/trpc";
import { Message, sendMessage } from "~/lib/messaging";

export const Header = () => {
  return (
    <div className="flex items-center justify-between gap-2">
      <ThemeControls />
      <User />
    </div>
  );
};

const User = () => {
  const { data: session, isLoading: isSessionLoading } = useQuery({
    queryKey: [Message.SESSION_GET],
    queryFn: () => sendMessage(Message.SESSION_GET, undefined),
  });

  const user = session?.user ?? null;
  const { data: customer, isLoading: isCustomerLoading } =
    api.billing.getCustomer.useQuery(undefined, {
      enabled: !!user,
    });

  if (isSessionLoading || isCustomerLoading) {
    return <UserNavigationSkeleton />;
  }

  return <UserNavigation user={user} customer={customer ?? null} />;
};
