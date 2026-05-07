import { tokens } from "../../../core/tokens";

const baseThemeSwitchStyle = {
  border: {
    width: tokens.global.baseStyle.borderWidth.thin,
    radius: tokens.global.baseStyle.radius.pill,
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

const defaultColors = {
  bg: tokens.theme.colors.background.surface,
  border: tokens.theme.colors.border.subtle,
  thumbBg: tokens.theme.colors.background.elevated,
  thumbBorder: tokens.theme.colors.border.default,
  thumbIcon: tokens.theme.colors.text.primary,
  iconActive: tokens.theme.colors.text.primary,
  iconMuted: tokens.theme.colors.text.secondary,
} as const;

export const themeSwitchTokens = {
  size: {
    sm: {
      trackWidth: "3.5rem",
      trackHeight: tokens.global.baseStyle.space.step8,
      padding: tokens.global.baseStyle.space.step1,
      thumbSize: tokens.global.baseStyle.space.step6,
      iconSize: tokens.global.icon.size.sm,
    },
    md: {
      trackWidth: "4.5rem",
      trackHeight: tokens.global.baseStyle.space.step10,
      padding: tokens.global.baseStyle.space.step1,
      thumbSize: tokens.global.baseStyle.space.step8,
      iconSize: tokens.global.icon.size.sm,
    },
    lg: {
      trackWidth: "5.5rem",
      trackHeight: tokens.global.baseStyle.space.step12,
      padding: tokens.global.baseStyle.space.step1,
      thumbSize: tokens.global.baseStyle.space.step10,
      iconSize: tokens.global.icon.size.md,
    },
  },
  styles: {
    base: baseThemeSwitchStyle,
    default: {
      default: {
        colors: defaultColors,
      },
      hover: {
        colors: {
          bg: tokens.theme.interactionState.hoverOverlay,
          border: tokens.theme.colors.border.default,
          thumbBg: tokens.theme.colors.background.elevated,
          thumbBorder: tokens.theme.colors.border.default,
          thumbIcon: tokens.theme.colors.text.primary,
          iconActive: tokens.theme.colors.text.primary,
          iconMuted: tokens.theme.colors.text.secondary,
        },
      },
      active: {
        colors: {
          bg: tokens.theme.interactionState.activeOverlay,
          border: tokens.theme.colors.border.default,
          thumbBg: tokens.theme.colors.background.elevated,
          thumbBorder: tokens.theme.colors.border.default,
          thumbIcon: tokens.theme.colors.text.primary,
          iconActive: tokens.theme.colors.text.primary,
          iconMuted: tokens.theme.colors.text.secondary,
        },
      },
      on: {
        colors: {
          bg: tokens.theme.colors.background.surface,
          border: tokens.theme.colors.border.default,
          thumbBg: tokens.theme.colors.background.elevated,
          thumbBorder: tokens.theme.colors.border.default,
          thumbIcon: tokens.theme.colors.text.primary,
          iconActive: tokens.theme.colors.text.primary,
          iconMuted: tokens.theme.colors.text.secondary,
        },
      },
      disabled: {
        colors: {
          bg: tokens.theme.interactionState.disabled.bg,
          border: tokens.theme.interactionState.disabled.border,
          thumbBg: tokens.theme.interactionState.disabled.bg,
          thumbBorder: tokens.theme.interactionState.disabled.border,
          thumbIcon: tokens.theme.interactionState.disabled.icon,
          iconActive: tokens.theme.interactionState.disabled.icon,
          iconMuted: tokens.theme.interactionState.disabled.icon,
        },
      },
      focusVisible: {
        // Focus visuals are handled by outline/ring on the runtime element.
      },
    },
  },
} as const;

export type ThemeSwitchTokensContract = typeof themeSwitchTokens;
export type ThemeSwitchTheme = "light" | "dark";
export type ThemeSwitchSize = keyof ThemeSwitchTokensContract["size"];
export type ThemeSwitchVariant = Exclude<keyof ThemeSwitchTokensContract["styles"], "base">;
export type ThemeSwitchState = keyof ThemeSwitchTokensContract["styles"]["default"];
