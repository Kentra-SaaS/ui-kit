import { tokens } from "../../../core/tokens";

export const stackTokens = {
  gap: {
    xs: tokens.global.baseStyle.space.step2,
    sm: tokens.global.baseStyle.space.step3,
    md: tokens.global.baseStyle.space.step4,
    lg: tokens.global.baseStyle.space.step6,
  },
  align: {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    stretch: "stretch",
  },
  styles: {
    base: {
      display: "flex",
      direction: "column",
    },
    default: {},
  },
} as const;

export type StackTokensContract = typeof stackTokens;
export type StackGap = keyof StackTokensContract["gap"];
export type StackAlign = keyof StackTokensContract["align"];
