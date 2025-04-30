import { Suspense } from "react";

import { AUTH_PROVIDER } from "@turbostarter/auth";
import { getTranslation } from "@turbostarter/i18n/server";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@turbostarter/ui-web/tabs";

import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";

import { MagicLinkLoginForm } from "./magic-link";
import { PasswordLoginForm } from "./password";

import type { LoginOption } from "./constants";

const LOGIN_OPTIONS_DETAILS = {
  [AUTH_PROVIDER.PASSWORD]: {
    component: PasswordLoginForm,
    label: "password",
  },
  [AUTH_PROVIDER.MAGIC_LINK]: {
    component: MagicLinkLoginForm,
    label: "login.magicLink.label",
  },
} as const;

interface LoginFormProps {
  readonly options: LoginOption[];
  readonly redirectTo?: string;
}

export const LoginForm = async ({ options, redirectTo }: LoginFormProps) => {
  const { t } = await getTranslation({ ns: "auth" });
  const [mainOption] = options;

  if (!options.length || !mainOption) {
    return null;
  }

  if (options.length === 1) {
    const Component = LOGIN_OPTIONS_DETAILS[mainOption].component;
    return <Component redirectTo={redirectTo} />;
  }

  return (
    <Tabs
      defaultValue={mainOption}
      className="flex w-full flex-col items-center justify-center gap-2"
    >
      <TabsList className="w-full">
        {options.map((provider) => (
          <TabsTrigger key={provider} value={provider} className="w-full">
            {t(LOGIN_OPTIONS_DETAILS[provider].label)}
          </TabsTrigger>
        ))}
      </TabsList>

      {options.map((provider) => {
        const Component = LOGIN_OPTIONS_DETAILS[provider].component;
        return (
          <TabsContent key={provider} value={provider} className="w-full">
            <Suspense>
              <Component />
            </Suspense>
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export const LoginCta = async () => {
  const { t } = await getTranslation({ ns: "auth" });

  return (
    <div className="flex items-center justify-center pt-2">
      <div className="text-sm text-muted-foreground">
        {t("register.alreadyHaveAccount")}
        <TurboLink
          href={pathsConfig.auth.login}
          className="pl-2 font-medium underline underline-offset-4 hover:text-primary"
        >
          {t("login.cta")}!
        </TurboLink>
      </div>
    </div>
  );
};
