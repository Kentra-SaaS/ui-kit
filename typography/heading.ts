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

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

@Component({
  selector: headingStyleMap.baseClass,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
  },
  template: `
    @switch (tagName()) {
      @case ("h1") {
        <h1 class="content"><ng-content></ng-content></h1>
      }
      @case ("h2") {
        <h2 class="content"><ng-content></ng-content></h2>
      }
      @case ("h3") {
        <h3 class="content"><ng-content></ng-content></h3>
      }
      @case ("h4") {
        <h4 class="content"><ng-content></ng-content></h4>
      }
      @case ("h5") {
        <h5 class="content"><ng-content></ng-content></h5>
      }
      @default {
        <h6 class="content"><ng-content></ng-content></h6>
      }
    }
  `,
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
  readonly tagName = computed<HeadingTag>(() => this.toHeadingTag(this.variant()));

  protected readonly baseClass = headingStyleMap.baseClass;

  protected override styleValues() {
    return {
      variant: this.variant(),
    };
  }

  private toHeadingTag(variant: HeadingVariant): HeadingTag {
    return variant === "display" ? "h1" : (variant as HeadingTag);
  }
}
