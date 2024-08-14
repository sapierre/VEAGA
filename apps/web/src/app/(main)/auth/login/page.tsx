// export const metadata = getMetadata({
//   title: "Login",
//   url: "/auth/login",
//   canonical: "/auth/login",
// });

import { SOCIAL_PROVIDER } from "@turbostarter/auth";

import { Auth } from "~/components/auth/auth";

const Login = async () => {
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
        <Auth.Providers providers={Object.values(SOCIAL_PROVIDER)} />
        <Auth.Divider />
        <Auth.Login />
      </Auth.Layout>
    </>
  );
};

export default Login;
