import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const thisDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(thisDirectory, "..");

const readProjectFile = (path: string): string =>
  readFileSync(resolve(projectRoot, path), "utf8");

describe("accessibility quality gates", () => {
  it("keeps keyboard and aria semantics for core actions and form controls", () => {
    const buttonSource = readProjectFile("actions/button.ts");
    const iconButtonSource = readProjectFile("actions/icon-button.ts");
    const fieldSource = readProjectFile("forms/field.ts");
    const textInputSource = readProjectFile("forms/text-input.ts");
    const textareaSource = readProjectFile("forms/textarea.ts");
    const checkboxSource = readProjectFile("forms/checkbox.ts");
    const switchSource = readProjectFile("forms/switch.ts");
    const selectSource = readProjectFile("forms/select.ts");

    expect(buttonSource).toContain("[attr.aria-busy]");
    expect(buttonSource).toContain("(keydown)=\"onKeyDown($event)\"");
    expect(buttonSource).toContain("(keyup)=\"onKeyUp($event)\"");

    expect(iconButtonSource).toContain("[attr.aria-label]=\"resolvedAriaLabel()\"");
    expect(iconButtonSource).toContain("(keydown)=\"onKeyDown($event)\"");
    expect(iconButtonSource).toContain("(keyup)=\"onKeyUp($event)\"");

    expect(fieldSource).toContain("[attr.for]=\"resolvedForId()\"");
    expect(fieldSource).toContain("[attr.id]=\"showHint() ? resolvedHintId() : null\"");
    expect(fieldSource).toContain("[attr.id]=\"showErrorText() ? resolvedErrorId() : null\"");
    expect(fieldSource).toContain("readonly describedBy = computed(() =>");
    expect(textInputSource).toContain("[attr.aria-describedby]=\"normalizedAriaDescribedBy()\"");
    expect(textareaSource).toContain("[attr.aria-describedby]=\"normalizedAriaDescribedBy()\"");
    expect(checkboxSource).toContain("[attr.aria-invalid]=\"invalid() ? 'true' : null\"");
    expect(switchSource).toContain("role=\"switch\"");
    expect(selectSource).toContain("[attr.aria-invalid]=\"invalid() ? 'true' : null\"");
    expect(selectSource).toContain("[attr.aria-describedby]=\"normalizedAriaDescribedBy()\"");
    expect(selectSource).toContain("(keydown)=\"onOpenKeydown($event)\"");
  });

  it("keeps navigation and overlay primitives wired to ARIA role patterns", () => {
    const tabsSource = readProjectFile("navigation/tabs.ts");
    const paginationSource = readProjectFile("navigation/pagination.ts");
    const modalSource = readProjectFile("overlays/modal.ts");
    const dropdownMenuSource = readProjectFile("overlays/dropdown-menu.ts");
    const tooltipSource = readProjectFile("overlays/tooltip.ts");

    expect(tabsSource).toContain("role=\"tablist\"");
    expect(tabsSource).toContain("role=\"tab\"");
    expect(tabsSource).toContain("[attr.aria-selected]");
    expect(tabsSource).toContain("[attr.aria-controls]");

    expect(paginationSource).toContain("aria-label=\"Pagination\"");
    expect(paginationSource).toContain("[attr.aria-current]");

    expect(modalSource).toContain("role=\"dialog\"");
    expect(modalSource).toContain("aria-modal=\"true\"");
    expect(modalSource).toContain("[attr.aria-labelledby]");
    expect(modalSource).toContain("[attr.aria-describedby]");
    expect(modalSource).toContain("(keydown)=\"onBackdropKeydown($event)\"");

    expect(dropdownMenuSource).toContain("[attr.aria-haspopup]=\"'menu'\"");
    expect(dropdownMenuSource).toContain("[attr.aria-expanded]");
    expect(dropdownMenuSource).toContain("role=\"menu\"");
    expect(dropdownMenuSource).toContain("role=\"menuitem\"");

    expect(tooltipSource).toContain("role=\"tooltip\"");
    expect(tooltipSource).toContain("[attr.aria-describedby]");
  });

  it("keeps feedback primitives connected to live-region semantics", () => {
    const alertSource = readProjectFile("feedback/alert.ts");
    const toastSource = readProjectFile("feedback/toast.ts");
    const progressSource = readProjectFile("feedback/progress.ts");
    const spinnerSource = readProjectFile("feedback/spinner.ts");

    expect(alertSource).toContain("[attr.role]\": \"resolvedRole()\"");
    expect(alertSource).toContain("[attr.aria-live]\": \"resolvedAriaLive()\"");

    expect(toastSource).toContain("[attr.role]\": \"resolvedRole()\"");
    expect(toastSource).toContain("[attr.aria-live]\": \"resolvedAriaLive()\"");
    expect(toastSource).toContain("[attr.aria-atomic]\": \"'true'\"");

    expect(progressSource).toContain("[attr.role]\": \"'progressbar'\"");
    expect(progressSource).toContain("[attr.aria-valuenow]");
    expect(progressSource).toContain("[attr.aria-valuemax]");

    expect(spinnerSource).toContain("[attr.role]\": \"resolvedLabel() ? 'status' : null\"");
    expect(spinnerSource).toContain("[attr.aria-live]\": \"resolvedLabel() ? 'polite' : null\"");
  });
});
