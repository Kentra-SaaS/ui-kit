import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";
import {
  KentraContainer,
  KentraDivider,
  KentraGrid,
  KentraSection,
  KentraStack,
} from "../layout/public-api";

describe("layout components", () => {
  it("exports all layout components from the layout entrypoint", () => {
    expect(typeof KentraContainer).toBe("function");
    expect(typeof KentraStack).toBe("function");
    expect(typeof KentraGrid).toBe("function");
    expect(typeof KentraSection).toBe("function");
    expect(typeof KentraDivider).toBe("function");
  });

  it("maps stack gap sizes to a dedicated runtime variable", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-stack--size-xs {");
    expect(css).toContain(".k-stack--size-sm {");
    expect(css).toContain(".k-stack--size-md {");
    expect(css).toContain(".k-stack--size-lg {");
    expect(css).toContain("--k-stack-gap: var(--k-space-2);");
    expect(css).toContain("--k-stack-gap: var(--k-space-6);");
  });

  it("maps stack orientation variants to the direction runtime variable", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-stack--variant-vertical {");
    expect(css).toContain(".k-stack--variant-horizontal {");
    expect(css).toContain("--k-stack-direction: column;");
    expect(css).toContain("--k-stack-direction: row;");
  });

  it("exposes stack align token aliases for host css var binding", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain("--k-stack-align-start: flex-start;");
    expect(css).toContain("--k-stack-align-center: center;");
    expect(css).toContain("--k-stack-align-end: flex-end;");
    expect(css).toContain("--k-stack-align-stretch: stretch;");
  });

  it("maps divider spacing sizes to a dedicated runtime variable", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-divider--size-sm {");
    expect(css).toContain(".k-divider--size-md {");
    expect(css).toContain(".k-divider--size-lg {");
    expect(css).toContain("--k-divider-spacing: var(--k-space-2);");
    expect(css).toContain("--k-divider-spacing: var(--k-space-6);");
  });

  it("maps grid variants to dedicated runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-grid--variant-two-col {");
    expect(css).toContain(".k-grid--variant-three-col {");
    expect(css).toContain(".k-grid--variant-four-col {");
    expect(css).toContain(".k-grid--variant-auto-fit {");
    expect(css).toContain("--k-grid-columns: repeat(2, minmax(0, 1fr));");
    expect(css).toContain("--k-grid-min-item-width: 16rem;");
  });

  it("maps section variants to dedicated runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-section--variant-default {");
    expect(css).toContain(".k-section--variant-elevated {");
    expect(css).toContain(".k-section--variant-outlined {");
    expect(css).toContain("--k-section-colors-bg: var(--k-color-bg-surface);");
  });
});
