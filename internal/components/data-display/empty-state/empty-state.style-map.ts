import { emptyStateTokens } from "./empty-state.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const emptyStateStyleMap = createComponentStyleMapFromTokens({
  id: "empty-state",
  baseClass: "k-empty-state",
  tokens: emptyStateTokens,
});
