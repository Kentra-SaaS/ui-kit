import { textInputTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const textInputStyleMap = createComponentStyleMapFromTokens({
  id: "text-input",
  baseClass: "k-text-input",
  tokens: textInputTokens,
});
