import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "KentraCore",
      formats: ["es"],
      fileName: "index"
    },
    rollupOptions: {
      external: ["@kentra/tokens"]
    }
  }
});
