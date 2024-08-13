import { api } from "~/trpc/server";

const HomePage = async () => {
  const { greeting } = await api.user.hello();
  return <h1>{greeting}</h1>;
};

export default HomePage;
