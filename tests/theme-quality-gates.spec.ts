import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const thisDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(thisDirectory, "..");

const readProjectFile = (path: string): string =>
  readFileSync(resolve(projectRoot, path), "utf8");

describe("theme quality gates", () => {
  it("keeps light theme tokens from overriding explicit dark mode", () => {
    const lightThemeSource = readProjectFile("styles/themes/light.scss");
    const darkThemeSource = readProjectFile("styles/themes/dark.scss");

    expect(lightThemeSource).toContain(':root:not([data-theme]),');
    expect(lightThemeSource).toContain('[data-theme="light"] {');
    expect(darkThemeSource).toContain('[data-theme="dark"] {');
  });
});
