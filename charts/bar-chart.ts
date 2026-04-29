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
  type ChartDataset,
} from "chart.js";
import "chart.js/auto";

import {
  BarChartState,
  BarChartVariant,
  barChartStyleMap,
  KentraBarChartContract,
  KentraElementBase,
} from "@kentra-saas/ui-kit";
import type {
  KentraBarChartSeries,
  KentraChartValueFormatter,
} from "./chart-models";
import {
  buildSelectionChangeEvent,
  ensureFiniteNumber,
  formatChartValue,
  normalizeSeriesId,
  normalizeText,
  resolveCssNumber,
  resolveCssVar,
  type KentraChartSelectionChangeEvent,
} from "./chart-utils";

type ResolvedBarSeries = {
  readonly id: string;
  readonly label: string;
  readonly values: readonly (number | null)[];
  readonly color: string | null;
};

@Component({
  selector: "k-bar-chart",
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
        <canvas #canvasElement class="canvas"></canvas>
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
      position: relative;
      inline-size: 100%;
      min-inline-size: 0;
      min-block-size: var(--k-chart-container-chart-area-min-height-desktop, 20rem);
    }

    .canvas {
      display: block;
      inline-size: 100%;
      block-size: 100%;
      min-block-size: inherit;
    }

    .state {
      display: grid;
      place-items: center;
      min-block-size: inherit;
      inline-size: 100%;
      text-align: center;
      color: var(--k-bar-chart-colors-state-text, currentColor);
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
      place-items: stretch;
    }

    .skeleton {
      inline-size: 100%;
      min-block-size: inherit;
      border-radius: var(--k-radius-sm);
      background: linear-gradient(
        90deg,
        var(--k-bar-chart-colors-skeleton, var(--k-color-border-subtle)),
        color-mix(in srgb, var(--k-bar-chart-colors-skeleton, var(--k-color-border-subtle)) 64%, transparent),
        var(--k-bar-chart-colors-skeleton, var(--k-color-border-subtle))
      );
      background-size: 200% 100%;
      animation: k-bar-chart-skeleton 1.2s linear infinite;
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

    @keyframes k-bar-chart-skeleton {
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
        min-block-size: max(var(--k-chart-container-chart-area-min-height-mobile, 17.5rem), 16rem);
      }
    }
  `,
})
export class KentraBarChart
  extends KentraElementBase
  implements KentraBarChartContract, OnDestroy
{
  readonly variant = input<BarChartVariant>("vertical");
  readonly state = input<BarChartState>("ready");
  readonly labels = input<readonly string[]>([]);
  readonly series = input<readonly KentraBarChartSeries[]>([]);
  readonly ariaLabel = input<string | null>(null);
  readonly interactive = input<boolean>(true);
  readonly disabled = input<boolean>(false);
  readonly valueFormatter = input<KentraChartValueFormatter | null>(null);
  readonly emptyLabel = input<string | null>("Keine Daten verfuegbar.");
  readonly errorLabel = input<string | null>("Diagramm konnte nicht geladen werden.");
  readonly selectedPointId = input<string | null>(null);
  readonly selectionChanged = output<KentraChartSelectionChangeEvent>();

  readonly resolvedAriaLabel = computed(
    () =>
      normalizeText(this.ariaLabel()) ??
      "Bar chart",
  );
  readonly resolvedLabels = computed(() => this.labels().map((label) => `${label}`));
  readonly resolvedSeries = computed<readonly ResolvedBarSeries[]>(() => {
    const labels = this.resolvedLabels();

    return this.series()
      .map((series, seriesIndex) => {
        const id = normalizeSeriesId(series.id, seriesIndex);
        const label = normalizeText(series.label) ?? id;
        const values = labels.map((_, valueIndex) =>
          ensureFiniteNumber(series.values[valueIndex] ?? null),
        );
        const color = normalizeText(series.color ?? null);

        return {
          id,
          label,
          values,
          color,
        } satisfies ResolvedBarSeries;
      })
      .filter((series) => series.values.some((value) => value !== null));
  });
  readonly pointIds = computed(() => {
    const ids: string[] = [];
    const labels = this.resolvedLabels();

    for (const series of this.resolvedSeries()) {
      for (let dataIndex = 0; dataIndex < labels.length; dataIndex += 1) {
        if (series.values[dataIndex] === null) {
          continue;
        }

        ids.push(this.buildPointId(series.id, dataIndex));
      }
    }

    return ids;
  });
  readonly resolvedSelectedPointId = computed(
    () => this.selectedPointId() ?? this.internalSelectedPointId(),
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

  protected readonly baseClass = barChartStyleMap.baseClass;

  private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly themeVersion = signal(0);
  private readonly internalSelectedPointId = signal<string | null>(null);
  private readonly cursorIndex = signal(0);
  private chart: Chart<"bar"> | null = null;

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

  onHostKeydown(event: KeyboardEvent): void {
    if (!this.isFocusable()) {
      return;
    }

    const points = this.pointIds();
    if (points.length === 0) {
      return;
    }

    const moveCursor = (step: number) => {
      const current = this.cursorIndex();
      const nextIndex = (current + step + points.length) % points.length;
      this.cursorIndex.set(nextIndex);
      this.commitSelection(points[nextIndex], true);
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
      this.commitSelection(points[0], true);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      const lastIndex = points.length - 1;
      this.cursorIndex.set(lastIndex);
      this.commitSelection(points[lastIndex], true);
      return;
    }

    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      this.commitSelection(points[this.cursorIndex()], true);
    }
  }

  private buildConfiguration(): ChartConfiguration<"bar"> {
    const labels = this.resolvedLabels();
    const series = this.resolvedSeries();
    const formatter = this.valueFormatter();
    const orientation = resolveCssVar(
      this.hostElement,
      "--k-bar-chart-orientation",
      this.variant() === "horizontal" ? "horizontal" : "vertical",
    );
    const indexAxis = orientation === "horizontal" ? "y" : "x";
    const stacked = this.variant() === "stacked";
    const gridColor = resolveCssVar(
      this.hostElement,
      "--k-bar-chart-colors-grid",
      "#cbd5e1",
    );
    const axisColor = resolveCssVar(
      this.hostElement,
      "--k-bar-chart-colors-axis",
      "#475569",
    );
    const tooltipBackground = resolveCssVar(
      this.hostElement,
      "--k-bar-chart-colors-tooltip-bg",
      "#020617",
    );
    const tooltipText = resolveCssVar(
      this.hostElement,
      "--k-bar-chart-colors-tooltip-text",
      "#ffffff",
    );
    const borderRadius = resolveCssNumber(
      this.hostElement,
      "--k-bar-chart-bars-border-radius",
      2,
    );
    const maxBarThickness = resolveCssNumber(
      this.hostElement,
      "--k-bar-chart-bars-max-bar-thickness",
      36,
    );
    const maxTicks =
      typeof window !== "undefined" && window.innerWidth <= 768 ? 6 : 10;

    const datasets: ChartDataset<"bar", (number | null)[]>[] = series.map(
      (seriesEntry, seriesIndex) => {
        const color = this.resolveSeriesColor(seriesEntry, seriesIndex);

        return {
          label: seriesEntry.label,
          data: [...seriesEntry.values],
          backgroundColor: color,
          borderColor: color,
          borderRadius,
          maxBarThickness,
          borderSkipped: false,
        };
      },
    );

    const data: ChartData<"bar", (number | null)[], string> = {
      labels: [...labels],
      datasets,
    };

    const valueAxis = indexAxis === "x" ? "y" : "x";
    const categoryAxis = indexAxis === "x" ? "x" : "y";

    return {
      type: "bar",
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        indexAxis,
        interaction: {
          mode: "nearest",
          axis: valueAxis,
          intersect: true,
        },
        onClick: (_event, elements) => {
          if (!this.isFocusable() || elements.length === 0) {
            return;
          }

          const element = elements[0];
          const dataset = series[element.datasetIndex];
          if (dataset === undefined) {
            return;
          }

          const pointId = this.buildPointId(dataset.id, element.index);
          this.commitSelection(pointId, true);
        },
        scales: {
          [categoryAxis]: {
            stacked,
            grid: {
              color: gridColor,
            },
            ticks: {
              color: axisColor,
              autoSkip: true,
              maxTicksLimit: maxTicks,
            },
          },
          [valueAxis]: {
            stacked,
            grid: {
              color: gridColor,
            },
            ticks: {
              color: axisColor,
              callback: (value) => {
                const numericValue = typeof value === "number" ? value : Number(value);
                if (!Number.isFinite(numericValue)) {
                  return `${value}`;
                }

                return formatChartValue(formatter, numericValue, {
                  label: null,
                  index: -1,
                  seriesId: null,
                });
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: tooltipBackground,
            titleColor: tooltipText,
            bodyColor: tooltipText,
            callbacks: {
              label: (tooltipItem) => {
                const dataset = series[tooltipItem.datasetIndex];
                if (dataset === undefined) {
                  return `${tooltipItem.raw}`;
                }

                const value = ensureFiniteNumber(
                  indexAxis === "x"
                    ? (tooltipItem.parsed as { y: number }).y
                    : (tooltipItem.parsed as { x: number }).x,
                );
                if (value === null) {
                  return `${tooltipItem.raw}`;
                }

                const label = labels[tooltipItem.dataIndex] ?? null;
                const formatted = formatChartValue(formatter, value, {
                  label,
                  index: tooltipItem.dataIndex,
                  seriesId: dataset.id,
                });

                return `${dataset.label}: ${formatted}`;
              },
            },
          },
        },
      },
    };
  }

  private renderChart(
    canvas: HTMLCanvasElement,
    configuration: ChartConfiguration<"bar">,
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

    const selectedPointId = this.resolvedSelectedPointId();
    if (selectedPointId === null) {
      this.chart.setActiveElements([]);
      this.chart.update();
      return;
    }

    const target = this.parsePointId(selectedPointId);
    if (target === null) {
      this.chart.setActiveElements([]);
      this.chart.update();
      return;
    }

    const datasetIndex = this.resolvedSeries().findIndex(
      (series) => series.id === target.seriesId,
    );

    if (datasetIndex < 0) {
      this.chart.setActiveElements([]);
      this.chart.update();
      return;
    }

    this.chart.setActiveElements([
      {
        datasetIndex,
        index: target.dataIndex,
      },
    ]);
    this.chart.update();
  }

  private commitSelection(nextPointId: string, userTriggered: boolean): void {
    const previousPointId = this.resolvedSelectedPointId();
    if (previousPointId === nextPointId) {
      return;
    }

    this.internalSelectedPointId.set(nextPointId);
    this.selectionChanged.emit(
      buildSelectionChangeEvent(nextPointId, previousPointId, userTriggered),
    );
  }

  private resolveSeriesColor(
    series: ResolvedBarSeries,
    seriesIndex: number,
  ): string {
    if (series.color !== null) {
      return series.color;
    }

    const paletteIndex = (seriesIndex % 5) + 1;
    return resolveCssVar(
      this.hostElement,
      `--k-bar-chart-colors-series-series0${paletteIndex}` as `--${string}`,
      "#0ea5e9",
    );
  }

  private buildPointId(seriesId: string, dataIndex: number): string {
    return `${seriesId}:${dataIndex}`;
  }

  private parsePointId(
    pointId: string,
  ): {
    readonly seriesId: string;
    readonly dataIndex: number;
  } | null {
    const separatorIndex = pointId.lastIndexOf(":");
    if (separatorIndex <= 0) {
      return null;
    }

    const seriesId = pointId.slice(0, separatorIndex);
    const dataIndexRaw = pointId.slice(separatorIndex + 1);
    const dataIndex = Number.parseInt(dataIndexRaw, 10);

    if (seriesId.length === 0 || !Number.isInteger(dataIndex) || dataIndex < 0) {
      return null;
    }

    return {
      seriesId,
      dataIndex,
    };
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
