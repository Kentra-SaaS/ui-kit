import { token } from "./token-types";

export const typographyTokens = {
  family: {
    base: token("--k-font-family-base"),
    heading: token("--k-font-family-heading"),
    mono: token("--k-font-family-mono"),
  },
  weight: {
    regular: token("--k-font-weight-regular"),
    medium: token("--k-font-weight-medium"),
    semibold: token("--k-font-weight-semibold"),
    bold: token("--k-font-weight-bold"),
  },
  size: {
    s2xs: token("--k-font-size-2xs"),
    xs: token("--k-font-size-xs"),
    sm: token("--k-font-size-sm"),
    md: token("--k-font-size-md"),
    lg: token("--k-font-size-lg"),
    xl: token("--k-font-size-xl"),
    x2l: token("--k-font-size-2xl"),
    x3l: token("--k-font-size-3xl"),
    x4l: token("--k-font-size-4xl"),
    x5l: token("--k-font-size-5xl"),
  },
  lineHeight: {
    compact: token("--k-line-height-compact"),
    snug: token("--k-line-height-snug"),
    normal: token("--k-line-height-normal"),
    relaxed: token("--k-line-height-relaxed"),
  },
  semantic: {
    display: {
      fontSize: token("--k-typography-display-font-size"),
      lineHeight: token("--k-typography-display-line-height"),
      fontWeight: token("--k-typography-display-font-weight"),
    },
    h1: {
      fontSize: token("--k-typography-h1-font-size"),
      lineHeight: token("--k-typography-h1-line-height"),
    },
    h2: {
      fontSize: token("--k-typography-h2-font-size"),
      lineHeight: token("--k-typography-h2-line-height"),
    },
    h3: {
      fontSize: token("--k-typography-h3-font-size"),
      lineHeight: token("--k-typography-h3-line-height"),
    },
    h4: {
      fontSize: token("--k-typography-h4-font-size"),
      lineHeight: token("--k-typography-h4-line-height"),
    },
    h5: {
      fontSize: token("--k-typography-h5-font-size"),
      lineHeight: token("--k-typography-h5-line-height"),
    },
    h6: {
      fontSize: token("--k-typography-h6-font-size"),
      lineHeight: token("--k-typography-h6-line-height"),
    },
    heading: {
      fontWeight: token("--k-typography-heading-font-weight"),
    },
    body: {
      lg: {
        fontSize: token("--k-typography-body-lg-font-size"),
        lineHeight: token("--k-typography-body-lg-line-height"),
      },
      md: {
        fontSize: token("--k-typography-body-md-font-size"),
        lineHeight: token("--k-typography-body-md-line-height"),
      },
      sm: {
        fontSize: token("--k-typography-body-sm-font-size"),
        lineHeight: token("--k-typography-body-sm-line-height"),
      },
      fontWeight: token("--k-typography-body-font-weight"),
    },
    caption: {
      fontSize: token("--k-typography-caption-font-size"),
      lineHeight: token("--k-typography-caption-line-height"),
    },
    label: {
      fontSize: token("--k-typography-label-font-size"),
      lineHeight: token("--k-typography-label-line-height"),
      fontWeight: token("--k-typography-label-font-weight"),
    },
  },
} as const;

export type TypographyTokensContract = typeof typographyTokens;
