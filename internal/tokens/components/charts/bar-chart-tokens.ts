import { tokens } from "../../core";

const barChartBaseStyle = {
  bars: {
    borderRadius: tokens.global.baseStyle.radius.xs,
    maxBarThickness: "36px",
    categoryGap: "22%",
  },
  axes: {
    label: {
      family: tokens.global.typography.family.base,
      fontSize: tokens.global.typography.semantic.caption.fontSize,
      lineHeight: tokens.global.typography.semantic.caption.lineHeight,
      fontWeight: tokens.global.typography.semantic.body.fontWeight,
    },
    tickDensity: {
      mobile: "sparse",
      desktop: "normal",
    },
  },
  grid: {
    width: tokens.global.baseStyle.borderWidth.thin,
  },
  tooltip: {
    borderRadius: tokens.global.baseStyle.radius.sm,
    shadow: tokens.theme.elevation.shadow.sm,
  },
} as const;

const barSeriesPalette = {
  series01: tokens.global.palette.brand.c500,
  series02: tokens.global.palette.secondary.c500,
  series03: tokens.global.palette.success.c500,
  series04: tokens.global.palette.warning.c500,
  series05: tokens.global.palette.accent.orange.c500,
} as const;

export const barChartTokens = {
  styles: {
    vertical: {
      loading: {
        ...barChartBaseStyle,
        orientation: "vertical",
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          skeleton: tokens.theme.colors.border.subtle,
        },
      },
      ready: {
        ...barChartBaseStyle,
        orientation: "vertical",
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          tooltipBg: tokens.theme.colors.background.inverse,
          tooltipText: tokens.theme.colors.text.inverse,
          series: barSeriesPalette,
        },
      },
      empty: {
        ...barChartBaseStyle,
        orientation: "vertical",
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          stateText: tokens.theme.colors.text.secondary,
          stateIcon: tokens.theme.colors.text.secondary,
        },
      },
      error: {
        ...barChartBaseStyle,
        orientation: "vertical",
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          stateText: tokens.theme.colors.state.danger.fg,
          stateIcon: tokens.theme.colors.state.danger.fg,
        },
      },
    },
    horizontal: {
      loading: {
        ...barChartBaseStyle,
        orientation: "horizontal",
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          skeleton: tokens.theme.colors.border.subtle,
        },
      },
      ready: {
        ...barChartBaseStyle,
        orientation: "horizontal",
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          tooltipBg: tokens.theme.colors.background.inverse,
          tooltipText: tokens.theme.colors.text.inverse,
          series: barSeriesPalette,
        },
      },
      empty: {
        ...barChartBaseStyle,
        orientation: "horizontal",
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          stateText: tokens.theme.colors.text.secondary,
          stateIcon: tokens.theme.colors.text.secondary,
        },
      },
      error: {
        ...barChartBaseStyle,
        orientation: "horizontal",
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          stateText: tokens.theme.colors.state.danger.fg,
          stateIcon: tokens.theme.colors.state.danger.fg,
        },
      },
    },
    stacked: {
      loading: {
        ...barChartBaseStyle,
        orientation: "vertical",
        stacked: true,
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          skeleton: tokens.theme.colors.border.subtle,
        },
      },
      ready: {
        ...barChartBaseStyle,
        orientation: "vertical",
        stacked: true,
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          tooltipBg: tokens.theme.colors.background.inverse,
          tooltipText: tokens.theme.colors.text.inverse,
          series: barSeriesPalette,
        },
      },
      empty: {
        ...barChartBaseStyle,
        orientation: "vertical",
        stacked: true,
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          stateText: tokens.theme.colors.text.secondary,
          stateIcon: tokens.theme.colors.text.secondary,
        },
      },
      error: {
        ...barChartBaseStyle,
        orientation: "vertical",
        stacked: true,
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          stateText: tokens.theme.colors.state.danger.fg,
          stateIcon: tokens.theme.colors.state.danger.fg,
        },
      },
    },
  },
} as const;

export type BarChartTokensContract = typeof barChartTokens;
export type BarChartVariant = keyof BarChartTokensContract["styles"];
export type BarChartState = keyof BarChartTokensContract["styles"]["vertical"];
