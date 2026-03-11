import { textTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const textStyleMap = createComponentStyleMapFromTokens({
  id: "text",
  baseClass: "k-text",
  tokens: textTokens,
});
