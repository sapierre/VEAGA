// export const metadata = getMetadata({
//   title: "Login",
//   url: "/auth/login",
//   canonical: "/auth/login",
// });

import { Auth } from "~/components/auth/auth";
import { authConfig } from "~/config/auth.config";

const Login = () => {
  // const { data } = await supabase().auth.getUser();

  // if (data.user) {
  //   return redirect("/dashboard");
  // }

  return (
    <>
      <Auth.Layout>
        <Auth.Header
          title="Welcome back! 👋"
          description="Enter your email below to login to your account "
        />
        <Auth.Providers providers={authConfig.providers.oAuth} />
        {authConfig.providers.oAuth.length > 0 && <Auth.Divider />}
        <Auth.Login />
      </Auth.Layout>
    </>
  );
};

export default Login;
