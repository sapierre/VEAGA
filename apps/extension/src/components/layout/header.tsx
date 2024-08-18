import { ThemeControls } from "~components/common/theme";
import { AuthStatus } from "~components/user/auth-status";

export const Header = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-2">
      <ThemeControls />
      <AuthStatus />
    </div>
  );
};
