import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from "@angular/core";
import {
  KentraElementBase,
  KentraTooltipContract,
  TooltipState,
  TooltipVariant,
  tooltipStyleMap,
} from "@kentra-saas/ui-kit";

let tooltipInstanceCounter = 0;

@Component({
  selector: "k-tooltip",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
  },
  template: `
    <span
      class="trigger"
      [attr.aria-describedby]="effectiveState() === 'visible' ? tooltipId : null"
      (mouseenter)="onPointerEnter()"
      (mouseleave)="onPointerLeave()"
      (focusin)="onFocusIn()"
      (focusout)="onFocusOut($event)"
    >
      <ng-content></ng-content>
    </span>

    <span
      class="panel"
      [id]="tooltipId"
      role="tooltip"
      [attr.aria-hidden]="effectiveState() === 'visible' ? 'false' : 'true'"
    >
      @if (resolvedContent(); as contentText) {
        <span class="content">{{ contentText }}</span>
      }

      <ng-content select="[kTooltipContent]"></ng-content>

      @if (showArrow()) {
        <span class="arrow" aria-hidden="true"></span>
      }
    </span>
  `,
  styles: `
    :host {
      position: relative;
      display: inline-flex;
      max-inline-size: 100%;
      vertical-align: middle;
    }

    .trigger {
      display: inline-flex;
      max-inline-size: 100%;
    }

    .panel {
      position: absolute;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: max-content;
      max-inline-size: min(100vw - var(--k-space-4), var(--k-tooltip-panel-max-width, 20rem));
      padding-inline: var(--k-tooltip-panel-padding-x, var(--k-space-2));
      padding-block: var(--k-tooltip-panel-padding-y, var(--k-space-1));
      border: var(--k-tooltip-panel-border-width, 1px) solid
        var(--k-tooltip-colors-border, transparent);
      border-radius: var(--k-tooltip-panel-border-radius, var(--k-radius-sm));
      background: var(--k-tooltip-colors-bg, currentColor);
      color: var(--k-tooltip-colors-text, currentColor);
      box-shadow: var(--k-tooltip-panel-shadow, none);
      z-index: var(--k-tooltip-panel-z-index, var(--k-z-index-tooltip));
      font-family: var(--k-tooltip-typography-family, inherit);
      font-size: var(--k-tooltip-typography-font-size, inherit);
      line-height: var(--k-tooltip-typography-line-height, 1.4);
      font-weight: var(--k-tooltip-typography-font-weight, 400);
      text-align: center;
      text-wrap: pretty;
      opacity: var(--k-tooltip-opacity, 0);
      transform: var(--k-tooltip-position-transform) var(--k-tooltip-transform, translate(0, 0));
      transform-origin: center;
      pointer-events: none;
      transition:
        opacity var(--k-tooltip-motion-enter-duration, 0s)
          var(--k-tooltip-motion-enter-easing, linear),
        transform var(--k-tooltip-motion-enter-duration, 0s)
          var(--k-tooltip-motion-enter-easing, linear);
    }

    .content {
      display: inline;
      color: inherit;
    }

    .arrow {
      position: absolute;
      inline-size: var(--k-tooltip-arrow-size, 0.5rem);
      block-size: var(--k-tooltip-arrow-size, 0.5rem);
      background: var(--k-tooltip-colors-arrow, currentColor);
      transform: rotate(45deg);
      pointer-events: none;
    }

    :host(.k-tooltip--variant-top) .panel {
      min-inline-size: min(16rem, calc(100vw - var(--k-space-4)));
      inset-block-end: calc(100% + var(--k-tooltip-offset, 0.5rem));
      inset-inline-start: 50%;
      --k-tooltip-position-transform: translateX(-50%);
    }

    :host(.k-tooltip--variant-top) .arrow {
      inset-block-end: calc(var(--k-tooltip-arrow-size, 0.5rem) * -0.5);
      inset-inline-start: 50%;
      translate: -50% 0;
    }

    :host(.k-tooltip--variant-right) .panel {
      inset-inline-start: calc(100% + var(--k-tooltip-offset, 0.5rem));
      inset-block-start: 50%;
      --k-tooltip-position-transform: translateY(-50%);
    }

    :host(.k-tooltip--variant-right) .arrow {
      inset-inline-start: calc(var(--k-tooltip-arrow-size, 0.5rem) * -0.5);
      inset-block-start: 50%;
      translate: 0 -50%;
    }

    :host(.k-tooltip--variant-bottom) .panel {
      min-inline-size: min(16rem, calc(100vw - var(--k-space-4)));
      inset-block-start: calc(100% + var(--k-tooltip-offset, 0.5rem));
      inset-inline-start: 50%;
      --k-tooltip-position-transform: translateX(-50%);
    }

    :host(.k-tooltip--variant-bottom) .arrow {
      inset-block-start: calc(var(--k-tooltip-arrow-size, 0.5rem) * -0.5);
      inset-inline-start: 50%;
      translate: -50% 0;
    }

    :host(.k-tooltip--variant-left) .panel {
      inset-inline-end: calc(100% + var(--k-tooltip-offset, 0.5rem));
      inset-block-start: 50%;
      --k-tooltip-position-transform: translateY(-50%);
    }

    :host(.k-tooltip--variant-left) .arrow {
      inset-inline-end: calc(var(--k-tooltip-arrow-size, 0.5rem) * -0.5);
      inset-block-start: 50%;
      translate: 0 -50%;
    }

    @media (max-width: 64rem) {
      .panel {
        max-inline-size: min(100vw - var(--k-space-6), max(var(--k-tooltip-panel-max-width, 20rem), 16rem));
      }
    }

    @media (max-width: 48rem) {
      .panel {
        max-inline-size: min(100vw - var(--k-space-4), var(--k-tooltip-panel-max-width, 20rem));
        padding-inline: max(var(--k-tooltip-panel-padding-x, var(--k-space-2)), var(--k-space-2));
      }

      :host(.k-tooltip--variant-top) .panel,
      :host(.k-tooltip--variant-bottom) .panel {
        min-inline-size: min(14rem, calc(100vw - var(--k-space-4)));
      }
    }
  `,
})
export class KentraTooltip extends KentraElementBase implements KentraTooltipContract {
  readonly variant = input<TooltipVariant>("top");
  readonly state = input<TooltipState>("hidden");
  readonly content = input<string | null>(null);
  readonly disabled = input<boolean>(false);
  readonly showArrow = input<boolean>(true);
  readonly opened = output<void>();
  readonly closed = output<void>();

