import { redirect } from "next/navigation";

import { Accounts } from "~/components/dashboard/settings/general/accounts/accounts";
import { AvatarSettings } from "~/components/dashboard/settings/general/avatar/avatar-settings";
import { DeleteAccount } from "~/components/dashboard/settings/general/delete-account";
import { EditEmail } from "~/components/dashboard/settings/general/edit-email";
import { EditName } from "~/components/dashboard/settings/general/edit-name";
import { EditPassword } from "~/components/dashboard/settings/general/edit-password";
import { pathsConfig } from "~/config/paths";
import { getSession } from "~/lib/auth/server";
import { getMetadata } from "~/lib/metadata";

export const metadata = getMetadata({
  title: "Settings",
  description: "Manage your account settings and preferences",
});

export default async function SettingsPage() {
  const { user } = await getSession();

  if (!user) {
    return redirect(pathsConfig.auth.login);
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <header className="py-2">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </header>

      <AvatarSettings user={user} />
      <EditName user={user} />
      <EditEmail user={user} />
      <EditPassword />
      <Accounts />
      <DeleteAccount />
    </div>
  );
}
