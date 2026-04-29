import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from "@angular/core";
import { KentraIcon } from "@kentra-saas/ui-kit/icons";
import {
  AlertState,
  AlertVariant,
  alertStyleMap,
  IconName,
  KentraAlertContract,
  KentraElementBase,
} from "@kentra-saas/ui-kit";

@Component({
  selector: "k-alert",
  standalone: true,
  imports: [KentraIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.role]": "resolvedRole()",
    "[attr.aria-live]": "resolvedAriaLive()",
  },
  template: `
    <section class="container">
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
          <ng-content select="[kAlertActions]"></ng-content>
        </div>
      </div>

      @if (showCloseAction()) {
        <button
          class="close-action"
          type="button"
          aria-label="Dismiss alert"
          (click)="onCloseClick($event)"
        >
          <k-icon name="x" aria-hidden="true"></k-icon>
        </button>
      }
    </section>
  `,
  styles: `
    :host {
      display: block;
      inline-size: 100%;
      max-inline-size: 100%;
    }

    .container {
      box-sizing: border-box;
      display: flex;
      align-items: flex-start;
      gap: var(--k-alert-container-gap, var(--k-space-3));
      inline-size: 100%;
      max-inline-size: 100%;
      padding-inline: var(--k-alert-container-padding-x, var(--k-space-4));
      padding-block: var(--k-alert-container-padding-y, var(--k-space-3));
      border: var(--k-alert-container-border-width, 1px) solid
        var(--k-alert-colors-border, transparent);
      border-radius: var(--k-alert-container-border-radius, var(--k-radius-md));
      background: var(--k-alert-colors-bg, transparent);
      color: var(--k-alert-colors-message, currentColor);
    }

    .icon {
      --k-icon-font-size: var(--k-alert-icon-size, var(--k-icon-size-md));
      --k-icon-color: var(--k-alert-colors-icon, currentColor);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: var(--k-alert-icon-size, var(--k-icon-size-md));
      block-size: var(--k-alert-icon-size, var(--k-icon-size-md));
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
      color: var(--k-alert-colors-title, currentColor);
      font-family: var(--k-alert-title-family, inherit);
      font-size: var(--k-alert-title-font-size, inherit);
      line-height: var(--k-alert-title-line-height, 1.4);
      font-weight: var(--k-alert-title-font-weight, 600);
    }

    .message {
      margin: 0;
      color: var(--k-alert-colors-message, currentColor);
      font-family: var(--k-alert-message-family, inherit);
      font-size: var(--k-alert-message-font-size, inherit);
      line-height: var(--k-alert-message-line-height, 1.5);
      font-weight: var(--k-alert-message-font-weight, 400);
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
      inline-size: var(--k-alert-close-action-size, var(--k-space-8));
      block-size: var(--k-alert-close-action-size, var(--k-space-8));
      border: 0;
      border-radius: var(--k-alert-close-action-radius, var(--k-radius-sm));
      background: transparent;
      color: var(--k-alert-colors-close-icon, var(--k-alert-colors-icon, currentColor));
      cursor: pointer;
      flex: none;
      transition: background var(--k-motion-duration-fast, 0s)
        var(--k-motion-ease-standard, linear);
    }

    .close-action:hover {
      background: var(--k-alert-close-action-hover-overlay, transparent);
    }

    .close-action:focus-visible {
      outline: 2px solid var(--k-alert-focus-outline-color, transparent);
      outline-offset: 2px;
      box-shadow:
        0 0 0 1px var(--k-alert-focus-ring-color, transparent),
        var(--k-alert-focus-shadow, none);
    }

    @media (max-width: 64rem) {
      .container {
        padding-inline: max(var(--k-alert-container-padding-x, var(--k-space-4)), var(--k-space-3));
      }
    }

    @media (max-width: 48rem) {
      .container {
        padding-inline: max(var(--k-alert-container-padding-x, var(--k-space-4)), var(--k-space-3));
        padding-block: max(var(--k-alert-container-padding-y, var(--k-space-3)), var(--k-space-3));
      }

      .close-action {
        inline-size: max(var(--k-alert-close-action-size, var(--k-space-8)), 2.75rem);
        block-size: max(var(--k-alert-close-action-size, var(--k-space-8)), 2.75rem);
      }
    }
  `,
})
export class KentraAlert extends KentraElementBase implements KentraAlertContract {
  readonly variant = input<AlertVariant>("info");
  readonly state = input<AlertState>("default");
  readonly icon = input<IconName | null>(null);
  readonly title = input<string | null>(null);
  readonly message = input<string | null>(null);
  readonly dismissible = input<boolean>(false);
  readonly ariaLive = input<"polite" | "assertive" | null>(null);
  readonly closed = output<void>();

  readonly resolvedIcon = computed<IconName | null>(() => {
    const iconName = this.icon();
    return iconName === "" ? null : iconName;
  });
  readonly resolvedTitle = computed(() => this.normalizeText(this.title()));
  readonly resolvedMessage = computed(() => this.normalizeText(this.message()));
  readonly effectiveState = computed<AlertState>(() => {
    if (this.dismissible()) {
      return "dismissible";
    }

    return this.state();
  });
  readonly showCloseAction = computed(
    () => this.effectiveState() === "dismissible",
  );
  readonly resolvedRole = computed(() =>
    this.variant() === "danger" || this.variant() === "warning"
      ? "alert"
      : "status",
  );
  readonly resolvedAriaLive = computed(() => {
    const explicit = this.ariaLive();
    if (explicit !== null) {
      return explicit;
    }

    return this.variant() === "danger" ? "assertive" : "polite";
  });

  protected readonly baseClass = alertStyleMap.baseClass;

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
