import { tokens } from "../../../core/tokens";

const baseTabsStyle = {
  list: {
    gap: tokens.global.baseStyle.space.step1,
    borderWidth: tokens.global.baseStyle.borderWidth.thin,
  },
  trigger: {
    minHeight: tokens.global.baseStyle.space.step10,
    paddingX: tokens.global.baseStyle.space.step3,
    paddingY: tokens.global.baseStyle.space.step2,
    radius: tokens.global.baseStyle.radius.md,
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

export const tabsTokens = {
  styles: {
    base: baseTabsStyle,
    line: {
      default: {
        colors: {
          listBorder: tokens.theme.colors.border.subtle,
          text: tokens.theme.colors.text.secondary,
          indicator: tokens.theme.colors.border.subtle,
          bg: tokens.theme.colors.background.surface,
        },
      },
      active: {
        colors: {
          listBorder: tokens.theme.colors.border.subtle,
          text: tokens.theme.colors.text.primary,
          indicator: tokens.theme.colors.link.default,
          bg: tokens.theme.colors.background.surface,
        },
      },
      focusVisible: {
        colors: {
          listBorder: tokens.theme.colors.border.subtle,
          text: tokens.theme.colors.text.primary,
          indicator: tokens.theme.colors.link.default,
          bg: tokens.theme.colors.background.surface,
        },
      },
      disabled: {
        colors: {
          listBorder: tokens.theme.colors.border.subtle,
          text: tokens.theme.interactionState.disabled.text,
          indicator: tokens.theme.interactionState.disabled.border,
          bg: tokens.theme.interactionState.disabled.bg,
        },
        disabledOpacity: tokens.theme.interactionState.disabled.opacity,
      },
    },
    pill: {
      default: {
        colors: {
          listBorder: tokens.theme.colors.border.subtle,
          text: tokens.theme.colors.text.secondary,
          indicator: tokens.theme.colors.border.subtle,
          bg: tokens.theme.colors.background.surface,
        },
      },
      active: {
        colors: {
          listBorder: tokens.theme.colors.border.subtle,
          text: tokens.theme.interactionState.selected.text,
          indicator: tokens.theme.interactionState.selected.bg,
          bg: tokens.theme.interactionState.selected.bg,
        },
      },
      focusVisible: {
        colors: {
          listBorder: tokens.theme.colors.border.subtle,
          text: tokens.theme.colors.text.primary,
          indicator: tokens.theme.colors.link.default,
          bg: tokens.theme.colors.background.surface,
        },
      },
      disabled: {
        colors: {
          listBorder: tokens.theme.colors.border.subtle,
          text: tokens.theme.interactionState.disabled.text,
          indicator: tokens.theme.interactionState.disabled.border,
          bg: tokens.theme.interactionState.disabled.bg,
        },
        disabledOpacity: tokens.theme.interactionState.disabled.opacity,
      },
    },
  },
} as const;

export type TabsTokensContract = typeof tabsTokens;
export type TabsVariant = Exclude<keyof TabsTokensContract["styles"], "base">;
export type TabsState = keyof TabsTokensContract["styles"]["line"];
