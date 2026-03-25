import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import {
  KentraElementBase,
  KentraTextContract,
  TextVariant,
  textStyleMap,
} from "../internal";

@Component({
  selector: textStyleMap.baseClass,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
  },
  template: `
    @if (isParagraph()) {
      <p class="content"><ng-content></ng-content></p>
    } @else {
      <span class="content"><ng-content></ng-content></span>
    }
  `,
  styles: `
    :host {
      display: block;
      color: var(--k-text-color, currentColor);
    }

    .content {
      margin: 0;
      font-family: var(--k-text-family, inherit);
      font-size: var(--k-text-font-size, inherit);
      line-height: var(--k-text-line-height, inherit);
      font-weight: var(--k-text-font-weight, 400);
      color: inherit;
    }
  `,
})
export class KentraText extends KentraElementBase implements KentraTextContract {
  readonly variant = input<TextVariant>("body");
  readonly isParagraph = computed(() => this.variant() === "body");

  protected readonly baseClass = textStyleMap.baseClass;

  protected override styleValues() {
    return {
      variant: this.variant(),
    };
  }
}
