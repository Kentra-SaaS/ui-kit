import "@angular/compiler";
import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";
import {
  KentraButton,
  KentraIconButton,
} from "../actions/public-api";

describe("action components", () => {
  it("exports all action components from the actions entrypoint", () => {
    expect(typeof KentraButton).toBe("function");
    expect(typeof KentraIconButton).toBe("function");
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
});
