import { sendToBackground } from "@plasmohq/messaging";
import { useQuery } from "@tanstack/react-query";
import { MESSAGE } from "~background";
import { AuthStatus } from "~components/user/auth-status";

export const Header = () => {
  return (
    <div>
      <AuthStatus />
    </div>
  );
};
