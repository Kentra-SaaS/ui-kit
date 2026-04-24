import { token } from "./token-types";

export const iconTokens = {
  family: token("--k-font-family-icon"),
  size: {
    sm: token("--k-icon-size-sm"),
    md: token("--k-icon-size-md"),
    lg: token("--k-icon-size-lg"),
  },
} as const;

export type IconTokensContract = typeof iconTokens;
