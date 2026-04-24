import { stackTokens } from "./stack.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

const stackSizeSource = {
  xs: {
    gap: stackTokens.gap.xs,
  },
  sm: {
    gap: stackTokens.gap.sm,
  },
  md: {
    gap: stackTokens.gap.md,
  },
  lg: {
    gap: stackTokens.gap.lg,
  },
} as const;

export const stackStyleMap = createComponentStyleMapFromTokens({
  id: "stack",
  baseClass: "k-stack",
  tokens: stackTokens,
  sizeSource: stackSizeSource,
});
