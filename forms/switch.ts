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
import { coerceBooleanInput } from "./form-control-input-transforms";
import {
  KentraElementBase,
  KentraSwitchContract,
  KentraSwitchLabelPosition,
  SwitchState,
  SwitchVariant,
  switchStyleMap,
} from "@kentra-saas/ui-kit";

type ValueChangeEvent = {
  readonly value: boolean;
  readonly previousValue: boolean | null;
  readonly userTriggered: boolean;
};

@Component({
  selector: "k-switch",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-disabled]": "isDisabled() ? 'true' : null",
  },
  template: `
    <label class="root" [class.label-start]="labelPosition() === 'start'">
      <input
        #controlElement
        class="native"
        type="checkbox"
        role="switch"
        [checked]="checked()"
        [disabled]="isDisabled()"
        (change)="onChange($event)"
        (focus)="onFocus()"
        (blur)="onBlur()"
      />

      <span class="track" aria-hidden="true">
        <span class="thumb"></span>
      </span>

      <span class="label"><ng-content></ng-content></span>
    </label>
  `,
  styles: `
    :host {
      display: inline-block;
      max-inline-size: 100%;
    }

    .root {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: var(--k-space-2);
      cursor: pointer;
      user-select: none;
    }

    .root.label-start {
      flex-direction: row-reverse;
    }

    .native {
      position: absolute;
      appearance: none;
      -webkit-appearance: none;
      inline-size: var(--k-switch-size-track-width, 2.75rem);
      block-size: var(--k-switch-size-track-height, 1.5rem);
      margin: 0;
      opacity: 0;
      inset: 50% auto auto 0;
      transform: translateY(-50%);
    }

    .track {
      box-sizing: border-box;
      position: relative;
      display: inline-flex;
      align-items: center;
      inline-size: var(--k-switch-size-track-width, 2.75rem);
      block-size: var(--k-switch-size-track-height, 1.5rem);
      padding: var(--k-switch-size-padding, 1px);
      border: var(--k-switch-border-width, 1px) solid
        var(--k-switch-colors-track-border, transparent);
      border-radius: var(--k-switch-border-radius, 999px);
      background: var(--k-switch-colors-track-bg, transparent);
      transition:
        border-color var(--k-switch-motion-duration, 0s)
          var(--k-switch-motion-easing, linear),
        background var(--k-switch-motion-duration, 0s)
          var(--k-switch-motion-easing, linear),
        opacity var(--k-switch-motion-duration, 0s)
          var(--k-switch-motion-easing, linear);
    }

    .thumb {
      inline-size: var(--k-switch-size-thumb-size, 1.125rem);
      block-size: var(--k-switch-size-thumb-size, 1.125rem);
      border-radius: 50%;
      background: var(--k-switch-colors-thumb, currentColor);
      transform: translateX(0);
      transition: transform var(--k-switch-motion-duration, 0s)
        var(--k-switch-motion-easing, linear);
    }

    .native:checked + .track .thumb {
      transform: translateX(
        calc(
          var(--k-switch-size-track-width, 2.75rem) -
            var(--k-switch-size-thumb-size, 1.125rem) -
            (var(--k-switch-size-padding, 1px) * 2) -
            (var(--k-switch-border-width, 1px) * 2)
        )
      );
    }

    .native:focus-visible + .track {
      outline: 2px solid var(--k-switch-focus-outline-color, transparent);
      outline-offset: 2px;
      box-shadow:
        0 0 0 1px var(--k-switch-focus-ring-color, transparent),
        var(--k-switch-focus-shadow, none);
    }

    :host(.is-disabled) .root,
    :host([aria-disabled="true"]) .root {
      cursor: not-allowed;
    }

    :host(.is-disabled) .track,
    :host([aria-disabled="true"]) .track {
      opacity: var(--k-switch-disabled-opacity, 1);
    }

    @media (max-width: 64rem) {
      .track,
      .native {
        inline-size: max(var(--k-switch-size-track-width, 2.75rem), 2.5rem);
        block-size: max(var(--k-switch-size-track-height, 1.5rem), 1.375rem);
      }
    }

    @media (max-width: 48rem) {
      .track,
      .native {
        min-inline-size: max(var(--k-switch-size-track-width, 2.75rem), 2.75rem);
        min-block-size: max(var(--k-switch-size-track-height, 1.5rem), 2.75rem);
      }
    }
  `,
})
export class KentraSwitch
  extends KentraElementBase
  implements KentraSwitchContract, FormCheckboxControl
{
  readonly variant = input<SwitchVariant>("default");
  readonly checked = model(false);
  readonly disabled = input(false, { transform: coerceBooleanInput });
  readonly labelPosition = input<KentraSwitchLabelPosition>("end");
  readonly touched = model(false);
  readonly valueChanged = output<ValueChangeEvent>();

  protected readonly baseClass = switchStyleMap.baseClass;
  readonly isDisabled = computed(() => this.disabled() === true);

  private readonly isFocusVisible = signal(false);
  private readonly controlElement =
    viewChild<ElementRef<HTMLInputElement>>("controlElement");
  private readonly effectiveState = computed<SwitchState>(() => {
    if (this.isDisabled()) {
      return "disabled";
    }

    return this.checked() ? "on" : "off";
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
      focusVisible: this.isFocusVisible() && state === "off",
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
}
