import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import {
  ContainerSize,
  KentraContainerContract,
  KentraElementBase,
  containerStyleMap,
} from "@kentra-saas/ui-kit";

@Component({
  selector: "k-container",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
  },
  styles: `
    :host {
      display: block;
      box-sizing: border-box;
      inline-size: 100%;
      max-inline-size: var(--k-container-max-width, 48rem);
      margin-inline: auto;
      padding-inline: var(--k-container-padding-x, 0);
      background: var(--k-container-background, transparent);
    }

    @media (max-width: 48rem) {
      :host {
        padding-inline: var(
          --k-container-padding-xmobile,
          var(--k-container-padding-x, 0)
        );
      }
    }
  `,
  template: "<ng-content></ng-content>",
})
export class KentraContainer
  extends KentraElementBase
  implements KentraContainerContract
{
  protected readonly baseClass = containerStyleMap.baseClass;

  readonly size = input<ContainerSize>("md");

  protected override styleValues() {
    return {
      size: this.size(),
    };
  }
}
