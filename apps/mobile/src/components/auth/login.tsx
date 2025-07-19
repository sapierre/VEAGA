import { memo, useState } from "react";
import { View } from "react-native";

import { SecondFactor } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";

import { Auth } from "~/components/auth/auth";
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
    <Auth.Layout>
      {(() => {
        switch (step) {
          case LoginStep.FORM:
            return (
              <LoginForm
                onTwoFactorRedirect={() => setStep(LoginStep.TWO_FACTOR)}
              />
            );
          case LoginStep.TWO_FACTOR:
            return <TwoFactorForm />;
        }
      })()}
    </Auth.Layout>
  );
};

interface LoginFormProps {
  readonly onTwoFactorRedirect?: () => void;
}

const LoginForm = memo<LoginFormProps>(({ onTwoFactorRedirect }) => {
  const { t } = useTranslation("auth");
  const options = Object.entries(authConfig.providers)
    .filter(
      ([provider, enabled]) =>
        enabled && LOGIN_OPTIONS.includes(provider as LoginOption),
    )
    .map(([provider]) => provider as LoginOption);

  return (
    <>
      <Auth.Header
        title={t("login.header.title")}
        description={t("login.header.description")}
      />
      <Auth.Providers providers={authConfig.providers.oAuth} />
      {authConfig.providers.oAuth.length > 0 && options.length > 0 && (
        <Auth.Divider />
      )}
      <VerifyMagicLink />

      <View className="gap-2">
        <Auth.Login
          options={options}
          onTwoFactorRedirect={onTwoFactorRedirect}
        />
        {authConfig.providers.anonymous && <Auth.Anonymous />}
      </View>

      <Auth.RegisterCta />
    </>
  );
});

const TwoFactorForm = () => {
  const [factor, setFactor] = useState<SecondFactor>(SecondFactor.TOTP);
  const { t } = useTranslation("auth");

  const Form = Auth.TwoFactor.Form[factor];
  const Cta =
    factor === SecondFactor.TOTP
      ? Auth.TwoFactor.Cta[SecondFactor.BACKUP_CODE]
      : Auth.TwoFactor.Cta[SecondFactor.TOTP];

  return (
    <>
      <Auth.Header
        title={t(`login.twoFactor.${factor}.header.title`)}
        description={t(`login.twoFactor.${factor}.header.description`)}
      />

      <Form />
      <Cta onFactorChange={setFactor} />
    </>
  );
};
