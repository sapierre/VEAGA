import { createRoot } from "react-dom/client";
import { Main } from "~components/common/main";
import { Layout } from "~components/layout/layout";

const Panel = () => {
  return (
    <Layout className="p-8">
      <Main filename="src/devtools/panels/panel" />
    </Layout>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<Panel />);
