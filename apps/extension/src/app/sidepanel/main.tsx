import { Main } from "~/components/common/main";
import { Layout, render } from "~/components/layout/layout";

const SidePanel = () => {
  return (
    <Layout className="p-8">
      <Main filename="app/sidepanel" />
    </Layout>
  );
};

render("root", <SidePanel />);
