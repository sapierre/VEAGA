import { Link } from "expo-router";
import { Suspense, useState } from "react";
import { View } from "react-native";

import { AuthProvider } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@turbostarter/ui-mobile/tabs";
import { Text } from "@turbostarter/ui-mobile/text";

import { pathsConfig } from "~/config/paths";

import { MagicLinkLoginForm } from "./magic-link";
import { PasswordLoginForm } from "./password";

import type { LoginOption } from "./constants";

const LOGIN_OPTIONS_DETAILS = {
  [AuthProvider.PASSWORD]: {
    component: PasswordLoginForm,
    label: "password",
  },
  [AuthProvider.MAGIC_LINK]: {
    component: MagicLinkLoginForm,
    label: "login.magicLink.label",
  },
} as const;

interface LoginFormProps {
  readonly options: LoginOption[];
  readonly onTwoFactorRedirect?: () => void;
}

export const LoginForm = ({ options, onTwoFactorRedirect }: LoginFormProps) => {
  const { t } = useTranslation("auth");
  const [mainOption] = options;

  const [value, setValue] = useState(mainOption);

  if (!options.length || !value) {
    return null;
  }

  if (options.length === 1) {
    const Component = LOGIN_OPTIONS_DETAILS[value].component;
    return <Component onTwoFactorRedirect={onTwoFactorRedirect} />;
  }

  return (
    <Tabs
      value={value}
      onValueChange={(val) => setValue(val as LoginOption)}
      className="flex w-full flex-col items-center justify-center gap-6"
    >
      <TabsList className="w-full flex-row">
        {options.map((provider) => (
          <TabsTrigger key={provider} value={provider} className="grow">
            <Text>{t(LOGIN_OPTIONS_DETAILS[provider].label)}</Text>
          </TabsTrigger>
        ))}
      </TabsList>

      {options.map((provider) => {
        const Component = LOGIN_OPTIONS_DETAILS[provider].component;
        return (
          <TabsContent key={provider} value={provider} className="w-full">
            <Suspense>
              <Component onTwoFactorRedirect={onTwoFactorRedirect} />
            </Suspense>
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export const LoginCta = () => {
  const { t } = useTranslation("auth");
  return (
    <View className="items-center justify-center pt-2">
      <View className="flex-row">
        <Text className="text-sm text-muted-foreground">
          {t("register.alreadyHaveAccount")}
        </Text>
        <Link
          href={pathsConfig.tabs.auth.login}
          className="pl-2 text-sm text-muted-foreground underline hover:text-primary"
        >
          {t("login.cta")}
        </Link>
      </View>
    </View>
  );
};
