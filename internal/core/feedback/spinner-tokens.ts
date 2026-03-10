import { tokens } from "../../tokens";

const spinnerBaseStyle = {
  strokeWidth: tokens.global.baseStyle.borderWidth.default,
  motion: {
    duration: tokens.global.baseStyle.motion.duration.slow,
    easing: tokens.global.baseStyle.motion.ease.standard,
  },
  label: {
    family: tokens.global.typography.family.base,
    fontSize: tokens.global.typography.semantic.caption.fontSize,
    lineHeight: tokens.global.typography.semantic.caption.lineHeight,
    fontWeight: tokens.global.typography.semantic.body.fontWeight,
    gap: tokens.global.baseStyle.space.step2,
  },
} as const;

export const spinnerTokens = {
  styles: {
    sm: {
      default: {
        ...spinnerBaseStyle,
        size: tokens.global.icon.size.sm,
        colors: {
          indicator: tokens.theme.colors.action.primary.bg,
          track: tokens.theme.colors.background.elevated,
          label: tokens.theme.colors.text.secondary,
        },
      },
    },
    md: {
      default: {
        ...spinnerBaseStyle,
        size: tokens.global.icon.size.md,
        colors: {
          indicator: tokens.theme.colors.action.primary.bg,
          track: tokens.theme.colors.background.elevated,
          label: tokens.theme.colors.text.secondary,
        },
      },
    },
    lg: {
      default: {
        ...spinnerBaseStyle,
        size: tokens.global.icon.size.lg,
        colors: {
          indicator: tokens.theme.colors.action.primary.bg,
          track: tokens.theme.colors.background.elevated,
          label: tokens.theme.colors.text.secondary,
        },
      },
    },
  },
} as const;

export type SpinnerTokensContract = typeof spinnerTokens;
export type SpinnerVariant = keyof SpinnerTokensContract["styles"];
export type SpinnerState = keyof SpinnerTokensContract["styles"]["sm"];
