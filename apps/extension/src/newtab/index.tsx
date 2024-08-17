import "@turbostarter/ui/globals";

import "~styles/globals.css";
import { Layout } from "~components/layout/layout";
import { Main } from "~components/common/main";

const Options = () => {
  return (
    <Layout className="p-8">
      <Main filename="src/newtab" />
    </Layout>
  );
};

export default Options;
