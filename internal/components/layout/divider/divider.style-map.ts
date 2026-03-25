import { dividerTokens } from "./divider.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

const dividerSizeSource = {
  sm: {
    spacing: dividerTokens.spacing.sm,
  },
  md: {
    spacing: dividerTokens.spacing.md,
  },
  lg: {
    spacing: dividerTokens.spacing.lg,
  },
} as const;

export const dividerStyleMap = createComponentStyleMapFromTokens({
  id: "divider",
  baseClass: "k-divider",
  tokens: dividerTokens,
  sizeSource: dividerSizeSource,
});
