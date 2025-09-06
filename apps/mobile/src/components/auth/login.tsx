import { memo, useState } from "react";
import { View } from "react-native";

import { SecondFactor } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";

import {
  AuthLayout,
  AuthHeader,
  AuthDivider,
  SocialProviders,
  LoginForm,
  RegisterCta,
  AnonymousLogin,
  TwoFactorForm,
  TwoFactorCta,
} from "~/components/auth/auth";
import { LOGIN_OPTIONS } from "~/components/auth/form/login/constants";
import { VerifyMagicLink } from "~/components/auth/form/login/magic-link";
import { authConfig } from "~/config/auth";

import type { LoginOption } from "~/components/auth/form/login/constants";

const LoginStep = {
  FORM: "FORM",
  TWO_FACTOR: "TWO_FACTOR",
} as const;

type LoginStep = (typeof LoginStep)[keyof typeof LoginStep];

export const LoginFlow = () => {
  const [step, setStep] = useState<LoginStep>(LoginStep.FORM);

  return (
    <AuthLayout>
      {(() => {
        switch (step) {
          case LoginStep.FORM:
            return (
              <Login
                onTwoFactorRedirect={() => setStep(LoginStep.TWO_FACTOR)}
              />
            );
          case LoginStep.TWO_FACTOR:
            return <TwoFactor />;
        }
      })()}
    </AuthLayout>
  );
};

interface LoginProps {
  readonly onTwoFactorRedirect?: () => void;
}

const Login = memo<LoginProps>(({ onTwoFactorRedirect }) => {
  const { t } = useTranslation("auth");
  const options = Object.entries(authConfig.providers)
    .filter(
      ([provider, enabled]) =>
        enabled && LOGIN_OPTIONS.includes(provider as LoginOption),
    )
    .map(([provider]) => provider as LoginOption);

  return (
    <>
      <AuthHeader
        title={t("login.header.title")}
        description={t("login.header.description")}
      />
      <SocialProviders providers={authConfig.providers.oAuth} />
      {authConfig.providers.oAuth.length > 0 && options.length > 0 && (
        <AuthDivider />
      )}
      <VerifyMagicLink />

      <View className="gap-2">
        <LoginForm
          options={options}
          onTwoFactorRedirect={onTwoFactorRedirect}
        />
        {authConfig.providers.anonymous && <AnonymousLogin />}
      </View>

      <RegisterCta />
    </>
  );
});

const TwoFactor = () => {
  const [factor, setFactor] = useState<SecondFactor>(SecondFactor.TOTP);
  const { t } = useTranslation("auth");

  const Form = TwoFactorForm[factor];
  const Cta =
    factor === SecondFactor.TOTP
      ? TwoFactorCta[SecondFactor.BACKUP_CODE]
      : TwoFactorCta[SecondFactor.TOTP];

  return (
    <>
      <AuthHeader
        title={t(`login.twoFactor.${factor}.header.title`)}
        description={t(`login.twoFactor.${factor}.header.description`)}
      />

      <Form />
      <Cta onFactorChange={setFactor} />
    </>
  );
};
