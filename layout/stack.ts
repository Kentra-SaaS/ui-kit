import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import {
  KentraElementBase,
  KentraStackContract,
  StackAlign,
  StackGap,
  StackOrientation,
  stackStyleMap,
} from "../internal";

@Component({
  selector: "k-stack",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
  },
  template: "<ng-content></ng-content>",
  styles: `
    :host {
      display: var(--k-stack-display, flex);
      flex-direction: var(--k-stack-direction, column);
      gap: var(--k-stack-gap, var(--k-stack-gap-md));
      align-items: var(--k-stack-align, var(--k-stack-align-start));
    }
  `,
})
export class KentraStack extends KentraElementBase implements KentraStackContract {
  readonly gap = input<StackGap>("md");
  readonly align = input<StackAlign>("start");
  readonly orientation = input<StackOrientation>("vertical");

  protected readonly baseClass = stackStyleMap.baseClass;

  protected override styleValues() {
    return {
      size: this.gap(),
      variant: this.orientation(),
    };
  }

  protected override cssVars() {
    return {
      "--k-stack-align": `var(--k-stack-align-${this.align()})`,
    };
  }
}
