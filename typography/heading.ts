import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import {
  HeadingVariant,
  headingStyleMap,
  KentraElementBase,
  KentraHeadingContract,
} from "../internal";

@Component({
  selector: "k-heading",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "role": "heading",
    "[attr.aria-level]": "ariaLevel()",
  },
  template: `<span class="content"><ng-content></ng-content></span>`,
  styles: `
    :host {
      display: block;
      color: var(--k-heading-color, currentColor);
    }

    .content {
      margin: 0;
      font-family: var(--k-heading-family, inherit);
      font-size: var(--k-heading-font-size, inherit);
      line-height: var(--k-heading-line-height, inherit);
      font-weight: var(--k-heading-font-weight, var(--k-heading-default-weight, 600));
      color: inherit;
    }

    @media (max-width: 48rem) {
      :host(.k-heading--variant-display) .content {
        font-size: var(--k-typography-h2-font-size);
        line-height: var(--k-typography-h2-line-height);
      }

      :host(.k-heading--variant-h1) .content {
        font-size: var(--k-typography-h3-font-size);
        line-height: var(--k-typography-h3-line-height);
      }
    }
  `,
})
export class KentraHeading
  extends KentraElementBase
  implements KentraHeadingContract
{
  readonly variant = input<HeadingVariant>("h2");
  readonly ariaLevel = computed(() => this.toHeadingLevel(this.variant()));

  protected readonly baseClass = headingStyleMap.baseClass;

  protected override styleValues() {
    return {
      variant: this.variant(),
    };
  }

  private toHeadingLevel(variant: HeadingVariant): number {
    switch (variant) {
      case "display":
      case "h1":
        return 1;
      case "h2":
        return 2;
      case "h3":
        return 3;
      case "h4":
        return 4;
      case "h5":
        return 5;
      default:
        return 6;
    }
  }
}
