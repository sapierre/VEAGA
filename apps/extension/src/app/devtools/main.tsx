import React from "react";
import { browser } from "wxt/browser";

import { Main } from "~/components/common/main";
import { Layout, render } from "~/components/layout/layout";

void browser.devtools.panels.create(
  browser.i18n.getMessage("extensionName"),
  "icons/128.png",
  "devtools.html",
);

void browser.devtools.panels.elements
  .createSidebarPane(browser.i18n.getMessage("extensionName"))
  .then((sidebar) =>
    sidebar.setObject({
      name: "DevTools",
    }),
  );

const DevTools = () => {
  return (
    <Layout>
      <Main filename="app/devtools" />
    </Layout>
  );
};

render("root", <DevTools />);
