import { readdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const thisDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(thisDirectory, "..");

const readProjectFile = (path: string): string =>
  readFileSync(resolve(projectRoot, path), "utf8");

const readProjectJson = <T>(path: string): T =>
  JSON.parse(readProjectFile(path)) as T;

const entrypoints = [
  "layout",
  "typography",
  "actions",
  "icons",
  "forms",
  "navigation",
  "patterns",
  "data-display",
  "feedback",
  "overlays",
  "charts",
] as const;

const expectedPublicExports = [
  ".",
  "./styles.css",
  ...entrypoints.map((entrypoint) => `./${entrypoint}`),
] as const;

const collectTsFiles = (directory: string): string[] => {
  const absoluteDirectory = resolve(projectRoot, directory);
  const queue = [absoluteDirectory];
  const files: string[] = [];

  while (queue.length > 0) {
    const currentDirectory = queue.pop();
    if (!currentDirectory) {
      continue;
    }

    for (const entry of readdirSync(currentDirectory, { withFileTypes: true })) {
      const absolutePath = resolve(currentDirectory, entry.name);

      if (entry.isDirectory()) {
        queue.push(absolutePath);
        continue;
      }

      if (!entry.isFile() || !entry.name.endsWith(".ts")) {
        continue;
      }

      files.push(absolutePath);
    }
  }

  return files;
};

describe("layer and consumption quality gates", () => {
  it("keeps package exports limited to approved public entrypoints", () => {
    const packageJson = readProjectJson<{
      exports: Record<string, unknown>;
    }>("package.json");

    const exportKeys = Object.keys(packageJson.exports).sort();
    expect(exportKeys).toEqual([...expectedPublicExports].sort());

    for (const exportKey of exportKeys) {
      const exportValue = packageJson.exports[exportKey];
      const serializedExport = JSON.stringify(exportValue);

      expect(exportKey).not.toContain("internal");
      expect(exportKey).not.toContain("core");
      expect(exportKey).not.toContain("tokens");

      expect(serializedExport).not.toContain("/internal/");
      expect(serializedExport).not.toContain("/core/");
      expect(serializedExport).not.toContain("/tokens/");
    }
  });

  it("keeps root and secondary public APIs free from deep internal exports", () => {
    const rootPublicApi = readProjectFile("public-api.ts");
    const rootExportStatements = rootPublicApi
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("export ") && line.includes(" from "));

    for (const statement of rootExportStatements) {
      expect(statement).toMatch(
        /^export \* from "(?:\.\/[^"]+\/public-api|\.\/internal)";$/,
      );
    }

    for (const entrypoint of entrypoints) {
      const source = readProjectFile(`${entrypoint}/public-api.ts`);
      const exportStatements = source
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.startsWith("export ") && line.includes(" from "));

      expect(source).not.toMatch(/\.\.\/internal(?:\/|["'])/);

      for (const statement of exportStatements) {
        expect(statement).toMatch(/from "\.\//);
      }
    }
  });

  it("keeps runtime entrypoints on the internal facade boundary", () => {
    for (const entrypoint of entrypoints) {
      const tsFiles = collectTsFiles(entrypoint).filter(
        (file) => !file.endsWith("public-api.ts"),
      );

      for (const file of tsFiles) {
        const source = readFileSync(file, "utf8");
        expect(source).not.toMatch(/from ["']\.\.\/internal\/[^"']+["']/);
      }
    }
  });

  it("documents approved consumption rules in the package README", () => {
    const readme = readProjectFile("README.md");

    for (const exportKey of expectedPublicExports) {
      const importPath =
        exportKey === "."
          ? "@kentra-saas/ui-kit"
          : exportKey === "./styles.css"
            ? "@kentra-saas/ui-kit/styles.css"
            : `@kentra-saas/ui-kit/${exportKey.replace("./", "")}`;

      expect(readme).toContain(`\`${importPath}\``);
    }

    expect(readme).toContain("No deep imports from `@kentra-saas/ui-kit/internal`");
    expect(readme).toContain("No local imports from `../internal` in consumer apps");
  });
});
