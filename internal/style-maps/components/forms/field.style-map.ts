import { fieldTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const fieldStyleMap = createComponentStyleMapFromTokens({
  id: "field",
  baseClass: "k-field",
  tokens: fieldTokens,
});
