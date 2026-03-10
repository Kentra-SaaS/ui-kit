import { tokens } from "../../tokens";

const bodyTextBase = {
  family: tokens.global.typography.family.base,
  fontWeight: tokens.global.typography.semantic.body.fontWeight,
} as const;

export const textTokens = {
  styles: {
    body: {
      ...bodyTextBase,
      fontSize: tokens.global.typography.semantic.body.md.fontSize,
      lineHeight: tokens.global.typography.semantic.body.md.lineHeight,
      color: tokens.theme.colors.text.primary,
    },
    caption: {
      family: tokens.global.typography.family.base,
      fontSize: tokens.global.typography.semantic.caption.fontSize,
      lineHeight: tokens.global.typography.semantic.caption.lineHeight,
      fontWeight: tokens.global.typography.semantic.body.fontWeight,
      color: tokens.theme.colors.text.secondary,
    },
    muted: {
      ...bodyTextBase,
      fontSize: tokens.global.typography.semantic.body.md.fontSize,
      lineHeight: tokens.global.typography.semantic.body.md.lineHeight,
      color: tokens.theme.colors.text.secondary,
    },
    strong: {
      family: tokens.global.typography.family.base,
      fontSize: tokens.global.typography.semantic.body.md.fontSize,
      lineHeight: tokens.global.typography.semantic.body.md.lineHeight,
      fontWeight: tokens.global.typography.weight.semibold,
      color: tokens.theme.colors.text.primary,
    },
  },
} as const;

export type TextTokensContract = typeof textTokens;
export type TextVariant = keyof TextTokensContract["styles"];
