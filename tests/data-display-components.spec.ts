import "@angular/compiler";
import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";
import {
  KentraBadge,
  KentraEmptyState,
  KentraKpiCard,
  KentraTable,
} from "../data-display/public-api";

describe("data-display components", () => {
  it("exports all data-display components from the data-display entrypoint", () => {
    expect(typeof KentraTable).toBe("function");
    expect(typeof KentraBadge).toBe("function");
    expect(typeof KentraKpiCard).toBe("function");
    expect(typeof KentraEmptyState).toBe("function");
  });

  it("maps table variants and states to runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-table--variant-default {");
    expect(css).toContain(".k-table--variant-dense {");
    expect(css).toContain(".k-table--variant-striped {");
    expect(css).toContain(".k-table--variant-default.is-empty {");
    expect(css).toContain(".k-table--variant-default.is-loading {");
    expect(css).toContain("--k-table-colors-row-hover-bg: var(--k-color-state-hover-overlay);");
    expect(css).toContain("--k-table-colors-row-selected-bg: var(--k-color-state-selected-bg);");
  });

  it("maps badge variants to runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-badge--variant-neutral {");
    expect(css).toContain(".k-badge--variant-info {");
    expect(css).toContain(".k-badge--variant-success {");
    expect(css).toContain(".k-badge--variant-warning {");
    expect(css).toContain(".k-badge--variant-danger {");
    expect(css).toContain("--k-badge-colors-bg: var(--k-color-state-info-bg);");
    expect(css).toContain("--k-badge-colors-text: var(--k-color-state-danger);");
  });

  it("maps kpi-card variants and states to runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-kpi-card--variant-default {");
    expect(css).toContain(".k-kpi-card--variant-compact {");
    expect(css).toContain(".k-kpi-card--variant-with-trend {");
    expect(css).toContain(".k-kpi-card--variant-default.is-loading {");
    expect(css).toContain(".k-kpi-card--variant-default.is-empty {");
    expect(css).toContain("--k-kpi-card-trend-up: var(--k-color-state-success);");
    expect(css).toContain("--k-kpi-card-colors-skeleton: var(--k-color-border-default);");
  });

  it("maps empty-state variants to runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-empty-state--variant-neutral {");
    expect(css).toContain(".k-empty-state--variant-no-results {");
    expect(css).toContain(".k-empty-state--variant-blocked {");
    expect(css).toContain("--k-empty-state-colors-icon: var(--k-color-state-info);");
    expect(css).toContain("--k-empty-state-colors-border: var(--k-color-accent-orange-500);");
  });
});
