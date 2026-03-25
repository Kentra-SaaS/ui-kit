import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";

const thisDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(thisDirectory, "..");

const readProjectFile = (path: string): string =>
  readFileSync(resolve(projectRoot, path), "utf8");

describe("typography quality gates", () => {
  it("ensures responsive strategy for typography components", () => {
    const headingSource = readProjectFile("typography/heading.ts");
    const textSource = readProjectFile("typography/text.ts");
    const linkSource = readProjectFile("typography/link.ts");

    // Desktop baseline
    expect(headingSource).toContain(":host {");
    expect(textSource).toContain(":host {");
    expect(linkSource).toContain(":host {");

    // Mobile adaptation for heading scale
    expect(headingSource).toContain("@media (max-width: 48rem)");
    expect(headingSource).toContain(":host(.k-heading--variant-display) .content");
    expect(headingSource).toContain(":host(.k-heading--variant-h1) .content");
    expect(headingSource).toContain("var(--k-typography-h2-font-size)");
    expect(headingSource).toContain("var(--k-typography-h3-font-size)");

    // Token-based responsive baseline for body/link typography
    expect(textSource).toContain("font-size: var(--k-text-font-size, inherit);");
    expect(linkSource).toContain("font-size: var(--k-link-font-size, inherit);");
    expect(linkSource).toContain("readonly routerLink = input<string | unknown[] | null>(null);");
    expect(linkSource).toContain("[routerLink]=\"resolvedRouterLink()\"");
  });

  it("ensures theme and parameter adaptation are wired", () => {
    const css = generateComponentCss(componentStyleMaps);

    // Heading theme + variant parameters
    expect(css).toContain(".k-heading {");
    expect(css).toContain("--k-heading-color: var(--k-color-text-primary);");
    expect(css).toContain(".k-heading--variant-display {");
    expect(css).toContain(".k-heading--variant-h4 {");

    // Text theme + variant parameters
    expect(css).toContain(".k-text--variant-body {");
    expect(css).toContain(".k-text--variant-caption {");
    expect(css).toContain(".k-text--variant-muted {");
    expect(css).toContain(".k-text--variant-strong {");

    // Link theme + variant/state parameters
    expect(css).toContain(".k-link--variant-default {");
    expect(css).toContain(".k-link--variant-subtle {");
    expect(css).toContain(".k-link--variant-inline-strong {");
    expect(css).toContain(".k-link--variant-default:hover, .k-link--variant-default.is-hover {");
    expect(css).toContain(".k-link--variant-default:focus-within, .k-link--variant-default.is-focus-visible {");
    expect(css).toContain(".k-link--variant-default.is-disabled, .k-link--variant-default[aria-disabled='true'] {");
  });
});
