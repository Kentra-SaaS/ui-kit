import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
} from "@angular/core";
import { KentraIcon } from "@kentra-saas/ui-kit/icons";
import {
  IconName,
  KentraElementBase,
  KentraToastContract,
  ToastState,
  ToastVariant,
  toastStyleMap,
} from "@kentra-saas/ui-kit";

@Component({
  selector: "k-toast",
  standalone: true,
  imports: [KentraIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.role]": "resolvedRole()",
    "[attr.aria-live]": "resolvedAriaLive()",
    "[attr.aria-atomic]": "'true'",
  },
  template: `
    <article class="item">
      @if (resolvedIcon(); as iconName) {
        <k-icon class="icon" [name]="iconName" aria-hidden="true"></k-icon>
      }

      <div class="content">
        @if (resolvedTitle(); as titleText) {
          <h4 class="title">{{ titleText }}</h4>
        }

        @if (resolvedMessage(); as messageText) {
          <p class="message">{{ messageText }}</p>
        }

        <div class="actions">
          <ng-content select="[kToastActions]"></ng-content>
        </div>
      </div>

      @if (showCloseAction()) {
        <button
          class="close-action"
          type="button"
          aria-label="Dismiss toast"
          (click)="onCloseClick($event)"
        >
          <k-icon name="x" aria-hidden="true"></k-icon>
        </button>
      }
    </article>
  `,
  styles: `
    :host {
      display: block;
      inline-size: min(100%, 32rem);
      max-inline-size: 100%;
      pointer-events: auto;
    }

    .item {
      box-sizing: border-box;
      display: flex;
      align-items: flex-start;
      gap: var(--k-toast-item-gap, var(--k-space-3));
      inline-size: 100%;
      max-inline-size: 100%;
      padding-inline: var(--k-toast-item-padding-x, var(--k-space-4));
      padding-block: var(--k-toast-item-padding-y, var(--k-space-3));
      border: var(--k-toast-item-border-width, 1px) solid
        var(--k-toast-colors-border, transparent);
      border-radius: var(--k-toast-item-border-radius, var(--k-radius-md));
      background: var(--k-toast-colors-bg, transparent);
      box-shadow: var(--k-toast-item-shadow, none);
      opacity: var(--k-toast-opacity, 1);
      transform: translateY(var(--k-toast-translate-y, 0));
      transition:
        opacity var(--k-toast-motion-enter-duration, 0s)
          var(--k-toast-motion-enter-easing, linear),
        transform var(--k-toast-motion-enter-duration, 0s)
          var(--k-toast-motion-enter-easing, linear),
        border-color var(--k-toast-motion-enter-duration, 0s)
          var(--k-toast-motion-enter-easing, linear),
        background var(--k-toast-motion-enter-duration, 0s)
          var(--k-toast-motion-enter-easing, linear),
        color var(--k-toast-motion-enter-duration, 0s)
          var(--k-toast-motion-enter-easing, linear);
    }

    .icon {
      --k-icon-font-size: var(--k-toast-icon-size, var(--k-icon-size-md));
      --k-icon-color: var(--k-toast-colors-icon, currentColor);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: var(--k-toast-icon-size, var(--k-icon-size-md));
      block-size: var(--k-toast-icon-size, var(--k-icon-size-md));
      line-height: 1;
      flex: none;
      margin-block-start: 0.125rem;
    }

    .content {
      display: grid;
      gap: var(--k-space-1);
      min-inline-size: 0;
      flex: 1;
    }

    .title {
      margin: 0;
      color: var(--k-toast-colors-title, currentColor);
      font-family: var(--k-toast-title-family, inherit);
      font-size: var(--k-toast-title-font-size, inherit);
      line-height: var(--k-toast-title-line-height, 1.4);
      font-weight: var(--k-toast-title-font-weight, 600);
    }

    .message {
      margin: 0;
      color: var(--k-toast-colors-message, currentColor);
      font-family: var(--k-toast-message-family, inherit);
      font-size: var(--k-toast-message-font-size, inherit);
      line-height: var(--k-toast-message-line-height, 1.5);
      font-weight: var(--k-toast-message-font-weight, 400);
      text-wrap: pretty;
    }

    .actions {
      display: inline-flex;
      flex-wrap: wrap;
      gap: var(--k-space-2);
    }

    .close-action {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: var(--k-space-8);
      block-size: var(--k-space-8);
      border: 0;
      border-radius: var(--k-radius-sm);
      background: transparent;
      color: var(--k-toast-colors-icon, currentColor);
      cursor: pointer;
      flex: none;
      transition: background var(--k-motion-duration-fast, 0s)
        var(--k-motion-ease-standard, linear);
    }

    .close-action:hover {
      background: var(--k-color-state-hover-overlay);
    }

    .close-action:focus-visible {
      outline: 2px solid var(--k-color-state-focus-outline);
      outline-offset: 2px;
      box-shadow: 0 0 0 1px var(--k-color-state-focus-ring);
    }

    @media (max-width: 64rem) {
      :host {
        inline-size: min(100%, 28rem);
      }
    }

    @media (max-width: 48rem) {
      :host {
        inline-size: 100%;
      }

      .item {
        padding-inline: max(var(--k-toast-item-padding-x, var(--k-space-4)), var(--k-space-3));
      }

      .close-action {
        inline-size: max(var(--k-space-8), 2.75rem);
        block-size: max(var(--k-space-8), 2.75rem);
      }
    }
  `,
})
export class KentraToast extends KentraElementBase implements KentraToastContract {
  readonly variant = input<ToastVariant>("info");
  readonly state = input<ToastState>("visible");
  readonly icon = input<IconName | null>(null);
  readonly title = input<string | null>(null);
  readonly message = input<string | null>(null);
  readonly dismissible = input<boolean>(false);
  readonly duration = input<number | null>(null);
  readonly ariaLive = input<"polite" | "assertive" | null>(null);
  readonly closed = output<void>();

  readonly resolvedIcon = computed<IconName | null>(() => {
    const iconName = this.icon();
    return iconName === "" ? null : iconName;
  });
  readonly resolvedTitle = computed(() => this.normalizeText(this.title()));
  readonly resolvedMessage = computed(() => this.normalizeText(this.message()));
  readonly showCloseAction = computed(() => this.dismissible());
  readonly resolvedRole = computed(() =>
    this.variant() === "danger" ? "alert" : "status",
  );
  readonly resolvedAriaLive = computed(() => {
    const explicit = this.ariaLive();
    if (explicit !== null) {
      return explicit;
    }

    return this.variant() === "danger" ? "assertive" : "polite";
  });

  protected readonly baseClass = toastStyleMap.baseClass;

  constructor() {
    super();

    effect((onCleanup) => {
      const duration = this.duration();
      if (duration === null || duration <= 0 || this.state() !== "visible") {
        return;
      }

      const timeoutId = globalThis.setTimeout(() => {
        this.closed.emit();
      }, duration);

      onCleanup(() => {
        globalThis.clearTimeout(timeoutId);
      });
    });
  }

  protected override styleValues() {
    return {
      variant: this.variant(),
    };
  }

  protected override stateValues() {
    return {
      [this.state()]: true,
    };
  }

  onCloseClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.closed.emit();
  }

  private normalizeText(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }
}
