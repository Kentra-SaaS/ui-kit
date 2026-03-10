import { tokens } from "../../tokens";

const baseKpiCardStyle = {
  border: {
    width: tokens.global.baseStyle.borderWidth.thin,
    radius: tokens.global.baseStyle.radius.lg,
  },
  spacing: {
    headerGap: tokens.global.baseStyle.space.step2,
    valueGap: tokens.global.baseStyle.space.step1,
    trendGap: tokens.global.baseStyle.space.step2,
    contentGap: tokens.global.baseStyle.space.step4,
  },
  typography: {
    label: {
      family: tokens.global.typography.family.base,
      fontSize: tokens.global.typography.semantic.caption.fontSize,
      lineHeight: tokens.global.typography.semantic.caption.lineHeight,
      fontWeight: tokens.global.typography.semantic.label.fontWeight,
    },
    value: {
      family: tokens.global.typography.family.heading,
      fontSize: tokens.global.typography.semantic.h3.fontSize,
      lineHeight: tokens.global.typography.semantic.h3.lineHeight,
      fontWeight: tokens.global.typography.semantic.heading.fontWeight,
    },
    delta: {
      family: tokens.global.typography.family.base,
      fontSize: tokens.global.typography.semantic.body.sm.fontSize,
      lineHeight: tokens.global.typography.semantic.body.sm.lineHeight,
      fontWeight: tokens.global.typography.semantic.label.fontWeight,
    },
  },
  shadow: tokens.theme.elevation.shadow.sm,
  motion: {
    duration: tokens.global.baseStyle.motion.duration.fast,
    easing: tokens.global.baseStyle.motion.ease.standard,
  },
} as const;

