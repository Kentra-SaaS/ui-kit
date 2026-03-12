import { headingTokens } from "./heading.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const headingStyleMap = createComponentStyleMapFromTokens({
  id: "heading",
  baseClass: "k-heading",
  tokens: headingTokens,
});
