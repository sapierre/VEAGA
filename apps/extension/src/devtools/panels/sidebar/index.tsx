import { createRoot } from "react-dom/client";

import { Main } from "~components/common/main";
import { Layout } from "~components/layout/layout";

const Sidebar = () => {
  return (
    <Layout className="p-8">
      <Main filename="src/devtools/panels/sidebar" />
    </Layout>
  );
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<Sidebar />);
