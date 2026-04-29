import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import {
  DividerOrientation,
  DividerSpacing,
  DividerVariant,
  KentraDividerContract,
  KentraElementBase,
  dividerStyleMap,
} from "@kentra-saas/ui-kit";

@Component({
  selector: "k-divider",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "role": "separator",
    "[attr.aria-orientation]": "orientation()",
  },
  styles: `
    :host {
      display: block;
      flex: none;
      inline-size: var(--k-divider-inline-size, 100%);
      block-size: var(--k-divider-block-size, 1px);
      background: var(--k-divider-color, currentColor);
      margin-block: var(--k-divider-spacing, var(--k-divider-spacing-md, 0));
    }
  `,
  template: "",
})
export class KentraDivider
  extends KentraElementBase
  implements KentraDividerContract
{
  protected readonly baseClass = dividerStyleMap.baseClass;

  readonly orientation = input<DividerOrientation>("horizontal");
  readonly variant = input<DividerVariant>("subtle");
  readonly spacing = input<DividerSpacing>("md");

  protected override styleValues() {
    return {
      size: this.spacing(),
      variant: this.orientation(),
    };
  }

  protected override stateValues() {
    return {
      [this.variant()]: true,
    };
  }
}
