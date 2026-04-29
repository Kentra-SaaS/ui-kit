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
} from "@kentra-saas/ui-kit";

@Component({
  selector: "k-text",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
  },
  template: `
    <span class="content" [class.content--paragraph]="isParagraph()">
      <ng-content></ng-content>
    </span>
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

    .content--paragraph {
      display: block;
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
