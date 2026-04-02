import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  model,
  output,
  signal,
  viewChild,
} from "@angular/core";
import type { FormValueControl } from "@angular/forms/signals";
import {
  KentraElementBase,
  KentraTextInputContract,
  KentraTextInputType,
  TextInputState,
  TextInputVariant,
  textInputStyleMap,
} from "../internal";

type ValueChangeEvent = {
  readonly value: string;
  readonly previousValue: string | null;
  readonly userTriggered: boolean;
};

@Component({
  selector: "k-text-input",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-disabled]": "disabled() ? 'true' : null",
  },
  template: `
    <div class="shell">
      @if (showPrefix()) {
        <span class="affix affix-prefix">{{ prefixText() }}</span>
      }

      <input
        #controlElement
        class="control"
        [attr.type]="type()"
        [value]="value()"
        [attr.placeholder]="placeholder()"
        [attr.autocomplete]="autocomplete()"
        [attr.name]="normalizedName()"
        [attr.min]="minAttr()"
        [attr.max]="maxAttr()"
        [attr.minlength]="minLengthAttr()"
        [attr.maxlength]="maxLengthAttr()"
        [readOnly]="readonly()"
        [disabled]="disabled()"
        [required]="required()"
        [attr.aria-invalid]="invalid() ? 'true' : null"
        (input)="onInput($event)"
        (focus)="onFocus($event)"
        (blur)="onBlur($event)"
      />

      @if (showSuffix()) {
        <span class="affix affix-suffix">{{ suffixText() }}</span>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      inline-size: 100%;
    }

    .shell {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      inline-size: 100%;
      min-block-size: var(--k-text-input-size-min-height, var(--k-space-10));
      padding-inline: var(--k-text-input-size-padding-x, var(--k-space-3));
      padding-block: var(--k-text-input-size-padding-y, var(--k-space-2));
      gap: var(--k-text-input-size-gap, var(--k-space-2));
      border: var(--k-text-input-border-width, 1px) solid
        var(--k-text-input-colors-border, transparent);
      border-radius: var(--k-text-input-border-radius, var(--k-radius-md));
      background: var(--k-text-input-colors-bg, transparent);
      transition:
        border-color var(--k-text-input-motion-duration, 0s)
          var(--k-text-input-motion-easing, linear),
        background var(--k-text-input-motion-duration, 0s)
          var(--k-text-input-motion-easing, linear),
        color var(--k-text-input-motion-duration, 0s)
          var(--k-text-input-motion-easing, linear),
        opacity var(--k-text-input-motion-duration, 0s)
          var(--k-text-input-motion-easing, linear);
    }

    .shell:focus-within {
      outline: 2px solid var(--k-text-input-focus-outline-color, transparent);
      outline-offset: 2px;
      box-shadow:
        0 0 0 1px var(--k-text-input-focus-ring-color, transparent),
        var(--k-text-input-focus-shadow, none);
    }

    .control {
      min-inline-size: 0;
      inline-size: 100%;
      border: 0;
      outline: 0;
      background: transparent;
      color: var(--k-text-input-colors-text, currentColor);
      font-family: var(--k-text-input-typography-family, inherit);
      font-size: var(--k-text-input-typography-font-size, inherit);
      line-height: var(--k-text-input-typography-line-height, normal);
      font-weight: var(--k-text-input-typography-font-weight, 400);
    }

    .control::placeholder {
      color: var(--k-text-input-colors-placeholder, currentColor);
    }

    .affix {
      display: inline-flex;
      align-items: center;
      white-space: nowrap;
      font-family: var(--k-text-input-typography-family, inherit);
      font-size: var(--k-text-input-typography-font-size, inherit);
      line-height: var(--k-text-input-typography-line-height, normal);
      font-weight: var(--k-text-input-typography-font-weight, 400);
      color: var(--k-text-input-colors-prefix, var(--k-text-input-colors-suffix, currentColor));
    }

    :host(.k-text-input--variant-with-prefix) .affix-prefix {
      margin-right: var(--k-text-input-size-prefix-gap, var(--k-space-2));
      color: var(--k-text-input-colors-prefix, currentColor);
    }

    :host(.k-text-input--variant-with-suffix) .affix-suffix {
      margin-left: var(--k-text-input-size-suffix-gap, var(--k-space-2));
      color: var(--k-text-input-colors-suffix, currentColor);
    }

    :host(.is-disabled) .shell,
    :host([aria-disabled="true"]) .shell {
      cursor: not-allowed;
      opacity: var(--k-text-input-disabled-opacity, 1);
    }

    :host(.is-disabled) .control,
    :host(.is-readonly) .control {
      cursor: not-allowed;
    }

    @media (max-width: 64rem) {
      .shell {
        min-block-size: max(var(--k-text-input-size-min-height, var(--k-space-10)), var(--k-space-10));
      }
    }

    @media (max-width: 48rem) {
      .shell {
        min-block-size: max(var(--k-text-input-size-min-height, var(--k-space-10)), 2.75rem);
      }
    }
  `,
})
export class KentraTextInput
  extends KentraElementBase
  implements KentraTextInputContract, FormValueControl<string>
{
  readonly variant = input<TextInputVariant>("default");
  readonly value = model<string>("");
  readonly type = input<KentraTextInputType>("text");
  readonly placeholder = input<string | null>(null);
  readonly autocomplete = input<string | null>(null);
  readonly prefix = input<string | null>(null);
  readonly suffix = input<string | null>(null);
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly invalid = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly name = input<string>("");
  readonly min = input<number | undefined>(undefined);
  readonly max = input<number | undefined>(undefined);
  readonly minLength = input<number | undefined>(undefined);
  readonly maxLength = input<number | undefined>(undefined);
  readonly touched = model(false);
  readonly valueChanged = output<ValueChangeEvent>();
  readonly focused = output<FocusEvent>();
  readonly blurred = output<FocusEvent>();

  readonly prefixText = computed(() => this.normalizeText(this.prefix()));
  readonly suffixText = computed(() => this.normalizeText(this.suffix()));
  readonly showPrefix = computed(() => this.prefixText() !== null);
  readonly showSuffix = computed(() => this.suffixText() !== null);
  readonly normalizedName = computed(() => this.normalizeText(this.name()));
  readonly minAttr = computed(() => this.toOptionalAttr(this.min()));
  readonly maxAttr = computed(() => this.toOptionalAttr(this.max()));
  readonly minLengthAttr = computed(() => this.toOptionalAttr(this.minLength()));
  readonly maxLengthAttr = computed(() => this.toOptionalAttr(this.maxLength()));

  protected readonly baseClass = textInputStyleMap.baseClass;

  private readonly isFocusVisible = signal(false);
  private readonly controlElement =
    viewChild<ElementRef<HTMLInputElement>>("controlElement");
  private readonly effectiveState = computed<TextInputState>(() => {
    if (this.disabled()) {
      return "disabled";
    }

    if (this.readonly()) {
      return "readonly";
    }

    if (this.invalid()) {
      return "error";
    }

    if (this.isFocusVisible()) {
      return "focusVisible";
    }

    return "default";
  });

  protected override styleValues() {
    return {
      variant: this.variant(),
    };
  }

  protected override stateValues() {
    const state = this.effectiveState();

    return state === "default"
      ? {}
      : {
          [state]: true,
        };
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    if (target === null) {
      return;
    }

    const previousValue = this.value();
    const nextValue = target.value;

    if (nextValue === previousValue) {
      return;
    }

    this.value.set(nextValue);
    this.valueChanged.emit({
      value: nextValue,
      previousValue,
      userTriggered: true,
    });
  }

  onFocus(event: FocusEvent): void {
    this.isFocusVisible.set(true);
    this.focused.emit(event);
  }

  onBlur(event: FocusEvent): void {
    this.isFocusVisible.set(false);
    this.touched.set(true);
    this.blurred.emit(event);
  }

  focus(options?: FocusOptions): void {
    this.controlElement()?.nativeElement.focus(options);
  }

  private normalizeText(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }

  private toOptionalAttr(value: number | undefined): string | null {
    return typeof value === "number" ? String(value) : null;
  }
}
