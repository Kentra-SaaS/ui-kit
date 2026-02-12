import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "KentraCharts",
      formats: ["es"],
      fileName: "index"
    },
    rollupOptions: {
      external: ["chart.js", "@kentra/core"]
    }
  }
});
