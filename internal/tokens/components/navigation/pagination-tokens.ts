import { tokens } from "../../core";

const basePaginationStyle = {
  container: {
    gap: tokens.global.baseStyle.space.step2,
  },
  button: {
    minHeight: tokens.global.baseStyle.space.step8,
    minWidth: tokens.global.baseStyle.space.step8,
    paddingX: tokens.global.baseStyle.space.step2,
    paddingY: tokens.global.baseStyle.space.step1,
    radius: tokens.global.baseStyle.radius.md,
    borderWidth: tokens.global.baseStyle.borderWidth.thin,
    typography: {
      family: tokens.global.typography.family.base,
      fontSize: tokens.global.typography.semantic.label.fontSize,
      lineHeight: tokens.global.typography.semantic.label.lineHeight,
      fontWeight: tokens.global.typography.semantic.label.fontWeight,
    },
  },
  focus: {
    ringColor: tokens.theme.interactionState.focus.ring,
    outlineColor: tokens.theme.interactionState.focus.outline,
    shadow: tokens.theme.elevation.shadow.focus,
  },
  motion: {
    duration: tokens.global.baseStyle.motion.duration.fast,
    easing: tokens.global.baseStyle.motion.ease.standard,
  },
} as const;

export const paginationTokens = {
  styles: {
    default: {
      default: {
        ...basePaginationStyle,
        colors: {
          bg: tokens.theme.colors.action.secondary.bg,
          text: tokens.theme.colors.action.secondary.text,
          border: tokens.theme.colors.action.secondary.border,
        },
      },
      focusVisible: {
        ...basePaginationStyle,
        colors: {
          bg: tokens.theme.colors.action.secondary.bg,
          text: tokens.theme.colors.action.secondary.text,
          border: tokens.theme.interactionState.focus.ring,
        },
      },
      disabled: {
        ...basePaginationStyle,
        colors: {
          bg: tokens.theme.colors.action.secondary.disabledBg,
          text: tokens.theme.colors.action.secondary.disabledText,
          border: tokens.theme.colors.action.secondary.disabledBorder,
        },
        disabledOpacity: tokens.theme.interactionState.disabled.opacity,
      },
      active: {
        ...basePaginationStyle,
        colors: {
          bg: tokens.theme.colors.action.primary.bg,
          text: tokens.theme.colors.action.primary.text,
          border: tokens.theme.colors.action.primary.bg,
        },
      },
    },
    compact: {
      default: {
        ...basePaginationStyle,
        container: {
          gap: tokens.global.baseStyle.space.step1,
        },
        button: {
          ...basePaginationStyle.button,
          minHeight: tokens.global.baseStyle.space.step8,
          minWidth: tokens.global.baseStyle.space.step8,
          paddingX: tokens.global.baseStyle.space.step1,
          paddingY: tokens.global.baseStyle.space.step1,
        },
        colors: {
          bg: tokens.theme.colors.action.secondary.bg,
          text: tokens.theme.colors.action.secondary.text,
          border: tokens.theme.colors.action.secondary.border,
        },
      },
      focusVisible: {
        ...basePaginationStyle,
        container: {
          gap: tokens.global.baseStyle.space.step1,
        },
        button: {
          ...basePaginationStyle.button,
          minHeight: tokens.global.baseStyle.space.step8,
          minWidth: tokens.global.baseStyle.space.step8,
          paddingX: tokens.global.baseStyle.space.step1,
          paddingY: tokens.global.baseStyle.space.step1,
        },
        colors: {
          bg: tokens.theme.colors.action.secondary.bg,
          text: tokens.theme.colors.action.secondary.text,
          border: tokens.theme.interactionState.focus.ring,
        },
      },
      disabled: {
        ...basePaginationStyle,
        container: {
          gap: tokens.global.baseStyle.space.step1,
        },
        button: {
          ...basePaginationStyle.button,
          minHeight: tokens.global.baseStyle.space.step8,
          minWidth: tokens.global.baseStyle.space.step8,
          paddingX: tokens.global.baseStyle.space.step1,
          paddingY: tokens.global.baseStyle.space.step1,
        },
        colors: {
          bg: tokens.theme.colors.action.secondary.disabledBg,
          text: tokens.theme.colors.action.secondary.disabledText,
          border: tokens.theme.colors.action.secondary.disabledBorder,
        },
        disabledOpacity: tokens.theme.interactionState.disabled.opacity,
      },
      active: {
        ...basePaginationStyle,
        container: {
          gap: tokens.global.baseStyle.space.step1,
        },
        button: {
          ...basePaginationStyle.button,
          minHeight: tokens.global.baseStyle.space.step8,
          minWidth: tokens.global.baseStyle.space.step8,
          paddingX: tokens.global.baseStyle.space.step1,
          paddingY: tokens.global.baseStyle.space.step1,
        },
        colors: {
          bg: tokens.theme.colors.action.primary.bg,
          text: tokens.theme.colors.action.primary.text,
          border: tokens.theme.colors.action.primary.bg,
        },
      },
    },
  },
} as const;

export type PaginationTokensContract = typeof paginationTokens;
export type PaginationVariant = keyof PaginationTokensContract["styles"];
export type PaginationState = keyof PaginationTokensContract["styles"]["default"];
