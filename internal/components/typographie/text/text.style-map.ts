import { textTokens } from "./text.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const textStyleMap = createComponentStyleMapFromTokens({
  id: "text",
  baseClass: "k-text",
  tokens: textTokens,
});
