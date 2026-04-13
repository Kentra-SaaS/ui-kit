import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";

const thisDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(thisDirectory, "..");

const readProjectFile = (path: string): string =>
  readFileSync(resolve(projectRoot, path), "utf8");

describe("data-display quality gates", () => {
  it("ensures responsive strategies for desktop, tablet and mobile", () => {
    const tableSource = readProjectFile("data-display/table.ts");
    const badgeSource = readProjectFile("data-display/badge.ts");
    const kpiCardSource = readProjectFile("data-display/kpi-card.ts");
    const emptyStateSource = readProjectFile("data-display/empty-state.ts");

    // Desktop baseline
    expect(tableSource).toContain(":host {");
    expect(badgeSource).toContain(":host {");
    expect(kpiCardSource).toContain(":host {");
    expect(emptyStateSource).toContain(":host {");

    // Tablet/mobile adaptations
    expect(tableSource).toContain("@media (max-width: 64rem)");
    expect(tableSource).toContain("@media (max-width: 48rem)");
    expect(badgeSource).toContain("@media (max-width: 64rem)");
    expect(badgeSource).toContain("@media (max-width: 48rem)");
    expect(kpiCardSource).toContain("@media (max-width: 64rem)");
    expect(kpiCardSource).toContain("@media (max-width: 48rem)");
    expect(emptyStateSource).toContain("@media (max-width: 64rem)");
    expect(emptyStateSource).toContain("@media (max-width: 48rem)");

    // Responsive-by-layout strategy
    expect(tableSource).toContain("overflow: auto;");
    expect(tableSource).toContain("min-inline-size: 34rem;");
    expect(emptyStateSource).toContain("inline-size: min(100%, var(--k-empty-state-container-max-width, 36rem));");

    // Responsive-by-parameter strategy
    expect(tableSource).toContain("readonly variant = input<TableVariant>(\"default\")");
    expect(badgeSource).toContain("readonly size = input<BadgeSize>(\"md\")");
    expect(kpiCardSource).toContain("readonly variant = input<KpiCardVariant>(\"default\")");
    expect(emptyStateSource).toContain("readonly variant = input<EmptyStateVariant>(\"neutral\")");
  });

  it("ensures theme and parameter adaptation are wired", () => {
    const css = generateComponentCss(componentStyleMaps);
    const tableSource = readProjectFile("data-display/table.ts");
    const badgeSource = readProjectFile("data-display/badge.ts");
    const kpiCardSource = readProjectFile("data-display/kpi-card.ts");
    const emptyStateSource = readProjectFile("data-display/empty-state.ts");

    // Table: variants + core states
    expect(css).toContain(".k-table--variant-default {");
    expect(css).toContain(".k-table--variant-dense {");
    expect(css).toContain(".k-table--variant-striped {");
    expect(css).toContain(".k-table--variant-default.is-empty {");
    expect(css).toContain(".k-table--variant-default.is-loading {");
    expect(css).toContain("--k-table-colors-row-hover-bg: var(--k-color-state-hover-overlay);");
    expect(css).toContain("--k-table-colors-row-selected-bg: var(--k-color-state-selected-bg);");

    // Badge: semantic variants + size aliases
    expect(css).toContain(".k-badge--variant-neutral {");
    expect(css).toContain(".k-badge--variant-danger {");
    expect(css).toContain("--k-badge-colors-bg: var(--k-color-state-success-bg);");
    expect(css).toContain("--k-badge-size-sm-min-height: var(--k-space-5);");
    expect(badgeSource).toContain("\"--k-badge-min-height\": `var(--k-badge-size-${size}-min-height)`");

    // KPI card: variants + loading/empty + trend tokens
    expect(css).toContain(".k-kpi-card--variant-default {");
    expect(css).toContain(".k-kpi-card--variant-with-trend {");
    expect(css).toContain(".k-kpi-card--variant-default.is-loading {");
    expect(css).toContain(".k-kpi-card--variant-default.is-empty {");
    expect(css).toContain("--k-kpi-card-trend-up: var(--k-color-state-success);");
    expect(kpiCardSource).toContain("\"--k-kpi-card-trend-color\": `var(--k-kpi-card-trend-${tone}, var(--k-kpi-card-colors-delta, currentColor))`");

    // Empty state: variants + semantic colors
    expect(css).toContain(".k-empty-state--variant-neutral {");
    expect(css).toContain(".k-empty-state--variant-no-results {");
    expect(css).toContain(".k-empty-state--variant-blocked {");
    expect(css).toContain("--k-empty-state-colors-icon: var(--k-color-state-info);");
    expect(css).toContain("--k-empty-state-colors-border: var(--k-color-accent-orange-500);");

    // Runtime API wiring
    expect(tableSource).toContain("readonly columns = input<readonly KentraTableColumn[]>([])");
    expect(tableSource).toContain("readonly rows = input<readonly KentraTableRow[]>([])");
    expect(tableSource).toContain("readonly selectable = input<boolean>(false)");
    expect(tableSource).toContain("readonly rowClickable = input<boolean>(false)");
    expect(tableSource).toContain("readonly sortable = input<boolean>(false)");
    expect(tableSource).toContain("readonly paginated = input<boolean>(false)");
    expect(tableSource).toContain("readonly page = input<number | null>(null)");
    expect(tableSource).toContain("readonly pageSize = input<number>(10)");
    expect(tableSource).toContain("readonly total = input<number | null>(null)");
    expect(tableSource).toContain("readonly lazy = input<boolean>(false)");
    expect(tableSource).toContain("readonly loading = input<boolean>(false)");
    expect(tableSource).toContain("readonly rowClicked = output<RowClickChangeEvent>()");
    expect(tableSource).toContain("readonly pageChanged = output<PageChangeEvent>()");
    expect(tableSource).toContain("onToggleSelectAll(event: Event)");
    expect(tableSource).toContain("onPageChange(nextPage: number)");
    expect(tableSource).toContain("nextSort = null;");
    expect(tableSource).toContain(".row.is-clickable:hover:not(.is-selected)");
    expect(emptyStateSource).toContain("readonly actionLabel = input<string | null>(null)");
    expect(emptyStateSource).toContain("readonly click = output<MouseEvent>()");
    expect(kpiCardSource).toContain("readonly click = output<MouseEvent>()");
  });
});
