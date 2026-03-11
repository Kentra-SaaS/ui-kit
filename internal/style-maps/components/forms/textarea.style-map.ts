import { textareaTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const textareaStyleMap = createComponentStyleMapFromTokens({
  id: "textarea",
  baseClass: "k-textarea",
  tokens: textareaTokens,
});
