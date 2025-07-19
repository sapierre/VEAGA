"use client";

import { memo, useState } from "react";

import { SecondFactor } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";

import { authConfig } from "~/config/auth";

import { Auth } from "./auth";
import { LOGIN_OPTIONS } from "./form/login/constants";

import type { LoginOption } from "./form/login/constants";

const LoginStep = {
  FORM: "FORM",
  TWO_FACTOR: "TWO_FACTOR",
} as const;

type LoginStep = (typeof LoginStep)[keyof typeof LoginStep];

interface LoginFlowProps {
  readonly redirectTo?: string;
}

export const LoginFlow = ({ redirectTo }: LoginFlowProps) => {
  const [step, setStep] = useState<LoginStep>(LoginStep.FORM);

  return (
    <Auth.Layout>
      {(() => {
        switch (step) {
          case LoginStep.FORM:
            return (
              <LoginForm
                redirectTo={redirectTo}
                onTwoFactorRedirect={() => setStep(LoginStep.TWO_FACTOR)}
              />
            );
          case LoginStep.TWO_FACTOR:
            return <TwoFactorForm redirectTo={redirectTo} />;
        }
      })()}
    </Auth.Layout>
  );
};

interface LoginFormProps extends LoginFlowProps {
  readonly onTwoFactorRedirect?: () => void;
}

const LoginForm = memo<LoginFormProps>(
  ({ redirectTo, onTwoFactorRedirect }) => {
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

        <div className="flex flex-col gap-2">
          <Auth.Providers
            providers={authConfig.providers.oAuth}
            redirectTo={redirectTo}
          />
          {authConfig.providers.passkey && (
            <Auth.Passkey redirectTo={redirectTo} />
          )}
        </div>

        {(authConfig.providers.oAuth.length > 0 ||
          authConfig.providers.passkey) &&
          options.length > 0 && <Auth.Divider />}

        <div className="flex flex-col gap-2">
          <Auth.Login
            options={options}
            redirectTo={redirectTo}
            onTwoFactorRedirect={onTwoFactorRedirect}
          />

          {authConfig.providers.anonymous && <Auth.Anonymous />}
        </div>

        <Auth.RegisterCta />
      </>
    );
  },
);

const TwoFactorForm = memo<LoginFlowProps>(({ redirectTo }) => {
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

      <Form redirectTo={redirectTo} />
      <Cta onFactorChange={setFactor} />
    </>
  );
});
