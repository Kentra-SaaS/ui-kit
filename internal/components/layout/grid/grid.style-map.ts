import { gridTokens } from "./grid.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

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
});
