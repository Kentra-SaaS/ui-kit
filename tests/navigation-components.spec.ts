import "@angular/compiler";
import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";
import {
  KentraBreadcrumbs,
  KentraPagination,
  KentraSideNav,
  KentraTabs,
} from "../navigation/public-api";

describe("navigation components", () => {
  it("exports all navigation components from the navigation entrypoint", () => {
    expect(typeof KentraTabs).toBe("function");
    expect(typeof KentraBreadcrumbs).toBe("function");
    expect(typeof KentraPagination).toBe("function");
    expect(typeof KentraSideNav).toBe("function");
  });

  it("maps tabs variants and states to runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-tabs--variant-line {");
    expect(css).toContain(".k-tabs--variant-pill {");
    expect(css).toContain(".k-tabs--variant-line.is-active {");
    expect(css).toContain(".k-tabs--variant-line:focus-within, .k-tabs--variant-line.is-focus-visible {");
    expect(css).toContain(".k-tabs--variant-line.is-disabled, .k-tabs--variant-line:disabled, .k-tabs--variant-line[aria-disabled='true'] {");
    expect(css).toContain("--k-tabs-colors-indicator: var(--k-color-link-default);");
  });

  it("maps breadcrumbs variants and focus state to runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-breadcrumbs--variant-default {");
    expect(css).toContain(".k-breadcrumbs--variant-compact {");
    expect(css).toContain(".k-breadcrumbs--variant-default:focus-visible {");
    expect(css).toContain("--k-breadcrumbs-spacing-item-gap: var(--k-space-2);");
    expect(css).toContain("--k-breadcrumbs-spacing-item-gap: var(--k-space-1);");
    expect(css).toContain("--k-breadcrumbs-colors-link: var(--k-color-link-default);");
  });

  it("maps pagination variants and states to runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-pagination--variant-default {");
    expect(css).toContain(".k-pagination--variant-compact {");
    expect(css).toContain(".k-pagination--variant-default:focus-within, .k-pagination--variant-default.is-focus-visible {");
    expect(css).toContain(".k-pagination--variant-default.is-active {");
    expect(css).toContain(".k-pagination--variant-default.is-disabled, .k-pagination--variant-default:disabled, .k-pagination--variant-default[aria-disabled='true'] {");
    expect(css).toContain("--k-pagination-colors-bg: var(--k-color-action-primary-bg);");
  });

  it("maps side-nav variants and states to runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-side-nav--variant-expanded {");
    expect(css).toContain(".k-side-nav--variant-collapsed {");
    expect(css).toContain(".k-side-nav--variant-expanded.is-active {");
    expect(css).toContain(".k-side-nav--variant-expanded:focus-within, .k-side-nav--variant-expanded.is-focus-visible {");
    expect(css).toContain(".k-side-nav--variant-expanded.is-disabled, .k-side-nav--variant-expanded:disabled, .k-side-nav--variant-expanded[aria-disabled='true'] {");
    expect(css).toContain("--k-side-nav-nav-width: 17rem;");
    expect(css).toContain("--k-side-nav-nav-width: 4.5rem;");
    expect(css).toContain("--k-side-nav-colors-item-bg: var(--k-color-state-selected-bg);");
  });
});
