import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const thisDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(thisDirectory, "..");

const readProjectFile = (path: string): string =>
  readFileSync(resolve(projectRoot, path), "utf8");

const resolveExistingProjectPath = (paths: string[]): string | null => {
  for (const path of paths) {
    const absolutePath = resolve(projectRoot, path);
    if (existsSync(absolutePath)) {
      return absolutePath;
    }
  }

  return null;
};

const tokensAndThemesDocPath = resolveExistingProjectPath([
  "docs/engineering/architektur/ui-kit/scss-tokens-themes.md",
  "../docs/engineering/architektur/ui-kit/scss-tokens-themes.md",
]);

const mixinsDocPath = resolveExistingProjectPath([
  "docs/engineering/architektur/ui-kit/scss-mixins-und-funktionen.md",
  "../docs/engineering/architektur/ui-kit/scss-mixins-und-funktionen.md",
]);

const themeSwitchingDocPath = resolveExistingProjectPath([
  "docs/engineering/architektur/ui-kit/angular-theme-switching.md",
  "../docs/engineering/architektur/ui-kit/angular-theme-switching.md",
]);

const hasFoundationDocs = Boolean(
  tokensAndThemesDocPath && mixinsDocPath && themeSwitchingDocPath,
);

const foundationDocsTest = hasFoundationDocs ? it : it.skip;

describe("scss foundation quality gates", () => {
  it("keeps styles entrypoint wired to foundation, themes and generated component maps", () => {
    const stylesEntry = readProjectFile("styles/styles.scss");

    expect(stylesEntry).toContain('@use "colors/palette";');
    expect(stylesEntry).toContain('@use "themes/light";');
    expect(stylesEntry).toContain('@use "themes/dark";');
    expect(stylesEntry).toContain('@use "tokens/base";');
    expect(stylesEntry).toContain('@use "tokens/background";');
    expect(stylesEntry).toContain('@use "tokens/icon-set";');
    expect(stylesEntry).toContain('@use "tokens/typography";');
    expect(stylesEntry).toContain('@use "generated/components.generated";');

    expect(stylesEntry).toContain("@include base.declare-base-style-tokens();");
    expect(stylesEntry).toContain("@include typography.declare-manrope-font-faces();");
    expect(stylesEntry).toContain("@include typography.declare-typography-tokens();");
    expect(stylesEntry).toContain("@include icon-set.declare-phosphor-icon-font-face();");
    expect(stylesEntry).toContain("@include icon-set.declare-icon-set-tokens();");
    expect(stylesEntry).toContain("@include icon-set.apply-icon-foundation-class();");
    expect(stylesEntry).toContain("@include background.app-background();");
  });

  it("keeps theme switching selectors and light/dark contracts stable", () => {
    const lightTheme = readProjectFile("styles/themes/light.scss");
    const darkTheme = readProjectFile("styles/themes/dark.scss");

    expect(lightTheme).toContain(':root:not([data-theme]),');
    expect(lightTheme).toContain('[data-theme="light"] {');
    expect(darkTheme).toContain('[data-theme="dark"] {');

    expect(lightTheme).toContain("@include background.apply-light-background-colors();");
    expect(lightTheme).toContain("@include text.apply-light-text-colors();");
    expect(lightTheme).toContain("@include interaction-state.apply-light-interaction-state-colors();");
    expect(lightTheme).toContain("@include app-background.apply-light-app-background-colors();");

    expect(darkTheme).toContain("@include background.apply-dark-background-colors();");
    expect(darkTheme).toContain("@include text.apply-dark-text-colors();");
    expect(darkTheme).toContain("@include interaction-state.apply-dark-interaction-state-colors();");
    expect(darkTheme).toContain("@include app-background.apply-dark-app-background-colors();");
  });

  foundationDocsTest("keeps foundation contract docs aligned with implementation", () => {
    const tokensAndThemesDoc = readFileSync(tokensAndThemesDocPath!, "utf8");
    const mixinsDoc = readFileSync(mixinsDocPath!, "utf8");
    const themeSwitchingDoc = readFileSync(themeSwitchingDocPath!, "utf8");

    expect(tokensAndThemesDoc).toContain("styles/styles.scss");
    expect(tokensAndThemesDoc).toContain('@kentra-saas/ui-kit/styles.css');
    expect(tokensAndThemesDoc).toContain('[data-theme="dark"]');

    expect(mixinsDoc).toContain("declare-base-style-tokens()");
    expect(mixinsDoc).toContain("declare-typography-tokens()");
    expect(mixinsDoc).toContain("declare-icon-set-tokens()");
    expect(mixinsDoc).toContain("apply-light-*()");
    expect(mixinsDoc).toContain("apply-dark-*()");

    expect(themeSwitchingDoc).toContain('[data-theme="light"]');
    expect(themeSwitchingDoc).toContain('[data-theme="dark"]');
    expect(themeSwitchingDoc).toContain('document.documentElement.setAttribute("data-theme"');
  });
});
