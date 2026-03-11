import { tokens } from "../../core";

export const containerTokens = {
  size: {
    sm: {
      maxWidth: "36rem",
      paddingX: tokens.global.baseStyle.space.step4,
      paddingXMobile: tokens.global.baseStyle.space.step3,
    },
    md: {
      maxWidth: "48rem",
      paddingX: tokens.global.baseStyle.space.step5,
      paddingXMobile: tokens.global.baseStyle.space.step4,
    },
    lg: {
      maxWidth: "64rem",
      paddingX: tokens.global.baseStyle.space.step6,
      paddingXMobile: tokens.global.baseStyle.space.step4,
    },
    fluid: {
      maxWidth: "100%",
      paddingX: tokens.global.baseStyle.space.step6,
      paddingXMobile: tokens.global.baseStyle.space.step4,
    },
  },
  styles: {
    base: {
      background: tokens.theme.colors.background.surface,
    },
    default: {},
  },
} as const;

export type ContainerTokensContract = typeof containerTokens;
export type ContainerSize = keyof ContainerTokensContract["size"];
