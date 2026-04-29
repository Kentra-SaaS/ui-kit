import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from "@angular/core";
import {
  Chart,
  type ChartConfiguration,
  type ChartData,
} from "chart.js";
import "chart.js/auto";

import {
  DonutChartState,
  DonutChartVariant,
  donutChartStyleMap,
  KentraDonutChartContract,
  KentraElementBase,
} from "@kentra-saas/ui-kit";
import type {
  KentraChartValueFormatter,
  KentraDonutChartSegment,
} from "./chart-models";
import {
  buildSelectionChangeEvent,
  ensureFiniteNumber,
  formatChartValue,
  normalizeDimension,
  normalizeSeriesId,
  normalizeText,
  resolveCssNumber,
  resolveCssVar,
  type KentraChartSelectionChangeEvent,
} from "./chart-utils";

type ResolvedDonutSegment = {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly color: string | null;
};

@Component({
  selector: "k-donut-chart",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "hostClasses()",
    "[style]": "hostStyles()",
    "[attr.role]": "state() === 'ready' ? 'img' : 'group'",
    "[attr.aria-label]": "resolvedAriaLabel()",
    "[attr.aria-disabled]": "disabled() ? 'true' : null",
    "[attr.tabindex]": "isFocusable() ? '0' : null",
    "(keydown)": "onHostKeydown($event)",
  },
  template: `
    <div class="surface">
      @if (state() === "ready") {
        <div class="canvas-shell">
          <canvas #canvasElement class="canvas"></canvas>

          @if (variant() === "withCenterMetric") {
            <div class="center-metric" aria-hidden="true">
              <span class="center-value">{{ resolvedCenterValue() }}</span>
              <span class="center-label">{{ resolvedTotalLabel() }}</span>
            </div>
          }
        </div>

        @if (showLegend()) {
          <ul class="legend" aria-hidden="true">
            @for (segment of resolvedSegments(); track segment.id; let i = $index) {
              <li class="legend-item">
                <span class="legend-marker" [style.background]="resolveLegendColor(segment, i)"></span>
                <span class="legend-label">{{ segment.label }}</span>
                <span class="legend-value">{{ formatLegendValue(segment) }}</span>
              </li>
            }
          </ul>
        }
      } @else if (state() === "loading") {
        <div class="state state-loading">
          <div class="skeleton" aria-hidden="true"></div>
        </div>
      } @else {
        <div class="state">
          <p class="state-text">{{ resolvedStateText() }}</p>
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      inline-size: 100%;
      max-inline-size: 100%;
      outline: none;
    }

    .surface {
      display: grid;
      gap: var(--k-donut-chart-legend-gap, var(--k-space-2));
      inline-size: 100%;
      min-inline-size: 0;
      min-block-size: var(--k-chart-container-chart-area-min-height-desktop, 20rem);
    }

    .canvas-shell {
      justify-self: center;
      position: relative;
      inline-size: min(100%, var(--k-donut-chart-chart-max-size, 20rem));
      max-inline-size: 100%;
      aspect-ratio: 1 / 1;
      block-size: auto;
      min-block-size: 0;
    }

    .canvas {
      display: block;
      inline-size: 100%;
      block-size: 100%;
      min-block-size: 0;
    }

    .center-metric {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      pointer-events: none;
      gap: var(--k-space-1);
    }

    .center-value {
      color: var(--k-donut-chart-colors-center-value, currentColor);
      font-family: var(--k-donut-chart-center-metric-value-family, inherit);
      font-size: var(--k-donut-chart-center-metric-value-font-size, clamp(1.5rem, 3vw, 2rem));
      line-height: var(--k-donut-chart-center-metric-value-line-height, 1.15);
      font-weight: var(--k-donut-chart-center-metric-value-font-weight, 700);
    }

    .center-label {
      color: var(--k-donut-chart-colors-center-label, currentColor);
      font-family: var(--k-donut-chart-center-metric-label-family, inherit);
      font-size: var(--k-donut-chart-center-metric-label-font-size, clamp(0.875rem, 2vw, 1rem));
      line-height: var(--k-donut-chart-center-metric-label-line-height, 1.35);
      font-weight: var(--k-donut-chart-center-metric-label-font-weight, 500);
    }

    .legend {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      justify-self: center;
      inline-size: min(100%, var(--k-donut-chart-chart-max-size, 20rem));
      max-inline-size: 100%;
      gap: var(--k-donut-chart-legend-gap, var(--k-space-2));
      color: var(--k-donut-chart-colors-legend-text, currentColor);
    }

    .legend-item {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: var(--k-space-2);
      min-inline-size: 0;
    }

    .legend-marker {
      inline-size: var(--k-donut-chart-legend-marker-size, var(--k-space-2));
      block-size: var(--k-donut-chart-legend-marker-size, var(--k-space-2));
      border-radius: 999px;
    }

    .legend-label,
    .legend-value {
      font-family: var(--k-font-family-base);
      font-size: var(--k-typography-caption-font-size);
      line-height: var(--k-typography-caption-line-height);
      font-weight: var(--k-typography-body-font-weight);
    }

    .legend-label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .legend-value {
      color: var(--k-donut-chart-colors-center-value, currentColor);
      font-weight: var(--k-font-weight-medium);
    }

    .state {
      display: grid;
      place-items: center;
      min-block-size: inherit;
      inline-size: 100%;
      text-align: center;
      color: var(--k-donut-chart-colors-state-text, currentColor);
      padding: var(--k-space-3);
    }

    .state-text {
      margin: 0;
      color: inherit;
      font-family: var(--k-font-family-base);
      font-size: var(--k-typography-body-sm-font-size);
      line-height: var(--k-typography-body-sm-line-height);
      font-weight: var(--k-typography-body-font-weight);
    }

    .state-loading {
      place-items: center;
    }

    .skeleton {
      inline-size: min(100%, var(--k-donut-chart-chart-max-size, 20rem));
      max-inline-size: 100%;
      aspect-ratio: 1 / 1;
      min-block-size: 0;
      border-radius: 50%;
      background: linear-gradient(
        90deg,
        var(--k-donut-chart-colors-skeleton, var(--k-color-border-subtle)),
        color-mix(in srgb, var(--k-donut-chart-colors-skeleton, var(--k-color-border-subtle)) 64%, transparent),
        var(--k-donut-chart-colors-skeleton, var(--k-color-border-subtle))
      );
      background-size: 200% 100%;
      animation: k-donut-chart-skeleton 1.2s linear infinite;
    }

    :host(.is-interactive):focus-visible .surface {
      outline: 2px solid var(--k-color-state-focus-outline);
      outline-offset: 2px;
      box-shadow: 0 0 0 1px var(--k-color-state-focus-ring);
    }

    :host(.is-disabled) {
      opacity: var(--k-state-disabled-opacity, 0.62);
      pointer-events: none;
    }

    @keyframes k-donut-chart-skeleton {
      from {
        background-position: 100% 0;
      }
      to {
        background-position: -100% 0;
      }
    }

    @media (max-width: 64rem) {
      .surface {
        min-block-size: var(--k-chart-container-chart-area-min-height-mobile, 17.5rem);
      }
    }

    @media (max-width: 48rem) {
      .surface {
        min-block-size: max(var(--k-chart-container-chart-area-min-height-mobile, 17.5rem), 15rem);
      }
    }
  `,
})
export class KentraDonutChart
  extends KentraElementBase
  implements KentraDonutChartContract, OnDestroy
{
  readonly variant = input<DonutChartVariant>("default");
  readonly state = input<DonutChartState>("ready");
  readonly segments = input<readonly KentraDonutChartSegment[]>([]);
  readonly size = input<string | number | null>(null);
  readonly ariaLabel = input<string | null>(null);
  readonly totalLabel = input<string | null>("Total");
  readonly showLegend = input<boolean>(true);
  readonly interactive = input<boolean>(true);
  readonly disabled = input<boolean>(false);
  readonly valueFormatter = input<KentraChartValueFormatter | null>(null);
  readonly emptyLabel = input<string | null>("Keine Daten verfuegbar.");
  readonly errorLabel = input<string | null>("Diagramm konnte nicht geladen werden.");
  readonly selectedSliceId = input<string | null>(null);
  readonly selectionChanged = output<KentraChartSelectionChangeEvent>();

  readonly resolvedAriaLabel = computed(
    () =>
      normalizeText(this.ariaLabel()) ??
      "Donut chart",
  );
  readonly resolvedSegments = computed<readonly ResolvedDonutSegment[]>(() =>
    this.segments()
      .map((segment, segmentIndex) => {
        const id = normalizeSeriesId(segment.id, segmentIndex);
        const label = normalizeText(segment.label) ?? id;
        const value = ensureFiniteNumber(segment.value) ?? 0;
        const color = normalizeText(segment.color ?? null);

        return {
          id,
          label,
          value,
          color,
        } satisfies ResolvedDonutSegment;
      })
      .filter((segment) => segment.value > 0),
  );
  readonly segmentIds = computed(() => this.resolvedSegments().map((segment) => segment.id));
  readonly resolvedSelectedSliceId = computed(
    () => this.selectedSliceId() ?? this.internalSelectedSliceId(),
  );
  readonly resolvedCenterValue = computed(() => {
    const total = this.resolvedSegments().reduce(
      (sum, segment) => sum + segment.value,
      0,
    );
    return `${total}`;
  });
  readonly resolvedTotalLabel = computed(
    () => normalizeText(this.totalLabel()) ?? "Total",
  );
  readonly resolvedStateText = computed(() =>
    this.state() === "error"
      ? normalizeText(this.errorLabel()) ?? "Diagramm konnte nicht geladen werden."
      : normalizeText(this.emptyLabel()) ?? "Keine Daten verfuegbar.",
  );
  readonly isFocusable = computed(
    () => this.state() === "ready" && this.interactive() && !this.disabled(),
  );

  readonly canvasElement = viewChild<ElementRef<HTMLCanvasElement>>("canvasElement");

  protected readonly baseClass = donutChartStyleMap.baseClass;

  private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly themeVersion = signal(0);
  private readonly internalSelectedSliceId = signal<string | null>(null);
  private readonly cursorIndex = signal(0);
  private chart: Chart<"doughnut"> | null = null;

  constructor() {
    super();

    effect((onCleanup) => {
      if (
        typeof MutationObserver !== "function" ||
        typeof document === "undefined"
      ) {
        return;
      }

      const observer = new MutationObserver(() => {
        this.themeVersion.update((value) => value + 1);
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme", "class", "style"],
      });

      onCleanup(() => {
        observer.disconnect();
      });
    });

    effect(() => {
      this.themeVersion();
      const canvas = this.canvasElement()?.nativeElement;

      if (this.state() !== "ready" || canvas === undefined) {
        this.destroyChart();
        return;
      }

      const configuration = this.buildConfiguration();
      this.renderChart(canvas, configuration);
      this.syncActiveSelection();
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
      interactive: this.interactive(),
      disabled: this.disabled(),
    };
  }

  protected override cssVars() {
    return {
      "--k-donut-chart-chart-max-size": normalizeDimension(this.size()) ?? "20rem",
    };
  }

  onHostKeydown(event: KeyboardEvent): void {
    if (!this.isFocusable()) {
      return;
    }

    const ids = this.segmentIds();
    if (ids.length === 0) {
      return;
    }

    const moveCursor = (step: number) => {
      const current = this.cursorIndex();
      const nextIndex = (current + step + ids.length) % ids.length;
      this.cursorIndex.set(nextIndex);
      this.commitSelection(ids[nextIndex], true);
    };

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      moveCursor(1);
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      moveCursor(-1);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      this.cursorIndex.set(0);
      this.commitSelection(ids[0], true);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      const lastIndex = ids.length - 1;
      this.cursorIndex.set(lastIndex);
      this.commitSelection(ids[lastIndex], true);
      return;
    }

    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      this.commitSelection(ids[this.cursorIndex()], true);
    }
  }

  formatLegendValue(segment: ResolvedDonutSegment): string {
    return formatChartValue(this.valueFormatter(), segment.value, {
      label: segment.label,
      index: this.resolvedSegments().findIndex((entry) => entry.id === segment.id),
      seriesId: segment.id,
    });
  }

  resolveLegendColor(segment: ResolvedDonutSegment, segmentIndex: number): string {
    return this.resolveSegmentColor(segment, segmentIndex);
  }

  private buildConfiguration(): ChartConfiguration<"doughnut"> {
    const segments = this.resolvedSegments();
    const formatter = this.valueFormatter();
    const borderWidth = resolveCssNumber(
      this.hostElement,
      "--k-donut-chart-chart-border-width",
      2,
    );
    const cutout = resolveCssVar(
      this.hostElement,
      "--k-donut-chart-chart-cutout",
      this.variant() === "withCenterMetric" ? "72%" : "64%",
    );

    const labels = segments.map((segment) => segment.label);
    const values = segments.map((segment) => segment.value);
    const colors = segments.map((segment, segmentIndex) =>
      this.resolveSegmentColor(segment, segmentIndex),
    );

    const data: ChartData<"doughnut", number[], string> = {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth,
        },
      ],
    };

    return {
      type: "doughnut",
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        cutout,
        onClick: (_event, elements) => {
          if (!this.isFocusable() || elements.length === 0) {
            return;
          }

          const element = elements[0];
          const segment = segments[element.index];
          if (segment === undefined) {
            return;
          }

          this.commitSelection(segment.id, true);
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: resolveCssVar(
              this.hostElement,
              "--k-color-bg-inverse",
              "#020617",
            ),
            titleColor: resolveCssVar(
              this.hostElement,
              "--k-color-text-inverse",
              "#ffffff",
            ),
            bodyColor: resolveCssVar(
              this.hostElement,
              "--k-color-text-inverse",
              "#ffffff",
            ),
            callbacks: {
              label: (tooltipItem) => {
                const segment = segments[tooltipItem.dataIndex];
                if (segment === undefined) {
                  return `${tooltipItem.raw}`;
                }

                const value = ensureFiniteNumber(segment.value) ?? 0;
                const formattedValue = formatChartValue(formatter, value, {
                  label: segment.label,
                  index: tooltipItem.dataIndex,
                  seriesId: segment.id,
                });
                return `${segment.label}: ${formattedValue}`;
              },
            },
          },
        },
      },
    };
  }

  private renderChart(
    canvas: HTMLCanvasElement,
    configuration: ChartConfiguration<"doughnut">,
  ): void {
    if (this.chart === null) {
      this.chart = new Chart(canvas, configuration);
      return;
    }

    this.chart.config.data = configuration.data;
    this.chart.config.options = configuration.options;
    this.chart.update();
  }

  private syncActiveSelection(): void {
    if (this.chart === null) {
      return;
    }

    const selectedSliceId = this.resolvedSelectedSliceId();
    if (selectedSliceId === null) {
      this.chart.setActiveElements([]);
      this.chart.update();
      return;
    }

    const index = this.resolvedSegments().findIndex(
      (segment) => segment.id === selectedSliceId,
    );
    if (index < 0) {
      this.chart.setActiveElements([]);
      this.chart.update();
      return;
    }

    this.chart.setActiveElements([
      {
        datasetIndex: 0,
        index,
      },
    ]);
    this.chart.update();
  }

  private commitSelection(nextSliceId: string, userTriggered: boolean): void {
    const previousSliceId = this.resolvedSelectedSliceId();
    if (previousSliceId === nextSliceId) {
      return;
    }

    this.internalSelectedSliceId.set(nextSliceId);
    this.selectionChanged.emit(
      buildSelectionChangeEvent(nextSliceId, previousSliceId, userTriggered),
    );
  }

  private resolveSegmentColor(
    segment: ResolvedDonutSegment,
    segmentIndex: number,
  ): string {
    if (segment.color !== null) {
      return segment.color;
    }

    const paletteIndex = (segmentIndex % 6) + 1;
    return resolveCssVar(
      this.hostElement,
      `--k-donut-chart-colors-segments-segment0${paletteIndex}` as `--${string}`,
      "#0ea5e9",
    );
  }

  private destroyChart(): void {
    if (this.chart === null) {
      return;
    }

    this.chart.destroy();
    this.chart = null;
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }
}
