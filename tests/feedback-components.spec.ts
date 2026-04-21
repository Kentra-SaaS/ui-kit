import "@angular/compiler";
import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";
import {
  KentraAlert,
  KentraProgress,
  KentraSpinner,
  KentraToast,
  KentraToastContainer,
  KentraToastService,
} from "../feedback/public-api";

describe("feedback components", () => {
  it("exports all feedback components from the feedback entrypoint", () => {
    expect(typeof KentraAlert).toBe("function");
    expect(typeof KentraToast).toBe("function");
    expect(typeof KentraToastContainer).toBe("function");
    expect(typeof KentraToastService).toBe("function");
    expect(typeof KentraProgress).toBe("function");
    expect(typeof KentraSpinner).toBe("function");
  });

  it("maps alert variants and dismissible state to dedicated runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-alert--variant-info {");
    expect(css).toContain(".k-alert--variant-success {");
    expect(css).toContain(".k-alert--variant-warning {");
    expect(css).toContain(".k-alert--variant-danger {");
    expect(css).toContain(".k-alert--variant-info.is-dismissible {");
    expect(css).toContain("--k-alert-colors-bg: var(--k-color-state-info-bg);");
    expect(css).toContain("--k-alert-focus-ring-color: var(--k-color-state-focus-ring);");
  });

  it("maps toast variants and lifecycle states to dedicated runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-toast--variant-info.is-enter {");
    expect(css).toContain(".k-toast--variant-info.is-visible {");
    expect(css).toContain(".k-toast--variant-info.is-exit {");
    expect(css).toContain(".k-toast--variant-danger.is-visible {");
    expect(css).toContain("--k-toast-opacity: 1;");
    expect(css).toContain("--k-toast-motion-enter-duration: var(--k-motion-duration-fast);");
  });

  it("maps progress variants and paused states to dedicated runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-progress--variant-determinate {");
    expect(css).toContain(".k-progress--variant-determinate.is-paused {");
    expect(css).toContain(".k-progress--variant-indeterminate {");
    expect(css).toContain(".k-progress--variant-indeterminate.is-paused {");
    expect(css).toContain("--k-progress-colors-indicator: var(--k-color-action-primary-bg);");
    expect(css).toContain("--k-progress-animation-play-state: paused;");
  });

  it("maps spinner variants to dedicated runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-spinner--variant-sm {");
    expect(css).toContain(".k-spinner--variant-md {");
    expect(css).toContain(".k-spinner--variant-lg {");
    expect(css).toContain("--k-spinner-size: var(--k-icon-size-md);");
    expect(css).toContain("--k-spinner-colors-track: var(--k-color-bg-elevated);");
  });
});
