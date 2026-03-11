import { tabsTokens } from "../../../tokens/components";
import { createComponentStyleMapFromTokens } from "../../core";

export const tabsStyleMap = createComponentStyleMapFromTokens({
  id: "tabs",
  baseClass: "k-tabs",
  tokens: tabsTokens,
});
