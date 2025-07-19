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
  fetchOptions: {
    throw: true,
    onError: ({ error }) => {
      console.error(error);
      toast.error(error.message);
    },
  },
});
