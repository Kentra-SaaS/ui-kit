import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from "@angular/core";
import {
  KentraElementBase,
  KentraKpiCardContract,
  KpiCardState,
  KpiCardVariant,
  kpiCardStyleMap,
} from "@kentra-saas/ui-kit";

@Component({
  selector: "k-kpi-card",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-busy]": "state() === 'loading' ? 'true' : null",
  },
  template: `
    <article
      class="card"
      [class.is-clickable]="clickable()"
      [attr.role]="clickable() ? 'button' : null"
      [attr.tabindex]="clickable() ? 0 : null"
      (click)="onCardClick($event)"
      (keydown.enter)="onCardKeydown($event)"
      (keydown.space)="onCardKeydown($event)"
    >
      <header class="header">
        @if (resolvedLabel(); as labelText) {
          <p class="label">{{ labelText }}</p>
        }

        <div class="actions">
          <ng-content select="[kKpiCardActions]"></ng-content>
        </div>
      </header>

      @if (state() === "loading") {
        <div class="value-skeleton" aria-hidden="true"></div>
        <div class="delta-skeleton" aria-hidden="true"></div>
      } @else {
        <p class="value">{{ resolvedValue() ?? "-" }}</p>

        @if (resolvedTrend() !== null || resolvedDelta() !== null) {
          <div class="trend-row">
            @if (resolvedTrend(); as trendText) {
              <span class="trend" [class.is-up]="trendTone() === 'up'" [class.is-down]="trendTone() === 'down'">
                {{ trendText }}
              </span>
            }

            @if (resolvedDelta(); as deltaText) {
              <span class="delta">{{ deltaText }}</span>
            }
          </div>
        }
      }
    </article>
  `,
  styles: `
    :host {
      display: block;
      inline-size: 100%;
      max-inline-size: 100%;
    }

    .card {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: var(--k-kpi-card-spacing-content-gap, var(--k-space-4));
      min-block-size: var(--k-kpi-card-size-min-height, var(--k-space-16));
      inline-size: 100%;
      padding-inline: var(--k-kpi-card-size-padding-x, var(--k-space-5));
      padding-block: var(--k-kpi-card-size-padding-y, var(--k-space-5));
      border: var(--k-kpi-card-border-width, 1px) solid
        var(--k-kpi-card-colors-border, transparent);
      border-radius: var(--k-kpi-card-border-radius, var(--k-radius-lg));
      background: var(--k-kpi-card-colors-bg, transparent);
      box-shadow: var(--k-kpi-card-shadow, none);
      transition:
        background var(--k-kpi-card-motion-duration, 0s)
          var(--k-kpi-card-motion-easing, linear),
        border-color var(--k-kpi-card-motion-duration, 0s)
          var(--k-kpi-card-motion-easing, linear),
        box-shadow var(--k-kpi-card-motion-duration, 0s)
          var(--k-kpi-card-motion-easing, linear);
    }

    .card.is-clickable {
      cursor: pointer;
    }

    .card.is-clickable:hover {
      box-shadow: var(--k-shadow-md);
      border-color: var(--k-color-border-default);
    }

    .card.is-clickable:focus-visible {
      outline: 2px solid var(--k-color-state-focus-outline);
      outline-offset: 2px;
      box-shadow:
        0 0 0 1px var(--k-color-state-focus-ring),
        var(--k-kpi-card-shadow, none);
    }

    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--k-kpi-card-spacing-header-gap, var(--k-space-2));
    }

    .label,
    .value,
    .trend,
    .delta {
      margin: 0;
    }

    .label {
      color: var(--k-kpi-card-colors-label, currentColor);
      font-family: var(--k-kpi-card-typography-label-family, inherit);
      font-size: var(--k-kpi-card-typography-label-font-size, 0.75rem);
      line-height: var(--k-kpi-card-typography-label-line-height, 1.3);
      font-weight: var(--k-kpi-card-typography-label-font-weight, 600);
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }

    .actions {
      display: inline-flex;
      align-items: center;
      gap: var(--k-space-2);
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .value {
      color: var(--k-kpi-card-colors-value, currentColor);
      font-family: var(--k-kpi-card-typography-value-family, inherit);
      font-size: var(--k-kpi-card-typography-value-font-size, 1.75rem);
      line-height: var(--k-kpi-card-typography-value-line-height, 1.2);
      font-weight: var(--k-kpi-card-typography-value-font-weight, 700);
      overflow-wrap: anywhere;
    }

    .trend-row {
      display: inline-flex;
      align-items: center;
      gap: var(--k-kpi-card-spacing-trend-gap, var(--k-space-2));
      flex-wrap: wrap;
    }

    .trend,
    .delta {
      font-family: var(--k-kpi-card-typography-delta-family, inherit);
      font-size: var(--k-kpi-card-typography-delta-font-size, 0.875rem);
      line-height: var(--k-kpi-card-typography-delta-line-height, 1.4);
      font-weight: var(--k-kpi-card-typography-delta-font-weight, 600);
    }

    .trend {
      color: var(--k-kpi-card-trend-color, var(--k-kpi-card-colors-delta, currentColor));
    }

    .delta {
      color: var(--k-kpi-card-colors-delta, currentColor);
    }

    .value-skeleton,
    .delta-skeleton {
      border-radius: var(--k-radius-sm);
      background: linear-gradient(
        90deg,
        var(--k-kpi-card-colors-skeleton, var(--k-color-border-subtle)),
        color-mix(in srgb, var(--k-kpi-card-colors-skeleton, var(--k-color-border-subtle)) 66%, transparent),
        var(--k-kpi-card-colors-skeleton, var(--k-color-border-subtle))
      );
      background-size: 200% 100%;
      animation: k-kpi-card-skeleton 1.2s linear infinite;
    }

    .value-skeleton {
      inline-size: min(60%, 10rem);
      block-size: 1.75rem;
    }

    .delta-skeleton {
      inline-size: min(38%, 6.5rem);
      block-size: 0.875rem;
    }

    @keyframes k-kpi-card-skeleton {
      from {
        background-position: 100% 0;
      }
      to {
        background-position: -100% 0;
      }
    }

    @media (max-width: 64rem) {
      .card {
        padding-inline: max(var(--k-kpi-card-size-padding-x, var(--k-space-5)), var(--k-space-4));
        padding-block: max(var(--k-kpi-card-size-padding-y, var(--k-space-5)), var(--k-space-4));
      }
    }

    @media (max-width: 48rem) {
      .card {
        min-block-size: auto;
      }

      .value {
        font-size: max(var(--k-kpi-card-typography-value-font-size, 1.75rem), 1.5rem);
      }
    }
  `,
})
export class KentraKpiCard extends KentraElementBase implements KentraKpiCardContract {
  readonly variant = input<KpiCardVariant>("default");
  readonly state = input<KpiCardState>("default");
  readonly label = input<string | null>(null);
  readonly value = input<string | number | null>(null);
  readonly trend = input<string | number | null>(null);
  readonly delta = input<string | number | null>(null);
  readonly clickable = input<boolean>(false);
  readonly click = output<MouseEvent>();

