import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";

const thisDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(thisDirectory, "..");

const readProjectFile = (path: string): string =>
  readFileSync(resolve(projectRoot, path), "utf8");

describe("layout quality gates", () => {
  it("ensures responsive strategies for desktop, tablet and mobile", () => {
    const cardSource = readProjectFile("layout/card.ts");
    const containerSource = readProjectFile("layout/container.ts");
    const stackSource = readProjectFile("layout/stack.ts");
    const gridSource = readProjectFile("layout/grid.ts");
    const sectionSource = readProjectFile("layout/section.ts");
    const dividerSource = readProjectFile("layout/divider.ts");

    // Desktop baseline
    expect(cardSource).toContain(":host {");
    expect(containerSource).toContain(":host {");
    expect(stackSource).toContain(":host {");
    expect(gridSource).toContain(":host {");
    expect(sectionSource).toContain(":host {");
    expect(dividerSource).toContain(":host {");

    // Tablet/mobile adaptations
    expect(cardSource).toContain("@media (max-width: 48rem)");
    expect(cardSource).toContain("--k-card-padding-xmobile");
    expect(containerSource).toContain("@media (max-width: 48rem)");
    expect(containerSource).toContain("--k-container-padding-xmobile");
    expect(sectionSource).toContain("@media (max-width: 48rem)");
    expect(sectionSource).toContain("--k-section-padding-xmobile");

    // Responsive-by-layout strategy
    expect(gridSource).toContain("repeat(auto-fit, minmax(var(--k-grid-min-item-width, 16rem), 1fr))");
    expect(gridSource).toContain("readonly minItemWidth = input<string | null>(null);");

    // Responsive-by-parameter strategy
    expect(stackSource).toContain("readonly gap = input<StackGap>(\"md\")");
    expect(stackSource).toContain("readonly orientation = input<StackOrientation>(\"vertical\")");
    expect(dividerSource).toContain("readonly spacing = input<DividerSpacing>(\"md\")");
    expect(dividerSource).toContain("readonly orientation = input<DividerOrientation>(\"horizontal\")");
  });

  it("ensures theme and parameter adaptation are wired", () => {
    const css = generateComponentCss(componentStyleMaps);
    const darkThemeSource = readProjectFile("styles/themes/dark.scss");

    // Card: size + variant surfaces
    expect(css).toContain(".k-card--size-sm {");
    expect(css).toContain(".k-card--size-md {");
    expect(css).toContain(".k-card--size-lg {");
    expect(css).toContain(".k-card--variant-default {");
    expect(css).toContain(".k-card--variant-elevated {");
    expect(css).toContain(".k-card--variant-outlined {");
    expect(css).toContain("--k-card-colors-bg: var(--k-color-bg-surface);");
    expect(css).toContain("--k-card-colors-border: var(--k-color-card-elevated-border, var(--k-color-border-subtle));");
    expect(css).toContain("--k-card-shadow: var(--k-shadow-card-elevated, var(--k-shadow-md));");

    // Container: size + theme surface
    expect(css).toContain(".k-container--size-sm {");
    expect(css).toContain(".k-container--size-md {");
    expect(css).toContain(".k-container--size-lg {");
    expect(css).toContain(".k-container--size-fluid {");
    expect(css).toContain("--k-container-background: var(--k-color-bg-surface);");

    // Stack: gap/orientation + alignment aliases
    expect(css).toContain(".k-stack--size-xs {");
    expect(css).toContain(".k-stack--size-lg {");
    expect(css).toContain(".k-stack--variant-vertical {");
    expect(css).toContain(".k-stack--variant-horizontal {");
    expect(css).toContain("--k-stack-align-start: flex-start;");
    expect(css).toContain("--k-stack-align-stretch: stretch;");

    // Grid: variants and tokenized sizing
    expect(css).toContain(".k-grid--variant-two-col {");
    expect(css).toContain(".k-grid--variant-auto-fit {");
    expect(css).toContain("--k-grid-min-item-width: 16rem;");
    expect(css).toContain("--k-grid-gap: var(--k-space-4);");

    // Section: variants + theme-aware colors
    expect(css).toContain(".k-section--variant-default {");
    expect(css).toContain(".k-section--variant-elevated {");
    expect(css).toContain(".k-section--variant-outlined {");
    expect(css).toContain("--k-section-colors-bg: var(--k-color-bg-surface);");
    expect(css).toContain("--k-section-colors-border: var(--k-color-section-elevated-border, var(--k-color-border-subtle));");
    expect(css).toContain("--k-section-shadow: var(--k-shadow-section-elevated, var(--k-shadow-md));");

    // Divider: orientation/state variants + semantic border colors
    expect(css).toContain(".k-divider--variant-horizontal.is-subtle {");
    expect(css).toContain(".k-divider--variant-vertical.is-strong {");
    expect(css).toContain("--k-divider-color: var(--k-color-divider-subtle, var(--k-color-border-subtle));");
    expect(css).toContain("--k-divider-color: var(--k-color-border-strong);");

    // Dark-mode refinements for readability and elevation contrast
    expect(darkThemeSource).toContain("--k-color-input-readonly-border: var(--k-color-input-disabled-border);");
    expect(darkThemeSource).toContain("--k-color-divider-subtle: var(--k-color-border-default);");
    expect(darkThemeSource).toContain("--k-color-section-elevated-border: var(--k-color-border-default);");
    expect(darkThemeSource).toContain("--k-shadow-section-elevated: var(--k-shadow-lg);");
    expect(darkThemeSource).toContain("--k-color-card-elevated-border: var(--k-color-border-default);");
    expect(darkThemeSource).toContain("--k-shadow-card-elevated: var(--k-shadow-lg);");
  });
});
