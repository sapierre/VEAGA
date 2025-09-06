"use client";

import { memo, useState } from "react";

import { SecondFactor } from "@turbostarter/auth";
import { useTranslation } from "@turbostarter/i18n";

import { authConfig } from "~/config/auth";

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
  PasskeyLogin,
} from "./auth";
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
    <AuthLayout>
      {(() => {
        switch (step) {
          case LoginStep.FORM:
            return (
              <Login
                redirectTo={redirectTo}
                onTwoFactorRedirect={() => setStep(LoginStep.TWO_FACTOR)}
              />
            );
          case LoginStep.TWO_FACTOR:
            return <TwoFactor redirectTo={redirectTo} />;
        }
      })()}
    </AuthLayout>
  );
};

interface LoginProps extends LoginFlowProps {
  readonly onTwoFactorRedirect?: () => void;
}

const Login = memo<LoginProps>(({ redirectTo, onTwoFactorRedirect }) => {
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

      <div className="flex flex-col gap-2">
        <SocialProviders
          providers={authConfig.providers.oAuth}
          redirectTo={redirectTo}
        />
        {authConfig.providers.passkey && (
          <PasskeyLogin redirectTo={redirectTo} />
        )}
      </div>

      {(authConfig.providers.oAuth.length > 0 ||
        authConfig.providers.passkey) &&
        options.length > 0 && <AuthDivider />}

      <div className="flex flex-col gap-2">
        <LoginForm
          options={options}
          redirectTo={redirectTo}
          onTwoFactorRedirect={onTwoFactorRedirect}
        />

        {authConfig.providers.anonymous && <AnonymousLogin />}
      </div>

      <RegisterCta />
    </>
  );
});

const TwoFactor = memo<LoginFlowProps>(({ redirectTo }) => {
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

      <Form redirectTo={redirectTo} />
      <Cta onFactorChange={setFactor} />
    </>
  );
});
