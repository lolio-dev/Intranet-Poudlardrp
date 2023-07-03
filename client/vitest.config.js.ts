import { mergeConfig } from "vite";
import viteConfig from "./vite.config";
import { defineConfig } from "vitest/config";

export default mergeConfig(viteConfig, defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: "src/plugins/vuetify.ts",
    deps: {
      inline: ["vuetify"],
    },
  }
}))
