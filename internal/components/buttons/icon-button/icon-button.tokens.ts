import { tokens } from "../../../core/tokens";

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
      iconSize: tokens.global.baseStyle.space.step5,
    },
    md: {
      minHeight: tokens.global.baseStyle.space.step12,
      minWidth: tokens.global.baseStyle.space.step12,
      padding: tokens.global.baseStyle.space.step3,
      iconSize: tokens.global.baseStyle.space.step6,
    },
    lg: {
      minHeight: tokens.global.baseStyle.space.step16,
      minWidth: tokens.global.baseStyle.space.step16,
      padding: tokens.global.baseStyle.space.step4,
      iconSize: tokens.global.baseStyle.space.step8,
    },
  },
  styles: {
    base: baseIconButtonStyle,
    primary: {
      default: {
        colors: primaryBaseColors,
      },
      hover: {
        colors: {
          bg: tokens.theme.colors.action.primary.bgHover,
          border: tokens.theme.colors.action.primary.bgHover,
          icon: tokens.theme.colors.action.primary.text,
        },
      },
      focusVisible: {
        // Focus visuals are handled by outline/ring on the runtime element.
      },
      active: {
        colors: {
          bg: tokens.theme.colors.action.primary.bgActive,
          border: tokens.theme.colors.action.primary.bgActive,
          icon: tokens.theme.colors.action.primary.text,
        },
      },
      disabled: {
        colors: {
          bg: tokens.theme.colors.action.primary.disabledBg,
          border: tokens.theme.colors.action.primary.disabledBg,
          icon: tokens.theme.interactionState.disabled.icon,
        },
      },
    },
    secondary: {
      default: {
        colors: secondaryBaseColors,
      },
      hover: {
        colors: {
          bg: tokens.theme.colors.action.secondary.bgHover,
          border: tokens.theme.colors.action.secondary.border,
          icon: tokens.theme.colors.action.secondary.text,
        },
      },
      focusVisible: {
        // Focus visuals are handled by outline/ring on the runtime element.
      },
      active: {
        colors: {
          bg: tokens.theme.colors.action.secondary.bgActive,
          border: tokens.theme.colors.action.secondary.border,
          icon: tokens.theme.colors.action.secondary.text,
        },
      },
      disabled: {
        colors: {
          bg: tokens.theme.colors.action.secondary.disabledBg,
          border: tokens.theme.colors.action.secondary.disabledBorder,
          icon: tokens.theme.interactionState.disabled.icon,
        },
      },
    },
    danger: {
      default: {
        colors: dangerBaseColors,
      },
      hover: {
        colors: {
          bg: tokens.global.palette.danger.c500,
          border: tokens.global.palette.danger.c500,
          icon: tokens.global.palette.neutral.c0,
        },
      },
      focusVisible: {
        // Focus visuals are handled by outline/ring on the runtime element.
      },
      active: {
        colors: {
          bg: tokens.global.palette.danger.c700,
          border: tokens.global.palette.danger.c700,
          icon: tokens.global.palette.neutral.c0,
        },
      },
      disabled: {
        colors: {
          bg: tokens.theme.interactionState.disabled.bg,
          border: tokens.theme.interactionState.disabled.border,
          icon: tokens.theme.interactionState.disabled.icon,
        },
      },
    },
    tertiary: {
      default: {
        colors: tertiaryBaseColors,
      },
      hover: {
        colors: {
          bg: tokens.theme.interactionState.hoverOverlay,
          border: tokens.theme.colors.border.default,
          icon: tokens.theme.colors.link.hover,
        },
      },
      focusVisible: {
        // Focus visuals are handled by outline/ring on the runtime element.
      },
      active: {
        colors: {
          bg: tokens.theme.interactionState.activeOverlay,
          border: tokens.theme.colors.border.default,
          icon: tokens.theme.colors.link.default,
        },
      },
      disabled: {
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
export type IconButtonVariant = Exclude<keyof IconButtonTokensContract["styles"], "base">;
export type IconButtonState = keyof IconButtonTokensContract["styles"]["primary"];
