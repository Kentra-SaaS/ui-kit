import "@angular/compiler";
import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";
import {
  KentraFilterBarPattern,
  KentraFormSectionPattern,
  KentraTableWithToolbarPattern,
} from "../patterns/public-api";

describe("pattern components", () => {
  it("exports selected core patterns from the patterns entrypoint", () => {
    expect(typeof KentraFilterBarPattern).toBe("function");
    expect(typeof KentraFormSectionPattern).toBe("function");
    expect(typeof KentraTableWithToolbarPattern).toBe("function");
  });

  it("maps filter-bar variants and disabled state to runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-filter-bar-pattern--variant-inline {");
    expect(css).toContain(".k-filter-bar-pattern--variant-wrap {");
    expect(css).toContain(".k-filter-bar-pattern--variant-with-chips {");
    expect(css).toContain(".k-filter-bar-pattern--variant-with-chips.is-disabled,");
    expect(css).toContain("--k-filter-bar-pattern-layout-chips-display: flex;");
    expect(css).toContain("--k-filter-bar-pattern-colors-border: var(--k-color-border-subtle);");
  });

  it("maps form-section variants and states to runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-form-section-pattern--variant-default {");
    expect(css).toContain(".k-form-section-pattern--variant-two-column {");
    expect(css).toContain(".k-form-section-pattern--variant-with-aside-help {");
    expect(css).toContain(".k-form-section-pattern--variant-two-column.is-error {");
    expect(css).toContain(".k-form-section-pattern--variant-default.is-disabled,");
    expect(css).toContain("--k-form-section-pattern-layout-fields-template: repeat(2, minmax(0, 1fr));");
  });

  it("maps table-with-toolbar variants and states to runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-table-with-toolbar-pattern--variant-default {");
    expect(css).toContain(".k-table-with-toolbar-pattern--variant-selectable {");
    expect(css).toContain(".k-table-with-toolbar-pattern--variant-dense {");
    expect(css).toContain(".k-table-with-toolbar-pattern--variant-default.is-loading {");
    expect(css).toContain(".k-table-with-toolbar-pattern--variant-default.is-empty {");
    expect(css).toContain(".k-table-with-toolbar-pattern--variant-default.is-error {");
    expect(css).toContain(".k-table-with-toolbar-pattern--variant-default.is-blocked {");
    expect(css).toContain("--k-table-with-toolbar-pattern-colors-status-border: var(--k-color-state-danger);");
    expect(css).toContain("--k-table-with-toolbar-pattern-layout-table-variant: dense;");
  });
});
