import "@angular/compiler";
import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";
import {
  KentraBarChart,
  KentraChartContainer,
  KentraDonutChart,
  KentraLineChart,
} from "../charts/public-api";

describe("charts components", () => {
  it("exports all chart wrapper components from the charts entrypoint", () => {
    expect(typeof KentraChartContainer).toBe("function");
    expect(typeof KentraLineChart).toBe("function");
    expect(typeof KentraBarChart).toBe("function");
    expect(typeof KentraDonutChart).toBe("function");
  });

  it("maps chart-container variants and states to dedicated runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-chart-container--variant-default.is-loading {");
    expect(css).toContain(".k-chart-container--variant-default.is-ready {");
    expect(css).toContain(".k-chart-container--variant-compact.is-empty {");
    expect(css).toContain(".k-chart-container--variant-compact.is-error {");
    expect(css).toContain("--k-chart-container-colors-bg: var(--k-color-bg-elevated);");
    expect(css).toContain("--k-chart-container-colors-state-text: var(--k-color-state-danger);");
  });

  it("maps line-chart variants and states to dedicated runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-line-chart--variant-default.is-ready {");
    expect(css).toContain(".k-line-chart--variant-smooth.is-ready {");
    expect(css).toContain(".k-line-chart--variant-stepped.is-ready {");
    expect(css).toContain(".k-line-chart--variant-default.is-loading {");
    expect(css).toContain("--k-line-chart-interpolation: monotone;");
    expect(css).toContain("--k-line-chart-colors-series-series01: var(--k-color-brand-500);");
    expect(css).toContain("--k-line-chart-colors-grid: var(--k-color-border-default);");
  });

  it("maps bar-chart variants and states to dedicated runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-bar-chart--variant-vertical.is-ready {");
    expect(css).toContain(".k-bar-chart--variant-horizontal.is-ready {");
    expect(css).toContain(".k-bar-chart--variant-stacked.is-ready {");
    expect(css).toContain(".k-bar-chart--variant-stacked.is-error {");
    expect(css).toContain("--k-bar-chart-orientation: horizontal;");
    expect(css).toContain("--k-bar-chart-colors-series-series05: var(--k-color-accent-orange-500);");
    expect(css).toContain("--k-bar-chart-colors-grid: var(--k-color-border-default);");
  });

  it("maps donut-chart variants and states to dedicated runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-donut-chart--variant-default.is-ready {");
    expect(css).toContain(".k-donut-chart--variant-with-center-metric.is-ready {");
    expect(css).toContain(".k-donut-chart--variant-default.is-loading {");
    expect(css).toContain(".k-donut-chart--variant-with-center-metric.is-error {");
    expect(css).toContain("--k-donut-chart-chart-cutout: 72%;");
    expect(css).toContain("--k-donut-chart-chart-max-size: 20rem;");
    expect(css).toContain("--k-donut-chart-colors-segments-segment06: var(--k-color-brand-300);");
  });
});
