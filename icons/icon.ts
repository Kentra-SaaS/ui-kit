import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from "@angular/core";
import {
  formatPhosphorCodepointForCss,
  IconName,
  IconSize,
  IconWeight,
  iconStyleMap,
  KentraElementBase,
  KentraIconContract,
  resolvePhosphorDuotoneCodes,
  resolvePhosphorLigatureName,
} from "@kentra-saas/ui-kit";

export type { IconName, IconSize, IconWeight } from "@kentra-saas/ui-kit";

@Component({
  selector: "k-icon",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.role]": "decorative() ? null : 'img'",
    "[attr.aria-hidden]": "decorative() ? 'true' : null",
    "[attr.aria-label]": "decorative() ? null : resolvedAriaLabel()",
    "(click)": "onClick($event)",
  },
  template: `{{ ligatureName() ?? "" }}`,
  styles: `
    :host {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: var(--k-icon-font-size, var(--k-icon-size-md));
      block-size: var(--k-icon-font-size, var(--k-icon-size-md));
      font-size: var(--k-icon-font-size, var(--k-icon-size-md));
      color: var(--k-icon-color, currentColor);
      vertical-align: middle;
      flex: none;
      user-select: none;
    }

    :host::before,
    :host::after {
      pointer-events: none;
    }

    :host(.ph-duotone)::before,
    :host(.ph-duotone)::after {
      position: absolute;
      inset: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: inherit;
      font-size: inherit;
      font-style: inherit;
      font-weight: inherit;
      line-height: 1;
      color: var(--k-icon-color, currentColor);
    }

    :host(.ph-duotone)::before {
      content: var(--k-icon-duotone-layer-1, "");
      opacity: 0.2;
    }

    :host(.ph-duotone)::after {
      content: var(--k-icon-duotone-layer-2, "");
    }
  `,
})
export class KentraIcon extends KentraElementBase implements KentraIconContract {
  readonly name = input<IconName>("");
  readonly size = input<IconSize>("md");
  readonly weight = input<IconWeight>("regular");
  readonly color = input<string>("");
  readonly decorative = input<boolean>(true);
  readonly ariaLabel = input<string | null>(null);
  readonly click = output<MouseEvent>();

  readonly normalizedName = computed(() => this.normalizeIconName(this.name()));
  readonly ligatureName = computed(() =>
    resolvePhosphorLigatureName(this.normalizedName(), this.weight()),
  );
  readonly duotoneCodes = computed(() =>
    this.weight() === "duotone"
      ? resolvePhosphorDuotoneCodes(this.normalizedName())
      : null,
  );
  readonly resolvedAriaLabel = computed(() => {
    const explicitLabel = this.normalizeText(this.ariaLabel());
    if (explicitLabel !== null) {
      return explicitLabel;
    }

    const normalizedName = this.normalizedName();
    if (normalizedName === null) {
      return null;
    }

    return normalizedName.replace(/-/g, " ");
  });

  protected readonly baseClass = iconStyleMap.baseClass;

  protected override styleValues() {
    return {
      size: this.size(),
      variant: this.weight(),
    };
  }

  protected override cssVars() {
    const duotoneCodes = this.duotoneCodes();

    return {
      "--k-icon-color": this.normalizeText(this.color()),
      "--k-icon-duotone-layer-1": formatPhosphorCodepointForCss(
        duotoneCodes?.[0] ?? null,
      ),
      "--k-icon-duotone-layer-2": formatPhosphorCodepointForCss(
        duotoneCodes?.[1] ?? null,
      ),
    };
  }

  protected override extraClasses(): readonly string[] {
    return [this.weightClass(this.weight())];
  }

  onClick(event: MouseEvent): void {
    this.click.emit(event);
  }

  private weightClass(weight: IconWeight): string {
    switch (weight) {
      case "regular":
        return "ph";
      case "thin":
        return "ph-thin";
      case "light":
        return "ph-light";
      case "bold":
        return "ph-bold";
      case "fill":
        return "ph-fill";
      case "duotone":
        return "ph-duotone";
      default:
        return "ph";
    }
  }

  private normalizeIconName(value: string): string | null {
    const normalized = value
      .trim()
      .replace(/^ph-/, "")
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase();

    return normalized.length > 0 ? normalized : null;
  }

  private normalizeText(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }
}