export const kpiCardTokens = {
  styles: {
    default: {
      default: {
        ...baseKpiCardStyle,
        size: {
          minHeight: tokens.global.baseStyle.space.step16,
          paddingX: tokens.global.baseStyle.space.step5,
          paddingY: tokens.global.baseStyle.space.step5,
        },
        colors: {
          bg: tokens.theme.colors.background.elevated,
          border: tokens.theme.colors.border.subtle,
          label: tokens.theme.colors.text.secondary,
          value: tokens.theme.colors.text.primary,
          delta: tokens.theme.colors.text.secondary,
        },
      },
      loading: {
        ...baseKpiCardStyle,
        size: {
          minHeight: tokens.global.baseStyle.space.step16,
          paddingX: tokens.global.baseStyle.space.step5,
          paddingY: tokens.global.baseStyle.space.step5,
        },
        colors: {
          bg: tokens.theme.colors.background.elevated,
          border: tokens.theme.colors.border.subtle,
          label: tokens.theme.colors.text.secondary,
          value: tokens.theme.colors.text.secondary,
          delta: tokens.theme.colors.text.secondary,
          skeleton: tokens.theme.colors.border.subtle,
        },
      },
      empty: {
        ...baseKpiCardStyle,
        size: {
          minHeight: tokens.global.baseStyle.space.step16,
          paddingX: tokens.global.baseStyle.space.step5,
          paddingY: tokens.global.baseStyle.space.step5,
        },
        colors: {
          bg: tokens.theme.colors.background.elevated,
          border: tokens.theme.colors.border.subtle,
          label: tokens.theme.colors.text.secondary,
          value: tokens.theme.colors.text.secondary,
          delta: tokens.theme.colors.text.secondary,
        },
      },
    },
    compact: {
      default: {
        ...baseKpiCardStyle,
        size: {
          minHeight: tokens.global.baseStyle.space.step12,
          paddingX: tokens.global.baseStyle.space.step4,
          paddingY: tokens.global.baseStyle.space.step4,
        },
        typography: {
          ...baseKpiCardStyle.typography,
          value: {
            ...baseKpiCardStyle.typography.value,
            fontSize: tokens.global.typography.semantic.h4.fontSize,
            lineHeight: tokens.global.typography.semantic.h4.lineHeight,
          },
        },
        colors: {
          bg: tokens.theme.colors.background.elevated,
          border: tokens.theme.colors.border.subtle,
          label: tokens.theme.colors.text.secondary,
          value: tokens.theme.colors.text.primary,
          delta: tokens.theme.colors.text.secondary,
        },
      },
      loading: {
        ...baseKpiCardStyle,
        size: {
          minHeight: tokens.global.baseStyle.space.step12,
          paddingX: tokens.global.baseStyle.space.step4,
          paddingY: tokens.global.baseStyle.space.step4,
        },
        typography: {
          ...baseKpiCardStyle.typography,
          value: {
            ...baseKpiCardStyle.typography.value,
            fontSize: tokens.global.typography.semantic.h4.fontSize,
            lineHeight: tokens.global.typography.semantic.h4.lineHeight,
          },
        },
        colors: {
          bg: tokens.theme.colors.background.elevated,
          border: tokens.theme.colors.border.subtle,
          label: tokens.theme.colors.text.secondary,
          value: tokens.theme.colors.text.secondary,
          delta: tokens.theme.colors.text.secondary,
          skeleton: tokens.theme.colors.border.subtle,
        },
      },
      empty: {
        ...baseKpiCardStyle,
        size: {
          minHeight: tokens.global.baseStyle.space.step12,
          paddingX: tokens.global.baseStyle.space.step4,
          paddingY: tokens.global.baseStyle.space.step4,
        },
        typography: {
          ...baseKpiCardStyle.typography,
          value: {
            ...baseKpiCardStyle.typography.value,
            fontSize: tokens.global.typography.semantic.h4.fontSize,
            lineHeight: tokens.global.typography.semantic.h4.lineHeight,
          },
        },
        colors: {
          bg: tokens.theme.colors.background.elevated,
          border: tokens.theme.colors.border.subtle,
          label: tokens.theme.colors.text.secondary,
          value: tokens.theme.colors.text.secondary,
          delta: tokens.theme.colors.text.secondary,
        },
      },
    },
    withTrend: {
      default: {
        ...baseKpiCardStyle,
        size: {
          minHeight: tokens.global.baseStyle.space.step16,
          paddingX: tokens.global.baseStyle.space.step5,
          paddingY: tokens.global.baseStyle.space.step5,
        },
        trend: {
          up: tokens.theme.colors.state.success.fg,
          down: tokens.theme.colors.state.danger.fg,
          neutral: tokens.theme.colors.text.secondary,
        },
        colors: {
          bg: tokens.theme.colors.background.elevated,
          border: tokens.theme.colors.border.subtle,
          label: tokens.theme.colors.text.secondary,
          value: tokens.theme.colors.text.primary,
          delta: tokens.theme.colors.text.secondary,
        },
      },
      loading: {
        ...baseKpiCardStyle,
        size: {
          minHeight: tokens.global.baseStyle.space.step16,
          paddingX: tokens.global.baseStyle.space.step5,
          paddingY: tokens.global.baseStyle.space.step5,
        },
        trend: {
          up: tokens.theme.colors.state.success.fg,
          down: tokens.theme.colors.state.danger.fg,
          neutral: tokens.theme.colors.text.secondary,
        },
        colors: {
          bg: tokens.theme.colors.background.elevated,
          border: tokens.theme.colors.border.subtle,
          label: tokens.theme.colors.text.secondary,
          value: tokens.theme.colors.text.secondary,
          delta: tokens.theme.colors.text.secondary,
          skeleton: tokens.theme.colors.border.subtle,
        },
      },
      empty: {
        ...baseKpiCardStyle,
        size: {
          minHeight: tokens.global.baseStyle.space.step16,
          paddingX: tokens.global.baseStyle.space.step5,
          paddingY: tokens.global.baseStyle.space.step5,
        },
        trend: {
          up: tokens.theme.colors.state.success.fg,
          down: tokens.theme.colors.state.danger.fg,
          neutral: tokens.theme.colors.text.secondary,
        },
        colors: {
          bg: tokens.theme.colors.background.elevated,
          border: tokens.theme.colors.border.subtle,
          label: tokens.theme.colors.text.secondary,
          value: tokens.theme.colors.text.secondary,
          delta: tokens.theme.colors.text.secondary,
        },
      },
    },
  },
} as const;

export type KpiCardTokensContract = typeof kpiCardTokens;
export type KpiCardVariant = keyof KpiCardTokensContract["styles"];
export type KpiCardState = keyof KpiCardTokensContract["styles"]["default"];
