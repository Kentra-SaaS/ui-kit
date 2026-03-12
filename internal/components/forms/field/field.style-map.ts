import { fieldTokens } from "./field.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const fieldStyleMap = createComponentStyleMapFromTokens({
  id: "field",
  baseClass: "k-field",
  tokens: fieldTokens,
});
