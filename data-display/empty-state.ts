import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from "@angular/core";
import { KentraIcon } from "@kentra-saas/ui-kit/icons";
import {
  EmptyStateState,
  EmptyStateVariant,
  IconName,
  KentraElementBase,
  KentraEmptyStateContract,
  emptyStateStyleMap,
} from "@kentra-saas/ui-kit";

@Component({
  selector: "k-empty-state",
  standalone: true,
  imports: [KentraIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-disabled]": "disabled() ? 'true' : null",
  },
  template: `
    <section class="container">
      @if (icon(); as iconName) {
        <k-icon class="icon" [name]="iconName" size="lg" aria-hidden="true"></k-icon>
      }

      @if (resolvedTitle(); as resolvedTitleText) {
        <h3 class="title">{{ resolvedTitleText }}</h3>
      }

      @if (resolvedDescription(); as resolvedDescriptionText) {
        <p class="description">{{ resolvedDescriptionText }}</p>
      }

      <div class="actions">
        <ng-content select="[kEmptyStateActions]"></ng-content>

        @if (resolvedActionLabel(); as resolvedActionText) {
          <button
            class="action"
            type="button"
            [disabled]="disabled()"
            (click)="onActionClick($event)"
          >
            {{ resolvedActionText }}
          </button>
        }
      </div>
    </section>
  `,
  styles: `
    :host {
      display: grid;
      justify-items: center;
      inline-size: 100%;
      max-inline-size: 100%;
    }

    .container {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--k-empty-state-container-gap, var(--k-space-4));
      inline-size: min(100%, var(--k-empty-state-container-max-width, 36rem));
      max-inline-size: 100%;
      padding-inline: var(--k-empty-state-container-padding-x, var(--k-space-6));
      padding-block: var(--k-empty-state-container-padding-y, var(--k-space-6));
      border: 1px solid var(--k-empty-state-colors-border, transparent);
      border-radius: var(--k-empty-state-container-border-radius, var(--k-radius-lg));
      background: var(--k-empty-state-colors-bg, transparent);
      text-align: center;
    }

    .icon {
      --k-icon-font-size: var(--k-empty-state-icon-size, var(--k-icon-size-lg));
      --k-icon-color: var(--k-empty-state-colors-icon, currentColor);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: var(--k-empty-state-icon-size, var(--k-icon-size-lg));
      block-size: var(--k-empty-state-icon-size, var(--k-icon-size-lg));
      line-height: 1;
      flex: none;
    }

    .title {
      margin: 0;
      color: var(--k-empty-state-colors-title, currentColor);
      font-family: var(--k-empty-state-title-family, inherit);
      font-size: var(--k-empty-state-title-font-size, 1.25rem);
      line-height: var(--k-empty-state-title-line-height, 1.3);
      font-weight: var(--k-empty-state-title-font-weight, 700);
      text-wrap: balance;
    }

    .description {
      margin: 0;
      color: var(--k-empty-state-colors-description, currentColor);
      font-family: var(--k-empty-state-description-family, inherit);
      font-size: var(--k-empty-state-description-font-size, 1rem);
      line-height: var(--k-empty-state-description-line-height, 1.5);
      font-weight: var(--k-empty-state-description-font-weight, 400);
      text-wrap: pretty;
    }

    .actions {
      display: inline-flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: var(--k-empty-state-action-gap, var(--k-space-3));
    }

    .action {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-block-size: 2.5rem;
      padding-inline: var(--k-space-4);
      padding-block: var(--k-space-2);
      border: 1px solid var(--k-color-action-secondary-border);
      border-radius: var(--k-radius-md);
      background: var(--k-color-action-secondary-bg);
      color: var(--k-color-action-secondary-text);
      font-family: var(--k-font-family-base);
      font-size: var(--k-typography-label-font-size);
      line-height: var(--k-typography-label-line-height);
      font-weight: var(--k-typography-label-font-weight);
      cursor: pointer;
      transition:
        background var(--k-motion-duration-fast) var(--k-motion-ease-standard),
        border-color var(--k-motion-duration-fast) var(--k-motion-ease-standard),
        color var(--k-motion-duration-fast) var(--k-motion-ease-standard),
        opacity var(--k-motion-duration-fast) var(--k-motion-ease-standard);
    }

    .action:hover:not(:disabled) {
      background: var(--k-color-action-secondary-hover-bg);
      border-color: var(--k-color-action-secondary-hover-border);
      color: var(--k-color-action-secondary-hover-text);
    }

    .action:focus-visible {
      outline: 2px solid var(--k-color-state-focus-outline);
      outline-offset: 2px;
      box-shadow: 0 0 0 1px var(--k-color-state-focus-ring);
    }

    .action:disabled,
    :host([aria-disabled="true"]) .action {
      cursor: not-allowed;
      opacity: var(--k-state-disabled-opacity, 0.56);
    }

    @media (max-width: 64rem) {
      .container {
        inline-size: min(100%, 32rem);
        padding-inline: max(var(--k-empty-state-container-padding-x, var(--k-space-6)), var(--k-space-5));
      }
    }

    @media (max-width: 48rem) {
      .container {
        inline-size: 100%;
        padding-inline: max(var(--k-empty-state-container-padding-x, var(--k-space-6)), var(--k-space-4));
        padding-block: max(var(--k-empty-state-container-padding-y, var(--k-space-6)), var(--k-space-5));
      }

      .action {
        min-block-size: max(2.5rem, 2.75rem);
      }
    }
  `,
})
export class KentraEmptyState
  extends KentraElementBase
  implements KentraEmptyStateContract
{
  readonly variant = input<EmptyStateVariant>("neutral");
  readonly state = input<EmptyStateState>("default");
  readonly icon = input<IconName | null>(null);
  readonly title = input<string | null>(null);
  readonly description = input<string | null>(null);
  readonly actionLabel = input<string | null>(null);
  readonly disabled = input<boolean>(false);
  readonly click = output<MouseEvent>();

  readonly resolvedTitle = computed(() => this.normalizeText(this.title()));
  readonly resolvedDescription = computed(() =>
    this.normalizeText(this.description()),
  );
  readonly resolvedActionLabel = computed(() =>
    this.normalizeText(this.actionLabel()),
  );

  protected readonly baseClass = emptyStateStyleMap.baseClass;

  protected override styleValues() {
    return {
      variant: this.variant(),
    };
  }

  protected override stateValues() {
    if (this.disabled()) {
      return { disabled: true };
    }

    return this.state() === "default"
      ? {}
      : {
          [this.state()]: true,
        };
  }

  onActionClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.click.emit(event);
  }

  private normalizeText(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }
}
