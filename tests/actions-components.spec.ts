import "@angular/compiler";
import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";
import {
  KentraButton,
  KentraIconButton,
  KentraThemeSwitch,
} from "../actions/public-api";

describe("action components", () => {
  it("exports all action components from the actions entrypoint", () => {
    expect(typeof KentraButton).toBe("function");
    expect(typeof KentraIconButton).toBe("function");
    expect(typeof KentraThemeSwitch).toBe("function");
  });

  it("maps button variants, sizes and states to dedicated runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-button--size-sm {");
    expect(css).toContain(".k-button--size-md {");
    expect(css).toContain(".k-button--size-lg {");
    expect(css).toContain(".k-button--variant-primary {");
    expect(css).toContain(".k-button--variant-secondary {");
    expect(css).toContain(".k-button--variant-tertiary {");
    expect(css).toContain(".k-button--variant-danger {");
    expect(css).toContain(".k-button--variant-primary:hover, .k-button--variant-primary.is-hover {");
    expect(css).toContain(".k-button--variant-primary:active, .k-button--variant-primary.is-active {");
    expect(css).toContain(".k-button--variant-primary:focus-within:not(.is-hover):not(.is-active):not(.is-loading):not(.is-disabled), .k-button--variant-primary.is-focus-visible {");
    expect(css).toContain(".k-button--variant-primary.is-disabled, .k-button--variant-primary:disabled, .k-button--variant-primary[aria-disabled='true'] {");
    expect(css).toContain(".k-button--variant-primary.is-loading {");
    expect(css).toContain("--k-btn-colors-bg: var(--k-color-action-primary-bg);");
  });

  it("maps icon-button variants, sizes and states to dedicated runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-icon-button--size-sm {");
    expect(css).toContain(".k-icon-button--size-md {");
    expect(css).toContain(".k-icon-button--size-lg {");
    expect(css).toContain(".k-icon-button--variant-primary {");
    expect(css).toContain(".k-icon-button--variant-secondary {");
    expect(css).toContain(".k-icon-button--variant-tertiary {");
    expect(css).toContain(".k-icon-button--variant-danger {");
    expect(css).toContain(".k-icon-button--variant-primary:hover, .k-icon-button--variant-primary.is-hover {");
    expect(css).toContain(".k-icon-button--variant-primary:active, .k-icon-button--variant-primary.is-active {");
    expect(css).toContain(".k-icon-button--variant-primary:focus-within:not(.is-hover):not(.is-active):not(.is-disabled), .k-icon-button--variant-primary.is-focus-visible {");
    expect(css).toContain(".k-icon-button--variant-primary.is-disabled, .k-icon-button--variant-primary:disabled, .k-icon-button--variant-primary[aria-disabled='true'] {");
    expect(css).toContain("--k-icon-button-colors-icon: var(--k-color-action-primary-text);");
  });

  it("maps theme-switch sizes, variants and states to dedicated runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-theme-switch--size-sm {");
    expect(css).toContain(".k-theme-switch--size-md {");
    expect(css).toContain(".k-theme-switch--size-lg {");
    expect(css).toContain(".k-theme-switch--variant-default {");
    expect(css).toContain(".k-theme-switch--variant-default.is-on {");
    expect(css).toContain(".k-theme-switch--variant-default:hover, .k-theme-switch--variant-default.is-hover {");
    expect(css).toContain(".k-theme-switch--variant-default:active, .k-theme-switch--variant-default.is-active {");
    expect(css).toContain(".k-theme-switch--variant-default.is-disabled, .k-theme-switch--variant-default:disabled, .k-theme-switch--variant-default[aria-disabled='true'] {");
    expect(css).toContain("--k-theme-switch-colors-bg: var(--k-color-bg-surface);");
    expect(css).toContain("--k-theme-switch-colors-thumb-icon: var(--k-color-text-primary);");
  });
});
