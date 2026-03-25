import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";

const thisDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(thisDirectory, "..");

const readProjectFile = (path: string): string =>
  readFileSync(resolve(projectRoot, path), "utf8");

describe("action quality gates", () => {
  it("ensures responsive strategy for desktop, tablet and mobile", () => {
    const buttonSource = readProjectFile("actions/button.ts");
    const iconButtonSource = readProjectFile("actions/icon-button.ts");

    // Desktop baseline
    expect(buttonSource).toContain(":host {");
    expect(buttonSource).toContain(".button {");
    expect(iconButtonSource).toContain(":host {");
    expect(iconButtonSource).toContain(".button {");

    // Tablet and mobile adaptations
    expect(buttonSource).toContain("@media (max-width: 64rem)");
    expect(buttonSource).toContain("@media (max-width: 48rem)");
    expect(iconButtonSource).toContain("@media (max-width: 64rem)");
    expect(iconButtonSource).toContain("@media (max-width: 48rem)");

    // Touch-target safe mobile floor
    expect(buttonSource).toContain("min-block-size: max(var(--k-btn-min-height, 2.5rem), 2.75rem);");
    expect(iconButtonSource).toContain("min-inline-size: max(var(--k-icon-button-min-width, 2.5rem), 2.75rem);");
    expect(iconButtonSource).toContain("min-block-size: max(var(--k-icon-button-min-height, 2.5rem), 2.75rem);");
  });

  it("ensures theme and parameter adaptation are wired", () => {
    const css = generateComponentCss(componentStyleMaps);
    const buttonSource = readProjectFile("actions/button.ts");
    const iconButtonSource = readProjectFile("actions/icon-button.ts");

    // Button parameter API
    expect(buttonSource).toContain("readonly variant = input<ButtonVariant>(\"primary\")");
    expect(buttonSource).toContain("readonly size = input<ButtonSize>(\"md\")");
    expect(buttonSource).toContain("readonly state = input<ButtonState>(\"default\")");
    expect(buttonSource).toContain("readonly disabled = input<boolean>(false)");
    expect(buttonSource).toContain("readonly loading = input<boolean>(false)");

    // IconButton parameter API
    expect(iconButtonSource).toContain("readonly variant = input<IconButtonVariant>(\"primary\")");
    expect(iconButtonSource).toContain("readonly size = input<IconButtonSize>(\"md\")");
    expect(iconButtonSource).toContain("readonly state = input<IconButtonState>(\"default\")");
    expect(iconButtonSource).toContain("readonly disabled = input<boolean>(false)");

    // Button theme and states
    expect(css).toContain(".k-button--variant-primary {");
    expect(css).toContain(".k-button--variant-danger {");
    expect(css).toContain("--k-btn-colors-bg: var(--k-color-action-primary-bg);");
    expect(css).toContain("--k-btn-colors-text: var(--k-color-action-primary-text);");
    expect(css).toContain(".k-button--variant-primary:hover, .k-button--variant-primary.is-hover {");
    expect(css).toContain(".k-button--variant-primary:focus-within, .k-button--variant-primary.is-focus-visible {");
    expect(css).toContain(".k-button--variant-primary:active, .k-button--variant-primary.is-active {");
    expect(css).toContain(".k-button--variant-primary.is-disabled, .k-button--variant-primary:disabled, .k-button--variant-primary[aria-disabled='true'] {");
    expect(css).toContain(".k-button--variant-primary.is-loading {");

    // IconButton theme and states
    expect(css).toContain(".k-icon-button--variant-primary {");
    expect(css).toContain(".k-icon-button--variant-tertiary {");
    expect(css).toContain("--k-icon-button-colors-bg: var(--k-color-action-primary-bg);");
    expect(css).toContain("--k-icon-button-colors-icon: var(--k-color-action-primary-text);");
    expect(css).toContain(".k-icon-button--variant-primary:hover, .k-icon-button--variant-primary.is-hover {");
    expect(css).toContain(".k-icon-button--variant-primary:focus-within, .k-icon-button--variant-primary.is-focus-visible {");
    expect(css).toContain(".k-icon-button--variant-primary:active, .k-icon-button--variant-primary.is-active {");
    expect(css).toContain(".k-icon-button--variant-primary.is-disabled, .k-icon-button--variant-primary:disabled, .k-icon-button--variant-primary[aria-disabled='true'] {");
  });
});
