import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";

const thisDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(thisDirectory, "..");

const readProjectFile = (path: string): string =>
  readFileSync(resolve(projectRoot, path), "utf8");

describe("navigation quality gates", () => {
  it("ensures responsive strategies for desktop, tablet and mobile", () => {
    const tabsSource = readProjectFile("navigation/tabs.ts");
    const breadcrumbsSource = readProjectFile("navigation/breadcrumbs.ts");
    const paginationSource = readProjectFile("navigation/pagination.ts");
    const sideNavSource = readProjectFile("navigation/side-nav.ts");

    // Desktop baseline
    expect(tabsSource).toContain(":host {");
    expect(breadcrumbsSource).toContain(":host {");
    expect(paginationSource).toContain(":host {");
    expect(sideNavSource).toContain(":host {");

    // Tablet/mobile adaptations
    expect(tabsSource).toContain("@media (max-width: 64rem)");
    expect(tabsSource).toContain("@media (max-width: 48rem)");
    expect(breadcrumbsSource).toContain("@media (max-width: 64rem)");
    expect(breadcrumbsSource).toContain("@media (max-width: 48rem)");
    expect(paginationSource).toContain("@media (max-width: 64rem)");
    expect(paginationSource).toContain("@media (max-width: 48rem)");
    expect(sideNavSource).toContain("@media (max-width: 64rem)");
    expect(sideNavSource).toContain("@media (max-width: 48rem)");

    // Responsive-by-layout strategy
    expect(tabsSource).toContain("overflow-x: auto;");
    expect(sideNavSource).toContain("inline-size: min(var(--k-side-nav-nav-width, 17rem), 100%);");
    expect(sideNavSource).toContain("min-block-size: 100%;");

    // Responsive-by-parameter strategy
    expect(tabsSource).toContain("readonly orientation = input<\"horizontal\" | \"vertical\">(\"horizontal\")");
    expect(breadcrumbsSource).toContain("readonly maxItems = input<number | null>(null)");
    expect(paginationSource).toContain("readonly siblingCount = input<number>(1)");
    expect(sideNavSource).toContain("readonly variant = input<SideNavVariant>(\"expanded\")");
  });

  it("ensures theme and parameter adaptation are wired", () => {
    const css = generateComponentCss(componentStyleMaps);
    const tabsSource = readProjectFile("navigation/tabs.ts");
    const breadcrumbsSource = readProjectFile("navigation/breadcrumbs.ts");
    const paginationSource = readProjectFile("navigation/pagination.ts");
    const sideNavSource = readProjectFile("navigation/side-nav.ts");

    // Tabs: variant + state + theme variables
    expect(css).toContain(".k-tabs--variant-line {");
    expect(css).toContain(".k-tabs--variant-pill {");
    expect(css).toContain(".k-tabs--variant-line.is-active {");
    expect(css).toContain(".k-tabs--variant-line:focus-within, .k-tabs--variant-line.is-focus-visible {");
    expect(css).toContain("--k-tabs-colors-indicator: var(--k-color-link-default);");
    expect(css).toContain("--k-tabs-colors-bg: var(--k-color-bg-surface);");
    expect(tabsSource).toContain(".tab:hover:not(:disabled) {");
    expect(tabsSource).toContain(":host(.k-tabs--variant-line) .tab.is-selected,");
    expect(tabsSource).toContain("var(--k-tabs-colors-indicator-active, var(--k-color-link-default))");

    // Breadcrumbs: variants + semantic link/text colors
    expect(css).toContain(".k-breadcrumbs--variant-default {");
    expect(css).toContain(".k-breadcrumbs--variant-compact {");
    expect(css).toContain("--k-breadcrumbs-colors-link: var(--k-color-link-default);");
    expect(css).toContain("--k-breadcrumbs-colors-current: var(--k-color-text-primary);");

    // Pagination: variants + active/disabled states
    expect(css).toContain(".k-pagination--variant-default {");
    expect(css).toContain(".k-pagination--variant-default.is-active {");
    expect(css).toContain(".k-pagination--variant-default.is-disabled, .k-pagination--variant-default:disabled, .k-pagination--variant-default[aria-disabled='true'] {");
    expect(css).toContain("--k-pagination-colors-bg: var(--k-color-action-secondary-bg);");
    expect(css).toContain("--k-pagination-colors-bg: var(--k-color-action-primary-bg);");

    // Side-nav: variant width + selected/disabled colors
    expect(css).toContain(".k-side-nav--variant-expanded {");
    expect(css).toContain(".k-side-nav--variant-collapsed {");
    expect(css).toContain("--k-side-nav-nav-width: 17rem;");
    expect(css).toContain("--k-side-nav-nav-width: 4.5rem;");
    expect(css).toContain("--k-side-nav-colors-item-bg: var(--k-color-state-selected-bg);");
    expect(css).toContain("--k-side-nav-colors-item-text: var(--k-color-state-disabled-text);");

    // Runtime API parameter wiring
    expect(tabsSource).toContain("readonly variant = input<TabsVariant>(\"line\")");
    expect(tabsSource).toContain("readonly state = input<TabsState>(\"default\")");
    expect(tabsSource).toContain("readonly lazy = input<boolean>(false)");
    expect(breadcrumbsSource).toContain("readonly variant = input<BreadcrumbsVariant>(\"default\")");
    expect(breadcrumbsSource).toContain("readonly separator = input<string>(\"/\")");
    expect(paginationSource).toContain("readonly variant = input<PaginationVariant>(\"default\")");
    expect(paginationSource).toContain("readonly pageSize = input<number>(10)");
    expect(paginationSource).toContain("readonly total = input<number>(0)");
    expect(sideNavSource).toContain("readonly variant = input<SideNavVariant>(\"expanded\")");
    expect(sideNavSource).toContain("readonly activeItemId = input<string | null>(null)");

    // Router integration for navigation primitives
    expect(breadcrumbsSource).toContain("imports: [RouterLink]");
    expect(sideNavSource).toContain("imports: [RouterLink, KentraIcon]");
  });
});
