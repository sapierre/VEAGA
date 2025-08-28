import { LocaleCustomizer } from "@turbostarter/ui-web/i18n";

import { ThemeControls } from "~/components/common/theme";
import {
  UserNavigation,
  UserNavigationSkeleton,
} from "~/components/user/user-navigation";
import { useSession } from "~/lib/auth";
import { useLocale } from "~/lib/i18n";

export const Header = () => {
  const { change } = useLocale();

  return (
    <div className="flex items-center justify-between gap-2">
      <LocaleCustomizer onChange={change} variant="icon" />
      <ThemeControls />
      <User />
    </div>
  );
};

const User = () => {
  const { data, isPending } = useSession();

  const user = data?.user ?? null;

  if (isPending) {
    return <UserNavigationSkeleton />;
  }

  return <UserNavigation user={user} />;
};
