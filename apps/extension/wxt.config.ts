import svgr from "vite-plugin-svgr";
import { type WxtViteConfig, defineConfig } from "wxt";

export default defineConfig({
  manifest: {
    name: "__MSG_extensionName__",
    description: "__MSG_extensionDescription__",
    default_locale: "en",
    permissions: ["storage", "cookies", "sidePanel", "scripting"],
    host_permissions: ["<all_urls>"],
  },
  dev: {
    server: {
      port: 1234,
    },
  },
  runner: {
    disabled: true,
  },
  srcDir: "src",
  entrypointsDir: "app",
  outDir: "build",
  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
  imports: false,
  vite: () =>
    ({
      plugins: [
        svgr({
          include: "**/*.svg",
        }),
      ],
    }) as WxtViteConfig,
});
