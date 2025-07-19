import { Accounts } from "~/components/dashboard/settings/security/accounts/accounts";
import { EditPassword } from "~/components/dashboard/settings/security/edit-password";
import { Passkeys } from "~/components/dashboard/settings/security/passkeys/passkeys";
import { Sessions } from "~/components/dashboard/settings/security/sessions";
import { TwoFactorAuthentication } from "~/components/dashboard/settings/security/two-factor/two-factor";
import { authConfig } from "~/config/auth";
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
      {authConfig.providers.passkey && <Passkeys />}
      <TwoFactorAuthentication />
      <Sessions />
    </>
  );
}
