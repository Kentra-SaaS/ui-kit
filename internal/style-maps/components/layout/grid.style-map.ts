import { gridTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

const gridSizeSource = {
  sm: {
    gap: gridTokens.gap.sm,
  },
  md: {
    gap: gridTokens.gap.md,
  },
  lg: {
    gap: gridTokens.gap.lg,
  },
} as const;

export const gridStyleMap = createComponentStyleMapFromTokens({
  id: "grid",
  baseClass: "k-grid",
  tokens: gridTokens,
  sizeSource: gridSizeSource,
  variantSource: gridTokens.variants,
  sharedSource: {
    display: gridTokens.styles.default.display,
  },
});
