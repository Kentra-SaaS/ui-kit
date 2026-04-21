import "@angular/compiler";
import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";
import {
  KentraCheckbox,
  KentraField,
  KentraRadioGroup,
  KentraSelect,
  KentraSwitch,
  KentraTextInput,
  KentraTextarea,
} from "../forms/public-api";

describe("form components", () => {
  it("exports all form components from the forms entrypoint", () => {
    expect(typeof KentraField).toBe("function");
    expect(typeof KentraTextInput).toBe("function");
    expect(typeof KentraTextarea).toBe("function");
    expect(typeof KentraSelect).toBe("function");
    expect(typeof KentraCheckbox).toBe("function");
    expect(typeof KentraRadioGroup).toBe("function");
    expect(typeof KentraSwitch).toBe("function");
  });

  it("maps field variants and states to runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-field--variant-default {");
    expect(css).toContain(".k-field--variant-inline-label {");
    expect(css).toContain(".k-field--variant-default.is-required {");
    expect(css).toContain(".k-field--variant-default.is-error {");
    expect(css).toContain(".k-field--variant-default.is-disabled, .k-field--variant-default:disabled, .k-field--variant-default[aria-disabled='true'] {");
  });

  it("maps text-input variants and states to runtime variables", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-text-input--variant-default {");
    expect(css).toContain(".k-text-input--variant-with-prefix {");
    expect(css).toContain(".k-text-input--variant-with-suffix {");
    expect(css).toContain(".k-text-input--variant-default:focus-within, .k-text-input--variant-default.is-focus-visible {");
    expect(css).toContain(".k-text-input--variant-default.is-disabled, .k-text-input--variant-default:disabled, .k-text-input--variant-default[aria-disabled='true'] {");
    expect(css).toContain(".k-text-input--variant-default.is-readonly {");
    expect(css).toContain(".k-text-input--variant-default.is-error {");
  });

  it("maps textarea/select/checkbox/radio-group/switch variants and states", () => {
    const css = generateComponentCss(componentStyleMaps);

    expect(css).toContain(".k-textarea--variant-auto-resize {");
    expect(css).toContain(".k-textarea--variant-default:focus-within, .k-textarea--variant-default.is-focus-visible {");
    expect(css).toContain(".k-select--variant-compact {");
    expect(css).toContain(".k-select--variant-default.is-open {");
    expect(css).toContain(".k-select--variant-default:focus-within, .k-select--variant-default.is-focus-visible {");
    expect(css).toContain(".k-checkbox--variant-default.is-indeterminate {");
    expect(css).toContain(".k-checkbox--variant-default:focus-within.is-unchecked, .k-checkbox--variant-default.is-focus-visible {");
    expect(css).toContain(".k-radio-group--variant-horizontal {");
    expect(css).toContain(".k-radio-group--variant-horizontal:focus-within, .k-radio-group--variant-horizontal.is-focus-visible {");
    expect(css).toContain(".k-switch--variant-compact.is-on {");
    expect(css).toContain(".k-switch--variant-default:focus-within.is-off, .k-switch--variant-default.is-focus-visible {");
  });
});
