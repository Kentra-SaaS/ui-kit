import { defineComponentStyleMap } from "../../../core/style-maps";
import { iconTokens } from "../../../core/tokens/contracts";

export const iconStyleMap = defineComponentStyleMap({
  id: "icon",
  baseClass: "k-icon",
  base: {
    "--k-icon-font-family": iconTokens.family,
  },
  sizes: {
    sm: {
      "--k-icon-font-size": iconTokens.size.sm,
    },
    md: {
      "--k-icon-font-size": iconTokens.size.md,
    },
    lg: {
      "--k-icon-font-size": iconTokens.size.lg,
    },
  },
  variants: {
    regular: { default: { "--k-icon-font-weight": 400 } },
    thin: { default: { "--k-icon-font-weight": 100 } },
    light: { default: { "--k-icon-font-weight": 300 } },
    bold: { default: { "--k-icon-font-weight": 700 } },
    fill: { default: { "--k-icon-font-weight": 400 } },
    duotone: { default: { "--k-icon-font-weight": 400 } },
  },
  stateSelectors: {
    default: "&",
  },
});