  readonly resolvedLabel = computed(() => this.normalizeText(this.label()));
  readonly resolvedValue = computed(() => this.normalizeValue(this.value()));
  readonly resolvedTrend = computed(() => this.normalizeValue(this.trend()));
  readonly resolvedDelta = computed(() => this.normalizeValue(this.delta()));
  readonly trendTone = computed<"up" | "down" | "neutral">(() => {
    const trend = this.trend();

    if (typeof trend === "number") {
      if (trend > 0) {
        return "up";
      }

      if (trend < 0) {
        return "down";
      }

      return "neutral";
    }

    const normalizedTrend = this.normalizeText(trend);
    if (normalizedTrend === null) {
      return "neutral";
    }

    if (normalizedTrend.startsWith("+")) {
      return "up";
    }

    if (normalizedTrend.startsWith("-")) {
      return "down";
    }

    return "neutral";
  });

  protected readonly baseClass = kpiCardStyleMap.baseClass;

  protected override styleValues() {
    return {
      variant: this.variant(),
    };
  }

  protected override stateValues() {
    return this.state() === "default"
      ? {}
      : {
          [this.state()]: true,
        };
  }

  protected override cssVars() {
    const tone = this.trendTone();

    return {
      "--k-kpi-card-trend-color": `var(--k-kpi-card-trend-${tone}, var(--k-kpi-card-colors-delta, currentColor))`,
    };
  }

  onCardClick(event: MouseEvent): void {
    if (!this.clickable() || this.state() === "loading") {
      return;
    }

    this.click.emit(event);
  }

  onCardKeydown(event: Event): void {
    if (!this.clickable() || this.state() === "loading") {
      return;
    }

    event.preventDefault();
    this.click.emit(new MouseEvent("click"));
  }

  private normalizeText(value: string | null): string | null {
    if (value === null) {
      return null;
    }

    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }

  private normalizeValue(value: string | number | null): string | null {
    if (value === null) {
      return null;
    }

    if (typeof value === "number") {
      return String(value);
    }

    return this.normalizeText(value);
  }
}
