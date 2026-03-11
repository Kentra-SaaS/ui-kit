import { tokens } from "../../core";

const baseBadgeStyle = {
  border: {
    width: tokens.global.baseStyle.borderWidth.thin,
    radius: tokens.global.baseStyle.radius.pill,
  },
  typography: {
    family: tokens.global.typography.family.base,
    fontSize: tokens.global.typography.semantic.caption.fontSize,
    lineHeight: tokens.global.typography.semantic.caption.lineHeight,
    fontWeight: tokens.global.typography.semantic.label.fontWeight,
  },
  size: {
    sm: {
      minHeight: tokens.global.baseStyle.space.step5,
      paddingX: tokens.global.baseStyle.space.step2,
      paddingY: tokens.global.baseStyle.space.step1,
      gap: tokens.global.baseStyle.space.step1,
      iconSize: tokens.global.icon.size.sm,
    },
    md: {
      minHeight: tokens.global.baseStyle.space.step6,
      paddingX: tokens.global.baseStyle.space.step2,
      paddingY: tokens.global.baseStyle.space.step1,
      gap: tokens.global.baseStyle.space.step1,
      iconSize: tokens.global.icon.size.md,
    },
  },
} as const;

export const badgeTokens = {
  styles: {
    base: baseBadgeStyle,
    neutral: {
      default: {
        colors: {
          bg: tokens.theme.colors.background.elevated,
          text: tokens.theme.colors.text.primary,
          border: tokens.theme.colors.border.subtle,
          icon: tokens.theme.colors.text.secondary,
        },
      },
    },
    info: {
      default: {
        colors: {
          bg: tokens.theme.colors.state.info.bg,
          text: tokens.theme.colors.state.info.fg,
          border: tokens.theme.colors.state.info.bg,
          icon: tokens.theme.colors.state.info.fg,
        },
      },
    },
    success: {
      default: {
        colors: {
          bg: tokens.theme.colors.state.success.bg,
          text: tokens.theme.colors.state.success.fg,
          border: tokens.theme.colors.state.success.bg,
          icon: tokens.theme.colors.state.success.fg,
        },
      },
    },
    warning: {
      default: {
        colors: {
          bg: tokens.theme.colors.state.warning.bg,
          text: tokens.theme.colors.state.warning.fg,
          border: tokens.theme.colors.state.warning.bg,
          icon: tokens.theme.colors.state.warning.fg,
        },
      },
    },
    danger: {
      default: {
        colors: {
          bg: tokens.theme.colors.state.danger.bg,
          text: tokens.theme.colors.state.danger.fg,
          border: tokens.theme.colors.state.danger.bg,
          icon: tokens.theme.colors.state.danger.fg,
        },
      },
    },
  },
} as const;

export type BadgeTokensContract = typeof badgeTokens;
export type BadgeVariant = Exclude<keyof BadgeTokensContract["styles"], "base">;
export type BadgeState = keyof BadgeTokensContract["styles"]["neutral"];
export type BadgeSize = keyof BadgeTokensContract["styles"]["base"]["size"];
