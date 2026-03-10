import { tokens } from "../../tokens";

const baseButtonStyle = {
  border: {
    width: tokens.global.baseStyle.borderWidth.thin,
    radius: tokens.global.baseStyle.radius.md,
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
  disabledOpacity: tokens.theme.interactionState.disabled.opacity,
  loading: {
    spinnerSize: tokens.global.icon.size.sm,
    contentOpacity: tokens.theme.interactionState.disabled.opacity,
  },
} as const;

const primaryBaseColors = {
  bg: tokens.theme.colors.action.primary.bg,
  text: tokens.theme.colors.action.primary.text,
  border: tokens.theme.colors.action.primary.bg,
  icon: tokens.theme.colors.action.primary.text,
} as const;

const secondaryBaseColors = {
  bg: tokens.theme.colors.action.secondary.bg,
  text: tokens.theme.colors.action.secondary.text,
  border: tokens.theme.colors.action.secondary.border,
  icon: tokens.theme.colors.action.secondary.text,
} as const;

const tertiaryBaseColors = {
  bg: tokens.theme.colors.background.surface,
  text: tokens.theme.colors.link.default,
  border: tokens.theme.colors.border.subtle,
  icon: tokens.theme.colors.link.default,
} as const;

const dangerBaseColors = {
  bg: tokens.global.palette.danger.c700,
  text: tokens.global.palette.neutral.c0,
  border: tokens.global.palette.danger.c700,
  icon: tokens.global.palette.neutral.c0,
} as const;

export const buttonTokens = {
  size: {
    sm: {
      minHeight: tokens.global.baseStyle.space.step8,
      paddingX: tokens.global.baseStyle.space.step3,
      paddingY: tokens.global.baseStyle.space.step2,
      gap: tokens.global.baseStyle.space.step2,
      font: {
        family: tokens.global.typography.family.base,
        size: tokens.global.typography.semantic.body.sm.fontSize,
        weight: tokens.global.typography.weight.medium,
        lineHeight: tokens.global.typography.semantic.body.sm.lineHeight,
      },
      iconSize: tokens.global.icon.size.sm,
    },
    md: {
      minHeight: tokens.global.baseStyle.space.step10,
      paddingX: tokens.global.baseStyle.space.step4,
      paddingY: tokens.global.baseStyle.space.step2,
      gap: tokens.global.baseStyle.space.step2,
      font: {
        family: tokens.global.typography.family.base,
        size: tokens.global.typography.semantic.body.md.fontSize,
        weight: tokens.global.typography.weight.medium,
        lineHeight: tokens.global.typography.semantic.body.md.lineHeight,
      },
      iconSize: tokens.global.icon.size.md,
    },
    lg: {
      minHeight: tokens.global.baseStyle.space.step12,
      paddingX: tokens.global.baseStyle.space.step5,
      paddingY: tokens.global.baseStyle.space.step3,
      gap: tokens.global.baseStyle.space.step3,
      font: {
        family: tokens.global.typography.family.base,
        size: tokens.global.typography.semantic.body.lg.fontSize,
        weight: tokens.global.typography.weight.semibold,
        lineHeight: tokens.global.typography.semantic.body.lg.lineHeight,
      },
      iconSize: tokens.global.icon.size.lg,
    },
  },
  styles: {
    primary: {
      default: {
        ...baseButtonStyle,
        colors: primaryBaseColors,
      },
      hover: {
        ...baseButtonStyle,
        colors: {
          bg: tokens.theme.colors.action.primary.bgHover,
          text: tokens.theme.colors.action.primary.text,
          border: tokens.theme.colors.action.primary.bgHover,
          icon: tokens.theme.colors.action.primary.text,
        },
      },
      active: {
        ...baseButtonStyle,
        colors: {
          bg: tokens.theme.colors.action.primary.bgActive,
          text: tokens.theme.colors.action.primary.text,
          border: tokens.theme.colors.action.primary.bgActive,
          icon: tokens.theme.colors.action.primary.text,
        },
      },
      focusVisible: {
        ...baseButtonStyle,
        colors: {
          bg: tokens.theme.colors.action.primary.bg,
          text: tokens.theme.colors.action.primary.text,
          border: tokens.theme.colors.action.primary.bg,
          icon: tokens.theme.colors.action.primary.text,
        },
      },
      disabled: {
        ...baseButtonStyle,
        colors: {
          bg: tokens.theme.colors.action.primary.disabledBg,
          text: tokens.theme.colors.action.primary.disabledText,
          border: tokens.theme.colors.action.primary.disabledBg,
          icon: tokens.theme.interactionState.disabled.icon,
        },
      },
      loading: {
        ...baseButtonStyle,
        colors: primaryBaseColors,
      },
    },
    secondary: {
      default: {
        ...baseButtonStyle,
        colors: secondaryBaseColors,
      },
      hover: {
        ...baseButtonStyle,
        colors: {
          bg: tokens.theme.colors.action.secondary.bgHover,
          text: tokens.theme.colors.action.secondary.text,
          border: tokens.theme.colors.action.secondary.border,
          icon: tokens.theme.colors.action.secondary.text,
        },
      },
      active: {
        ...baseButtonStyle,
        colors: {
          bg: tokens.theme.colors.action.secondary.bgActive,
          text: tokens.theme.colors.action.secondary.text,
          border: tokens.theme.colors.action.secondary.border,
          icon: tokens.theme.colors.action.secondary.text,
        },
      },
      focusVisible: {
        ...baseButtonStyle,
        colors: {
          bg: tokens.theme.colors.action.secondary.bg,
          text: tokens.theme.colors.action.secondary.text,
          border: tokens.theme.colors.action.secondary.border,
          icon: tokens.theme.colors.action.secondary.text,
        },
      },
      disabled: {
        ...baseButtonStyle,
        colors: {
          bg: tokens.theme.colors.action.secondary.disabledBg,
          text: tokens.theme.colors.action.secondary.disabledText,
          border: tokens.theme.colors.action.secondary.disabledBorder,
          icon: tokens.theme.interactionState.disabled.icon,
        },
      },
      loading: {
        ...baseButtonStyle,
        colors: secondaryBaseColors,
      },
    },
    tertiary: {
      default: {
        ...baseButtonStyle,
        colors: tertiaryBaseColors,
      },
      hover: {
        ...baseButtonStyle,
        colors: {
          bg: tokens.theme.interactionState.hoverOverlay,
          text: tokens.theme.colors.link.hover,
          border: tokens.theme.colors.border.default,
          icon: tokens.theme.colors.link.hover,
        },
      },
      active: {
        ...baseButtonStyle,
        colors: {
          bg: tokens.theme.interactionState.activeOverlay,
          text: tokens.theme.colors.link.default,
          border: tokens.theme.colors.border.default,
          icon: tokens.theme.colors.link.default,
        },
      },
      focusVisible: {
        ...baseButtonStyle,
        colors: {
          bg: tokens.theme.colors.background.surface,
          text: tokens.theme.colors.link.default,
          border: tokens.theme.interactionState.focus.ring,
          icon: tokens.theme.colors.link.default,
        },
      },
      disabled: {
        ...baseButtonStyle,
        colors: {
          bg: tokens.theme.interactionState.disabled.bg,
          text: tokens.theme.interactionState.disabled.text,
          border: tokens.theme.interactionState.disabled.border,
          icon: tokens.theme.interactionState.disabled.icon,
        },
      },
      loading: {
        ...baseButtonStyle,
        colors: tertiaryBaseColors,
      },
    },
    danger: {
      default: {
        ...baseButtonStyle,
        colors: dangerBaseColors,
      },
      hover: {
        ...baseButtonStyle,
        colors: {
          bg: tokens.global.palette.danger.c500,
          text: tokens.global.palette.neutral.c0,
          border: tokens.global.palette.danger.c500,
          icon: tokens.global.palette.neutral.c0,
        },
      },
      active: {
        ...baseButtonStyle,
        colors: {
          bg: tokens.global.palette.danger.c700,
          text: tokens.global.palette.neutral.c0,
          border: tokens.global.palette.danger.c700,
          icon: tokens.global.palette.neutral.c0,
        },
      },
      focusVisible: {
        ...baseButtonStyle,
        colors: {
          bg: tokens.global.palette.danger.c700,
          text: tokens.global.palette.neutral.c0,
          border: tokens.theme.interactionState.focus.ring,
          icon: tokens.global.palette.neutral.c0,
        },
      },
      disabled: {
        ...baseButtonStyle,
        colors: {
          bg: tokens.theme.interactionState.disabled.bg,
          text: tokens.theme.interactionState.disabled.text,
          border: tokens.theme.interactionState.disabled.border,
          icon: tokens.theme.interactionState.disabled.icon,
        },
      },
      loading: {
        ...baseButtonStyle,
        colors: dangerBaseColors,
      },
    },
  },
} as const;

export type ButtonTokensContract = typeof buttonTokens;
export type ButtonSize = keyof ButtonTokensContract["size"];
export type ButtonVariant = keyof ButtonTokensContract["styles"];
export type ButtonState = keyof ButtonTokensContract["styles"]["primary"];
