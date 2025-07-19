import { LoginFlow } from "~/components/auth/login";
import { getMetadata } from "~/lib/metadata";

export const generateMetadata = getMetadata({
  title: "auth:login.title",
});

const Login = async ({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) => {
  return <LoginFlow redirectTo={(await searchParams).redirectTo} />;
};

export default Login;
