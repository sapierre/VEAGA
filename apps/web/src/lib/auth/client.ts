import { toast } from "sonner";

import { createClient } from "@turbostarter/auth/client/web";

export const {
  useSession,
  signIn,
  signUp,
  signOut,
  forgetPassword,
  resetPassword,
  changePassword,
  updateUser,
  changeEmail,
  listAccounts,
  linkSocial,
  passkey,
  unlinkAccount,
  deleteUser,
  sendVerificationEmail,
  listSessions,
  revokeSession,
  twoFactor,
} = createClient({
  baseURL: "http://localhost:3000",
  fetchOptions: {
    throw: true,
    onError: ({ error, response }) => {
      console.error("Auth error:", error);
      console.error("Response:", response);
      console.error("Error details:", JSON.stringify(error, null, 2));

      // Handle specific error cases
      let errorMessage = 'An error occurred during authentication';

      if (error?.status === 422) {
        errorMessage = 'This email is already registered. Please use a different email or try logging in.';
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.error) {
        errorMessage = error.error;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      toast.error(errorMessage);
    },
  },
});
