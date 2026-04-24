import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";

const thisDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(thisDirectory, "..");

const readProjectFile = (path: string): string =>
  readFileSync(resolve(projectRoot, path), "utf8");

describe("patterns quality gates", () => {
  it("ensures responsive strategies for desktop, tablet and mobile", () => {
    const filterBarSource = readProjectFile("patterns/filter-bar-pattern.ts");
    const formSectionSource = readProjectFile("patterns/form-section-pattern.ts");
    const tableWithToolbarSource = readProjectFile("patterns/table-with-toolbar-pattern.ts");

    // Desktop baseline
    expect(filterBarSource).toContain(":host {");
    expect(formSectionSource).toContain(":host {");
    expect(tableWithToolbarSource).toContain(":host {");

    // Tablet/mobile adaptations
    expect(filterBarSource).toContain("@media (max-width: 64rem)");
    expect(filterBarSource).toContain("@media (max-width: 48rem)");
    expect(formSectionSource).toContain("@media (max-width: 64rem)");
    expect(formSectionSource).toContain("@media (max-width: 48rem)");
    expect(tableWithToolbarSource).toContain("@media (max-width: 64rem)");
    expect(tableWithToolbarSource).toContain("@media (max-width: 48rem)");

    // Responsive-by-layout strategy
    expect(filterBarSource).toContain("grid-template-columns: minmax(0, 1fr);");
    expect(formSectionSource).toContain("grid-template-columns: minmax(0, 1fr);");
    expect(tableWithToolbarSource).toContain(".toolbar {");
    expect(tableWithToolbarSource).toContain("flex-direction: column;");
  });

  it("ensures theme and parameter adaptation are wired", () => {
    const css = generateComponentCss(componentStyleMaps);
    const filterBarSource = readProjectFile("patterns/filter-bar-pattern.ts");
    const formSectionSource = readProjectFile("patterns/form-section-pattern.ts");
    const tableWithToolbarSource = readProjectFile("patterns/table-with-toolbar-pattern.ts");
    const publicApiSource = readProjectFile("patterns/public-api.ts");
    const packageSource = readProjectFile("package.json");

    // Base pattern consistency
    expect(filterBarSource).toContain('"[class]": "hostClasses()"');
    expect(filterBarSource).toContain('"[style]": "hostStyles()"');
    expect(formSectionSource).toContain('"[class]": "hostClasses()"');
    expect(formSectionSource).toContain('"[style]": "hostStyles()"');
    expect(tableWithToolbarSource).toContain('"[class]": "hostClasses()"');
    expect(tableWithToolbarSource).toContain('"[style]": "hostStyles()"');

    // Runtime API wiring
    expect(filterBarSource).toContain('readonly variant = input<FilterBarPatternVariant>("inline")');
    expect(filterBarSource).toContain('readonly state = input<FilterBarPatternState>("default")');

    expect(formSectionSource).toContain('readonly variant = input<FormSectionPatternVariant>("default")');
    expect(formSectionSource).toContain('readonly state = input<FormSectionPatternState>("default")');
    expect(formSectionSource).toContain("readonly hasAlert = computed");

    expect(tableWithToolbarSource).toContain('readonly variant = input<TableWithToolbarPatternVariant>("default")');
    expect(tableWithToolbarSource).toContain('readonly state = input<TableWithToolbarPatternState>("default")');
    expect(tableWithToolbarSource).toContain("readonly resolvedState = computed<TableWithToolbarPatternState>(");
    expect(tableWithToolbarSource).toContain("readonly effectiveSelectable = computed(");
    expect(tableWithToolbarSource).toContain("(selectionChanged)=\"onSelectionChanged($event)\"");
    expect(tableWithToolbarSource).toContain("(sortChanged)=\"onSortChanged($event)\"");
    expect(tableWithToolbarSource).toContain("(pageChanged)=\"onPageChanged($event)\"");

    // Theme/state mappings through generated CSS
    expect(css).toContain(".k-filter-bar-pattern--variant-inline {");
    expect(css).toContain(".k-filter-bar-pattern--variant-inline.is-disabled,");
    expect(css).toContain(".k-form-section-pattern--variant-with-aside-help.is-error {");
    expect(css).toContain(".k-form-section-pattern--variant-default.is-disabled,");
    expect(css).toContain(".k-table-with-toolbar-pattern--variant-default.is-loading {");
    expect(css).toContain(".k-table-with-toolbar-pattern--variant-default.is-empty {");
    expect(css).toContain(".k-table-with-toolbar-pattern--variant-default.is-error {");
    expect(css).toContain(".k-table-with-toolbar-pattern--variant-default.is-blocked {");

    // Public entrypoint and package export
    expect(publicApiSource).toContain('export * from "./filter-bar-pattern";');
    expect(publicApiSource).toContain('export * from "./form-section-pattern";');
    expect(publicApiSource).toContain('export * from "./table-with-toolbar-pattern";');
    expect(packageSource).toContain('"./patterns"');
  });
});
