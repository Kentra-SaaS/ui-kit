import { tokens } from "../../tokens";

const baseIconButtonStyle = {
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
} as const;

const primaryBaseColors = {
  bg: tokens.theme.colors.action.primary.bg,
  border: tokens.theme.colors.action.primary.bg,
  icon: tokens.theme.colors.action.primary.text,
} as const;

const secondaryBaseColors = {
  bg: tokens.theme.colors.action.secondary.bg,
  border: tokens.theme.colors.action.secondary.border,
  icon: tokens.theme.colors.action.secondary.text,
} as const;

const tertiaryBaseColors = {
  bg: tokens.theme.colors.background.surface,
  border: tokens.theme.colors.border.subtle,
  icon: tokens.theme.colors.link.default,
} as const;

const dangerBaseColors = {
  bg: tokens.global.palette.danger.c700,
  border: tokens.global.palette.danger.c700,
  icon: tokens.global.palette.neutral.c0,
} as const;

export const iconButtonTokens = {
  size: {
    sm: {
      minHeight: tokens.global.baseStyle.space.step10,
      minWidth: tokens.global.baseStyle.space.step10,
      padding: tokens.global.baseStyle.space.step2,
      iconSize: tokens.global.icon.size.sm,
    },
    md: {
      minHeight: tokens.global.baseStyle.space.step12,
      minWidth: tokens.global.baseStyle.space.step12,
      padding: tokens.global.baseStyle.space.step3,
      iconSize: tokens.global.icon.size.md,
    },
    lg: {
      minHeight: tokens.global.baseStyle.space.step16,
      minWidth: tokens.global.baseStyle.space.step16,
      padding: tokens.global.baseStyle.space.step4,
      iconSize: tokens.global.icon.size.lg,
    },
  },
  styles: {
    primary: {
      default: {
        ...baseIconButtonStyle,
        colors: primaryBaseColors,
      },
      hover: {
        ...baseIconButtonStyle,
        colors: {
          bg: tokens.theme.colors.action.primary.bgHover,
          border: tokens.theme.colors.action.primary.bgHover,
          icon: tokens.theme.colors.action.primary.text,
        },
      },
      focusVisible: {
        ...baseIconButtonStyle,
        colors: {
          bg: tokens.theme.colors.action.primary.bg,
          border: tokens.theme.interactionState.focus.ring,
          icon: tokens.theme.colors.action.primary.text,
        },
      },
      active: {
        ...baseIconButtonStyle,
        colors: {
          bg: tokens.theme.colors.action.primary.bgActive,
          border: tokens.theme.colors.action.primary.bgActive,
          icon: tokens.theme.colors.action.primary.text,
        },
      },
      disabled: {
        ...baseIconButtonStyle,
        colors: {
          bg: tokens.theme.colors.action.primary.disabledBg,
          border: tokens.theme.colors.action.primary.disabledBg,
          icon: tokens.theme.interactionState.disabled.icon,
        },
      },
    },
    secondary: {
      default: {
        ...baseIconButtonStyle,
        colors: secondaryBaseColors,
      },
      hover: {
        ...baseIconButtonStyle,
        colors: {
          bg: tokens.theme.colors.action.secondary.bgHover,
          border: tokens.theme.colors.action.secondary.border,
          icon: tokens.theme.colors.action.secondary.text,
        },
      },
      focusVisible: {
        ...baseIconButtonStyle,
        colors: {
          bg: tokens.theme.colors.action.secondary.bg,
          border: tokens.theme.interactionState.focus.ring,
          icon: tokens.theme.colors.action.secondary.text,
        },
      },
      active: {
        ...baseIconButtonStyle,
        colors: {
          bg: tokens.theme.colors.action.secondary.bgActive,
          border: tokens.theme.colors.action.secondary.border,
          icon: tokens.theme.colors.action.secondary.text,
        },
      },
      disabled: {
        ...baseIconButtonStyle,
        colors: {
          bg: tokens.theme.colors.action.secondary.disabledBg,
          border: tokens.theme.colors.action.secondary.disabledBorder,
          icon: tokens.theme.interactionState.disabled.icon,
        },
      },
    },
    danger: {
      default: {
        ...baseIconButtonStyle,
        colors: dangerBaseColors,
      },
      hover: {
        ...baseIconButtonStyle,
        colors: {
          bg: tokens.global.palette.danger.c500,
          border: tokens.global.palette.danger.c500,
          icon: tokens.global.palette.neutral.c0,
        },
      },
      focusVisible: {
        ...baseIconButtonStyle,
        colors: {
          bg: tokens.global.palette.danger.c700,
          border: tokens.theme.interactionState.focus.ring,
          icon: tokens.global.palette.neutral.c0,
        },
      },
      active: {
        ...baseIconButtonStyle,
        colors: {
          bg: tokens.global.palette.danger.c700,
          border: tokens.global.palette.danger.c700,
          icon: tokens.global.palette.neutral.c0,
        },
      },
      disabled: {
        ...baseIconButtonStyle,
        colors: {
          bg: tokens.theme.interactionState.disabled.bg,
          border: tokens.theme.interactionState.disabled.border,
          icon: tokens.theme.interactionState.disabled.icon,
        },
      },
    },
    tertiary: {
      default: {
        ...baseIconButtonStyle,
        colors: tertiaryBaseColors,
      },
      hover: {
        ...baseIconButtonStyle,
        colors: {
          bg: tokens.theme.interactionState.hoverOverlay,
          border: tokens.theme.colors.border.default,
          icon: tokens.theme.colors.link.hover,
        },
      },
      focusVisible: {
        ...baseIconButtonStyle,
        colors: {
          bg: tokens.theme.colors.background.surface,
          border: tokens.theme.interactionState.focus.ring,
          icon: tokens.theme.colors.link.default,
        },
      },
      active: {
        ...baseIconButtonStyle,
        colors: {
          bg: tokens.theme.interactionState.activeOverlay,
          border: tokens.theme.colors.border.default,
          icon: tokens.theme.colors.link.default,
        },
      },
      disabled: {
        ...baseIconButtonStyle,
        colors: {
          bg: tokens.theme.interactionState.disabled.bg,
          border: tokens.theme.interactionState.disabled.border,
          icon: tokens.theme.interactionState.disabled.icon,
        },
      },
    },
  },
} as const;

export type IconButtonTokensContract = typeof iconButtonTokens;
export type IconButtonSize = keyof IconButtonTokensContract["size"];
export type IconButtonVariant = keyof IconButtonTokensContract["styles"];
export type IconButtonState = keyof IconButtonTokensContract["styles"]["primary"];
