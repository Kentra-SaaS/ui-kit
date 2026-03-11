import { emptyStateTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const emptyStateStyleMap = createComponentStyleMapFromTokens({
  id: "empty-state",
  baseClass: "k-empty-state",
  tokens: emptyStateTokens,
});
