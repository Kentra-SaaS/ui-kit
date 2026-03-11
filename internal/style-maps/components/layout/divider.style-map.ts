import { dividerTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const dividerStyleMap = createComponentStyleMapFromTokens({
  id: "divider",
  baseClass: "k-divider",
  tokens: dividerTokens,
});
