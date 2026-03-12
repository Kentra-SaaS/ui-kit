import { tabsTokens } from "./tabs.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const tabsStyleMap = createComponentStyleMapFromTokens({
  id: "tabs",
  baseClass: "k-tabs",
  tokens: tabsTokens,
});
