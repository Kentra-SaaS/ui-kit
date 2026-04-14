import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { componentStyleMaps, generateComponentCss } from "../internal/core/style-maps";

const thisDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(thisDirectory, "..");

const readProjectFile = (path: string): string =>
  readFileSync(resolve(projectRoot, path), "utf8");

describe("feedback quality gates", () => {
  it("ensures responsive strategies for desktop, tablet and mobile", () => {
    const alertSource = readProjectFile("feedback/alert.ts");
    const toastSource = readProjectFile("feedback/toast.ts");
    const toastContainerSource = readProjectFile("feedback/toast-container.ts");
    const progressSource = readProjectFile("feedback/progress.ts");
    const spinnerSource = readProjectFile("feedback/spinner.ts");

    // Desktop baseline
    expect(alertSource).toContain(":host {");
    expect(toastSource).toContain(":host {");
    expect(toastContainerSource).toContain(":host {");
    expect(progressSource).toContain(":host {");
    expect(spinnerSource).toContain(":host {");

    // Tablet and mobile adaptations
    expect(alertSource).toContain("@media (max-width: 64rem)");
    expect(alertSource).toContain("@media (max-width: 48rem)");
    expect(toastSource).toContain("@media (max-width: 64rem)");
    expect(toastSource).toContain("@media (max-width: 48rem)");
    expect(toastContainerSource).toContain("@media (max-width: 64rem)");
    expect(toastContainerSource).toContain("@media (max-width: 48rem)");
    expect(progressSource).toContain("@media (max-width: 64rem)");
    expect(progressSource).toContain("@media (max-width: 48rem)");
    expect(spinnerSource).toContain("@media (max-width: 64rem)");
    expect(spinnerSource).toContain("@media (max-width: 48rem)");

    // Touch-target safe controls on mobile
    expect(alertSource).toContain("inline-size: max(var(--k-alert-close-action-size, var(--k-space-8)), 2.75rem);");
    expect(toastSource).toContain("inline-size: max(var(--k-space-8), 2.75rem);");
    expect(toastContainerSource).toContain("pointer-events: none;");
  });

  it("ensures theme and parameter adaptation are wired", () => {
    const css = generateComponentCss(componentStyleMaps);
    const alertSource = readProjectFile("feedback/alert.ts");
    const toastSource = readProjectFile("feedback/toast.ts");
    const toastContainerSource = readProjectFile("feedback/toast-container.ts");
    const progressSource = readProjectFile("feedback/progress.ts");
    const spinnerSource = readProjectFile("feedback/spinner.ts");

    // Runtime APIs
    expect(alertSource).toContain("readonly variant = input<AlertVariant>(\"info\")");
    expect(alertSource).toContain("readonly state = input<AlertState>(\"default\")");
    expect(alertSource).toContain("readonly dismissible = input<boolean>(false)");
    expect(toastSource).toContain("readonly variant = input<ToastVariant>(\"info\")");
    expect(toastSource).toContain("readonly state = input<ToastState>(\"visible\")");
    expect(toastSource).toContain("readonly duration = input<number | null>(null)");
    expect(toastContainerSource).toContain("readonly placements = input<readonly KentraToastPlacement[]>(");
    expect(toastContainerSource).toContain("readonly maxVisible = input<number | null>(null)");
    expect(toastContainerSource).toContain("readonly newestOnTop = input<boolean>(true)");
    expect(toastContainerSource).toContain("\"[class]\": \"hostClasses()\"");
    expect(toastContainerSource).toContain("\"[style]\": \"hostStyles()\"");
    expect(toastContainerSource).toContain("\"--k-toast-container-offset\"");
    expect(progressSource).toContain("readonly variant = input<ProgressVariant>(\"determinate\")");
    expect(progressSource).toContain("readonly state = input<ProgressState>(\"default\")");
    expect(progressSource).toContain("\"--k-progress-value-ratio\"");
    expect(spinnerSource).toContain("readonly variant = input<SpinnerVariant>(\"md\")");
    expect(spinnerSource).toContain("readonly label = input<string | null>(null)");

    // Icon usage for feedback surface components
    expect(alertSource).toContain("imports: [KentraIcon]");
    expect(toastSource).toContain("imports: [KentraIcon]");

    // Theme/state mappings through generated CSS
    expect(css).toContain(".k-alert--variant-danger {");
    expect(css).toContain("--k-alert-colors-border: var(--k-color-state-danger);");
    expect(css).toContain(".k-toast--variant-success.is-visible {");
    expect(css).toContain("--k-toast-colors-title: var(--k-color-state-success);");
    expect(css).toContain(".k-progress--variant-indeterminate.is-paused {");
    expect(css).toContain("--k-progress-colors-label: var(--k-color-state-disabled-text);");
    expect(css).toContain(".k-spinner--variant-lg {");
    expect(css).toContain("--k-spinner-colors-indicator: var(--k-color-action-primary-bg);");
  });
});
