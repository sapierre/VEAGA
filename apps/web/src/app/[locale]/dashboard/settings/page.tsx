import { redirect } from "next/navigation";

import { AvatarSettings } from "~/components/dashboard/settings/general/avatar/avatar-settings";
import { DeleteAccount } from "~/components/dashboard/settings/general/delete-account";
import { EditEmail } from "~/components/dashboard/settings/general/edit-email";
import { EditName } from "~/components/dashboard/settings/general/edit-name";
import { LanguageSwitcher } from "~/components/dashboard/settings/general/language-switcher";
import { pathsConfig } from "~/config/paths";
import { getSession } from "~/lib/auth/server";
import { getMetadata } from "~/lib/metadata";

export const generateMetadata = getMetadata({
  title: "auth:account.settings.title",
  description: "auth:account.settings.header.description",
});

export default async function SettingsPage() {
  const { user } = await getSession();

  if (!user) {
    return redirect(pathsConfig.auth.login);
  }

  return (
    <>
      <AvatarSettings user={user} />
      <LanguageSwitcher />
      <EditName user={user} />
      <EditEmail user={user} />
      <DeleteAccount />
    </>
  );
}
