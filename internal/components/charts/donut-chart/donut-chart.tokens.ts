import { tokens } from "../../../core/tokens";

const donutChartBaseStyle = {
  chart: {
    cutoutDefault: "64%",
    cutoutWithCenterMetric: "72%",
    borderWidth: "2px",
  },
  legend: {
    gap: tokens.global.baseStyle.space.step2,
    markerSize: tokens.global.baseStyle.space.step2,
  },
  centerMetric: {
    value: {
      family: tokens.global.typography.family.heading,
      fontSize: tokens.global.typography.semantic.h4.fontSize,
      lineHeight: tokens.global.typography.semantic.h4.lineHeight,
      fontWeight: tokens.global.typography.semantic.heading.fontWeight,
    },
    label: {
      family: tokens.global.typography.family.base,
      fontSize: tokens.global.typography.semantic.caption.fontSize,
      lineHeight: tokens.global.typography.semantic.caption.lineHeight,
      fontWeight: tokens.global.typography.semantic.body.fontWeight,
    },
  },
} as const;

const donutSegmentPalette = {
  segment01: tokens.global.palette.brand.c500,
  segment02: tokens.global.palette.secondary.c500,
  segment03: tokens.global.palette.success.c500,
  segment04: tokens.global.palette.warning.c500,
  segment05: tokens.global.palette.accent.orange.c500,
  segment06: tokens.global.palette.brand.c300,
} as const;

export const donutChartTokens = {
  styles: {
    base: donutChartBaseStyle,
    default: {
      loading: {
        colors: {
          skeleton: tokens.theme.colors.border.subtle,
          legendText: tokens.theme.colors.text.secondary,
        },
      },
      ready: {
        chart: {
          ...donutChartBaseStyle.chart,
          cutout: donutChartBaseStyle.chart.cutoutDefault,
        },
        colors: {
          segments: donutSegmentPalette,
          legendText: tokens.theme.colors.text.secondary,
          centerValue: tokens.theme.colors.text.primary,
          centerLabel: tokens.theme.colors.text.secondary,
        },
      },
      empty: {
        colors: {
          placeholderSegment: tokens.theme.colors.border.subtle,
          legendText: tokens.theme.colors.text.secondary,
          stateText: tokens.theme.colors.text.secondary,
          stateIcon: tokens.theme.colors.text.secondary,
        },
      },
      error: {
        colors: {
          placeholderSegment: tokens.theme.colors.state.danger.bg,
          legendText: tokens.theme.colors.text.secondary,
          stateText: tokens.theme.colors.state.danger.fg,
          stateIcon: tokens.theme.colors.state.danger.fg,
        },
      },
    },
    withCenterMetric: {
      loading: {
        chart: {
          ...donutChartBaseStyle.chart,
          cutout: donutChartBaseStyle.chart.cutoutWithCenterMetric,
        },
        colors: {
          skeleton: tokens.theme.colors.border.subtle,
          legendText: tokens.theme.colors.text.secondary,
        },
      },
      ready: {
        chart: {
          ...donutChartBaseStyle.chart,
          cutout: donutChartBaseStyle.chart.cutoutWithCenterMetric,
        },
        colors: {
          segments: donutSegmentPalette,
          legendText: tokens.theme.colors.text.secondary,
          centerValue: tokens.theme.colors.text.primary,
          centerLabel: tokens.theme.colors.text.secondary,
        },
      },
      empty: {
        chart: {
          ...donutChartBaseStyle.chart,
          cutout: donutChartBaseStyle.chart.cutoutWithCenterMetric,
        },
        colors: {
          placeholderSegment: tokens.theme.colors.border.subtle,
          legendText: tokens.theme.colors.text.secondary,
          stateText: tokens.theme.colors.text.secondary,
          stateIcon: tokens.theme.colors.text.secondary,
        },
      },
      error: {
        chart: {
          ...donutChartBaseStyle.chart,
          cutout: donutChartBaseStyle.chart.cutoutWithCenterMetric,
        },
        colors: {
          placeholderSegment: tokens.theme.colors.state.danger.bg,
          legendText: tokens.theme.colors.text.secondary,
          stateText: tokens.theme.colors.state.danger.fg,
          stateIcon: tokens.theme.colors.state.danger.fg,
        },
      },
    },
  },
} as const;

export type DonutChartTokensContract = typeof donutChartTokens;
export type DonutChartVariant = Exclude<keyof DonutChartTokensContract["styles"], "base">;
export type DonutChartState = keyof DonutChartTokensContract["styles"]["default"];
