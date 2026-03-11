import { describe, expect, it } from "vitest";

import { componentStyleMaps, defineComponentStyleMap, generateComponentCss } from "../internal/style-maps";
import { buttonTokens } from "../internal/tokens/components";

describe("style-map generator", () => {
  it("renders selectors for registered component maps", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-button {");
    expect(css).toContain(".k-button--size-sm {");
    expect(css).toContain(".k-button--variant-primary {");
    expect(css).toContain(".k-button--variant-primary:hover {");
    expect(css).toContain(".k-button--variant-primary.is-disabled, .k-button--variant-primary:disabled {");
  });

  it("resolves token refs to css var expressions", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(`--k-btn-colors-bg: ${buttonTokens.styles.primary.default.colors.bg.var};`);
    expect(css).toContain(`--k-btn-colors-text: ${buttonTokens.styles.primary.default.colors.text.var};`);
  });

  it("serializes literal values", () => {
    const css = generateComponentCss([
      defineComponentStyleMap({
        id: "sample",
        baseClass: "k-sample",
        sizes: {
          md: {
            "--k-sample-gap": 8,
          },
        },
        variants: {
          solid: {
            default: {
              "--k-sample-opacity": 0.75,
            },
          },
        },
        stateSelectors: {
          default: "&",
        },
      }),
    ]);

    expect(css).toContain("--k-sample-gap: 8;");
    expect(css).toContain("--k-sample-opacity: 0.75;");
  });
});
