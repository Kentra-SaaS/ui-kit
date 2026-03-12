import { dividerTokens } from "./divider.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const dividerStyleMap = createComponentStyleMapFromTokens({
  id: "divider",
  baseClass: "k-divider",
  tokens: dividerTokens,
});
