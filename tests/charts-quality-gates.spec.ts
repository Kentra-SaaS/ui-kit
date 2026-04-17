import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";

const thisDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(thisDirectory, "..");

const readProjectFile = (path: string): string =>
  readFileSync(resolve(projectRoot, path), "utf8");

describe("charts quality gates", () => {
  it("ensures responsive strategies for desktop, tablet and mobile", () => {
    const chartContainerSource = readProjectFile("charts/chart-container.ts");
    const lineChartSource = readProjectFile("charts/line-chart.ts");
    const barChartSource = readProjectFile("charts/bar-chart.ts");
    const donutChartSource = readProjectFile("charts/donut-chart.ts");

    // Desktop baseline
    expect(chartContainerSource).toContain(":host {");
    expect(lineChartSource).toContain(":host {");
    expect(barChartSource).toContain(":host {");
    expect(donutChartSource).toContain(":host {");

    // Tablet and mobile adaptations
    expect(chartContainerSource).toContain("@media (max-width: 64rem)");
    expect(chartContainerSource).toContain("@media (max-width: 48rem)");
    expect(lineChartSource).toContain("@media (max-width: 64rem)");
    expect(lineChartSource).toContain("@media (max-width: 48rem)");
    expect(barChartSource).toContain("@media (max-width: 64rem)");
    expect(barChartSource).toContain("@media (max-width: 48rem)");
    expect(donutChartSource).toContain("@media (max-width: 64rem)");
    expect(donutChartSource).toContain("@media (max-width: 48rem)");
  });

  it("ensures theme and parameter adaptation are wired", () => {
    const css = generateComponentCss(componentStyleMaps);
    const chartContainerSource = readProjectFile("charts/chart-container.ts");
    const lineChartSource = readProjectFile("charts/line-chart.ts");
    const barChartSource = readProjectFile("charts/bar-chart.ts");
    const donutChartSource = readProjectFile("charts/donut-chart.ts");
    const publicApiSource = readProjectFile("charts/public-api.ts");

    // Runtime API wiring
    expect(chartContainerSource).toContain("readonly variant = input<ChartContainerVariant>(\"default\")");
    expect(chartContainerSource).toContain("readonly state = input<ChartContainerState>(\"ready\")");
    expect(chartContainerSource).toContain("readonly showLegend = input<boolean>(true)");
    expect(chartContainerSource).toContain("\"--k-chart-container-chart-area-min-height-mobile\"");

    expect(lineChartSource).toContain("readonly variant = input<LineChartVariant>(\"default\")");
    expect(lineChartSource).toContain("readonly labels = input<readonly string[]>([])");
    expect(lineChartSource).toContain("readonly series = input<readonly KentraLineChartSeries[]>([])");
    expect(lineChartSource).toContain("readonly disabled = input<boolean>(false)");
    expect(lineChartSource).toContain("readonly valueFormatter = input<KentraChartValueFormatter | null>(null)");
    expect(lineChartSource).toContain("new Chart(canvas, configuration)");

    expect(barChartSource).toContain("readonly variant = input<BarChartVariant>(\"vertical\")");
    expect(barChartSource).toContain("readonly labels = input<readonly string[]>([])");
    expect(barChartSource).toContain("readonly series = input<readonly KentraBarChartSeries[]>([])");
    expect(barChartSource).toContain("readonly interactive = input<boolean>(true)");
    expect(barChartSource).toContain("readonly disabled = input<boolean>(false)");
    expect(barChartSource).toContain("new Chart(canvas, configuration)");

    expect(donutChartSource).toContain("readonly variant = input<DonutChartVariant>(\"default\")");
    expect(donutChartSource).toContain("readonly segments = input<readonly KentraDonutChartSegment[]>([])");
    expect(donutChartSource).toContain("readonly size = input<string | number | null>(null)");
    expect(donutChartSource).toContain("readonly totalLabel = input<string | null>(\"Total\")");
    expect(donutChartSource).toContain("readonly showLegend = input<boolean>(true)");
    expect(donutChartSource).toContain("inline-size: min(100%, var(--k-donut-chart-chart-max-size, 20rem));");
    expect(donutChartSource).toContain("justify-self: center;");
    expect(donutChartSource).toContain("aspect-ratio: 1 / 1;");
    expect(donutChartSource).toContain("border-radius: 50%;");
    expect(donutChartSource).toContain("display: flex;");
    expect(donutChartSource).toContain("\"--k-donut-chart-chart-max-size\": normalizeDimension(this.size()) ?? \"20rem\"");
    expect(donutChartSource).toContain("new Chart(canvas, configuration)");

    // Base pattern consistency
    expect(chartContainerSource).toContain("\"[class]\": \"hostClasses()\"");
    expect(chartContainerSource).toContain("\"[style]\": \"hostStyles()\"");
    expect(lineChartSource).toContain("\"[class]\": \"hostClasses()\"");
    expect(lineChartSource).toContain("\"[style]\": \"hostStyles()\"");
    expect(barChartSource).toContain("\"[class]\": \"hostClasses()\"");
    expect(barChartSource).toContain("\"[style]\": \"hostStyles()\"");
    expect(donutChartSource).toContain("\"[class]\": \"hostClasses()\"");
    expect(donutChartSource).toContain("\"[style]\": \"hostStyles()\"");

    // Theme/state mappings through generated CSS
    expect(css).toContain(".k-chart-container--variant-default.is-ready {");
    expect(css).toContain("--k-chart-container-colors-bg: var(--k-color-bg-elevated);");
    expect(css).toContain(".k-line-chart--variant-smooth.is-ready {");
    expect(css).toContain("--k-line-chart-colors-tooltip-bg: var(--k-color-bg-inverse);");
    expect(css).toContain(".k-bar-chart--variant-horizontal.is-ready {");
    expect(css).toContain("--k-bar-chart-colors-series-series01: var(--k-color-brand-500);");
    expect(css).toContain(".k-donut-chart--variant-with-center-metric.is-ready {");
    expect(css).toContain("--k-donut-chart-colors-center-value: var(--k-color-text-primary);");

    // Public entrypoint exists and remains wrapper-focused
    expect(publicApiSource).toContain("export * from \"./chart-container\";");
    expect(publicApiSource).toContain("export * from \"./line-chart\";");
    expect(publicApiSource).toContain("export * from \"./bar-chart\";");
    expect(publicApiSource).toContain("export * from \"./donut-chart\";");
    expect(publicApiSource).not.toContain("chart.js");
  });
});
