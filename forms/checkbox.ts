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
import type { FormCheckboxControl } from "@angular/forms/signals";
import { KentraIcon } from "@kentra-saas/ui-kit/icons";
import {
  CheckboxState,
  CheckboxVariant,
  checkboxStyleMap,
  IconName,
  KentraCheckboxContract,
  KentraElementBase,
} from "@kentra-saas/ui-kit";

type ValueChangeEvent = {
  readonly value: boolean;
  readonly previousValue: boolean | null;
  readonly userTriggered: boolean;
};

@Component({
  selector: "k-checkbox",
  standalone: true,
  imports: [KentraIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-disabled]": "disabled() ? 'true' : null",
  },
  template: `
    <label class="root">
      <input
        #controlElement
        class="native"
        type="checkbox"
        [checked]="checked()"
        [indeterminate]="indeterminate()"
        [disabled]="disabled()"
        [required]="required()"
        [attr.name]="normalizedName()"
        [attr.aria-invalid]="invalid() ? 'true' : null"
        (change)="onChange($event)"
        (focus)="onFocus()"
        (blur)="onBlur()"
      />

      <span class="control" aria-hidden="true">
        <k-icon class="indicator" [name]="indicatorGlyph()" aria-hidden="true"></k-icon>
      </span>

      <span class="label"><ng-content></ng-content></span>
    </label>
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      max-inline-size: 100%;
    }

    .root {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: var(--k-checkbox-size-gap, var(--k-space-2));
      color: var(--k-checkbox-colors-label, currentColor);
      font-family: var(--k-checkbox-label-family, inherit);
      font-size: var(--k-checkbox-label-font-size, inherit);
      line-height: var(--k-checkbox-label-line-height, normal);
      font-weight: var(--k-checkbox-label-font-weight, 400);
      cursor: pointer;
      user-select: none;
    }

    .native {
      position: absolute;
      appearance: none;
      -webkit-appearance: none;
      inline-size: var(--k-checkbox-size-control, 1.25rem);
      block-size: var(--k-checkbox-size-control, 1.25rem);
      margin: 0;
      opacity: 0;
      inset: 0 auto auto 0;
    }

    .control {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: var(--k-checkbox-size-control, 1.25rem);
      block-size: var(--k-checkbox-size-control, 1.25rem);
      border: var(--k-checkbox-border-width, 1px) solid
        var(--k-checkbox-colors-border, transparent);
      border-radius: var(--k-checkbox-border-radius, var(--k-radius-sm));
      background: var(--k-checkbox-colors-bg, transparent);
      color: var(--k-checkbox-colors-indicator, currentColor);
      flex: none;
      transition:
        border-color var(--k-checkbox-motion-duration, 0s)
          var(--k-checkbox-motion-easing, linear),
        background var(--k-checkbox-motion-duration, 0s)
          var(--k-checkbox-motion-easing, linear),
        color var(--k-checkbox-motion-duration, 0s)
          var(--k-checkbox-motion-easing, linear),
        opacity var(--k-checkbox-motion-duration, 0s)
          var(--k-checkbox-motion-easing, linear);
    }

    .indicator {
      --k-icon-font-size: var(--k-checkbox-size-indicator, 0.875rem);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: var(--k-checkbox-size-indicator, 0.875rem);
      block-size: var(--k-checkbox-size-indicator, 0.875rem);
      line-height: 1;
      opacity: 0;
      transform: scale(0.9);
      transition:
        opacity var(--k-checkbox-motion-duration, 0s)
          var(--k-checkbox-motion-easing, linear),
        transform var(--k-checkbox-motion-duration, 0s)
          var(--k-checkbox-motion-easing, linear);
    }

    .label {
      min-inline-size: 0;
    }

    .native:checked + .control .indicator,
    .native:indeterminate + .control .indicator {
      opacity: 1;
      transform: scale(1);
    }

    .native:focus-visible + .control {
      outline: 2px solid var(--k-checkbox-focus-outline-color, transparent);
      outline-offset: 2px;
      box-shadow:
        0 0 0 1px var(--k-checkbox-focus-ring-color, transparent),
        var(--k-checkbox-focus-shadow, none);
    }

    :host(.is-disabled) .root,
    :host([aria-disabled="true"]) .root {
      cursor: not-allowed;
      opacity: var(--k-checkbox-disabled-opacity, 1);
    }

    @media (max-width: 64rem) {
      .control,
      .native {
        inline-size: max(var(--k-checkbox-size-control, 1.25rem), 1.25rem);
        block-size: max(var(--k-checkbox-size-control, 1.25rem), 1.25rem);
      }
    }

    @media (max-width: 48rem) {
      .control,
      .native {
        inline-size: max(var(--k-checkbox-size-control, 1.25rem), 2.75rem);
        block-size: max(var(--k-checkbox-size-control, 1.25rem), 2.75rem);
      }
    }
  `,
})
export class KentraCheckbox
  extends KentraElementBase
  implements KentraCheckboxContract, FormCheckboxControl
{
  readonly variant = input<CheckboxVariant>("default");
  readonly checked = model(false);
  readonly indeterminate = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly invalid = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly name = input<string>("");
  readonly touched = model(false);
  readonly valueChanged = output<ValueChangeEvent>();

  readonly normalizedName = computed(() => this.normalizeText(this.name()));
  readonly indicatorGlyph = computed<IconName>(() => {
    if (this.indeterminate()) {
      return "minus";
    }

    return this.checked() ? "check" : "";
  });

  protected readonly baseClass = checkboxStyleMap.baseClass;

  private readonly isFocusVisible = signal(false);
  private readonly controlElement =
    viewChild<ElementRef<HTMLInputElement>>("controlElement");
  private readonly effectiveState = computed<CheckboxState>(() => {
    if (this.disabled()) {
      return "disabled";
    }

    if (this.invalid()) {
      return "error";
    }

    if (this.indeterminate()) {
      return "indeterminate";
    }

    return this.checked() ? "checked" : "unchecked";
  });

  protected override styleValues() {
    return {
      variant: this.variant(),
    };
  }

  protected override stateValues() {
    const state = this.effectiveState();

    return {
      [state]: true,
      focusVisible: this.isFocusVisible() && state === "unchecked",
    };
  }

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    if (target === null) {
      return;
    }

    const previousValue = this.checked();
    const nextValue = target.checked;

    if (nextValue === previousValue) {
      return;
    }

    this.checked.set(nextValue);
    this.valueChanged.emit({
      value: nextValue,
      previousValue,
      userTriggered: true,
    });
  }

  onFocus(): void {
    this.isFocusVisible.set(true);
  }

  onBlur(): void {
    this.isFocusVisible.set(false);
    this.touched.set(true);
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
}
