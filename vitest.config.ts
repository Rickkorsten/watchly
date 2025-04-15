import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import * as path from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
