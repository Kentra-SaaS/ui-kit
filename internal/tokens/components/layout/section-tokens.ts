import { tokens } from "../../core";

const sharedSectionStyle = {
  borderWidth: tokens.global.baseStyle.borderWidth.thin,
  radius: tokens.global.baseStyle.radius.lg,
  paddingX: tokens.global.baseStyle.space.step5,
  paddingY: tokens.global.baseStyle.space.step5,
  paddingXMobile: tokens.global.baseStyle.space.step4,
  paddingYMobile: tokens.global.baseStyle.space.step4,
  titleGap: tokens.global.baseStyle.space.step2,
  contentGap: tokens.global.baseStyle.space.step4,
  footerGap: tokens.global.baseStyle.space.step4,
} as const;

export const sectionTokens = {
  styles: {
    base: sharedSectionStyle,
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
        border: tokens.theme.colors.border.subtle,
        text: tokens.theme.colors.text.primary,
      },
      shadow: tokens.theme.elevation.shadow.md,
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

export type SectionTokensContract = typeof sectionTokens;
export type SectionVariant = Exclude<keyof SectionTokensContract["styles"], "base">;
