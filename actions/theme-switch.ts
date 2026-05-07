import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
} from "@angular/core";
import { KentraIcon } from "@kentra-saas/ui-kit/icons";
import {
  KentraElementBase,
  KentraThemeSwitchContract,
  ThemeChangeEvent,
  ThemeSwitchSize,
  ThemeSwitchState,
  ThemeSwitchTheme,
  ThemeSwitchVariant,
  themeSwitchStyleMap,
} from "@kentra-saas/ui-kit";

@Component({
  selector: "k-theme-switch",
  standalone: true,
  imports: [KentraIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-disabled]": "isInteractionBlocked() ? 'true' : null",
  },
  template: `
    <button
      class="button"
      type="button"
      role="switch"
      [attr.aria-checked]="isDarkTheme()"
      [attr.aria-label]="resolvedAriaLabel()"
      [disabled]="isInteractionBlocked()"
      (click)="toggleTheme()"
      (pointerdown)="onPointerDown()"
      (pointerup)="clearPressedState()"
      (pointerleave)="clearPressedState()"
      (pointercancel)="clearPressedState()"
      (keydown)="onKeyDown($event)"
      (keyup)="onKeyUp($event)"
      (blur)="clearPressedState()"
    >
      <span class="icon icon-light" aria-hidden="true">
        <k-icon name="sun" aria-hidden="true"></k-icon>
      </span>
      <span class="icon icon-dark" aria-hidden="true">
        <k-icon name="moon" aria-hidden="true"></k-icon>
      </span>
      <span class="thumb" aria-hidden="true">
        <k-icon [name]="thumbIcon()" aria-hidden="true"></k-icon>
      </span>
    </button>
  `,
  styles: `
    :host {
      display: inline-block;
      inline-size: var(--k-theme-switch-track-width, auto);
      max-inline-size: 100%;
    }

    .button {
      box-sizing: border-box;
      position: relative;
      display: inline-grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      appearance: none;
      -webkit-appearance: none;
      inline-size: var(--k-theme-switch-track-width, 5rem);
      block-size: var(--k-theme-switch-track-height, 2.5rem);
      padding: var(--k-theme-switch-padding, 0.25rem);
      border: var(--k-theme-switch-border-width, 1px) solid
        var(--k-theme-switch-colors-border, transparent);
      border-radius: var(--k-theme-switch-border-radius, 999px);
      background: var(--k-theme-switch-colors-bg, transparent);
      color: var(--k-theme-switch-colors-icon-muted, currentColor);
      line-height: 1;
      cursor: pointer;
      user-select: none;
      transition:
        background var(--k-theme-switch-motion-duration, 0s)
          var(--k-theme-switch-motion-easing, linear),
        border-color var(--k-theme-switch-motion-duration, 0s)
          var(--k-theme-switch-motion-easing, linear),
        opacity var(--k-theme-switch-motion-duration, 0s)
          var(--k-theme-switch-motion-easing, linear);
    }

    .button:focus-visible,
    :host(.is-focus-visible) .button {
      outline: 2px solid var(--k-theme-switch-focus-outline-color, transparent);
      outline-offset: 2px;
      box-shadow:
        0 0 0 1px var(--k-theme-switch-focus-ring-color, transparent),
        var(--k-theme-switch-focus-shadow, none);
    }

    .icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: var(--k-theme-switch-thumb-size, 2rem);
      block-size: var(--k-theme-switch-thumb-size, 2rem);
      color: var(--k-theme-switch-colors-icon-muted, currentColor);
      pointer-events: none;
      z-index: 1;
    }

    .icon k-icon,
    .thumb k-icon {
      --k-icon-font-size: var(--k-theme-switch-icon-size, 1rem);
      --k-icon-color: currentColor;
    }

    .icon-light {
      color: var(--k-theme-switch-colors-icon-active, currentColor);
    }

    :host(.is-on) .icon-light {
      color: var(--k-theme-switch-colors-icon-muted, currentColor);
    }

    :host(.is-on) .icon-dark {
      color: var(--k-theme-switch-colors-icon-active, currentColor);
    }

    .thumb {
      box-sizing: border-box;
      position: absolute;
      inset-inline-start: var(--k-theme-switch-padding, 0.25rem);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: var(--k-theme-switch-thumb-size, 2rem);
      block-size: var(--k-theme-switch-thumb-size, 2rem);
      border: var(--k-theme-switch-border-width, 1px) solid
        var(--k-theme-switch-colors-thumb-border, transparent);
      border-radius: var(--k-theme-switch-border-radius, 999px);
      background: var(--k-theme-switch-colors-thumb-bg, currentColor);
      color: var(--k-theme-switch-colors-thumb-icon, currentColor);
      transition: transform var(--k-theme-switch-motion-duration, 0s)
        var(--k-theme-switch-motion-easing, linear);
      z-index: 2;
      pointer-events: none;
    }

    :host(.is-on) .thumb {
      transform: translateX(
        calc(
          var(--k-theme-switch-track-width, 5rem) -
            var(--k-theme-switch-thumb-size, 2rem) -
            (var(--k-theme-switch-padding, 0.25rem) * 2) -
            (var(--k-theme-switch-border-width, 1px) * 2)
        )
      );
    }

    :host(.is-disabled) .button,
    :host([aria-disabled="true"]) .button {
      cursor: not-allowed;
      opacity: var(--k-theme-switch-disabled-opacity, 0.56);
    }

    @media (max-width: 64rem) {
      :host(.k-theme-switch--size-lg) .button {
        min-inline-size: var(
          --k-theme-switch-tablet-track-width,
          var(--k-theme-switch-track-width, 6rem)
        );
        min-block-size: var(
          --k-theme-switch-tablet-track-height,
          var(--k-theme-switch-track-height, 3rem)
        );
      }
    }

    @media (max-width: 48rem) {
      .button {
        min-inline-size: max(var(--k-theme-switch-track-width, 5rem), 4.75rem);
        min-block-size: max(var(--k-theme-switch-track-height, 2.5rem), 2.75rem);
      }
    }
  `,
})
export class KentraThemeSwitch
  extends KentraElementBase
  implements KentraThemeSwitchContract
{
  readonly variant = input<ThemeSwitchVariant>("default");
  readonly size = input<ThemeSwitchSize>("md");
  readonly theme = model<ThemeSwitchTheme>("light");
  readonly disabled = input<boolean>(false);
  readonly ariaLabel = input<string | null>(null);
  readonly themeChanged = output<ThemeChangeEvent>();

  protected readonly baseClass = themeSwitchStyleMap.baseClass;

  private readonly isPressed = signal(false);

  readonly isDarkTheme = computed(() => this.theme() === "dark");
  readonly thumbIcon = computed(() => (this.isDarkTheme() ? "moon" : "sun"));
  readonly resolvedAriaLabel = computed(
    () => this.normalizeText(this.ariaLabel()) ?? "Dark theme",
  );
  readonly effectiveState = computed<ThemeSwitchState>(() => {
    if (this.disabled()) {
      return "disabled";
    }

    if (this.isPressed()) {
      return "active";
    }

    return this.isDarkTheme() ? "on" : "default";
  });
  readonly isInteractionBlocked = computed(
    () => this.effectiveState() === "disabled",
  );

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

  toggleTheme(): void {
    if (this.isInteractionBlocked()) {
      return;
    }

    const previousTheme = this.theme();
    const nextTheme = previousTheme === "dark" ? "light" : "dark";

    this.theme.set(nextTheme);
    this.themeChanged.emit({
      theme: nextTheme,
      previousTheme,
      userTriggered: true,
    });
  }

  onPointerDown(): void {
    if (this.isInteractionBlocked()) {
      return;
    }

    this.isPressed.set(true);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.isInteractionBlocked()) {
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

  private normalizeText(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }
}
