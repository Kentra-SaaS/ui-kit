import { tokens } from "../../tokens";

const chartContainerBaseStyle = {
  container: {
    borderWidth: tokens.global.baseStyle.borderWidth.thin,
    borderRadius: tokens.global.baseStyle.radius.lg,
    shadow: tokens.theme.elevation.shadow.sm,
  },
  spacing: {
    headerGap: tokens.global.baseStyle.space.step2,
    bodyGap: tokens.global.baseStyle.space.step4,
    legendGap: tokens.global.baseStyle.space.step3,
    paddingX: tokens.global.baseStyle.space.step5,
    paddingY: tokens.global.baseStyle.space.step4,
  },
  typography: {
    title: {
      family: tokens.global.typography.family.heading,
      fontSize: tokens.global.typography.semantic.h5.fontSize,
      lineHeight: tokens.global.typography.semantic.h5.lineHeight,
      fontWeight: tokens.global.typography.semantic.heading.fontWeight,
    },
    description: {
      family: tokens.global.typography.family.base,
      fontSize: tokens.global.typography.semantic.body.sm.fontSize,
      lineHeight: tokens.global.typography.semantic.body.sm.lineHeight,
      fontWeight: tokens.global.typography.semantic.body.fontWeight,
    },
    stateText: {
      family: tokens.global.typography.family.base,
      fontSize: tokens.global.typography.semantic.body.md.fontSize,
      lineHeight: tokens.global.typography.semantic.body.md.lineHeight,
      fontWeight: tokens.global.typography.semantic.body.fontWeight,
    },
  },
  chartArea: {
    minHeightMobile: "17.5rem",
    minHeightDesktop: "20rem",
  },
} as const;

export const chartContainerTokens = {
  styles: {
    default: {
      loading: {
        ...chartContainerBaseStyle,
        colors: {
          bg: tokens.theme.colors.background.elevated,
          border: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          description: tokens.theme.colors.text.secondary,
          stateText: tokens.theme.colors.text.secondary,
          skeleton: tokens.theme.colors.border.subtle,
        },
      },
      ready: {
        ...chartContainerBaseStyle,
        colors: {
          bg: tokens.theme.colors.background.elevated,
          border: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          description: tokens.theme.colors.text.secondary,
          legendText: tokens.theme.colors.text.secondary,
        },
      },
      empty: {
        ...chartContainerBaseStyle,
        colors: {
          bg: tokens.theme.colors.background.elevated,
          border: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          description: tokens.theme.colors.text.secondary,
          stateText: tokens.theme.colors.text.secondary,
          stateIcon: tokens.theme.colors.text.secondary,
        },
      },
      error: {
        ...chartContainerBaseStyle,
        colors: {
          bg: tokens.theme.colors.background.elevated,
          border: tokens.theme.colors.state.danger.fg,
          title: tokens.theme.colors.text.primary,
          description: tokens.theme.colors.text.secondary,
          stateText: tokens.theme.colors.state.danger.fg,
          stateIcon: tokens.theme.colors.state.danger.fg,
        },
      },
    },
    compact: {
      loading: {
        ...chartContainerBaseStyle,
        spacing: {
          ...chartContainerBaseStyle.spacing,
          paddingX: tokens.global.baseStyle.space.step4,
          paddingY: tokens.global.baseStyle.space.step3,
          bodyGap: tokens.global.baseStyle.space.step3,
        },
        chartArea: {
          minHeightMobile: "15rem",
          minHeightDesktop: "17.5rem",
        },
        colors: {
          bg: tokens.theme.colors.background.elevated,
          border: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          description: tokens.theme.colors.text.secondary,
          stateText: tokens.theme.colors.text.secondary,
          skeleton: tokens.theme.colors.border.subtle,
        },
      },
      ready: {
        ...chartContainerBaseStyle,
        spacing: {
          ...chartContainerBaseStyle.spacing,
          paddingX: tokens.global.baseStyle.space.step4,
          paddingY: tokens.global.baseStyle.space.step3,
          bodyGap: tokens.global.baseStyle.space.step3,
        },
        chartArea: {
          minHeightMobile: "15rem",
          minHeightDesktop: "17.5rem",
        },
        colors: {
          bg: tokens.theme.colors.background.elevated,
          border: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          description: tokens.theme.colors.text.secondary,
          legendText: tokens.theme.colors.text.secondary,
        },
      },
      empty: {
        ...chartContainerBaseStyle,
        spacing: {
          ...chartContainerBaseStyle.spacing,
          paddingX: tokens.global.baseStyle.space.step4,
          paddingY: tokens.global.baseStyle.space.step3,
          bodyGap: tokens.global.baseStyle.space.step3,
        },
        chartArea: {
          minHeightMobile: "15rem",
          minHeightDesktop: "17.5rem",
        },
        colors: {
          bg: tokens.theme.colors.background.elevated,
          border: tokens.theme.colors.border.subtle,
          title: tokens.theme.colors.text.primary,
          description: tokens.theme.colors.text.secondary,
          stateText: tokens.theme.colors.text.secondary,
          stateIcon: tokens.theme.colors.text.secondary,
        },
      },
      error: {
        ...chartContainerBaseStyle,
        spacing: {
          ...chartContainerBaseStyle.spacing,
          paddingX: tokens.global.baseStyle.space.step4,
          paddingY: tokens.global.baseStyle.space.step3,
          bodyGap: tokens.global.baseStyle.space.step3,
        },
        chartArea: {
          minHeightMobile: "15rem",
          minHeightDesktop: "17.5rem",
        },
        colors: {
          bg: tokens.theme.colors.background.elevated,
          border: tokens.theme.colors.state.danger.fg,
          title: tokens.theme.colors.text.primary,
          description: tokens.theme.colors.text.secondary,
          stateText: tokens.theme.colors.state.danger.fg,
          stateIcon: tokens.theme.colors.state.danger.fg,
        },
      },
    },
  },
} as const;

export type ChartContainerTokensContract = typeof chartContainerTokens;
export type ChartContainerVariant = keyof ChartContainerTokensContract["styles"];
export type ChartContainerState = keyof ChartContainerTokensContract["styles"]["default"];
