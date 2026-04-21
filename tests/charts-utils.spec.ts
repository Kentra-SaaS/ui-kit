import type { ElementRef } from "@angular/core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { resolveCssVar } from "../charts/chart-utils";

const createHostElementRef = (): ElementRef<HTMLElement> => {
  return {
    nativeElement: {} as HTMLElement,
  } as ElementRef<HTMLElement>;
};

describe("chart utils", () => {
  beforeEach(() => {
    vi.stubGlobal("getComputedStyle", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("resolves nested css variable references to the final color value", () => {
    const host = createHostElementRef();
    const values: Record<string, string> = {
      "--k-line-chart-colors-series-series01": "var(--k-color-brand-500)",
      "--k-color-brand-500": "#0ea5e9",
    };

    vi.mocked(getComputedStyle).mockReturnValue({
      getPropertyValue: (name: string) => values[name] ?? "",
    } as CSSStyleDeclaration);

    expect(
      resolveCssVar(
        host,
        "--k-line-chart-colors-series-series01",
        "#ffffff",
      ),
    ).toBe("#0ea5e9");
  });

  it("uses inline var fallback when referenced variable is missing", () => {
    const host = createHostElementRef();
    const values: Record<string, string> = {
      "--k-line-chart-colors-grid": "var(--k-color-grid-missing, #334155)",
    };

    vi.mocked(getComputedStyle).mockReturnValue({
      getPropertyValue: (name: string) => values[name] ?? "",
    } as CSSStyleDeclaration);

    expect(resolveCssVar(host, "--k-line-chart-colors-grid", "#cbd5e1")).toBe(
      "#334155",
    );
  });

  it("falls back safely when css variables contain a cycle", () => {
    const host = createHostElementRef();
    const values: Record<string, string> = {
      "--k-line-chart-colors-axis": "var(--k-axis-b)",
      "--k-axis-b": "var(--k-line-chart-colors-axis)",
    };

    vi.mocked(getComputedStyle).mockReturnValue({
      getPropertyValue: (name: string) => values[name] ?? "",
    } as CSSStyleDeclaration);

    expect(resolveCssVar(host, "--k-line-chart-colors-axis", "#64748b")).toBe("#64748b");
  });
});
