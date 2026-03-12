import { checkboxTokens } from "./checkbox.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const checkboxStyleMap = createComponentStyleMapFromTokens({
  id: "checkbox",
  baseClass: "k-checkbox",
  tokens: checkboxTokens,
});
