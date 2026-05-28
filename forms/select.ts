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
import { KentraIcon } from "@kentra-saas/ui-kit/icons";
import {
  coerceBooleanInput,
  coerceStringInput,
} from "./form-control-input-transforms";
import {
  KentraElementBase,
  KentraSelectContract,
  KentraSelectOption,
  KentraSelectOptionGroup,
  SelectState,
  SelectVariant,
  selectStyleMap,
} from "@kentra-saas/ui-kit";

type SelectionChangeEvent = {
  readonly value: string | null;
  readonly previousValue: string | null;
  readonly userTriggered: boolean;
};

@Component({
  selector: "k-select",
  standalone: true,
  imports: [KentraIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-disabled]": "isDisabled() ? 'true' : null",
  },
  template: `
    <div class="trigger">
      <select
        #controlElement
        class="control"
        [attr.id]="normalizedId()"
        [value]="resolvedValue()"
        [attr.name]="normalizedName()"
        [required]="isRequired()"
        [disabled]="isDisabled()"
        [attr.aria-invalid]="isInvalid() ? 'true' : null"
        [attr.aria-describedby]="normalizedAriaDescribedBy()"
        (change)="onSelectionChange($event)"
        (focus)="onFocus()"
        (blur)="onBlur()"
        (mousedown)="onOpenIntent()"
        (keydown)="onOpenKeydown($event)"
      >
        @if (showPlaceholder()) {
          <option value="">{{ placeholder() }}</option>
        }

        @for (group of optionGroups(); track group.label) {
          <optgroup [attr.label]="group.label">
            @for (option of group.options; track option.value) {
              <option [value]="option.value" [disabled]="option.disabled ?? false">
                {{ option.label }}
              </option>
            }
          </optgroup>
        }

        @for (option of options(); track option.value) {
          <option [value]="option.value" [disabled]="option.disabled ?? false">
            {{ option.label }}
          </option>
        }
      </select>

      <k-icon class="icon" name="caret-down" aria-hidden="true"></k-icon>
    </div>
  `,
  styles: `
    :host {
      display: block;
      inline-size: 100%;
    }

    .trigger {
      position: relative;
    }

    .control {
      box-sizing: border-box;
      inline-size: 100%;
      min-block-size: var(--k-select-trigger-min-height, var(--k-space-10));
      padding-inline: var(--k-select-trigger-padding-x, var(--k-space-3));
      padding-block: var(--k-select-trigger-padding-y, var(--k-space-2));
      padding-right: calc(var(--k-select-trigger-padding-x, var(--k-space-3)) * 2 + 1.5rem);
      border: var(--k-select-border-width, 1px) solid
        var(--k-select-colors-trigger-border, transparent);
      border-radius: var(--k-select-border-radius, var(--k-radius-md));
      background: var(--k-select-colors-trigger-bg, transparent);
      color: var(--k-select-colors-trigger-text, currentColor);
      font-family: var(--k-select-typography-family, inherit);
      font-size: var(--k-select-typography-font-size, inherit);
      line-height: var(--k-select-typography-line-height, normal);
      font-weight: var(--k-select-typography-font-weight, 400);
      appearance: none;
      transition:
        border-color var(--k-select-motion-duration, 0s)
          var(--k-select-motion-easing, linear),
        background var(--k-select-motion-duration, 0s)
          var(--k-select-motion-easing, linear),
        color var(--k-select-motion-duration, 0s)
          var(--k-select-motion-easing, linear),
        opacity var(--k-select-motion-duration, 0s)
          var(--k-select-motion-easing, linear);
    }

    .control:focus-visible {
      outline: 2px solid var(--k-select-focus-outline-color, transparent);
      outline-offset: 2px;
      box-shadow:
        0 0 0 1px var(--k-select-focus-ring-color, transparent),
        var(--k-select-focus-shadow, none);
    }

    .icon {
      --k-icon-font-size: var(--k-icon-size-sm);
      --k-icon-color: var(--k-select-colors-icon, currentColor);
      position: absolute;
      top: 50%;
      right: var(--k-select-trigger-padding-x, var(--k-space-3));
      transform: translateY(-50%);
      inline-size: var(--k-icon-size-sm);
      block-size: var(--k-icon-size-sm);
      pointer-events: none;
      line-height: 1;
    }

    :host(.is-disabled) .control,
    :host([aria-disabled="true"]) .control {
      cursor: not-allowed;
      opacity: var(--k-select-disabled-opacity, 1);
    }

    @media (max-width: 64rem) {
      .control {
        min-block-size: max(var(--k-select-trigger-min-height, var(--k-space-10)), var(--k-space-9));
      }
    }

    @media (max-width: 48rem) {
      .control {
        min-block-size: max(var(--k-select-trigger-min-height, var(--k-space-10)), 2.75rem);
      }
    }
  `,
})
export class KentraSelect
  extends KentraElementBase
  implements KentraSelectContract, FormValueControl<string | null>
{
  readonly variant = input<SelectVariant>("default");
  readonly value = model<string | null>(null);
  readonly options = input<readonly KentraSelectOption[]>([]);
  readonly optionGroups = input<readonly KentraSelectOptionGroup[]>([]);
  readonly placeholder = input<string | null>(null);
  readonly disabled = input(false, { transform: coerceBooleanInput });
  readonly invalid = input(false, { transform: coerceBooleanInput });
  readonly required = input(false, { transform: coerceBooleanInput });
  readonly id = input<string | null>(null);
  readonly name = input("", { transform: coerceStringInput });
  readonly ariaDescribedBy = input<string | null>(null);
  readonly touched = model(false);
  readonly selectionChanged = output<SelectionChangeEvent>();

  readonly normalizedName = computed(() => this.normalizeText(this.name()));
  readonly normalizedId = computed(() => this.normalizeText(this.id()));
  readonly normalizedAriaDescribedBy = computed(() =>
    this.normalizeText(this.ariaDescribedBy()),
  );
  readonly isDisabled = computed(() => this.disabled() === true);
  readonly isInvalid = computed(() => this.invalid() === true);
  readonly isRequired = computed(() => this.required() === true);
  readonly resolvedValue = computed(() => this.value() ?? "");
  readonly showPlaceholder = computed(
    () => this.normalizeText(this.placeholder()) !== null,
  );

  protected readonly baseClass = selectStyleMap.baseClass;

  private readonly isFocusVisible = signal(false);
  private readonly isOpen = signal(false);
  private readonly controlElement =
    viewChild<ElementRef<HTMLSelectElement>>("controlElement");
  private readonly effectiveState = computed<SelectState>(() => {
    if (this.isDisabled()) {
      return "disabled";
    }

    if (this.isInvalid()) {
      return "error";
    }

    if (this.isOpen()) {
      return "open";
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

  onSelectionChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    if (target === null) {
      return;
    }

    const previousValue = this.value();
    const nextValue = target.value.length > 0 ? target.value : null;

    this.value.set(nextValue);
    this.isOpen.set(false);
    this.selectionChanged.emit({
      value: nextValue,
      previousValue,
      userTriggered: true,
    });
  }

  onOpenIntent(): void {
    if (this.isDisabled()) {
      return;
    }

    this.isOpen.set(true);
  }

  onOpenKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowUp" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      this.isOpen.set(true);
    }
  }

  onFocus(): void {
    this.isFocusVisible.set(true);
  }

  onBlur(): void {
    this.isOpen.set(false);
    this.isFocusVisible.set(false);
    this.touched.set(true);
  }

  focus(options?: FocusOptions): void {
    this.controlElement()?.nativeElement.focus(options);
  }

  private normalizeText(value: string | null | undefined): string | null {
    if (value === null || value === undefined) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }
}
