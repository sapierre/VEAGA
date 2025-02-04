import { useQuery } from "@tanstack/react-query";

import { handle } from "@turbostarter/api/utils";
import { LocaleCustomizer } from "@turbostarter/ui-web/i18n";

import { ThemeControls } from "~/components/common/theme";
import {
  UserNavigation,
  UserNavigationSkeleton,
} from "~/components/user/user-navigation";
import { api } from "~/lib/api";
import { useSession } from "~/lib/auth";
import { useLocale } from "~/lib/i18n";

export const Header = () => {
  const { change } = useLocale();

  return (
    <div className="flex items-center justify-between gap-2">
      <LocaleCustomizer onChange={change} />
      <ThemeControls />
      <User />
    </div>
  );
};

const User = () => {
  const { data, isPending } = useSession();

  const user = data?.user ?? null;
  const { data: customer, isLoading } = useQuery({
    queryKey: ["customer"],
    queryFn: handle(api.billing.customer.$get),
    enabled: !!user,
  });

  if (isPending || isLoading) {
    return <UserNavigationSkeleton />;
  }

  return <UserNavigation user={user} customer={customer ?? null} />;
};
