import { tokens } from "../../../core/tokens";

const baseCardStyle = {
  borderWidth: tokens.global.baseStyle.borderWidth.thin,
  radius: tokens.global.baseStyle.radius.lg,
} as const;

export const cardTokens = {
  size: {
    sm: {
      paddingX: tokens.global.baseStyle.space.step4,
      paddingY: tokens.global.baseStyle.space.step4,
      paddingXMobile: tokens.global.baseStyle.space.step3,
      paddingYMobile: tokens.global.baseStyle.space.step3,
    },
    md: {
      paddingX: tokens.global.baseStyle.space.step5,
      paddingY: tokens.global.baseStyle.space.step5,
      paddingXMobile: tokens.global.baseStyle.space.step4,
      paddingYMobile: tokens.global.baseStyle.space.step4,
    },
    lg: {
      paddingX: tokens.global.baseStyle.space.step6,
      paddingY: tokens.global.baseStyle.space.step6,
      paddingXMobile: tokens.global.baseStyle.space.step4,
      paddingYMobile: tokens.global.baseStyle.space.step4,
    },
  },
  styles: {
    base: baseCardStyle,
    default: {
      colors: {
        bg: tokens.theme.colors.background.surface,
        border: tokens.theme.colors.border.subtle,
        text: tokens.theme.colors.text.primary,
      },
      shadow: tokens.theme.elevation.shadow.xs,
    },
    elevated: {
      colors: {
        bg: tokens.theme.colors.background.elevated,
        border: "var(--k-color-card-elevated-border, var(--k-color-border-subtle))",
        text: tokens.theme.colors.text.primary,
      },
      shadow: "var(--k-shadow-card-elevated, var(--k-shadow-md))",
    },
    outlined: {
      colors: {
        bg: tokens.theme.colors.background.surface,
        border: tokens.theme.colors.border.strong,
        text: tokens.theme.colors.text.primary,
      },
      shadow: tokens.theme.elevation.shadow.xs,
    },
  },
} as const;

export type CardTokensContract = typeof cardTokens;
export type CardSize = keyof CardTokensContract["size"];
export type CardVariant = Exclude<keyof CardTokensContract["styles"], "base">;
