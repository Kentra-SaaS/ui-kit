import { token } from "./token-types";

export const themeElevationTokens = {
  shadow: {
    xs: token("--k-shadow-xs"),
    sm: token("--k-shadow-sm"),
    md: token("--k-shadow-md"),
    lg: token("--k-shadow-lg"),
    sectionElevated: token("--k-shadow-section-elevated"),
    cardElevated: token("--k-shadow-card-elevated"),
    focus: token("--k-shadow-focus"),
  },
} as const;

export type ThemeElevationTokensContract = typeof themeElevationTokens;
