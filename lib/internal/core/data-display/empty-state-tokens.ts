import { tokens } from "../../tokens";

const emptyStateBaseStyle = {
  container: {
    maxWidth: "36rem",
    borderRadius: tokens.global.baseStyle.radius.lg,
    paddingX: tokens.global.baseStyle.space.step6,
    paddingY: tokens.global.baseStyle.space.step6,
    gap: tokens.global.baseStyle.space.step4,
  },
  icon: {
    size: tokens.global.icon.size.lg,
  },
  title: {
    family: tokens.global.typography.family.heading,
    fontSize: tokens.global.typography.semantic.h4.fontSize,
    lineHeight: tokens.global.typography.semantic.h4.lineHeight,
    fontWeight: tokens.global.typography.semantic.heading.fontWeight,
  },
  description: {
    family: tokens.global.typography.family.base,
    fontSize: tokens.global.typography.semantic.body.md.fontSize,
    lineHeight: tokens.global.typography.semantic.body.md.lineHeight,
    fontWeight: tokens.global.typography.semantic.body.fontWeight,
  },
  actionGap: tokens.global.baseStyle.space.step3,
} as const;

export const emptyStateTokens = {
  styles: {
    neutral: {
      default: {
        ...emptyStateBaseStyle,
        colors: {
          bg: tokens.theme.colors.background.surface,
          border: tokens.theme.colors.border.subtle,
          icon: tokens.theme.colors.text.secondary,
          title: tokens.theme.colors.text.primary,
          description: tokens.theme.colors.text.secondary,
        },
      },
    },
    noResults: {
      default: {
        ...emptyStateBaseStyle,
        colors: {
          bg: tokens.theme.colors.background.surface,
          border: tokens.theme.colors.border.subtle,
          icon: tokens.theme.colors.state.info.fg,
          title: tokens.theme.colors.text.primary,
          description: tokens.theme.colors.text.secondary,
        },
      },
    },
    blocked: {
      default: {
        ...emptyStateBaseStyle,
        colors: {
          bg: tokens.theme.colors.background.surface,
          border: tokens.theme.colors.state.warning.fg,
          icon: tokens.theme.colors.state.warning.fg,
          title: tokens.theme.colors.text.primary,
          description: tokens.theme.colors.text.secondary,
        },
      },
    },
  },
} as const;

export type EmptyStateTokensContract = typeof emptyStateTokens;
export type EmptyStateVariant = keyof EmptyStateTokensContract["styles"];
export type EmptyStateState = keyof EmptyStateTokensContract["styles"]["neutral"];
