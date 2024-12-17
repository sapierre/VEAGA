import { Main } from "~/components/common/main";
import { Layout, render } from "~/components/layout/layout";

const Options = () => {
  return (
    <Layout className="p-8">
      <Main filename="app/options" />
    </Layout>
  );
};

render("root", <Options />);
