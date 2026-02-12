import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "KentraAstro",
      formats: ["es"],
      fileName: "index"
    },
    rollupOptions: {
      external: ["@kentra/core", "@kentra/charts"]
    }
  }
});
