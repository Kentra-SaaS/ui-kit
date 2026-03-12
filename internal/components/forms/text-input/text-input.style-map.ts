import { textInputTokens } from "./text-input.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const textInputStyleMap = createComponentStyleMapFromTokens({
  id: "text-input",
  baseClass: "k-text-input",
  tokens: textInputTokens,
});
