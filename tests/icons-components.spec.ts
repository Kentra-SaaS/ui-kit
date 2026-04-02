import "@angular/compiler";
import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";
import {
  formatPhosphorCodepointForCss,
  resolvePhosphorDuotoneCodes,
  resolvePhosphorLigatureName,
} from "../internal/components/icons/icon/phosphor-icon.helpers";
import { KentraIcon } from "../icons/public-api";
import type { IconName } from "../icons/public-api";

describe("icon components", () => {
  it("exports icon component from the icons entrypoint", () => {
    expect(typeof KentraIcon).toBe("function");
  });

  it("exports IconName as a typed union", () => {
    const iconName: IconName = "check";
    expect(iconName).toBe("check");
  });

  it("maps icon sizes and weights to runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-icon--size-sm {");
    expect(css).toContain(".k-icon--size-md {");
    expect(css).toContain(".k-icon--size-lg {");
    expect(css).toContain(".k-icon--variant-regular {");
    expect(css).toContain(".k-icon--variant-bold {");
    expect(css).toContain(".k-icon--variant-duotone {");
    expect(css).toContain("--k-icon-font-size: var(--k-icon-size-md);");
    expect(css).toContain("--k-icon-font-weight: 700;");
  });

  it("uses Phosphor ligature naming per weight", () => {
    expect(resolvePhosphorLigatureName("check", "regular")).toBe("check");
    expect(resolvePhosphorLigatureName("check", "thin")).toBe("check-thin");
    expect(resolvePhosphorLigatureName("check", "fill")).toBe("check-fill");
    expect(resolvePhosphorLigatureName("check", "duotone")).toBeNull();
  });

  it("resolves duotone codepoints for layered icons", () => {
    expect(resolvePhosphorDuotoneCodes("warning-circle")).toEqual([58594, 58595]);
    expect(formatPhosphorCodepointForCss(58594)).toBe('"\\e4e2"');
    expect(resolvePhosphorDuotoneCodes(null)).toBeNull();
  });
});
