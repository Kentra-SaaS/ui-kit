import { token } from "./token-types";

export const breakpointTokens = {
  xs: token("--k-breakpoint-xs"),
  sm: token("--k-breakpoint-sm"),
  md: token("--k-breakpoint-md"),
  lg: token("--k-breakpoint-lg"),
  xl: token("--k-breakpoint-xl"),
  "2xl": token("--k-breakpoint-2xl"),
} as const;

export type BreakpointTokensContract = typeof breakpointTokens;
