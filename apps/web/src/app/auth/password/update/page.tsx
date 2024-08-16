// export const metadata = getMetadata({
//   title: "Register",
//   url: "/auth/register",
// });

import { Auth } from "~/components/auth/auth";

const UpdatePassword = () => {
  return (
    <>
      <Auth.Layout>
        <Auth.Header
          title="Update password"
          description="Enter your new password to update your account"
        />
        <Auth.UpdatePassword />
      </Auth.Layout>
    </>
  );
};

export default UpdatePassword;
