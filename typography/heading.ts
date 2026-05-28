import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import {
  HeadingVariant,
  headingStyleMap,
  KentraElementBase,
  KentraHeadingContract,
} from "@kentra-saas/ui-kit";

@Component({
  selector: "k-heading",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
  },
  template: `
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>

    @switch (headingLevel()) {
      @case (1) {
        <h1 class="content"><ng-container [ngTemplateOutlet]="content"></ng-container></h1>
      }
      @case (2) {
        <h2 class="content"><ng-container [ngTemplateOutlet]="content"></ng-container></h2>
      }
      @case (3) {
        <h3 class="content"><ng-container [ngTemplateOutlet]="content"></ng-container></h3>
      }
      @case (4) {
        <h4 class="content"><ng-container [ngTemplateOutlet]="content"></ng-container></h4>
      }
      @case (5) {
        <h5 class="content"><ng-container [ngTemplateOutlet]="content"></ng-container></h5>
      }
      @default {
        <h6 class="content"><ng-container [ngTemplateOutlet]="content"></ng-container></h6>
      }
    }
  `,
  styles: `
    :host {
      display: block;
      color: var(--k-heading-color, currentColor);
    }

    .content {
      display: block;
      margin-block: 0;
      margin-inline: 0;
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
  imports: [NgTemplateOutlet],
})
export class KentraHeading
  extends KentraElementBase
  implements KentraHeadingContract
{
  readonly variant = input<HeadingVariant>("h2");
  readonly headingLevel = computed(() => this.toHeadingLevel(this.variant()));

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
