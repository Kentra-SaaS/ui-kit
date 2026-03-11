import { tokens } from "../../core";

const headingBaseStyle = {
  family: tokens.global.typography.family.heading,
  color: tokens.theme.colors.text.primary,
  defaultWeight: tokens.global.typography.semantic.heading.fontWeight,
} as const;

export const headingTokens = {
  styles: {
    display: {
      ...headingBaseStyle,
      fontSize: tokens.global.typography.semantic.display.fontSize,
      lineHeight: tokens.global.typography.semantic.display.lineHeight,
      fontWeight: tokens.global.typography.semantic.display.fontWeight,
    },
    h1: {
      ...headingBaseStyle,
      fontSize: tokens.global.typography.semantic.h1.fontSize,
      lineHeight: tokens.global.typography.semantic.h1.lineHeight,
      fontWeight: tokens.global.typography.semantic.heading.fontWeight,
    },
    h2: {
      ...headingBaseStyle,
      fontSize: tokens.global.typography.semantic.h2.fontSize,
      lineHeight: tokens.global.typography.semantic.h2.lineHeight,
      fontWeight: tokens.global.typography.semantic.heading.fontWeight,
    },
    h3: {
      ...headingBaseStyle,
      fontSize: tokens.global.typography.semantic.h3.fontSize,
      lineHeight: tokens.global.typography.semantic.h3.lineHeight,
      fontWeight: tokens.global.typography.semantic.heading.fontWeight,
    },
    h4: {
      ...headingBaseStyle,
      fontSize: tokens.global.typography.semantic.h4.fontSize,
      lineHeight: tokens.global.typography.semantic.h4.lineHeight,
      fontWeight: tokens.global.typography.semantic.heading.fontWeight,
    },
    h5: {
      ...headingBaseStyle,
      fontSize: tokens.global.typography.semantic.h5.fontSize,
      lineHeight: tokens.global.typography.semantic.h5.lineHeight,
      fontWeight: tokens.global.typography.semantic.heading.fontWeight,
    },
    h6: {
      ...headingBaseStyle,
      fontSize: tokens.global.typography.semantic.h6.fontSize,
      lineHeight: tokens.global.typography.semantic.h6.lineHeight,
      fontWeight: tokens.global.typography.semantic.heading.fontWeight,
    },
  },
} as const;

export type HeadingTokensContract = typeof headingTokens;
export type HeadingVariant = keyof HeadingTokensContract["styles"];
