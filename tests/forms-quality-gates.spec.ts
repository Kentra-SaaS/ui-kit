import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";

const thisDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(thisDirectory, "..");

const readProjectFile = (path: string): string =>
  readFileSync(resolve(projectRoot, path), "utf8");

describe("form quality gates", () => {
  it("ensures responsive strategy for desktop, tablet and mobile", () => {
    const fieldSource = readProjectFile("forms/field.ts");
    const textInputSource = readProjectFile("forms/text-input.ts");
    const textareaSource = readProjectFile("forms/textarea.ts");
    const selectSource = readProjectFile("forms/select.ts");
    const checkboxSource = readProjectFile("forms/checkbox.ts");
    const radioGroupSource = readProjectFile("forms/radio-group.ts");
    const switchSource = readProjectFile("forms/switch.ts");

    // Desktop baseline
    expect(fieldSource).toContain(":host {");
    expect(textInputSource).toContain(":host {");
    expect(textareaSource).toContain(":host {");
    expect(selectSource).toContain(":host {");
    expect(checkboxSource).toContain(":host {");
    expect(radioGroupSource).toContain(":host {");
    expect(switchSource).toContain(":host {");

    // Tablet and mobile adaptation
    expect(fieldSource).toContain("@media (max-width: 64rem)");
    expect(fieldSource).toContain("@media (max-width: 48rem)");
    expect(textInputSource).toContain("@media (max-width: 64rem)");
    expect(textInputSource).toContain("@media (max-width: 48rem)");
    expect(textareaSource).toContain("@media (max-width: 64rem)");
    expect(textareaSource).toContain("@media (max-width: 48rem)");
    expect(selectSource).toContain("@media (max-width: 64rem)");
    expect(selectSource).toContain("@media (max-width: 48rem)");
    expect(checkboxSource).toContain("@media (max-width: 64rem)");
    expect(checkboxSource).toContain("@media (max-width: 48rem)");
    expect(radioGroupSource).toContain("@media (max-width: 64rem)");
    expect(radioGroupSource).toContain("@media (max-width: 48rem)");
    expect(switchSource).toContain("@media (max-width: 64rem)");
    expect(switchSource).toContain("@media (max-width: 48rem)");
  });

  it("ensures signal-forms basis and theme/parameter adaptation are wired", () => {
    const css = generateComponentCss(componentStyleMaps);
    const textInputSource = readProjectFile("forms/text-input.ts");
    const textareaSource = readProjectFile("forms/textarea.ts");
    const selectSource = readProjectFile("forms/select.ts");
    const checkboxSource = readProjectFile("forms/checkbox.ts");
    const radioGroupSource = readProjectFile("forms/radio-group.ts");
    const switchSource = readProjectFile("forms/switch.ts");

    // Signal-forms basis
    expect(textInputSource).toContain("implements KentraTextInputContract, FormValueControl<string>");
    expect(textInputSource).toContain("readonly value = model<string>(\"\")");
    expect(textInputSource).toContain("readonly disabled = input(false, { transform: coerceBooleanInput })");
    expect(textInputSource).toContain("readonly name = input(\"\", { transform: coerceStringInput })");
    expect(textInputSource).toContain("readonly min = input<number | undefined, unknown>(undefined, {");
    expect(textInputSource).toContain("readonly ariaDescribedBy = input<string | null>(null)");
    expect(textareaSource).toContain("implements KentraTextareaContract, FormValueControl<string>, AfterViewInit");
    expect(textareaSource).toContain("readonly value = model<string>(\"\")");
    expect(textareaSource).toContain("readonly maxLength = input<number | undefined, unknown>(undefined, {");
    expect(textareaSource).toContain("readonly ariaDescribedBy = input<string | null>(null)");
    expect(selectSource).toContain("implements KentraSelectContract, FormValueControl<string | null>");
    expect(selectSource).toContain("readonly disabled = input(false, { transform: coerceBooleanInput })");
    expect(selectSource).toContain("readonly name = input(\"\", { transform: coerceStringInput })");
    expect(selectSource).toContain("readonly ariaDescribedBy = input<string | null>(null)");
    expect(selectSource).toContain("imports: [KentraIcon]");
    expect(selectSource).toContain("<select");
    expect(selectSource).toContain("[selected]=\"isOptionSelected(option.value)\"");
    expect(selectSource).toContain("isOptionSelected(value: string): boolean");
    expect(selectSource).toContain("<k-icon class=\"icon\" name=\"caret-down\" aria-hidden=\"true\"></k-icon>");
    expect(checkboxSource).toContain("implements KentraCheckboxContract, FormCheckboxControl");
    expect(checkboxSource).toContain("readonly required = input(false, { transform: coerceBooleanInput })");
    expect(checkboxSource).toContain("readonly name = input(\"\", { transform: coerceStringInput })");
    expect(checkboxSource).toContain("imports: [KentraIcon]");
    expect(checkboxSource).toContain("readonly checked = model(false)");
    expect(checkboxSource).toContain("appearance: none;");
    expect(checkboxSource).toContain("<k-icon class=\"indicator\" [name]=\"indicatorGlyph()\" aria-hidden=\"true\"></k-icon>");
    expect(checkboxSource).toContain(".native:checked + .control .indicator");
    expect(checkboxSource).toContain(".native:indeterminate + .control .indicator");
    expect(radioGroupSource).toContain("implements KentraRadioGroupContract, FormValueControl<string | null>");
    expect(radioGroupSource).toContain("readonly required = input(false, { transform: coerceBooleanInput })");
    expect(radioGroupSource).toContain("readonly name = input(\"\", { transform: coerceStringInput })");
    expect(switchSource).toContain("implements KentraSwitchContract, FormCheckboxControl");
    expect(switchSource).toContain("readonly checked = model(false)");
    expect(switchSource).toContain("readonly disabled = input(false, { transform: coerceBooleanInput })");
    expect(switchSource).toContain("appearance: none;");
    expect(switchSource).toContain(".native:checked + .track .thumb");

    // Theme + parameter adaptation
    expect(css).toContain(".k-field--variant-default {");
    expect(css).toContain("--k-field-colors-label: var(--k-color-text-primary);");
    expect(css).toContain(".k-text-input--variant-with-prefix {");
    expect(css).toContain("--k-text-input-colors-bg: var(--k-color-input-bg);");
    expect(css).toContain("--k-text-input-colors-border: var(--k-color-input-readonly-border, var(--k-color-border-subtle));");
    expect(css).toContain(".k-textarea--variant-auto-resize {");
    expect(css).toContain("--k-textarea-colors-border: var(--k-color-input-readonly-border, var(--k-color-border-subtle));");
    expect(css).toContain(".k-select--variant-compact {");
    expect(css).toContain(".k-checkbox--variant-indeterminate.is-checked {");
    expect(css).toContain(".k-radio-group--variant-horizontal {");
    expect(css).toContain(".k-switch--variant-compact.is-on {");
    expect(css).toContain("--k-switch-colors-thumb: var(--k-color-border-default);");
  });
});
