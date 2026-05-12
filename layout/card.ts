import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import {
  CardSize,
  CardVariant,
  KentraCardContract,
  KentraElementBase,
  cardStyleMap,
} from "@kentra-saas/ui-kit";

@Component({
  selector: "k-card",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
  },
  styles: `
    :host {
      display: block;
      box-sizing: border-box;
      max-inline-size: 100%;
      padding-inline: var(--k-card-padding-x, 0);
      padding-block: var(--k-card-padding-y, 0);
      border: var(--k-card-border-width, 1px) solid
        var(--k-card-colors-border, transparent);
      border-radius: var(--k-card-radius, 0);
      background: var(--k-card-colors-bg, transparent);
      color: var(--k-card-colors-text, inherit);
      box-shadow: var(--k-card-shadow, none);
    }

    @media (max-width: 48rem) {
      :host {
        padding-inline: var(--k-card-padding-xmobile, var(--k-card-padding-x, 0));
        padding-block: var(--k-card-padding-ymobile, var(--k-card-padding-y, 0));
      }
    }
  `,
  template: "<ng-content></ng-content>",
})
export class KentraCard extends KentraElementBase implements KentraCardContract {
  protected readonly baseClass = cardStyleMap.baseClass;

  readonly variant = input<CardVariant>("default");
  readonly size = input<CardSize>("md");

  protected override styleValues() {
    return {
      variant: this.variant(),
      size: this.size(),
    };
  }
}
