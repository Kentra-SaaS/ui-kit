export type KentraChartValueFormatter = (
  value: number,
  context: {
    readonly label: string | null;
    readonly index: number;
    readonly seriesId: string | null;
  },
) => string;

export interface KentraBarChartSeries {
  readonly id: string;
  readonly label: string;
  readonly values: readonly number[];
  readonly color?: string | null;
}

export type KentraLineChartSeries = KentraBarChartSeries;

export interface KentraDonutChartSegment {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly color?: string | null;
}
