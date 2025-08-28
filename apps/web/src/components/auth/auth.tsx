import { memo } from "react";

import { AnonymousLogin } from "~/components/auth/form/anonymous";
import { TwoFactor } from "~/components/auth/form/two-factor";

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

export const Auth = {
  Layout: AuthLayout,
  Header: AuthHeader,
  Providers: SocialProviders,
  Divider: AuthDivider,
  Login: LoginForm,
  LoginCta: LoginCta,
  Register: RegisterForm,
  RegisterCta: RegisterCta,
  ForgotPassword: ForgotPasswordForm,
  UpdatePassword: UpdatePasswordForm,
  Anonymous: AnonymousLogin,
  Passkey: PasskeyLogin,
  TwoFactor,
};
