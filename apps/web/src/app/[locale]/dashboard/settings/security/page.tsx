import { Accounts } from "~/components/dashboard/settings/security/accounts/accounts";
import { EditPassword } from "~/components/dashboard/settings/security/edit-password";
import { Sessions } from "~/components/dashboard/settings/security/sessions";
import { getMetadata } from "~/lib/metadata";

export const generateMetadata = getMetadata({
  title: "auth:account.settings.security.title",
  description: "auth:account.settings.security.description",
});

export default function SettingsPage() {
  return (
    <>
      <EditPassword />
      <Accounts />
      <Sessions />
    </>
  );
}
