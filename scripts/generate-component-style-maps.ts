import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { generateComponentCss } from "../internal/style-maps";
import { componentStyleMaps } from "../internal/style-maps";

const projectRoot = process.cwd();
const outputPath = resolve(projectRoot, "styles/generated/components.generated.scss");
const generatedCss = generateComponentCss(componentStyleMaps);

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, generatedCss, "utf8");

console.info(
  `[style-maps] generated ${componentStyleMaps.length} component style map(s) at ${outputPath}`,
);
