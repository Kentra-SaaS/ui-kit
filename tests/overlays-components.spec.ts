import "@angular/compiler";
import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";
import {
  KentraDrawer,
  KentraDropdownMenu,
  KentraModal,
  KentraModalService,
  KentraTooltip,
} from "../overlays/public-api";

describe("overlay components", () => {
  it("exports all overlay components from the overlays entrypoint", () => {
    expect(typeof KentraModal).toBe("function");
    expect(typeof KentraModalService).toBe("function");
    expect(typeof KentraDrawer).toBe("function");
    expect(typeof KentraTooltip).toBe("function");
    expect(typeof KentraDropdownMenu).toBe("function");
  });

  it("maps modal variants and states to dedicated runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-modal--variant-sm.is-closed {");
    expect(css).toContain(".k-modal--variant-sm.is-open {");
    expect(css).toContain(".k-modal--variant-lg.is-closing {");
    expect(css).toContain(".k-modal--variant-fullscreen.is-open {");
    expect(css).toContain("--k-modal-panel-width: 44rem;");
    expect(css).toContain("--k-modal-backdrop-color: var(--k-color-overlay-backdrop);");
  });

  it("maps drawer variants and states to dedicated runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-drawer--variant-left.is-open {");
    expect(css).toContain(".k-drawer--variant-right.is-open {");
    expect(css).toContain(".k-drawer--variant-bottom.is-closing {");
    expect(css).toContain("--k-drawer-transform: translateX(0);");
    expect(css).toContain("--k-drawer-backdrop-color: var(--k-color-overlay-backdrop);");
  });

  it("maps tooltip variants and visibility states to dedicated runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-tooltip--variant-top.is-hidden {");
    expect(css).toContain(".k-tooltip--variant-top.is-visible {");
    expect(css).toContain(".k-tooltip--variant-right.is-visible {");
    expect(css).toContain(".k-tooltip--variant-left.is-hidden {");
    expect(css).toContain("--k-tooltip-colors-bg: var(--k-color-bg-inverse);");
    expect(css).toContain("--k-tooltip-offset: 0.5rem;");
  });

  it("maps dropdown-menu variants and interaction states to dedicated runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-dropdown-menu--variant-default.is-closed {");
    expect(css).toContain(".k-dropdown-menu--variant-default.is-open {");
    expect(css).toContain(".k-dropdown-menu--variant-default:focus-visible {");
    expect(css).toContain(".k-dropdown-menu--variant-default.is-disabled-item {");
    expect(css).toContain(".k-dropdown-menu--variant-danger-section.is-open {");
    expect(css).toContain("--k-dropdown-menu-colors-item-hover-bg: var(--k-color-state-hover-overlay);");
    expect(css).toContain("--k-dropdown-menu-focus-ring-color: var(--k-color-state-focus-ring);");
  });
});
