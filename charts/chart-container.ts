import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";

import { KentraIcon } from "../icons/icon";
import {
  ChartContainerState,
  ChartContainerVariant,
  chartContainerStyleMap,
  KentraChartContainerContract,
  KentraElementBase,
} from "../internal";
import {
  normalizeDimension,
  normalizeText,
} from "./chart-utils";

let chartContainerInstanceCounter = 0;

@Component({
  selector: "k-chart-container",
  standalone: true,
  imports: [KentraIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.aria-busy]": "state() === 'loading' ? 'true' : null",
    "[attr.role]": "'region'",
    "[attr.aria-label]": "resolvedAriaLabel()",
    "[attr.aria-labelledby]": "resolvedAriaLabelledBy()",
  },
  template: `
    <section class="container">
      <header class="header" [attr.hidden]="hasHeaderContent() ? null : ''">
        <div class="heading-group">
          @if (resolvedTitle(); as titleText) {
            <h3 class="title" [id]="titleId">{{ titleText }}</h3>
          }

          @if (resolvedDescription(); as descriptionText) {
            <p class="description">{{ descriptionText }}</p>
          }
        </div>

        <div class="toolbar">
          <ng-content select="[kChartToolbar]"></ng-content>
        </div>
      </header>

      <div class="body">
        <div class="chart-area">
          @if (state() === "loading") {
            <div class="state state-loading">
              <div class="skeleton skeleton-chart" aria-hidden="true"></div>
              <p class="state-text">{{ resolvedLoadingLabel() }}</p>
            </div>
          } @else if (state() === "ready") {
            <ng-content></ng-content>
          } @else {
            <div class="state">
              <k-icon [name]="resolvedStateIcon()" aria-hidden="true"></k-icon>
              <p class="state-text">{{ resolvedStateLabel() }}</p>
            </div>
          }
        </div>

        @if (showLegend() && state() === "ready") {
          <div class="legend">
            <ng-content select="[kChartLegend]"></ng-content>
          </div>
        }
      </div>
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
      display: grid;
      gap: var(--k-chart-container-spacing-body-gap, var(--k-space-4));
      inline-size: 100%;
      border: var(--k-chart-container-container-border-width, 1px) solid
        var(--k-chart-container-colors-border, transparent);
      border-radius: var(--k-chart-container-container-border-radius, var(--k-radius-lg));
      background: var(--k-chart-container-colors-bg, transparent);
      box-shadow: var(--k-chart-container-container-shadow, none);
      padding-inline: var(--k-chart-container-spacing-padding-x, var(--k-space-5));
      padding-block: var(--k-chart-container-spacing-padding-y, var(--k-space-4));
      transition:
        border-color var(--k-motion-duration-fast, 0s) var(--k-motion-ease-standard, linear),
        background var(--k-motion-duration-fast, 0s) var(--k-motion-ease-standard, linear),
        color var(--k-motion-duration-fast, 0s) var(--k-motion-ease-standard, linear);
    }

    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--k-chart-container-spacing-header-gap, var(--k-space-2));
      min-inline-size: 0;
    }

    .heading-group {
      display: grid;
      gap: var(--k-space-1);
      min-inline-size: 0;
    }

    .title,
    .description,
    .state-text {
      margin: 0;
    }

    .title {
      color: var(--k-chart-container-colors-title, currentColor);
      font-family: var(--k-chart-container-typography-title-family, inherit);
      font-size: var(--k-chart-container-typography-title-font-size, 1rem);
      line-height: var(--k-chart-container-typography-title-line-height, 1.3);
      font-weight: var(--k-chart-container-typography-title-font-weight, 600);
      text-wrap: balance;
    }

    .description {
      color: var(--k-chart-container-colors-description, currentColor);
      font-family: var(--k-chart-container-typography-description-family, inherit);
      font-size: var(--k-chart-container-typography-description-font-size, 0.875rem);
      line-height: var(--k-chart-container-typography-description-line-height, 1.45);
      font-weight: var(--k-chart-container-typography-description-font-weight, 400);
      text-wrap: pretty;
    }

    .toolbar {
      display: inline-flex;
      align-items: center;
      gap: var(--k-space-2);
      flex-wrap: wrap;
      justify-content: flex-end;
      flex: none;
    }

    .body {
      display: grid;
      gap: var(--k-chart-container-spacing-legend-gap, var(--k-space-3));
      min-inline-size: 0;
    }

    .chart-area {
      min-block-size: var(
        --k-chart-container-chart-area-min-height-desktop,
        20rem
      );
      inline-size: 100%;
      min-inline-size: 0;
    }

    .state {
      display: grid;
      place-items: center;
      gap: var(--k-space-2);
      inline-size: 100%;
      min-block-size: inherit;
      padding: var(--k-space-3);
      color: var(--k-chart-container-colors-state-text, currentColor);
      text-align: center;
    }

    .state :is(k-icon, .k-icon) {
      --k-icon-font-size: var(--k-icon-size-lg);
      --k-icon-color: var(--k-chart-container-colors-state-icon, currentColor);
    }

    .state-text {
      color: var(--k-chart-container-colors-state-text, currentColor);
      font-family: var(--k-chart-container-typography-state-text-family, inherit);
      font-size: var(--k-chart-container-typography-state-text-font-size, 0.875rem);
      line-height: var(--k-chart-container-typography-state-text-line-height, 1.45);
      font-weight: var(--k-chart-container-typography-state-text-font-weight, 400);
    }

    .state-loading {
      place-items: stretch;
    }

    .skeleton {
      border-radius: var(--k-radius-sm);
      background: linear-gradient(
        90deg,
        var(--k-chart-container-colors-skeleton, var(--k-color-border-subtle)),
        color-mix(in srgb, var(--k-chart-container-colors-skeleton, var(--k-color-border-subtle)) 65%, transparent),
        var(--k-chart-container-colors-skeleton, var(--k-color-border-subtle))
      );
      background-size: 200% 100%;
      animation: k-chart-container-skeleton 1.4s linear infinite;
    }

    .skeleton-chart {
      inline-size: 100%;
      min-block-size: inherit;
    }

    .legend {
      color: var(--k-chart-container-colors-legend-text, currentColor);
      min-inline-size: 0;
    }

    @keyframes k-chart-container-skeleton {
      from {
        background-position: 100% 0;
      }
      to {
        background-position: -100% 0;
      }
    }

    @media (max-width: 64rem) {
      .chart-area {
        min-block-size: var(
          --k-chart-container-chart-area-min-height-mobile,
          17.5rem
        );
      }
    }

    @media (max-width: 48rem) {
      .container {
        padding-inline: max(var(--k-chart-container-spacing-padding-x, var(--k-space-5)), var(--k-space-3));
      }

      .header {
        flex-direction: column;
      }

      .toolbar {
        justify-content: flex-start;
        inline-size: 100%;
      }
    }
  `,
})
export class KentraChartContainer
  extends KentraElementBase
  implements KentraChartContainerContract
{
  readonly variant = input<ChartContainerVariant>("default");
  readonly state = input<ChartContainerState>("ready");
  readonly title = input<string | null>(null);
  readonly description = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);
  readonly height = input<string | number | null>(null);
  readonly desktopHeight = input<string | number | null>(null);
  readonly showLegend = input<boolean>(true);
  readonly loadingLabel = input<string | null>("Diagramm wird geladen.");
  readonly emptyLabel = input<string | null>("Keine Daten verfuegbar.");
  readonly errorLabel = input<string | null>(
    "Diagramm konnte nicht geladen werden.",
  );

  readonly toolbar = computed(() => undefined);
  readonly legend = computed(() => undefined);

  readonly resolvedTitle = computed(() => normalizeText(this.title()));
  readonly resolvedDescription = computed(() => normalizeText(this.description()));
  readonly resolvedAriaLabel = computed(() => normalizeText(this.ariaLabel()));
  readonly resolvedAriaLabelledBy = computed(() =>
    this.resolvedAriaLabel() === null && this.resolvedTitle() !== null
      ? this.titleId
      : null,
  );
  readonly resolvedLoadingLabel = computed(
    () => normalizeText(this.loadingLabel()) ?? "Diagramm wird geladen.",
  );
  readonly resolvedStateLabel = computed(() => {
    if (this.state() === "error") {
      return normalizeText(this.errorLabel()) ?? "Diagramm konnte nicht geladen werden.";
    }

    return normalizeText(this.emptyLabel()) ?? "Keine Daten verfuegbar.";
  });
  readonly resolvedStateIcon = computed(() =>
    this.state() === "error" ? "warning-circle" : "chart-pie",
  );
  readonly hasHeaderContent = computed(
    () => this.resolvedTitle() !== null || this.resolvedDescription() !== null,
  );

  protected readonly baseClass = chartContainerStyleMap.baseClass;

  private readonly idPrefix = `k-chart-container-${++chartContainerInstanceCounter}`;
  protected readonly titleId = `${this.idPrefix}-title`;

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

  protected override cssVars() {
    const mobileHeight = normalizeDimension(this.height());
    const desktopHeight = normalizeDimension(this.desktopHeight()) ?? mobileHeight;

    return {
      "--k-chart-container-chart-area-min-height-mobile": mobileHeight,
      "--k-chart-container-chart-area-min-height-desktop": desktopHeight,
    };
  }
}
