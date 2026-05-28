import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  model,
  output,
  signal,
  viewChildren,
} from "@angular/core";
import type { FormValueControl } from "@angular/forms/signals";
import {
  coerceBooleanInput,
  coerceStringInput,
} from "./form-control-input-transforms";
import {
  KentraElementBase,
  KentraRadioGroupContract,
  KentraRadioOption,
  RadioGroupState,
  RadioGroupVariant,
  radioGroupStyleMap,
} from "@kentra-saas/ui-kit";

type SelectionChangeEvent = {
  readonly value: string | null;
  readonly previousValue: string | null;
  readonly userTriggered: boolean;
};

let radioGroupId = 0;

@Component({
  selector: "k-radio-group",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-disabled]": "isDisabled() ? 'true' : null",
  },
  template: `
    <fieldset class="group" [disabled]="isDisabled()">
      @for (option of options(); track option.value) {
        <label class="item" [class.item-disabled]="isOptionDisabled(option)">
          <input
            #controlElement
            class="native"
            type="radio"
            [name]="resolvedName()"
            [value]="option.value"
            [checked]="value() === option.value"
            [disabled]="isOptionDisabled(option)"
            [required]="isRequired()"
            (change)="onSelectionChange($event)"
            (focus)="onFocus()"
            (blur)="onBlur()"
          />

          <span class="control" aria-hidden="true">
            <span class="indicator"></span>
          </span>

          <span class="label">{{ option.label }}</span>
        </label>
      }
    </fieldset>
  `,
  styles: `
    :host {
      display: block;
      inline-size: 100%;
    }

    .group {
      margin: 0;
      padding: 0;
      border: 0;
      display: flex;
      flex-direction: var(--k-radio-group-layout-direction, column);
      gap: var(--k-radio-group-layout-item-gap, var(--k-space-3));
      min-inline-size: 0;
    }

    .item {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: var(--k-radio-group-layout-control-label-gap, var(--k-space-2));
      color: var(--k-radio-group-colors-label, currentColor);
      font-family: var(--k-radio-group-label-family, inherit);
      font-size: var(--k-radio-group-label-font-size, inherit);
      line-height: var(--k-radio-group-label-line-height, normal);
      font-weight: var(--k-radio-group-label-font-weight, 400);
      cursor: pointer;
      user-select: none;
    }

    .native {
      position: absolute;
      inline-size: var(--k-radio-group-item-control-size, 1.25rem);
      block-size: var(--k-radio-group-item-control-size, 1.25rem);
      margin: 0;
      opacity: 0;
      inset: 0 auto auto 0;
    }

    .control {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: var(--k-radio-group-item-control-size, 1.25rem);
      block-size: var(--k-radio-group-item-control-size, 1.25rem);
      border: var(--k-radio-group-item-border-width, 1px) solid
        var(--k-radio-group-colors-control-border, transparent);
      border-radius: var(--k-radio-group-border-radius, 999px);
      background: var(--k-radio-group-colors-control-bg, transparent);
      flex: none;
      transition:
        border-color var(--k-radio-group-motion-duration, 0s)
          var(--k-radio-group-motion-easing, linear),
        background var(--k-radio-group-motion-duration, 0s)
          var(--k-radio-group-motion-easing, linear),
        opacity var(--k-radio-group-motion-duration, 0s)
          var(--k-radio-group-motion-easing, linear);
    }

    .indicator {
      inline-size: var(--k-radio-group-item-indicator-size, 0.5rem);
      block-size: var(--k-radio-group-item-indicator-size, 0.5rem);
      border-radius: 50%;
      background: var(--k-radio-group-colors-indicator, currentColor);
      transform: scale(0);
      transition: transform var(--k-radio-group-motion-duration, 0s)
        var(--k-radio-group-motion-easing, linear);
    }

    .native:checked + .control .indicator {
      transform: scale(1);
    }

    .native:focus-visible + .control {
      outline: 2px solid var(--k-radio-group-focus-outline-color, transparent);
      outline-offset: 2px;
      box-shadow:
        0 0 0 1px var(--k-radio-group-focus-ring-color, transparent),
        var(--k-radio-group-focus-shadow, none);
    }

    :host(.is-disabled) .item,
    :host([aria-disabled="true"]) .item,
    .item.item-disabled {
      cursor: not-allowed;
    }

    :host(.is-disabled) .group,
    :host([aria-disabled="true"]) .group {
      opacity: var(--k-radio-group-disabled-opacity, 1);
    }

    @media (max-width: 64rem) {
      .group {
        gap: max(var(--k-radio-group-layout-item-gap, var(--k-space-3)), var(--k-space-2));
      }
    }

    @media (max-width: 48rem) {
      :host(.k-radio-group--variant-horizontal) .group {
        flex-direction: column;
      }
    }
  `,
})
export class KentraRadioGroup
  extends KentraElementBase
  implements KentraRadioGroupContract, FormValueControl<string | null>
{
  readonly variant = input<RadioGroupVariant>("vertical");
  readonly value = model<string | null>(null);
  readonly options = input<readonly KentraRadioOption[]>([]);
  readonly name = input("", { transform: coerceStringInput });
  readonly disabled = input(false, { transform: coerceBooleanInput });
  readonly invalid = input(false, { transform: coerceBooleanInput });
  readonly required = input(false, { transform: coerceBooleanInput });
  readonly touched = model(false);
  readonly selectionChanged = output<SelectionChangeEvent>();

  readonly resolvedName = computed(
    () => this.normalizeText(this.name()) ?? `k-radio-group-${this.localId}`,
  );
  readonly isDisabled = computed(() => this.disabled() === true);
  readonly isInvalid = computed(() => this.invalid() === true);
  readonly isRequired = computed(() => this.required() === true);

  protected readonly baseClass = radioGroupStyleMap.baseClass;

  private readonly localId = ++radioGroupId;
  private readonly isFocusVisible = signal(false);
  private readonly controlElements =
    viewChildren<ElementRef<HTMLInputElement>>("controlElement");
  private readonly effectiveState = computed<RadioGroupState>(() => {
    if (this.isDisabled()) {
      return "disabled";
    }

    if (this.isInvalid()) {
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

  isOptionDisabled(option: KentraRadioOption): boolean {
    return this.isDisabled() || option.disabled === true;
  }

  onSelectionChange(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    if (target === null || !target.checked) {
      return;
    }

    const previousValue = this.value();
    const nextValue = target.value;

    this.value.set(nextValue);
    this.selectionChanged.emit({
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
    this.controlElements()[0]?.nativeElement.focus(options);
  }

  private normalizeText(value: string | null | undefined): string | null {
    if (value === null || value === undefined) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }
}
