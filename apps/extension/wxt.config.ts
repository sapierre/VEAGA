import svgr from "vite-plugin-svgr";
import { type WxtViteConfig, defineConfig } from "wxt";

export default defineConfig({
  manifest: async () => {
    const { appConfig } = await import("./src/config/app");
    return {
      name: appConfig.name,
      permissions: ["storage", "cookies", "sidePanel", "scripting"],
      host_permissions: ["<all_urls>"],
    };
  },
  dev: {
    server: {
      port: 1234,
    },
  },
  webExt: {
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
      define: {
        "process.env": Object.fromEntries(
          Object.entries(import.meta.env).filter(
            ([key]) => key.toLowerCase() !== "path",
          ),
        ),
      },
    }) as WxtViteConfig,
});
