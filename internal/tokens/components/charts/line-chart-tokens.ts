import { tokens } from "../../core";

const lineChartBaseStyle = {
  line: {
    width: "2px",
    pointRadius: "3px",
    pointHoverRadius: "4px",
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

const lineSeriesPalette = {
  series01: tokens.global.palette.brand.c500,
  series02: tokens.global.palette.secondary.c500,
  series03: tokens.global.palette.success.c500,
  series04: tokens.global.palette.warning.c500,
  series05: tokens.global.palette.accent.orange.c500,
} as const;

export const lineChartTokens = {
  styles: {
    base: lineChartBaseStyle,
    default: {
      loading: {
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          skeleton: tokens.theme.colors.border.subtle,
        },
      },
      ready: {
        interpolation: "linear",
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          tooltipBg: tokens.theme.colors.background.inverse,
          tooltipText: tokens.theme.colors.text.inverse,
          series: lineSeriesPalette,
        },
      },
      empty: {
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          stateText: tokens.theme.colors.text.secondary,
          stateIcon: tokens.theme.colors.text.secondary,
        },
      },
      error: {
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          stateText: tokens.theme.colors.state.danger.fg,
          stateIcon: tokens.theme.colors.state.danger.fg,
        },
      },
    },
    smooth: {
      loading: {
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          skeleton: tokens.theme.colors.border.subtle,
        },
      },
      ready: {
        interpolation: "monotone",
        tension: "0.35",
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          tooltipBg: tokens.theme.colors.background.inverse,
          tooltipText: tokens.theme.colors.text.inverse,
          series: lineSeriesPalette,
        },
      },
      empty: {
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          stateText: tokens.theme.colors.text.secondary,
          stateIcon: tokens.theme.colors.text.secondary,
        },
      },
      error: {
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          stateText: tokens.theme.colors.state.danger.fg,
          stateIcon: tokens.theme.colors.state.danger.fg,
        },
      },
    },
    stepped: {
      loading: {
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          skeleton: tokens.theme.colors.border.subtle,
        },
      },
      ready: {
        interpolation: "stepped",
        stepped: true,
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          tooltipBg: tokens.theme.colors.background.inverse,
          tooltipText: tokens.theme.colors.text.inverse,
          series: lineSeriesPalette,
        },
      },
      empty: {
        colors: {
          grid: tokens.theme.colors.border.subtle,
          axis: tokens.theme.colors.text.secondary,
          label: tokens.theme.colors.text.secondary,
          stateText: tokens.theme.colors.text.secondary,
          stateIcon: tokens.theme.colors.text.secondary,
        },
      },
      error: {
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

export type LineChartTokensContract = typeof lineChartTokens;
export type LineChartVariant = Exclude<keyof LineChartTokensContract["styles"], "base">;
export type LineChartState = keyof LineChartTokensContract["styles"]["default"];
