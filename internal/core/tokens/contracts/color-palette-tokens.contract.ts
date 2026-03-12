import { token } from "./token-types";

export const colorPaletteTokens = {
  neutral: {
    c0: token("--k-color-neutral-0"),
    c25: token("--k-color-neutral-25"),
    c50: token("--k-color-neutral-50"),
    c100: token("--k-color-neutral-100"),
    c200: token("--k-color-neutral-200"),
    c300: token("--k-color-neutral-300"),
    c400: token("--k-color-neutral-400"),
    c500: token("--k-color-neutral-500"),
    c600: token("--k-color-neutral-600"),
    c700: token("--k-color-neutral-700"),
    c800: token("--k-color-neutral-800"),
    c900: token("--k-color-neutral-900"),
  },
  brand: {
    c50: token("--k-color-brand-50"),
    c100: token("--k-color-brand-100"),
    c200: token("--k-color-brand-200"),
    c300: token("--k-color-brand-300"),
    c400: token("--k-color-brand-400"),
    c500: token("--k-color-brand-500"),
    c600: token("--k-color-brand-600"),
    c700: token("--k-color-brand-700"),
    c800: token("--k-color-brand-800"),
    c900: token("--k-color-brand-900"),
  },
  secondary: {
    c50: token("--k-color-secondary-50"),
    c100: token("--k-color-secondary-100"),
    c200: token("--k-color-secondary-200"),
    c300: token("--k-color-secondary-300"),
    c400: token("--k-color-secondary-400"),
    c500: token("--k-color-secondary-500"),
    c600: token("--k-color-secondary-600"),
    c700: token("--k-color-secondary-700"),
    c800: token("--k-color-secondary-800"),
    c900: token("--k-color-secondary-900"),
  },
  success: {
    c100: token("--k-color-success-100"),
    c300: token("--k-color-success-300"),
    c500: token("--k-color-success-500"),
    c700: token("--k-color-success-700"),
  },
  warning: {
    c100: token("--k-color-warning-100"),
    c300: token("--k-color-warning-300"),
    c500: token("--k-color-warning-500"),
    c700: token("--k-color-warning-700"),
  },
  danger: {
    c100: token("--k-color-danger-100"),
    c300: token("--k-color-danger-300"),
    c500: token("--k-color-danger-500"),
    c700: token("--k-color-danger-700"),
  },
  accent: {
    orange: {
      c300: token("--k-color-accent-orange-300"),
      c500: token("--k-color-accent-orange-500"),
      c700: token("--k-color-accent-orange-700"),
    },
  },
} as const;

export type ColorPaletteTokensContract = typeof colorPaletteTokens;
