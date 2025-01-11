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
  unlinkAccount,
  deleteUser,
  sendVerificationEmail,
} = createClient();
