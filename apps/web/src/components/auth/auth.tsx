import { memo } from "react";

import { AnonymousLogin } from "~/components/auth/form/anonymous";
import { TwoFactorForm, TwoFactorCta } from "~/components/auth/form/two-factor";

import { LoginCta, LoginForm } from "./form/login/form";
import { PasskeyLogin } from "./form/login/passkey";
import { ForgotPasswordForm } from "./form/password/forgot";
import { UpdatePasswordForm } from "./form/password/update";
import { RegisterCta, RegisterForm } from "./form/register-form";
import { SocialProviders } from "./form/social-providers";
import { AuthDivider } from "./layout/auth-divider";
import { AuthHeader } from "./layout/auth-header";

interface AuthLayoutProps {
  readonly children: React.ReactNode;
}

const AuthLayout = memo<AuthLayoutProps>(({ children }) => {
  return (
    <div className="mb-auto mt-16 flex w-full max-w-md flex-col gap-6 pb-16">
      {children}
    </div>
  );
});

AuthLayout.displayName = "AuthLayout";

export {
  AuthLayout,
  AuthHeader,
  AuthDivider,
  SocialProviders,
  PasskeyLogin,
  LoginForm,
  LoginCta,
  RegisterForm,
  RegisterCta,
  AnonymousLogin,
  ForgotPasswordForm,
  UpdatePasswordForm,
  TwoFactorForm,
  TwoFactorCta,
};
