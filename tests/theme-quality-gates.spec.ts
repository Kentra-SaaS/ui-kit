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

  it("keeps critical semantic tokens distinct between light and dark themes", () => {
    const lightTextTheme = readProjectFile("styles/themes/light/text.scss");
    const darkTextTheme = readProjectFile("styles/themes/dark/text.scss");
    const lightBackgroundTheme = readProjectFile("styles/themes/light/background.scss");
    const darkBackgroundTheme = readProjectFile("styles/themes/dark/background.scss");
    const lightInteractionTheme = readProjectFile("styles/themes/light/interaction-state.scss");
    const darkInteractionTheme = readProjectFile("styles/themes/dark/interaction-state.scss");

    expect(lightTextTheme).toContain("--k-color-text-primary: var(--k-color-neutral-900);");
    expect(darkTextTheme).toContain("--k-color-text-primary: var(--k-color-neutral-0);");

    expect(lightBackgroundTheme).toContain("--k-color-bg-surface: var(--k-color-neutral-25);");
    expect(darkBackgroundTheme).toContain("--k-color-bg-surface: var(--k-color-neutral-800);");

    expect(lightInteractionTheme).toContain("--k-color-state-focus-ring: var(--k-color-brand-500);");
    expect(darkInteractionTheme).toContain("--k-color-state-focus-ring: var(--k-color-brand-300);");
  });

  it("keeps dark-mode contrast refinements for component edge cases", () => {
    const darkThemeSource = readProjectFile("styles/themes/dark.scss");

    expect(darkThemeSource).toContain("--k-color-input-readonly-border: var(--k-color-input-disabled-border);");
    expect(darkThemeSource).toContain("--k-color-divider-subtle: var(--k-color-border-default);");
    expect(darkThemeSource).toContain("--k-color-section-elevated-border: var(--k-color-border-default);");
    expect(darkThemeSource).toContain("--k-shadow-section-elevated: var(--k-shadow-lg);");
  });
});
