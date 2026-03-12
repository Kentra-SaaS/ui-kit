import { textareaTokens } from "./textarea.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const textareaStyleMap = createComponentStyleMapFromTokens({
  id: "textarea",
  baseClass: "k-textarea",
  tokens: textareaTokens,
});
