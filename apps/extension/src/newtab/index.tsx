import "@turbostarter/ui/globals";

import { Layout } from "~components/layout/layout";
import { Main } from "~components/common/main";

import "~styles/globals.css";

const Options = () => {
  return (
    <Layout className="p-8">
      <Main filename="src/newtab" />
    </Layout>
  );
};

export default Options;