  readonly resolvedContent = computed(() => this.normalizeText(this.content()));
  readonly effectiveState = computed<TooltipState>(() => {
    if (this.disabled()) {
      return "hidden";
    }

    return this.internalState();
  });

  protected readonly baseClass = tooltipStyleMap.baseClass;

  readonly tooltipId = `k-tooltip-${++tooltipInstanceCounter}`;

  private readonly internalState = signal<TooltipState>("hidden");
  private readonly previousState = signal<TooltipState>("hidden");

  constructor() {
    super();

    effect(
      () => {
        this.internalState.set(this.state());
      },
      { allowSignalWrites: true },
    );

    effect(
      () => {
        const nextState = this.effectiveState();
        const previousState = this.previousState();

        if (nextState === previousState) {
          return;
        }

        if (nextState === "visible") {
          this.opened.emit();
        }

        if (nextState === "hidden" && previousState !== "hidden") {
          this.closed.emit();
        }

        this.previousState.set(nextState);
      },
      { allowSignalWrites: true },
    );
  }

  protected override styleValues() {
    return {
      variant: this.variant(),
    };
  }

  protected override stateValues() {
    return {
      [this.effectiveState()]: true,
    };
  }

  onPointerEnter(): void {
    if (this.disabled()) {
      return;
    }

    this.internalState.set("visible");
  }

  onPointerLeave(): void {
    this.internalState.set("hidden");
  }

  onFocusIn(): void {
    if (this.disabled()) {
      return;
    }

    this.internalState.set("visible");
  }

  onFocusOut(event: FocusEvent): void {
    const relatedTarget = event.relatedTarget;
    if (relatedTarget instanceof Node && (event.currentTarget as Node).contains(relatedTarget)) {
      return;
    }

    this.internalState.set("hidden");
  }

  private normalizeText(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }
}
