import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from "@angular/core";
import { KentraIcon } from "@kentra-saas/ui-kit/icons";
import {
  DrawerState,
  DrawerVariant,
  drawerStyleMap,
  KentraDrawerContract,
  KentraElementBase,
} from "@kentra-saas/ui-kit";

let drawerInstanceCounter = 0;

@Component({
  selector: "k-drawer",
  standalone: true,
  imports: [KentraIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-hidden]": "currentState() === 'closed' ? 'true' : 'false'",
  },
  template: `
    <div
      class="backdrop"
      tabindex="-1"
      (click)="onBackdropClick($event)"
      (keydown)="onBackdropKeydown($event)"
    >
      <aside
        class="panel"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="resolvedAriaLabel()"
        [attr.aria-labelledby]="resolvedAriaLabelledBy()"
        [attr.aria-describedby]="resolvedAriaDescribedBy()"
        (click)="$event.stopPropagation()"
      >
        <header class="header" [attr.hidden]="hasHeaderContent() ? null : ''">
          <div class="headings">
            @if (resolvedTitle(); as titleText) {
              <h2 class="title" [id]="titleId">{{ titleText }}</h2>
            }

            @if (resolvedDescription(); as descriptionText) {
              <p class="description" [id]="descriptionId">{{ descriptionText }}</p>
            }
          </div>

          <div class="header-actions">
            <ng-content select="[kDrawerHeader]"></ng-content>

            @if (dismissible()) {
              <button
                class="close-action"
                type="button"
                aria-label="Close drawer"
                (click)="requestClose($event)"
              >
                <k-icon name="x" aria-hidden="true"></k-icon>
              </button>
            }
          </div>
        </header>

        <div class="body">
          <ng-content></ng-content>
          <ng-content select="[kDrawerBody]"></ng-content>
        </div>

        <footer class="footer">
          <ng-content select="[kDrawerFooter]"></ng-content>
        </footer>
      </aside>
    </div>
  `,
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: var(--k-drawer-backdrop-z-index, var(--k-z-index-overlay));
      pointer-events: none;
    }

    :host(.is-open),
    :host(.is-closing) {
      pointer-events: auto;
    }

    .backdrop {
      box-sizing: border-box;
      position: fixed;
      inset: 0;
      background: var(--k-drawer-backdrop-color, transparent);
      opacity: 1;
      transition: opacity var(--k-drawer-motion-enter-duration, 0s)
        var(--k-drawer-motion-enter-easing, linear);
    }

    :host(.is-closed) .backdrop {
      opacity: 0;
    }

    .panel {
      box-sizing: border-box;
      position: fixed;
      display: flex;
      flex-direction: column;
      inline-size: min(100%, var(--k-drawer-panel-width, 24rem));
      block-size: var(--k-drawer-panel-height, 100dvh);
      border: var(--k-drawer-panel-border-width, 1px) solid
        var(--k-drawer-colors-panel-border, transparent);
      border-radius: var(--k-drawer-panel-radius, var(--k-radius-none));
      background: var(--k-drawer-colors-panel-bg, transparent);
      box-shadow: var(--k-drawer-panel-shadow, none);
      color: var(--k-drawer-colors-body, currentColor);
      transform: var(--k-drawer-transform, translateX(0));
      transition:
        transform var(--k-drawer-motion-enter-duration, 0s)
          var(--k-drawer-motion-enter-easing, linear),
        border-color var(--k-drawer-motion-enter-duration, 0s)
          var(--k-drawer-motion-enter-easing, linear),
        background var(--k-drawer-motion-enter-duration, 0s)
          var(--k-drawer-motion-enter-easing, linear);
      overflow: hidden;
      pointer-events: auto;
    }

    :host(.k-drawer--variant-left) .panel {
      inset-block: 0;
      inset-inline-start: 0;
    }

    :host(.k-drawer--variant-right) .panel {
      inset-block: 0;
      inset-inline-end: 0;
    }

    :host(.k-drawer--variant-bottom) .panel {
      inset-inline: 0;
      inset-block-end: 0;
      inline-size: var(--k-drawer-panel-width, 100dvw);
    }

    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--k-drawer-spacing-content-gap, var(--k-space-4));
      padding-inline: var(--k-drawer-spacing-padding-x, var(--k-space-4));
      padding-block: var(--k-drawer-spacing-padding-y, var(--k-space-4));
      border-bottom: 1px solid var(--k-drawer-colors-panel-border, transparent);
    }

    .headings {
      display: grid;
      gap: var(--k-space-1);
      min-inline-size: 0;
    }

    .title {
      margin: 0;
      color: var(--k-drawer-colors-title, currentColor);
      font-family: var(--k-drawer-typography-title-family, inherit);
      font-size: var(--k-drawer-typography-title-font-size, inherit);
      line-height: var(--k-drawer-typography-title-line-height, 1.3);
      font-weight: var(--k-drawer-typography-title-font-weight, 700);
    }

    .description {
      margin: 0;
      color: var(--k-drawer-colors-body, currentColor);
      font-family: var(--k-drawer-typography-body-family, inherit);
      font-size: var(--k-drawer-typography-body-font-size, inherit);
      line-height: var(--k-drawer-typography-body-line-height, 1.5);
      font-weight: var(--k-drawer-typography-body-font-weight, 400);
    }

    .header-actions {
      display: inline-flex;
      align-items: center;
      gap: var(--k-space-2);
      flex: none;
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
      color: var(--k-drawer-colors-title, currentColor);
      cursor: pointer;
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

    .body {
      min-block-size: 0;
      overflow: auto;
      padding-inline: var(--k-drawer-spacing-padding-x, var(--k-space-4));
      padding-block: var(--k-drawer-spacing-padding-y, var(--k-space-4));
      color: var(--k-drawer-colors-body, currentColor);
      font-family: var(--k-drawer-typography-body-family, inherit);
      font-size: var(--k-drawer-typography-body-font-size, inherit);
      line-height: var(--k-drawer-typography-body-line-height, 1.5);
      font-weight: var(--k-drawer-typography-body-font-weight, 400);
      flex: 1;
    }

    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: var(--k-space-2);
      padding-inline: var(--k-drawer-spacing-padding-x, var(--k-space-4));
      padding-block: var(--k-drawer-spacing-padding-y, var(--k-space-4));
      border-top: 1px solid var(--k-drawer-colors-panel-border, transparent);
    }

    @media (max-width: 64rem) {
      .panel {
        inline-size: min(100%, max(var(--k-drawer-panel-width, 24rem), 20rem));
      }
    }

    @media (max-width: 48rem) {
      .panel {
        inline-size: min(100%, 100dvw);
      }

      .header,
      .body,
      .footer {
        padding-inline: max(var(--k-drawer-spacing-padding-x, var(--k-space-4)), var(--k-space-3));
      }

      .close-action {
        inline-size: max(var(--k-space-8), 2.75rem);
        block-size: max(var(--k-space-8), 2.75rem);
      }
    }
  `,
})
export class KentraDrawer extends KentraElementBase implements KentraDrawerContract {
  readonly variant = input<DrawerVariant>("right");
  readonly state = input<DrawerState>("closed");
  readonly title = input<string | null>(null);
  readonly description = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);
  readonly dismissible = input<boolean>(true);
  readonly closeOnBackdrop = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);
  readonly opened = output<void>();
  readonly closed = output<void>();

  readonly resolvedTitle = computed(() => this.normalizeText(this.title()));
  readonly resolvedDescription = computed(() =>
    this.normalizeText(this.description()),
  );
  readonly resolvedAriaLabel = computed(() => this.normalizeText(this.ariaLabel()));
  readonly hasHeaderContent = computed(
    () => this.resolvedTitle() !== null || this.resolvedDescription() !== null,
  );
  readonly resolvedAriaLabelledBy = computed(() =>
    this.resolvedAriaLabel() === null && this.resolvedTitle() !== null
      ? this.titleId
      : null,
  );
  readonly resolvedAriaDescribedBy = computed(() =>
    this.resolvedDescription() !== null ? this.descriptionId : null,
  );
  readonly currentState = computed(() => this.internalState());

  protected readonly baseClass = drawerStyleMap.baseClass;

  private readonly idPrefix = `k-drawer-${++drawerInstanceCounter}`;
  protected readonly titleId = `${this.idPrefix}-title`;
  protected readonly descriptionId = `${this.idPrefix}-description`;
  private readonly internalState = signal<DrawerState>("closed");
  private readonly previousState = signal<DrawerState>("closed");

  constructor() {
    super();

    effect(() => this.internalState.set(this.state()));

    effect(
      () => {
        const nextState = this.currentState();
        const previousState = this.previousState();

        if (nextState === previousState) {
          return;
        }

        if (nextState === "open") {
          this.opened.emit();
        }

        if (nextState === "closed" && previousState !== "closed") {
          this.closed.emit();
        }

        this.previousState.set(nextState);
      }
    );
  }

  protected override styleValues() {
    return {
      variant: this.variant(),
    };
  }

  protected override stateValues() {
    return {
      [this.currentState()]: true,
    };
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (!this.dismissible() || !this.closeOnBackdrop()) {
      return;
    }

    this.requestClose(event);
  }

  onBackdropKeydown(event: KeyboardEvent): void {
    if (event.key !== "Escape") {
      return;
    }

    if (!this.dismissible() || !this.closeOnEscape()) {
      return;
    }

    this.requestClose(event);
  }

  requestClose(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.currentState() === "closed") {
      return;
    }

    this.internalState.set("closed");
  }

  private normalizeText(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }
}
