import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "KentraTokens",
      formats: ["es"],
      fileName: "index"
    },
    rollupOptions: {
      external: []
    }
  }
});
