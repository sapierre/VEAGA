import { Auth } from "~/components/auth/auth";
import { LOGIN_OPTIONS } from "~/components/auth/form/login/constants";
import { authConfig } from "~/config/auth";

import type { LoginOption } from "~/components/auth/form/login/constants";

const LoginPage = () => {
  const options = Object.entries(authConfig.providers)
    .filter(
      ([provider, enabled]) =>
        enabled && LOGIN_OPTIONS.includes(provider as LoginOption),
    )
    .map(([provider]) => provider as LoginOption);

  return (
    <Auth.Layout>
      <Auth.Header
        title="Welcome back! 👋"
        description="Enter your email below to login to your account "
      />
      <Auth.Providers providers={authConfig.providers.oAuth} />
      {authConfig.providers.oAuth.length > 0 && options.length > 0 && (
        <Auth.Divider />
      )}
      <Auth.Login options={options} />
    </Auth.Layout>
  );
};

export default LoginPage;
