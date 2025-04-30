import { memo } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";

import { AnonymousLogin } from "~/components/auth/form/anonymous";
import { LoginCta, LoginForm } from "~/components/auth/form/login/form";
import { ForgotPasswordForm } from "~/components/auth/form/password/forgot";
import { UpdatePasswordForm } from "~/components/auth/form/password/update";
import {
  RegisterCta,
  RegisterForm,
} from "~/components/auth/form/register-form";
import { SocialProviders } from "~/components/auth/form/social-providers";
import { AuthDivider } from "~/components/auth/layout/auth-divider";
import { AuthHeader } from "~/components/auth/layout/auth-header";

interface AuthLayoutProps {
  readonly children: React.ReactNode;
}

const AuthLayout = memo<AuthLayoutProps>(({ children }) => {
  return (
    <KeyboardAvoidingView className="flex-1 bg-background" behavior="padding">
      <ScrollView
        contentContainerClassName="grow bg-background px-6 py-10"
        bounces={false}
      >
        <View className="flex flex-1 justify-start">
          <View className="mx-auto w-full">
            <View className="flex flex-col gap-6">{children}</View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

AuthLayout.displayName = "AuthLayout";

export const Auth = {
  Layout: AuthLayout,
  Header: AuthHeader,
  Divider: AuthDivider,
  Providers: SocialProviders,
  Login: LoginForm,
  LoginCta: LoginCta,
  Register: RegisterForm,
  RegisterCta: RegisterCta,
  Anonymous: AnonymousLogin,
  ForgotPassword: ForgotPasswordForm,
  UpdatePassword: UpdatePasswordForm,
};
