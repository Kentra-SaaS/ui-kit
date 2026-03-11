import { checkboxTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const checkboxStyleMap = createComponentStyleMapFromTokens({
  id: "checkbox",
  baseClass: "k-checkbox",
  tokens: checkboxTokens,
});
