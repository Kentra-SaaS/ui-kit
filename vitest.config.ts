import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@kentra-saas\/ui-kit$/,
        replacement: fileURLToPath(new URL("./public-api.ts", import.meta.url)),
      },
      {
        find: /^@kentra-saas\/ui-kit\/actions$/,
        replacement: fileURLToPath(new URL("./actions/public-api.ts", import.meta.url)),
      },
      {
        find: /^@kentra-saas\/ui-kit\/charts$/,
        replacement: fileURLToPath(new URL("./charts/public-api.ts", import.meta.url)),
      },
      {
        find: /^@kentra-saas\/ui-kit\/data-display$/,
        replacement: fileURLToPath(
          new URL("./data-display/public-api.ts", import.meta.url),
        ),
      },
      {
        find: /^@kentra-saas\/ui-kit\/feedback$/,
        replacement: fileURLToPath(new URL("./feedback/public-api.ts", import.meta.url)),
      },
      {
        find: /^@kentra-saas\/ui-kit\/forms$/,
        replacement: fileURLToPath(new URL("./forms/public-api.ts", import.meta.url)),
      },
      {
        find: /^@kentra-saas\/ui-kit\/icons$/,
        replacement: fileURLToPath(new URL("./icons/public-api.ts", import.meta.url)),
      },
      {
        find: /^@kentra-saas\/ui-kit\/layout$/,
        replacement: fileURLToPath(new URL("./layout/public-api.ts", import.meta.url)),
      },
      {
        find: /^@kentra-saas\/ui-kit\/navigation$/,
        replacement: fileURLToPath(
          new URL("./navigation/public-api.ts", import.meta.url),
        ),
      },
      {
        find: /^@kentra-saas\/ui-kit\/overlays$/,
        replacement: fileURLToPath(new URL("./overlays/public-api.ts", import.meta.url)),
      },
      {
        find: /^@kentra-saas\/ui-kit\/patterns$/,
        replacement: fileURLToPath(new URL("./patterns/public-api.ts", import.meta.url)),
      },
      {
        find: /^@kentra-saas\/ui-kit\/typography$/,
        replacement: fileURLToPath(
          new URL("./typography/public-api.ts", import.meta.url),
        ),
      },
    ],
  },
  test: {
    environment: "node",
    include: ["**/*.spec.ts"],
  },
});
