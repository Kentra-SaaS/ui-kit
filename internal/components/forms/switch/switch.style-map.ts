import { switchTokens } from "./switch.tokens";
import { createComponentStyleMapFromTokens } from "../../../core/style-maps";

export const switchStyleMap = createComponentStyleMapFromTokens({
  id: "switch",
  baseClass: "k-switch",
  tokens: switchTokens,
});
