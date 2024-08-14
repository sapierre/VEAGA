// export const metadata = getMetadata({
//   title: "Register",
//   url: "/auth/register",
// });

import { SOCIAL_PROVIDER } from "@turbostarter/auth";

import { Auth } from "~/components/auth/auth";

const Register = () => {
  return (
    <>
      <Auth.Layout>
        <Auth.Header
          title="Create an account"
          description="Please fill in the form below to create your account"
        />
        <Auth.Providers providers={Object.values(SOCIAL_PROVIDER)} />
        <Auth.Divider />
        <Auth.Register />
      </Auth.Layout>
    </>
  );
};

export default Register;
