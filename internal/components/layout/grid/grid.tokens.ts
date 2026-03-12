import { tokens } from "../../../core/tokens";

export const gridTokens = {
  gap: {
    sm: tokens.global.baseStyle.space.step3,
    md: tokens.global.baseStyle.space.step4,
    lg: tokens.global.baseStyle.space.step6,
  },
  variants: {
    twoCol: {
      columns: "repeat(2, minmax(0, 1fr))",
      minItemWidth: "14rem",
      gap: tokens.global.baseStyle.space.step4,
    },
    threeCol: {
      columns: "repeat(3, minmax(0, 1fr))",
      minItemWidth: "12rem",
      gap: tokens.global.baseStyle.space.step4,
    },
    fourCol: {
      columns: "repeat(4, minmax(0, 1fr))",
      minItemWidth: "10rem",
      gap: tokens.global.baseStyle.space.step4,
    },
    autoFit: {
      columns: "repeat(auto-fit, minmax(16rem, 1fr))",
      minItemWidth: "16rem",
      gap: tokens.global.baseStyle.space.step4,
    },
  },
  styles: {
    base: {
      display: "grid",
    },
  },
} as const;

export type GridTokensContract = typeof gridTokens;
export type GridVariant = keyof GridTokensContract["variants"];
export type GridGap = keyof GridTokensContract["gap"];
