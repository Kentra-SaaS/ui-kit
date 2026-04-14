import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";

const thisDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(thisDirectory, "..");

const readProjectFile = (path: string): string =>
  readFileSync(resolve(projectRoot, path), "utf8");

describe("overlay quality gates", () => {
  it("ensures responsive strategies for desktop, tablet and mobile", () => {
    const modalSource = readProjectFile("overlays/modal.ts");
    const drawerSource = readProjectFile("overlays/drawer.ts");
    const tooltipSource = readProjectFile("overlays/tooltip.ts");
    const dropdownSource = readProjectFile("overlays/dropdown-menu.ts");

    // Desktop baseline
    expect(modalSource).toContain(":host {");
    expect(drawerSource).toContain(":host {");
    expect(tooltipSource).toContain(":host {");
    expect(dropdownSource).toContain(":host {");

    // Tablet and mobile adaptations
    expect(modalSource).toContain("@media (max-width: 64rem)");
    expect(modalSource).toContain("@media (max-width: 48rem)");
    expect(drawerSource).toContain("@media (max-width: 64rem)");
    expect(drawerSource).toContain("@media (max-width: 48rem)");
    expect(tooltipSource).toContain("@media (max-width: 64rem)");
    expect(tooltipSource).toContain("@media (max-width: 48rem)");
    expect(dropdownSource).toContain("@media (max-width: 64rem)");
    expect(dropdownSource).toContain("@media (max-width: 48rem)");

    // Mobile touch targets
    expect(modalSource).toContain("inline-size: max(var(--k-space-8), 2.75rem);");
    expect(drawerSource).toContain("inline-size: max(var(--k-space-8), 2.75rem);");
    expect(dropdownSource).toContain("min-block-size: max(2.5rem, 2.75rem);");
  });

  it("ensures theme and parameter adaptation are wired", () => {
    const css = generateComponentCss(componentStyleMaps);
    const modalSource = readProjectFile("overlays/modal.ts");
    const drawerSource = readProjectFile("overlays/drawer.ts");
    const tooltipSource = readProjectFile("overlays/tooltip.ts");
    const dropdownSource = readProjectFile("overlays/dropdown-menu.ts");

    // Runtime API wiring
    expect(modalSource).toContain("readonly variant = input<ModalVariant>(\"md\")");
    expect(modalSource).toContain("readonly state = input<ModalState>(\"closed\")");
    expect(modalSource).toContain("readonly id = input<string | null>(null)");
    expect(modalSource).toContain("readonly dismissible = input<boolean>(true)");
    expect(modalSource).toContain("readonly closeOnBackdrop = input<boolean>(true)");
    expect(modalSource).toContain("this.modalService.stateFor(modalId)()");
    expect(modalSource).toContain("this.modalService.close(modalId);");
    expect(drawerSource).toContain("readonly variant = input<DrawerVariant>(\"right\")");
    expect(drawerSource).toContain("readonly state = input<DrawerState>(\"closed\")");
    expect(drawerSource).toContain("readonly closeOnEscape = input<boolean>(true)");
    expect(tooltipSource).toContain("readonly variant = input<TooltipVariant>(\"top\")");
    expect(tooltipSource).toContain("readonly state = input<TooltipState>(\"hidden\")");
    expect(tooltipSource).toContain("readonly disabled = input<boolean>(false)");
    expect(dropdownSource).toContain("readonly variant = input<DropdownMenuVariant>(\"default\")");
    expect(dropdownSource).toContain("readonly state = input<DropdownMenuState>(\"closed\")");
    expect(dropdownSource).toContain("readonly items = input<readonly KentraDropdownMenuItem[]>([])");
    expect(dropdownSource).toContain("readonly groups = input<readonly KentraDropdownMenuGroup[]>([])");
    expect(dropdownSource).toContain("readonly closeOnSelect = input<boolean>(true)");

    // Theme/state mappings through generated CSS
    expect(css).toContain(".k-modal--variant-md.is-open {");
    expect(css).toContain("--k-modal-colors-panel-bg: var(--k-color-bg-elevated);");
    expect(css).toContain(".k-drawer--variant-right.is-open {");
    expect(css).toContain("--k-drawer-colors-panel-bg: var(--k-color-bg-elevated);");
    expect(css).toContain(".k-tooltip--variant-bottom.is-visible {");
    expect(css).toContain("--k-tooltip-colors-text: var(--k-color-text-inverse);");
    expect(css).toContain(".k-dropdown-menu--variant-default.is-open {");
    expect(css).toContain(".k-dropdown-menu--variant-default.is-disabled-item {");
    expect(css).toContain("--k-dropdown-menu-colors-panel-bg: var(--k-color-bg-elevated);");

    // Base pattern consistency
    expect(modalSource).toContain('"[class]": "hostClasses()"');
    expect(modalSource).toContain('"[style]": "hostStyles()"');
    expect(modalSource).toContain('"[attr.id]": "resolvedModalId()"');
    expect(drawerSource).toContain('"[class]": "hostClasses()"');
    expect(drawerSource).toContain('"[style]": "hostStyles()"');
    expect(tooltipSource).toContain('"[class]": "hostClasses()"');
    expect(tooltipSource).toContain('"[style]": "hostStyles()"');
    expect(dropdownSource).toContain('"[class]": "hostClasses()"');
    expect(dropdownSource).toContain('"[style]": "hostStyles()"');
  });
});
