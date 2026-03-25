import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from "@angular/core";
import {
  ButtonSize,
  ButtonState,
  ButtonVariant,
  buttonStyleMap,
  KentraButtonContract,
  KentraElementBase,
} from "../internal";

@Component({
  selector: buttonStyleMap.baseClass,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-disabled]": "isInteractionBlocked() ? 'true' : null",
    "[attr.aria-busy]": "effectiveState() === 'loading' ? 'true' : null",
  },
  template: `
    <button
      class="button"
      [attr.type]="type()"
      [disabled]="isInteractionBlocked()"
      [attr.aria-busy]="effectiveState() === 'loading' ? 'true' : null"
      (click)="onButtonClick($event)"
      (pointerdown)="onPointerDown()"
      (pointerup)="clearPressedState()"
      (pointerleave)="clearPressedState()"
      (pointercancel)="clearPressedState()"
      (keydown)="onKeyDown($event)"
      (keyup)="onKeyUp($event)"
      (blur)="clearPressedState()"
    >
      @if (effectiveState() === "loading") {
        <span class="spinner" aria-hidden="true"></span>
      }

      @if (startIconGlyph()) {
        <span class="k-icon icon icon-start" aria-hidden="true">
          {{ startIconGlyph() }}
        </span>
      }

      <span class="label"><ng-content></ng-content></span>

      @if (endIconGlyph()) {
        <span class="k-icon icon icon-end" aria-hidden="true">
          {{ endIconGlyph() }}
        </span>
      }
    </button>
  `,
  styles: `
    :host {
      display: inline-block;
      inline-size: var(--k-button-inline-size, auto);
      max-inline-size: 100%;
    }

    .button {
      box-sizing: border-box;
      position: relative;
      display: inline-flex;
      inline-size: 100%;
      align-items: center;
      justify-content: center;
      gap: var(--k-btn-gap, var(--k-space-2));
      min-block-size: var(--k-btn-min-height, 2.5rem);
      padding-inline: var(--k-btn-padding-x, var(--k-space-4));
      padding-block: var(--k-btn-padding-y, var(--k-space-2));
      border: var(--k-btn-border-width, 1px) solid
        var(--k-btn-colors-border, transparent);
      border-radius: var(--k-btn-border-radius, var(--k-radius-md));
      background: var(--k-btn-colors-bg, transparent);
      color: var(--k-btn-colors-text, currentColor);
      font-family: var(--k-btn-font-family, inherit);
      font-size: var(--k-btn-font-size, inherit);
      font-weight: var(--k-btn-font-weight, 600);
      line-height: var(--k-btn-font-line-height, 1.2);
      white-space: nowrap;
      user-select: none;
      cursor: pointer;
      transition:
        background var(--k-btn-motion-duration, 0s) var(--k-btn-motion-easing, linear),
        border-color var(--k-btn-motion-duration, 0s)
          var(--k-btn-motion-easing, linear),
        color var(--k-btn-motion-duration, 0s) var(--k-btn-motion-easing, linear),
        opacity var(--k-btn-motion-duration, 0s) var(--k-btn-motion-easing, linear);
    }

    .button:focus-visible {
      outline: 2px solid var(--k-btn-focus-outline-color, transparent);
      outline-offset: 2px;
      box-shadow:
        0 0 0 1px var(--k-btn-focus-ring-color, transparent),
        var(--k-btn-focus-shadow, none);
    }

    .label {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-inline-size: 0;
    }

    .icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: var(--k-btn-icon-size, 1rem);
      block-size: var(--k-btn-icon-size, 1rem);
      font-size: var(--k-btn-icon-size, 1rem);
      color: var(--k-btn-colors-icon, currentColor);
      flex: none;
    }

    .spinner {
      inline-size: var(--k-btn-loading-spinner-size, 1rem);
      block-size: var(--k-btn-loading-spinner-size, 1rem);
      border: max(var(--k-btn-border-width, 1px), 2px) solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: k-button-spinner 0.7s linear infinite;
      flex: none;
    }

    :host(.is-loading) .label,
    :host(.is-loading) .icon {
      opacity: var(--k-btn-loading-content-opacity, 0.56);
    }

    :host(.is-disabled) .button,
    :host(.is-loading) .button,
    :host([aria-disabled="true"]) .button {
      cursor: not-allowed;
    }

    :host(.is-disabled) .button {
      opacity: var(--k-btn-disabled-opacity, 0.56);
    }

    @keyframes k-button-spinner {
      to {
        transform: rotate(360deg);
      }
    }

    @media (max-width: 64rem) {
      :host(.k-button--size-lg) .button {
        min-block-size: var(--k-button-tablet-min-height, var(--k-space-10));
      }
    }

    @media (max-width: 48rem) {
      :host {
        inline-size: var(
          --k-button-inline-size-mobile,
          var(--k-button-inline-size, auto)
        );
      }

      .button {
        min-block-size: max(var(--k-btn-min-height, 2.5rem), 2.75rem);
      }
    }
  `,
})
export class KentraButton extends KentraElementBase implements KentraButtonContract {
  readonly variant = input<ButtonVariant>("primary");
  readonly size = input<ButtonSize>("md");
  readonly state = input<ButtonState>("default");
  readonly type = input<"button" | "submit" | "reset">("button");
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly startIcon = input<string | null>(null);
  readonly endIcon = input<string | null>(null);
  readonly click = output<MouseEvent>();

  readonly startIconGlyph = computed(() => this.normalizeText(this.startIcon()));
  readonly endIconGlyph = computed(() => this.normalizeText(this.endIcon()));
  readonly effectiveState = computed<ButtonState>(() => {
    if (this.disabled()) {
      return "disabled";
    }

    if (this.loading()) {
      return "loading";
    }

    const explicitState = this.state();
    if (explicitState === "disabled" || explicitState === "loading") {
      return explicitState;
    }

    if (explicitState !== "default") {
      return explicitState;
    }

    return this.isPressed() ? "active" : "default";
  });
  readonly isInteractionBlocked = computed(() => {
    const state = this.effectiveState();
    return state === "disabled" || state === "loading";
  });

  protected readonly baseClass = buttonStyleMap.baseClass;

  private readonly isPressed = signal(false);

  protected override styleValues() {
    return {
      variant: this.variant(),
      size: this.size(),
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

  onButtonClick(event: MouseEvent): void {
    if (this.isInteractionBlocked()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.click.emit(event);
  }

  onPointerDown(): void {
    if (!this.canDerivePressedState()) {
      return;
    }

    this.isPressed.set(true);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (!this.canDerivePressedState()) {
      return;
    }

    if (event.key === " " || event.key === "Enter") {
      this.isPressed.set(true);
    }
  }

  onKeyUp(event: KeyboardEvent): void {
    if (event.key === " " || event.key === "Enter") {
      this.clearPressedState();
    }
  }

  clearPressedState(): void {
    if (!this.isPressed()) {
      return;
    }

    this.isPressed.set(false);
  }

  private canDerivePressedState(): boolean {
    return this.state() === "default" && !this.disabled() && !this.loading();
  }

  private normalizeText(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }
}
