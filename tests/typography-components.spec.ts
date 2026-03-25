import "@angular/compiler";
import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";
import {
  KentraHeading,
  KentraLink,
  KentraText,
} from "../typography/public-api";

describe("typography components", () => {
  it("exports all typography components from the typography entrypoint", () => {
    expect(typeof KentraHeading).toBe("function");
    expect(typeof KentraText).toBe("function");
    expect(typeof KentraLink).toBe("function");
  });

  it("maps heading variants to dedicated runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-heading--variant-display {");
    expect(css).toContain(".k-heading--variant-h1 {");
    expect(css).toContain(".k-heading--variant-h2 {");
    expect(css).toContain(".k-heading--variant-h6 {");
    expect(css).toContain("--k-heading-font-size: var(--k-typography-display-font-size);");
    expect(css).toContain("--k-heading-font-size: var(--k-typography-h1-font-size);");
  });

  it("maps text variants to dedicated runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-text--variant-body {");
    expect(css).toContain(".k-text--variant-caption {");
    expect(css).toContain(".k-text--variant-muted {");
    expect(css).toContain(".k-text--variant-strong {");
    expect(css).toContain("--k-text-color: var(--k-color-text-primary);");
    expect(css).toContain("--k-text-color: var(--k-color-text-secondary);");
  });

  it("maps link variants and states to dedicated runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-link--variant-default {");
    expect(css).toContain(".k-link--variant-subtle {");
    expect(css).toContain(".k-link--variant-inline-strong {");
    expect(css).toContain(".k-link--variant-default:hover, .k-link--variant-default.is-hover {");
    expect(css).toContain(".k-link--variant-default:focus-within, .k-link--variant-default.is-focus-visible {");
    expect(css).toContain(".k-link--variant-default.is-visited {");
    expect(css).toContain(".k-link--variant-default.is-disabled, .k-link--variant-default[aria-disabled='true'] {");
  });
});
