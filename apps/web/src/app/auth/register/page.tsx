// export const metadata = getMetadata({
//   title: "Register",
//   url: "/auth/register",
// });

import { Auth } from "~/components/auth/auth";
import { authConfig } from "~/config/auth.config";

const Register = () => {
  return (
    <>
      <Auth.Layout>
        <Auth.Header
          title="Create an account"
          description="Please fill in the form below to create your account"
        />
        <Auth.Providers providers={authConfig.providers.oAuth} />
        {authConfig.providers.oAuth.length > 0 && <Auth.Divider />}
        <Auth.Register />
      </Auth.Layout>
    </>
  );
};

export default Register;
