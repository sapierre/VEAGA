import { api } from "~/trpc/server";

const ProtectedPage = async () => {
  const { secret } = await api.user.secret();
  return (
    <div>
      <h1>Protected Page</h1>
      <p>{secret}</p>
    </div>
  );
};
export default ProtectedPage;
