import { memo } from "react";

import { AnonymousLogin } from "~/components/auth/form/anonymous";

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
    <div className="grow">
      <div className="flex flex-1 flex-col justify-start lg:flex-none">
        <div className="mx-auto w-full max-w-[26rem]">
          <main className="flex flex-col gap-6">{children}</main>
        </div>
      </div>
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
};
