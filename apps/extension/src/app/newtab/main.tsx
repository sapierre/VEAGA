import { Main } from "~/components/common/main";
import { Layout, render } from "~/components/layout/layout";

const NewTab = () => {
  return (
    <Layout className="p-8">
      <Main filename="app/newtab" />
    </Layout>
  );
};

render("root", <NewTab />);
