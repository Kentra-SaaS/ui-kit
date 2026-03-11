import { headingTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const headingStyleMap = createComponentStyleMapFromTokens({
  id: "heading",
  baseClass: "k-heading",
  tokens: headingTokens,
});
