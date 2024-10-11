import { useEffect } from "react";

import { track } from "@turbostarter/analytics-extension";

import { Main } from "~/components/common/main";
import { Layout } from "~/components/layout/layout";

const Popup = () => {
  useEffect(() => {
    track("popup_viewed");
  }, []);

  return (
    <Layout>
      <Main className="w-[23rem] px-4" filename="app/popup" />
    </Layout>
  );
};

export default Popup;
