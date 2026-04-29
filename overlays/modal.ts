import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from "@angular/core";
import { KentraIcon } from "@kentra-saas/ui-kit/icons";
import { KentraModalService } from "./modal.service";
import {
  KentraElementBase,
  KentraModalContract,
  ModalState,
  ModalVariant,
  modalStyleMap,
} from "@kentra-saas/ui-kit";

let modalInstanceCounter = 0;

@Component({
  selector: "k-modal",
  standalone: true,
  imports: [KentraIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.id]": "resolvedModalId()",
    "[attr.aria-hidden]": "currentState() === 'closed' ? 'true' : 'false'",
  },
  template: `
    <div
      class="backdrop"
      tabindex="-1"
      (click)="onBackdropClick($event)"
      (keydown)="onBackdropKeydown($event)"
    >
      <section
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
            <ng-content select="[kModalHeader]"></ng-content>

            @if (dismissible()) {
              <button
                class="close-action"
                type="button"
                aria-label="Close dialog"
                (click)="requestClose($event)"
              >
                <k-icon name="x" aria-hidden="true"></k-icon>
              </button>
            }
          </div>
        </header>

        <div class="body">
          <ng-content></ng-content>
          <ng-content select="[kModalBody]"></ng-content>
        </div>

        <footer class="footer">
          <ng-content select="[kModalFooter]"></ng-content>
        </footer>
      </section>
    </div>
  `,
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: var(--k-modal-backdrop-z-index, var(--k-z-index-overlay));
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
      display: grid;
      place-items: center;
      padding: var(--k-space-4);
      background: var(--k-modal-backdrop-color, transparent);
      opacity: 1;
      transition: opacity var(--k-modal-motion-enter-duration, 0s)
        var(--k-modal-motion-enter-easing, linear);
    }

    :host(.is-closed) .backdrop {
      opacity: 0;
    }

    .panel {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      inline-size: min(100%, var(--k-modal-panel-width, 44rem));
      max-block-size: var(--k-modal-panel-max-height, 82dvh);
      border: var(--k-modal-panel-border-width, 1px) solid
        var(--k-modal-colors-panel-border, transparent);
      border-radius: var(--k-modal-panel-radius, var(--k-modal-panel-border-radius, var(--k-radius-lg)));
      background: var(--k-modal-colors-panel-bg, transparent);
      box-shadow: var(--k-modal-panel-shadow, none);
      color: var(--k-modal-colors-body, currentColor);
      opacity: var(--k-modal-opacity, 1);
      transform: scale(var(--k-modal-scale, 1));
      transition:
        opacity var(--k-modal-motion-enter-duration, 0s)
          var(--k-modal-motion-enter-easing, linear),
        transform var(--k-modal-motion-enter-duration, 0s)
          var(--k-modal-motion-enter-easing, linear),
        border-color var(--k-modal-motion-enter-duration, 0s)
          var(--k-modal-motion-enter-easing, linear),
        background var(--k-modal-motion-enter-duration, 0s)
          var(--k-modal-motion-enter-easing, linear);
      overflow: hidden;
      pointer-events: auto;
    }

    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--k-modal-spacing-section-gap, var(--k-space-4));
      padding-inline: var(--k-modal-spacing-header-padding-x, var(--k-space-5));
      padding-block: var(--k-modal-spacing-header-padding-y, var(--k-space-4));
      border-bottom: 1px solid var(--k-modal-colors-panel-border, transparent);
    }

    .headings {
      display: grid;
      gap: var(--k-space-1);
      min-inline-size: 0;
    }

    .title {
      margin: 0;
      color: var(--k-modal-colors-title, currentColor);
      font-family: var(--k-modal-typography-title-family, inherit);
      font-size: var(--k-modal-typography-title-font-size, inherit);
      line-height: var(--k-modal-typography-title-line-height, 1.3);
      font-weight: var(--k-modal-typography-title-font-weight, 700);
    }

    .description {
      margin: 0;
      color: var(--k-modal-colors-body, currentColor);
      font-family: var(--k-modal-typography-body-family, inherit);
      font-size: var(--k-modal-typography-body-font-size, inherit);
      line-height: var(--k-modal-typography-body-line-height, 1.5);
      font-weight: var(--k-modal-typography-body-font-weight, 400);
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
      color: var(--k-modal-colors-title, currentColor);
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
      padding-inline: var(--k-modal-spacing-body-padding-x, var(--k-space-5));
      padding-block: var(--k-modal-spacing-body-padding-y, var(--k-space-4));
      color: var(--k-modal-colors-body, currentColor);
      font-family: var(--k-modal-typography-body-family, inherit);
      font-size: var(--k-modal-typography-body-font-size, inherit);
      line-height: var(--k-modal-typography-body-line-height, 1.5);
      font-weight: var(--k-modal-typography-body-font-weight, 400);
      flex: 1;
    }

    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: var(--k-space-2);
      padding-inline: var(--k-modal-spacing-footer-padding-x, var(--k-space-5));
      padding-block: var(--k-modal-spacing-footer-padding-y, var(--k-space-4));
      border-top: 1px solid var(--k-modal-colors-panel-border, transparent);
    }

    @media (max-width: 64rem) {
      .panel {
        inline-size: min(100%, max(var(--k-modal-panel-width, 44rem), 36rem));
      }
    }

    @media (max-width: 48rem) {
      .backdrop {
        padding: var(--k-space-3);
      }

      .panel {
        inline-size: min(100%, 100dvw - var(--k-space-4));
        max-block-size: 100dvh;
      }

      .header,
      .body,
      .footer {
        padding-inline: max(var(--k-space-4), var(--k-space-3));
      }

      .close-action {
        inline-size: max(var(--k-space-8), 2.75rem);
        block-size: max(var(--k-space-8), 2.75rem);
      }
    }
  `,
})
export class KentraModal extends KentraElementBase implements KentraModalContract {
  readonly id = input<string | null>(null);
  readonly variant = input<ModalVariant>("md");
  readonly state = input<ModalState>("closed");
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
  readonly resolvedModalId = computed(() => this.normalizeText(this.id()));
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

  protected readonly baseClass = modalStyleMap.baseClass;

  private readonly idPrefix = `k-modal-${++modalInstanceCounter}`;
  protected readonly titleId = `${this.idPrefix}-title`;
  protected readonly descriptionId = `${this.idPrefix}-description`;
  private readonly internalState = signal<ModalState>("closed");
  private readonly previousState = signal<ModalState>("closed");
  private readonly modalService = inject(KentraModalService);
  private readonly managedState = computed<ModalState | null>(() => {
    const modalId = this.resolvedModalId();
    return modalId === null ? null : this.modalService.stateFor(modalId)();
  });
  private readonly resolvedInputState = computed(
    () => this.managedState() ?? this.state(),
  );

  constructor() {
    super();

    effect(() => this.internalState.set(this.resolvedInputState()));

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
    const state = this.currentState();

    return {
      [state]: true,
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

    const modalId = this.resolvedModalId();
    if (modalId !== null) {
      this.modalService.close(modalId);
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
