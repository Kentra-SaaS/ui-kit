import { token } from "./token-types";

export const appBackgroundTokens = {
  base: token("--k-color-app-bg-base"),
  glow: {
    primary: token("--k-color-app-bg-glow-primary"),
    secondary: token("--k-color-app-bg-glow-secondary"),
    tertiary: token("--k-color-app-bg-glow-tertiary"),
  },
  angle: token("--k-color-app-bg-angle"),
  grid: {
    line: token("--k-color-app-bg-grid-line"),
    fade: token("--k-color-app-bg-grid-fade"),
  },
  detailLine: token("--k-color-app-bg-detail-line"),
  vignette: token("--k-color-app-bg-vignette"),
  noise: token("--k-color-app-bg-noise"),
} as const;

export type AppBackgroundTokensContract = typeof appBackgroundTokens;
