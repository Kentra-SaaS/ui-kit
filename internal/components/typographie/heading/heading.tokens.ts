import { tokens } from "../../../core/tokens";

const headingBaseStyle = {
  family: tokens.global.typography.family.heading,
  color: tokens.theme.colors.text.primary,
  defaultWeight: tokens.global.typography.semantic.heading.fontWeight,
} as const;

export const headingTokens = {
  styles: {
    base: headingBaseStyle,
    display: {
      fontSize: tokens.global.typography.semantic.display.fontSize,
      lineHeight: tokens.global.typography.semantic.display.lineHeight,
      fontWeight: tokens.global.typography.semantic.display.fontWeight,
    },
    h1: {
      fontSize: tokens.global.typography.semantic.h1.fontSize,
      lineHeight: tokens.global.typography.semantic.h1.lineHeight,
      fontWeight: tokens.global.typography.semantic.heading.fontWeight,
    },
    h2: {
      fontSize: tokens.global.typography.semantic.h2.fontSize,
      lineHeight: tokens.global.typography.semantic.h2.lineHeight,
      fontWeight: tokens.global.typography.semantic.heading.fontWeight,
    },
    h3: {
      fontSize: tokens.global.typography.semantic.h3.fontSize,
      lineHeight: tokens.global.typography.semantic.h3.lineHeight,
      fontWeight: tokens.global.typography.semantic.heading.fontWeight,
    },
    h4: {
      fontSize: tokens.global.typography.semantic.h4.fontSize,
      lineHeight: tokens.global.typography.semantic.h4.lineHeight,
      fontWeight: tokens.global.typography.semantic.heading.fontWeight,
    },
    h5: {
      fontSize: tokens.global.typography.semantic.h5.fontSize,
      lineHeight: tokens.global.typography.semantic.h5.lineHeight,
      fontWeight: tokens.global.typography.semantic.heading.fontWeight,
    },
    h6: {
      fontSize: tokens.global.typography.semantic.h6.fontSize,
      lineHeight: tokens.global.typography.semantic.h6.lineHeight,
      fontWeight: tokens.global.typography.semantic.heading.fontWeight,
    },
  },
} as const;

export type HeadingTokensContract = typeof headingTokens;
export type HeadingVariant = Exclude<keyof HeadingTokensContract["styles"], "base">;
