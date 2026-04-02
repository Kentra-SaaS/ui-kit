import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from "@angular/core";
import {
  IconButtonSize,
  IconButtonState,
  IconButtonVariant,
  iconButtonStyleMap,
  KentraElementBase,
  KentraIconButtonContract,
} from "../internal";

@Component({
  selector: "k-icon-button",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-disabled]": "isInteractionBlocked() ? 'true' : null",
  },
  template: `
    <button
      class="button"
      [attr.type]="type()"
      [attr.aria-label]="resolvedAriaLabel()"
      [disabled]="isInteractionBlocked()"
      (click)="onButtonClick($event)"
      (pointerdown)="onPointerDown()"
      (pointerup)="clearPressedState()"
      (pointerleave)="clearPressedState()"
      (pointercancel)="clearPressedState()"
      (keydown)="onKeyDown($event)"
      (keyup)="onKeyUp($event)"
      (blur)="clearPressedState()"
    >
      @if (iconGlyph()) {
        <span class="k-icon icon" aria-hidden="true">{{ iconGlyph() }}</span>
      } @else {
        <span class="icon-slot" aria-hidden="true">
          <ng-content></ng-content>
        </span>
      }
    </button>
  `,
  styles: `
    :host {
      display: inline-block;
      inline-size: var(--k-icon-button-inline-size, auto);
      max-inline-size: 100%;
    }

    .button {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-inline-size: var(--k-icon-button-min-width, 2.5rem);
      min-block-size: var(--k-icon-button-min-height, 2.5rem);
      padding: var(--k-icon-button-padding, var(--k-space-2));
      border: var(--k-icon-button-border-width, 1px) solid
        var(--k-icon-button-colors-border, transparent);
      border-radius: var(--k-icon-button-border-radius, var(--k-radius-md));
      background: var(--k-icon-button-colors-bg, transparent);
      color: var(--k-icon-button-colors-icon, currentColor);
      user-select: none;
      cursor: pointer;
      transition:
        background var(--k-icon-button-motion-duration, 0s)
          var(--k-icon-button-motion-easing, linear),
        border-color var(--k-icon-button-motion-duration, 0s)
          var(--k-icon-button-motion-easing, linear),
        color var(--k-icon-button-motion-duration, 0s)
          var(--k-icon-button-motion-easing, linear),
        opacity var(--k-icon-button-motion-duration, 0s)
          var(--k-icon-button-motion-easing, linear);
    }

    .button:focus-visible {
      outline: 2px solid var(--k-icon-button-focus-outline-color, transparent);
      outline-offset: 2px;
      box-shadow:
        0 0 0 1px var(--k-icon-button-focus-ring-color, transparent),
        var(--k-icon-button-focus-shadow, none);
    }

    .icon,
    .icon-slot {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: var(--k-icon-button-icon-size, 1rem);
      block-size: var(--k-icon-button-icon-size, 1rem);
      font-size: var(--k-icon-button-icon-size, 1rem);
      line-height: 1;
      color: inherit;
      flex: none;
    }

    :host(.is-disabled) .button,
    :host([aria-disabled="true"]) .button {
      cursor: not-allowed;
      opacity: var(--k-icon-button-disabled-opacity, 0.56);
    }

    @media (max-width: 64rem) {
      :host(.k-icon-button--size-lg) .button {
        min-inline-size: var(--k-icon-button-tablet-min-width, var(--k-space-12));
        min-block-size: var(--k-icon-button-tablet-min-height, var(--k-space-12));
      }
    }

    @media (max-width: 48rem) {
      :host {
        inline-size: var(
          --k-icon-button-inline-size-mobile,
          var(--k-icon-button-inline-size, auto)
        );
      }

      .button {
        min-inline-size: max(var(--k-icon-button-min-width, 2.5rem), 2.75rem);
        min-block-size: max(var(--k-icon-button-min-height, 2.5rem), 2.75rem);
      }
    }
  `,
})
export class KentraIconButton
  extends KentraElementBase
  implements KentraIconButtonContract
{
  readonly variant = input<IconButtonVariant>("primary");
  readonly size = input<IconButtonSize>("md");
  readonly state = input<IconButtonState>("default");
  readonly type = input<"button" | "submit" | "reset">("button");
  readonly disabled = input<boolean>(false);
  readonly icon = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);
  readonly click = output<MouseEvent>();

  readonly iconGlyph = computed(() => this.normalizeText(this.icon()));
  readonly resolvedAriaLabel = computed(
    () => this.normalizeText(this.ariaLabel()) ?? this.iconGlyph(),
  );
  readonly effectiveState = computed<IconButtonState>(() => {
    if (this.disabled()) {
      return "disabled";
    }

    const explicitState = this.state();
    if (explicitState === "disabled") {
      return explicitState;
    }

    if (explicitState !== "default") {
      return explicitState;
    }

    return this.isPressed() ? "active" : "default";
  });
  readonly isInteractionBlocked = computed(
    () => this.effectiveState() === "disabled",
  );

  protected readonly baseClass = iconButtonStyleMap.baseClass;

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
    return this.state() === "default" && !this.disabled();
  }

  private normalizeText(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }
}
