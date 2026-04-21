import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const thisDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(thisDirectory, "..");
const sourcePath = resolve(
  projectRoot,
  "node_modules/@phosphor-icons/web/src/regular/selection.json",
);
const targetPath = resolve(
  projectRoot,
  "internal/components/icons/icon-names.generated.ts",
);

const source = JSON.parse(readFileSync(sourcePath, "utf8"));
const names = [...new Set(
  (source.icons ?? [])
    .map((entry) => entry?.properties?.name)
    .filter((name) => typeof name === "string" && name.length > 0),
)].sort((left, right) => left.localeCompare(right));

const generatedFileContent = `/* AUTO-GENERATED FILE. DO NOT EDIT. */
export const ICON_NAMES = ${JSON.stringify(names, null, 2)} as const;

export type IconName = (typeof ICON_NAMES)[number];
`;

writeFileSync(targetPath, generatedFileContent);
console.log(
  `[icons] generated ${names.length} icon names at ${targetPath}`,
);
