import { Main } from "~/components/common/main";
import { Layout, render } from "~/components/layout/layout";

const Tabs = () => {
  return (
    <Layout className="p-8">
      <Main filename="app/tabs" />
    </Layout>
  );
};

render("root", <Tabs />);
