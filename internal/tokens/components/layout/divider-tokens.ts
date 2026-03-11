import { tokens } from "../../core";

const subtleDividerStyle = {
  color: tokens.theme.colors.border.subtle,
  thickness: tokens.global.baseStyle.borderWidth.thin,
} as const;

const strongDividerStyle = {
  color: tokens.theme.colors.border.strong,
  thickness: tokens.global.baseStyle.borderWidth.default,
} as const;

export const dividerTokens = {
  spacing: {
    sm: tokens.global.baseStyle.space.step2,
    md: tokens.global.baseStyle.space.step4,
    lg: tokens.global.baseStyle.space.step6,
  },
  styles: {
    base: {},
    horizontal: {
      subtle: {
        ...subtleDividerStyle,
        inlineSize: "100%",
        blockSize: "1px",
      },
      strong: {
        ...strongDividerStyle,
        inlineSize: "100%",
        blockSize: "2px",
      },
    },
    vertical: {
      subtle: {
        ...subtleDividerStyle,
        inlineSize: "1px",
        blockSize: "100%",
      },
      strong: {
        ...strongDividerStyle,
        inlineSize: "2px",
        blockSize: "100%",
      },
    },
  },
} as const;

export type DividerTokensContract = typeof dividerTokens;
export type DividerOrientation = Exclude<keyof DividerTokensContract["styles"], "base">;
export type DividerVariant = keyof DividerTokensContract["styles"]["horizontal"];
