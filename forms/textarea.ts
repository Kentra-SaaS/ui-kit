import {
  AfterViewInit,
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
  KentraTextareaContract,
  TextareaState,
  TextareaVariant,
  textareaStyleMap,
} from "@kentra-saas/ui-kit";

type ValueChangeEvent = {
  readonly value: string;
  readonly previousValue: string | null;
  readonly userTriggered: boolean;
};

@Component({
  selector: "k-textarea",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-disabled]": "disabled() ? 'true' : null",
  },
  template: `
    <textarea
      #controlElement
      class="control"
      [value]="value()"
      [rows]="normalizedRows()"
      [attr.maxlength]="maxLengthAttr()"
      [attr.placeholder]="placeholder()"
      [attr.name]="normalizedName()"
      [readOnly]="readonly()"
      [disabled]="disabled()"
      [required]="required()"
      [attr.aria-invalid]="invalid() ? 'true' : null"
      (input)="onInput($event)"
      (focus)="onFocus($event)"
      (blur)="onBlur($event)"
    ></textarea>
  `,
  styles: `
    :host {
      display: block;
      inline-size: 100%;
    }

    .control {
      box-sizing: border-box;
      display: block;
      inline-size: 100%;
      min-block-size: var(--k-textarea-size-min-height, var(--k-space-16));
      padding-inline: var(--k-textarea-size-padding-x, var(--k-space-3));
      padding-block: var(--k-textarea-size-padding-y, var(--k-space-3));
      border: var(--k-textarea-border-width, 1px) solid
        var(--k-textarea-colors-border, transparent);
      border-radius: var(--k-textarea-border-radius, var(--k-radius-md));
      background: var(--k-textarea-colors-bg, transparent);
      color: var(--k-textarea-colors-text, currentColor);
      font-family: var(--k-textarea-typography-family, inherit);
      font-size: var(--k-textarea-typography-font-size, inherit);
      line-height: var(--k-textarea-typography-line-height, normal);
      font-weight: var(--k-textarea-typography-font-weight, 400);
      resize: var(--k-textarea-resize, vertical);
      transition:
        border-color var(--k-textarea-motion-duration, 0s)
          var(--k-textarea-motion-easing, linear),
        background var(--k-textarea-motion-duration, 0s)
          var(--k-textarea-motion-easing, linear),
        color var(--k-textarea-motion-duration, 0s)
          var(--k-textarea-motion-easing, linear),
        opacity var(--k-textarea-motion-duration, 0s)
          var(--k-textarea-motion-easing, linear);
    }

    .control::placeholder {
      color: var(--k-textarea-colors-placeholder, currentColor);
    }

    .control:focus-visible {
      outline: 2px solid var(--k-textarea-focus-outline-color, transparent);
      outline-offset: 2px;
      box-shadow:
        0 0 0 1px var(--k-textarea-focus-ring-color, transparent),
        var(--k-textarea-focus-shadow, none);
    }

    :host(.is-disabled) .control,
    :host([aria-disabled="true"]) .control {
      cursor: not-allowed;
      opacity: var(--k-textarea-disabled-opacity, 1);
    }

    @media (max-width: 64rem) {
      .control {
        min-block-size: max(var(--k-textarea-size-min-height, var(--k-space-16)), var(--k-space-14));
      }
    }

    @media (max-width: 48rem) {
      .control {
        min-block-size: max(var(--k-textarea-size-min-height, var(--k-space-16)), 7rem);
      }
    }
  `,
})
export class KentraTextarea
  extends KentraElementBase
  implements KentraTextareaContract, FormValueControl<string>, AfterViewInit
{
  readonly variant = input<TextareaVariant>("default");
  readonly value = model<string>("");
  readonly rows = input<number>(4);
  readonly maxLength = input<number | undefined>(undefined);
  readonly placeholder = input<string | null>(null);
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly invalid = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly name = input<string>("");
  readonly touched = model(false);
  readonly valueChanged = output<ValueChangeEvent>();
  readonly focused = output<FocusEvent>();
  readonly blurred = output<FocusEvent>();

  readonly normalizedRows = computed(() => Math.max(1, Math.floor(this.rows())));
  readonly maxLengthAttr = computed(() => this.toOptionalAttr(this.maxLength()));
  readonly normalizedName = computed(() => this.normalizeText(this.name()));

  protected readonly baseClass = textareaStyleMap.baseClass;

  private readonly isFocusVisible = signal(false);
  private readonly controlElement =
    viewChild<ElementRef<HTMLTextAreaElement>>("controlElement");
  private readonly effectiveState = computed<TextareaState>(() => {
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

  ngAfterViewInit(): void {
    this.applyAutoResize();
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement | null;
    if (target === null) {
      return;
    }

    const previousValue = this.value();
    const nextValue = target.value;

    if (nextValue !== previousValue) {
      this.value.set(nextValue);
      this.valueChanged.emit({
        value: nextValue,
        previousValue,
        userTriggered: true,
      });
    }

    this.applyAutoResize();
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

  private applyAutoResize(): void {
    if (this.variant() !== "autoResize") {
      return;
    }

    const control = this.controlElement()?.nativeElement;
    if (control === undefined) {
      return;
    }

    control.style.blockSize = "auto";
    control.style.blockSize = `${control.scrollHeight}px`;
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
